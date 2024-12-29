from flask import Flask, request, jsonify
import google.generativeai as genai  # Assuming you're using Gemini for recommendation generation
from flask_cors import CORS
import re  # For regular expressions

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"*": {"origins": "http://localhost:3000"}})

# Initialize Gemini model (replace with your API credentials)
API_KEY = "AIzaSyAzTFzVpFhUirCtW-_4tYFyJ88X7hsykGw"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')


@app.route('/recommendation', methods=['POST'])
def generate_recommendation():
    try:
        # Parse the request data from the React frontend
        data = request.json
        if not data:
            return jsonify({"message": "Invalid data provided"}), 400

        # Extract the form data
        name = data.get("name")
        age = data.get("age")
        family_size = data.get("familySize")
        monthly_income = data.get("monthlyIncome")
        savings_goals = data.get("savingsGoals", [])
        occupation = data.get("occupation",[])

        # Validate required fields
        if not all([name, age, family_size,monthly_income, savings_goals, occupation]):
            return jsonify({"message": "Missing required fields"}), 400

        # Create a prompt for the recommendation model
        user_info = (
            f"Name: {name}\nAge: {age}\n"
            f"Family Size: {family_size}\n"
            f"Monthly Income: {monthly_income}\n"
            f"Savings Goals: {', '.join(savings_goals)}\n"
            f"Occupation: {', '.join(occupation)}\n"
        )
        prompt = (
    f"I have a user with the following details:\n\n{user_info}\n\n"
    f"Please provide a personalized budget allocation for the user in this format:\n\n"
    f"1. [Category] - ₹[Amount]\n"
    f"2. [Category] - ₹[Amount]\n"
    f"3. [Category] - ₹[Amount]\n"
    f"4. [Category] - ₹[Amount]\n\n"
    f"5. [Category] - ₹[Amount]\n"
    f"6. [Category] - ₹[Amount]\n"
    f"7. [Category] - ₹[Amount]\n"
    f"8. [Category] - ₹[Amount]\n\n"
    f"9. [Category] - ₹[Amount]\n"
    f"10. [Category] - ₹[Amount]\n\n"
    f"11. [Category] - ₹[Amount]\n"
    f"12. [Category] - ₹[Amount]\n\n"
    f"13. [Category] - ₹[Amount]\n"
    f"14. [Category] - ₹[Amount]\n\n"
    f"15. [Category] - ₹[Amount]\n"
    f"The categories should include separate categories for food,transport, electricity, water,cooking fuel"
    f"Take into consideration the occupation of the person to select some categories."
    f"Ensure the response includes only numbers and categories, with no lengthy explanations or extra information.Do not assign 0 to any category."
    f"If the monthly income of the person is less give only important categories. Unnecessary categories like clothing and personal care should be prohibited in that case."
    f"The output should focus on actionable budget allocations using clear, simple language."
    f""
    
)


        # Generate recommendation using Gemini
        response = model.generate_content([prompt])
        recommendation = response.text
        print(recommendation)
        # Use regex to extract categories and amounts
        pattern = r"(\d+)\.\s*([A-Za-z\s\/&\(\),]+)\s*-\s*₹(\d+)"

        matches = re.findall(pattern, recommendation)

        print(matches)
        # Convert matches into a structured JSON format
        recommendations = [
            {"rank": int(match[0]), "category": match[1].strip(), "amount": int(match[2])}
            for match in matches
        ]

        # Respond to the frontend with the structured recommendation
        return jsonify({"recommendations": recommendations}), 200

    except Exception as e:
        print(f"Error while generating recommendation: {e}")
        return jsonify({"message": "Error generating recommendation"}), 500

# @app.route('/savings-plan', methods=['POST'])
# def generate_savings_plan():
#     try:
#         # Parse request data
#         data = request.json
#         if not data:
#             return jsonify({"message": "Invalid data provided"}), 400

#         # Extract required fields
#         savings_goals = data.get("savingsGoals", [])
#         recommendations = data.get("recommendations", [])

#         if not savings_goals or not recommendations:
#             return jsonify({"message": "Missing savings goals or recommendations"}), 400

#         # Create a prompt for Gemini
#         prompt = (
#     f"User's savings goals: {', '.join(savings_goals)}.\n\n"
#     f"Budget recommendations: {', '.join([f'{rec['category']} - ₹{rec['amount']}' for rec in recommendations])}.\n\n"
#     f"Based on these, suggest a creative and concise name for a personalized savings plan."
#     f"Do not give anything else in the output and keep into consideration that user is a villager."
# )



#         # Generate savings plan using Gemini
#         response = model.generate_content([prompt])
#         savings_plan = response.text

#         # Respond with the savings plan
#         return jsonify({"savingsPlan": savings_plan}), 200

#     except Exception as e:
#         print(f"Error while generating savings plan: {e}")
#         return jsonify({"message": "Error generating savings plan"}), 500

@app.route('/chatbot', methods=['POST'])
def generate_chat_response():
    try:
        # Parse the request data from the React frontend
        data = request.json
        if not data:
            return jsonify({"message": "Invalid data provided"}), 400

        user_message = data.get("message")
        if not user_message:
            return jsonify({"message": "Message is required"}), 400

        # Create a prompt for Gemini model (using user's message)
        prompt = f"User: {user_message}\n\nAssistant:"

        # Generate response using Gemini model
        response = model.generate_content([prompt])
        bot_reply = response.text.strip()

        # Return the generated response to the frontend
        return jsonify({"response": bot_reply}), 200

    except Exception as e:
        print(f"Error while generating chat response: {e}")
        return jsonify({"message": "Error generating chat response"}), 500


if __name__ == '__main__':
    app.run(debug=True)
