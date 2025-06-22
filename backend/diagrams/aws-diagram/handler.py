import json

from utils.validate_body import validate_body
from utils.generate_aws import generate_aws_file
from ...utils.file_upload import handle_file_upload

def lambda_handler(event):
    try:
        body = json.loads(event['body'])

        tenant_id = body.get('tenantId')
        input_format = body.get('inputFormat')
        output_format = body.get('outputFormat')
        inputText = body.get('schemaText', '')

        error = validate_body(input_format, output_format, inputText, tenant_id)
        if error:
            return {"statusCode": 400, "body": error}

        aws_file = generate_aws_file(inputText, output_format)

        bucket_name, s3_key = handle_file_upload(aws_file, tenant_id, body.get('fileId'), body.get('metadata', {}), output_format)

        return {
            "statusCode": 200,
            "body": json.dumps({"imageUrl": f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"})
        }
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}
