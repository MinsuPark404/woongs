import os
from abc import ABCMeta, abstractmethod

from general.interfaces import BaseOperator
from general.objects.mask import SegMaskConverter
from .tools.pre_procs import *
from .tools.post_procs import *
from .tools.model_config import load_model_config
from .models.build import AutoBackend


class CocodetBaseOperator(BaseOperator):
    def __init__(self, config_args=None, auto_setup=True):
        super(CocodetBaseOperator, self).__init__(__file__)  # NOTE essential
        self.cfg = self.setup_config()
        self.cfg.override(config_args, self.get_package_name())
        self.model_cfg_path = os.path.join(self.get_package_abs_path(), 'models', 'configs')
        
        # initialized by overrided config
        self.weights_path = os.path.abspath(self.cfg.weights_path)  # relative path from workspace
        self.model_name = self.cfg.model_name
        self.model_size = self.cfg.model_size
        self.model_task = self.cfg.model_task
        self.input_size = self.cfg.input_size
        self.flexible = self.cfg.flexible
        self.device = self.cfg.device
        self.conf_thresh = self.cfg.conf_thresh
        self.nms_thresh = self.cfg.nms_thresh
        self.max_det = self.cfg.max_det
        self.bbox_expand_ratio = self.cfg.bbox_expand_ratio
        self.mask_container_size = self.cfg.mask_container_size
        
        # variables for intra-object operation
        self.is_segment = False
        self.is_pose = False
        self.done_setup = False
        self.done_warmup = False
        self.expand_box = self.bbox_expand_ratio > 1.
        self.model = None
        
        # future configure options
        self.batch_size = 1  # 배치 처리 미구현
        self.letterbox = True  # now, letterbox required, letterbox 필수
        self.class_indexes = range(80)  # regular coco classes
        
        if auto_setup:
            self.setup_model()
            self.warmup_model()
    
    def setup_model(self):
        self.model_fullname = f'{self.model_name}{self.model_size}'
        if self.is_segment:
            self.model_fullname += 'seg'
        elif self.is_pose:
            self.model_fullname += 'pose'

        model_pref, model_file_name = load_model_config(self.model_cfg_path, self.model_name, self.model_size, self.model_task)
        self.model = AutoBackend(task=self.model_task, model_pref=model_pref, weights=self.weights_path, device=self.device, fuse=True)
        self.model.eval()  # 필수, gradient 연산 비활성화 (없어도 backward 안해주면 backpropa 적용은 안됨)
        self.done_setup = True
        print(f'[debug][{self.get_package_name()}] successfully loaded(setup) {model_file_name}.')
    
    def warmup_model(self):
        if self.done_setup:
            for i in range(3):
                self.model.warmup(imgsz=(self.batch_size, 3, *[self.input_size]*2))
            print(f'[debug][{self.get_package_name()}] successfully warmed up {self.model_fullname} model.')
            self.done_warmup = True
        else:
            print(f'[error][{self.get_package_name()}] warmup should be tried after setting up model:{self.model_fullname}.')
    
    @abstractmethod
    def preprocess(self, img):
        pass
    
    @abstractmethod
    def postprocess(self, preds):
        return preds
    
    def run_once(self, img):
        if self.done_setup:
            orig_shape = img.shape
            
            # Preprocess
            if self.letterbox:
                img = LetterBox(self.input_size, True, stride=32)(image=img)
            else:
                img = cv2.resize(img, [self.input_size]*2, interpolation=cv2.INTER_AREA)
            
            input_shape = img.shape
            img = img.transpose((2, 0, 1))[::-1]  # HWC to CHW, BGR to RGB
            img = np.ascontiguousarray(img)  # contiguous
            img = self.preprocess(img)
            if len(img.shape) == 3:
                img = img[None]  # expand for batch dim
            
            # Inference
            preds = self.model(img)
            # Postprocess
            boxes, adapt_output = self.postprocess(preds, input_shape, orig_shape)  # 절대 좌표 xyxy
            pred_arr = boxes.cpu().numpy()
            
            if self.is_segment:
                mask_arr = None
                if not adapt_output is None:
                    mask_arr = adapt_output.cpu().numpy()
                return pred_arr, mask_arr  # segment
            elif self.is_pose:
                kpts_arr = None
                if not adapt_output is None:
                    kpts_arr = adapt_output.cpu().numpy()
                return pred_arr, kpts_arr  # pose
            else:
                return pred_arr  # detect
        else:
            # TODO: logger
            exit()
            
    def run_iter(self, imgs):
        # TODO
        pass
    
    def run_batch(self, imgs):
        # TODO
        pass

    
