from flask import Flask, render_template, request, json, jsonify
import json
from pprint import pprint

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search():
    country = request.args.get("country")
    with open('static/cities.json', encoding="utf8") as data_file:
        data = json.load(data_file)
        return jsonify(data[country])

if __name__ == "__main__":
    app.run()