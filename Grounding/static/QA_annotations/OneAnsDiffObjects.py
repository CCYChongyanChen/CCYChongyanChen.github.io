import random
import json
import nltk
from textblob import TextBlob
import spacy
nlp = spacy.load("en_core_web_sm")
doc =nlp('Bananas are an excellent source of potassium.')
for np in doc.noun_chunks:
    print(np.text)
    
split="train"
readpath=split+"_clean_wo_sub.json"


text="I don't like coca cola and social security card. My cat is beautiful. New York is a good city."
blob = TextBlob(text)
 
for nouns in blob.noun_phrases:
    print(nouns)

print(len(blob.noun_phrases))
