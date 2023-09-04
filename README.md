# In The Kitchen

## Running the application

To run the client application, make sure to install the dependencies and run npm start. This open an environment for the application to be run. From here, choose a device to run the application on. For IOS simulators, follow the directions here: https://docs.expo.dev/workflow/ios-simulator/. For Android, follow the instructions here: https://docs.expo.dev/workflow/android-studio-emulator/. For the application to run correctly, the .env file must be configured. This information includes private keys and will not be disclosed. For permissions, contact any of the developers.

## Client

When first installing the client side application, make sure to run npm i. This should install any necessary dependencies, but in the case it doesn't, refer to the commands below. 

- npm install
  
- npm install react-native-ratings

- npm i @expo-google-fonts/roboto-slab

- npm i @react-native-async-storage/async-storage

- npm i axios

- npm i react-native-google-places-autocomplete

- npm i react-native-select-dropdown

- npm i react-native-svg 

- npm i socket.io-client

### Friends && Home – Long Polling

Since the friend requests and home posts will be frequently updated, we use long polling to consistently update the status of friend requests with live feedback. We send in a request with setInterval and useEffect every 2 minutes for posts and 5 seconds for friends, however, this could be adjusted to shorter for even quicker feedback. We use long polling here since immediate results are not necessary. 

### Courts

There is a slight delay when visiting the courts page since it queries the server for a list of all courts. This is a slight tradeoff since our app only shows courts nearby a users current location or a location the user searched but allows for quicker results when changing relative locations. This may be altered down the line if deemed necessary.

### Messages

A lot of socket code is implemented in the messages page and children of the messages page. We conduct an initial fetch to the server for current friends but later transition to persistent connections with the react-native-socketio library. This allows live updates without long-polling, although socket.io does use long-polling for the initial connection before upgrading. 

## Server

When first installing the server side application to be run locally, make sure to run npm i. This should install any necessary dependencies, but in the case it doesn't, refer to the commands below.

- npm i mongoose
  
- npm i socket.io

### Running the Server

For development testing and local running of the server, run npm run merge in a terminal. This will start the server on localhost:8080. GET requests can be made in the browser by visiting the url http://localhost:8080 followed by any appropiate routing for testing purposes. Any other form of requests should be made in postman or another third-party app. However, the client side uses the environment variable EXPO_PUBLIC_ENDPOINT for requests. This must be changed to http://localhost:8080 if wanting to make requests to a local server. 

The models for data that is stored in our MongoDB are created here. That is, the information needed for relevant collections in our Database. For example, users will need a first name, last name, username, password, profile picture, and bio. Likewise, courts need to have a location, an associated name, the current rating, a unique Google Places ID, the times people meet there, and any uploaded images. We also have models for posts which include an array of images, the body of the post, and the username of the user uploading a post.

As of sprint 2, Models for user and court have been modified to store more information. The user stores friends, friend requests, and a path to his/her profile pic on the server. The courts now store an array of image paths to render on the client sides view park page as well as an array of ratings which the average is taken. 

The routes folder is where all the re-routing takes place. This may be to the auth,courts,posts,images,requests,users where the necessary handling of HTTP Requests go.

The auth route handles user logins and registration. Posts to /auth/register are for new users to create accounts. It checks if the username exists in the Database already and if not, it can create a new user in the database with the appropiate user info. The server uses JWT to create a token and send it over to the client. The client can then use this token to query the user route with authentication. We use bcrypt to encrypt passwords with salting and unique hashes.

The /auth/login checks for a valid username in the database, and if there is one, uses bcrypt to match the entered password to the encrypted one stored. This will also return a jsonwebtoken for the client side to use and make validated requests. 

/images servers as an endpoint for fetching or uploading relevant images. Any image requests for profile pictures at /images/user should be sent with a *token* header which checks if a user is yourself or a friend, otherwise, no image is supplied. 

/images/:path (where path is the image files path as noted in the database query) supplies the appropiate requested image. This route is primarily used to get images for posts or images for courts. No token is needed.

/requests handles the friend requests. In our database, we store models for friend requests which contain a sender, receiver, and status. The sender/receiver correspond to the user sending the request and the user the request is sent to. The status is one of three integer values, 1, 2, or 3, which relate to pending, accepted, or declined respectively. 

/posts/ is where the users query for posts and upload new posts. The GET to /posts will only return posts for users on a requesters friends list. A put will work unless the images provided are too large. 

_courts.js_

The courts route is responsible for uploading new court information and fetching information on already uploaded courts. Currently, our working model for courts would not allow for filtering on regions or states but could be considered for future implementation.

_user.js_

We have a GET and PUT method for the user route. PUT can update information such as friends, bio, and images. The GET would return information about a user such as the First Name, Last Name, Username, Friends, and Image. When queries are sent to the user route, the header for "token" should be specified where token should be attained upon login/register.

### Serving Images

Serving images from the database would be slow and taxing. Instead, it would be best to save the images onto the server and put the file name into the database with the respective users and posts. For now we would save each image as user_image-x.png where x is an incremented number. We handle the image uploads under the user route. We store the data as base64 data to the client which renders this as the URL. We also have an image route which can be used to server friends profile pictures granted correct validation, and images of the courts which don't need validation since it is public. 
