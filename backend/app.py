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
            f"Take into consideration all the savings goals of the person to select some categories."
            f"Add savings for child education if a person has entered Save for child's education as a savings goal."
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

@app.route('/savings-plan', methods=['POST'])
def generate_savings_plan():
    try:
        # Parse request data
        data = request.json
        if not data:
            return jsonify({"message": "Invalid data provided"}), 400

        # Extract required fields
        savings_goals = data.get("savingsGoals", [])
        recommendations = data.get("recommendations", [])

        if not savings_goals or not recommendations:
            return jsonify({"message": "Missing savings goals or recommendations"}), 400

        # Create a prompt for Gemini
        prompt = (
            f"User's savings goals: {', '.join(savings_goals)}.\n\n"
            f"Budget recommendations: {', '.join([f'{rec['category']} - ₹{rec['amount']}' for rec in recommendations])}.\n\n"
            f"Based on these, suggest a creative and concise name for a personalized savings plan."
            f"Do not give anything else in the output and keep into consideration that user is a villager."
        )
        # Generate savings plan using Gemini
        response = model.generate_content([prompt])
        savings_plan = response.text

        # Respond with the savings plan
        return jsonify({"savingsPlan": savings_plan}), 200

    except Exception as e:
        print(f"Error while generating savings plan: {e}")
        return jsonify({"message": "Error generating savings plan"}), 500

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
    
@app.route('/smart-nivesh', methods=['POST'])
def generate_investment_opportunities():
    try:
        # Parse the request data from the React frontend
        data = request.json
        if not data:
            return jsonify({"message": "Invalid data provided"}), 400

        # Extract the recommendations and form data
        recommendations = data.get("recommendations", [])
        form_data = data.get("formData", {})

        # Validate required fields
        if not recommendations or not form_data:
            return jsonify({"message": "Missing recommendations or form data"}), 400

        # Create a prompt for Gemini to generate investment opportunities
        user_info = (
            f"Name: {form_data.get('name')}\n"
            f"Age: {form_data.get('age')}\n"
            f"Family Size: {form_data.get('familySize')}\n"
            f"Monthly Income: {form_data.get('monthlyIncome')}\n"
            f"Savings Goals: {', '.join(form_data.get('savingsGoals', []))}\n"
            f"Occupation: {', '.join(form_data.get('occupation', []))}\n"
        )

        # Sum the amounts from the budget recommendations to consider savings
        total_saved = sum([rec['amount'] for rec in recommendations])

        recommendations_text = "\n".join([f"{rec['category']} - ₹{rec['amount']}" for rec in recommendations])

        prompt = (
            f"I have a villager with the following details:\n\n{user_info}\n\n"
            f"Budget Recommendations:\n{recommendations_text}\n\n"
            f"The villager has saved a total of ₹{total_saved} across various categories. "
            f"Please suggest a few low-risk investment opportunities along with relevant government schemes that "
            f"are accessible for a villager with this amount of savings. "
            f"Consider the savings and available budget of the villager in choosing the investment oppurtunities amount."
            f"Provide a list of investments and schemes in the following format:\n"
            f"1. [Investment Opportunity Name] - ₹[Amount] - Risk: [Low/Medium/High] - Type: [Investment Type]\n"
            f"2. [Investment Opportunity Name] - ₹[Amount] - Risk: [Low/Medium/High] - Type: [Investment Type]\n"
            f"3. [Investment Opportunity Name] - ₹[Amount] - Risk: [Low/Medium/High] - Type: [Investment Type]\n"
            f"4. [Investment Opportunity Name] - ₹[Amount] - Risk: [Low/Medium/High] - Type: [Investment Type]\n"
            f"5. [Government Scheme Name] - ₹[Amount] - Risk: Low - Type: Government Scheme\n"
            f"6. [Government Scheme Name] - ₹[Amount] - Risk: Low - Type: Government Scheme\n"
            f"7. [Government Scheme Name] - ₹[Amount] - Risk: Low - Type: Government Scheme\n"
            f"8. [Government Scheme Name] - ₹[Amount] - Risk: Low - Type: Government Scheme\n"
            f"The amount should be less than 10% of his montly income."
            f"Ensure the response includes only numbers and categories, with no lengthy explanations or extra information.Do not assign 0 to any category."
            f"Do not suggest risky investments. Only provide low-risk options. "
        )

        response = model.generate_content([prompt])
        investment_opportunities = response.text
        print(investment_opportunities)

        # Use regex to extract investment opportunities, risk levels, and types
        pattern = r"(\d+)\.\s*([A-Za-z\s\/&\(\),]+)\s*-\s*₹(\d+)\s*-\s*Risk:\s*(Low|Medium|High)\s*-\s*Type:\s*([A-Za-z\s]+)"

        matches = re.findall(pattern, investment_opportunities)

        print(matches)

        # Convert matches into a structured JSON format
        opportunities = [
            {
                "rank": int(match[0]),
                "investment": match[1].strip(),
                "amount": int(match[2]),
                "risk": match[3].strip(),
                "type": match[4].strip()
            }
            for match in matches
        ]

        # Respond with the micro-investment opportunities
        return jsonify({"investmentOpportunities": opportunities}), 200

    except Exception as e:
        print(f"Error while generating investment opportunities: {e}")
        return jsonify({"message": "Error generating investment opportunities"}), 500
    
@app.route('/investment-description', methods=['POST'])
def generate_investment_description():
    try:
        # Parse the request data
        data = request.json
        if not data:
            return jsonify({"message": "Invalid data provided"}), 400

        investment_name = data.get("investmentName")
        if not investment_name:
            return jsonify({"message": "Investment name is required"}), 400

        # Create a prompt for Gemini to generate the description
        prompt = (
            f"Please provide a concise and informative description for the following investment scheme:\n"
            f"Investment Name: {investment_name}\n\n"
            f"The description should be clear, easy to understand, and highlight the key points of the investment scheme."
        )

        # Generate description using Gemini
        response = model.generate_content([prompt])
        description = response.text.strip()

        # Return the description to the frontend
        return jsonify({"description": description}), 200

    except Exception as e:
        print(f"Error while generating investment description: {e}")
        return jsonify({"message": "Error generating investment description"}), 500


if __name__ == '__main__':
    app.run(debug=True)
