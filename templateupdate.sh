#!/bin/bash
set -eo pipefail

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

ENV=$1
TAG=$2
PROVIDER=$3
COUNTER_LIMIT=20
# Counter limit will be caluculaed based on sleep seconds

if [[ -z "$ENV" ]] ; then
        echo "Environment should be set on startup with one of the below values"
        echo "ENV must be one of - DEV, QA, PROD or LOCAL"
        exit
fi
#source buildvar.conf
#source email-service-buildsecvar.conf
AWS_REGION=$(eval "echo \$${ENV}_AWS_REGION")
AWS_ACCESS_KEY_ID=$(eval "echo \$${ENV}_AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY=$(eval "echo \$${ENV}_AWS_SECRET_ACCESS_KEY")
AWS_ACCOUNT_ID=$(eval "echo \$${ENV}_AWS_ACCOUNT_ID")
AWS_REPOSITORY=$(eval "echo \$${ENV}_AWS_REPOSITORY")
AWS_ECS_CLUSTER=$(eval "echo \$${ENV}_AWS_ECS_CLUSTER")
AWS_ECS_SERVICE=$(eval "echo \$${ENV}_AWS_ECS_SERVICE")
family=$(eval "echo \$${ENV}_AWS_ECS_TASK_FAMILY")
AWS_ECS_CONTAINER_NAME=$(eval "echo \$${ENV}_AWS_ECS_CONTAINER_NAME")
AWS_ECS_TASKDEF_FILE=$(eval "echo \$${ENV}_AWS_ECS_TASKDEF_FILE")

AUTH_DOMAIN=$(eval "echo \$${ENV}_AUTHDOMAIN")
AUTH_SECRET=$(eval "echo \$${ENV}_AUTHSECRET")
VALID_ISSUERS=$(eval "echo \$${ENV}_VALIDISSUERS")

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

# following can have in config file

LOG_LEVEL=$(eval "echo \$${ENV}_LOG_LEVEL")
NODE_ENV=$(eval "echo \$${ENV}_NODE_ENV")
PORT=$(eval "echo \$${ENV}_NODE_PORT")
JWKS_URI=$(eval "echo \$${ENV}_JWKSURI")
TEMPLATE_MAP=$(eval "echo \$${ENV}_TEMPLATE_MAP")
echo $TEMPLATE_MAP 
DISABLE_LOGGING=$(eval "echo \$${ENV}_DISABLE_LOGGING")

API_CONTEXT_PATH=$(eval "echo \$${ENV}_API_CONTEXT_PATH")

task_template=`cat container.template`
task_def=$(printf "$task_template" $family $AWS_ACCOUNT_ID $AWS_ECS_CONTAINER_NAME $AWS_ACCOUNT_ID $AWS_REGION $AWS_REPOSITORY $TAG "$DEBUG" "$GITHUB_CLIENT_ID" "$GITHUB_CLIENT_SECRET" "$GITLAB_CLIENT_ID" "$GITLAB_CLIENT_SECRET" "$MONGODB_URI" "$NODE_ENV" "$NPM_CONFIG_PRODUCTION" "$PAPERTRAIL_API_TOKEN" "$TC_AUTHN_URL" "$TC_CLIENT_ID" "$WEBSITE" 8000 8000 $AWS_ECS_CLUSTER $AWS_REGION $ENV)
#echo "$task_def" >test.json

