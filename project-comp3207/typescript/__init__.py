#import flask
from flask import render_template, url_for, request, redirect   
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

#General
import subprocess

#Serialize object
from marshmallow import Schema, fields

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////run/media/phatpham/1B6C8E8206F72C41/cloud-dev/project-comp3207/test.db'
db = SQLAlchemy(app)

@app.route('/interpret', methods = ["POST", "GET"])
def interpret():
    if request.method == "POST":
        '''
        Response to post req
        @return render page with output string
        '''
        inputCode = request.form['inputCode']
                
        #put code in temp file
        filename = "typescript/node/input.ts"

        inputTS = open(filename, "w")
        inputTS.write(inputCode)
        inputTS.close()

        #temporary placeholder for output
        js = subprocess.check_output(
            'npx --no-install tsc input.ts; node input.js',
            shell=True,
            cwd="typescript/node"
        )

        return render_template('interpret.html', output=js)
    else:
        return render_template('interpret.html')

@app.route('/')
def hello():
    return render_template('index.html')


#Load user
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    #date = db.Column(db.String(80), nullable=False)
    progress = db.Column(db.Integer, nullable = False)
    avatar = db.Column(db.String(80))

    def __repr__(self):
        return '<User %r>' % self.username

class UserSchema(Schema):
    user_id = fields.Int(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)
    #date = fields.DateTime()
    progress = fields.Int(required=True)
    avatar = fields.Str()

@app.route('/game/load', methods = ['POST'])
def load():
    if request.method == 'POST':
        username = request.form('username')
        user = User.query.filter_by(username=username).first()
        json_user = json.dumps(user)
        return json_user
        #return redirect(url_for('load'))

#User details
#This need to be updated after we create different table (use forgein key)
@app.route('/user', methods = ['POST'])
def user():
    if request.method == "POST":
        username = request.json['username']
        user = User.query.filter_by(username='user0').first()
        schema = UserSchema()
        result = schema.dump(user)
        if (user):
            return result
        else:
            # Need change, supposed to return error template
            return {sad:'sad'}

#Change password
@app.route('/update', methods = ['PUT'])
def change_password():
    if request.method == 'PUT':
        username = request.form('username')
        user = User.query.filter_by(username=username).first()
        user.password = request.form('password')
        failed=False
        try:
            db.session.commit()
            return redirect(request.url)
        except Exception as e:
            #log your exception in the way you want -> log to file, log as error with default logging, send by email. It's upon you
            db_session.rollback()
            db_session.flush() # for resetting non-commited .add()
            failed=True

            # Need change, supposed to return error template
            return null

with app.test_request_context():
    print(url_for('user'))
    print(url_for('interpret'))