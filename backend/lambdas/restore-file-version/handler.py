import boto3
import json
import os

s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])

        tenant_id = body.get('tenantId')
        file_id = event.get('pathParameters', {}).get('fileId')
        version_id = body.get('versionId')

        if not tenant_id or not file_id or not version_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "tenantId, fileId, and versionId are required"})
            }

        bucket_name = os.getenv("S3-BUCKET-NAME")
        s3_key = f"{tenant_id}/{file_id}"

        s3.copy_object(
            Bucket=bucket_name,
            CopySource={"Bucket": bucket_name, "Key": s3_key, "VersionId": version_id},
            Key=s3_key
        )

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "File restored to the specified version"})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
