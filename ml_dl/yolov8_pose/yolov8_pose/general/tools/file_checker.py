import os
import hashlib


def assert_file(file_path, ext:str = None, checksum:str = None):
    assert os.path.isfile(file_path)
    if not ext is None:
        assert os.path.splitext(file_path)[-1] == ext
    if not checksum is None:
        assert hash_file_sha256(file_path) == checksum

def check_file(file_path, ext:str = None, checksum:str = None):
    flag = os.path.isfile(file_path)
    if not ext is None:
        flag = flag and os.path.splitext(file_path)[-1] == ext
    if not checksum is None:
        flag = flag and hash_file_sha256(file_path) == checksum
    return flag

def hash_file_sha256(file_path):
    hash = hashlib.sha256(b'').hexdigest()
    if os.path.isfile(file_path):
        f = open(file_path, 'rb')
        data = f.read()
        f.close()
        hash = hashlib.sha256(data).hexdigest()
    return hash
