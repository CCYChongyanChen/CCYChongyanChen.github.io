import json

import random
common_question_list=["Can you tell me what is this?",""]
#569
count=0

useless_words=["Can you tell me ","Hi ","Thank you","Please tell me ","Can you please tell me ",
            "Could you please tell me ", "Could you tell me ","thank you"]
split="train"
readpath=split+"_clean.json"
writepath=split+"_clean_wo_sub.json"
randompath=split+"_randomized.json"
random_index_path=split+"_randomized_index.json"
with open(readpath,'r',encoding='utf-8') as json_file:
    
    datas=json.load(json_file)


    subquestions_image_id_list=[]
    subquestions=[]
    print(len(datas))
    print(len(datas)-557)
    for data in datas: 
        
        tmp_ann={}
        # "what is this? what is this?"->"what is this"
        if data["question"].count("?")>1 and data["question"].split("?")[0]==data["question"].split("?")[1][1:]:
            data["question"]=data["question"].split("?")[0]

        if data["question"].count(' ')>5:
            for useless_word in useless_words:
                question_without_useless_words=data["question"].replace(useless_word,'')
            if question_without_useless_words.count(' ')>5:
                if (" and " not in data["question"]) and (",and " not in data["question"]):
                # if (" and " in data["question"]) or (",and "  in data["question"]):
                    subquestions_image_id_list.append(data["image"])
                    tmp_ann["answers"]=data["answers"]
                    tmp_ann["image"]=data["image"]
                    tmp_ann["question"]=data["question"]
                    tmp_ann["answer_type"]=data["answer_type"]
                    subquestions.append(tmp_ann)
            else:
                subquestions_image_id_list.append(data["image"])
                tmp_ann["answers"]=data["answers"]
                tmp_ann["image"]=data["image"]
                tmp_ann["question"]=data["question"]
                tmp_ann["answer_type"]=data["answer_type"]
                subquestions.append(tmp_ann)


        else:
            subquestions_image_id_list.append(data["image"])
            tmp_ann["answers"]=data["answers"]
            tmp_ann["image"]=data["image"]
            tmp_ann["question"]=data["question"]
            tmp_ann["answer_type"]=data["answer_type"]
            subquestions.append(tmp_ann)


# save file - without "asking more than one question"

with open(writepath,'w',encoding="utf-8") as json_file_w:
    json.dump(subquestions,json_file_w)
    print(len(subquestions))
    print(len(subquestions_image_id_list))






# save file - randomized 





with open(randompath,'w',encoding="utf-8") as json_file_random:
    index = [i for i in range(len(subquestions))]
    random.shuffle(index)
    shuffled_datas=[subquestions[i] for i in index]
    shuffled_datas_index=[subquestions_image_id_list[i] for i in index]
    json.dump(shuffled_datas,json_file_random)


with open(random_index_path,'w',encoding="utf-8") as json_file_random_index:
    json.dump(shuffled_datas_index,json_file_random_index)



    # index = [i for i in range(len(datas))]
    # random.shuffle(index)
    # shuffled_datas=[datas[i] for i in index]


    # subquestions_image_id_list=[]
    # subquestions={}
    # print()
    # for data in shuffled_datas: 