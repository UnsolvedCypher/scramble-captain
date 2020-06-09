FROM crystallang/crystal:0.34.0

WORKDIR /usr/src/scramble-captain-server

COPY . ./
RUN apt-get update && \
  #todo- double check that these are needed
  apt-get install -y libnss3 libgconf-2-4 curl libreadline-dev postgresql && \
  # get forego
  curl https://bin.equinox.io/c/ekMN3bCZFUn/forego-stable-linux-amd64.tgz -o forego-stable-linux-amd64.tgz && \
  tar xvf forego-stable-linux-amd64.tgz -C /usr/local/bin && \
  # build lucky_cli
  # git clone https://github.com/luckyframework/lucky_cli --branch master --depth 1 /usr/local/lucky_cli && \
  # cd /usr/local/lucky_cli && \
  # shards install && \
  # crystal build src/lucky.cr -o /usr/local/bin/lucky && \
  # take out the trash
  apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
  # make our app
  cd /usr/src/scramble-captain-server && \
  shards install && \
  crystal build tasks.cr -o lucky && \
  ./lucky build.release

EXPOSE 5000

CMD ./start_server
# CMD sh