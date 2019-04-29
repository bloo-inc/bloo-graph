FROM keymetrics/pm2:latest-alpine

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh && \
  mkdir /opt/bloograph/

COPY ./ /opt/bloograph/

RUN ls -la /opt/bloograph/

WORKDIR /opt/bloograph

RUN npm install

EXPOSE 4000

CMD [ "pm2-runtime", "start", "conf/ecosystem.config.js" ]
