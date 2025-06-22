import tempfile
from eralchemy import ERAlchemy
from io import BytesIO
import sqlite3

def generate_er_file(schema_format, schema_text, database_url):
    er_buffer = BytesIO()

    if schema_format == 'markup':
        er_buffer.write(schema_text.encode())
        er_buffer.seek(0)

    elif schema_format == 'sqlite-sql':
        with tempfile.NamedTemporaryFile(delete=False, suffix=".sqlite") as db_file:
            db_filepath = db_file.name

        try:
            conn = sqlite3.connect(db_filepath)
            cursor = conn.cursor()
            cursor.executescript(schema_text)
            conn.commit()
            conn.close()
        except Exception as e:
            raise ValueError(f"SQL execution error: {str(e)}")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".er") as er_file:
            er_filepath = er_file.name

        ERAlchemy().extract_metadata(f"sqlite:///{db_filepath}", er_filepath)

        with open(er_filepath, "rb") as f:
            er_buffer.write(f.read())
            er_buffer.seek(0)

    elif schema_format == "postgresql-sql":
        raise ValueError(f"PostgreSQL SQL text is not supported yet. Please use SQLite-compatible SQL syntax.")

    elif schema_format in ['sqlite', 'postgresql']:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".er") as er_file:
            er_filepath = er_file.name

        try:
            ERAlchemy().extract_metadata(database_url, er_filepath)
        except Exception as e:
            raise ValueError(f"Failed to connect to database: {str(e)}")

        with open(er_filepath, "rb") as f:
            er_buffer.write(f.read())
            er_buffer.seek(0)

    else:
        raise ValueError(f"Unsupported schema format: {schema_format}")

    return er_buffer
