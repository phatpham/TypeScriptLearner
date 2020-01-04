from flask import Blueprint,request, render_template

from typescript.api.model.LeaderboardModel import Leaderboard,LeaderboardSchema
leaderBP = Blueprint('leaderBP', __name__, url_prefix='/leaderboard')

@leaderBP.route('<int:story_id>', methods = ['POST']) 
def showBoard(story_id):
    #get list of users based on story_Id (max 5)
    top_5 = Leaderboard.return_top5_by_story_id(story_id)
    
    #untested
    schema = LeaderboardSchema()
    result = schema.dump(top_5)
    #send back list of users (name, time completed)
    return