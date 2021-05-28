import json
import os
import sys
import re
import numpy as np
from Preprocess import processed_answer
from subquestions import filter_Questions
def most_frequent(List): 
    counter = 4
    num = None
    for i in List: 
        curr_frequency = List.count(i) 
        if(curr_frequency> counter): 
            counter = curr_frequency 
            num = i 
    return num 

def count_unanswerable_vq(path):
    count_vq_unanswerable=0
    with open(path,encoding="utf-8") as json_file:
        datas = json.load(json_file)
        for data in datas:
            if data["answer_type"]=="unanswerable":
                count_vq_unanswerable+=1
    return count_vq_unanswerable

def unanswerable_multiquestions_mostcommon(path,write_unanswerable_path,write_subquestion_path,final_path):
    count=0
    filtered_mostcommon_count=0
    count_vq_answerable=0
    unanswerable_datas=[]
    with open(path,encoding="utf-8") as json_file:
        with open(write_unanswerable_path,'w',encoding="utf-8") as json_file_w:
            datas = json.load(json_file)
            for data in datas:
                # unanswerable questions
                if data["answer_type"]!="unanswerable":
                    count_vq_answerable+=1
                    unanswerable_datas.append(data)

            json.dump(unanswerable_datas,json_file_w)
    filter_Questions(write_unanswerable_path,write_subquestion_path)


    with open(write_subquestion_path,encoding="utf-8") as json_file_2:
        with open(final_path,'w',encoding="utf-8") as json_file_w2:
            datas = json.load(json_file_2)
            MostCommon_ann=[]
            for data in datas:
                tmp_ann={}
                tmp_answers=[i['answer'] for i in data["answers"]]
                answerable_answers=list(filter(lambda x:x!="unsuitable" and x!="unsuitable image" and x!="unanswerable",tmp_answers))
                p_answerable_answers=processed_answer(answerable_answers)
                # filtering answers; if more than three workers agree on it, then keep it.
                most_freq_answer=most_frequent(p_answerable_answers)
                if most_freq_answer is None:
                    filtered_mostcommon_count+=1
                else:
                    
                    count+=1
                    tmp_ann["answers"]=[most_freq_answer]
                    tmp_ann["image"]=data["image"]
                    tmp_ann["question"]=data["question"]
                    tmp_ann["answer_type"]=data["answer_type"]
                    MostCommon_ann.append(tmp_ann)
            json.dump(MostCommon_ann,json_file_w2)
    print("filtered most common count= (un_sub)-(left vq)="+str(filtered_mostcommon_count)+ " = "+str(len(datas))+"-"+str(count))

def unanswerable_MostCommon(path,mostcommonpath):
    count=0
    count_vq_answerable=0
    MostCommon_ann=[]

    with open(path,encoding="utf-8") as json_file:
        with open(mostcommonpath,'w',encoding="utf-8") as json_file_w:
            datas = json.load(json_file)
            for data in datas:
                tmp_ann={}
                # unanswerable questions
                if data["answer_type"]!="unanswerable":
                    count_vq_answerable+=1
                    tmp_answers=[i['answer'] for i in data["answers"]]
                    answerable_answers=list(filter(lambda x:x!="unsuitable" and x!="unsuitable image" and x!="unanswerable",tmp_answers))
                    p_answerable_answers=processed_answer(answerable_answers)
                    # filtering answers; if more than three workers agree on it, then keep it.
                    most_freq_answer=most_frequent(p_answerable_answers)
                    if most_freq_answer is None:
                        pass
                    else:
                        
                        count+=1
                        tmp_ann["answers"]=[most_freq_answer]
                        tmp_ann["image"]=data["image"]
                        tmp_ann["question"]=data["question"]
                        tmp_ann["answer_type"]=data["answer_type"]
                        MostCommon_ann.append(tmp_ann)
            json.dump(MostCommon_ann,json_file_w)
    print("count_vq_answerable: ",count_vq_answerable)
    print("count: ",count)



# random and index
def Random_Index(random_path,group_answers):
    with open(random_path,encoding="utf-8") as json_file_gr:
        with open(group_answers,'w',encoding="utf-8") as json_file_gw:
            datas = json.load(json_file_gr)
            group=[datas[i:i+5] for i in range(0, len(datas), 5)]
            json.dump(group,json_file_gw)

if __name__ == "__main__":


    """===========================================================
            Use for generating
    ============================================================="""
    # split="test"
    # path=split+".json"
    # mostcommonpath=split+"_most_common_6.json"
    # Wpath=split+"_mostcommon_sub_6.json"
    # random_path=split+"_mostcommon_sub_rand_6.json"
    # random_i_path=split+"_mostcommon_sub_rand_index_6.json"
    # group_answers=split+"_grouped_6.json"
    # # process
    # unanswerable_MostCommon(path,mostcommonpath)
    # filter_Questions(mostcommonpath, Wpath, random_path,random_i_path, randomFlag=True)
    # Random_Index(random_path,group_answers)

    """=========================================================
            Use for counting
    ============================================================"""

    # #2. counting unanswerable
    # counting_unanswerable_total=0
    for split in ["test","train","val"]:
        path=split+".json"

    #     counting_unanswerable_total+=count_unanswerable_vq(path)
    # print("counting_unanswerable_total: ",counting_unanswerable_total)

    # 3. unanswerable->subquestions

        print(split,"\n")
        unanswerable_path = split+"_unanswerable.json"
        subquestion_path = split + "_unanswerable_subquestion.json"
        final_path = split+"_unanswerable_subquestion_mostcommon.json"
        unanswerable_multiquestions_mostcommon(path,unanswerable_path, subquestion_path,final_path)
