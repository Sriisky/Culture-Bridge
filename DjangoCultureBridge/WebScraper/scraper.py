from bs4 import BeautifulSoup
import requests

# Configuration for course scraping
course_configs = {
    'url_tag': {'td', 'h2', 'div', 'span'},
    'url_attrs': [
        {'data-title': 'Studiengang', 'class': 'a1'},
        {'class': 'c-teaserbox-studycourse__headline'},
        {'class': 'col-md-4 study-block'},
        {'class': 'block m-3'},
        {'class': 'study-name'},
        {'class': 'attribute-title'},
        {'class': 'sitemap-row-item'},
        {'class': 'accord_head test'},
        {'itemprop': 'articleBody'}
    ],
    'course_name_tag': ['a', 'h2', 'li', 'p', ('span', 'study-unbold')],
}

# Configuration for events scraping
events_config = {
    'url_tags': ['div'],  
    'url_attrs_list': [
        {'class': 'teasertext'},
        {'class': 'class-event float-break'}
    ],
    'title_tags': ['h3'],
    'description_tags': ['span', 'label'],
    'description_attrs_list': [
        {'itemprop': 'description'},
        {'class': 'place'}
    ],
    'date_tags': ['ul', 'date'],
    'date_attrs_list': [
        {'class': 'infos', 'class': 'list-unstyled'},
        {'class': 'attribute-date'}
    ]
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
        for tag in course_configs['url_tag']:
            for attrs in course_configs['url_attrs']:
                courses = course_parse.find_all(tag, attrs=attrs)
                if courses:
                    for course in courses:
                        course_name_tag = course_configs['course_name_tag']
                        course_name = course.find(course_name_tag)
                        if course_name:
                            course_title = course_name.get_text().strip()
                            extracted_courses.append({'Course Name': course_title})
                        else:
                            print("No course name was found within the table cell.")
                    break  # Stop iterating if a match is found
        if not extracted_courses:
            print("No matching tag and attributes found on the page.")
    else:
        print("Failed to parse the study programmes page url")

    return extracted_courses

# function to get events
def get_events(url):
    events_parse = parse_page(url)
    extracted_events = []

    if events_parse:
        for i, tag in enumerate(events_config['url_tags']):
            attrs_list = events_config['url_attrs_list'][i]
            events = events_parse.find_all(tag, attrs=attrs_list)

            for event in events:
                title_tag = events_config['title_tags'][i]
                title = event.find(title_tag)
                description = event.find(events_config['description_tags'], attrs=events_config['description_attrs_list'][i])
                date = event.find(events_config['date_tags'], attrs=events_config['date_attrs_list'][i])

                if title and description and date:
                    event_info = {
                        'title': title.text.strip(),
                        'description': description.text.strip() if description else '',
                        'date': date.text.strip()
                    }
                    extracted_events.append(event_info)
                else:
                    print(f"Incomplete event details found for tag {tag} and attributes {attrs_list}")
    else:
        print("Failed to parse the events page url")

    return extracted_events