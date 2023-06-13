# Basic tool setup
## Basic tools
As mentioned at the start, once you log into your @balena.io e-mail account, you’ll find lots of invitations to join our team in several services, online. These are tools the whole team is using on a daily basis and that will make your everyday balena life easier.

:::caution

Important! Your GitHub handle needs be your username across all services. You **MUST** use the same GitHub handle across Zulip, Front and balena forums. This is because integrations between services rely on matching handles. It will also make your life easier when it comes to auto-completing @-mentions.

:::

For now, make sure you have access to the following services:

Primary:
* [Zulip](https://zulip.com/apps/) You can use [this invitation link](https://balena.zulipchat.com/join/svywbhmpmlx4zxk7wr3cbcxv/) to get moderator access.
* [Calamari](https://calamari.io)
* [Front](https://frontapp.com/)
* [Github](https://github.com) (**You need to set up 2FA when you first login using the Yubikey you have**. _This service requires additional information/steps before you get access._)
* [Fibery](https://balena.fibery.io/)
* [Balena Forums Moderator Access - Discourse](https://forums.balena.io/) You can use [this invitation link](https://forums.balena.io/invites/6a98ca4583c9f16879dd523f35a4c60b) to get access to the forums. Moderation access needs to be requested though once you have signed up.
* [Shared Google Drive-Team Folder](https://drive.google.com/drive/folders/0BwAxLWVacuL_V3FFRVZmNE1vazg?resourcekey=0-4J9GBKcWBSkPJmTyxuwq5Q&usp=sharing)

Depending on your role and team you may have access to additional tech-related, biz-related or team-related tools. Also, if you are employed as a contractor you will have access to [Deel](https://www.letsdeel.com/) for invoicing etc, while others employed as employees will have access to [Expensify](https://www.expensify.com/) for examples. You will receive invites to any necessary services on Day 1 and then others will follow as they are needed. 

### Accounts you need as a dev

You'll need to create accounts for these services and then ping `@@operations` to give you `#access` in Jellyfish to our internal resources.
* [Docker Hub](https://hub.docker.com) (scripts expect you do be `docker login`ed)
* [NPM.js](https://www.npmjs.com/) (your access token should be in your `~/.npmrc`)


### How to access services that require additional information/steps.
Github

1. Share your username with the Operations team
1. Accept the invitations you'll receive to the inbox connected to your Github account, to join the relevant Github organizations.

### Short introduction to the services/tools we use
**Zulip** is the chat service we’re using for internal communication. Zulip is organized in streams that are related to specific balena components and teams. This is the best place to communicate with other team members and ask any questions you have. Here's a [guide](../tooling/zulip/) we have put together and [here](https://zulip.com/help/) is some more guidance.

**Calamari** is the leave management service we use. You’ll be using Calamari to submit your time-off requests and check who’s away.  Here's a short [Calamari getting started guide](https://github.com/balena-io/balena-io/wiki/Calamari) for your convenience.

**Front** is the service we use to gather all team messages and emails and unite them in one platform. We respond to emails and messages from this platform. It’s integrated with other services, such as Intercom, Jellyfish and Zendesk. Please note that all the Front inboxes you see are not personal -unless you decide to connect your personal inbox to Front- so please do not archive or delete any emails or messages you see, unless you're 100% sure about the process we follow for archiving messages and you know what you're doing. **Your Front username MUST match the same handle you use across GitHub, Jellyfish and balena forums in order to avoid any inbox syncing issues.** In addition, Front doesn't allow usernames with hyphens so if your GitHub handle has one (or more) then use the underscore instead. 

**Github*** hosts all our public repos as well as the majority of our private repos. It’s also part of the developer's workflow since this is the place where all issues and tasks are hosted. 2FA auth required! If you are not familiar with Github and how it works here are some links that the team has found helpful: [github guides](https://guides.github.com/), [Oh Shit, Git!?!](https://ohshitgit.com/) & [On undoing, fixing, or removing commits in git](http://sethrobertson.github.io/GitFixUm/fixup.html). Feel free to check with your buddy if you need a bit more help :)

The **forums** are used by our free users for support requests, and generally for discussion about the product, hack Friday projects, etc. It's required that you have an account there because eventually, you'll need it for supporting users. Please don't forget to use the same handle you've used for other basic services (e.g. Zulip, front etc.)

**Fibery** is our knowledge database and the nerve center of Balena. It is under active development. Fibery, is an integrated work management platform allowing teams to customize their workspaces and workflows. It combines aspects such as project management and knowledge management. It also enables us to create interconnected tools that reflect our specific processes. [Link](https://balena.fibery.io/)

**Shared Google Drive-Team Folder** includes some key documents and archives for different projects and work. Depending on the team and area of work, you can find up to date information about some projects there, but Google Drive is surely not where you will find everything you need, so be aware that it includes some old information too. Follow the wiki and you will find links to all the services and sources we use to store key information and documents. 

**NOTE**: To avoid any confusion, you might see `resin` and `resin.io` when reading older information. Balena used to be called resin.io and you can read more about the name change [here](https://www.balena.io/blog/resin-io-changes-name-to-balena-releases-open-source-edition/). Rulemotion was the name before resin.
