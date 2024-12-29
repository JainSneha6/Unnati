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
        spending_frequency = data.get("spendingFrequency")
        expense_tracking = data.get("expenseTracking")
        financial_goals = data.get("financialGoals", [])
        income = data.get("income")

        # Validate required fields
        if not all([name, age, spending_frequency, expense_tracking, income]):
            return jsonify({"message": "Missing required fields"}), 400

        # Create a prompt for the recommendation model
        user_info = (
            f"Name: {name}\nAge: {age}\n"
            f"Spending Frequency: {spending_frequency}\n"
            f"Expense Tracking Habit: {expense_tracking}\n"
            f"Financial Goals: {', '.join(financial_goals)}\n"
            f"Income: ₹{income}(monthly)"
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
    f"The categories should include separate categories for food,transport"
    f"Ensure the response includes only numbers and categories, with no lengthy explanations or extra information. "
    f"The output should focus on actionable budget allocations using clear, simple language."
    
)


        # Generate recommendation using Gemini
        response = model.generate_content([prompt])
        recommendation = response.text

        # Replace double asterisks with <br /> tags for line breaks in HTML
        formatted_recommendation = recommendation.replace("**", "")
        formatted_recommendation = formatted_recommendation.replace("*", "<br />")
        formatted_recommendation = re.sub(r'([1-9])\.', r'<br />\1.', formatted_recommendation)

        # Respond to the frontend with the recommendation
        return jsonify({"recommendation": formatted_recommendation}), 200

    except Exception as e:
        print(f"Error while generating recommendation: {e}")
        return jsonify({"message": "Error generating recommendation"}), 500


if __name__ == '__main__':
    app.run(debug=True)
