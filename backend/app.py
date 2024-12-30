from flask import Flask, request, jsonify, send_file
import google.generativeai as genai  # Assuming you're using Gemini for recommendation generation
from flask_cors import CORS
import re  # For regular expressions
import os
import requests
from moviepy.editor import VideoFileClip, ImageClip, concatenate_videoclips, AudioFileClip
from PIL import Image
from gtts import gTTS
import time
import tempfile
import uuid
from werkzeug.exceptions import NotFound

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"*": {"origins": "http://localhost:3000"}})

# Initialize Gemini model (replace with your API credentials)
API_KEY = "AIzaSyAzTFzVpFhUirCtW-_4tYFyJ88X7hsykGw"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# Ensure 'uploads' directory exists
if not os.path.exists('uploads'):
    os.makedirs('uploads')

# Directory to store images
IMAGE_STORAGE_DIR = "chapter_images"
VIDEO_STORAGE_DIR = "chapter_videos"

os.makedirs(IMAGE_STORAGE_DIR, exist_ok=True)
os.makedirs(VIDEO_STORAGE_DIR, exist_ok=True)

# Ensure the directory for the video exists
def ensure_directory_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

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



@app.route('/detect_language', methods=['POST'])
def detect_language():
    if 'audio' not in request.files:
        return jsonify(message='No audio file provided!'), 400

    audio_file = request.files['audio']

    # Ensure uploads folder exists
    uploads_folder = 'uploads'
    if not os.path.exists(uploads_folder):
        os.makedirs(uploads_folder)

    audio_path = os.path.join(uploads_folder, 'recording_audio.mp3')  # Ensure mp3 extension
    audio_file.save(audio_path)

    # Continue with the logic after saving the file
    try:
        user_audio_file = genai.upload_file(path=audio_path)

        # Create the prompt to detect language and dialect
        prompt = (
            f"Identify the language and dialect of the following audio. "
            f"Give in the following format: "
            f"Language:[Language Name] - Dialect:[Dialect Name]"
        )

        response = model.generate_content([user_audio_file, prompt])
        detected_text = response.text # Assuming the response has content

        # Use regex to extract language and dialect
        match = re.search(r"Language:\s*(.*?)\s*-\s*Dialect:\s*(.*)", detected_text)
        if match:
            language = match.group(1).strip()
            dialect = match.group(2).strip()
            return jsonify(language=language, dialect=dialect)
        else:
            return jsonify(message="Failed to extract language and dialect."), 400

    except Exception as e:
        return jsonify(message=str(e)), 500


@app.route('/generate-story', methods=['POST'])
def generate_story():
    try:
        # Get the request data
        data = request.json
        print(data)
        # Extract chapter title, language, location, and form data
        chapter_title = data.get("chapterTitle")
        language_and_dialect = data.get("languageAndDialect")
        location = data.get("location")
        villager_form_data = data.get("villagerFormData")

        if not chapter_title or not language_and_dialect or not location or not villager_form_data:
            return jsonify({"message": "Missing required data"}), 400

        # Prepare the request payload to send to Gemini (or the model of your choice)
        prompt = (
            f"Chapter Title: {chapter_title}\n"
            f"Language and Dialect: {language_and_dialect}\n"
            f"Location: {location}\n"
            f"Villager Name: {villager_form_data.get('name')}\n"
            f"Villager Age: {villager_form_data.get('age')}\n"
            f"Villager Family Size: {villager_form_data.get('familySize')}\n"
            f"Villager Occupation: {', '.join(villager_form_data.get('occupation', []))}\n"
            f"Villager Monthly Income: {villager_form_data.get('monthlyIncome')}\n"
            f"Villager Savings Goals: {', '.join(villager_form_data.get('savingsGoals', []))}\n"
            f"\n"
            f"Create a 2-3 minute long concise story based on the above information, with the main focus being the chapter title. "
            f"The protagonist of the story should be the villager, and the story should explain the chapter in an engaging and easy-to-understand way. "
            f"The story should be interesting and attractive and do not include any asterisk."
        )


        # Send the data to Gemini API (or your model's API)
        response = model.generate_content([prompt])
        detected_text = response.text # Assuming the response has content
        print(detected_text)
        # Check the response from Gemini API
        
            
        return jsonify({"story": detected_text}), 200
        

    except Exception as e:
        print(f"Error while generating story: {e}")
        return jsonify({"message": "Error generating story"}), 500
    
