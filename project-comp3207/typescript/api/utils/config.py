import os

from passlib.hash import pbkdf2_sha256 as sha256


class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

def generate_hash(password):
        return sha256.hash(password)

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:1@35.242.191.40/typescript"
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'Secret String')
    ADMIN_AUTH_USERNAME = os.getenv('ADMIN_AUTH_USERNAME', 'admin')
    ADMIN_AUTH_PASSWORD = generate_hash(os.getenv('ADMIN_AUTH_PASSWORD', 'John Wick'))
    UPLOAD_FOLDER = '/path/to/the/uploads'
    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

class DevelopmentConfig(Config):
    DEBUG = True
    db_uri = 'mysql+pymysql://root:1234@localhost/TypeScript'
    SQLALCHEMY_DATABASE_URI = db_uri
    SQLALCHEMY_ECHO = False
    JWT_SECRET_KEY = "random string that is very secret"
    ADMIN_AUTH_USERNAME = 'admin'
    ADMIN_AUTH_PASSWORD = generate_hash('johnwick')
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '../../templates/static')
    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']