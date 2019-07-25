FROM node:4.5
RUN useradd meteoruser
RUN mkdir /home/meteoruser
RUN chown meteoruser /home/meteoruser
USER root
COPY . /app/src
WORKDIR /app/src
RUN chown -R meteoruser /app/*
RUN npm install --global node-pre-gyp
USER meteoruser
RUN curl https://install.meteor.com | sh
RUN npm install --production
RUN /home/meteoruser/.meteor/meteor build /app/build --directory  --architecture os.linux.x86_64
WORKDIR /app/build/bundle
RUN cd programs/server && npm install
CMD METEOR_SETTINGS=$(cat /app/src/settings.json) node /app/build/bundle/main.js
EXPOSE 3000