@app.route('/save-story', methods=['POST'])
def save_story():
    try:
        # Get the request data
        data = request.json
        story = data.get("story")

        if not story:
            return jsonify({"message": "Story is missing"}), 400

        # Prepare the request payload to send to Gemini (or your model of choice)
        prompt = (
            f"Here is a story:\n{story}\n"
            "Summarize the story and break it into 10 key lines that describe key scenes, emotions, or elements of the story. "
            "These lines should be suitable to use as prompts for an image generation API. "
            "Each line should be clear, concise, and contain one key idea or scene from the story. "
            "Please format the output as follows:\n"
            "1. <line 1 description>\n"
            "2. <line 2 description>\n"
            "3. <line 3 description>\n"
            "4. <line 4 description>\n"
            "5. <line 5 description>\n"
            "6. <line 6 description>\n"
            "7. <line 7 description>\n"
            "8. <line 8 description>\n"
            "9. <line 9 description>\n"
            "10. <line 10 description>\n"
            f"Please follow the above format and give only the 10 lines."
            f"Whatever the language of the story the output should be in English only."
        )

        # Send the data to Gemini API (or your model's API)
        response = model.generate_content([prompt])
        detected_text = response.text  # Assuming the response has content
        print(detected_text)

        # Assuming the response has the format with 10 lines, we can split them by newlines
        lines = detected_text.strip().split("\n")

        if len(lines) < 10:
            return jsonify({"message": "Failed to generate 10 lines from the story"}), 400

        # Return the 10 lines to be used for image generation
        return jsonify({"lines": lines[:10]}), 200

    except Exception as e:
        print(f"Error while generating story: {e}")
        return jsonify({"message": "Error generating story"}), 500


def create_audio_from_text(text, lang='hi'):
    audio_file = f"temp_audio_{uuid.uuid4().hex}.mp3"
    tts = gTTS(text=text, lang=lang)
    tts.save(audio_file)
    return audio_file


def create_video_from_images_and_audio(image_paths, audio_file, chapter_id):
    audio_clip = AudioFileClip(audio_file)
    audio_duration = audio_clip.duration
    image_clips = []

    # Set the duration for each image (for example, 5 seconds per image)
    image_duration = audio_duration / len(image_paths)

    for image_path in image_paths:
        image_clip = ImageClip(image_path, duration=image_duration)
        image_clip = image_clip.resize(height=720)  # Remove 'resample' argument
        image_clips.append(image_clip)

    # Concatenate image clips into a single video
    video = concatenate_videoclips(image_clips, method="compose")

    # Set audio for the video
    video_with_audio = video.set_audio(audio_clip)

    # Save the video in the 'chapter_videos' directory with the name 'chapter_{chapter_id}.mp4'
    video_file = os.path.join(VIDEO_STORAGE_DIR, f"chapter_{chapter_id}.mp4")
    video_with_audio.write_videofile(video_file, fps=24)

    # Ensure MoviePy releases file handles
    video.close()
    audio_clip.close()

    return video_file

@app.route('/save-story-lines', methods=['POST'])
def save_story_lines():
    data = request.json
    chapter_id = data.get('chapterId')  # Get chapter ID
    lines = data.get('lines', [])       # Get story lines
    full_story = data.get('story', "")  # Full story for voiceover

    if not chapter_id or not lines:
        return jsonify({"error": "Chapter ID and lines are required"}), 400

    chapter_dir = os.path.join(IMAGE_STORAGE_DIR, f"chapter_{chapter_id}")
    ensure_directory_exists(chapter_dir)

    image_paths = []

    # Download images for each story line
    for index, line in enumerate(lines):
        prompt = line
        try:
            response = requests.get(f"https://image.pollinations.ai/prompt/{prompt}")
            if response.status_code == 200:
                image_path = os.path.join(chapter_dir, f"line_{index + 1}.jpg")
                with open(image_path, "wb") as image_file:
                    image_file.write(response.content)
                image_paths.append(image_path)
            else:
                print(f"Failed to generate image for line {index + 1}: {prompt}")
        except Exception as e:
            print(f"Error while generating image for line {index + 1}: {e}")

    if not image_paths:
        return jsonify({"error": "No valid images generated for the story lines"}), 400

    # Generate audio for the full story
    audio_file = create_audio_from_text(full_story)

    # Create the video from images and audio
    video_file = create_video_from_images_and_audio(image_paths, audio_file, chapter_id)

    try:
        return send_file(video_file, mimetype='video/mp4')
    except FileNotFoundError:
        return NotFound('Video file not found')

if __name__ == '__main__':
    app.run(debug=True)
