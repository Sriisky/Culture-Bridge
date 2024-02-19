from bs4 import BeautifulSoup
import requests

# Function to parse a single page
def parse_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BeautifulSoup(response.content, 'html.parser')
    else:
        print(f"Failed to retrieve content from {url}, status code: {response.status_code}")
        return None


def get_concerts(url):
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
                'image': img_url
            }
            extracted_events.append(event_info)
        else:
            print("Incomplete event details found.")

    print(extracted_events)
    return extracted_events
    