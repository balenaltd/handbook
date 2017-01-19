# Customer Support @ resin.io

This page documents what you need to know when doing customer support at resin.io

## Every shift
This workflow specifically discusses dealing with support issues in Front, however these steps should be used for the forums, zendesk and gitter with obvious adjustments - let the support lead know if you are unsure about this.
* Bookmark and keep open all links in the [Important Links](#Support-channels) section at the top of this page.
* During your 4 hour slot, covering support is your full time job and we aim to respond to all questions within 20 minutes or so. If you find reasonable gaps while working on support then by all means work on other tasks, however you should not allow this to interfere with your support duties. Keep a close eye on Front, Zendesk, and forums.resion.io, responding as quickly and as accurately as possible to any new message.
* Remember to check the Front sidebar (toggle to Resin #1) for related Flowdock conversations. Always link tickets in Front to relevant conversations on Flowdock. This helps us know what discussion was had and what actions were taken -- useful insights for future support requests and product changes.
* Add useful notes and tags as you go - existing GitHub issues, writing new GitHub issues, comments letting
* [Once we have a closing/teardown flow set that will go here]
* End your shift with a message in r/user_happiness to the next agent with helpful information to them about tickets that are mid-conversation, and what's been quiet. Ex: "@shaun-mulligan there are two tickets in s/intercom that need to be responded to and this forum post (link) that needs an answer."
* Make yourself available for direct notifications in the r/user_happiness Flowdock room and on Front. These should be replied to as quickly as you reasonably can do.

### When you shift starts
* Start with a triage - check S/support and S/intercom inboxes to see if any new conversations have been started by a user, a user has replied to you or there are new messages from existing conversations with other members of staff which have not been answered yet. Go through and check each open conversation. Its important to look at the `Open` tab and not the `unassigned` tab in the Front inbox.
* Any s/intercom tickets labeled 'premium' and all Zendesk tickets have an SLA.
 * Urgent (severity 1) - must be replied to in 60 minutes
 * Severity 2 - must be replied to in 3 hours
 * Severity 3- must be replied to in 24 hours
 * Severity 4 - doesn't have an SLA! Woo. We still want to respond promptly, but it's definitely a lower priority than the others
* If you are not sure about the state of existing conversations with others, ask the support engineer from the previous time slot to fill you in.
* If the conversation is new or a user has replied to you, go ahead and respond, skip to the Replying workflow.
* Otherwise, if a user has replied to an existing conversation with another member of staff and they're around, ping them to deal with it, or step in yourself if you know you can take it over. If they are not around you'll need to make a judgment call - read the conversation and see whether it would make sense for you to jump in and reply.
* If the response is just an acknowledgement, thanks, or obviously ending the conversation, there's no need to respond. However if the user talks about an urgent issue, or it seems appropriate to give a reply (i.e. you can provide this information quickly to them), then by all means do.
* Always let the member of staff who was dealing with the conversation know what's happened.

## Who On Support This Week?
[Google calendar showing who's scheduled](https://calendar.google.com/calendar/embed?src=resin.io_2klk2f26ivo04qq5ktlkva1neg%40group.calendar.google.com&ctz=America/New_York)

[Spread sheet where we collectively make the schedule](https://docs.google.com/spreadsheets/d/1SUMuvULnDWc1kOeEtbuZXahyA_8SPKcLOCwkRhia1Wo/edit#gid=108544568) - ([explanation](https://docs.google.com/document/d/1FLpAuDRxCzTyzoauz7fYk6MNDC52fgR5o2Mjk3cZO4M/edit#))

## Introduction
At resin.io we do support differently - firstly, every engineer does it, and secondly we treat it as about the best source of data on our product we have. In support you see exactly the problems users are facing, how they are using our product and what we need to improve. If you're interested in the philosophy behind this approach, check out our [Support-driven Development blog post](https://resin.io/blog/support-driven-development/) which goes into a lot more detail.

## Support channels
Where to look for messages, in order of response importance
* Front inbox: [S/Support](https://app.frontapp.com/inboxes/shared/support/open/121516198) - customers who have a service level agreement (contract) that we'll respond to them within a timeframe. More below.
* Front inbox: [S/intercom](https://app.frontapp.com/inboxes/shared/intercom/open/latest) - paid and unpaid customers 
 * tickets that have an SLA are tagged 'premium' - see SLA section below
 * paid customers tagged 'paid' - they sometimes get preferential priority
* [Forums](https://talk.resin.io/) - everyone! This is lower in importance than responding to 
* [Community Chat on gitter](https://gitter.im/resin-io/chat) - this is not a channel we want to promote as a place to receive support from us. Our presence there should be more about community building and encouraging folks to answer each others' questions.
 * has private messaging, but please don't use it (unless it's an emergency), because we can't capture the conversation in a way that lets other folks see what's going on and help.

### Other links you'll need during a support shift 
* [User_happiness](https://www.flowdock.com/app/rulemotion/user_happiness) - the internal support Flowdock flow: where to receive handoff from previous shift, ask questions and get help from others
* [The ScratchPad](https://github.com/resin-io/hq/wiki/Scratch-Pad) - **the cheat sheet for support!** Full explanation [here](https://github.com/resin-io/hq/wiki/Support#support-tools-scratchpad).
* [Registry of issues](https://github.com/resin-io/hq/issues) and its [waffle board](https://waffle.io/resin-io/hq)

### How to respond to humans
* We send a bunch of automated messages which users sometimes reply to. Occasionally they are sent as if they are from a member of the team, and are usually pretty obvious. One we send to every user is a hello/welcome message - sometimes users respond talking about what they want to do with resin and more rarely they use it as a thread to report an issue. Regardless it's important to note that we say `We read and reply to every message` here, so every time we get a reply to this message, it's vital to reply to it.
* It's important to avoid being apologetic in general, as we always want to present a positive and confident face to any issue. In some cases it is appropriate to apologise, when it is clear we have failed them and want to make sure they are aware, but this is rare. Generally try to word your messages in a positive way, as while it sounds corny, free support users are potential future customers.
* If we are dealing with a user's issues that has nothing to do with us or the core service, we should be careful to ensure that we communicate (discreetly of course) that this isn't within the bounds of our support, rather than us dealing with an issue we are going above and beyond to help them out and setting the expectation we'll do it in the future. It's a subtle distinction but an important one, as the two are separate and it's to make it clear they are receiving a premium service.
* Often a user will only give you a partial UUID or a deviceId, if you need to get the device link, you need to be logged in with your admin account to see their dashboard. In the case that link doesn't take you to the correct device, you can use the search function in the https://admin.resin.io/devices panel. Note that it takes a couple of seconds to filter. You will then need to find the users account name in the list and expand it to see the link to that device.

### Support tools troubleshooting
#### Front
All roads lead to Front, and those roads break sometimes. The two main integrations are Intercom and Zendesk.

Intercom
* If a user complains that they don't see the icon on the website, they may be blocking it. You can ask them to disable the blocker.
* If your message appears twice, that's an Intercom integration issue.
* If you're not sure messages are going through, open up Intercom to check and potentially answer. It's better to answer from Front if possible - Front will show messages sent via Intercom, but they won't be attributed to your user account.

Zendesk
* Similar to Intercom, if Front is failing, you can log in directly to Zendesk to answer. Please don't respond to users via Zendesk unless there's no other way, because Front won't capture the messages.

#### Github Gist
How do you send a file through Front/Intercom? You can't, so instead it may be well worth C+Ping that file into a private Gist that you can then send to a customer, should the need arise. Gist is [here](https://gist.github.com/).

## Getting set up
1. Make sure you have accounts at the following place, ask Apostolis (@apostolism) if you don't:
* [Device access](https://github.com/resin-io/hq/wiki/Scratch-Pad#setting-up) - a week before your first shift, do this.
* [Front](https://app.frontapp.com/inboxes/shared/intercom/open/latest)
* [Zendesk](https://resin.zendesk.com/agent/filters/69240918)
* [intercom.io](https://intercom.io)
* [Gitter](https://gitter.im/resin-io/chat)
* [Resin Talk](https://talk.resin.io)
* [admin.resin.io](https://admin.resin.io) - make sure you your resin.io account has admin access.
2. Make sure all the accounts you have setup above have a good picture of you and an updated profile.
3. Add your weekday availability [here](https://docs.google.com/spreadsheets/d/1SUMuvULnDWc1kOeEtbuZXahyA_8SPKcLOCwkRhia1Wo/edit#gid=1853017765).
4. Install the resin.io Front side panel. You can find the instructions [here](https://github.com/resin-io/hq/wiki/Using-Front#resinio-frontapp-side-bar).
5. Open the Scratch Pad and peruse the content - The scratch pad has a wealth of knowledge of in-the-wild issues, workarounds, canned responses for users, how to do things internally, etc. This is a good place to look for answers before pinging others.
Now you are ready to get stuck in! If you encounter any access restrictions for any of the above, ping the operations folks (Stefanos and Apostolis at the time of writing) or the support lead (Sonya at the time of writing.)



### Non-support tickets

Requests for a partnership or wanting to sell us something - [ask to send an email to hello@](https://www.flowdock.com/app/rulemotion/r-process/threads/FliYq-3DXNW4ZL4BNCMGyW2_ob2). Tell them something like:
>Please email hello@resin.io, that will get to the right people within the company. Thanks!


## How is support assigned?
During the week there are four four-hour shifts per day. Sonya is manually generating the schedule based on [each agent's availability](https://docs.google.com/spreadsheets/d/1SUMuvULnDWc1kOeEtbuZXahyA_8SPKcLOCwkRhia1Wo/edit#gid=1853017765) and number of support hours worked (which you can see in column A of the availability doc). She posts the new schedule in r/user_happiness to check that it works for those scheduled.

### Weekend cover
We run a voluntary system for weekend support cover. A request is made in r/user_happiness for weekend hours, look for that or ping Sonya to schedule future weekends.

The expectation is that you check in hourly during at least an 8-hour spread, and answer questions that can't wait till Monday. (Use your best judgement on what that means.) 

Each day you keep an eye on support you will receive an extra 1/4 day's annual leave to use as you wish. Some weekends this can involve little to no work, others more but it's always significantly less than weekday volumes. You can also choose to shift your schedule to do a full day's work, and take a day off the next week - it's your responsibility to let teammates know and not miss any meetings.


### Specific support

[Summit support](https://github.com/resin-io/hq/wiki/Summit-support) - documentation of the process we use to provide limited support during our all-hands summit week.