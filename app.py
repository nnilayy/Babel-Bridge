from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload():
    if 'audio' not in request.files:
        return "No audio file provided."

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return "No selected file."
    return "Audio file uploaded successfully."
    

if __name__ == '__main__':
    app.run(debug=True)
