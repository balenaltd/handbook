New projects usually consist of creating a new Github repository and ensuring that they contain the relevant components, depending on the type of project being built.

## Gihub Project

Creating a new project is extremely easy:

1. Go to https://github.com/new
2. Determine the owner, one of:
    * resin-io
    * resin-io-projects
    * resin-io-modules
    * resin-io-playground
    * resin-os

    It's usually fairly obvious which category the project will fall into. If in doubt, ask.
3. Give the project a relevant name
4. Give the project a relevant description
5. Determine whether it should be public (we're trying to go open source, so most things will be) or private (there are still some components that should be private)
6. Initialise the repo with a README
7. Add a `.gitignore` and a relevant LICENSE (`Apache2.0` though some projects are `MIT`) if you like
8. Hit 'Create repository'

## Initial Setup

Ensure that the repo contains any helper and utility files, some to consider are:

* `.gitignore` - To ensure only relevant files get committed to the repo
* `.editorconfig` - To ensure any editor that conforms to the http://editorconfig.org styles format the code correctly
* `README.md` - So users can instantly get up and running with the component
* `LICENSE` - So that rights are clearly ascertained
* `CHANGELOG.md` - Clearly marked changelog for each new version
* `.travis.yml` - A Travis CI config for ensuring that new PRs pass all tests
* `tests` - Test descriptions to ensure the component carries out its intended functionality

For the initial work and commit, have the `master` of the project stay empty. Do the work for the initial commit and then create a PR as you would for any other project. Go through the normal process specified in the [commit](https://github.com/resin-io/hq/wiki/Commit-Guidelines-&-Issues) and [PR](https://github.com/resin-io/hq/wiki/Pull-Request-and-Code-Review) guides. Call the branch something like `initial-work`.
