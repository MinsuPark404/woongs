import yaml
import os
import re
from pathlib import Path

def __yaml_load(file='data.yaml', append_filename=False):
    with open(file, errors='ignore', encoding='utf-8') as f:
        s = f.read()  # string
        # Remove special characters
        if not s.isprintable():
            s = re.sub(r'[^\x09\x0A\x0D\x20-\x7E\x85\xA0-\uD7FF\uE000-\uFFFD\U00010000-\U0010ffff]+', '', s)

        # Add YAML filename to dict and return
        return {**yaml.safe_load(s), 'yaml_file': str(file)} if append_filename else yaml.safe_load(s)

def __yaml_model_load(path, scale):
    d = __yaml_load(path) if Path(path).exists() else __yaml_load(str(path).strip())  # model dict
    d['scale'] = scale
    d['yaml_file'] = str(path)
    weight_file_name = f'yolov8{scale}' 
    return d, weight_file_name

def load_model_config(config_path, model_name, model_size, model_task):
    cfg = None
    if model_task == 'detect':
        yaml_path = os.path.join(config_path, f'{model_name}.yaml')
        cfg, weight_file_name = __yaml_model_load(yaml_path, model_size)
    elif model_task == 'segment':
        yaml_path = os.path.join(config_path, f'{model_name}-seg.yaml')
        cfg, weight_file_name = __yaml_model_load(yaml_path, model_size)
    elif model_task == 'pose':
        yaml_path = os.path.join(config_path, f'{model_name}-pose.yaml')
        cfg, weight_file_name = __yaml_model_load(yaml_path, model_size)
    
    return cfg, weight_file_name + '.pth'


