#User details
#This need to be updated after we create different table (use forgein key)

from flask import Blueprint,request, render_template
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, 
                                jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

from typescript.api.utils.response import custom_response
from typescript.api.model.UserModel import User, UserSchema

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
@jwt_required
@userBP.route('/update', methods = ['PUT'])
def change_password():
    if request.method == 'PUT':
        
        #need revision

        username = request.json('username')
        password = request.json('password')
        user = User.update(username,password)
        return 


@userBP.route('/signup', methods = ['POST'])
def register():
    if request.method == 'POST':
        data = request.json()

        #Reject if user already existed
        if UserModel.find_by_username(data['username']):
            return {'message': 'User {} already exists'.format(data['username'])}

        #create new user
        new_user = User(
            username = data['username'],
            #need revision
            password = User.generate_hash(data['password'])
        )

        #Save user to database and send back tokens
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = data['username'])
            refresh_token = create_refresh_token(identity = data['username'])
            return {'message': 'User {} already existed'.format( data['username']),
                    'access_token': access_token,
                    'refresh_token': refresh_token
            }
        except:
            return custom_response(500, {'message':'User creation failed'})

@userBP.route('/login', methods = ['POST'])
def login():
    data = request.json()
    current_user = User.get_user_by_username(data['username'])
    if not current_user:
        return {'message': 'User {} doesn\'t exist'.format(data['username'])}
        
    if User.verify_hash(data['password']) == current_user.password:
        access_token = create_access_token(identity = data['username'])
        refresh_token = create_refresh_token(identity = data['username'])
        return {'message': 'Logged in as {}'.format(current_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token
        }
    else:
        return {'message': 'Wrong credentials'}

@userBP.route('/logout')
def logout():
    #to be implemented
    pass