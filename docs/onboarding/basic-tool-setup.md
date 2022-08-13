# Basic tool setup
## Basic tools
As mentioned at the start, once you log into your @balena.io e-mail account, you’ll find lots of invitations to join our team in several services, online. These are tools the whole team is using on a daily basis and that will make your everyday balena life easier.

**NOTE:** Important! You **MUST** use the same handle across Flowdock, Front, balena forums and GitHub. This is because integrations between services rely on matching handles. It will also make your life easier
when it comes to auto-completing @-mentions.

For now, make sure you have access to the following services:

Primary:
* [Flowdock](https://www.flowdock.com/app)
* [Calamari](https://calamari.io)
* [Front](https://frontapp.com/)
* [Github](https://github.com) (**You need to set up 2FA when you first login using the Yubikey you have**. _This service requires additional information/steps before you get access._)
* [Jellyfish](https://jel.ly.fish/)
* [Trello](https://trello.com/)
* [Balena Forums Moderator Access - Discourse](https://forums.balena.io/) You can use [this invitation link](https://forums.balena.io/invites/6a98ca4583c9f16879dd523f35a4c60b) to get access to the forums. Moderation access needs to be requested though once you have signed up.
* [Shared Google Drive-Team Folder](https://drive.google.com/drive/folders/0BwAxLWVacuL_V3FFRVZmNE1vazg?resourcekey=0-4J9GBKcWBSkPJmTyxuwq5Q&usp=sharing)

Depending on your role and team you may have access to additional tech-related, biz-related or team-related tools. Also, if you are employed as a contractor you will have access to [Deel](https://www.letsdeel.com/) for invoicing etc, while others employed as employees will have access to [Expensify](https://www.expensify.com/) for examples. You will receive invites to any necessary services on Day 1 and then others will follow as they are needed. 

### Accounts you need as a dev

You'll need to create accounts for these services and then ask in `t/operations` to give you `#access` to our internal resources.
* [Docker Hub](https://hub.docker.com) (scripts expect you do be `docker login`ed)
* [NPM.js](https://www.npmjs.com/) (your access token should be in your `~/.npmrc`)

**Last but very important note! Please bear in mind that to request and obtain access to any service, you need to get in touch with the operations team in the operations flow `t/operations` using @@operations and **#access**. If you require access to a number of services, you can make one access request for all.**


### How to access services that require additional information/steps.
Github

1. Share your username with the Operations team
1. Accept the invitations you'll receive to the inbox connected to your Github account, to join the relevant Github organizations.

### Short introduction to the services/tools we use
**Flowdock** is the chat service we’re using for internal communication. Flowdock is organized in flows that are related to specific balena components and teams. This is the best place to communicate with other team members and ask any questions you have. Here's a [guide](https://github.com/balena-io/balena/wiki/Flowdock) we have put together and [here](https://www.flowdock.com/help) is some more guidance, including some markdown key info [here](https://www.flowdock.com/help/chat_input) to help you navigate in the flowdock world. You will soon come across many balena abbreviations and terms, so we have a [glossary](https://docs.google.com/document/d/1GcHzn-Nxvnh4WWpspeVyJV9D8V890DLXZAOmwO7jB7c/edit) to help you. This was a hack week project and it is work in progress, so feel free to add what you think might be missing from it :)

**Calamari** is the leave management service we use. You’ll be using Calamari to submit your time-off requests and check who’s away.  Here's a short [Calamari getting started guide](https://github.com/balena-io/balena-io/wiki/Calamari) for your convenience.

**Front** is the service we use to gather all team messages and emails and unite them in one platform. We respond to emails and messages from this platform. It’s integrated with other services, such as Flowdock, Intercom, and Zendesk. Please note that all the Front inboxes you see are not personal -unless you decide to connect your personal inbox to Front- so please do not archive or delete any emails or messages you see, unless you're 100% sure about the process we follow for archiving messages and you know what you're doing. In addition, Front doesn't allow usernames with hyphens so if your GitHub handle has one (or more) then use the underscore instead. 

**Zoom** is the main service we’re using for the company calls. From time to time, we may use also Hangouts, Skype or Mumble. You can use your personal zoom room for quick and emergency meeting calls. Bear in mind that your personal zoom room has a 40 minutes limit. To find your zoom room identity just log onto your account and under "My Profile" tab you can locate your personal zoom room meeting ID. In addition, you can locate your zoom ID by simply asking Hubot when using the ‘get my zoom’ command! 
*Please note that we also use google meets a lot for smaller groups and one to one calls. You do not have to set up anything for this. When you create a calendar invite and add a participant, a google meet room/link will be automatically available for that invite. You can also ask Hubot `get a meet` to get a link that you can jump on right away to have ad-hoc calls. This is the preferred option for such calls. 

**Github*** hosts all our public repos as well as the majority of our private repos. It’s also part of the developer's workflow since this is the place where all issues and tasks are hosted. 2FA auth required! If you are not familiar with Github and how it works here are some links that the team has found helpful: [github guides](https://guides.github.com/), [Oh Shit, Git!?!](https://ohshitgit.com/) & [On undoing, fixing, or removing commits in git](http://sethrobertson.github.io/GitFixUm/fixup.html). Feel free to check with your buddy if you need a bit more help :)

The **forums** are used by our free users for support requests, and generally for discussion about the product, hack Friday projects, etc. It's required that you have an account there because eventually, you'll need it for supporting users. Please don't forget to use the same handle you've used for other basic services (e.g. flowdock, front etc.)

**Jellyfish** is a social knowledge database and the nerve center of productOS, a platform we are building for developing and maintaining products. It is under active development and is already being used to provide customer support for balena users. Once your Jellyfish account is set up, you will be prompted to change your password. You can check the [Jellyfish specification doc](https://docs.google.com/document/d/1psa9upjr__LDbF0442ndW72Nj8jAuA48mmqPdahQBUs/edit#heading=h.e986klys6hyc) for more info. 

**Trello** is a tool we use to track progress for some of our projects. Some teams use it more than others at the moment. It allows more visibility of what everyone is working on within a team. It has boards, lists, and cards to enable you to organize and prioritize projects, tasks, goals and progress.

**Shared Google Drive-Team Folder** includes some key documents and archives for different projects and work. Depending on the team and area of work, you can find up to date information about some projects there, but Google Drive is surely not where you will find everything you need, so be aware that it includes some old information too. Follow the wiki and you will find links to all the services and sources we use to store key information and documents. 

**NOTE**: To avoid any confusion, you might see `resin` and `resin.io` when reading older information. Balena used to be called resin.io and you can read more about the name change [here](https://www.balena.io/blog/resin-io-changes-name-to-balena-releases-open-source-edition/). Rulemotion was the name before resin, although you will probably only see this one on Flowdock room names.   