from flask import Blueprint, request, jsonify

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return jsonify({
        "message": "Welcome to the Source Code Analyzer API!"
        })