#import flask
from flask import render_template, url_for, request, redirect   
from flask import Flask
from flask_jwt_extended import JWTManager

from http import HTTPStatus

from .response import custom_response
from api.views import interpreter_router
from api.views import user_router

from .database import db


def create_app(config):

    app = Flask(__name__, static_folder='../../static', template_folder='../../templates')
    
    #Load config
    app.config.from_object(config)
    
    #JWT
    jwt = JWTManager(app)

    #Register views
    app.register_blueprint(interpreter_router.interp)
    app.register_blueprint(user_router.userBP)

    # START GLOBAL HTTP CONFIGURATIONS
    @app.after_request
    def add_header(response):
        return response

    @app.errorhandler(400)
    def bad_request(e):
        return custom_response(status_code=HTTPStatus.BAD_REQUEST, message='Bad Request')

    @app.errorhandler(500)
    def server_error(e):
        return custom_response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, message='Internal Server Error')

    @app.errorhandler(404)
    def not_found(e):
        return custom_response(status_code=HTTPStatus.NOT_FOUND, message='Not Found')

    @app.route('/')
    def home():
        return render_template('index.html')

    # why do I need this after refactoring?
    db.init_app(app)

    return app

