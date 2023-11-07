from bs4 import BeautifulSoup
import requests

study_programs_URL = 'https://h-da.de/en/studies/study-programmes'#URL to webscrape goes here
response = requests.get(study_programs_URL)

# Check if the request was successful
if response.status_code == 200:
    # Parse the content with BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find the elements containing course information
    # Replace 'course-element' with the actual class name or HTML tag you find
    courses = soup.find_all('td', {'data-title': 'Studiengang', 'class': 'a1'})

    # Extract and print course titles
    for course in courses:
        # Use 'course' not 'courses' to find the <a> tag within each element of the ResultSet
        course_name = course.find('a')
        if course_name:
            # Extract the text and strip whitespace from the course title
            course_title = course_name.get_text().strip()
            print(course_title)
else:
    print(f"Failed to retrieve content, status code: {response.status_code}")