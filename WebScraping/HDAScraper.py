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
base_url = 'https://h-da.de/en/'
study_programs_URL = f'{base_url}/studies/study-programmes'
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
            extr_courses = {'courseName': course_title}

            # add courses to the list
            extracted_courses.append(extr_courses)
        else:
            print("No course name was found within the table cell.")
else:
    print("Failed to parse the study programmes page url")

print(extracted_courses)

if events_parse:
    # Find the elements containing event titles and descriptions
    events_title_elements = events_parse.find_all('div', {'class': 'teasertext col-8'})
    events_info_elements = events_parse.find_all('div', {'itemprop': 'description'})

    # Check if both titles and descriptions are found and have the same count
    if events_title_elements and events_info_elements and len(events_title_elements) == len(events_info_elements):

        # Extract event titles and descriptions
        for event_title, event_info in zip(events_title_elements, events_info_elements):
            # Use event to find the <a> tag within each title element
            event_name_tag = event_title.find('a')
            # Get the event info text
            event_info_text = event_info.get_text().strip()

            if event_name_tag and event_info_text:
                # Extract the text and strip whitespace from the event title
                event_title = event_name_tag.get_text().strip()
                # Dictionary to hold event title and information
                extr_events = {'title': event_title, 'info': event_info_text}

                # add courses to the list
                extracted_events.append(extr_events)
            else:
                print("Event name or info missing for an event")
else:
    print("Failed to parse the home page url")

print(extracted_events)