import os

from passlib.hash import pbkdf2_sha256 as sha256


class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

def generate_hash(password):
        return sha256.hash(password)

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:12345@146.148.114.174/users"
    JWT_SECRET_KEY = "random string that is very secret" # to be set up on instance
    JWT_BLACKLIST_ENABLED = False
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

class DevelopmentConfig(Config):
    DEBUG = True
    db_path = os.path.join(os.path.dirname(__file__), '../../test.db')
    db_uri = 'sqlite:///{}'.format(db_path)
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:12345@146.148.114.174/users'
    SQLALCHEMY_ECHO = False
    JWT_SECRET_KEY = "random string that is very secret"
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']