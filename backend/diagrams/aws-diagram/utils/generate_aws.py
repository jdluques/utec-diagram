import tempfile
from io import BytesIO

from build_diagram import build_diagram

def generate_aws_file(inputText, output_format):
    with tempfile.NamedTemporaryFile(suffix=f".{output_format}", delete=False) as temp_file:
        base_filename = temp_file.name[:-len(f".{output_format}")]
    
    build_diagram(inputText['nodes'], inputText['edges'], base_filename, output_format)

    rendered_file_path = f"{base_filename}.{output_format}"
    with open(rendered_file_path, "rb") as f:
        aws_file = BytesIO(f.read())

    return aws_file
