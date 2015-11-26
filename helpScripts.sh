#!/usr/bin/env bash
#NPM INSTALL
sudo docker-compose run --rm frontend npm install

#BOWER INSTALL
sudo docker-compose run --rm frontend bower install

#IMPORT DATI
sudo docker exec letsmoove_api_server_1 python import.py

#SHELL MONGODB
sudo docker exec -it letsmoove_mongo_1 mongo

#CREAZIONE DI NUOVI DOCKER CONTAINER
sudo docker-compose build