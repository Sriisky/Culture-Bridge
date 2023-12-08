from bs4 import BeautifulSoup
import requests

# parse a single page
def parse_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BeautifulSoup(response.content, 'html.parser')
    else:
        print(f"Failed to retrieve content from {url}, status code: {response.status_code}")
        return None

# function to get courses
def get_courses():
    base_url = 'https://h-da.de'
    study_programs_URL = f'{base_url}/studium/studienangebot/studiengaenge'
    course_parse = parse_page(study_programs_URL)
    extracted_courses = []

    if course_parse:
        courses = course_parse.find_all('td', {'data-title': 'Studiengang', 'class': 'a1'})
        for course in courses:
            course_name = course.find('a')
            if course_name:
                course_title = course_name.get_text().strip()
                extracted_courses.append({'Course Name': course_title})
            else:
                print("No course name was found within the table cell.")
    else:
        print("Failed to parse the study programmes page url")

    return extracted_courses

# function to get events
def get_events():
    base_url = 'https://h-da.de'
    events_URL = f'{base_url}/veranstaltungsliste'
    events_parse = parse_page(events_URL)
    extracted_events = []

    if events_parse:
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
    else:
        print("Failed to parse the events page url")

    return extracted_events