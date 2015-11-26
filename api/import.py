import json
import re
from pathlib import Path
from pprint import pprint

import requests

url = "http://localhost:8001/api/"

directory = Path("./import")

files = []
for child in directory.iterdir():
    files.append(child)

for file in files:
    jsonData = json.load(file.open())

    print("importing " + file.name)

    sanitizedName = re.search('\d+_(.+)', file.stem)

    req = requests.post(url + sanitizedName.group(1), json=jsonData)

    pprint(req.json())
