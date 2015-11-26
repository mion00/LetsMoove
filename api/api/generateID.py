from pymongo import ReturnDocument

from . import app as appModule


def getNextSequence(name):
    client = appModule.app.data.driver.db
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
        obj['_id'] = int(getNextSequence(resource))
