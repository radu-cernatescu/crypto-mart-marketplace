# CHANGELOG

## Sprint 5

### PR #93

* Created a place holder where the user can see their past purchases
* When the user clicks buy now button on product profile page, the item gets added to the orders section
* When the user clicks checkout button at shopping cart, the items get added to orders section and the cart is emptied
* Orders component displays the item's title, desc, price, sold by and purchase date

### PR #94

Product pages:
- Resized and repositioned buttons and a few elements
- Reworked "popup" divs:
   - Hidden by default in the middle of the user's page.
   - Typescript implementation to switch popup visibility.
   - Each top button takes the user to its mentioned page respectively.
   - "HOMEPAGE" buttons route to the main (HOME)
   - "CONTINUE" simply hides the popup allowing the user to resume shopping.

Cart:
- Checkout button can no longer be clicked when the cart is empty (grand total < $1)
- Checkout prices do not adjust if user places in decimal value inside the "Quantity" number input type.
- Created checkout popup for user confirmation:
   - The "CONFIRM" button will process the order and list it on the "ORDERS" page (also clears out cart)
   - The "CANCEL" button simply hides the popup to allow the user to make adjustments to their order.

Orders:
- Reworked styling:
   - Category titles are implemented.
   - Fitted elements better onto page.
- Implemented Payment Summary.

## PR #95

- prevent user from adding to cart & buying now if not logged in, directs to sign in page
- remove orders button from nav, add it to My Market page
- deauth blocked users immediately when they are banned with a ban message set by admin
- prevent blocked users from logging in
- Included Mailchimp API implementation which does not work. The free trial of the Mailchimp/Mandrill API only allows sending e-mails to the same domain (i.e. sending from radu@triaz.dev to test@triaz.dev but I don't have a mail server setup lol) and it took me a while to implement (and realize this undocumented limitation).
- include My Inbox to see notifications about deleted postings and reasons


### Reading Week Catchup

### PR #90 (Development of this quasi sprint starts at this PR)

* Added changes from commit 3150df5 since an old branch name was reused which led to changes on an older iteration of the platform.
    From closed PR #88:
    * Implemented admin account creation
    * Created a drop down listing for admin panel
    * Allowed admin to view all current users and their listings upon clicking the user
    * Allowed admin to delete or block/unblock a user or delete any listing
    * Changes are reflected on home page

* Refactor User type to include blocked status and user type (regular or admin).
* Refactor sign up process to allow invite codes. Invite codes fetched from the backend and correct ones create admin accounts.

### PR #91

* Edited: HTML structures of admin components
* Added: CSS styling to admin components
* Fixed: HTML structures of profile component
    - added new div around the "app-sell-edit" for better placement on page.
* Added: CSS styling to the profile component
    - added spacing and sizing to the new implemented div
* Changed "Profile" option in account settings to "My Market" due to all settings being related to a user's personal market.

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
