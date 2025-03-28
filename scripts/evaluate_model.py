import pandas as pd
import pickle
from sklearn.metrics import mean_absolute_error

# Load test data and trained model
test_data = pd.read_csv("data/preprocessed/test_data.csv")

# Load trained model
with open("trained_model/student_performance_model.pkl", "rb") as f:
    model = pickle.load(f)

# Define features and target variable for testing
X_test = test_data[["Maths", "Science", "English", "Social_Studies", "Language"]]
y_test = test_data["Overall_Score"]

# Make predictions on test data
y_pred = model.predict(X_test)

# Evaluate model performance
mae = mean_absolute_error(y_test, y_pred)
print(f"Mean Absolute Error: {mae}")
