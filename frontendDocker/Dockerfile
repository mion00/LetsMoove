FROM library/node

#RUN \
#  apt-get update && \
#  apt-get install -y ruby ruby-dev && \
#  rm -rf /var/lib/apt/lists/*

RUN npm install -g bower && \
    echo '{ "allow_root": true }' > /root/.bowerrc

RUN git config --global url."https://".insteadOf git://

WORKDIR /data

CMD ["/usr/local/bin/npm", "start"]
