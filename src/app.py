from flask import Flask
import os
import subprocess
import json
from flask import jsonify

app = Flask(__name__)


@app.route('/flask', methods=['GET'])
def index():
    cwd = {
        "DIRECTORY": os.getcwd(),
        "FILES": subprocess.check_output('ls', shell=True).decode('utf-8').split('\n')}
    return json.dumps(cwd)


@app.route('/cd')
def cd():
    # run 'level_up' command
    os.chdir(request.args.get('path'))

    return redirect


if __name__ == "__main__":
    app.run(port=5000, debug=True)
