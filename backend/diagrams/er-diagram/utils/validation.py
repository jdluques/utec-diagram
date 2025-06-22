from network import is_safe_host

def validate_body(schema_format, output_format, schema_text, database_url, tenant_id):
    if not tenant_id:
        return "Missing tenantId"

    if not output_format:
        return "Missing output format"
    
    if not schema_format:
        return "Missing schema format"
    
    if schema_format in ['markup', 'sqlite-sql', 'postgresql-sql'] and not schema_text:
        return f"schemaText is required for format {schema_format}"

    if schema_format in ['sqlite', 'postgresql']:
        if not database_url:
            return f"databaseUrl is required for format {schema_format}"
        if not is_safe_host(database_url):
            return "Unsafe database URL: localhost/private IPs are not allowed"

    return None
