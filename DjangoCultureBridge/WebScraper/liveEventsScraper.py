from bs4 import BeautifulSoup
import requests
import json
import os

json_file_path = r"C:\Users\srisk\OneDrive - Technological University Dublin\Documents\YEAR 4 SEM 1\Final Year Project\Coding\Culture-Bridge\DjangoCultureBridge\DataFiles\liveEvents_data.json"

# Function to parse a single page
def parse_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BeautifulSoup(response.content, 'html.parser')
    else:
        print(f"Failed to retrieve content from {url}, status code: {response.status_code}")
        return None


def get_concerts(url, countryCode):
    events_parse = parse_page(url)
    extracted_events = []

    events = events_parse.find_all('li', attrs={'class': 'event-listings-element'})

    for event in events:
        title = event.find('p', attrs={'class': 'artists'})
        location = event.find('a', attrs={'class': 'venue-link'})
        event_date = event['title'] if event and 'title' in event.attrs else 'No date Confirmed'
        event_url = event.find('a', attrs={'class': 'event-link'})
        image = event.find('img', attrs={'class': 'artist-profile-image'})
        img_url = image['src'] if image and 'src' in image.attrs else 'No image'

        if title and location and event_date and event_url:
            event_info = {
                'title': title.text.strip() if title else 'No title',
                'location': location.text.strip() if location else 'No location',
                'date': event_date,
                'event_url': event_url['href'].strip() if event_url and 'href' in event_url.attrs else 'No URL',
                'image': img_url,
                'countryCode': countryCode  # Add countryCode here
            }
            extracted_events.append(event_info)
        else:
            print("Incomplete event details found.")

    # Call save_to_json_file after retrieving all data
    save_to_json_file(extracted_events, countryCode)
    return extracted_events

def save_to_json_file(new_data, country_code):
    existing_data = read_existing_data(json_file_path)
    if not is_duplicate(country_code, existing_data):
        with open(json_file_path, 'a') as file:
            for entry in new_data:
                # Create a copy of entry excluding 'url' and 'image_url'
                entry_to_save = {key: value for key, value in entry.items() if key not in ['event_url', 'image']}
                json.dump(entry_to_save, file)
                file.write('\n')

def read_existing_data(file_path):
    if not os.path.exists(file_path):
        return []
    with open(file_path, 'r') as file:
        return [json.loads(line) for line in file]

def is_duplicate(countryCode, existing_data):
    for existing_entry in existing_data:
        if existing_entry['countryCode'] == countryCode:
            return True
    return False