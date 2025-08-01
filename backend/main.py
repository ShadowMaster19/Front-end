from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app, origins=["*"], methods=["GET", "POST", "OPTIONS"], allow_headers=["Content-Type"])

# Configure Gemini AI
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Financial Coach API is running", "status": "healthy"}), 200

@app.route('/health', methods=['GET', 'OPTIONS'])
def health_check():
    if request.method == 'OPTIONS':
        return '', 200
    return jsonify({"status": "healthy", "message": "Backend is running"}), 200

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        message = data.get('message', '')
        
        if not message:
            return jsonify({"error": "No message provided"}), 400
        
        # Add financial coaching context
        prompt = f"""You are Seed, a helpful AI financial coach. Provide practical, actionable financial advice. 
        Keep responses concise but informative. Here's the user's question: {message}"""
        
        # Generate response using Gemini
        response = model.generate_content(prompt)
        
        return jsonify({"response": response.text}), 200
        
    except Exception as e:
        print(f"Error in /chat: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

# Handle all OPTIONS requests globally
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

if __name__ == '__main__':
    print("Starting Financial Coach API...")
    print("Health check: http://localhost:5000/health")
    print("Chat endpoint: http://localhost:5000/chat")
    app.run(host='0.0.0.0', port=5000, debug=True)