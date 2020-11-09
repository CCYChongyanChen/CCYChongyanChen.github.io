import random
import json
with open ('val_clean_v0.json') as f:
    data=json.load(f)
print(len(data))
index = [i for i in range(1000)]
random.shuffle(index)
print(index)

