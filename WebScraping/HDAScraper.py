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
events_URL = base_url
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


events = events_parse.find_all('div', class_='news calender')
for event in events:
    title = event.find('div', class_='teasertext col-9')
    description = event.find('div', itemprop_='description')
    day = event.find('span', class_='day')
    dayNumber = event.find('span', class_='dayNumber')
    month = event.find('span', class_='month')

    if title:
        extr_events = {'title': title, 'description': description, 'date': {day, dayNumber, month}}

        # add courses to the list
        extracted_events.append(extr_events)
    else:
        print("No course name was found within the div cell.")

print(extracted_events)

