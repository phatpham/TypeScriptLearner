#import flask
from flask import render_template, url_for, request, redirect   
from flask import Flask
from flask_jwt_extended import JWTManager

from http import HTTPStatus

from .response import custom_response
from typescript.api.views import interpreter_router, user_router, story_router, leaderboard_router
from typescript.api.model.RevokedToken import RevokedToken, RevokedTokenSchema

from .database import db
from flask_cors import CORS


def create_app(config):

    app = Flask(__name__, static_folder='../../templates/build/static', template_folder='../../templates/build')
    CORS(app)

    #Load config
    app.config.from_object(config)
    app.config['CORS_HEADER'] = 'Content-Type'
    #JWT
    jwt = JWTManager(app)

    #Register views
    app.register_blueprint(interpreter_router.interp) #BUG
    app.register_blueprint(user_router.userBP)
    app.register_blueprint(leaderboard_router.leaderBP)
    app.register_blueprint(story_router.storyBP)

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

    @app.errorhandler(401)
    def reject(e):
        return custom_response(status_code=HTTPStatus.UNAUTHORIZED, message='Access Denied')

    @app.route('/')
    def home():
        return render_template('index.html')
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return render_template("index.html")


    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        jti = decrypted_token['jti']
        return RevokedToken.is_jti_blacklisted(jti)
    
    # why do I need this after refactoring?
    db.init_app(app)

    return app

