import torch
import numpy as np
from PIL import Image

import torchvision.transforms as T

"""
8.7952 for batch_transform_iteration
11.7815 for batch_transform_numpy
5.8736 for batch_transform_numpy_enhance
5.4867 for batch_transform_retinaface
5.0339 for batch_transform_retinaface_enhance
2.5233 for batch_transform_retinaface_enhance  # pre-defined mean-subtraction float arr
"""

__PREDEF_UINT8MAX_RGB_F = np.array((255., 255., 255.), dtype=np.float32)
__PREDEF_MEAN_RGB_F = np.array((0.485, 0.456, 0.406), dtype=np.float32)
__PREDEF_STD_RGB_F = np.array((0.229, 0.224, 0.225), dtype=np.float32)
_MEMOIZ_SUB_RGB_F = __PREDEF_MEAN_RGB_F / __PREDEF_STD_RGB_F  # memoizated constant matrix
_MEMOIZ_DIV_RGB_F = __PREDEF_UINT8MAX_RGB_F * __PREDEF_STD_RGB_F  # memoizated constant matrix
_PREDEF_MEAN_BGR_DF = np.array((104., 117., 123.), dtype=np.float32)  # only for retinaface


def batch_sampling_pylist(imgs, batch_size=128):
    l_imgs = list(range(len(imgs)))
    batches = [imgs[i:j] for i, j in zip(l_imgs[::batch_size], l_imgs[batch_size::batch_size]+[None])]
    return batches


'''
def batch_transform_iteration(imgs, transform, device='cuda:0'):  # BGR input RGB out
    img_tensors_1 = []
    
    for img in imgs:
        img_tensors_1.append(torch.unsqueeze(transform(Image.fromarray(img[..., ::-1])), 0))  # RGB conversion
    imgs_1 = torch.cat(img_tensors_1, 0)
    imgs_1 = imgs_1.to(device).float()
    return imgs_1
'''  # NOTE slow code

'''
def batch_transform_retinaface(imgs):  # BGR input BGR out
    img_tensors_1 = []
    for img in imgs:
        img = np.float32(img)
        img -= (104., 117., 123.)
        img = img.transpose(2, 0, 1)
        img = torch.from_numpy(img).unsqueeze(0)
        img_tensors_1.append(img)
        # img_tensors_1.append(torch.unsqueeze(transform(Image.fromarray(img)), 0))
    # print(img_tensors[0].shape)
    imgs_1 = torch.cat(img_tensors_1, 0)
    imgs_1 = imgs_1.to('cuda:0')  #.float()
    return imgs_1
'''  # NOTE slow code


def batch_transform_retinaface(imgs, device='cuda:0'):  # BGR input BGR out
    """
    Use only for batch supplyment of biubug6/Pytorch_Retinaface.
    The retinaface model of modelx trained as following github repository.
    NOTE biubug6/Pytorch_Retinaface uses BGR color order
    [refer] https://github.com/biubug6/Pytorch_Retinaface/blob/master/train.py

    Args:
        imgs (list): list of numpy.ndarray(dtype=np.uint8) images

    Returns:
        torch.Tensor: _description_
    """
    img_tensor_batch = np.stack(imgs, axis=0)  # BGR direct input
    img_tensor_batch = np.float32(img_tensor_batch)
    img_tensor_batch -= _PREDEF_MEAN_BGR_DF
    img_tensor_batch = img_tensor_batch.transpose(0, 3, 1, 2)  # b, c, h, w
    img_tensor_batch = torch.from_numpy(img_tensor_batch).to(device)
    return img_tensor_batch


'''
def batch_transform_numpy(imgs: list, device='cuda:0'):  # BGR input RGB out
    img_tensor_batch = np.stack(imgs, axis=0)[..., ::-1]  # RGB conversion
    img_tensor_batch = np.float32(img_tensor_batch)
    img_tensor_batch /= 255.
    img_tensor_batch -= (0.485, 0.456, 0.406)
    img_tensor_batch /= (0.229, 0.224, 0.225)
    img_tensor_batch = img_tensor_batch.transpose(0, 3, 1, 2)  # b, c, h, w
    img_tensor_batch = torch.from_numpy(img_tensor_batch).to(device)
    return img_tensor_batch
'''  # NOTE slow code


def batch_transform_numpy(imgs: list, device='cuda:0'):  # BGR input RGB out
    img_tensor_batch = np.stack(imgs, axis=0)[..., ::-1].astype(np.float32)  # RGB conversion
    img_tensor_batch /= _MEMOIZ_DIV_RGB_F
    img_tensor_batch -= _MEMOIZ_SUB_RGB_F
    img_tensor_batch = img_tensor_batch.transpose(0, 3, 1, 2)  # b, c, h, w
    img_tensor_batch = torch.from_numpy(img_tensor_batch).to(device)
    return img_tensor_batch
