# Commit and PR Guidelines

In this document we will describe the guidelines that must be followed when
contributing code to the balena.io platform. Our source control is exclusively
hosted on [Github](http://github.com) in five organisations:

* [balena-io](http://github.com/balena-io)
* [balena-io-modules](http://github.com/balena-io-modules)
* [balena-os](http://github.com/balena-os)
* [balena-io-projects](http://github.com/balena-io-projects)
* [balena-io-playground](http://github.com/balena-io-playground)


## Initialising a Repository

When starting a new project, you'll need to create a new repository in an
appropriate balena organisation:

* Make sure to create it in the appropriate organisation. The following is a
  brief guide to each organisation and the type of project they house.
    * [balena-io](https://github.com/balena-io) - Main product components,
      including private code. For example, balenaCloud components, balena SDK,
      balena CLI, Etcher
    * [balena-io-modules](https://github.com/balena-io-modules) - Module and
      small libraries for use by other projects (such as `balena-io`
      components). For example, Rendition, Livepush, `balena-lint`, drivelist.
    * [balena-os](https://github.com/balena-os/) - All things related to
      balenaOS including the BSPs. For example, `meta-balena`,
      `meta-raspberrypi` and `balena-engine`.
    * [balena-io-projects](https://github.com/balena-io-projects/) - balena
      created projects, such as the hardware hacker projects (balenaDash,
      balenaSound, etc.), and other projects that aren't part of mainline
      products (eg. the Support Masterclasses). Repositories should be actively
      maintained.
    * [balena-io-playground](https://github.com/balena-io-playground/) -
      Fun/example projects, tech demos, as well as initial prototyping of stuff
      that may, or may not, eventually become 'official' balena products or
      maintained projects.
* Ensure the repository has an appropriate name and description.
* Repositories should be a bare-minimum when created.
* Create an initial PR (see below) when ready to check in first code/files, so
  they can be reviewed. *Never* commit code/files to `master` without review
  (unless this is a `balena-io-playground` repository, which is used for hack
  Fridays, etc).
  Your initial PR should include:
  * A `CHANGELOG` file with your initial PR so it can be versioned.

## VersionBot
VersionBot will attempt to carry out certain actions depending upon the type of
repository. Currently VersionBot understands the following type of projects
based upon the files within it:

* NodeJS - If a `package.json` file is included VersionBot will increment the
  `version` field in the package file appropriately upon merges to `master`, as
  well as attempt to publish the package on
  [NPM](https://www.npmjs.com/) unless a `private: true` property key/value pair
  is included in the package file.
* Rust - If a `Cargo.toml` file is included is included then VersionBot will
  increment the `version` property in the cargo file appropriately upon merged
  to `master`, as well as attempt to publish the package on
  [crates.io](https://crates.io/) unless a `publish: false` property key/value
  pair is included in the cargo file.
* Docker - VersionBot will record the version in a VERSION file in the root of
  the repository. It will attempt to store the image that comes from the PR in
  the docker registry and tag it with a combination of branch name and SHA. Once
  the PR is merged VersionBot will update the tag to master (and will also tag
  it as latest and with the version that was just built). This behaviour can be
  customised by modifying .balenaci.yml (see below).

Other supported types can be found
[here](https://github.com/product-os/balena-versionist/tree/master/lib/repo-type-mappings).

A `.balenaci.yml` file can be used to specify the type of the project manually.
This is useful in the case of Docker images, where they need to be published on
merging to `master`. For example, the API's `.balenaci.yml` file consists of the
following:
```
---
npm:
  platforms: []

docker:
  builds:
    - path: .
      dockerfile: Dockerfile
      docker_repo: balena/open-balena-api
      publish: true
```
A `repo.yml` file can also be used to manually override the type of the project,
or to specify other data (such as upstream components). Again, here is the
`repo.yml` for the API:
```
type: 'docker'
reviewers: 1
upstream:
  - repo: 'open-balena-base'
    url: 'https://github.com/balena-io/open-balena-base'
```
Full details on VersionBot including balena Concourse can be found
[here](https://github.com/product-os/balena-concourse).

Finally, you should ensure that both the `balena-dev` and `balena-non-dev` groups
are included as collaborators with `Write` access. You should also remove
yourself as an admin once the repository has been created.

## Commit Guidelines

1. Create a new, appropriately named branch for your changes, trying to make the
  branch name short, but sensical (e.g. `git checkout -b make-cats-appear`).
  New branches should exist **on the same component**. Do not carry out
  work on, for example, your own personal fork of a component. **Always**
  create a new branch on the same component repository for PRs that are to be
  merged to that component repository. This ensures we do not end up in a
  situation where work does not get completed, or if someone leaves we are
  beholden to their forked branch.
2. Make your changes, following any appropriate coding standards (as an example,
  the
  [TypeScript](./typescript-coding-guide.md)
  one).
3. Commit your code to the local branch and feel free to push code as you go to
   the remote repository so that you can save your progress.
4. When satisfied that the code is in a suitable state to review, create a PR
   for the branch you were working on. If you have multiple commits before
   creating the PR, rebase these to the bare minimum (see below).

When creating a commit, adhere to the appropriate rules. These can be found
[here](https://github.com/balena-io-modules/node-balena-lint), but
in general:
* Use the imperative, present tense in the commit subject [[1]](#1-structure-of-a-commit-message).
* Include **at least one commit** in your PR that marks the change-type. This can be either specified through a `Change-type` footer, or by adding the change-type as a prefix to the commit, i.e. `minor: Add some new feature`. This is so the PR can be automatically versioned and a changelog generated for it by using [versionist](https://github.com/product-os/versionist). Check out [semver](https://semver.org/) for a detailed explanation of the different possible change-type values.
* Include any additional git commit footers
  [[1]](#1-structure-of-a-commit-message). git commit footers are
  *case sensitive*
  * **`Change-type`** git commit footer.
    This footer can be any of the following:
      * `Change-type: patch`
      * `Change-type: minor`
      * `Change-type: major`

    You have the flexibility to use this tag in as many commits as you see fit;
    in the end, the resulting change type for the scope of the PR will be folded
    down to the biggest one as marked in the commits (`major`>`minor`>`patch`).

    Commits marked with the `Change-type` tag will have their subject added as
    an entry in the generated CHANGELOG.md. If you want to override this default
    behavior and add your own changelog entry instead, you can use the optional
    `Changelog-Entry: <custom changelog entry>` tag in `Change-type`-tagged commits.
  * **`Signed-off-by`** git commit footer.
    By signing off a commit, a developer certifies the statements of the
    [Developer Certificate of Origin](https://developercertificate.org/).
    You never need to add this footer, but if you choose to, use your full name
    and `@balena.io` email address. This can be achieved with the `-s` switch of
    `git commit`.
    
    `Signed-off-by: Foo Bar <foobar@balena.io>`
    
    If you are using VSCode you can set `Git: Always Sign Off` to make this more convenient.
  * `Connects-to: #<issue number>` git commit footer.
    This optional footer allows a commit to be connected to a pre-existing issue
    in the repository the commit is destined for. An issue number is not always
    required, but if the functionality/patch is directly addressing an issue
    that has been raised, it **must** be included. Should an issue be included,
    **do not** use the `Closes`, `Resolves` or any other keyword that will
    automatically close the issue **unless** the merging of the PR to the
    `master` branch automatically deploys the component into a Production
    environment or there are other mitigating factors (for example the
    Supervisor doesn't always get updated for an OS release, so whilst an issue
    is closed it might not be released for a while). However, in general we rely
    on the closing of issues in support to mean 'This issue has been fixed in
    Production and customers will see it'.

Note that multiple commits per PR are acceptable, if these commits are required
to address the functionality/issue and it makes sense to break them into
more than one commit. However, *do not* use multiple commits to get a series
of patches or functionality into a single PR. Each individual piece of
functionality should be contained in its own PR, and each commit within that PR
should ideally be self-contained added functionality. This allows us to easily
audit versions of a component, as well as removing specific
functionality/patches should an issue arise because of it.

## Pull Request Guidelines

Pull Requests (PRs) are made on component repositories when new functionality/
patches to a component need to be merged. PRs are most commonly merged to
the `master` branch, which is then used as the latest version of a component.
However, there are cases where PRs are occasionally merged to other branches,
for work in progress, or for alternate versioning.

GitHub has generic documentation on how to create a pull request:
https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request
**Do not fork the repository.** Instead, `git push` your branch directly to the
repository you are creating a PR for.

1. Choose a PR title (the first line of the commit message is a good choice for
   single-commit PRs) and add a short description. If the PR is addressing an
   existing GitHub issue, link the PR to the issue by adding a `Connects-to:`
   or `Resolves: #<issue number>` footer to the PR description (check the
   description of `Connects-to` in the Commit Guidelines above).
2. Decide whether to create a draft PR or regular PR, though you can also switch
   between the two types after the PR is created. Regular PRs are "ready for
   review," while draft PRs are normally not. Both types will cause balena CI to
   to run tests and create draft npm releases (depending on the repository type).
   A regular PR is automatically merged by balena CI as soon as a reviewer
   approves it and the CI tests pass (in any order). The goal is that "approval
   equals merge, and merge equals deploy" through balena CI automation. This
   places a heavy weight on PR review and approval, with the flip side that you
   should normally only invite reviews if the PR is ready to be merged and
   deployed. Draft PRs cannot be approved by reviewers, and thus cannot be merged
   or deployed. Draft PRs may be used to iterate code changes against CI tests
   until they pass, before inviting reviews. Draft PRs are also used when the
   developer is unsure about the proposed changes and/or would like to invite
   early feedback from reviewers before converting it to a regular PR that can be
   merged and deployed. Some private repositories may not have the option of
   creating a draft PR (because of the GitHub plan type). In these cases, draft
   PRs can be emulated by creating a regular PR and adding the `versionbot/pr-draft`
   [label](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#applying-labels-to-issues-and-pull-requests).
   A regular PR with this label is treated as a draft PR for all purposes.
3. Please pick additional reviewers, by selecting small gear icon next to the 
  `Reviewers` section in the right-hand panel of the PR, and select as many reviewers
   as you require. There are no rules with regards to the number of reviewers, 
   but a good general guide is that substantial changes will need at least two
   or three, but no more than five. These should include the maintainer(s) of a
   component as well as people who have worked on it (typically have sent PRs in the past).
4. Not all PRs require someone else's review, though. If you are confident that
   your changes are correct and uncontroversial, you can approve a non-draft PR
   yourself by adding the comment: `@balena-ci I self-certify!` The PR will then
   be automatically merged as soon as the CI tests/checks have passed. Self
   certification is **not** reserved for exceptional circumstances; it is meant
   to be a regular occurrence. All it takes is confidence that a review is not
   required because it would consist of needless rubber stamping. It was
   introduced to reduce unnecessary development friction.
5. Checks will be carried out by any installed Github App, and the statuses for the
   PR will be updated. VersionBot will ensure that at least one commit has the
   `Change-type:` tag. Should it not, then it will fail the PR. Other checks
   will also be carried out by the rest of the balenaCI systems, based on
   component type (NodeJS/Rust/Docker image/etc.).
6. Reviewers will comment on the code. Respond to each comment individually,
  as opposed to responding to all comments in one big comment. Do **not** ignore
  comments or requests for changes, even if another reviewer has approved the
  PR. All comments and change requests should be addressed, ether by making the
  relevant changes or ensuring the commentor knows why the change requested/
  commented on is invalid.
7. If the `master` branch is updated by another PR before this PR is merged,
  it will require rebasing. This can be achieved by adding a PR comment:
  `@balena-ci rebase` so that balena CI does the rebase for you. Don't use
  GitHub's Update Branch button as it uses a git merge instead of rebase.
  The rebase can also be done manually with the following steps in your local
  copy of the repository:
      1. `git checkout master`
      2. `git pull`
      3. `git checkout 12-PR-branch`
      4. `git rebase master`

    At this point `git rebase` will prompt you to resolve any conflicts.
    The reason behind using rebase is that it makes for tidier git branching
    history. Push the rebased PR branch to the remote
    (e.g. `git push --force-with-lease origin 12-PR-branch`).

    **Note:** If for some reason it looks like the checks and tests for the PR
    have failed, comment on the PR with `@balena-ci retest`. This should force
    balenaCI to retry all the tests again.
8. When a regular (non-draft) PR receives reviewer approval and all status checks
  have passed, balena CI will merge the PR to `master` and delete the PR
  branch. VersionBot will now take over and automatically version up your
  component, and tag it with the new version, along with:
    * Updating the `package.json` `version` field of the component (or other
      appropriate language specific version).
    * Populate the `CHANGELOG.md` with changelog entries based on the commits
      for the PR and with the new version.
    * Tag `master` with the new version (the tag is based on the merge commit).
9. After merging, the PR will be closed but any attached issue will remain
  open. For attached PR issues, ensure that these are closed **only** when the
  changes merged to `master` have been deployed to the Production environment.
  This ensures support agents can inform customers only when these fixes/
  additional functionality is available for use.

An important thing to remember about our current deployment process is that
keeping the PR statuses updated is vital in helping the devops team understand
the current status of each component and know what is being deployed to
production.

### Pull Request Dependencies for Multi-Component Features

balena.io backend is composed of a number of services that often need
coordinated deploys in order to deliver features. The current
convention is to refrain from merging a PR until its dependency is
merged/deployed first.

We suggest using `depends-on: <otherPR>` tag/metadata in the description of a
PR that depends on the PR of another component being deployed in Production
first. This is to a) aid code review b) reduce the possibility of a component
being deployed without its dependencies being already up and running.

Noting that this is only a temporary process that will soon be superseded by
keyframes and eventually contracts.

### Sample PR

#### Title

```
Implement large fleet support
```
or with a scope prefix
```
componentA: Implement large fleet support
```

#### Description

More descriptive explanation of what this PR does.
```
Connects-to: #issueNumber (Optional: waffle convention to track a merged PR's status through its connected open Issue)
Depends-on: <PR # or URL> (Optional)
See: <url> (Optional, when referring to any external resource, like a PR or document)
Change-type: major/minor/patch (Optional, but desirable: the change type of this PR, should be inserted automatically if a commit has such a tag in its footer)
Signed-off-by: Foo Bar <foobar@balena.io>
```

## Misc Development Guidelines

- We strongly encourage using the `--force-with-lease` option instead of `--force` when performing `git push` to a repository. The reason is that `git push --force` can accidentally overwrite work that has been pushed by a team member in the meantime. We recommend using an alias for this; if you want to get a sneak peak of  git aliases that several balenistas use, then you should [check this ticket out](https://github.com/balena-io/process/issues/74).

# Contributions
* balena.io team

# Footnotes

##### [1] Structure of a commit message:

```
<sub-component>: <title>

<body>

<footers>
```

[balena commit lint]: https://github.com/balena-io-modules/resin-commit-lint