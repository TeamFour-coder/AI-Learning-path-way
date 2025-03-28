# Purpose: Analyzes student responses and calculates performance by category and difficulty level.
# command: python scripts/analyze_responses.py

import pandas as pd
import pickle
# Load the quiz dataset and trained model
quiz_data = pd.read_csv('data/preprocessed/aptitude_quiz.csv')
with open('trained_model/aptitude_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Example student answers (replace with actual student responses)
student_answers = ['A', 'C', 'B', 'D', 'A', 'E', 'C', 'B', 'D', 'A'] * 6  # Example: 60 answers

# Encode student answers for prediction (e.g., A -> 0, B -> 1, etc.)
student_answers_encoded = [ord(ans) - ord('A') for ans in student_answers]

# Predict correctness of student answers
correct_answers_encoded = quiz_data['CorrectAnswer'].map(lambda x: ord(x) - ord('A')).values[:len(student_answers)]
correctness = [1 if student_ans == correct_ans else 0 for student_ans, correct_ans in zip(student_answers_encoded, correct_answers_encoded)]

# Add correctness column to quiz data
quiz_data['StudentAnswer'] = student_answers[:len(quiz_data)]
quiz_data['Correctness'] = correctness

# Analyze performance by category and difficulty level
category_performance = quiz_data.groupby('Parameter')['Correctness'].mean() * 100
difficulty_performance = quiz_data.groupby('Difficulty')['Correctness'].mean() * 100

# Generate detailed report
report = {
    "Total Marks": sum(correctness),
    "Category Performance": category_performance.to_dict(),
    "Difficulty Performance": difficulty_performance.to_dict()
}

print("Detailed Report:")
print(report)
