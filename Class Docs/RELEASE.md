# Release Plan – In the Kitchen

## Members

- Jonathan Nguyen – Product Owner / Developer
- Nick Barsi-Rhyne – Initial Scrum Master / Developer
- Royce Williams – Developer
- Caleb Intal – Developer
- Matthew Anderson – Developer

## Release 1.0.0 - 07/22/2023

For the initial relase, users will be able to create a personal profile to organize connections and activity such as friends and message feeds. There will be an interface to view nearby pickleball courts and the associated information (Directions to the court, ratings, meet times, etc.). Every user will have the ability to upload his/her own courts if they are not already in the database. Aside from the message feed, users will be able to contact one another with live messaging.

## User Stories

### Sprint 1

- [1] As a pickleball player, I want user-friendly interface and navigation (3 points)
- [2] As a pickleball player, I want information on nearby courts (8 points)
- [3] As a pickleball player, I want to have a personal profile (5 points)

### Sprint 2

- [4] As a pickleball player, I want to upload new information on my favorite courts (5 points)
- [5] As a pickleball player, I want to be able to leave reviews on courts (3 points)
- [6] As a pickleball player, I want to have friends on the app (8)

### Sprint 3

- [7] As a pickleball player, I want access to recent or ongoing events in my community (8 points)
- [8] As a pickleball player, I want to be able to message people I meet (8 points)

## Product Backlog

- [9] As an user, I would like an easier interface to remove images in posts
- [10] As a competitive player, I want information on upcoming tournaments in my area
- [11] As an advanced player, I want information on other players skill levels
- [12] As a friend of another user, I would like interactions with posts they make
- [13] As a user, I would like notifications for recent events involving me or my friends
- [14] As an user, I would like more customization for the interface themes

## Team Agreements

### Environment

Code should be run on Node.js version 17.x.x or higher. For IOS testing, use Expo and XCODE IOS simulator. The server should also be run locally. Any testing/debugging for the server that is not able to be done within a given condition of the app should be done in postman.

### Logistics

Scrum meetings and coordinating will start at 4pm from Monday-Friday in-person during Sprint 1. In the following two sprints, schedules are subject to change and meeting times will be moved to 9pm onward from Thursday-Saturday over Discord. Daily scrum should be completed within 15 minutes of the start. Scrum masters are responsible for leading meetings and updating any files/documents as necessary.

At the beginning of a Sprint, All code should be developed on the Dev branch or on a branch off of Dev. Towards the end of a Sprint, all code will be merged back into Dev, then merged into Prod. No code in Prod should change, which allows us to revisit a working version of our code if needed. Any code during development should be discussed before pushed or merged to Dev. The product owner is responsible for merging Dev into Prod. The tests are to be run on the test branch. Our final release should contain all necessary documents in the main branch.

### User Stories

- All tasks for the user story have been moved to the "Done" tab of the Scrum board

- Any relevant tests have been performed, documented, and passed

- Documentation for code implementation should be thorough and understandable from developers who did not work on the code

### Story Tasks

- All code contributing to the implementation of the feature should be pushed to the respective branch.

- Code must remove unecessary logs to the console that were used for debugging.

- Code should be viewed by at least one non-contributing teammate to determine clean-code and readibility.

- Usage and code structure should be reflected in the README.md

- Any necessary dependencies should be mentioned in the README.md

- All unit tests used should be modularized from the feature code and documented in the README.md

### Style Guides

Functions and variables should be named specifically and with respect to their responsibility. Any function or variable should serve a direct purpose without a large propagation of effects.

When naming functions, follow the pattern of the function use. For example, if a function is responsible for fetching the data for friends, it should be named as such: getDataForFriends(), getFriendsData(), getFriendsFromDatabase() ...

When using React hooks, comment their purpose since they can often be difficult to debug. Also note any dependency arrays of the hooks, events that may change values in a hook, and how this may change the render method of the app.

For styling, Avoid use of hardcoding dimensions unless absolutely necessary. We try to make the application as dynamic as possible which allows it to scale with screens of different sizes.
