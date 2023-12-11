FROM node:12-alpine

# Set the work directory
RUN mkdir -p /var/www/app/current
WORKDIR /var/www/app/current

# Add our package.json and install *before* adding our application files
ADD package.json ./
COPY .env.example .env.production.local
RUN npm i
RUN npm build

# Add application files
ADD . /var/www/app/current
EXPOSE 5432
ENTRYPOINT npm run start