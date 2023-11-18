import numpy as np
import cv2


class SegMaskConverter:
    """ this singleton object MUST be INITIALIZED by Segmentation Operator"""
    __container_size = 0
    __ctn_half = 0
    
    def __init__(self, container_size=None):
        """ this singleton object MUST be INITIALIZED by Segmentation Operator

        Args:
            container_size (_type_, optional): _description_. Defaults to None.
        """
        super().__init__()
        if not container_size is None:
            self.__container_size = container_size
            self.__ctn_half = self.__container_size // 2

    def fit_mask_from_container(self, mask, bbox):
        """ fit mask to bbox from loose container

        Args:
            mask (_type_): _description_
            bbox (_type_): _description_

        Returns:
            _type_: _description_
        """
        
        ibox = bbox.astype(int)
        hh, hw = (ibox[3] - ibox[1]) // 2, (ibox[2] - ibox[0]) // 2
        bh, bw = (ibox[3] - ibox[1]) % 2, (ibox[2] - ibox[0]) % 2
        return mask[self.__ctn_half-hh:self.__ctn_half+hh+bh, 
                    self.__ctn_half-hw:self.__ctn_half+hw+bw].astype(np.uint8)
    
