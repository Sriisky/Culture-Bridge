# University web scraper
# Program to read in a url and scrape information from hochschule darmstadt website
# Sara Egan 13/11/2023

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


base_url = 'https://www.songkick.com/metro-areas/29037-croatia-zagreb?utf8=%E2%9C%93&filters%5BminDate%5D=04%2F11%2F2024&filters%5BmaxDate%5D=12%2F31%2F2024'
events_URL = f'{base_url}'
events_parse = parse_page(events_URL)

extracted_events = []

events = events_parse.find_all('li', attrs={'class': 'event-listings-element'})
#print(events)
for event in events:
    title = event.find('p', attrs={'class': 'artists'})
    location = event.find('a', attrs={'class': 'venue-link'})
    event_date = event['title'] if event and 'title' in event.attrs else 'No date Confirmed'
    event_url = event.find('a', attrs={'class': 'event-link'})
    image = event.find('img', attrs={'class': 'artist-profile-image'})
    img_url = image['src'] if image and 'src' in image.attrs else 'No image'

    # Extract the date from the title attribute of the li tag
    #event_date = date_li['title'] if date_li and 'title' in date_li.attrs else 'No date'

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

for event in extracted_events:
    print("Title:", event['title'])
    print("Location:", event['location'])
    print("Date:", event['date'])
    print("Img url:", event['image'])
    print("Event url:", event['event_url'])
    print()
    