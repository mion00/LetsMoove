feedback_schema = {
    'id': {
        'type': 'integer',
        'readonly': True
    },
    'path': {
        'type': 'integer',
        'required': True,
        'data_relation': {
            'resource': 'paths',
            'field': 'id',
            'embeddable': False
        }
    },
    'team': {
        'required': True,
        'type': 'integer',
        'data_relation': {
            'resource': 'teams',
            'field': 'id',
            'embeddable': False
        }
    },
    'vote': {
        'type': 'dict',
        'required': True,
        'schema': {
            'beauty': {
                'type': 'integer',
                'required': True,
                'min': 1,
                'max': 5
            },
            'complexity': {
                'type': 'integer',
                'required': True,
                'min': 1,
                'max': 5
            },
            'difficulty': {
                'type': 'integer',
                'required': True,
                'min': 1,
                'max': 5
            }
        }
    },
    'review': {
        'type': 'string',
        'required': True,
        'empty': False,
        'max': 3000
    }

}

feedback = {
    'item_url': 'int',
    'item_lookup_field': 'id',
    'schema': feedback_schema
}
