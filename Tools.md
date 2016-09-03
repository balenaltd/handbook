[Wiki](Home) > [Team](Team) > Tools

Our most used tools:

* [Hubot](hubot)

## Hubot

Your friendly Flowdock robot to help you with your tasks, tamed by @okakosolikos. Source repo is [resin-io/hubot](https://github.com/resin-io/hubot).

### Keyword behaviour

* `get a room`: give you a link of a Zoom room to use for web meeting.
* `on support <1> <2> <3> <4>`
* `who's on support`: get's you the name of who's currently on support, and link to the [Support](Support) wiki page
* **hashtags**: a number of hashtags will trigger Hubot to send a notification to the relevant Front mailboxes, for note taking / reminder purposes. _Make sure that the post that includes the hashtag has a bit of summary of what the reminder should be about!_ Current tags: `#architecture`, `#devops`, `#devices`, `#incident`, `#processfail` `#blog`, `#newsletter`, `#docs`.

### Automatic behaviour

* If you mention a person who's on vacation (data from StaffSquared), Hubot will give you a reminder that they are off
* If your text mention `ship it`, 