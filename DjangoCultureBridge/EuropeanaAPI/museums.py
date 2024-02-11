import requests

API_KEY = 'blestredya'
API_URL = 'https://api.europeana.eu/record/v2/search.json'

def search_europeana(query):
    params = {
        'wskey': API_KEY,
        'query': query
    }

    try:
        response = requests.get(API_URL, params=params)
        response.raise_for_status()
        data = response.json()

        # Extracting relevant information from the response
        museums = []
        if 'items' in data:
            items = data['items']
            for item in items:
                title = item.get('title', '')
                location = item.get('location', '')
                thumbnail = item.get('edmPreview', '')
                museums.append({'title': title, 'location': location, 'thumbnail': thumbnail})

        return museums
    except requests.exceptions.RequestException as e:
        print('Error fetching data from Europeana API:', e)
        return None
