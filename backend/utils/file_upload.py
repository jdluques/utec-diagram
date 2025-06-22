import boto3
import json
import os

from utils.file_metadata import get_file_metadata
from ..db.files_queries import insert_file_metadata
from ..db.file_counters_queries import get_next_file_id

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

files_table = dynamodb.Table('Files')
bucket_name = "your-bucket-name"

def handle_file_upload(image_buffer, tenant_id, file_id, metadata, output_format):
    try:
        file_id = file_id or get_next_file_id(tenant_id)

        bucket_name = os.getenv("S3-BUCKET-NAME")
        s3_key = f"{tenant_id}/{file_id}"

        s3.put_object(
            Bucket=bucket_name,
            Key=s3_key,
            Body=image_buffer,
            ContentType=output_format
        )

        metadata = get_file_metadata(tenant_id, file_id, metadata)
        insert_file_metadata(tenant_id, file_id, metadata)
        
        return bucket_name, s3_key
    
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
