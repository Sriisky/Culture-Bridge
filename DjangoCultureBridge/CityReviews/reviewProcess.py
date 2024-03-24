# This file is responsible for saving and retrieving reviews from a JSON file

import json
import os

json_file_path = os.path.join(os.path.dirname(__file__), '..', 'DataFiles', 'reviews_data.json')

# Function to save reviews to a JSON file
def save_reviews(review_data, uniName):
    # Ensure the file exists and has an empty dictionary if new
    if not os.path.exists(json_file_path):
        with open(json_file_path, 'w') as file:
            json.dump({}, file)

    with open(json_file_path, 'r+') as file:
        try:
            data = json.load(file)  # Data is expected to be a dictionary
        except json.JSONDecodeError:
            data = {}  # Create an empty dictionary if the file is empty

        # Append the review to the list of reviews for the given uniName
        if uniName not in data:
            data[uniName] = []
        data[uniName].append(review_data)

        file.seek(0)  # Move the file pointer to the beginning of the file
        file.truncate()  # Clears the content of the file.ensures that when the updated data is written back, it replaces the old content rather than appending to it
        json.dump(data, file, indent=4)  # Write the updated dictionary back to the file, indent for readability

# Function to retrieve reviews from a JSON file
def get_reviews(uniName):
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r') as file:
            try:
                data = json.load(file)  # Data is a dictionary
            except json.JSONDecodeError:
                return []  # Return an empty list if the file is empty

            # Return reviews for the specific university
            return data.get(uniName, [])
    else:
        return []