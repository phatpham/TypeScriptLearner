from flask import Blueprint,request, render_template
from flask_jwt_extended import jwt_required
from api.model.LeaderboardModel import Leaderboard,LeaderboardSchema
leaderBP = Blueprint('leaderBP', __name__, url_prefix='/leaderboard')

@leaderBP.route('<int:story_id>', methods = ['POST']) 
#@jwt_required
def showBoard(story_id):
    #get list of users based on story_Id (max 5)
    top_5 = Leaderboard.return_top5_by_story_id(story_id)
    
    #untested

    #send back list of users (name, time completed)
    return {"list":top_5}