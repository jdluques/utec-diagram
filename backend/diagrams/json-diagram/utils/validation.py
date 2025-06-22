
def validate_body(input_format, output_format, input_text, tenant_id):
    if not tenant_id:
        return "Missing tenantId"

    if not output_format:
        return "Missing output format"
    
    if not input_format:
        return "Missing input format"

    if not input_text:
        return "Missing input text"

    return None
