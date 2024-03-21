import requests
import json
import os

# Define the relative path to the JSON file
json_file_path = os.path.join(os.path.dirname(__file__), '..', 'DataFiles', 'liveEvents_data.json')

def save_to_json_file(new_data, country_code):
    existing_data = read_existing_data(json_file_path)
    if not is_duplicate(country_code, existing_data):
        with open(json_file_path, 'a') as file:
            for entry in new_data:
                # Create a copy of entry excluding 'url' and 'image_url'
                entry_to_save = {key: value for key, value in entry.items() if key not in ['url', 'image_url']}
                json.dump(entry_to_save, file)
                file.write('\n')



def get_live_events(api_key, countryCode, page=0, size=200):
    # Construct API request URL
    url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music"
    params = {
        "countryCode": countryCode,
        "apikey": api_key,
        "page": page,
        "size": size
    }

    try:
        # Make API request
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes

        # Parse and process API response data
        data = response.json()

        # Check if events data is available
        if "_embedded" in data and "events" in data["_embedded"]:
            events = data["_embedded"]["events"]

            # Extract event details including genre and URL
            event_details = []
            unique_event_names = set()  # To store unique event names
            for event in events:
                event_name = event.get("name", "Unknown")
                if event_name not in unique_event_names:
                    image_url = event["images"][0]["url"] if "images" in event and event["images"] else "Unknown"
                    classifications = event.get("classifications", [])
                    genre = "Unknown"
                    subgenre = "Unknown"
                    if classifications:
                        genre_data = classifications[0].get("genre")
                        subgenre_data = classifications[0].get("subGenre")
                        if genre_data:
                            genre = genre_data.get("name", "Unknown")
                        if subgenre_data:
                            subgenre = subgenre_data.get("name", "Unknown")
                    event_detail = {
                        "name": event_name,
                        "date": event["dates"]["start"]["localDate"],
                        "url": event.get("url", "Unknown"),
                        "genre": genre,
                        "subgenre": subgenre,
                        "image_url": image_url
                    }
                    event_detail["countryCode"] = countryCode  # Add countryCode to each event detail
                    event_details.append(event_detail)
                    unique_event_names.add(event_name)
            
            # Call save_to_json_file after retrieving all data
            save_to_json_file(event_details, countryCode)
            
            return event_details
        else:
            print("No events found.")
            return []
    except requests.exceptions.RequestException as e:
        # Handle errors
        print(f"Error fetching events: {e}")
        return []
    

def read_existing_data(file_path):
    if not os.path.exists(file_path):
        return []
    with open(file_path, 'r') as file:
        return [json.loads(line) for line in file]

def is_duplicate(country_code, existing_data):
    for existing_event in existing_data:
        if existing_event['countryCode'] == country_code:
            return True
    return False

