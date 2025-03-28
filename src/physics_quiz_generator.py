import pandas as pd
import random
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("data/raw/physics_aptitude_test_class10_100.csv")


# Encode categorical variables
df['Topic'] = df['Topic'].astype('category').cat.codes
df['Difficulty Level'] = df['Difficulty Level'].astype('category').cat.codes
df['Category'] = df['Category'].astype('category').cat.codes  # Fix: Use "Category" instead of "Skill Type"

# Features and labels
X = df[['Topic', 'Difficulty Level', 'Category']]
y = df.index  # Using question index as label for selection

# Train test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "models/physics_quiz_generator_model.pkl")
print("Model trained and saved!")

def generate_quiz(num_questions=50):
    """Generate a balanced quiz with 50 questions."""
    selected_questions = []
    topics = df['Topic'].unique()
    difficulties = df['Difficulty Level'].unique()
    
    for topic in topics:
        for difficulty in difficulties:
            subset = df[(df['Topic'] == topic) & (df['Difficulty Level'] == difficulty)]
            if not subset.empty:
                selected_questions.extend(subset.sample(min(len(subset), num_questions // (len(topics) * len(difficulties)))).index.tolist())
    
    # If fewer questions selected, add random ones
    while len(selected_questions) < num_questions:
        remaining = df.index.difference(selected_questions)
        selected_questions.append(random.choice(remaining))
    
    return df.loc[selected_questions]

# Generate a sample quiz
quiz = generate_quiz()
quiz.to_csv("data/output/physics_quiz.csv", index=False)
print("Quiz generated and saved!")
