from marshmallow import Schema, fields

from api.utils.database import db

#Load user
class Story(db.Model):
    """
    Story entity model, stored in 'Story' table of database
    """
    story_id = db.Column(db.Integer, unique=True, primary_key=True)
    solution:db.Column(db.String(80), nullable=False)
    instruction:db.Column(db.String(80), nullable=False)
    options_1: db.Column(db.String(80))
    options_2: db.Column(db.String(80))
    options_3: db.Column(db.String(80))
    options_4: db.Column(db.String(80))


    def __init__(self, data):
        self.story_id = data.get("story_id")
        self.instruction = data.get("instruction")
        self.options_1 = data.get("option_1")
        self.options_2 = data.get("option_2")
        self.options_3 = data.get("option_3")
        self.options_4 = data.get("option_4")



    @staticmethod
    def get_story_by_id(id):
        user = Story.query.filter_by(story_id=id).first()
        return user
    

class StorySchema(Schema):
    story_id = fields.Int(required=True)
    solution = fields.Str(required=True)
    instruction = fields.Str(required=True)
    option_1 = fields.Str()
    option_2 = fields.Str()
    option_3 = fields.Str()
    option_4 = fields.Str()

