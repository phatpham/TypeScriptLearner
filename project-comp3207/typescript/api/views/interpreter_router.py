import subprocess

from flask_jwt_extended import jwt_required
from flask import Blueprint,request, render_template

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
        inputCode = request.form['inputCode']
                
        #put code in temp file
        filename = "typescript/node/input.ts"

        inputTS = open(filename, "w")
        inputTS.write(inputCode)
        inputTS.close()

        #temporary placeholder for output
        js = subprocess.check_output(
            'npx --no-install tsc input.ts; node input.js',
            shell=True,
            cwd="typescript/node"
        )

        #To-be-change
        return render_template('interpret.html', output=js)
    else:
        return render_template('interpret.html')
