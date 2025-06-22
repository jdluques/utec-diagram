from io import BytesIO
from eralchemy import render_er

def render_er_to_memory(er_buffer, output_format):
    if output_format == "png":
        png_buffer = BytesIO()
        try:
            render_er(er_buffer, png_buffer, output_format='png')
            png_buffer.seek(0)
            return png_buffer, "image/png"
        except Exception as e:
            raise RuntimeError(f"Failed to render PNG: {str(e)}")

    elif output_format == "svg":
        svg_buffer = BytesIO()
        try:
            render_er(er_buffer, svg_buffer, output_format='svg')
            svg_buffer.seek(0)
            return svg_buffer, "image/svg+xml"
        except Exception as e:
            raise RuntimeError(f"Failed to render SVG: {str(e)}")

    else:
        raise ValueError(f"Unsupported output format: {output_format}")
