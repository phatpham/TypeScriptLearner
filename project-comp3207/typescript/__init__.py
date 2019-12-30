import subprocess

from flask import render_template, url_for, request
from flask import Flask
app = Flask(__name__)

@app.route('/interpret', methods = ["POST", "GET"])
def interpret():
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
            'node tsc input.ts',
            shell=True,
            cwd="typescript/node"
        )

        return render_template('interpret.html', output=js)
    else:
        return render_template('interpret.html')

@app.route('/')
def hello():
    return render_template('index.html')
