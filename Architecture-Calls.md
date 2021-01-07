
## Description

Architecture calls take place several times a week (usually 2 or 3) and are [brainstorming sessions](https://docs.google.com/document/d/1mHb-D2vJxufa8OZPU55V5WBIXuQ44MNL4fcXw52lEe8/view). It is the time and (virtual) place where we generally try to come up with an action plan to tackle non-trivial technical issues across the balenaCloud platform. This call is usually technically oriented and the subjects range from balena backend, devices, cli tools etc. Everyone in the balena team is welcome to join.

There are Architecture Calls per product loop, so e.g. `balena.io arch call 1` and `loopMVP arch call 1`.

### Process overview

- Post **#architecture** message (see guidelines on using the hashtag below)
- Follow the instructions when you get pinged for your item. You will need to take some actions if the item needs to be archived, postponed, or if you cannot attend the call and the issue you raised must be discussed. Guidelines will be posted along with the heads up message so please make sure you follow them. 
- After the call, you can find the notes in [Front](https://app.frontapp.com/inboxes/teams/folders/39382/unassigned/20342168781) and the discussion is linked in the Google Calendar event

Some general information and tips that are useful to know:

- Open **#architecture** items can be found at the respective Front inbox - https://app.frontapp.com/inboxes/teams/folders/39382/unassigned 
- The agenda and the notes will be posted at the  [`r/architecture` flow](https://www.flowdock.com/app/rulemotion/r-architecture)
- You should avoid pinging @alexandrosm, @petrosagg, @page- or @shaunmulligan when raising an arch call item. They all join the arch calls by default.

### Using #architecture 

Many interesting technical discussions often produce very long threads that are difficult to follow. Also, we've found that it's more efficient to have all core architects present and discuss solutions through till we find a way forward. 

There are no hard-defined rules on when an issue should be discussed in an architecture call, but if you think it should, the process to bring it up is to simply send a message, ideally in a Flowdock thread that has the context of the discussion, and use the following convention: 

```
#architecture [brief description] cc [pings to people who need to attend or be kept in the loop]
```

Example:

```
#architecture Discuss keyframes cc @jviotti 
```

You can add a bigger multiline description, if you feel like it, but remember that only the first line will be fetched for the arch call agenda. Example:

```
#architecture Discuss keyframes cc @jviotti 

[More lines with more context that will be ignored from the agenda description]
```

### Running an architecture call

The steps to run an architecture call are:

#### Before

- Just before the arch call (from 1 minute to right before the call) run the [postArchCallAgenda](https://github.com/resin-io/supportHQ/blob/master/scripts/arch-call-agenda/postArchCallAgenda.js) script. This basically refetches the agenda, posts it to flowdock and pings Petros.
- Reporters of arch call items will often forget to add #summary comments to items they discussed, or items may no longer be relevant, and will ping whoever posted the arch call agenda to remove their item from the flowdock list.

#### During

The process dictates that the reporters of the item are responsible for keeping notes. If a reporter cannot attend the arch call then they should ask for someone else who has knowledge of the raised issue to do so. This should all be settled down after the arch call agenda heads up has been posted.

Arch calls are recorded. We're still looking for a way to automate this (it's not clear how to do this over an API for Google Meet), so if you run the arch call, remember to log in and press 'record' :)

#### After

After the call, preferably a few hours later to give people some time to add notes:

- Run the [postArchCallNotes](https://github.com/resin-io/supportHQ/blob/master/scripts/arch-call-agenda/postArchCallNotes.js) script. This basically fetches Front items with a `summary-needs-posting` tag, posts them in Flowdock with the #meeting-notes hashtag (so everyone in the team receives the notes) and re-tags the Front conversation with the `summary-posted` tag.


### Architecture call recordings

The recording of the call will be linked and available at the calendar invite and you can check the previous calendar invites to access the previous call recordings. We keep the recordings as convenience to people who might not be able to attend a specific architecture call and want finer details that cannot possibly be captured with the overview notes. The calls are brainstorming sessions and the recordings should be treated as such.

### [Architecture call Archive from 15 Nov 2016 to 06 Sep 2017](https://github.com/resin-io/hq/wiki/Architecture-Calls-Archive)

### Pinned Agenda Items

We often have items that we want to keep revisiting. The process to do that is simply leaving the respective Front tickets open and also add a descriptive comment (e.g. `Pinned item for Mondays`)

### Architecture Reviews

The arch review sessions are the ongoing process where we are reviewing what our current source code and architecture is and making a mid/long-term plan for the future. [FlowDock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/E2V3msPTbhmCUEf9vqEaU2PIpgo)