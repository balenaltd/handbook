We now, almost exclusively, use [Github](http://github.com/resin-io) for all of our source control (at time of writing, there are still a few repos on [Bitbucket](https://bitbucket.org/rulemotion/), but we're trying to move away from it).

Issues are tracked via Github's built-in tracker, which can be referenced from commit messages.

# Commit Workflow

1. Create a new, appropriately named branch for your changes (eg. `git checkout -b make-cats-appear`)
2. Make your changes, following any appropriate [coding standards](http://codingstandards)
3. Write tests if appropriate, ensure tests pass
4. Update version numbers if required
4. Run the appropriate linter, if appropriate, on the code
5. Commit your code to the local branch. If the code fixes a raised issue, reference that issue in the commit (eg. `Cats are now correctly appearing when dogs are present, as mentioned in #17`, where `#17` is the issue number in Github for the component)
6. When satisfied that the code is in a suitable state to review, push your branch (eg. `git push origin make-cats-appear`)

If you're making several commits locally, for example you're working on several different issues before pushing, or you're making changes after several different review comments, ensure you squash the commits together before pushing. You can do this by first finding out how many new commits you've made locally:

    git log @{u}..HEAD --oneline | wc -l
        3

where `3` is the number of commits found, and then rebasing:

    git rebase -i HEAD~3

There are loads of tutorials for this on the web, here's [one](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html). Squashing prevents a potentially large amount of irrelevant commits showing up in Github, making it easier for both reviewers and the change author to track conversations.

From this point, the [review process]() takes over.

# Versioning

For any component with a `CHANGELOG.md` or `package.json`, you should increment the numbers based on the `semver` system.

Versions are of the form `major.minor.revision`, neither revision nor minor version bumps should break backwards compatibility.

When bumping a project's version number, do this in a specific bumping commit, tag it as vX.Y.Z, update all relevant files (e.g. package.json, bower.json, etc.), and additionally if you need to update any generated files or bump imported libraries, do it in this commit. **<- Is this still true?**

Updating generated files and libraries in this commit helps avoid unexpected and unnecessary conflicts between PRs at the same version number and makes it easy to quickly verify whether libraries/generated files may be different from expectation.