import os

MONGO_USERNAME = os.environ["MONGO_USERNAME"]
MONGO_PASSWORD = os.environ["MONGO_PASSWORD"]
MONGO_DBNAME = os.environ["MONGO_DBNAME"]

RESOURCE_METHODS = ['GET', 'POST']
ITEM_METHODS = ['GET', 'PATCH']

PUBLIC_METHODS = ['GET']
PUBLIC_ITEM_METHODS = ['GET']

ALLOW_UNKNOWN = True

URL_PREFIX = "api"
XML = False
EXTENDED_MEDIA_INFO = ['content_type']

DOMAIN = {
    'paths': {
        'item_url': 'regex("\d*")',
        'schema': {
            '_id': {
                'type': 'string',
                'unique': True
            }
        }
    }
}
