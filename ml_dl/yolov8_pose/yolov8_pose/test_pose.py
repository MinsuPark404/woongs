import os

import cv2
import numpy as np
from tqdm import tqdm

from config.config import load_app_config
from general.tools.misc import plot_one_box
from general.tools.torch_tools import inference_mode
from packages.nn_cocodet_engine.operator import CocodetSegOperator, CocodetDetOperator, CocodetPoseOperator


def draw_keypoints_edges(image, keypoints, frame_number):
     
    keypoints_array = np.empty((0, 4), dtype=int)
    with open("keypoints.txt", "a") as file:
        for kp in keypoints:
            x, y, v = kp
            cv2.circle(image, (x, y), 5, (0, 255, 0), -1)
            # Numpy 배열에 키포인트와 프레임 번호 추가
            keypoints_array = np.vstack([keypoints_array, np.array([x, y, v, frame_number])])
            
        # 키포인트 배열을 텍스트 파일로 저장
        # 'a' 모드는 파일에 이어서 작성(append)하도록 함
            file.write(f"{x},{y},{v},{frame_number}\n")
            # np.savetxt(file, keypoints_array, fmt="%d", delimiter=",")  
     
                    
        
def save_boxes(frame_number, boxes):
    with open("boxes.txt", "a") as file:
        for box in boxes:
            # box 데이터에 프레임 번호를 추가하여 파일에 씁니다
            file.write(f"{frame_number},{','.join(map(str, box[:6]))}\n")        

@inference_mode()
def demo(video_path, output_path='./out'):
    os.makedirs(os.path.split(output_path)[0], exist_ok=True)

    arg_opt, app_cfg = load_app_config()
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, 30., (1920, 1080))  # 동영상 저장, 해상도 및 fps 지정
    
    
    cap = cv2.VideoCapture(video_path)  # 웹캠이나 IP캠에서 동영상 프레임 받아오는 코드
    now_cap_index = 0
    tot_cap_frame = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    engine = CocodetPoseOperator(app_cfg)  # Det 또는 Seg 선택
    # mask_converter = engine.get_mask_converter()  # Seg에서만 필요

    for idx in tqdm(range(tot_cap_frame)):
        ret, frame = cap.read()  # 만약 1920*1080
        if ret:
            # frame = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)  # 이미지 원본 해상도 낮추고 싶을 때

            bboxes, kpts = engine.run_once(frame)
            # 각 박스와 현재 프레임 번호를 파일에 저장
            save_boxes(now_cap_index, bboxes)
            
            # human_bboxes = bboxes[bboxes[:, 5].astype(int) == 0]  # (객체 갯수, (x, y, x, y, conf, cls)) = (n, 6)
            
            for idx, (box, kpt) in enumerate(zip(bboxes, kpts)):
                # kpt: 키포인트, (shape: 17, 3)  3: x, y, conf
                
                plot_one_box(box[:4].astype(int), frame, label = f'{box[4]:.4f}')
                draw_keypoints_edges(frame, kpt.astype(int), now_cap_index)  # 프레임 번호 추가
                
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


if __name__ == '__main__':
    data_directory = 'C:/Users/content6/Desktop/yolov8_pose'
    video_file_name = 'test_object_detect_sample.mp4'
    video_file_path = os.path.join(data_directory, video_file_name)
    output_file_name = './test_object_detect_sample_result.mp4'
    demo(video_file_path, output_file_name)

# 파일 실행: python test_cocodet.py

