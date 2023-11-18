import numpy as np
import torch
import torch.nn as nn
from .models import DetectionModel, SegmentationModel, PoseModel


class AutoBackend(nn.Module):
    def __init__(self,
                 task,
                 model_pref,
                 weights='yolov8n.pt',
                 device='cpu',
                 fp16=False,
                 fuse=True
                 ):
        
        device = torch.device(device)# custom
        super().__init__()
        w = str(weights[0] if isinstance(weights, list) else weights)
        pt = True
        fp16 &= pt  # FP16
        model, metadata = None, None

        if task == 'detect':
            model = DetectionModel(model_pref)
        elif task == 'segment':
            model = SegmentationModel(model_pref)
        elif task == 'pose':
            model = PoseModel(model_pref)
        
        load_dict = torch.load(weights, map_location=lambda storage, loc: storage)
        pretrain_dict = load_dict['state_dicts']
        model.load_state_dict(pretrain_dict, strict=True)
        self.model = model
        self.model.to(device).float() 
        self.model.eval()
        self.__dict__.update(locals())
        
    def forward(self, im):
        b, ch, h, w = im.shape  # batch, channel, height, width
        if self.fp16 and im.dtype != torch.float16:
            im = im.half()  # to FP16

        if self.pt:  # PyTorch
            y = self.model(im)
        
        if isinstance(y, (list, tuple)):
            return self.from_numpy(y[0]) if len(y) == 1 else [self.from_numpy(x) for x in y]
        else:
            return self.from_numpy(y)

    def from_numpy(self, x):
        return torch.tensor(x).to(self.device) if isinstance(x, np.ndarray) else x

    def warmup(self, imgsz=(1, 3, 640, 640)):
        warmup_types = [self.pt]
        if any(warmup_types) and (self.device.type != 'cpu'):
            im = torch.empty(*imgsz, dtype=torch.half if self.fp16 else torch.float, device=self.device)  # input
            for _ in range(1):  #
                self.forward(im)  # warmup
