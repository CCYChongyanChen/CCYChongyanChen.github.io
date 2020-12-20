import random
import json
import nltk
from textblob import TextBlob
split="train"
readpath=split+"_clean_wo_sub.json"


text="I don't like coca cola and social security card. My cat is beautiful. New York is a good city."
blob = TextBlob(text)
 
for nouns in blob.noun_phrases:
    print(nouns)

print(len(blob.noun_phrases))
# is_noun = lambda pos: pos[:2] == 'NN' or pos=='NP'
# with open(readpath,'r',encoding='utf-8') as json_file:
#     datas=json.load(json_file)
#     for data in datas:
#         for answer in data["answers"]:
#             tokenized = nltk.word_tokenize(answer)
#             try:
#                 print("NP:"+str(answer.noun_phrases))
#                 print(phrase)
#             except:
#                 pass



            # nouns = [word for (word, pos) in nltk.pos_tag(tokenized) if is_noun(pos)] 
            # if len(nouns)>1:
            #         try:
            #             print (str(nouns))

            #         except:
            #             print(" ")