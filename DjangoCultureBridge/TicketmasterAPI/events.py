import requests

def get_live_events(api_key, countryCode, page=0, size=200):
    # Construct API request URL
    url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music"
    params = {
        "countryCode": countryCode,
        "apikey": api_key,
        "page": page,
        "size": size
    }

    try:
        # Make API request
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes

        # Parse and process API response data
        data = response.json()

        # Check if events data is available
        if "_embedded" in data and "events" in data["_embedded"]:
            events = data["_embedded"]["events"]

            # Extract event details including genre and URL
            event_details = []
            unique_event_names = set()  # To store unique event names
            for event in events:
                event_name = event.get("name", "Unknown")
                if event_name not in unique_event_names:
                    image_url = event["images"][0]["url"] if "images" in event and event["images"] else "Unknown"
                    classifications = event.get("classifications", [])
                    genre = "Unknown"
                    subgenre = "Unknown"
                    if classifications:
                        genre_data = classifications[0].get("genre")
                        subgenre_data = classifications[0].get("subGenre")
                        if genre_data:
                            genre = genre_data.get("name", "Unknown")
                        if subgenre_data:
                            subgenre = subgenre_data.get("name", "Unknown")
                    event_detail = {
                        "name": event_name,
                        "date": event["dates"]["start"]["localDate"],
                        "url": event.get("url", "Unknown"),
                        "genre": genre,
                        "subgenre": subgenre,
                        "image_url": image_url
                    }
                    event_details.append(event_detail)
                    unique_event_names.add(event_name)

            return event_details
        else:
            print("No events found.")
            return []
    except requests.exceptions.RequestException as e:
        # Handle errors
        print(f"Error fetching events: {e}")
        return []
