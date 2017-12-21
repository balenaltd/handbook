At resin.io we’re heavy Github users. If you’re a developer, you’ll be using Github on a daily basis for several reasons, and believe us, there are times when Github can be “noisy”.

Before you start, make sure that have access to the following organizations:
* https://github.com/resin-io: Is the storefront. Should only have top-level components of resin.io or other projects we particularly want to be associated with (e.g. etcher, pine.js)
* https://github.com/resin-io-modules: Dependencies of our top-level components. Moved here to reduce the number of repositories in the resin-io organisation.
* https://github.com/resin-io-playground: Anything we want to store here is fine: work in progress, experiments, crazy ideas. However, NOTHING should depend on these projects and there should be no guarantee that the links will be stable or that the repo will be there tomorrow. DO NOT advertise any of these repos, and for God's sake, don't refer to them from production services.
* https://github.com/resin-io-projects: Projects we recommend users try on resin.io.
* https://github.com/resin-os: Resin.io operating system and device support related repositories.
* Depending on your job duties you may have access to additional orgs, such as:
* https://github.com/resin-io-library: Resin.io base images only.

Note that you’ll receive as many invites as the Github organizations you are requested to join.

## Filtering notifications
We’ve found it really useful to filter the notifications we receive in our e-mail inbox.
![](https://lh6.googleusercontent.com/peN8WHu_UOQI2olDvu0FI5-AZRMgkzQVsqesdBc0YH_sl4EqDvTc2Jqe67W6IYSqtfI4BDKf1uA4zqnfEuXkYiO5Bfh-ojZO_tTxQQK6lPdC0IXv2cFHIbxTv_v9Cvvceki8_FNS)

> Email notifications for Issues, Pull Requests, and Gists can easily be filtered by the List-ID header. Look for this header value to sort your notifications, or even forward them to a more appropriate email account. You can filter on *.org.github.com to filter out emails by organization, or repo.org.github.com to filter out emails from a specific repo.

## E-mail notifications routing
You can choose which orgs’ e-mails to receive to which inbox by visiting Github/Settings/Notifications/Notification e-mail/Custom routing. Try sending all company related notifications to your @resin.io inbox. You can also check put this guide about email notifications and github: https://help.github.com/articles/about-email-notifications/

## Unwatch repos
Did you know you can, automatically, unwatch the repos that you don’t work on directly? This way, you’ll only get notifications on mentions and assigned issues/PRs. Open the repo you’d like to unwatch and click the Unwatch button which is next to the Star button.
![](https://lh5.googleusercontent.com/ECeRQg8PjInLwYrop-94VlVwrhoq09aeSD5DQBLsmlY3Yj2f-7Dh5lDXp8bSjHpznoCBwLvKDrzFDlkRrstCn6FHJPhwPjmc-jTsgNtK_hRe7JDVmLD52OVMWby470AF8MXIKN9a)

If you’d like to automatically unwatch all new repos go to Github/Settings/Notifications/How you receive notifications/Automatic watching and uncheck the Automatically watch repositories option.

Note that unwatch shouldn’t mean ignore. Especially if you choose to automatically unwatch the new repos, make sure to manually watch those that are related to your job and to your tasks.

In addition you can unsubscribe from notifications from a particular PR thread on the lower right of the right side menu. 

## Adding SSH Keys

Once you have found your way around github and all the organizations don't neglect to add your SSH keys to the relevant repos. In case you are not familiar with the procedure you can find more info on how to to do that in the Support Scratch Pad here: (https://github.com/resin-io/hq/wiki/Scratch-Pad)

For more Github secrets see https://github.com/blog/967-github-secrets

In case you’re not familiar with git and Github, we suggest following Github’s [Hello World guide](https://guides.github.com/activities/hello-world/).
