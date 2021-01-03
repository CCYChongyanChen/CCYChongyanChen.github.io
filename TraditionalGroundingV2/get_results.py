import boto3
import json
import pandas as pd
MTURK_SANDBOX = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'
mturk = boto3.client('mturk',
   aws_access_key_id = "AKIAIKBODJ4RG6PGQZ4A",
   aws_secret_access_key = "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",
   region_name='us-east-1',
   endpoint_url = MTURK_SANDBOX
)
# You will need the following library
# to help parse the XML answers supplied from MTurk
# Install it in your local environment with
# pip install xmltodict
import xmltodict
# Use the hit_id previously created
with open ('hitID.txt','r') as f:
    hit_ids=f.read().splitlines()


DF=pd.Series([])
# We are only publishing this task to one Worker
# So we will get back an array with one item if it has been completed
for hit_id in hit_ids:
    worker_results = mturk.list_assignments_for_hit(HITId=hit_id, AssignmentStatuses=['Submitted'])

    if worker_results['NumResults'] > 0:
        for assignment in worker_results['Assignments']:
            print(len(worker_results['Assignments']))
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

                        # print ("For input field: " + str(answer_field['QuestionIdentifier']))
                        # print ("Submitted answer: " + str(answer_field['FreeText']))
            #   else:
            #      # One field found in HIT layout
            #      print ("For input field: " + xml_doc['QuestionFormAnswers']['Answer']['QuestionIdentifier'])
            #      print ("Submitted answer: " + xml_doc['QuestionFormAnswers']['Answer']['FreeText'])
                All_answers={hit_id:{**XY,**options,"comments":comments}}
                # print(All_answers)
                df = pd.DataFrame.from_dict(All_answers, orient="index")
            

    else:
        print ("No results ready yet")  
        df = pd.DataFrame.from_dict({hit_id:{"not ready yet"}}, orient="index")
    DF=pd.concat([DF,df])
DF.to_csv("results.csv")