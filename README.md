# In The Kitchen

<<<<<<< HEAD
=======
## Running the application

To run the client application, make sure to install the dependencies and run npm start. This open an environment for the application to be run. From here, choose a device to run the application on. For IOS simulators, follow the directions here: https://docs.expo.dev/workflow/ios-simulator/. For Android, follow the instructions here: https://docs.expo.dev/workflow/android-studio-emulator/. For the application to run correctly, the .env file must be configured. This information includes private keys and will not be disclosed. For permissions, contact any of the developers.

## Client
>>>>>>> test


## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

<<<<<<< HEAD
## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:
=======
import dark from assets/themes
(Note: The dark theme is not yet implented, but is open to discussion and currently placed on the PB)

import {PageStyles} from assets/Styles. PageStyles will provide a consistent container for the team to place UI/UX in for smooth transition between pages. 
>>>>>>> test

```
cd existing_repo
git remote add origin https://gitlab.com/the-chefs/in-the-kitchen.git
git branch -M main
git push -uf origin main
```

<<<<<<< HEAD
## Integrate with your tools
=======
When first installing the client side application, make sure to run npm i. This should install any necessary dependencies, but in the case it doesn't, refer to the commands below. 

- npm install
>>>>>>> test

- [ ] [Set up project integrations](https://gitlab.com/the-chefs/in-the-kitchen/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

<<<<<<< HEAD
***
=======
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
>>>>>>> test

# Editing this README

<<<<<<< HEAD
When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.
=======
When first installing the server side application to be run locally, make sure to run npm i. This should install any necessary dependencies, but in the case it doesn't, refer to the commands below.

- npm i mongoose
>>>>>>> test

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

<<<<<<< HEAD
## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.
=======
- npm i socket.io

### Running the Server

For development testing and local running of the server, run npm run merge in a terminal. This will start the server on localhost:8080. GET requests can be made in the browser by visiting the url http://localhost:8080 followed by any appropiate routing for testing purposes. Any other form of requests should be made in postman or another third-party app. However, the client side uses the environment variable EXPO_PUBLIC_ENDPOINT for requests. This must be changed to http://localhost:8080 if wanting to make requests to a local server. 
>>>>>>> test

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

<<<<<<< HEAD
For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.
=======
The models for data that is stored in our MongoDB are created here. That is, the information needed for relevant collections in our Database. For example, users will need a first name, last name, username, password, profile picture, and bio. Likewise, courts need to have a location, an associated name, the current rating, a unique Google Places ID, the times people meet there, and any uploaded images. We also have models for posts which include an array of images, the body of the post, and the username of the user uploading a post.

As of sprint 2, Models for user and court have been modified to store more information. The user stores friends, friend requests, and a path to his/her profile pic on the server. The courts now store an array of image paths to render on the client sides view park page as well as an array of ratings which the average is taken. 
>>>>>>> test

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

<<<<<<< HEAD
## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.
=======
The routes folder is where all the re-routing takes place. This may be to the auth,courts,posts,images,requests,users where the necessary handling of HTTP Requests go.
>>>>>>> test

## License
For open source projects, say how it is licensed.

<<<<<<< HEAD
## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
=======
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
>>>>>>> test
