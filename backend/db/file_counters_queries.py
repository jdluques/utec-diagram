import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('FileCounters')

def get_next_file_id(tenant_id):
    response = table.update_item(
        Key={"tenantId": tenant_id},
        UpdateExpression="SET currentCounter = if_not_exists(currentCounter, :start) + :inc",
        ExpressionAttributeValues={
            ":start": 0,
            ":inc": 1
        },
        ReturnValues="UPDATED_NEW"
    )
    next_counter = response['Attributes']['currentCounter']
    return f"file_{next_counter:03d}"
