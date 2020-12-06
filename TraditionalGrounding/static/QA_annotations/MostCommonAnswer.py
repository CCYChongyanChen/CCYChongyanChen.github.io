import json
import os
import sys
import re
import numpy as np
from Preprocess import processed_answer

path="train.json"
cleanpath="train_clean.json"
clean_ann=[]
with open(path,encoding="utf-8") as json_file:
    
    with open(cleanpath,'w',encoding="utf-8") as json_file_w:
        datas = json.load(json_file)
        for data in datas:
            tmp_ann={}
            if data["answer_type"]!="unanswerable":
                tmp_answers=[i['answer'] for i in data["answers"]]
                unique_answer=list(set(tmp_answers))
                unique_answer=list(filter(lambda x:x!="unsuitable" and x!="unsuitable image" and x!="unanswerable",unique_answer))
                p_unique_answer=processed_answer(unique_answer)
                # if c_p_u_answer!=unique_answer:
                # print(p_unique_answer)
                #     print(c_p_u_answer)
                if len(p_unique_answer)>1:
                    tmp_ann["answers"]=p_unique_answer
                    tmp_ann["image"]=data["image"]
                    tmp_ann["question"]=data["question"]
                    tmp_ann["answer_type"]=data["answer_type"]
                    clean_ann.append(tmp_ann)
        json.dump(clean_ann,json_file_w)
