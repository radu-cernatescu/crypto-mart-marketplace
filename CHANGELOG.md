# CHANGELOG

## Sprint 2 

### PR #63 (Development of Sprint 2 starts at this PR)
*Include PR comments in CHANGELOG.

### PR #64
* Make development and main branches even, as there were some commits made that were merged directly into main.

### PR #65
* created user profile view
* created sell item form, where user can add a new item or update an existing one
* view items that have been posted
* added home page drop down, to access the profile page

### PR #66
* Once user logs in, a token is placed in Session Storage. Since Session Storage is read-only, it is great for basic authentication. JWT will be used for auth later.
* Profile route is protected from unauthenticated users and will redirect to sign in page.
* Sign In & Sign Up buttons appear for unauthenticated users and the Manage dropdown will appear for authenticated users, allowing access to Profile and logging out.
* Logging out simply clears Session Storage.

### PR #67
* The main website page now displays all listings made by all users
* The profile page displays a specific user's listings
* The profile page allows for adding a new item/listing, modifying an existing one and deleting
* Listing allows for a single image to be uploaded (for now), Imgur does the hosting for us for free

### PR #68
* Added a GitHub actions workflow to deploy dev branch to a test application on Heroku; the endpoint API is broken; WIP!

### PR #70
* allows multiple images to be uploaded
* fixed price issue

### PR #72
* Overhaul of app background to match palette
* Header background color change
* Several style changes to market item lists
* Position adjustments

### PR #73


## Sprint 1

### PR #53 (Development of Sprint 1 starts at this PR)
* Added: create main.yml in .github directory that will deploy the main branch to heroku

### PR #54
* Added: Initialize Angular project
* Added: Basic express setup to statically serve the index.html of Angular app.

### PR #55
* Added: angular routes for signup and signin
* Added: forms for signing in and signing up
* Added: Validate inputs in forms

### PR #58
* Changed: color palette.
* Added: new hover animations. 
* Fixed: layout spacing.
* Todo: Some layout spacing still needs work.

### PR #59
* Removed: A duplicate src folder was added on PR #55 which has now been removed.
* Changed: A navbar component that was created in the duplicate src has been moved to the original src folder.

### PR #60
* Added: Setup express & created two POST routes for signing in and singing up that are integrated with MongoDB.
* Added: Created a UserService that is the connection between the database and front end.

### PR #61
* Merge development branch into production (main) branch.

### PR #62
* Fixed: Backend was incorrectly done, as it was in a different folder, essentially as another npm app. This was refactored. The server script file is moved to the root directory.
* Added: The endpoint for production was added to the production environment variables, as the localhost cannot be used in prod.
* Fixed: Github Actions was also refactored as the backend was to be deployed separately. It has been reverted to how it was before.
