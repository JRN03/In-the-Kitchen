# In The Kitchen

## Client

### Styles and Themes

The assets folder contains resources for styles and themes. The styles file exports objects for styling main and contentWrap components. Each new page should be wrapped by a View with style contentWrap and that view should be wrapped by a SafeAreaView with style main. This allows consistency throughout the app.

The colors can be accessed in assets/themes/... For now we only have a light theme, but this allows for easier implementation of a dark theme later on. The lights file has primary and second key names.

import light from assets/themes

import dark from assets/themes

import {PageStyles} from assets/Styles

### Dependencies

- npm install

- npx expo install react-native-maps

- npm install @react-navigation/native @react-navigation/native-stack

- npx expo install react-native-screens react-native-safe-area-context

- npm install react-navigation

- npm install react-native-gesture-handler

- sudo npx expo install expo-image-picker

## Server

### Dependencies

- npm i mongoose

- npm i dotenv

- npm i cors

- npm i bodyparser

- npm i express

- npm i bcryptjs

### Running the Server

For development testing, run _npm run devStart_ in a terminal. This will start the server on localhost:5000 since we have not yet deployed. GET requests can be made in the browser by visiting the url _http://localhost:5000_ followed by any appropiate routing for testing purposes. Any other form of requests should be made in postman or another third-party app.

For PUT/POST requests for users – fName, lName, username, and password are all required.
For PUT/POST requests for courts – name, location, Google Places ID, are all required.

### Models

The models for data that is stored in our MongoDB are created here. That is, the information needed for relevant collections in our Database. For example, users will need a first name, last name, username, password, profile picture, and bio. Likewise, courts need to have a location, an associated name, the current rating, a unique Google Places ID, and the times people meet there.

### Routes

The routes folder is where all the re-routing takes place. This may be to the /auth page or the /courts page where the necessary handling of HTTP Requests go.

_Auth.js_

The auth route handles user logins and registration. Posts to /auth/register are for new users to create accounts. It checks if the username exists in the Database already and if not, it can create a new user in the database with the appropiate user info. We use bcrypt to encrypt passwords with salting and unique hashes.

The /auth/login checks for a valid username in the database, and if there is one, uses bcrypt to match the entered password to the encrypted one stored.

_courts.js_

The courts route is responsible for uploading new court information and fetching information on already uploaded courts. Currently, our working model for courts would not allow for filtering on regions or states but could be considered for future implementation.
