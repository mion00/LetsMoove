import os

import api.resources as res

MONGO_USERNAME = os.environ["MONGO_USERNAME"]
MONGO_PASSWORD = os.environ["MONGO_PASSWORD"]
MONGO_DBNAME = os.environ["MONGO_DBNAME"]

RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
ITEM_METHODS = ['GET', 'PATCH']

PUBLIC_METHODS = ['GET']
PUBLIC_ITEM_METHODS = ['GET']

URL_PREFIX = "api"
XML = False
EXTENDED_MEDIA_INFO = ['content_type']

EXTRA_RESPONSE_FIELDS = ['id']
CACHE_CONTROL = 'no-cache'

DOMAIN = {
    'terrainTypes': res.terrainTypes,
    'paths': res.paths,
    'feedback': res.feedback,
    'teams': res.teams
}
