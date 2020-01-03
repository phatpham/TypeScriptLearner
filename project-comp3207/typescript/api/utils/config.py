import os

from werkzeug.security import generate_password_hash

class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'Secret String')
    ADMIN_AUTH_USERNAME = os.getenv('ADMIN_AUTH_USERNAME', 'admin')
    ADMIN_AUTH_PASSWORD = generate_password_hash(os.getenv('ADMIN_AUTH_PASSWORD', 'John Wick'))


class DevelopmentConfig(Config):
    DEBUG = True
    db_path = os.path.join(os.path.dirname(__file__), '../../test.db')
    print(db_path)
    db_uri = 'sqlite:///{}'.format(db_path)
    SQLALCHEMY_DATABASE_URI = db_uri
    SQLALCHEMY_ECHO = False
    JWT_SECRET_KEY = "random string that is very secret"
    ADMIN_AUTH_USERNAME = 'admin'
    ADMIN_AUTH_PASSWORD = generate_password_hash('John Wick')
