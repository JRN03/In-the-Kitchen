# In The Kitchen

## Client

## Server

### Models

The models for data that is stored in our MongoDB are created here. That is, the information needed for relevant collections in our Database. For example, users will need a first name, last name, username, password, profile picture, and bio. Likewise, courts need to have a location, an associated name, the current rating, a unique Google Places ID, and the times people meet there.

### Routes

The routes folder is where all the re-routing takes place. This may be to the /auth page or the /courts page where the necessary handling of HTTP Requests go.

_Auth.js_

The auth route handles user logins and registration. Posts to /auth/register are for new users to create accounts. It checks if the username exists in the Database already and if not, it can create a new user in the database with the appropiate user info. We use bcrypt to encrypt passwords with salting and unique hashes.

The /auth/login checks for a valid username in the database, and if there is one, uses bcrypt to match the entered password to the encrypted one stored.

_courts.js_

The courts route is responsible for uploading new court information and fetching information on already uploaded courts. Currently, our working model for courts would not allow for filtering on regions or states but could be considered for future implementation.
