import json

from flask import Response


def custom_response(status_code, message):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(message),
        status=status_code,
    )