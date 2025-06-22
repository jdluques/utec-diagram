import re
from urllib.parse import urlparse

def is_safe_host(url):
    parsed = urlparse(url)
    host = parsed.hostname
    private_ip_patterns = [
        r'^127\.', r'^10\.', r'^192\.168\.', r'^172\.(1[6-9]|2\d|3[0-1])\.',
        r'^localhost$', r'^::1$', r'^0\.0\.0\.0$'
    ]
    for pattern in private_ip_patterns:
        if re.match(pattern, host or ''):
            return False
    return True

