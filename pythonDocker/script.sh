#!/usr/bin/env bash
set -e

while ! nc -z mongo 27017; do sleep 1; done

exec python ./apiServer.py