from marshmallow import Schema, fields
 
from typescript.api.utils.database import db

#Load user
class Story(db.Model):
    """
    Story entity model, stored in 'Story' table of database
    """
    __tablename__="story"
    storyID = db.Column(db.Integer, unique=True, primary_key=True)
    solution=db.Column(db.String(255), nullable=False)
    instruction=db.Column(db.String(255), nullable=False)
    option_1= db.Column(db.String(255))
    option_2= db.Column(db.String(255))
    option_3= db.Column(db.String(255))
    option_4= db.Column(db.String(255))
    template= db.Column(db.String(255))
    storyDescription = db.Column(db.String(255))
    unitName= db.Column(db.String(255))
    

    def __init__(self, data):
        self.storyID = data.get("story_id")
        self.instruction = data.get("instruction")
        self.option_1 = data.get("option_1")
        self.option_2 = data.get("option_2")
        self.option_3 = data.get("option_3")
        self.option_4 = data.get("option_4")
        self.template = data.get("template")
        self.storyDescription = data.get("storyDescription")
        self.unitName = data.get("unitName")
        self.solution = data.get("solution")

    @staticmethod
    def get_story_by_id(id):
        story = Story.query.filter_by(storyID=id).first()
        return story

    @staticmethod
    def get_story():
        stories = Story.query.all()
        lstObj = []
        for story in stories:
            lstObj.append({"id":story.storyID,"name":story.unitName})
        print(lstObj)
        return lstObj
    

class StorySchema(Schema):
    storyID = fields.Int(required=True)
    solution = fields.Str(required=True)
    instruction = fields.Str(required=True)
    option_1 = fields.Str()
    option_2 = fields.Str()
    option_3 = fields.Str()
    option_4 = fields.Str()
    template = fields.Str()
    unitName = fields.Str()
    storyDescription = fields.Str()


