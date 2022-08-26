# Working Hours and Availability

Team working is important, especially in remote teams where the majority of the people work from different places and in different timezones. That’s probably one of the challenges when choosing to be a remote-first company. On the other hand, different timezones benefit the team in terms of the support we provide our users with, the response time to support requests and the availability of the team to respond to users at any time of the day. In general, we don’t ask people to work on a specific time schedule. Each person can work the hours they prefer as long as this is communicated as described in the section below, their schedule is not changing every day, the work gets done and they are reachable. 

We are always looking at ways to improve the experience of remote and asynchronous working at balena. As you will hear from other teammates, it does take some time until you get used to it, especially if this is your first experience of being part of a remote team based across different timezones. As balenistas are based all over the world, the communication flows around the clock, so you can be getting pings anytime. However, asynchronous working should allow everyone to focus on tasks when needed without worrying about responding to pings as they come in. It always helps to communicate what you are working on among your teammates, so between smaller teams, there is a better workflow for everyone. We often see tasks being blocked while waiting for a teammate to take action (e.g. reviewing PRs) and this can become a pattern when people in opposite timezones are working together. Thus, prioritizing tasks that can unblock other balenistas when possible, is highly appreciated. It takes some time and team effort to find the right balance for work to run smoothly for everyone, so invest that time to discuss with your teammates if needed. 

### Communicating your availability

It is important to communicate your working hours to the rest of the team, since

* scheduling algorithms are used to schedule events at times that are as convenient as possible for everyone, and therefore need your preferred hours as input, and
* your team members need to know when you will be available.

For these purposes, team members indicate their working hours in their personal Google sheet titled `user-<Github-handle>`. As part of onboarding this will be shared with you. Ping the team if you have any issues finding this.

You should be reachable on Jellyfish during your stated working hours but if this changes, you can let the team know with a quick message. This is critical in order to keep our workflow running and help all balenistas deliver on time without any interruption. No need to let anyone know if you are popping out for a while, just for any major unexpected disruptions during your day that might affect others! You can use Jellyfish to ping the team for this, or a direct chat group (you can see a [list of these here](https://jel.ly.fish/view-all-groups) or create your own!) in case you want to let a smaller group of people you are working with know who might be affected by your unexpected absence.


#### How to enter your default working hours

Your default preferred working hours for Monday through Friday are set in the `Default Working Hours` tab of your personal Google sheet. You would have received a link to this Google sheet during onboarding, but if you need the link to be resent to you, please ask TeamOS in Jellyfish.

Your working hours are expressed in local time, as determined by the crucial `Time zone` entry in this tab - please make sure that the correct time zone is selected here! Each day is divided into 48 half-hour slots. The column headings indicate the start time of each hour. When you join, some example values have already been filled in for you. Please note that this is for illustration only, and does not indicate an expectation of when exactly you should work. Customize as needed.

Fill all the slots representing your normal working hours with 1s (indicating available, preferred). If there are additional slots when you are willing to work (i.e. attend a meeting, or do support if you are a support agent), provided that (a) it is really necessary and (b) there will be prior notice for such an appointment, fill these with 2s (indicating available, but non-preferred). This is sometimes necessary if you have to meet with team members from very different time zones. The support scheduler can also assign shifts during 2-slots, although it's optimized to minimize those instances and use 1-slots instead.

Finding sufficient overlap between the team's availabilities is an ongoing challenge. We have therefore added another level of resolution to how you specify your working hours: the digit 3. So fill with 3s any slots that you would really prefer not be scheduled, but can potentially make it if (a) there's absolutely no other option, (b) you are pre-scheduled and pinged about this, and (c) you reserve the option to ack or decline on a case-to-case basis. (Obviously, you are considered afk if not pre-scheduled.)


#### Working hours overrides for travelling

If you travel to another location and will be working from there, you have to create an override in the `Working Hours Override` tab of your personal spreadsheet. This tab follows the same format as the `Default Working Hours` tab, but contains the additional fields `Valid from` and `Valid to`, where you need to specify the applicable time period. If any one of the `Time zone`, `Valid from` or `Valid to` fields are empty, the whole override will be ignored.

We do not need to store a history of all working hours overrides that team members have specified. Therefore, once the `Valid to` date of the override has passed, you can simply re-use this tab to specify your next override when it becomes necessary.

However, in cases where you are travelling to more than one destination in quick succession, overwriting the single tab becomes impractical. In such a case, you can duplicate and rename the `Working Hours Override` tab and detail your different overrides in different tabs. The model will respect any number of overrides, as long as the name of each such tab starts with `Working Hours Override`. Obviously, the tab names need to be unique, so you could for example have `Working Hours Override`, `Working Hours Override 2` and `Working Hours Override 3` if you want to load 3 overrides in advance. (Warning: specifying overlapping overrides will currently produce unpredictable results.)

Important: If you're going to be working from a different location for an extended period of time, please be sure to contact TeamOS, since there might be [additional implications](./keeping-your-personal-information-up-to-date.md#personal-information).


#### Calamari and Google Calendar events

For the purpose of scheduling a new event, your working hours alone are not enough. The scheduler also needs to know:

- whether you are on leave (as recorded in the Calamari leave management software)
- what other events you already have scheduled during those working hours ("busy" events as contained in your balena Google Calendar)

Therefore, to get your actual availability for scheduling, scripts run in the background at regular intervals to read everyone's working hours, import overriding events from Calamari and Google Calendar, and write the whole team's filtered availabilities to a sheet named [UK Time Team Availabilities](https://docs.google.com/spreadsheets/d/1fOpah2A6N3xImg5xxGbTygdcNRGBlyZ_jQ2UIzy9PLE/edit#gid=1035327337). This sheet is crucial for the scheduling algorithms, but can also be useful for you to check when other team members will be available.


#### Remember to keep your preferences updated!

Please make sure that your working hours and your balena Google Calendar are always up to date (ideally 2 weeks in advance), to ensure that the scheduling algorithms can do their job well!

In the event of an unexpected last-minute change to your regular working hours (for example due to a family emergency or other eventuality), you can just ping the team  on Jellyfish to inform them when you will be reachable again.


### What is a good place to work from?

Below you can see from our experience over the years what we consider a good place to work from. 
- enough equipment around you to perform any work duties you have, and enough space to use them
- reliable internet connection, enough for video
- a quiet place to take calls from
- a working environment that doesn't compromise your productivity and gives you long stretches of distraction-free time to work
- a fixed address where the Operations team can send you parcels if needed
- advance notice and approval when it comes to shifting timezones and working days significantly.
- ability to meet all your standard obligations like team check-ins, all-hands calls, applicable brainstorms, etc