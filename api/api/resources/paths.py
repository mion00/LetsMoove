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
                'max': 1000
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
                    'type': 'point'
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
    'item_url': 'regex("\d*")',
    'schema': schema
}
