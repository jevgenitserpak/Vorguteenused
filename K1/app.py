from flask import Flask, render_template, request, json, jsonify
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'k1'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route("/")
def main():
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login_data():
    email = request.form["inputEmail"]
    password = request.form["inputPassword"]
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * from user where user_email='" + email + "' and user_password='" + password + "'")
    conn.commit()
    data = cursor.fetchone()
    if data is None:
        return "Username or Password is wrong"
    else:
        return render_template('todo.html')


@app.route('/register', methods=['POST'])
def reg_data():
    email = request.form["registerEmail"]
    password = request.form["registerPassword"]
    conn = mysql.connect()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO user (user_email, user_password) VALUES ('" + email + "','" + password + "')")
        conn.commit()
    except:
        return "Something went wrong"
    return "Good, now go back and login"


@app.route('/list', methods=['POST'])
def get_list():
    email = request.form['username']
    conn = mysql.connect()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM todo WHERE user_email='" + email + "'")
        conn.commit()
    except:
        return "Something went wrong"
    data = cursor.fetchall()
    if data:
        return jsonify(data)
    else:
        return "None"


@app.route('/add', methods=['POST'])
def add_data():
    email = request.form["username"]
    todo = request.form["todo"]
    conn = mysql.connect()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO todo (user_email, user_todo) VALUES ('" + email + "','" + todo + "')")
        conn.commit()
    except:
        return False
    return True


@app.route('/remove', methods=['POST'])
def remove_data():
    email = request.form["username"]
    todo = request.form["todo"]
    conn = mysql.connect()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM todo WHERE user_email='" + email + "' and user_todo='" + todo + "')")
        conn.commit()
    except:
        return False
    return True


if __name__ == "__main__":
    app.run()
