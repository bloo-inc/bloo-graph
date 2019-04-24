FROM keymetrics/pm2:latest-alpine

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh

RUN git clone --progress --verbose https://blootom:Xfm100.2@gitlab.com/bloo-cloud/bloo-graph.git /opt/bloograph && \
  cd /opt/bloograph/ && \
  npm install

WORKDIR /opt/bloograph

EXPOSE 4000

CMD [ "pm2-runtime", "start", "ecosystem.json" ]
