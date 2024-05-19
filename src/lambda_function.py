import boto3
import os
import sys
import uuid
from urllib.parse import unquote_plus
import json
from PIL import Image
import PIL.Image
from io import BytesIO

s3 = boto3.client('s3')


def lambda_handler(event, context):
    try:
        origin_bucket = event["Records"][0]["s3"]["bucket"]["name"]
        origin_key = event["Records"][0]["s3"]["object"]["key"]
        destination_bucket = os.environ['PROCESSED_BUCKET']
        image_name = origin_key.split('/')[-1]
        destination_key = f'thumbnails/{image_name}'

        object = s3.get_object(Bucket = origin_bucket, Key= origin_key)
        data = object['Body'].read()

        image = Image.open(BytesIO(data))
        image.thumbnail(tuple(x / 2 for x in image.size))

        # Save the thumbnail to a BytesIO object
        thumb_io = BytesIO()
        image.save(thumb_io, format=image.format)
        thumb_io.seek(0)

        print(object)

        s3.put_object(Bucket=destination_bucket, Key=destination_key, Body=thumb_io)

        return {
            'statusCode': 200,
            'body': json.dumps(f'Successfully created thumbnail for {origin_key} in {destination_bucket}')
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }