# Maintaining a Project in resin.io

The motivation of this guide is to list the basic housekeeping
tasks for resin.io projects and also define the responsibilities that their
maintainers have.

## The list of maintainers

An archived maintainers list can be found in [this spreadsheet](https://docs.google.com/spreadsheets/d/1IYEbIhzZQDYRg_Fz2ZdW-95Q1nYsq4YHM9qDLEp013c/edit#gid=0).

The maintainer's scope includes both the top-level components (listed above)
as well as any core resin.io dependencies that these components have.

Soon, the maintainers of a component may be defined in the component repo itself,
as part of a manifest file (e.g. `.procbots.yml`). One of the reasons to have
this metadata as part of the repo is that some processes carried out by bots
are/will be maintainer-specific (e.g. require approval by N maintainers for every PR)

## The maintainer's checklist

### VersionBot

Used for per-PR automatic versioning and changelog generation. Please refer to our process
doc on [how to setup VersionBot in your project](commit-and-pr-guidelines#versionbot)

### Analytics and Error Reporting

While in the past we've been using individual analytics and error reporting
libraries (e.g. mixpanel, sentry etc.), as we move forward we want to use a single,
consolidated library that will abstract all the different providers/services.

Analytics & error reporting should be configured for top-level and/or proprietary
components only and not for modules that can be used independently by users and the
OSS community. If unsure, feel free to ask in r/architecture.

When it comes to deciding which events/KPIs are important to track when you are
initially setting up analytics, you must preemptively reach out to the r/analytics team/flow
and seek advice there.

Last but not least, in order to setup a project for analytics one has to contact the operations
team in order to a) create the new project b) get access to the service (e.g.
mixpanel). After getting access, always ask for confirmation from the operations team before
adding either a new user/teammate or a new project yourself.

**TBD Blocker** Pending arch call on related spec & which library to use

### Architecture

As a maintainer, being responsible for the architecture of a component
encompasses the following:

- Expertise about its implementation details, quirks and rough edges.
- Having a clear view and vision for the architecture of the component and be
  able to premptively raise flags for things like blockers, hard-to-manage
  workload, general component health etc.
- As a maintainer you are not expected to write every single line of code, but you
  should be able to guide the dev process and give the final stamp of approval
  for every PR that gets into the codebase.
- Managing the component's roadmap and prioritize incoming feature requests: the overall
  resin.io platform organically evolves and is affected by overarching roadmap items & features
  (e.g. multicontainer, hostOS apps) Being a maintainer, you will participate in relevant
  discussions (architecture calls, specs etc.) where you should be able to contribute with ideas,
  bring up potential issues and orchestrate the ongoing tasks.

Last but not least, a key thing to remember is that the ultimate decisions for a
component's architecture, roadmap etc. lie within the architecture calls.

### Documentation

At the very minimum, every component must have a README.md file in the root
directory. Ideally, it should be written from the point of view of
1. a new engineer, who just joined resin.io or
2. a member of the OSS community, assuming the component is getting open sourced tomorrow

that want to quickly get a grasp of the following:

- The **purpose** and **high-level architecture principles** of the component.
- Its **API**. Good examples of API documentation can be found in the
  [balena-image-maker](https://github.com/balena-io/balena-img/blob/master/API.md) - private
  and [supervisor](https://github.com/balena-os/balena-supervisor/blob/master/docs/API.md) repositories.
- Development guidelines (e.g. special devenv setup instructions)
- Project-specific contribution guidelines. If none are given the default,
  [resin-wide guidelines](./commit-and-pr-guidelines.md) are implied.
- **Testing guidelines**
- **Build, release and deployment guidelines**: This is particularly important,
  because in the past we have had trouble tracking our different deployment
  workflows. For new projects, the build/release workflow should be discussed in r/architecture.
  A component can be released as a container, an npm/rust module deployed
  to some registry, a user-facing binary (e.g. Etcher) or one that is used as a
  dependency from other projects and the list goes on. At a minimum, the docs should mention:
  - [ ] What is the released artifact?
  - [ ] How is it produced?
  - [ ] Where and why is it used?

The suggested document structure is to have, in the project root directory:

- A README.md
- A docs/ folder for additional documents that should be accessible/linked from
  the main README.md file (like API.md, ARCHITECTURE.md, CONTRIBUTING.md etc.)

A few good examples of this documentation structure are:

- https://github.com/resin-io/etcher
- https://github.com/resin-io-modules/resin-procbots

### General Housekeeping

- [ ] Every project should have linting setup to work in two contexts:
  - Locally, during development. Developers should be able to lint their code while they
    are developing in their workstation (e.g. with `npm run lint`). In addition
    to that, pre-push git-hooks should be enabled to enforce checks (like
    linting and/or short smoke tests) before pushing to a remote branch. For
    node modules this can be achieved using [husky](https://github.com/typicode/husky) - please check the
    `resin-vpn` repo as an example of how to configure this.
  - Remotely, during PR review. Linting tests should run as part of a CI service (e.g. Jenkins, CircleCI) that will block
  merges of code that does not pass linting tets. Linting configuration must follow
  coding style guidelines that are consistent across our org, so if you don't find a relevant style guide for the
  language/framework you are using under [the process repo](https://github.com/people-os/process/tree/master/process)
  please create an issue (and ideally, a style suggestion process doc PR) there.
- [ ] Pull Request template: This should be added under `.github/PULL_REQUEST_TEMPLATE.md`. You
  can find the suggested template [here](#pull-request-template). The
  reason for using a template is:
  - Encourage code & review best practices
  - Act as a gentle reminder of the proper tags to use, when they apply
- [ ] Curating the open issue list. Maintainers should keep tabs on issues
  opened in their repo as well as HQ issues that are tagged with a label of a component
  they maintain.
  - **Just a quick note here**, this is still TBD and assuming that we have component-labelled
  HQ issues, the (very briefly summarised) alternatives considered are:
    - Copy these tickets over to the repo automatically using a process bot
    - Consider the HQ labelled issue as an extended issue list of the component and deal with them directly.


### Pull Request Template
``` md
<!-- You can remove tags that do not apply. -->
Change-Type: major|minor|patch <!-- The change type of this PR -->
Connects-To: # <!-- waffle convention to track a PR's status through its connected, open issue -->
HQ: <url> <!-- Refer to open HQ ticket or spec in resin-io/hq -->
See: <url> <!-- Refer to any external resource, like a PR, document or discussion -->
Depends-On: <url> <!-- This change depends on a PR to get merged/deployed first -->

---
##### Contributor checklist
<!-- For completed items, change [ ] to [x].  -->
- [ ] Build output been rebuilt and tested
- [ ] Introduces security considerations
- [ ] Tests are included
- [ ] Documentation is added or changed
- [ ] Affects the development, build or deployment processes of the component

##### Reviewer Guidelines
- When submitting a review, please pick:
  - '*Approve*' if this change would be acceptable in the codebase (even if there are minor or cosmetic tweaks that could be improved).
  - '*Request Changes*' if this change would not be acceptable in our codebase (e.g. bugs, changes that will make development harder in future, security/performance issues, etc).
  - '*Comment*' if you don't feel you have enough information to decide either way (e.g. if you have major questions, or you don't understand the context of the change sufficiently to fully review yourself, but want to make a comment)
---
```
