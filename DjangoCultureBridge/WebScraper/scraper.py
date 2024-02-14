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

    print(extracted_courses)
    return extracted_courses

# function to get events
def get_events(url, uniName):
    config = events_config.get(uniName)
    if not config:
        print(f"No configuration found for {uniName}")
        return []

    events_parse = parse_page(url)
    extracted_events = []

    if events_parse:
        for tag in config['url_tags']:
            for attrs in config.get('url_attrs_list', [{}]):
                events = events_parse.find_all(tag, attrs=attrs)

                for event in events:
                    event_info = {}
                    found_elements = 0

                    # Extract title
                    for title_tag in config.get('title_tags', []):
                        title = event.find(title_tag)
                        if title:
                            event_info['title'] = title.text.strip()
                            found_elements += 1
                            break

                    # Extract description
                    for desc_tag in config.get('description_tags', []):
                        description = event.find(desc_tag)
                        if description:
                            event_info['description'] = description.text.strip()
                            found_elements += 1
                            break

                    # Extract date
                    for date_tag in config.get('date_tags', []):
                        date = event.find(date_tag)
                        if date:
                            event_info['date'] = date.text.strip()
                            found_elements += 1
                            break

                    # Check if event should be added based on 'require_all_elements' flag
                    if (config['require_all_elements'] and found_elements == 3) or \
                       (not config['require_all_elements'] and found_elements > 0):
                        extracted_events.append(event_info)
                    else:
                        print(f"Incomplete event details found for tag {tag} and attributes {attrs}")
    else:
        print("Failed to parse the events page url")

    return extracted_events



# Configuration for course scraping
course_configs = {
    'url_tag': {'div', 'td', 'h2', 'span', 'li'},
    'url_attrs': [
        {'data-title': 'Studiengang', 'class': 'a1'},
        {'class': 'c-teaserbox-studycourse__headline'},
        {'class': 'col-md-4 study-block'},
        {'class': 'block m-3'},
        {'class': 'study-name'},
        {'class': 'attribute-title'},
        {'class': 'sitemap-row-item'},
        {'class': 'accord_head test'},
        {'itemprop': 'articleBody'},
        {'class': 'c-accordion__item'},
        {'class': 'mdh-infopage-card__info'},
        {'class': 'widg_teaser__col2'},
        {'class': 'accordion'},
    ],
    'course_name_tag': ['a', 'h3', 'h2', 'li', 'p', ('span', 'study-unbold'), 
                        ],
}

# Configuration for events scraping
events_config = {
    'HDA': {
    'require_all_elements': True,
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
    'date_tags': ['ul', 'date', 'span'],  # Adjusted to include 'span' if needed
    'date_attrs_list': [
        {'class': 'infos list-unstyled'},  # Corrected to combine class names
        {'class': 'attribute-date'}
    ]
    },
    'WINDESHEIM': {
        'require_all_elements': True,
        'url_tags': ['div'],  
        'url_attrs_list': [
            {'class': 'card__content p-6 text-left'},
        ],
        'title_tags': ['h3'],
        'title_attrs_list': [
            {'class': 'title leading-snug font-800 text-base md:text-lg mb-3'},
        ],
        'description_tags': ['p'],
        'description_attrs_list': [
            {'class': 'card__description leading-relaxed text-sm lg:text-base hidden sm:block mt-2 mb-3'},
        ],
        'date_tags': ['span'],
        'date_attrs_list': [
            {'class': 'card__date leading-relaxed text-xs lg:text-sm block'},
        ],
    },
    'OTH': {
        'require_all_elements': False,
        'url_tags': ['tr'],
        'title_tags': ['a'],
        'date_tags': ['td'],
        'date_attrs_list': [
            {'class': 'preview'},
        ],
    },
    'MDU': {
        'require_all_elements': True,
        'url_tags': ['li'],  
        'url_attrs_list': [
            {'class': 'sv-channel-item'},
        ],
        'title_tags': ['h2'],
        'title_attrs_list': [
            {'class': 'sv-font-sidfotrubrik'},
        ],
        'description_tags': ['span'],
        'description_attrs_list': [
            {'class': 'sv-font-listlankar'},
        ],
        'date_tags': ['time'],
        'date_attrs_list': [
            {'class': 'mdh-p-meta'},
        ],
    },
    'UIA': {
        'require_all_elements': False,
        'url_tags': ['div'],  
        'url_attrs_list': [
            {'class': 'content-view-line'},
        ],
        'title_tags': ['h3'],
        'description_tags': ['label'],
        'description_attrs_list': [
            {'class': 'attribute-type'},
        ],
        'date_tags': ['div'],
        'date_attrs_list': [
            {'class': 'attribute-date'},
        ],
    },
    'FH': {
        'require_all_elements': True,
        'url_tags': ['div'],  
        'url_attrs_list': [
            {'class': 'news-entry-listing__text'},
        ],
        'title_tags': ['div'],
        'title_attrs_list': [
            {'class': 'title'},
        ],
        'description_tags': ['div'],
        'description_attrs_list': [
            {'class': 'eztext-field'},
        ],
        'date_tags': ['div'],
        'date_attrs_list': [
            {'class': 'date'},
        ],
    },
        'RIT': {
        'require_all_elements': False,
        'url_tags': ['div'],  
        'url_attrs_list': [
            {'class': 'card-body px-0'},
        ],
        'title_tags': ['span'],
        'title_attrs_list': [
            {'class': 'field field--name-title field--type-string field--label-hidden'},
        ],
        'date_tags': ['p'],
        'date_attrs_list': [
            {'class': 'h5 date mb-0'},
        ],
    },
}