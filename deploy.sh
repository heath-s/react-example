#!/bin/sh
BUCKET_NAME=BUCKET_NAME
DISTRIBUTION_ID=DISTRIBUTION_ID

npm run build

aws s3 rm s3://$BUCKET_NAME --recursive
aws s3 cp ./build/ s3://$BUCKET_NAME/ --recursive

aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
