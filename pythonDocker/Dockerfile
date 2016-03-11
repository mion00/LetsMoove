FROM python:3-onbuild

RUN apt-get update && apt-get install -y netcat && apt-get clean

EXPOSE 8001

COPY ./script.sh /

RUN ["/bin/chmod", "+x", "/script.sh"]

ENTRYPOINT ["/script.sh"]