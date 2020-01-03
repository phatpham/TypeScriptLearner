#User details
#This need to be updated after we create different table (use forgein key)

from flask import Blueprint,request, render_template

from api.model.UserModel import User, UserSchema

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
            return {sad:'sad'}


#Change password
@userBP.route('/update', methods = ['PUT'])
def change_password():
    if request.method == 'PUT':
        
        #need revision

        username = request.json('username')
        password = request.json('password')
        user = User.update(username,password)
        return 
