import cv2
import numpy as np
import time


CROP_IMG_WH_RAT = .5  # width / height
CROP_DSIZE = (64, 128)


def __letterbox(img, dsize):  # dsize = (width, height)
    h, w = img.shape[:2]
    img_wh_rat = w/h
    if img_wh_rat == CROP_IMG_WH_RAT:  # 비율 똑같을 때
        # 어디에 맞추든 상관없음
        interp = cv2.INTER_AREA if h > dsize[1] else cv2.INTER_CUBIC
        return cv2.resize(img, dsize=dsize, interpolation=interp)
    else:
        bg = np.ones((dsize[1], dsize[0], 3), dtype=np.uint8) * 128
        if img_wh_rat < CROP_IMG_WH_RAT:  # 너비가 좁을 때(높이가 길때) -> 좌우 패딩 부여
            # 상하에 맞춰 리사이즈
            interp = cv2.INTER_AREA if h > dsize[1] else cv2.INTER_CUBIC
            dh = dsize[1]
            dw = (w * dh) // h
            if dw % 2 != 0:
                dw += 1
            resized = cv2.resize(img, (dw, dh), interpolation=interp) 
            cx = dsize[0] // 2
            bg[:, cx - (dw // 2):cx + (dw // 2), :] = resized
        else:  # 너비가 넓을 때(높이가 짧을때) -> 상하 패딩 부여
            # 좌우에 맞춰 리사이즈
            interp = cv2.INTER_AREA if w > dsize[0] else cv2.INTER_CUBIC
            dw = dsize[0]
            dh = (h * dw) // w
            if dh % 2 != 0:
                dh += 1
            resized = cv2.resize(img, (dw, dh), interpolation=interp)
            cy = dsize[1] // 2
            bg[cy - (dh // 2):cy + (dh // 2), :, :] = resized
        return bg


# 1080p 기준 box 1000개 1회 호출 1.2ms
def crop_boxes(img, boxes):
    cropped = []
    for x0, y0, x1, y1 in boxes[:, :4].astype(int):
        crop = img[y0:y1, x0:x1, :]
        if min(crop.shape) > 0:
            cropped.append(__letterbox(crop, CROP_DSIZE))
            # cropped.append(cv2.resize(crop, (64, 128), interpolation=cv2.INTER_CUBIC))
        else:
            cropped.append(np.ones((128, 64, 3), dtype=np.uint8))
    return cropped


def objectness_by_size(pred):
    pred = pred[(pred[:, 2] - pred[:, 0]) * (pred[:, 3] - pred[:, 1]) > 800.]
    return pred


def wait_for_ipc(ipc):
    while ipc.qsize() < 1:
        time.sleep(0.001)


def get_letterbox(box):  # dsize = (width, height)
    x0, y0, x1, y1 = box  # int box
    h = y1 - y0 
    w = x1 - x0
    cx = x0 + (w/2)
    cy = y0 + (h/2)
    img_wh_rat = w/h
    dbox = np.array(box, dtype=int)
    if img_wh_rat == CROP_IMG_WH_RAT:  # 비율 똑같을 때
        # 어디에 맞추든 상관없음
        pass
    else:
        if img_wh_rat < CROP_IMG_WH_RAT:  # 너비가 좁을 때(높이가 길때) -> 좌우 패딩 부여
            # 상하에 맞춰 리사이즈
            dw = h * CROP_IMG_WH_RAT
            dbox = [cx-(dw/2), y0, cx+(dw/2), y1]
        else:  # 너비가 넓을 때(높이가 짧을때) -> 상하 패딩 부여
            # 좌우에 맞춰 리사이즈
            dh = w / CROP_IMG_WH_RAT
            dbox = [x0, cy-(dh/2), x1, cy+(dh/2)]
    return np.array(dbox, dtype=int)


class RoIMask:
    def __init__(self, mask_path):
        self.mask = cv2.imread(mask_path, cv2.IMREAD_GRAYSCALE)
            
    def masking(self, img):
        img_cp = img.copy()
        img_cp = cv2.bitwise_and(img_cp, img_cp, mask=self.mask)
        return img_cp



def plot_one_box(x, img, color=None, label: str = None, line_thickness=None):
    # Plots one bounding box on image img
    tl = line_thickness or round(0.001 * (img.shape[0] + img.shape[1]) / 2) + 1  # line/font thickness
    # color = color or [random.randint(0, 255) for _ in range(3)]
    color = color or [0, 0, 255]
    c1, c2 = (int(x[0]), int(x[1])), (int(x[2]), int(x[3]))
    cv2.rectangle(img, c1, c2, color, thickness=tl, lineType=cv2.LINE_AA)
    if label:
        tf = max(tl - 1, 1)  # font thickness
        t_size = cv2.getTextSize(label, 0, fontScale=tl / 3, thickness=tf)[0]
        c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3
        cv2.rectangle(img, c1, c2, color, -1, cv2.LINE_AA)  # filled
        cv2.putText(img, label, (c1[0], c1[1] - 2), 0, tl / 3, [128, 128, 128], thickness=tf, lineType=cv2.LINE_AA)
    return img