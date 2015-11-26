schema = {
    'username': {
        'type': 'string',
        'required': True,
        'empty': False
    },
    'email': {
        'type': 'string',
        'required': True
    },
    'photo': {
        'type': 'string'
    },
    'description': {
        'type': 'string'
    },
    'password': {
        'type': 'string',
        'required': True,
        'empty': False,
        'maxlength': 4000
    },
    'child': {
        'type': 'dict',
        'required': True,
        'schema': {
            'name': {
                'type': 'string',
                'required': True
            },
            'surname': {
                'type': 'string',
                'required': True,
            },
            'gender': {
                'type': 'string',
                'required': True
            },
            'dateOfBirth': {
                'type': 'string',
                'required': True
            }
        }

    },
    'elder': {
        'type': 'dict',
        'required': True,
        'schema': {
            'name': {
                'type': 'string',
                'required': True
            },
            'surname': {
                'type': 'string',
                'required': True,
            },
            'gender': {
                'type': 'string',
                'required': True
            },
            'dateOfBirth': {
                'type': 'string',
                'required': True
            }
        }

    }
}

teams = {
    'item_url': 'regex("\d*")',
    'schema': schema,
}
