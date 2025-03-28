import pandas as pd
from sklearn.model_selection import train_test_split
import os

# Create the 'data/preprocessed' directory if it doesn't exist
preprocessed_dir = 'data/preprocessed'
if not os.path.exists(preprocessed_dir):
    os.makedirs(preprocessed_dir, exist_ok=True)

# Load the students data
students_data = pd.read_csv('data/raw/students_data.csv')

# Example preprocessing steps
students_data['Normalized_Percentage'] = students_data['Percentage (%)'] / 100

# Split data into training and testing sets
train_data, test_data = train_test_split(students_data, test_size=0.2, random_state=42)

# Save preprocessed data
train_data.to_csv(os.path.join(preprocessed_dir, 'train_data.csv'), index=False)
test_data.to_csv(os.path.join(preprocessed_dir, 'test_data.csv'), index=False)

print('Preprocessed data saved successfully!')
