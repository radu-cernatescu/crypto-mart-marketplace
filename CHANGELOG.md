# CHANGELOG

## Sprint 4

### PR #82 (Development of Sprint 4 starts at this PR)

* Fixed: Color palette across application.
* Added: New Title Animations in main and profile.
* Fixed: Recolored trash and logo images.

### PR #84

* implemented front-end shopping cart button as a placeholder
* created cart listing page
    * displays item with titles, desc, price, quantity, estimated arrival date and shipping details
    * displays subtotal, tax and grand total of all items

### PR #85

* Added: Style to cart page.
* Added: New navigation menu on profile page.

### PR #86

* Added: 4 routes for adding, removing, updating and fetching the shopping cart.
* Refactor: Item, Sell-edit component, to incorporate shipping options for seller.
* Refactor: Some other files, fix spelling mistakes.

## Sprint 3

### PR #76 (Development of Sprint 3 starts at this PR)

* Added: Get route to backend for item retrieval for the product page
* Added: Dields to Item class for color, size and parameters
* Added: Routing for the product view
* Fixed: Sell-edit component to allow adding of colors, size and parameters
* Added: product component

### PR #77

* Fixed: Refactor backend database query for updating an item
* Added: Comments
* Added: Fade animation for routerLinks
* Fixed: Item service
* Fixed: Clear button in sell-edit to allow clearing the full form
* Fixed: Allow deleting/updating of size, colour, parameters

### PR #78

* Fixed: HTML reworked to better single out individual elements.
* FIxed: CSS reworked to use relative values rather than static.
* Fixed: Typescript was changed to allow an overall application background.

### PR #79

* Allow to show the country which the user is located in for shipping purposes to be implemented in shopping cart later
* Refactor a bit
* Solve merge conflict in product front end template


## Sprint 2 

### PR #63 (Development of Sprint 2 starts at this PR)
* Added: PR comments in CHANGELOG.

### PR #64
* Fixed: Make development and main branches even, as there were some commits made that were merged directly into main.

### PR #65
* Added: user profile view
* Added: sell item form, where user can add a new item or update an existing one
* Added: view of items that have been posted
* Added: home page drop down, to access the profile page

### PR #66
* Added: Once user logs in, a token is placed in Session Storage. Since Session Storage is read-only, it is great for basic authentication. JWT will be used for auth later.
* Added: Profile route is protected from unauthenticated users and will redirect to sign in page.
* Added: Sign In & Sign Up buttons appear for unauthenticated users and the Manage dropdown will appear for authenticated users, allowing access to Profile and logging out.
* Added: Logging out simply clears Session Storage.

### PR #67
* Added: The main website page now displays all listings made by all users
* Fixed: The profile page displays a specific user's listings
* Added: The profile page allows for adding a new item/listing, modifying an existing one and deleting
* Added: Listing allows for a single image to be uploaded (for now), Imgur does the hosting for us for free

### PR #68
* Added: A GitHub actions workflow to deploy dev branch to a test application on Heroku; the endpoint API is broken; WIP!

### PR #70
* Added: allow multiple images to be uploaded
* Fixed: price issue

### PR #72
* Fixed: Overhaul of app background to match palette
* Changed: Header background color change
* Changed: Several style changes to market item lists
* Fixed: Position adjustments

### PR #73
* Added: comments from this sprint's PR into CHANGELOG.md
* Fixed: updating of item listing in backend
* Fixed: Did a bit of front end polishing

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
