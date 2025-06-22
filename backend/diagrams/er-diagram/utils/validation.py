from db_url_validation import is_safe_host

def validate_body(input_format, output_format, input_text, tenant_id):
    if not tenant_id:
        return "Missing tenantId"

    if not output_format:
        return "Missing output format"
    
    if not input_format:
        return "Missing input format"

    if not input_text:
        return "Missing input text"

    if input_format in ['sqlite', 'postgresql']:
        if not is_safe_host(input_text):
            return "Unsafe database URL: localhost/private IPs are not allowed"

    return None
