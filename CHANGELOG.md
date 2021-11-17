# CHANGELOG

### PR #53 (Development starts at this PR)
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
