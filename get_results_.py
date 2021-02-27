import boto3
import json
import pandas as pd
MTURK_SANDBOX = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'
mturk = boto3.client('mturk',
   aws_access_key_id = "ENTER YOUR KEY",
   aws_secret_access_key = "ENTER YOUR KEY",
   region_name='us-east-1',
   endpoint_url = MTURK_SANDBOX
)
# You will need the following library
# to help parse the XML answers supplied from MTurk
# Install it in your local environment with
# pip install xmltodict
import xmltodict


def get_ann_results(task):
    hitID_path=task+'_hitID.txt'
    csv_path=task+"_results.csv"
    json_path=task+"_results.json"
    # Use the hit_id previously created
    with open (hitID_path,'r') as f:
        lines=f.read().splitlines()
        
    JSON={}
    DF=pd.Series([])
    # We are only publishing this task to one Worker
    # So we will get back an array with one item if it has been completed
    for line in lines:
        hit_id = line.split(";")[1].split(":")[1]

        groupindex = line.split(";")[0].split(":")[1]
        c = line.split(";")[0].split(":")[1]
        worker_results = mturk.list_assignments_for_hit(HITId=hit_id, AssignmentStatuses=['Submitted'])#'Approved',Submitted,Rejected

        if worker_results['NumResults'] > 0:
            for assignment in worker_results['Assignments']:
                xml_doc = xmltodict.parse(assignment['Answer'])
            
                # print ("HIT_ID:"+hit_id)
                if type(xml_doc['QuestionFormAnswers']['Answer']) is list:
                # Multiple fields in HIT layout
                    for answer_field in xml_doc['QuestionFormAnswers']['Answer']:
                        if str(answer_field['QuestionIdentifier'])=="hiddenAnswer":
                            XY=json.loads(answer_field['FreeText'])
                            # print ("For input field: " + str(answer_field['QuestionIdentifier']))
                            # print ("Submitted answer: " + str(answer_field['FreeText']))
                        elif str(answer_field['QuestionIdentifier'])=="hiddenXY":
                            options=json.loads(answer_field['FreeText'])
                        elif str(answer_field['QuestionIdentifier'])=="WORKER_COMMENTS":
                            comments=(answer_field['FreeText'])
                        elif str(answer_field['QuestionIdentifier'])=="usetime":
                            usetime=(answer_field['FreeText'])
                            # print ("For input field: " + str(answer_field['QuestionIdentifier']))
                            # print ("Submitted answer: " + str(answer_field['FreeText']))
                #   else:
                #      # One field found in HIT layout
                #      print ("For input field: " + xml_doc['QuestionFormAnswers']['Answer']['QuestionIdentifier'])
                #      print ("Submitted answer: " + xml_doc['QuestionFormAnswers']['Answer']['FreeText'])
                    All_answers={groupindex:{"Hit_id":hit_id,"Ready":"Yes","UseTime":usetime,**XY,**options,"comments":comments}}
            
        else:
            All_answers={groupindex:{"Hit_id":hit_id,"Ready":"No"}}
        df = pd.DataFrame.from_dict(All_answers, orient="index")
        JSON={**JSON,**All_answers}
        DF=pd.concat([DF,df])
    DF.to_csv(csv_path)

    with open (json_path,'w') as jsonf:
        json.dump(JSON, jsonf, indent=4, sort_keys=True)




if __name__ == "__main__":
    tasks=["qualification_gt","qualification_eva","train","val","test"]
    task=tasks[0]
    get_ann_results(task)


