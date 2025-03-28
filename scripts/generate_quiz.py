# Purpose: Generates a quiz dataset by randomly selecting 20 questions from each raw dataset.
#command : python generate_quiz_dataset.py --raw_dataset_path /path/to/raw/dataset --output_path /
import pandas as pd

# Load datasets
physics_data = pd.read_csv('data/raw/Physics_Gravitation_QB.csv')
maths_data = pd.read_csv('data/raw/Maths_C-11_Sets and relation_QB.csv')
chemistry_data = pd.read_csv('data/raw/Chemistry_States of Matter_QB.csv')

# Randomly select 20 questions from each dataset
physics_questions = physics_data.sample(n=20, random_state=42)
maths_questions = maths_data.sample(n=20, random_state=42)
chemistry_questions = chemistry_data.sample(n=20, random_state=42)

# Combine all selected questions into one DataFrame
quiz_questions = pd.concat([physics_questions, maths_questions, chemistry_questions], ignore_index=True)

# Save the quiz dataset
quiz_questions.to_csv('data/preprocessed/aptitude_quiz.csv', index=False)

print("Aptitude Quiz with 60 questions has been created successfully!")


# command:python scripts/generate_quiz.py
