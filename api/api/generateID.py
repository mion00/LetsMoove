from flask import current_app
from pymongo import ReturnDocument


def getNextSequence(name):
    client = current_app.data.driver.db
    db = client.development

    if not db.counters.find_one({'_id': name}):
        db.counters.insert_one({
            "_id": name,
            "seq": 0
        })

    ret = db.counters.find_one_and_update(
        {'_id': name},
        {'$inc': {'seq': 1}},
        return_document=ReturnDocument.AFTER
    )

    return ret['seq']


def generateID(resource, request):
    for obj in request:
        obj['id'] = int(getNextSequence(resource))
