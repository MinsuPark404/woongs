import argparse

from general.tools.config_loader import load_config

def argument_parser():
    parser = argparse.ArgumentParser(
        description='', 
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument(
        '-d', '--debug', action='store_true', default=False, help=''
    )

    args = parser.parse_args()
    return args

def load_app_config():
    opt = argument_parser()
    if opt.debug:
        return opt, load_config('./config/debug.yaml')
    else:
        return opt, load_config('./config/release.yaml')