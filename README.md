# Balena Handbook Manual
If there is information missing here on how to do something that you think would be useful to the team or that you yourself want to know how to do, either add it to the repo yourself, create an issue requesting it or you can ask anyone on the team for help (jellychat, 1-2-1s, /beginners or /teamos flow)

**Other resources**
[Github Skills](https://skills.github.com/) - Learn how to use Github with interactive courses designed for beginners and experts
[Contributing to balena docs guidelines](https://github.com/balena-io/docs/blob/master/CONTRIBUTING.md#creating-commits-in-line-with-semantic-versioning) - We have a few guidelines which will allow your PR to pass our CI checks and successfully merge. 

## House Keeping
- Keep all file names in the balenaltd/handbook repo lower case with dashes separating words (with the exception of the README.md). Please don't use any other symbols as naming conventions.

- When making changes, please leave clear and detailed commit messages and descriptions so it's easy to understand what that change was and why that change was made.

**Desired commit message format**
```
Easy to understand description of change e.g. Tidying up of file names and content
[optional line] followed by longer more detailed description and reasoning e.g. Removed dashes from titles and fixed some spelling mistakes.

Change-type: (major, minor, patch) e.g. patch 
Signed-off-by: (who are you) Your Name <Youremail@balena.io>
```
You can learn more about the differences in change types [here](https://github.com/balena-io/docs/blob/master/CONTRIBUTING.md#creating-commits-in-line-with-semantic-versioning)

## Editing the content of the repo

### Editing directly on github
You can find the written content of the handbook within the 'docs' folder.

#### Formatting tips
```
**bold**
*italic*
<u>underlined</u>
<strike>strike through</strike>

# heading1 (there should only ever be one of these on a page - this is the main title of the page)
## heading2 (smaller than heading 1)
### heading3 (smaller again)
.etc

[link text](www.the-url-you-want-to-link-to.com)

```
**Ordering**
The contents on the website defaults to the alphabetical order of the file names (not the H1 title of pages), prioritising captial letters first (which is why we want to keep all file names in lowercase).

In the instance you need to override the positioning of a page / folder, you can use the snippet below and change the number weighting depending on the order needed. This starts from '0' at the top, the higher the number the lower down it will sit on the contents order. 

```
---
sidebar_position: 0
---
```

*Note: The 'Welcome' page should always sit at the top of the contents*

### Editing using your local

[Need advice from an engineer for this bit]


### Editing from the website version of the handbook (Docusarus)
Once the website version has been deployed, you will be able to get to the corresponding markdown file in the github repo via the 'edit this page in github' link/button at the bottom of each webpage. 

[insert image]

This will take you to github to make your edits as detailed above.

## Website

This handbook website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

We're using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
