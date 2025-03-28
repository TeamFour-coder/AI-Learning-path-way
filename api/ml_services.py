from flask import Flask, request, jsonify, send_file
import joblib
import pandas as pd
import matplotlib.pyplot as plt
import os

app = Flask(__name__)

# Ensure directory exists for reports
os.makedirs("static/reports", exist_ok=True)

# Load trained model and label encoder
model = joblib.load("models/student_performance_analyzer.pkl")
label_enc = joblib.load("models/skill_label_encoder.pkl")  # Ensure this file exists

def analyze_performance(student_id, responses):
    responses_df = pd.DataFrame(responses)
    
    print("Received DataFrame Columns:", responses_df.columns)  # Debugging line
    
    # Check if required columns exist
    required_columns = {"Student ID", "Skill Type", "Selected Answer", "Correct Answer"}
    if not required_columns.issubset(responses_df.columns):
        missing_cols = required_columns - set(responses_df.columns)
        print("Missing Columns:", missing_cols)  # Debugging line
        return None  # If columns are missing, return None

    # Determine correctness
    responses_df['Correct'] = responses_df['Selected Answer'] == responses_df['Correct Answer']

    # Extract only the feature(s) used in training
    X_test = responses_df[["Student ID"]]  # **Use only the same features as training!**

    # Predict skill type using ML model
    responses_df["Predicted Skill Type"] = model.predict(X_test)

    # Convert encoded skill labels back to text
    responses_df["Predicted Skill Type"] = label_enc.inverse_transform(responses_df["Predicted Skill Type"].to_numpy())

    # Calculate performance for each skill type
    skill_performance = responses_df.groupby("Predicted Skill Type")["Correct"].mean() * 100

    return skill_performance


@app.route("/analyze_response", methods=["POST"])
def analyze_response():
    data = request.json  

    if not data or "student_id" not in data or "responses" not in data:
        return jsonify({"error": "Invalid input format"}), 400

    student_id = data["student_id"]
    responses = data["responses"]

    # Analyze performance using ML model
    skill_performance = analyze_performance(student_id, responses)

    if skill_performance is None:
        return jsonify({"error": "Missing required columns in input data"}), 400

    # Compute overall score as the average of skill performances
    overall_score = skill_performance.mean()

    # Define skill categories
    skills = skill_performance.index.tolist()
    img_paths = {}

    # Generate separate bar graphs for each skill type
    for skill in skills:
        img_path = f"static/reports/student_{student_id}_{skill}.png"
        if skill in skill_performance:
            plt.figure(figsize=(5, 4))
            plt.bar([skill], [skill_performance[skill]], color=['blue'])
            plt.xlabel("Skill Type")
            plt.ylabel("Performance (%)")
            plt.title(f"{skill} Performance")
            plt.ylim(0, 100)
            plt.savefig(img_path)  
            plt.close()
            img_paths[skill] = f"http://127.0.0.1:5002/static/reports/student_{student_id}_{skill}.png"

    # Generate overall performance bar chart
    overall_img_path = f"static/reports/student_{student_id}_Overall.png"
    plt.figure(figsize=(5, 4))
    plt.bar(["Overall"], [overall_score], color=['purple'])
    plt.xlabel("Performance")
    plt.ylabel("Score (%)")
    plt.title("Overall Performance")
    plt.ylim(0, 100)
    plt.savefig(overall_img_path)
    plt.close()
    img_paths["Overall"] = f"http://127.0.0.1:5002/static/reports/student_{student_id}_Overall.png"

    return jsonify({
        "message": "Report generated!",
        "student_id": student_id,
        "overall_score": overall_score,
        "performance": skill_performance.to_dict(),
        "image_urls": img_paths
    })

# Serve static images
@app.route("/static/reports/<filename>")
def get_report_image(filename):
    return send_file(f"static/reports/{filename}", mimetype="image/png")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
