### Version Control
* Team members will work on feature branches until their story point is completed and ready to be merged into production (main branch)
* Merge conflicts will be solved using Visual Studio because it’s a beauty for merge conflicts; all team members will be notified of a conflict and we shall agree on a solution
* Code must meet acceptance criteria, tested on multiple browsers in order to open PR.
* To merge code into main, a pull request will be made and the reviewers are the other two team members, BOTH reviewers must accept the pull request
* Pushing directly to main is a crime

#### Merging

1. Clone/Pull repository.
2. Create a new branch from master for your feature/bug.
3. Commit & push to your branch until the feature is completed/tested.
4. Open a pull request and set the other two group members as asignees.
5. Once both group members agree to merge, the feature branch will be merged into master and the branch will be deleted.
6. If there is a merge conflict, depending on the complexity, team members will be contacted and we will discuss what changes to accept.

#### Deployment
A GitHub Actions workflow will be setup so that when code is merged into master branch, it will automatically run unit tests and deploy it to Heroku.
