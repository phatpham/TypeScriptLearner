from marshmallow import Schema, fields

from api.utils.database import db

from passlib.hash import pbkdf2_sha256 as sha256


#Load user
class Leaderboard(db.Model):
    """
    Leaderboard entity model, stored in 'Leaderboard' table of database
    """
    leaderboard_id = db.Column(db.Integer, unique=True, primary_key=True)
    story_id = db.Column(db.Integer) #should be forgein key
    username = db.Column(db.String)
    time = db.Column(db.Integer)

    def __init__(self, data):
        self.leaderboard_id = data.get("leaderboard_id")
        self.story_id = data.get("story_id")
        self.username = data.get("username")
        self.time = data.get("time")


    @staticmethod
    def return_top5_by_story_id(id):
        top_5 = Leaderboard.query.filter_by(story_id=id).order_by(Leaderboard.time.amount.desc()).limit(5).all()
        return top_5
    

class LeaderboardSchema(Schema):
    leaderboard_id = fields.Int(required=True)
    story_id = fields.Str(required=True)
    username = fields.Str(required=True)
    time = fields.Int(required=True)


