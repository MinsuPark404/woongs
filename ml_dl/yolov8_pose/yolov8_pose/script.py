import os

import cv2
import numpy as np
from tqdm import tqdm
import torch

from config.config import load_app_config
from general.tools.misc import plot_one_box
from general.tools.torch_tools import inference_mode
from packages.nn_cocodet_engine.operator import CocodetSegOperator, CocodetDetOperator, CocodetPoseOperator


'''
'''


data_directory = 'C:/Users/content6/Desktop/samplecode'
video_file_name = 'test_object_detect_sample.mp4'
video_file_path = os.path.join(data_directory, video_file_name)
output_file_name = './test_object_detect_sample_result.mp4'


'''
'''


os.makedirs(os.path.split(output_file_name)[0], exist_ok=True)
arg_opt, app_cfg = load_app_config()

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_file_name, fourcc, 30., (1920, 1080))  # 동영상 저장, 해상도 및 fps 지정

cap = cv2.VideoCapture(video_file_path)  # 웹캠이나 IP캠에서 동영상 프레임 받아오는 코드
now_cap_index = 0
tot_cap_frame = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
engine = CocodetDetOperator(app_cfg)  # Det 또는 Seg 선택
# mask_converter = engine.get_mask_converter()  # Seg에서만 필요


'''
'''


with torch.inference_mode():  # torch 1.9.0 이하일 경우: torch.no_grad
    for idx in tqdm(range(tot_cap_frame)):
        ret, frame = cap.read()  # 만약 1920*1080
        if ret:
            # frame = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)  # 이미지 원본 해상도 낮추고 싶을 때

            bboxes, kpts = engine.run_once(frame)
            
            # human_bboxes = bboxes[bboxes[:, 5].astype(int) == 0]  # (객체 갯수, (x, y, x, y, conf, cls)) = (n, 6)
            
            for idx, (box, kpt) in enumerate(zip(bboxes, kpts)):
                # kpt: 키포인트, (shape: 17, 3)  3: x, y, conf
                
                plot_one_box(box[:4].astype(int), frame, label = f'{box[4]:.4f}')
                
            cv2.imshow('test', frame)  # local에서 확인용
            out.write(frame)  # 동영상 저장 

            k = cv2.waitKey(1)
            if k == ord('q'):  # 키보드 Q 누르면 데모 종료
                cv2.destroyAllWindows()
                break
            elif k == ord(' '):  # 키보드 스페이스 누르면 데모 일시정지
                wait = True
                while wait:
                    key = cv2.waitKey(0)
                    if key == ord(' '):
                        wait = False
            
            now_cap_index += 1

cv2.destroyAllWindows()
cap.release()



'''
아래는 첫프레임만 한번 돌리는 코드
'''


with torch.inference_mode():  # torch 1.9.0 이하일 경우: torch.no_grad
    for idx in tqdm(range(tot_cap_frame)):
        ret, frame = cap.read()  # 만약 1920*1080
        if ret:
            # frame = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)  # 이미지 원본 해상도 낮추고 싶을 때

            bboxes, kpts = engine.run_once(frame)
            
            # human_bboxes = bboxes[bboxes[:, 5].astype(int) == 0]  # (객체 갯수, (x, y, x, y, conf, cls)) = (n, 6)
            
            for idx, (box, kpt) in enumerate(zip(bboxes, kpts)):
                # kpt: 키포인트, (shape: 17, 3)  3: x, y, conf
                
                plot_one_box(box[:4].astype(int), frame, label = f'{box[4]:.4f}')
                
            cv2.imshow('test', frame)  # local에서 확인용
            out.write(frame)  # 동영상 저장 

            k = cv2.waitKey(1)
            if k == ord('q'):  # 키보드 Q 누르면 데모 종료
                cv2.destroyAllWindows()
                break
            elif k == ord(' '):  # 키보드 스페이스 누르면 데모 일시정지
                wait = True
                while wait:
                    key = cv2.waitKey(0)
                    if key == ord(' '):
                        wait = False
            
            break
            now_cap_index += 1

cv2.destroyAllWindows()
cap.release()


'''
아래는 이미지 파일 한장 돌리는 경우
'''
frame = cv2.imread(video_file_path)


with torch.inference_mode():  # torch 1.9.0 이하일 경우: torch.no_grad
        
    bboxes, kpts = engine.run_once(frame)
    
    # human_bboxes = bboxes[bboxes[:, 5].astype(int) == 0]  # (객체 갯수, (x, y, x, y, conf, cls)) = (n, 6)
    
    for idx, (box, kpt) in enumerate(zip(bboxes, kpts)):
        # kpt: 키포인트, (shape: 17, 3)  3: x, y, conf
        
        plot_one_box(box[:4].astype(int), frame, label = f'{box[4]:.4f}')
    
    cv2.imwrite('./out.png', frame)




