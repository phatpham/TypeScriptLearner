#User details
#This need to be updated after we create different table (use forgein key)

from flask import Blueprint,request, render_template
from flask_jwt_extended import (JWTManager, create_access_token, create_refresh_token, jwt_required, 
                                jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from flask_cors import cross_origin
from typescript.api.utils.response import custom_response
from typescript.api.model.UserModel import User, UserSchema
from typescript.api.model.RevokedToken import RevokedToken, RevokedTokenSchema


userBP = Blueprint('userBP', __name__, url_prefix='/user')

#get user details
@userBP.route('', methods = ['POST'])
def user():
    if request.method == "POST":
        username = request.json['username']
        user = User.get_user_by_username(username)
        schema = UserSchema()
        result = schema.dump(user)
        if (user):
            return result
        else:
            # Need change, supposed to return error template
            return {'sad':'sad'}


#Change password


@userBP.route('/update/avatar', methods = ['PUT'])
#jwt_required
def change_avatar():
    if request.method == 'PUT':
        username = request.json['username']
        avatar = request.json['avatar']
        value = User.update_avatar(avatar=avatar,username=username); 

        print(username)
        print(avatar)
        print(value)
        
        if value:
            return custom_response(200, {'message':'got it'})
        else:
            return custom_response(500, {'message':'failed'})

@userBP.route('/update', methods = ['PUT'])
#jwt_required
def change_password():
    if request.method == 'PUT':
        username = request.json['username']
        old_password = request.json['old_password']
        new_password = request.json['new_password']
        value = User.update(the_username=username, old_password=old_password, new_password=new_password) 
        if value:
            return custom_response(200, {'message':'got it'})
        else:
            return custom_response(500, {'message':'failed'})

@userBP.route('/signup', methods = ['POST'])
def register():
    if request.method == 'POST':
        data = request.json

        #Reject if user already existed
        if User.get_user_by_username(data['username']):

            return custom_response(500, {'message': 'User {} already exists'.format(data['username'])})
        print(data['password'])

        #create new user
        new_user = User(
            username = data['username'],
            password = User.generate_hash(data['password'])
        )
        #Save user to database and send back tokens
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = data['username'])
        
            return {'message': 'User {} created'.format( data['username']),
                    'access_token': access_token,
                    
            }
        except:
            return custom_response(500, {'message':'User creation failed'})

#login, allow cors for testing
@cross_origin
@userBP.route('/login', methods = ['POST'])
def login():
    data = request.json
    current_user = User.get_user_by_username(data['username'])
    print()
    schema = UserSchema()
    current_user_json = schema.dump(current_user)
    if not current_user:
        return custom_response(500,{'message': 'User {} doesn\'t exist'.format(data['username'])})
        
    if User.verify_hash(data['password'], current_user.password):
         
        access_token = create_access_token(identity = data['username'])
        return {'message': 'Logged in as {}'.format(current_user.username),
                'user': current_user_json,
                'access_token': access_token,
                
        }
    else:
        return custom_response(500, {"message":"Wrong password"})

#log out access token

@userBP.route('/logout', methods = ['POST'])
#jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    try:
        revoked_token = RevokedToken(jti = jti)
        revoked_token.add()
        return {'message': 'Access token has been revoked'}
    except:
        return custom_response(500, {'message': 'Something went wrong'})