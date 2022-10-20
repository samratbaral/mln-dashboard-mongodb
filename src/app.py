# #import packages
# from flask import Flask
# from flask import render_template_string
# from flask import render_template
# import os
# from flask import redirect
# import subprocess
# from flask import request
# # handle root route
from flask import Flask
import os
import subprocess
import json
from flask import jsonify
from flask import request
from flask import redirect

app = Flask(__name__)


@app.route('/flask', methods=['GET'])
def index():
    cwd = {
        "DIRECTORY": os.getcwd(),
        "FILES": subprocess.check_output('ls', shell=True).decode('utf-8').split('\n')}
    return json.dumps(cwd)


@app.route('/cd')
def cd():

    # run 'level_up' commands
    os.chdir(request.args.get('path'))
    y=os.getcwd()
    return redirect('http://localhost:3000/viewfile')


if __name__ == "__main__":
    app.run(port=5000, debug=True)
