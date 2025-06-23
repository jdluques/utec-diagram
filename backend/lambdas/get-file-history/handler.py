import boto3
import json
import os

s3 = boto3.client('s3')

def get_file_versions(event, context):
    try:
        body = json.loads(event['body'])

        tenant_id = body.get('tenantId')
        file_id = event.get('pathParameters', {}).get('fileId')
        key_marker = body.get('KeyMarker', None)
        version_id_marker = body.get('VersionIdMarker', None)

        if not tenant_id or not file_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Both tenantId and fileId are required"})
            }

        bucket_name = os.getenv("S3-BUCKET-NAME")
        s3_key = f"{tenant_id}/{file_id}"

        response = s3.list_object_versions(
            Bucket=bucket_name,
            Prefix=s3_key,
            KeyMarker=key_marker,
            VersionIdMarker=version_id_marker
        )
        
        versions = [
            {
                "VersionId": version["VersionId"],
                "LastModified": version["LastModified"].isoformat(),
                "IsLatest": version["IsLatest"],
                "Size": version["Size"]
            }
            for version in response.get('Versions', [])
        ]

        next_key_marker = response.get('NextKeyMarker')
        next_version_id_marker = response.get('NextVersionIdMarker')

        return {
            "statusCode": 200,
            "body": json.dumps({
                "versions": versions,
                "nextKeyMarker": next_key_marker,
                "nextVersionIdMarker": next_version_id_marker
            })
        }
    
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}
