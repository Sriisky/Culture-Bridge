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

# URLs for Hochschule Darmstadt Germany
base_url = 'https://h-da.de'
study_programs_URL = f'{base_url}/studium/studienangebot/studiengaenge'
events_URL = f'{base_url}/veranstaltungsliste'
course_parse = parse_page(study_programs_URL)
events_parse = parse_page(events_URL)

# dictionary to hold the information extracted
extracted_courses = []
extracted_events = []

if course_parse:
    # Find the elements containing course names
    courses = course_parse.find_all('td', {'data-title': 'Studiengang', 'class': 'a1'})

    # Extract and print course titles
    for course in courses:
        # Use course to find the <a> tag within each element of the ResultSet
        course_name = course.find('a')
        if course_name:
            # Extract the text and strip whitespace from the course title
            course_title = course_name.get_text().strip()
            # Dictionary to hold course names
            extr_courses = {'Course Name': course_title}

            # add courses to the list
            extracted_courses.append(extr_courses)
        else:
            print("No course name was found within the table cell.")
else:
    print("Failed to parse the study programmes page url")

for course in extracted_courses:
    print(course['Course Name'])


events = events_parse.find_all('div', attrs={'class': 'teasertext'})
for event in events:
    title = event.find('h3')
    description = event.find('span', attrs={'itemprop': 'description'})
    date = event.find('ul', attrs={'class': 'infos list-unstyled'})

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

