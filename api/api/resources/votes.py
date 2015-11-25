vote_type = {
    'type': 'number',
    'required': True,
    'min': 0,
    'max': 5
}

votes_schema = {
    'beauty': vote_type,
    'complexity': vote_type,
    'difficulty': vote_type
}
