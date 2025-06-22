from ..db.files_queries import get_file
from datetime import datetime

def get_file_metadata(tenant_id, file_id, metadata):
    existing_file = get_file(tenant_id, file_id)

    if existing_file:
        metadata["updatedAt"] = datetime.utcnow().isoformat()
    else:
        metadata["createdAt"] = datetime.utcnow().isoformat()
        metadata["updatedAt"] = metadata["createdAt"]
    
    return metadata
    