from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route("/server", methods=["POST"])
def webhook():
    data = request.get_json()
    if data and data["message"].get("type") == "end-of-call-report":
        print(f"Received webhook: {data}")
        return jsonify({"status": "success"})
    return jsonify({})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
