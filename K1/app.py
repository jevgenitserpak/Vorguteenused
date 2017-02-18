from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route('/url_which_handles_form_data/', methods=['POST'])
def handle_data():
    projectpath = request.form.projectFilePath
    #your code

if __name__ == "__main__":
    app.run()