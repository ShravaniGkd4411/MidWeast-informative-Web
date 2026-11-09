
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", title="Home")

@app.route("/about")
def about():
    return render_template("about.html", title="About Us")

@app.route("/disposal")
def disposal():
    return render_template("disposal.html", title="Disposal Guide")

@app.route("/centres")
def centres():
    return render_template("centres.html", title="Collection Centres")

@app.route("/expiry")
def expiry():
    return render_template("expiry.html", title="Medicine Expiry")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html", title="Awareness Quiz")

@app.route("/contact")
def contact():
    return render_template("contact.html", title="Contact Us")

if __name__ == "__main__":
    app.run(debug=True)
