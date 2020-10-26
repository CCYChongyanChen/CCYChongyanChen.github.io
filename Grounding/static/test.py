import os

# mylist = os.listdir("G://3rd_semester//Graduate Thesis//First_Draft//VQA//Results//results")
# print(list(set([int(file_name.split("_")[2].split(".")[0]) for file_name in mylist])))

path="static/QA_Annotations/val.json"
import json
with open(path,encoding='utf-8') as f:
    data = json.load(f)
    for i in range(len(data)):
        filename=data[i]["image"]+"_QAannotations.json"
        # filename="0000"+str(i+1163)+"_questions.json"
        with open("static/QA_annotations/"+filename, 'w') as json_file:
            json.dump([data[i]], json_file)