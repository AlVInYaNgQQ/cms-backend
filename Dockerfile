FROM node:16

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

COPY . .

RUN apt-get update \
    && npm install

EXPOSE 3000

CMD ["npm", "start"]
