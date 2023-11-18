import os
from abc import ABCMeta, abstractmethod

from general.tools import load_config

class BaseOperator(metaclass=ABCMeta):
    def __init__(self, __file__):
        self.__file = __file__
    
    def __default_cfg_path(self):
        pth = f'configs/default.yaml'
        return pth

    def get_package_abs_path(self):
        pth, _ = os.path.split(os.path.abspath(self.__file))
        return pth
    
    def get_package_name(self):
        _, name = os.path.split(self.get_package_abs_path())
        return name
    
    def setup_config(self):
        default_cfg_path = os.path.join(self.get_package_abs_path(), self.__default_cfg_path())
        return load_config(default_cfg_path)

    def get_engine_config_path(self):
        return os.path.join(self.get_package_abs_path(), 'models', 'configs')
    
    @abstractmethod
    def setup_model(self):
        pass
    
    @abstractmethod
    def warmup_model(self):
        pass
    
    @abstractmethod
    def run_once(self, img):
        pass
    
    @abstractmethod
    def run_iter(self, imgs):
        pass
    
    @abstractmethod
    def run_batch(self, imgs):
        pass
    