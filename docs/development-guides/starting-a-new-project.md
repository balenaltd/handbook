# Starting a new Project Guide
New projects usually consist of creating a new Github repository and ensuring that they contain the relevant components, depending on the type of project being built.

## Github Project

Creating a new project is extremely easy:

1. If the project you want to create is a component (a top level project instead of i.e. a module), this is something that should be raised in flowdock, with the relevant people being pinged. Often the request can be handled asynchronously, but in the cases that it needs more discussion, or a higher bandwidth of communcation it should be taken to a product call, or a call be scheduled with the relevant people out of band. For any more technical discussions about **how** the service should work, this should be [raised as an architecture item](../meetings/brainstorm-calls.md#brainstorm-types) to present the component's idea in an architecture call.

2. Go to https://github.com/new
3. Determine the owner, one of:
    * balena-io
    * balena-io-modules
    * balena-io-playground
    * balenalabs (formerly balena-io-projects)
    * balena-os

    It's usually fairly obvious which category the project will fall into. If in doubt, ask.
4. Give the project a relevant name
5. Give the project a relevant description
6. Determine whether it should be public (we're trying to go open source, so most things will be) or private (there are still some components that should be private)
7. Initialise the repo with a README
8. Add a `.gitignore` and a relevant LICENSE (`Apache2.0` though some projects are `MIT`) if you like
9. Hit 'Create repository'

## Initial Setup

Ensure that the repo contains any helper and utility files, some to consider are:

* `.gitignore` - To ensure only relevant files get committed to the repo
* `.editorconfig` - To ensure any editor that conforms to the http://editorconfig.org styles format the code correctly
* `README.md` - So users can instantly get up and running with the component
* `LICENSE` - So that rights are clearly ascertained
* `CHANGELOG.md` - Clearly marked changelog for each new version
* `.travis.yml` - A Travis CI config for ensuring that new PRs pass all tests
* `tests` - Test descriptions to ensure the component carries out its intended functionality

For the initial work and commit, have the `master` of the project stay empty. Do the work for the initial commit and then create a PR as you would for any other project. Go through the normal process specified in the [commit and PR](./commit-and-pr-guidelines.md) guides. Call the branch something like `initial-work`.