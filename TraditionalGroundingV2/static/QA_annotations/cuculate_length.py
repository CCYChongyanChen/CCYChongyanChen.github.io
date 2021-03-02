import json
import random

with open("test_most_common.json",'r',encoding="utf-8") as f:
    data=json.load(f)
    print(len(data))