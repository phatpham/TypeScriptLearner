from flask import Blueprint,request, render_template

from typescript.api.model.StoryModel import Story, StorySchema
from flask_jwt_extended import jwt_required

storyBP = Blueprint('storyBP', __name__, url_prefix='/story')

@storyBP.route('/load/<int:story_id>', methods = ['POST'])
#@jwt_required
def load(story_id):
    if request.method == "POST":
        story = Story.get_story_by_id(story_id)
        schema = StorySchema()
        result = schema.dump(story)
        return result

@storyBP.route('/load', methods = ['POST'])
#@jwt_required
def loadAll():
    if request.method == "POST":
        unitName = Story.get_story()
        result = {'message': unitName}
        return result
