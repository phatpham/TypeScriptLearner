from marshmallow import Schema, fields

from typescript.api.utils.database import db

from sqlalchemy.dialects.mysql import TIME
from passlib.hash import pbkdf2_sha256 as sha256


#Load user
class User(db.Model):
    """
    User entity model, stored in 'users' table of database
    """
    __tablename__ = 'users'
    userID = db.Column(db.Integer, unique=True, primary_key=True)
    password = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    timestamp = db.Column(db.TIMESTAMP, nullable=False)
    progress = db.Column(db.Integer, nullable = False)
    avatar = db.Column(db.String(80))

    def __repr__(self):
        return '<User %r>' % self.username

    def __init__(self, username, password):
        self.password = password
        self.username = username
        self.progress = 0

    def save_to_db(self):
        db.session.add(self)
        try:
            db.session.commit()
        except Exception as e:
            print(e)

    @staticmethod
    def update(the_username,old_password, new_password):
        user = User.query.filter_by(username=the_username).first()
       
        print(sha256.verify(old_password, user.password))
        if sha256.verify(old_password, user.password):
            user.password = sha256.hash(new_password)
            try:
                db.session.commit()
                return True
            except Exception as e:
                #log your exception in the way you want -> log to file, log as error with default logging, send by email. It's upon you
                db.session.rollback()
                db.session.flush() # for resetting non-commited .add()
                return False

    @staticmethod
    def update_progress(username):
        user = User.query.filter_by(username=username).first()
        user.progress = user.progress + 1
        try:
            db.session.commit()
            return True
        except Exception as e:
            #log your exception in the way you want -> log to file, log as error with default logging, send by email. It's upon you
            db.session.rollback()
            db.session.flush() # for resetting non-commited .add()
            return False

    @staticmethod
    def update_avatar(username,avatar):
        user = User.query.filter_by(username=username).first()

        if user:
            user.avatar = avatar
            try:
                db.session.commit()
                return True
            except Exception as e:
                #log your exception in the way you want -> log to file, log as error with default logging, send by email. It's upon you
                db.session.rollback()
                db.session.flush() # for resetting non-commited .add()
                return False
                
    @staticmethod
    def get_user_by_username(name):
        print("username "+name)
        user = User.query.filter_by(username=name).first()
        print(user)
        return user
    
    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)

class UserSchema(Schema):
    userID = fields.Int(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)
    timestamp = fields.DateTime()
    progress = fields.Int(required=True)
    avatar = fields.Str()

