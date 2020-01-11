import subprocess

from flask_jwt_extended import jwt_required
from flask import Blueprint,request, render_template

from typescript.api.model.StoryModel import Story, StorySchema
from typescript.api.model.LeaderboardModel import Leaderboard, LeaderboardSchema
from typescript.api.model.UserModel import User, UserSchema

from shutil import copyfile
import os
import re

interp = Blueprint('interp', __name__, url_prefix='/game')

@interp.route('/execute/<int:file_id>', methods = ["POST", "GET"])
def execute(file_id):
    '''
    Execute code
    '''
    if request.method == "POST":
        '''
        Response to post req
        @return render page with output string
        '''
        #get input code and time submitted
        input_code = request.json['input_code']
        time = request.json['time']
        username = request.json['username']
        print(username)
        #to run this, install necessary node package in typescript/node
        write_to_tmp_file(input_code, file_id)
        print(4)
        user = User.get_user_by_username(username)
        #edge case for the first problem
        if file_id == 1:
            print(input_code)
            if input_code == "console.log('Hello World')":
                
                
                save(file_id, username, time)

                return {
                    'message':'Hello World',
                    'success':True,
                    'progress':user.progress + 1
                }
            else:
                return {
                    'success':False
                }
        else:

            
            try:
                js = subprocess.check_output(
                'npx --no-install tsc problems/tmp_{}.ts'.format(file_id),
                shell=True,
                stderr=subprocess.STDOUT,
                cwd="typescript/node"
            )
            except subprocess.CalledProcessError as cpe:
                return {
                    'message': clean(cpe.output),
                    'success': False,
                    'progress': user.progress
                }

            try:
                a = subprocess.check_output(
                    'node problems/tmp_{}.js'.format(file_id), 
                    shell=True, 
                    stderr=subprocess.STDOUT, 
                    cwd="typescript/node"
                ) 

                print(clean(a))
                #free editor
                if file_id == 4:
                    save(file_id, username, time)
                    remove_tmp(file_id)
                    return {
                        'message':clean(a),
                        'success':True  ,
                        'progress': user.progress + 1  
                    }
                if clean(a) == 'true':
                    #if solution is correct, write to leaderboard
                    save(file_id, username, time)
                    remove_tmp(file_id)
                    return {
                        'message':'All test passed',
                        'success':True  ,
                        'progress': user.progress + 1  
                    }  
                else:
                    remove_tmp(file_id)
                    return {
                        'message':'Make sure to follow all the instructions',
                        'success':False,
                        'progress': user.progress
                    }
            except subprocess.CalledProcessError as cpe:
                return {
                    'message':clean(cpe.output),
                    'success': False,
                    'progress': user.progress
                }

def write_to_tmp_file(input_code, file_id):
    """
    Put input code into a temporary file
    """
    filename = "typescript/node/problems/{}.ts".format(file_id)
    tmp_filename = "typescript/node/problems/tmp_{}.ts".format(file_id) 
    copyfile(filename, tmp_filename)
    with open(tmp_filename, 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write(input_code.rstrip('\r\n') + '\n' + content)


def save(file_id,username, time):
    """
    Save progress and update leaderboard
    """
    Leaderboard.update_leaderboard(username, time, file_id)
    user = User.get_user_by_username(username)
    if file_id == user.progress+1:
        User.update_progress(username)

def remove_tmp(file_id):
    '''
    Remove tmp_file after running the code
    '''
    filename = "typescript/node/problems/tmp_{}.ts".format(file_id)
    filename2 = "typescript/node/problems/tmp_{}.js".format(file_id) 

    os.remove(filename)
    os.remove(filename2)

def clean(byte):
    '''
    Convert byte to string, remove newline character
    '''
    return re.sub("\n","",byte.decode("utf-8").strip()) 