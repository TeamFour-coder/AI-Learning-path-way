import pickle

# Load trained model
with open("trained_model/student_performance_model.pkl", "rb") as f:
    model = pickle.load(f)

# Example input features for prediction
student_features = [[85, 90, 78, 88, 80]]  # Replace with actual student data

prediction = model.predict(student_features)
print("Predicted Overall Score:", prediction)
