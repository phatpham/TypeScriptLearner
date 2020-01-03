from marshmallow import Schema, fields

from api.utils.database import db


#Load user
class User(db.Model):
    """
    User entity model, stored in 'user' table of database
    """
    user_id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    #date = db.Column(db.String(80), nullable=False)
    progress = db.Column(db.Integer, nullable = False)
    avatar = db.Column(db.String(80))

    def __repr__(self):
        return '<User %r>' % self.username

    def __init__(self, data):
        self.user_id = data.get("user_id")
        self.password = data.get("password")
        self.username = data.get("username")

    def update(self, username,password):
        self.password = password
        try:
            db.session.commit()
        except Exception as e:
            #log your exception in the way you want -> log to file, log as error with default logging, send by email. It's upon you
            db.session.rollback()
            db.session.flush() # for resetting non-commited .add()

    @staticmethod
    def get_user_by_username(name):
        user = User.query.filter_by(username=name).first()
        return user
    

class UserSchema(Schema):
    user_id = fields.Int(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)
    #date = fields.DateTime()
    progress = fields.Int(required=True)
    avatar = fields.Str()

