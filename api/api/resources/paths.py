import pymongo

from .votes import votes_schema

schema = {
    'name': {
        'type': 'string',
        'required': True,
        'empty': False
    },
    'subtitle': {
        'type': 'string'
    },
    'description': {
        'type': 'string',
        'required': True,
        'empty': False,
        'maxlength': 4000
    },
    'owner': {
        'type': 'integer',
        'data_relation': {
            'resource': 'teams',
            'field': 'id',
            'embeddable': True
        }
    },
    'ownerVote': {
        'type': 'dict',
        'schema': votes_schema,
        'required': True
    },
    'pathData': {
        'type': 'dict',
        'required': True,
        'schema': {
            'length': {
                'type': 'number',
                'min': 0,
                'required': True
            },
            'time': {
                'type': 'integer',
                'min': 1,
                'required': True
            },
            'altitude': {
                'type': 'number',
                'required': True
            },
            'deltaAltitude': {
                'type': 'number',
                'max': 5000
            },
            'terrainType': {
                'required': True,
                'type': 'string',
                'data_relation': {
                    'resource': 'terrainTypes',
                    'field': 'type',
                    'embeddable': True
                }
            },
            'adventure': {
                'required': True,
                'type': 'boolean'
            }
        }
    },
    'locationData': {
        'required': True,
        'type': 'dict',
        'schema': {
            'startPoint': {
                'required': True,
                'type': 'point'
            },
            'stages': {
                'required': True,
                'type': 'list',
                'schema': {
                    'type': 'dict',
                    'schema': {
                        'location': {
                            'required': True,
                            'type': 'point'
                        },
                        'question': {
                            'type': 'string'
                        },
                        'answer': {
                            'type': 'string'
                        }
                    }
                },
            }
        }
    },
    'logCount': {
        'type': 'integer',
        'min': 0,
        'default': 0
    }
}

paths = {
    'item_url': 'int',
    'id_field': 'id',
    'schema': schema,
    'mongo_indexes': {
        'locationIndex': [('locationData.startPoint', pymongo.GEOSPHERE)]
    }
}
