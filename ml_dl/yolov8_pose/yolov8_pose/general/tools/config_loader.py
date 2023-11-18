from types import SimpleNamespace
import argparse
import re

import yaml  # PyYaml

from .file_checker import assert_file


class ConfigNamespace(SimpleNamespace):
    def __iter__(self):
        """Return an iterator of key-value pairs from the namespace's attributes."""
        return iter(vars(self).items())

    def __str__(self):
        """Return a human-readable string representation of the object."""
        return '\n'.join(f'{k}={v}' for k, v in vars(self).items())

    def get(self, key, default=None):
        """Return the value of the specified key if it exists; otherwise, return the default value."""
        return getattr(self, key, default)
    
    def override(self, cfg_dict, engine_key=None):
        if not engine_key is None and engine_key in cfg_dict.__dict__.keys():
            spec_cfg_dict = cfg_dict.__dict__[engine_key]
            for key, value in spec_cfg_dict.items():
                if key in self.__dict__.keys() and not value is None:
                    self.__dict__.update({key: value})
        elif not cfg_dict is None:
            for key, value in cfg_dict.__dict__.items():
                if key in self.__dict__.keys() and not value is None:
                    self.__dict__.update({key: value})


def __yaml_load(file='data.yaml', append_filename=False):
    assert_file(file, '.yaml')  # yaml 파일 존재 및 확장자 체크
    with open(file, errors='ignore', encoding='utf-8') as f:
        s = f.read()  # string
        if not s.isprintable():
            s = re.sub(r'[^\x09\x0A\x0D\x20-\x7E\x85\xA0-\uD7FF\uE000-\uFFFD\U00010000-\U0010ffff]+', '', s)
        return {**yaml.safe_load(s), 'yaml_file': str(file)} if append_filename else yaml.safe_load(s)


def load_config(config_path):
    cfg_dict = __yaml_load(config_path)
    if cfg_dict is None:
        return ConfigNamespace(**{})
    else:
        for k, v in cfg_dict.items():
            if isinstance(v, str) and v.lower() == 'none':
                cfg_dict[k] = None
        return ConfigNamespace(**cfg_dict)
