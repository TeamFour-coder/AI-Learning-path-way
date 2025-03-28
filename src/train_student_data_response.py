import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("data/raw/student_responses.csv")

# Encode categorical columns
label_enc = LabelEncoder()
df["Skill Type"] = label_enc.fit_transform(df["Skill Type"])  # Encode skill labels

# Save the label encoder for later use in Flask API
joblib.dump(label_enc, "models/skill_label_encoder.pkl")

# Feature selection
X = df[["Student ID"]]  # Using only Student ID for now
y = df["Skill Type"]  # Labels: Analytical, Logical, Calculation

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "models/student_performance_analyzer.pkl")

print("✅ Student response analyzer model trained and saved!")
print("✅ Skill label encoder saved as models/skill_label_encoder.pkl")



# Model Output (Prediction)

# It will predict the probability of correctness for each skill type.
# This can be used to generate overall student scores and skill-wise accuracy.
