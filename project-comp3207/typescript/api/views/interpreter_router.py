import subprocess

from flask_jwt_extended import jwt_required
from flask import Blueprint,request, render_template

from api.model.StoryModel import Story, StorySchema
from api.model.LeaderboardModel import Leaderboard, LeaderboardSchema

interp = Blueprint('interp', __name__, url_prefix='/game')

@jwt_required
@interp.route('/execute', methods = ["POST", "GET"])
def execute():
    '''
    Execute code
    '''
    if request.method == "POST":
        '''
        Response to post req
        @return render page with output string
        '''
        #get input code and time submitted
        input_code = request.form['inputCode']
        time = request.form['time']

        #to run this, install necessary node package in typescript/node
        write_to_tmp_file(input_code)

        #if solution is correct, write to leaderboard 
        # <--- Relate to many unimplemented task, lot of work

        #To-be-change
        return render_template('interpret.html', output=js)
    else:
        return render_template('interpret.html')

def write_to_tmp_file(input_code):
    """
    Put input code into a temporary file
    """
    #put code in temp file
    filename = "typescript/node/input.ts"

    inputTS = open(filename, "w")
    inputTS.write(input_code)
    inputTS.close()