class CocodetDetOperator(CocodetBaseOperator):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_segment = False
    
    def preprocess(self, img):
        img = (img if isinstance(img, torch.Tensor) else torch.from_numpy(img)).to(self.model.device)
        img = img.half() if self.model.fp16 else img.float()  # uint8 to fp16/32
        img /= 255  # 0 - 255 to 0.0 - 1.0
        return img

    def postprocess(self, preds, in_shape, out_shape):
        p = non_max_suppression(preds[0],
                                self.conf_thresh,
                                self.nms_thresh,
                                agnostic=False,
                                max_det=self.max_det,
                                nc=len(self.class_indexes),
                                classes=self.class_indexes)
        if self.expand_box:
            xywh = xyxy2xywh(p[0][:, :4])
            xywh[:, 2:4] = xywh[:, 2:4] * self.bbox_expand_ratio
            p[0][:, :4] = xywh2xyxy(xywh)
        
        p[0][:, :4] = scale_boxes(in_shape[:2], p[0][:, :4], out_shape)
        return p[0][:, :6], None


class CocodetSegOperator(CocodetDetOperator):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_segment = True
        self.__mask_cvt = SegMaskConverter(self.mask_container_size)
    
    def postprocess(self, preds, in_shape, out_shape):
        p = non_max_suppression(preds[0],
                                self.conf_thresh,
                                self.nms_thresh,
                                agnostic=False,
                                max_det=self.max_det,
                                nc=len(self.class_indexes),
                                classes=self.class_indexes)
        if self.expand_box:
            xywh = xyxy2xywh(p[0][:, :4])
            xywh[:, 2:4] = xywh[:, 2:4] * self.bbox_expand_ratio
            p[0][:, :4] = xywh2xyxy(xywh)
        proto = preds[1][-1] if len(preds[1]) == 3 else preds[1]  # second output is len 3 if pt, but only 1 if exported
        p[0][:, :4] = scale_boxes(in_shape[:2], p[0][:, :4], out_shape)
        masks = None
        if p[0].shape[0] > 0:
            masks = process_mask_container(proto[0], p[0][:, 6:], p[0][:, :4], 
                                           out_shape[:2], self.mask_container_size)  # HWC
        
        return p[0][:, :6], masks
    
    def get_mask_converter(self) -> SegMaskConverter:
        return self.__mask_cvt


class CocodetPoseOperator(CocodetDetOperator):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_pose = True
        self.class_indexes = range(1)
    
    def postprocess(self, preds, in_shape, out_shape):
        p = non_max_suppression(preds[0],
                                self.conf_thresh,
                                self.nms_thresh,
                                agnostic=False,
                                max_det=self.max_det,
                                nc=len(self.class_indexes),
                                classes=self.class_indexes)
        
        if self.expand_box:
            xywh = xyxy2xywh(p[0][:, :4])
            xywh[:, 2:4] = xywh[:, 2:4] * self.bbox_expand_ratio
            p[0][:, :4] = xywh2xyxy(xywh)
        
        p[0][:, :4] = scale_boxes(in_shape[:2], p[0][:, :4], out_shape)
        print(p[0].shape)
        pred_kpts = p[0][:, 6:].view(len(p[0]), 17, 3) if len(p[0]) else p[0][:, 6:]  # kpt_shape: [17, 3], (x, y, conf)
        pred_kpts = scale_coords(in_shape[:2], pred_kpts, out_shape)

        return p[0][:, :6], pred_kpts
    