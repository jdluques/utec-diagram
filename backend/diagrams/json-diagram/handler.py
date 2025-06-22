import json

from utils.validation import validate_body
from utils.render_image import render_json_to_buffer
from ...utils.file_upload import handle_file_upload

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])

        tenant_id = body.get('tenantId')
        input_format = body.get('inputFormat')
        output_format = body.get('outputFormat')
        input_text = body.get('schemaText', '')

        error = validate_body(input_format, output_format, input_text, tenant_id)
        if error:
            return {"statusCode": 400, "body": error}
        
        graph_buffer = render_json_to_buffer(input_text, output_format)

        bucket_name, s3_key = handle_file_upload(graph_buffer, tenant_id, body.get('fileId'), body.get('metadata', {}), output_format)

        return {
            "statusCode": 200,
            "body": json.dumps({"imageUrl": f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"})
        }
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}