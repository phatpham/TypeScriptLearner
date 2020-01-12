from marshmallow import Schema, fields

from typescript.api.utils.database import db

from passlib.hash import pbkdf2_sha256 as sha256


#Load user
class Leaderboard(db.Model):
    """
    Leaderboard entity model, stored in 'Leaderboard' table of database
    """
    id = db.Column(db.Integer, unique=True, primary_key=True)
    storyID = db.Column(db.Integer) #should be forgein key
    username = db.Column(db.String)
    time = db.Column(db.Integer)

    def __init__(self, username, time, storyID):
        self.storyID = storyID
        self.username = username
        self.time = time

    @staticmethod 
    def update_leaderboard(t_username,t_time, t_storyID):
        new_entry = Leaderboard(
            username = t_username,
            time = t_time,
            storyID = t_storyID
        )
        try:
            db.session.add(new_entry)
            db.session.commit()
            return True
        except Exception as e:
            #log your exception in the way you want -> log to file, log as error with default logging, send by email. It's upon you
            db.session.rollback()
            db.session.flush() # for resetting non-commited .add()
            return False 

    @staticmethod
    def return_top5_by_story_id(id):
        top_5 = Leaderboard.query.filter_by(storyID=id).order_by(Leaderboard.time.asc()).limit(5).all()
        recordObj = []
        for record in top_5:
            recordObj.append({"name":record.username,"time":record.time})
        print(recordObj)
        return recordObj
    

class LeaderboardSchema(Schema):
    leaderboard_id = fields.Int(required=True)
    story_id = fields.Str(required=True)
    username = fields.Str(required=True)
    time = fields.Int(required=True)


