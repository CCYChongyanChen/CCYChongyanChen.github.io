import numpy as np
import cv2

def Toarray(xycoo):
    xycooArray=[[xy["x"],xy["y"]] for xy in xycoo]
    return xycooArray

def IoU(xy1,xy2):
    img1 = np.zeros((400,500,3),np.uint8)
    img2 = np.zeros((400,500,3),np.uint8)
    pts1=np.array(Toarray(xy1),np.int32)
    pts2=np.array(Toarray(xy2),np.int32)
    gt=cv2.fillPoly(img1,[pts1],(255,255,255))
    usr=cv2.fillPoly(img2,[pts2],(255,255,255))
    ROIand = cv2.bitwise_and(gt, usr)
    ROIor = cv2.bitwise_or(gt, usr)

    # intersection = np.logical_and(target, prediction)
    # union = np.logical_or(target, prediction)
    iou_score = np.sum(ROIand) / np.sum(ROIor)
    return iou_score


if __name__ == "__main__":

    GTpolygon=[{'x': 394.1999816894531, 'y': 98.066650390625}, {'x': 2.199981689453125, 'y': 126.066650390625}, {'x': 3.199981689453125, 'y': 408.066650390625}, {'x': 394.1999816894531, 'y': 385.066650390625}, {'x': 394.1999816894531, 'y': 98.066650390625}]
    userpolygon=[{'x': 159.19998168945312, 'y': 29.46661376953125}, {'x': 210.19998168945312, 'y': 29.46661376953125}, {'x': 295.1999816894531, 'y': 44.46661376953125}, {'x': 322.1999816894531, 'y': 60.46661376953125}, {'x': 275.1999816894531, 'y': 316.46661376953125}, {'x': 259.1999816894531, 'y': 326.46661376953125}, {'x': 213.19998168945312, 'y': 328.46661376953125}, {'x': 170.19998168945312, 'y': 328.46661376953125}, {'x': 135.19998168945312, 'y': 323.46661376953125}, {'x': 115.19998168945312, 'y': 311.46661376953125}, {'x': 105.19998168945312, 'y': 303.46661376953125}, {'x': 121.19998168945312, 'y': 72.46661376953125}, {'x': 153.19998168945312, 'y': 41.46661376953125}, {'x': 159.19998168945312, 'y': 29.46661376953125}]

    print(IoU(GTpolygon,userpolygon))