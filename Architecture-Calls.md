## Description

Architecture calls take place several times a week (usually 2 or 3). It is the time and (virtual) place where we generally try to come up with an action plan to tackle non-trivial technical issues across the resin.io platform. This call is usually technically oriented and the subjects range from resin.io backend, devices, cli tools etc. Everyone from the resin.io team is welcome to join.

### Using the #architecture Flowdock tag

Many interesting technical discussions often produce very long threads that are difficult to follow, so what we do  instead is have a call, keep meeting minutes and come up with an action plan. There are no hard-defined rules on when a Flowdock thread should be discussed in an architecture call, but if you think it should, please tag the thread by adding a comment with the `#architecture` tag **and** a small summary. The reason is that Hubot picks these `#architecture`-tagged comments up and sends them to the `architecture` FrontApp inbox, which largely forms our next meeting agenda.

## Pinned Agenda Items

* Supervisor rearchitecture
* ENM/resinup/supervisor fusion

## Recent Meeting Notes

### 30 Jan 2017

[Flowdock Agenda](https://www.flowdock.com/app/rulemotion/r-process/threads/HDTJIwcAKb5dHabPeVRAXklnRdO)

#### [resinHUP next steps](https://beta.frontapp.com/inboxes/shared/d_architecture/open/214454314)

- Coupling supervisor Updates with OS
  - resinHUP should always update to the supervisor version set in `/etc/supervisor.conf`
  - **[Action]:** UX/UI: When a target hostOS version is selected for an update/downgrade, the user should also be able to see the supervisor version that his device will end up running. This needs a bit of research on the implementation details, because it's not clear how the UI will fetch the `/etc/supervisor.conf` supervisor version (e.g. is it available in the API/S3 image storage? Is it included in the image only?)
- Fix update progress in device summary page
  - `docker pull` is the main blocking step in the resinHUP process. Although there is a way forward (`docker pull` produces a stream that can be parsed and fed the API with more fine-grained device state info), it's not trivial to implement and in the meantime we can go with a [Zeno's progress bar](http://cerealnumber.livejournal.com/27537.html) to improve UX.
  - **[Action]:** Make required changes in resinHUP to improve UX
- Open resinHUP to more hostOS versions
  - Anything pre () should be updatable from the Dashboard. Devices older than that should be updated manually by the devices team.
  - **[Action]:** Update self-service resinHUP infra (UI/actions backend) to allow versions > 
  - **[Action]:** Update UI warning to something in the lines of *'Users should test their apps to a device with the target host OS before upgrading'*

#### [Device ownership](https://beta.frontapp.com/inboxes/shared/d_architecture/open/213042126)

- **[Action]:** ~~Open issue to the API with proposed solution until ownership is fixed properly with API keys~~ https://github.com/resin-io/resin-api/issues/97

#### [Device trees](https://beta.frontapp.com/inboxes/shared/d_architecture/open/214451817)

- Discussed whether or not DTB should have a 'never breaks userspace' kernel-like approach
- DTB compatibility references/material: [this flow](https://www.flowdock.com/app/rulemotion/resin-devices/threads/E4bTPBKPfaaBMOdNpiptf1sQOOJ)
- resinHUP should probably just ignore DTBs
- **[Action]:** Needs more discussion

#### [Supervisor DoS mitigation](https://beta.frontapp.com/inboxes/shared/d_architecture/open/212486956)

- Discussed ways to mitigate DoS in supervisor's endpoints
- **[Action]:** Needs more research.

===

### 26 Jan 2017

#### Attendees: Petros, Shaun, Andrei, Alexis, Kostas
#### resinOS 2.x - schedule and remaining items

* [resinOS devices dual boot partition](https://beta.frontapp.com/inboxes/shared/d_architecture/all/211384242)
  * **[Action]:** We are moving forward with dual partition for Rpi device types only
* [rootfs sizes](https://beta.frontapp.com/inboxes/shared/d_architecture/all/211384242)
  * **[Action]:** Will move forward with [Theodor's proposal](https://github.com/resin-os/resinos/issues/126)
* [image deployment](https://beta.frontapp.com/inboxes/shared/d_architecture/all/211707638)
  * Context
    * We need a deployment method that will handle all 4 types of resin images and decide on things like s3 structure. This is an open issue that we've been discussing at least since mid-November
    * There's a possible blocker/clash with the ongoing etcher/resin backend discussion
  * **[Action]:** This task requires Jenkins-specific modifications that Trong will lead
* Enumerated possible resinHUP frameworks like swupdates/mender
  * **[Action]:** Needs investigation/task leader
* Discussed resinOS ssh/docker socket security hardening
  * Context
    * Atm ssh is passwordless and Docker socket is exposed
  * Notes
    * It's still not clear how we should move forward with this. We discussed the possibility of extending `rdt` to support adding SSH keys into the image. The exposed Docker socket is also an issue because it provides unauthenticated access and even with SSH keys, one can simply create a container that binds to / and gain root access. Also, we have to carefully consider blocking Docker socket access because a) we already use it in some example projects b) there's no easy way for users to use `docker` and `docker-compose` over SSH so they'll be 'locked' to `rdt`
* [self-service resinHUP improvements](https://beta.frontapp.com/inboxes/shared/d_architecture/all/211723016)
  * Notes
    * Currently resinHUP is restricted to versions that are safe to use (`1.x` and `>=1.16.0` only) . If we open it up to more versions we'll need to improve the warning/info message before the update - users should *first* test their app to the target os version they want to update to.
    * Discussed on improving resinHUP progress. The most time-consuming operations atm are `docker pull`'s and reporting progress updates while these are running is hard. There's still no clear way forward. (Replacing progress bar with milestones was suggested, however this will not address the long delays)
    * Also discussed coupling OS with supervisor updates. The main reason why we updated supervisor separately is that the OS update was hard. This is changing with self-serve hostOS updates, which brings us closer to melding supervisor into the OS. We also discussed which supervisor versions/tags should be fetched during the update (it shouldn't be the `latest` tag but one that is guaranteed to work with the particular OS version)

===

### 16 Jan 2017

#### [Persisting info on provision failures](https://front.frontapp.com/inboxes/shared/d_architecture/unassigned/195530293]
  * Notes
    * The current consensus was to store logs under `.meta/diagnostics`
    * Idea: diagnostics could have a reconfix file that specifies how to parse various sources to create a diagnostics file. If etcher has support for visualising files, it could read diagnostics.
      - We need a set of rules on what to pull (based on what is written in .meta), also need to know what this .meta/diagnostics structure will look
      - Use case:  Etcher can detect manifest and pointed log files, but what does it do with those? Does it offer to email them on behalf of a user? Does it save them?
  * **[Action]:** - Write spec (Shaun) (https://github.com/resin-io/resin-api/issues/97)

#### Edge device types

- Important to create a generic device type that is not downloadable
- Add field that device type can be dependent or not and will be true for generic device
- Action write it up - Kostas

There is a set of device types:
  - One is going to be generic
  - The other will be specific to the architecture (e.g. armv6,7,8 , x86)

The generic one does not have an arch at all. This means that we need to introduce new things on the schema.
In the device schema we will remove the `is dependent` field and will add a closely similar thing, which is `can be dependent`. The only one that can have the `can be dependent` flag as `true` is generic types

When you look into 'Create dependent device type', it will only show devices that can be dependent (true)

The UI will also not have download OS system at all

  - Ideally the slugs will match the ones we use in the base images
  - By doing this, we solve the dependent device problem and also make a step forward to create device / community support.
  - build OS and use it on device
  - In general, instead of having download OS, we can have download config.json button. A 'download config.json' button should be available for all devices probably

resin-builder: when there's a completely generic device type, the builder should enforce no-architecture, which is to take any image and go with it. slug for generic should be 'unknown'

* **[Action]:** Write it up (Kostas)

===

### 12 Jan 2017

[Recorded call](https://drive.google.com/open?id=0B0NS-URBofBLUGdMcG1DMG8waEU)

#### [Discuss enabling update locking/blocking at the API level, so users can use this feature to do staged rollouts instead of abusing the update.lock on the devices](https://front.frontapp.com/inboxes/shared/d_architecture/unassigned/191718363)
  * **[Action]:** Spec (Giovanni could lead this) (https://github.com/resin-io/hq/issues/596)

#### [ENM issues related to bluetooth interface](https://front.frontapp.com/inboxes/shared/d_architecture/unassigned/204844096)
  * ~~**[Action]:** Debugging session with Petros (scheduled)~~

#### Discussed DeviceURL/VPN speed issues
  * **[Action]:** Needs investigation - (https://github.com/resin-io/hq/issues/283)

#### Discuss how we can define a standard, easy to adopt way of informing users why a device failed to provision. It should be able to be used by other OS ditros outside of resin and recognisable/parseable by etcher. currently there is a spec in this vein here: https://github.com/resin-io/hq/pull/367 ) - [Front link](https://beta.frontapp.com/inboxes/shared/d_architecture/open/195530293)
  * **[Action]:** Postponed - discuss again whether writing log file to boot partition would work

#### [Discussed about the way dependent device types (currently 1 and no plan in adding more) are parsed and handled by the UI (and possibly the API itself)](https://front.frontapp.com/inboxes/shared/d_architecture/unassigned/204875955)
 
===

### 10 Jan 2017

* Open Source Builder
  * **[Action item]:** Write spec ([hq/541](https://github.com/resin-io/hq/issues/541))
* Troubleshooting session/discussion on API/RDS performance issues

https://docs.google.com/document/d/1-9IMrl5c6hPexItKqsEfKN6vKda5RBGmwLXFl_v9u_0/edit

===

### 9 Jan 2017

* Discuss supervisor container conflict bug (recently hit on resinOS 1.24.1) / docker bug
  * **[Action item]:** Device team should change how we restart supervisor with special care for the update script
  * **[Action item]:** Work on maintaining internal docker fork (Yossi)
* Discuss openROV issue: ESOCKETTIMEDOUT errors with deltas enabled 
  * **[Action item]:** Requires investigation
  * **[Action item]:** Look into precomputing deltas on builder
  * **[Action item]:** Set a less scary supervisor error when deltas fail
* ENM/supervisor architecture discussion / brainstorming session

https://docs.google.com/document/d/1tEftM9-n3ObXrZ4deXms0eCm1itZJGa_cjKBlAJBj6Q/edit

===

### 5 Jan 2017

* API request max body size
  * **[Action item]:** Start truncating the logs at 512 kb and keep latest
* resinhup - ENM fusion - brainstorming session

https://docs.google.com/document/d/1sP9oGmySedmjCQxGlpwIQlQyqiSy9Szk3oNDzptU6vc/edit

===

### 3 Jan 2017

* Discuss golang ENM interface sharing
  * **[Action item]:** Bluetooth/nodejs related issue that needs more research (Joe)

===

### 20 Dec 2016

* BBB image that boots from SD card (needs to autoboot, can't require button press) served from the dashboard
  * ~~**[Action item]:** Write spec~~ https://github.com/resin-io/hq/pull/521 https://github.com/resin-io/hq/pull/520
* Discuss how the hostname should be set in resin2.0 (resinOS or base images) Also the hostname format, the current format is <device-type>-<short UUID> but resinOS2.0 uses only <short UUID>
  * **[Action item]:** More investigation needed on how changing the hostname from the container affects the host OS one (are they shared or not?)
  * **[Action item]:** Detect if we're running a recent OS and if so, do not change the hostname from the base image. The advertised hostname can be either <device-type>-<shortUUID> or resin-<uuid> (TBD)
* rdt promote
  * **[Action item]:** Reiterate on the idea of users having their own openvpn server + ability to do openssh connection on the device, essentially a proxy - as part of resinOS story there'd be a resinOS control server, which basically is vpn and ssh that they can use to get into the devices. We could provide an easy to set up openvpn/command&control server (e.g. for aws) and also have a deployment guide on how to get to production and the steps to get access to the devices (using the provided resinos control server)
  * **[Action item]:** Create spec on preparing preloaded images from a simple server
* Update strategies
  * **[Action item]:** Continue work on document on data model for multicontainer/multiapp for GE
* Deltas mad science and resumable deltas
  * **[Action item]:** Need to think more about resumable deltas and consider configurable timeouts
* Decide whether to go ahead with https://github.com/resin-io/resin-supervisor/pull/273/files (making the supervisor ignore resinhup images - which has a bit of an ugly hardcoding)
  * ~~**[Action item]:** We can pass for now~~ PR closed - https://github.com/resin-io/resin-supervisor/pull/273#issuecomment-268359835

https://docs.google.com/document/d/18eIBG-rpFMQnLrU-HHCPDAg6EM4VvV_iZiSVV8ggO0I/edit

===

### 15 Dec 2016

* Setting up a OAuth 2.0 provider on resin.io
  * **[Action item]:** Let's create a spec ([hq/509](https://github.com/resin-io/hq/issues/509))
* Device Actions
  * **[Action item]:** Make a list of all 'scripty' actions (`leech`, `btrfs-fix`, `resin sync` etc.)
  * **[Action item]:** Create a spec
* Device Types ++
  * **[Action item]:** Create a spec

https://docs.google.com/document/d/1HQymDK7SAqxGuZgqon-jEpfThUkLHKs-MhT54d0etOY/edit

===

### 13 Dec 2016

* Migrating to resinOS 2.X (remaining tasks & providing images as non-recommended entries in dashboard)
  * **[Action item]:** Need jenkins jobs to produce images (3 initially, then 4) (related to https://github.com/resin-io/hq/wiki/Architecture-Calls#28-29-nov-2016)
* Aggregating all remaining issues in a github milestone
  * ~~**[Action item]:**  Need a spec that will aggregate the list of remaining items for 2.x~~ https://github.com/resin-io/hq/pull/505
* Discussion on multicontainers, user-defined mounts, what we allow/disallow in resin-compose.yml

https://docs.google.com/document/d/1eKftQ1aduV0g1wqMupJepItwIYRGvVHj2c7pn2twFzY/edit

===

### 12 Dec 2016

* Supervisor / Device State
  * **[Action Item]**: Need to check the current codebase and get a definitive list of things that have state in the device/supervisor in order to move the rearchitecture discussion forward.
* Image maker: discuss the future of distributing .zip files
  * **[Action Item]**: re-enable .zip image downloads - this isn’t super high-priority, also we still need an image maintainer and someone who is willing to tackle this
* backend/git/proxy: resin-base, resin-closed-base, resin-closed-ssh, and generalising usage of ssh
  * **[Action Item]**: Remove resin-closed-base dependency from git & proxy
  * **[Action Item]**: Extract a docker image from resin-git with just the SSH bits
  * **[Action Item]**: Explore the Go-based SSH server as a backwards compatible, easily extendable, single-package solution to replace the current OpenSSH/libc intricacies 
* Automating changelog/version commits to master
  * **[Action Item]**: Move forward with automated versionist commits to master using github hooks - Still To-Be-Defined is the service (e.g. heroku/AWS) where the automated versionist bot will be hosted

https://docs.google.com/document/d/1x1cI-OQpk3-6mz2bxmvmTU2P3exWAmdFjQIWnPiH3RI/edit

===

### 8 Dec 2016
* Resin-on-Resin deployment
  * **[Action Item]**: Keep going with resin-on-resin for high-level stuff (marketing/ui etc.) and experiment with starting/managing a kubernetes cluster
* Supervisor Rearchitecture
  * **[Action Item]**: Iterate on the supervisor rearchitecture spec - aim to re-architect supervisor internally before breaking it out to separate modules and rewriting them as services.
* Morty compatibility layer
  * ~~**[Action Item]**: Aim to resolve this by end of next week (need morty for a ge board in january)~~ - PR: https://www.flowdock.com/app/rulemotion/resin-devices/threads/DAYyep0UXchvYPsWAmEFyzV9gAO

https://docs.google.com/document/d/17O-M8D8eYqGVXkbJP3CnYJ7BSGjd56rjXlfGcyw5twc/edit

===

### 5 Dec 2016
* Zendesk / Front Integration
  * ~~**[Action Item]**: We need to look into Zendesk/Front APIs, discuss in specific what needs to be done and see if we can find a better solution.~~ Zendesk/Front integration issue is fixed

* Supervisor Update lock
  * ~~**[Action Item]**: We need to write a spec~~ - https://github.com/resin-io/hq/pull/488

https://docs.google.com/document/d/1-07hveuJd0Zw8ou-iV8cN7qLhNOj88HI34rJtiW3kYU/edit

===

### 3 Dec 2016 (ad-hoc @ London office)

* Discussion on Device Image Community Contribution workflow

https://docs.google.com/document/d/1daJJGYVuJXir-FRYyQygdMsukJrYlTnPfviXDUYRPuY/edit

=== 

### 28-29 Nov 2016

* Discussion on introducing a VPN resin-redirect component to work around restrictive client firewalls 
  * **[Action item 1]**: We need some experimentation to get a better idea of the work needed before writing an actual spec:
    * Is there a firewall that will easily accept a hostname and handle changing IPs
    * How are the user application containers affected with regards to network access?
* Question by Shaun on multicontainer support: Will the devices have compose on the actual device to run the composition of containers and related stuff (also applies to resinOS)
  * **[Action item 1]**: We have to try and understand all pieces and start working towards multicontainer support, which we must have ready soon
  * **[Action item 2]**: Reevaluate the alternative ways of running docker compose on resin.io / resinOS devices
  * **[Action item 3]**: Research the alternative of having writeable usb device
* Automatically deploying resinos images
  * **[Action item 1]**: Write a spec on the changes required to jenkins/image maker to support automatic resinOS image deployments
  * **[Action item 2]**: Implement/Deploy an hybrid image maker, with 3 subfolders coupled with the current structure
  * **[Action item 3]**:  Work on resinos.io to automatically pick up new versions of deployed images
* Morty PR and discussion on having a compatibility layer
  * Discussed a few items but meeting was postponed for the coming Monday

https://docs.google.com/document/d/18lYiY1Mi6qkVKptfcd7nmmVi4n2O7xOnrugIa6sMnxI/edit

===

### 24 Nov 2016

* Allowing users to select and change their usernames
  * ~~**[Action required]**: Draft a spec~~ - https://github.com/resin-io/hq/pull/450
* Discussion on understanding the Etcher/resin.io connection
  * https://docs.google.com/drawings/d/1ulscHze6R2pG2-7y8MY0K1KwuoCg4Yn7UyaECMzGd0w/edit

https://docs.google.com/document/d/1yXzolkALQSw6DkbcoJ9oBQ2IsY_B4iWNlwicdYPr9Do/edit

===

### 21 Nov 2016

* Combining emmc and sd boot images
  * **[Action required 1]**: Introducing the notion of flashing will require more steps on the hostOS; more research is required on this item because these steps are not obvious at the moment
  * **[Action required 2]**: There was discussion on contacting OpenROV to figure out exactly what they need and how close they are to the particular device type (beaglebone)
  * **[Action required 3]**: Also need to discuss more on flasher-type devices in general
* Signed images (EVRYTHNG request)

https://docs.google.com/document/d/1KTDulTx1ojVXXyvFD1sdKpq3mn7qOv18leheGh7rbDE/edit

===

### 15 Nov 2016

* How to mark Resin 2.0 development devices
  * ~~**[Action required]**: Write spec on how to mark dev/prod and debug~~ https://github.com/resin-io/hq/pull/505
* Handling transitions when moving Apps and handling update locks
  * **[Action required]**: Write spec on how the supervisor should automatically purge /data when an app is moved
* Need to improve instructions on boards that support multi baseboard
  * **[Action required]**: Should specify the TS baseboard in instructions
* Process/Roadmap tracking
  * **[Action required]**: Create excel sheet to facilitate ticket ranking from all facets (marketing, sales, devops, security etc.)
  * **[Action required]**: All facet stakeholders should pick their top 5 issues, and add weight (1-5) in the excel sheet

https://docs.google.com/document/d/1kMlpNSqW7YWOL3hcmsXEkuKUiphztibyjRkMfc-CRog/edit