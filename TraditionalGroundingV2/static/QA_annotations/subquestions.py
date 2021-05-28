import json
import random


def filter_Questions(readpath,writepath,randompath="",random_index_path="",randomFlag=False):
    useless_words=["Can you tell me ","Hi ","Thank you","Please tell me ","Can you please tell me ",
                "Could you please tell me ", "Could you tell me ","thank you"]
    with open(readpath,'r',encoding='utf-8') as json_file:
        datas=json.load(json_file)
        subquestions_image_id_list=[]
        subquestions=[]
        for data in datas: 
            tmp_ann={}
            # "what is this? what is this?"->"what is this"
            if data["question"].count("?")>1 and data["question"].split("?")[0]==data["question"].split("?")[1][1:]:
                data["question"]=data["question"].split("?")[0]
            OneQuestionFlag=True
            if data["question"].count(' ')>5:
                for useless_word in useless_words:
                    question_without_useless_words=data["question"].replace(useless_word,'')
                    # if words>5 and ("and" is in the sentence)
                if question_without_useless_words.count(' ')>5 and ((" and " in data["question"]) or (",and " in data["question"])):
                    OneQuestionFlag=False
            if OneQuestionFlag==True:
                subquestions_image_id_list.append(data["image"])
                tmp_ann["answers"]=data["answers"]
                tmp_ann["image"]=data["image"]
                tmp_ann["question"]=data["question"]
                tmp_ann["answer_type"]=data["answer_type"]
                subquestions.append(tmp_ann)

    # save file - without "asking more than one question"
    with open(writepath,'w',encoding="utf-8") as json_file_w:
        json.dump(subquestions,json_file_w)
        
        print("filtered sub count= (un) - (left sub) = "+ str(len(datas)-len(subquestions))  +"=" +str(len(datas))+"-"+str(len(subquestions)))
    if randomFlag==True:
        with open(randompath,'w',encoding="utf-8") as json_file_random:
            index = [i for i in range(len(subquestions))]
            random.shuffle(index)
            shuffled_datas=[subquestions[i] for i in index]
            shuffled_datas_index=[subquestions_image_id_list[i] for i in index]
            json.dump(shuffled_datas,json_file_random)
        with open(random_index_path,'w',encoding="utf-8") as json_file_random_index:
            json.dump(shuffled_datas_index,json_file_random_index)
if __name__ == "__main__":
    split="train"
    Rpath=split+"_clean.json"
    Wpath=split+"_clean_wo_sub.json"
    random_path=split+"_randomized.json"
    random_i_path=split+"_randomized_index.json"
    filter_Questions(Rpath, Wpath, random_path,random_i_path, randomFlag=True)

# save file - randomized 

