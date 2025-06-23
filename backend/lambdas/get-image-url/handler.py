import boto3
import json
import os

s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])

        tenant_id = body.get('tenantId')
        file_id = event.get('pathParameters', {}).get('fileId', None)

        if not tenant_id or not file_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Both tenantId and fileId are required"})
            }

        bucket_name = os.getenv("S3-BUCKET-NAME")
        s3_key = f"{tenant_id}/{file_id}"

        url = s3.generate_presigned_url(
            ClientMethod="get_object",
            Params={
                "Bucket": bucket_name,
                "Key": s3_key
            },
            ExpiresIn=3600
        )

        return {
            "statusCode": 200,
            "body": json.dumps({"imageUrl": url})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
