# Culture Bridge – A website application to help TU Dublin students with the decision making process for Erasmus
## Final year project

This project is a website application to help encourage more students to take part in Erasmus. This will be achieved through giving users information on different cities that take part in the Erasmus programme. There are huge benefits to studying abroad and this app will highlight these to helps users explore the advantages of Erasmus along with the experience you can gain from studying in a new culture. Each city has information relating to the university of that city, music, live events, art, and reviews from past students. This information is gathered through web scrapers and APIs. There is also a recommender element to help students find locations that match them best.

### When running the project for the first time please follow these steps:
Install the following
- npm install react-router-dom 
- npm install axios
- npm install lodash
- pip install djangorestframework
- pip install django-cors-headers
- pip install python-dotenv 
- pip install requests_oauthlib
- pip install spotipy 
- pip install --upgrade google-cloud-translate
- pip install coverage
- pip install pytest

To start the React app, navigate into the same directory as the App.js file located in culture-bridge/src and run - **npm start**

To start the Django project navigate into the backend DjangoCultureBridge folder and run - **python manage.py runserver**

### Brief Explanation of key files:
#### Frontend
- Each city has its own page for displaying its unique content and for making calls to the relevent APIs and scrapers for that city. These are the CITYNAMEContent.js files. The majority of CSS for these files is completed it DarmstadtContent.css, but each city has its own css file in case of unique required alterations.
- The files Cities.js, CityData.js, CityDetails are each used in conjunction to present the cities as cards with the required information and route for each city.
- MapComponent.js uses 'Maps JavaScript API' from Google Cloud to render a map for each city.
- Destinations.js, DestinationData.js are used together to provide the information for the highlighted cities and the component to display them.
- Hero.js is the picture display at the top of each web page. Provides a nice uniform and consistent design to the web app.
- MenuItems.js, NavBar.js contain the routes and design for the navbar elements.
- The Routes folder contains each page of the website with the required elements needed to display content.
- App.js contains the main rendering of the web app. Specifies the paths and components to render.

#### Backend
- Each piece of functionality has their own directory. CityReviews is used to handle adding and retrieving reviews for each city.
- DataFiles contains the JSON files that each API and scraper adds retrieved information to.
- DjangoCultureBridge contains the settings and urls of the backend
- EuropeanaAPI, SpotifyAPI, and TicketmasterAPI are responsible for gathering content from their websites using relevant country/ city codes.
- RecommenderSystem contains the programs used to determine recommendations to the user based on their interests. It also has a tests folder that contains test scripts for the recommender functions.
- WebScraper contains a scraper for the university information, and another for cities that need their events gathered through SongKick instead of Ticketmaster. This directory also contains the translator script for translating courses.

### Sources used for icons and images:
- Icons are sourced from [fontawsome.com](https://fontawesome.com/)
- All images are sourced from either [pexels.com](https://www.pexels.com/) or [pixabay.com](https://pixabay.com/)