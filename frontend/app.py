# frontend/app.py
from flask import Flask, render_template

# Create the Flask app instance
app = Flask(__name__)

# This is the root route for your frontend
# It serves the index.html template
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # When running locally, Flask automatically serves static files
    # The Docker container will run Gunicorn, which is also configured for this
    app.run(host='0.0.0.0', port=8080, debug=True)
