import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Files')

def get_file(tenant_id, file_id):
    response = table.get_item(
        Key={
            'tenantId': tenant_id,
            'fileId': file_id
        }
    )
    return response.get('Items', [])

def insert_file_metadata(tenant_id, file_id, metadata):
    table.put_item(
        Item={
            'tenantId': tenant_id,
            'fileId': file_id,
            **metadata
        }
    )
    