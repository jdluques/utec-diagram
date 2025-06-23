import json

from utils.validation import validate_body
from utils.generate_er import generate_er_file
from utils.render_image import render_er_to_memory

from ...utils.file_upload import handle_file_upload
from ...db.files_queries import insert_file_data

def lambda_handler(event):
    try:
        body = json.loads(event['body'])

        tenant_id = body.get('tenantId')
        input_format = body.get('inputFormat')
        output_format = body.get('outputFormat')
        input_text = body.get('inputText', '')
        file_name = body.get('fileName')
        
        error = validate_body(input_format, output_format, input_text, tenant_id)
        if error:
            return {"statusCode": 400, "body": error}

        er_buffer = generate_er_file(input_format, input_text)
        image_buffer = render_er_to_memory(er_buffer, output_format)

        bucket_name, s3_key, file_id, metadata = handle_file_upload(image_buffer, tenant_id, body.get('fileId'), body.get('metadata', {}), output_format)
        insert_file_data(tenant_id, file_id, s3_key, file_name, 'er', metadata)
    
        return {
            "statusCode": 200,
            "body": json.dumps({
                "imageUrl": f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": f"Internal server error: {str(e)}"
        }
