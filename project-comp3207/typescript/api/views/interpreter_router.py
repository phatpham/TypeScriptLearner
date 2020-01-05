import subprocess

from flask_jwt_extended import jwt_required
from flask import Blueprint,request, render_template

from api.model.StoryModel import Story, StorySchema
from api.model.LeaderboardModel import Leaderboard, LeaderboardSchema

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

        #to run this, install necessary node package in typescript/node
        write_to_tmp_file(input_code, file_id)


        #edge case for the first problem
        if file_id == 1:
            print(input_code)
            if input_code == "console.log('Hello World')":
                #to be written

                save(file_id)
                remove_tmp(file_id) 

                return {
                    'output':'Hello World',
                    'success':True
                }
            else:
                return {
                    'success':False
                }
        else:

            #if solution is correct, write to leaderboard

            
            try:
                js = subprocess.check_output(
                'npx --no-install tsc problems/tmp_{}.ts'.format(file_id),
                shell=True,
                stderr=subprocess.STDOUT,
                cwd="typescript/node"
            )
            except subprocess.CalledProcessError as cpe:
                return cpe.output

            try:
                a = subprocess.check_output(
                    'node problems/tmp_{}.js'.format(file_id), 
                    shell=True, 
                    stderr=subprocess.STDOUT, 
                    cwd="typescript/node"
                ) 
                print(clean(a))
                if clean(a) == 'true':
                    save(file_id)
                    remove_tmp(file_id)
                    return {'message':'All test passed'}
                else:
                    remove_tmp(file_id)
                    return {'message':'Make sure to follow all the instructions'}
            except subprocess.CalledProcessError as cpe:
                return cpe.output
            # <--- Relate to many unimplemented task, lot of work

            #To-be-change
            #return render_template('interpret.html', output=js)
        #else:
            #return render_template('interpret.html')

def write_to_tmp_file(input_code, file_id):
    """
    Put input code into a temporary file
    """
    #put code in temp file
    filename = "typescript/node/problems/{}.ts".format(file_id)
    tmp_filename = "typescript/node/problems/tmp_{}.ts".format(file_id) 
    copyfile(filename, tmp_filename)
    with open(tmp_filename, 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write(input_code.rstrip('\r\n') + '\n' + content)

def save(file_id):
    #User.update_leaderboard(time)
        #if file_id == user.progress:
        #update user profile
            pass

def remove_tmp(file_id):
    filename = "typescript/node/problems/tmp_{}.ts".format(file_id)
    filename2 = "typescript/node/problems/tmp_{}.js".format(file_id) 

    os.remove(filename)
    os.remove(filename2)

#conver byte to string, remove newline character
def clean(byte):
    return re.sub("\n","",byte.decode("utf-8").strip()) 