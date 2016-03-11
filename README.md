# LetsMoove

## What is LetsMoove?

*LetsMoove* is the result of our efforts for the final project of *Human Computer Interaction* and *Sofware Engineering 2* at the University of Trento. We thought of a funny activity for youngs and elders. It's similar to a treasure hunting game but with some learning aspects.  
The players have to complete a path either in a city center or into nature with the help of a GPS device. At the beginning they only know the coordinates of the first stage. Once they have reached the coordinates, they are asked to answer a question in order to obtain next stage position. When they are done with the path, they can log their experience on the related webpage, rating the difficulty of the riddles and the beauty of the walk. They are also given the possibility to search for and to create new paths. 

## What does this repository contain?

This repository contains the files for the [webpage](https://lets-moove.herokuapp.com).  In compliance with the SE2 guidelines we developed this web app using __Scrum__ *agile method* and the site represents only the *first* sprint with the main features we planned when we wrote down the product backlog.  
__NOTE__: To access the main feature you need credentials to login. If you are interested you can ask us and we will be pleased to give them to you. 

## Installation

1. Install [Docker](https://www.docker.com/).
2. Install [Docker Compose](https://github.com/docker/compose)
3. To download the images run
```
docker-compose pull
```
4. To build the images for frontend and backend run
```
docker-compose build
```
5. Install the dependencies via npm
```
docker-compose run --rm fronted npm install
```
6. To launch all the containers run
```
docker-compose up
```
7. In a different terminal run
```
docker-compose run --rm api_server python import.py api_server 8001
```
