import boto3
import sys
create_hits_in_live= False



environments = {
        "live": {
            "endpoint": "https://mturk-requester.us-east-1.amazonaws.com",
            "preview": "https://www.mturk.com/mturk/preview",
            "manage": "https://requester.mturk.com/mturk/manageHITs",
            "reward": "0.00"
        },
        "sandbox": {
            "endpoint": "https://mturk-requester-sandbox.us-east-1.amazonaws.com",
            "preview": "https://workersandbox.mturk.com/mturk/preview",
            "manage": "https://requestersandbox.mturk.com/mturk/manageHITs",
            "reward": "0.00"
        },
}
# worker_requirements = [{
#     'QualificationTypeId': '000000000000000000L0',
#     'Comparator': 'GreaterThanOrEqualTo',
#     'IntegerValues': [80],
#     'RequiredToPreview': True,
# }]

mturk_environment = environments["live"] if create_hits_in_live else environments["sandbox"]
MTURK_SANDBOX = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'
mturk = boto3.client('mturk',
   aws_access_key_id = "AKIAIKBODJ4RG6PGQZ4A",
   aws_secret_access_key = "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",
   region_name='us-east-1',
   endpoint_url = mturk_environment['endpoint']
)
print ("I have $" + mturk.get_account_balance()['AvailableBalance'] + " in my Sandbox account")


imgs=['VizWiz_val_00003942.jpg','VizWiz_val_00001174.jpg']
groups=['train_1','train_2']
HITIDs=[]
with open ('hitID.txt','w') as w:

    for group in groups:
        question_xml="""<?xml version="1.0" encoding="UTF-8"?>
                        <ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">
                        <ExternalURL>https://chongyanchen.com/TraditionalGroundingV2/index.html?groupindex={{group}}</ExternalURL>
                        <FrameHeight>0</FrameHeight>
                        </ExternalQuestion>"""

        # question_xml = open(file="VizWiz_EK.xml",mode='r').read()
        # question_xml=question_xml.replace('{{VizWiz_img}}','VizWiz_val_00001174.jpg')
        question=question_xml.replace('{{group}}',group)
        # print(question)
        new_hit = mturk.create_hit(
            Title = 'Does the image needs external knowledge?',
            Description = 'Watch the image and point out if it does not require any external knowledge or require common sense, expertise knowledge, or partial knowledge',
            Keywords = 'image, labeling',
            Reward = mturk_environment['reward'],
            MaxAssignments = 1,# does it mean multi-works can work on the same HIT?
            LifetimeInSeconds = 172800,
            AssignmentDurationInSeconds = 600,
            AutoApprovalDelayInSeconds = 14400,
            Question = question,
            # QualificationRequirements=worker_requirements,
        )
        hit_type_id = new_hit['HIT']['HITTypeId']
        # print ("A new HIT has been created. You can preview it here:")
        # print ("https://workersandbox.mturk.com/mturk/preview?groupId=" + new_hit['HIT']['HITGroupId'])
        print ("HITID = " + new_hit['HIT']['HITId'])
        w.write(new_hit['HIT']['HITId']+'\n')
        # Remember to modify the URL above when you're publishing
        # HITs to the live marketplace.
        # Use: https://worker.mturk.com/mturk/preview?groupId=


print ("\nYou can work the HIT here:")
print (mturk_environment['preview'] + "?groupId={}".format(hit_type_id))

# print ("\nAnd see results here:")
# print (mturk_environment['manage'])
