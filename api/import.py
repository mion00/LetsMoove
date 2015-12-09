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

files.sort()

for file in files:
    jsonData = json.load(file.open())

    print("\033[95m" + "importing " + file.name + "\033[0m")

    sanitizedName = re.search('\d+_(.+)', file.stem)

    req = requests.post(url + sanitizedName.group(1), json=jsonData)

    jsonResponse = req.json()

    if jsonResponse.get('_error'):
        pprint(jsonResponse.get('_error'))
    if jsonResponse.get('_items'):
        for response in jsonResponse.get('_items'):
            pprint(('id: ' + str(response.get('id'))) if response.get('id') else response.get('_issues'))
            # pprint(response.get('_issues'))
            # pprint(jsonResponse.get('_issues')) if jsonResponse.get('_issues') else None
