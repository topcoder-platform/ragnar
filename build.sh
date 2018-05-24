#!/bin/bash
set -eo pipefail

# Builds Docker image of Community App application.
# This script expects a single argument: NODE_ENV, which must be either
# "development" or "production".

NODE_ENV=$1

ENV=$1

source buildvar.conf
SECRET_FILE_NAME="${APPNAME}-buildsecvar.conf"
cp ./../buildscript/$APPNAME/$SECRET_FILE_NAME.enc .
#ccdecrypt -f $SECRET_FILE_NAME.cpt -K $SECPASSWD
openssl enc -aes-256-cbc -d -in $SECRET_FILE_NAME.enc -out $SECRET_FILE_NAME -k $SECPASSWD
source $SECRET_FILE_NAME

AWS_REGION=$(eval "echo \$${ENV}_AWS_REGION")
AWS_ACCESS_KEY_ID=$(eval "echo \$${ENV}_AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY=$(eval "echo \$${ENV}_AWS_SECRET_ACCESS_KEY")
AWS_ACCOUNT_ID=$(eval "echo \$${ENV}_AWS_ACCOUNT_ID")
AWS_REPOSITORY=$(eval "echo \$${ENV}_AWS_REPOSITORY")

#App variables

AUTHDOMAIN=$(eval "echo \$${ENV}_AUTHDOMAIN")
AUTHSECRET=$(eval "echo \$${ENV}_AUTHSECRET")
VALIDISSUERS=$(eval "echo \$${ENV}_VALIDISSUERS")

KAFKA_CLIENT_CERT=$(eval "echo \$${ENV}_KAFKA_CLIENT_CERT")
KAFKA_CLIENT_CERT_KEY=$(eval "echo \$${ENV}_KAFKA_CLIENT_CERT_KEY")
KAFKA_URL=$(eval "echo \$${ENV}_KAFKA_URL")
SENDGRID_API_KEY=$(eval "echo \$${ENV}_SENDGRID_API_KEY")


DB_DATABASE=$(eval "echo \$${ENV}_DB_DATABASE")
DB_HOST=$(eval "echo \$${ENV}_DB_HOST")
DB_PASSWORD=$(eval "echo \$${ENV}_DB_PASSWORD")
DB_PORT=$(eval "echo \$${ENV}_DB_PORT")
DB_USER=$(eval "echo \$${ENV}_DB_USER")
DATABASE_URL=postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_DATABASE;


KAFKA_GROUP_ID=$(eval "echo \$${ENV}_KAFKA_GROUP_ID")
EMAIL_FROM=$(eval "echo \$${ENV}_EMAIL_FROM")
LOG_LEVEL=$(eval "echo \$${ENV}_LOG_LEVEL")
NODE_ENV=$(eval "echo \$${ENV}_NODE_ENV")
NODE_PORT=$(eval "echo \$${ENV}_NODE_PORT")
JWKSURI=$(eval "echo \$${ENV}_JWKSURI")
TEMPLATE_MAP=$(eval "echo \$${ENV}_TEMPLATE_MAP")


TAG=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/ragnar-service:$CIRCLE_SHA1

docker build -t $TAG .

# Copies "node_modules" from the created image, if necessary for caching.
docker create --name app $TAG

if [ -d node_modules ]
then
  # If "node_modules" directory already exists, we should compare
  # "package-lock.json" from the code and from the container to decide,
  # whether we need to re-cache, and thus to copy "node_modules" from
  # the Docker container.
  mv package-lock.json old-package-lock.json
  docker cp app:/opt/app/package-lock.json package-lock.json
 # docker cp .env app:/opt/app/
  set +eo pipefail
  UPDATE_CACHE=$(cmp package-lock.json old-package-lock.json)
  set -eo pipefail
else
  # If "node_modules" does not exist, then cache must be created.
  UPDATE_CACHE=1
fi

if [ "$UPDATE_CACHE" == 1 ]
then
  docker cp app:/opt/app/node_modules .
fi