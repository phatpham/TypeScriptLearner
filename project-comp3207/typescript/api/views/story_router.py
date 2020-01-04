from flask import Blueprint,request, render_template

from api.model.StoryModel import Story, StorySchema


storyBP = Blueprint('storyBP', __name__, url_prefix='/story')

#not sure about the route
@storyBP.route('/load/<int:story_id>', methods = ['POST'])
def load(story_id):
    if request.method == "POST":
        story = Story.get_user_by_username(story_id)
        schema = StorySchema()
        result = schema.dump(story)
        return result