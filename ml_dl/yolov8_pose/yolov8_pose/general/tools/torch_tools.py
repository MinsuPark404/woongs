import pkg_resources as pkg
import re

import torch

def check_version(current: str = '0.0.0',
                  required: str = '0.0.0',
                  compare: str = '==',) -> bool:
    current = pkg.parse_version(current)
    constraints = re.findall(r'([<>!=]{1,2}\s*\d+\.\d+\.\d+)', required) or [f'{compare}{required}']
    # print(constraints)
    result = True
    for constraint in constraints:
        op, version = re.match(r'([<>!=]{1,2})\s*(\d+\.\d+\.\d+)', constraint).groups()
        version = pkg.parse_version(version)
        if op == '==' and current != version:
            # print(current, op, version)
            result = False
        elif op == '!=' and current == version:
            # print(current, op, version)
            result = False
        elif op == '>=' and not (current >= version):
            # print(current, op, version)
            result = False
        elif op == '<=' and not (current <= version):
            # print(current, op, version)
            result = False
        elif op == '>' and not (current > version):
            # print(current, op, version)
            result = False
        elif op == '<' and not (current < version):
            # print(current, op, version)
            result = False
    return result


def inference_mode():
    def wrapper(fn):
        def decorator(*args, **kwargs):
            with (torch.inference_mode if check_version(torch.__version__, '1.9.0', compare='>=') else torch.no_grad)():
                fn(*args, **kwargs)
        return decorator
    return wrapper
