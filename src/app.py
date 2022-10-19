from flask import Flask
import os
import subprocess
from flask import jsonify

app = Flask(__name__)


@app.route('/flask', methods=['GET'])
def index():
    cwd = {
        "DIRECTORY": os.getcwd(),
        "FILES": subprocess.check_output('ls', shell=True).decode('utf-8')}
    return cwd


if __name__ == "__main__":
    app.run(port=5000, debug=True)
