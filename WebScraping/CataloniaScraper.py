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
    
events_config = {
    'url_tag': {'div'},
    'url_attrs': [
        {'class': 'teasertext'},
        {'class': 'card__content p-6 text-left'}
    ],
    'title_tag': {'h3'},
    'description_tag': {'span', 'p'},
    'description_attrs': [
        {'itemprop': 'description'},
        {'class': 'card__description leading-relaxed text-sm lg:text-base hidden sm:block mt-2 mb-3'}
    ],
    'date_tag': {'ul', 'span'},
    'date_attrs': [
        {'class': 'infos list-unstyled'},
        {'class': 'card__date leading-relaxed text-xs lg:text-sm block'}
    ]
}

# URLs for Hochschule Darmstadt Germany
base_url = 'https://www.upc.edu'
study_programs_URL = f'{base_url}/ca/graus/'
events_URL = f'{base_url}/news'
course_parse = parse_page(study_programs_URL)
events_parse = parse_page(events_URL)

# dictionary to hold the information extracted
extracted_courses = []
extracted_events = []

if course_parse:
    # Find the elements containing course names
    courses = course_parse.find_all('span', attrs={'class': 'study-name'})

    # Extract and print course titles
    for course in courses:
        course_name_tag = course.find('span', class_='study-unbold')
        if course_name_tag:
            course_name = course_name_tag.get_text(strip=True)
            OuterTagInfo = course.get_text(strip=True)
            course_title = OuterTagInfo.replace(course_name, '').strip()

            if course_title:
                extr_courses = {'Course Name': course_title}
                extracted_courses.append(extr_courses)
            else:
                print("No course name was found within the table cell.")
        else:
            print("No course name tag was found.")

    # Print all extracted courses
    for course in extracted_courses:
        print(course['Course Name'])


'''
events = events_parse.find_all('div', attrs={'class': 'card__content p-6 text-left'})
print(events)
for event in events:
    title = event.find('h3')
    description = event.find('p', attrs={'class': 'card__description leading-relaxed text-sm lg:text-base hidden sm:block mt-2 mb-3'})
    date = event.find('span', attrs={'class': 'card__date leading-relaxed text-xs lg:text-sm block'})

    if title and description and date:
        event_info = {
            'title': title.text.strip(),
            'description': description.text.strip() if description else '',
            'date': date.text.strip()
        }
        extracted_events.append(event_info)
    else:
        print("Incomplete event details found.")

for event in extracted_events:
    print("Title:", event['title'])
    print("Description:", event['description'])
    print("Date:", event['date'])
    print()
'''