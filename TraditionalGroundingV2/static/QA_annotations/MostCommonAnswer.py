import json
import os
import sys
import re
import numpy as np
from Preprocess import processed_answer
from subquestions import filter_Questions
def most_frequent(List): 
    counter = 0
    num = List[0] 
    for i in List: 
        curr_frequency = List.count(i) 
        if(curr_frequency> counter): 
            counter = curr_frequency 
            num = i 
    return num 
split="train"
path=split+".json"
mostcommonpath=split+"_most_common.json"
Wpath=split+"_mostcommon_sub.json"
random_path=split+"_mostcommon_sub_rand.json"
random_i_path=split+"_mostcommon_sub_rand_index.json"
group_answers=split+"_grouped.json"
MostCommon_ann=[]
with open(path,encoding="utf-8") as json_file:
    with open(mostcommonpath,'w',encoding="utf-8") as json_file_w:
        datas = json.load(json_file)
        for data in datas:
            tmp_ann={}
            if data["answer_type"]!="unanswerable":
                tmp_answers=[i['answer'] for i in data["answers"]]
                answerable_answers=list(filter(lambda x:x!="unsuitable" and x!="unsuitable image" and x!="unanswerable",tmp_answers))
                p_answerable_answers=processed_answer(answerable_answers)
                most_freq_answer=most_frequent(p_answerable_answers)
                tmp_ann["answers"]=[most_freq_answer]
                tmp_ann["image"]=data["image"]
                tmp_ann["question"]=data["question"]
                tmp_ann["answer_type"]=data["answer_type"]
                MostCommon_ann.append(tmp_ann)
        json.dump(MostCommon_ann,json_file_w)



filter_Questions(mostcommonpath, Wpath, random_path,random_i_path, randomFlag=True)




with open(random_path,encoding="utf-8") as json_file_gr:
    with open(group_answers,'w',encoding="utf-8") as json_file_gw:
        datas = json.load(json_file_gr)
        group=[datas[i:i+5] for i in range(0, len(datas), 5)]
        json.dump(group,json_file_gw)

