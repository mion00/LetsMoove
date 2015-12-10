#!/usr/bin/env bash
#NPM INSTALL
sudo docker-compose run --rm frontend npm install --no-bin-links

#SHELL MONGODB
sudo docker exec -it letsmoove_mongo_1 mongo development --eval "db.dropDatabase()"

#IMPORT DATI
sudo docker exec letsmoove_api_server_1 python import.py

#CREAZIONE DI NUOVI DOCKER CONTAINER
sudo docker-compose build

#BOWER INSTALL
sudo docker-compose run --rm frontend bower install
