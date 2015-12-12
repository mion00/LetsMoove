#!/usr/bin/env bash
set -e

while ! nc -z letsmoove_mongo_1 27017; do sleep 1; done

exec python ./apiServer.py