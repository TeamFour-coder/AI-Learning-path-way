# Purpose: Trains a model using the quiz dataset and correct answers.
# Command to Run:
# python scripts/train_model.py

from sklearn.tree import DecisionTreeClassifier
import pandas as pd
import pickle

# Load the quiz dataset with correct answers
quiz_data = pd.read_csv('data/preprocessed/aptitude_quiz.csv')

# Prepare features and target variable (CorrectAnswer)
X = quiz_data[['Option1', 'Option2', 'Option3', 'Option4', 'Option5']]
y = quiz_data['CorrectAnswer']

# Encode target variable (e.g., A -> 0, B -> 1, etc.)
y_encoded = y.map({'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4})

# Train a Decision Tree Classifier
model = DecisionTreeClassifier()
model.fit(X.index.values.reshape(-1, 1), y_encoded)

# Save the trained model
with open('trained_model/aptitude_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model has been trained successfully!")