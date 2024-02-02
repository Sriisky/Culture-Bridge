from bs4 import BeautifulSoup
import requests

# Configuration for course scraping
course_configs = {
    'url_tag': 'td',
    'url_attrs': {'data-title': 'Studiengang', 'class': 'a1'},
    'course_name_tag': 'a'
}

# Configuration for events scraping
events_config = {
    'url_tag': 'div',
    'url_attrs': {'class': 'teasertext'},
    'title_tag': 'h3',
    'description_tag': 'span',
    'description_attrs': {'itemprop': 'description'},
    'date_tag': 'ul',
    'date_attrs': {'class': 'infos list-unstyled'}
}

# parse a single page
def parse_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BeautifulSoup(response.content, 'html.parser')
    else:
        print(f"Failed to retrieve content from {url}, status code: {response.status_code}")
        return None

# function to get courses
def get_courses(url):
    course_parse = parse_page(url)
    extracted_courses = []

    if course_parse:
        courses = course_parse.find_all(course_configs['url_tag'], attrs=course_configs['url_attrs'])
        for course in courses:
            course_name = course.find(course_configs['course_name_tag'])
            if course_name:
                course_title = course_name.get_text().strip()
                extracted_courses.append({'Course Name': course_title})
            else:
                print("No course name was found within the table cell.")
    else:
        print("Failed to parse the study programmes page url")

    return extracted_courses

# function to get events
def get_events(url):
    events_parse = parse_page(url)
    extracted_events = []

    if events_parse:
        events = events_parse.find_all(events_config['url_tag'], attrs=events_config['url_attrs'])
        for event in events:
            title = event.find(events_config['title_tag'])
            description = event.find(events_config['description_tag'], attrs=events_config['description_attrs'])
            date = event.find(events_config['date_tag'], attrs=events_config['date_attrs'])

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
