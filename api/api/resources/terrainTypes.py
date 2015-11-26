schema = {
    'type': {
        'type': 'string',
        'required': True,
        'unique': True,
        'max': 100
    }
}

terrainTypes = {
    'item_url': 'regex("\d*")',
    'schema': schema
}
