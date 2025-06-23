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

def insert_file_data(tenant_id, file_id, s3_key, file_name, diagram_type, metadata):
    try:
        if metadata['createdAt'] == metadata['updatedAt']:
            table.put_item(
                Item={
                    'tenantId': tenant_id,
                    'fileId': file_id,
                    'fileName': file_name,
                    'diagramType': diagram_type,
                    's3Key': s3_key,
                    **metadata
                }
            )
        else:
            table.update_item(
                Key={
                    'tenantId': tenant_id,
                    'fileId': file_id
                },
                UpdateExpression="SET updatedAt = :updatedAt",
                ExpressionAttributeValues={
                    ':updatedAt': metadata['updatedAt']
                }
            )
    except Exception as e:
        print(f"Error occurred: {e}")
    