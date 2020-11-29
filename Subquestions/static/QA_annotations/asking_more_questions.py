import json
count=0
path="G://PhD_1//CVPR_my_paper//vizwiz_annotation//Annotations//train_clean.json"
with open(path,'r',encoding='utf-8') as json_file:
    datas=json.load(json_file)
    image_ids_MoreThanTwoQuestionMarkers=[]
    for data in datas: 
        if data["question"].count("?")>1:
            if data["question"].split("?")[0]!=data["question"].split("?")[1][1:]:
                print(data["question"])
                print(data["image"],"\n")
            count+=1
            image_ids_MoreThanTwoQuestionMarkers.append(data["image"])
print(count)
print(len(image_ids_MoreThanTwoQuestionMarkers))
