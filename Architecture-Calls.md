## Description

Architecture calls take place several times a week (usually 2 or 3). It is the time and (virtual) place where we generally try to come up with an action plan to tackle non-trivial technical issues across the resin.io platform. This call is usually technically oriented and the subjects range from resin.io backend, devices, cli tools etc. Everyone from the resin.io team is welcome to join.

### Using the #architecture Flowdock tag

Many interesting technical discussions often produce very long threads that are difficult to follow, so what we do  instead is have a call, keep meeting minutes and come up with an action plan. There are no hard-defined rules on when a Flowdock thread should be discussed in an architecture call, but if you think it should, please tag the thread by adding a comment with the `#architecture` tag **and** a small summary. The reason is that Hubot picks these `#architecture`-tagged comments up and sends them to the [`architecture` FrontApp inbox](https://app.frontapp.com/inboxes/shared/d_architecture), which largely forms our next meeting agenda.

`#architecture` and Architecture Calls related discussions live in the [`r-process` Flowdock channel](https://www.flowdock.com/app/rulemotion/r-process).

### Running an architecture call

The steps to run an architecture call are:

#### Before

1. Get open architecture call tickets from https://front.frontapp.com/inboxes/shared/d_architecture and create the call agenda in r/process (e.g. check the top message of this thread https://www.flowdock.com/app/rulemotion/r-process/threads/gC4vzLEKnfI5lqa3Qeo82LD2Sbf). When creating an agenda, the main concerns are:
    - Add a short description with a link to the respective Front inbox ticket. This is so that all interested parties (and often the person who raised the item in the first place) can access the original ticket with the context it brings (e.g. the flowdock thread where the `#architecture` tag was raised)
    - Ping the person that raised the issue along with other people that were mentioned when this call item was first raised. This information is also available in the `Reporter` and `Mentions` fields in the Front ticket summary (e.g. https://app.frontapp.com/open/cnv_66m63b)
    - Release the agenda in advance (usually 1-2 hours earlier is fine) to give time to people to ack on whether or not they can join the arch call. If people that are required for a raised item cannot attend, the respective item is postponed for a later call.

#### During

1. Have the agenda available and pick the next item for discussion. This happens on a case-by-case basis based on the availability of people that have to attend specific items. If there are no other constraints, we try to disengage people from easter timezones first, so we pick items accordingly.

2. Keep notes of the items discussed and make sure that action items, if any, are also logged. The reporter of the original issue can often help with clearing the action items, and even providing their own notes.

#### After

1. Add notes, the flowdock thread and a link to a recording (if it exists) in this wiki page. Please follow the template that is used in the recent calls.
2. Paste the same notes in the r/process room by prepending them with a line like `#meeting-notes for 12 Jul Arch call`
3. Archive the Front tickets of items that were discussed by first adding a comment with a link to the notes of the respective arch call (e.g. https://app.frontapp.com/open/cnv_68uhpn)

### Architecture call recordings

We are uploading architecture call recordings as a convenience to people who might not be able to attend a specific architecture call and want finer-grained details that cannot possibly be captured with the overview notes. The calls are brainstorming sessions and the recordings should be treated as such.

### Pinned Agenda Items

- (None currently)

## Recent Meeting Notes

### 01 Nov 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/GDTrhTD9QbxQ8m-N7zRfTYk2yUt)
- [Minutes and recording](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLdEVIVW9nTzJrRFE)

Discuss our plans for implementing the new device support process, as discussed in summit cc @alisondavis17 @agherzan @floion @jviotti @shaunmulligan

* See https://docs.google.com/drawings/d/16qZRQAoM0MESF91_S7M6fNKjcjbwP5ZlOk0BJ17FHz4/edit
* Many of the steps in the diagram should be as simple as creating the respective github repositories
* The diagram addresses problems like visibility of the device support process (active, pending etc.)
* https://github.com/resin-io/contracts/tree/master/contracts/hw.device-type has the OSS device types only (we’ll need a separate for private ones)
* We want a central private place to track all device types 
* We are transitioning to make device type support like any other feature, a feature that product team runs
* How is adding e.g. rpi4 a product feature? Discussed why tracking device support should be handled by the product team.
* Device support is not very predictable (tx2/quark) , need some kind of PM to coordinate the efforts in that facet.



What work is left to do to get resinOS running in a docker container. There are several projects that would benefit from a containerised resinOS, so I want to understand what the current state is and what still needs to be done. cc @shaunmulligan


* Current state: a PR from Praneeth
   * Probably not an approach we want now
* We need this for Porsche / Pilot project for now
* The output of Yocto process should be a container. Currently one of the outputs is one
   * Every other output must be generated from the container output
* The container output should have some properties
* Automotive domain development is super slow
* Porsche already has docker in their architecture
* Aruba/Toyota also asked for that
* The gist: The are tied to a hostos they can’t get rid off and want to run resinOS on top
* Useful for cli option (resin spawn) and stress testing as well
* In a perfect world, we’ll have a container that can
   * Serve as a HUP package (to update a device)
   * Run on its own (act as a device)
   * With the right privileges resinOS container can update itself using the underlying docker daemon as boot loader (container self update is a later consideration)
* We’ll need this for a reasonably advanced version of host Apps (not that far away)
   * Actions(@agherzan)
      * Write a spec 
      * Additional piece to this spec, turning this in an image - container is the only output of the Yocto process and the image maker turns this in an image later, when it needs it.
      * Desirable result of this container: docker pull and docker run with a proper config.json should show up in my dashboard , with no additional requirements


AI from last architecture call about managed/unmanaged unification: find bits that need to go in the API. cc @agherzan

* dropbear has the fallback pubkey in /var/lib/dropbear/authorized_keys -> /root/.ssh/authorized_keys (key will need to be in the API)
* packagegroup: +resin-connectable (build system generates a conf file for this as a list a systemd service that are specific to managed - supervisor and openvpn) +resin-provisioner
   * looks completely unneeded as supervisor will run unconditionally and openvpn will run based on the existence of a conf file
* openvpn installs on managed builds certificate, conf file, services (api will need to provide the configuration file
* Provisioner should be written in Rust
* It’ll be part of the new supervisor if done properly
* We’ll put some versioned metadata in the api for unmanaged->managed transitions
* Ask an endpoint what versions/ranges are supported. resinOS will make the request and it already knows the configuration metadata version.
* We’d like to avoid modifying meta-resin, only the metadata
* Hairy situation where currently openvpn configuration refers to files . How do we define this? Should be doable with a sensible JSON schema. There are other ways around, we can improve on an initial schema.
* We’d like the configuration to have sections (openvpn -> up/down sripts, certificates etc.)
* Actions (@agherzan)
   * Define a schema for expected metadata from API. Must be a versioned structure that will allow adding fields w/o breaking backwards compatibility. Probably a JSON object 
   * Every resinOS version will work with a specific version of the configuration schema
      * Assume we no longer use OpenVPN and use another one. Now the configuration file will have a new version, because we need a new configuration from the API (for the non-openVPN service on the device)


Discuss how to have a more generic x86 image with EFI and MBR support (and have something reasonably supportable rather than telling people to try the NUC image) cc @mccollam

* We want to move forward with this
* Want to have a hybrid image to support efi/mbr
* We could proceed with keeping the same slug and rename the device
* When we implement device types/OSes we’ll be able to fix device slugs
* Are we compiling NUC for core i7 ?
* Actions (@agherzan)
   * We want the same image to work in both modes and want to change the name
   * Rename the device type to x86_64
   * Yocto machine name and compilation options must use generic arch (not specifying i7) and that should be the architecture. The problem is that i3 is not forward compatible with i7 (there are new opcodes/instructions in i7)
   * Also change the logo

---

### 30 Oct 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/V0nO_CAG0txvm81ATirHoFBG7fQ)
- [Meeting notes](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLMjk3Tkh5S1NBbGc)

Discuss new device url schema using UUIDs instead of the numeric IDs.  cc: @pimterry @thgreasi

* We can stick with the current format, but it’d be nice to change it
* Actions
  * Work on moving to the new url schema for the device page that only has a UUID as a parameter.
  * Continue supporting the old url schema by transparently redirecting to the new one.
  * Confirm with @Petros whether the DB has real devices with wierd custom UUIDs.
  * Add the hook in the API to ensure that the UUID passed during device registration is in a proper format (32 or 62 hex chars).

If a user stores a file at /data the container will refuse to come up because of bindmounts. Do we get the builder to refuse this image if /data is a file at the expense of a little bit of usability? cc @camerondiver

* Option 1 - run container without /data
* Option 2 - ignore file and put the directory anyway
* A normal bind mount won’t work out of the box. One things we could do on the builder is , as a last step always create that directory or do that as part of the supervisor
* Actions: 
  * supervisor should detect if a file exists in a bindmounted location, and print a warning, and start the container with a warning being printed
  * multicontainer builder will check volume locations and also the produced images and print warnings at that point as well
  * See: https://www.flowdock.com/app/rulemotion/r-supervisor/threads/E3n0_6LKdstGR2fWRNsAtckSCm0
https://www.flowdock.com/app/rulemotion/r-supervisor/threads/E3n0_6LKdstGR2fWRNsAtckSCm0

SyncBot & Discourse 'all users' token cc @sqweelygig, @afitzek

* Action
  * Use the all users token, also research if we can have a reduced permissions all users token

Discuss how delta hostos update images should be provided, so resinhup/hostapps-update can take advantage of them. cc @imrehg

* If you want to do non delta updates you can just use dockeruhub images.
* When it comes to delta updates, there probably have to be discovery/generation mechanisms.
* This will tie up with the same system that we’ll use for use images

Provisioning keys don't work in resinOS and are reverted in production cc @petrosagg @agherzan

* Needs meta-resin release and api changes
* Api was not picking up new credentials
* Part of the problem was with the openvpn client
* Device team needs to know exactly how the whole provisioning process works
* Actions
  * Deploy API so next version of resinOS will have proper provisioning keys (meta-resin 2.7.5, so 2.7.5 based release of all boards)
  * Device team must have a clear understanding of the key provisioning process / we should take actions like more documentation if needed to make sure this happens.

Discuss Zynq 7000 secure boot integration from cryptotronix cc @afitzek @agherzan @imrehg

* Action: Set up disco call

As we move to keyframes without contracts (yet - a temporary situation), we run into a few problems. As a short term gain, we could keep the current deployment process, but include a NotifyBot endpoint that takes component, old version and new version, which resinctlcould use during deployments to ensure PRs/Front convos are updated.cc @hedss @brownjohnf

* Deployment problems with resinctl
* Without contracts, keyframes are going to be hard to do in an automated fashion
* It shouldn’t fall to anyone to push deploys forward to production. Some automation should indicate when something’s ready for production. Everything marked as tested should be deployable to production

* Action: Will be discussed afk

Discuss running resinctl as server on Heroku cc @brownjohnf

* Action: Will be discussed afk

---

### 23 Oct 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/rnA5HZp_4XEdN-FhBfc2H10eVwF)
- [Meeting notes](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLZ0RZX0QtYmhKelU)

As we move to keyframes without contracts (yet - a temporary situation), we run into a few problems. As a short term gain, we could keep the current deployment process, but include a NotifyBot endpoint that takes component, old version and new version, which resinctl could use during deployments to ensure PRs/Front convos are updated cc @hedss @browhn


* Maybe a good interim solution would be to have an API in NotifyBot
* Suggestion: resinctl calls endpoint in NotifyBot with component, old version, new version
* Postponed for next week




Discuss how to represent current state in some cases when there might be two containers for the same imageId on a device (e.g. handover) cc @CameronDiver @pcarranzav
* Two possibilities:
   * Add other id instead of image id (e.g. container id) that won’t be relevant to the API
   * Force one image install per container
* Why is this in scope of describing the handover in the API?
* One choice is to simply not do it
* We are probably looking for a device release id
* Terminology: In the model we have a release (multiple images) i.e. a collection of images
* Action/Proposal:
   * Add a release to the image install
   * Add a rule that enforces the consistency of these two pointers
   * Supervisor will mutate the existing image install in the case a noop installation happens


Discuss metrics related to pubnub replacement cc @flesler
* Can we enable wildcard subscription in PubNub?
   * Probably not due to security considerations
   * Action: test it on staging
   * If we can get a wildcard that works for a specific key, we’ll do it (preferable solution)
* Alternatively we can get all channels from the API
* Action
   * Test API in AWS playground


Discuss removing v1 micros api and the delete/update hooks cc @josephroberts
* We want to remove delete/update from v2
* We shouldn’t keep v1 
* We’ve only done some simple demos in Merck
* Action
   * Update Merck’s demo (Joe)
   * Remove /v1
* Second item: remove update hook
   * The update hook fires when there’s a new update for a dependent device
   * Suggestion: Users should poll. 
   * Counter arg: users can simply ignore supervisor’s update events.

---

### 18 Oct 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/uT1-Zp1yC2wLXGoNWXKGW9wvU9-)
- [Meeting Notes](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLaHVRRDN4QjZraDg)

[How we can migrate BBB and RPI3 to overlay2 storage driver and what implications it would have](https://app.frontapp.com/open/cnv_8s2bbl) cc @shaunmulligan
* Brainstormed on overlay2
* Docker is now recommending overlay2
* The problem that we will have to solve is the migration of the docker storage when we actually do the hostOS update. Next time the device starts up , it'll be nice to a) don't download everyhing 2) not leave garbage in data partition
  * Fortunately, aufs/overlay2 have very similar FS structures, so we can write a utility to do that.

* Actions
  * Write the migration tool
  * When we update from a AUFS resinOS version to an overlay2 resinOS one, we need to make sure this data partition migration is performed
  * Not a high priority

[Discuss Orgs spec  roadmap](https://app.frontapp.com/open/cnv_8sheq9) cc @shaunmulligan @afitzek @thgreasi
* Brainstorming Session for the most part of the arch call (1 ½ hours)
* Spec: https://github.com/resin-io/hq/pull/887
* Version 0 for the PR
* Version 1 change ownership of apps and devices and add orgs membership relation with rights per user
* Version 2 add teams for application scoping


[Discuss how to handle private device types when hostapp-update need the relevant reinos images in a registry accessible for the device. Conundrum as it has to be private but accessible for the device to pull from](https://app.frontapp.com/open/cnv_971mrt) cc @imrehg
* Planning a DT update for demo of hostApps
* For demo purposes, it could work to have a private docker repo and login from the device in that private docker repo
* Can be handled on demo level, not on production
* DT devices are registering as Hummingboard. The device type conf on the device should have the correct device type name
* If resinHUP based its decision based on the API device type it’d be a problem, but now it shouldn’t
* Actions
   * Build a blacklist for self service resinHUP not running in specific device types. E.g. checking if device-type.json config is in agreement. If not, print an error message
   * 

[Discuss the next steps for Pine. The choice being moving towards GraphQL support as an OData alternative or sbvrJS which is meant to be an alternative to plain SBVR to express the model](https://app.frontapp.com/open/cnv_97jhpl) cc @nazrhom

* Options
   * GraphQL support
   * sbvrJS
      * expressing sbvr in js
   * Column-based permissions


* Actions
   * We could proceed with design for sbvrJS
   * Batch request support
   * GraphQL is more straightforward, something we could start implementing now
   * Learn more about GraphQL APIs
      * https://graph.cool
      * http://graphql.org/learn/

---

### 16 Oct 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/GYI5AlFnv0ZZZuZfzG6VWvS4yxX)
- [Meeting Notes](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLUUZ3LXJOLXQzbWs)

[Now that React has an MIT license, I’d like to use it for our components library and dashboard instead of Preact. This will improve development speed as we will have better third-party library support and better TypeScript integrations.](https://app.frontapp.com/open/cnv_8z7pcx) cc @lucianbuzzo


* Action
   * Move to React


[Moving builds that require private credentials (e.g. npm/Front) from CircleCI to Concourse](https://app.frontapp.com/open/cnv_8p1a3l)  cc @hedss @afitzek


* CircleCI can expose sensitive vars on PR build, before merge
* Forked PRs are a resolved problem, we only have an issue with PRs from within the team
* Most projects require private credentials (e.g. projects that require NPM publishing)
* Possible solution
   * Every build creates an artifact
   * There’s a separate process that gets this artifact and deploys it in a staging area
   * Long term solution - do we have something that can run now?
* Action
   * For now we will consider keys stored to circle being secure, we already share keys with the team
   * We accept this window
   * Sensitive credentials: dockerhub, npm (rust?)
   * We can use Circle to automatic publish/deploy modules/components


[Neon for Reconfix issue: Neon currently does not allow persistent handles to v8 data. Essentially, this means that Rust code can hold references to things like functions outside the current call stack](https://app.frontapp.com/open/cnv_901fep) cc @abrodersen
* Not a reconfix blocker
* Neon does not allow to reference native js objects


[Discuss spec on replacing pubnub](https://app.frontapp.com/open/cnv_8zhrrd) cc @flesler
* Brainstorming session
* Idea: use in memory, volatile storage
* Mentioned using having the UI connected with a websocket connection to the logs server (logs.resin.io) and have device logs streamed directly to the clients (instead of having the Dashboard polling)
* 1 log line per row - is it a good or a bad idea?
* Need more concrete metrics on performance (space and time)
* Currently the db averages ~5.5iops, with a baseline performance of 300 iops (it uses a credit system so can burst up to 3000iops for periods as need be)
* 829.6M messages in PubNub over the last month
* Estimated 320 msgs/second
* Devices send an estimated 1 mesage per 15 seconds
* We don’t have an estimated log lines per message
* Action
   * Projecting metrics has not worked well for us in the past, we should not make vague assumptions
   * Need to know limits, the usage we currently have, figure out the guarantees we want to have
   * Get metrics from Pubnub, create a model
   * Check if we can use automatic sharding
   * Tests to try:
      * AWS playground DB / pine logging model
      * Check Partitioning in RDS
      * Putting PubNub load in test DB
      * Monitor iops in AWS  

### 09 Oct 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/Z5B3TISRTSozD1vcmw2TWPFW6UP)
- [Meeting recording](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLX2ZHY0Q2eldLbUU)

[currently when generating a config.json for an unexpected os version the api defaults to 1.x resin os settings, ie registry v1, should it default to newer versions instead?](https://app.frontapp.com/open/cnv_87uymp) cc @page-

* You can download config.json but for any version
* The endpoint should definitely not give out the old api keys
* Action
   * If we don’t specify a version to the endpoint, it should default to registry v2 and provision keys

[The API attempts to contact both Mixpanel and geocode hosts. Depending on the way DNS has been setup, this can cause timeouts in an airgapped DevEnv (ie. the OnPrem) which affect responses from the API (including timeouts). There are a few possible ways forward (configurable hosts, making request attempts optional).](https://app.frontapp.com/open/cnv_8c6juh) cc @hedss @page-

* Hedss probably track it down this week
* What it probabaly comes down to is
   * Create application, attempt to download, it will always blocks
* Actions
   * Remove mixpanel hooks wherever they are blocking the request
   * Make sure there’s proper (i.e. bigger) timeout for DNS resolution in general 

[Discuss agile licensing next arch call ](https://app.frontapp.com/open/cnv_8c9rtl) cc @craig-mulligan

* Related to Agile EU project
* Using EPL license 
* Asked that they use Apache licence, they refused
* There’s code we’ve written for Agile and they want to license it as EPL
* The worrying part is that they need some update mechanism implemented. This piece of code will be part of our contribution.
* Actions
   * We’d rather fight the fight of not licensing under EPL and use Apache instead
   * Need to find out if we are obligated or if they are simply pushing for it
   * Need to setup a call w/ Agile

[Raspberry Pi Compute Modules require a specific dt-blob.bin to be put on the boot partition in order to define the PIN mappings that make the Camera and Display work. We need (ideally) to find a way to make this mechanism dynamic so that we won't be required to make additional device types. This also affects ofc Amber.](https://app.frontapp.com/open/cnv_8g2k1d) cc @curcuz @agherzan @petrosagg
  - More info here: https://www.raspberrypi.org/documentation/hardware/computemodule/cm-peri-sw-guide.md

* There’s a dtb file we need to drop into the /boot partition
* We want mixed fleets (Ambers and pis, for instance)
* In that world, a generic OS might still need some specialization (specific things for specific devices)
* On the device itself, apart from the OS, we need to store , at least a copy of the device type description (e.g. this is an Amber). For resinOS , when it is Amber it means that we need to copy the DTB blob to some specific location.
* Actions
   * Prioritise:
      * Autodetect / identifying the device through it’s hardware/EEPROM, 
      * Investigate if dynamic dtb dynamic loading can work from userspace. If it’s a kernel module we can ship it with resinOS and it’ll work
   * If autodetect and/or dynamic dtb are not viable solutions, we’ll move with the subtype alternative (which we’ll need anyway)
      * Extend config.json with device-subtype. Part of the update mechanism is:
         * Check subtype, if it’s an Amber copy the dtb to the specific location
         * In the download screen we’ll probably need to specify that it’s an Amber

[Discuss the adding of a resource to the multicontainer model which holds information about the state of a dependent app download (and 
other metadata?](https://app.frontapp.com/open/cnv_8hxgtd) cc @camerondiver @pcarranzav

* When the supervisor downloads either managed app container or app container it uses the same download progress
* Possible solution:
   * Hard coding dependent devices in the model
* We don’t want special cases in the model for dependent devices
* Need more time to think about it

[We've decided that we do want labels to be a first class citizen in the model, but it's not obvious where they should go. They get defined in a composition, and attached to a service, but if they are attached to a service in the model, it implies that they will also be applied when the matching string is taken out of the composition.](https://app.frontapp.com/open/cnv_8jugf5) cc @camerondiver

* In the docker compose file (i.e. the composition) you can add labels for features like BT, access to supervisor etc. It comes from a release.
* We want to add this information in the API. We have a composition resource in the API
   * Clarification: it is not a resource, it’s a field. There’s a composition object.
* Need to bring the model discussion up to a product/arch call
* Are images immutable?
* If the images are immutable, do we share image resources between releases that didnt change the image?

[Use the `@sha256:[hash]` section of an image to allow the supervisor to know whether to update an image on-device? We will create a new Image entry in the API to keep things simple, and the supervisor will still know what's going on](https://app.frontapp.com/open/cnv_8jzgn5) cc @camerondiver @pcarranzav

* Take context from the supervisor
* If it’s only for the url, we probably don’t need a separate model
* Action
   * Let’s store hash as a separate field
   * If for whatever reason we change registry urls, we’ll keep the same stuff
   * Docker hash should always be the same

**USB-Boot check in / troubleshooting session**
* We’re sending over two files to the device
   * boot-code.bin
   * Start.elf
* It could be that the difference from usb boot vs starting from emc storage , is different start.elf
* https://www.flowdock.com/app/rulemotion/r-etcherprv/threads/0pb6BQn2eT1Q1WdW9kWy7D2gv2S

### 04 Oct 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/HlZSCeLUEdiaix6Yq99FuDr1Jvg)
- [Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLTENKMVhsekxma3M)

[Discuss building a unified version handling library](https://app.frontapp.com/open/cnv_7ntxrn) cc  @jviotti, @lucianbuzzo @pimterry

* We need function for semver, dot seperated numbers, resinOS, ubuntu specific, dates etc.
* Maybe the interface should be two functions
   * A comparator function
   * A validate() function (is it valid resinOS, dates etc)

* Actions
   * rename resin-semver to resinos-version (or sth like that)
   * Contracts need to be able to choose between versioning schemes and use appropriate ‘compare()’ function
   * Would it be possible to do versioning comparison in contracts this out of the job?
   * It is, but what happens when the algo gets it wrong?
   * We could use a fallback option and let the user choose their versioning scheme

[Moving forward with mixpanel migration to handle username changes, which is the current blocker for app/device transfer](https://app.frontapp.com/open/cnv_85518h) cc @pimterry @flesler @izavits

Actions:

* @izavits to look into mixpanel migration (should be orthogonal with other changes in the API/supervisor)
* See spec: https://github.com/resin-io/hq/pull/938

### 02 Oct 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/FBbdTK4Xga_qPqxGqQr4nQpk4pB)
- [Meeting recording](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLYThBaW9fT2luTTg)

[Way forward for managed / unmanaged unification.](https://app.frontapp.com/open/cnv_7ruhid) cc @agherzan

- Need specific API endpoint
- How would you configure credentials for specific API key
- Need to configure:
  - Public ssh key
  - Config.json
  - @flesler or @dfunckt can help for the API side

[Discuss how application/service restart will work on multicontainer.](https://app.frontapp.com/open/cnv_7gnxcx) cc @pcarranzav @camerondiver

Currently we use an env var to do supervisor restarts
- **Actions:**
Use a supervisor endpoint for this action

[Discuss the behavior of local mode setting in multicontainer](https://app.frontapp.com/open/cnv_7gnxyl)

- Brainstorm

[Discuss the folders to use for app-wide communication with supervisor (resin-updates.lock) and service-wide (resin-kill-me)](https://app.frontapp.com/open/cnv_7gnzw7) cc @pcarranzav @camerondiver

- Brainstorm

Files to use:
/run/resin/service
/run/resin/app

[Discuss adding labels to the model]()

- Brainstorm

[What guarantees do we give our users about unversioned API endpoints, is there a way they can use these safely, and how would we inform people of breaking changes in them?](https://app.frontapp.com/open/cnv_7wbnm9) cc @pimterry

‘Offending’ endpoints
https://api.resin.io/download-config
https://api.resin.io/whoami
https://api.resin.io/device/register
https://api.resin.io/application/APPID/generate-api-key

- In sales convos we mention that the CLI and SDK are stable interfaces that users can rely on
- If users start using random things it’s hard to keep track and their apps will break
- Even if the CLI breaks we have a way to notify users of new CLI versions

- The problem is that we’re planning a CLI redesign that will break the current command interface]
- We should document and version our API endpoints
- DT use whoami, device register, generate api key endpoint and a few more. The generate api key is already deprecated. The user’s argument is that the CLI is hard to use as a dependency
- There’s a new endpoint to get provision key
- The problem is that if a user downloads an old resinOS version, that version will still use the old endpoint (https://api.resin.io/application/APPID/generate-api-key)
- In fact, new resinOS versions still use it but it’ll be deprecated in next versions

- **Actions**
  - Endpoints need versioning 
    - https://api.resin.io/device/register
    - https://api.resin.io/whoami
    - https://api.resin.io/download-config 
    - Deprecate https://api.resin.io/application/APPID/generate-api-key and /api-key/application/:appId/provisioning cc @page-
    - Let users know that endpoints will be versioned cc @afitzek

[Discuss the how SyncBot should reconcile the difference between Front, Flowdock and Discourse’s philosophy on hashtags.](https://app.frontapp.com/open/cnv_7qpfdp)

- Brainstorm


### 25 Sep 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/wIgR2fHouOl6H8HPZiwnlYs89M1)
- [Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLaDkzMEVwTFloWWs)

[Discuss dropping fingerprint checking from 2.x](https://app.frontapp.com/open/cnv_7dsvvp) @imrehg @agherzan

* Can be dropped for hostOS
* We don’t need to use fingerprints for hostApps
* Actions
   * Drop resin-root/resin-boot fingerprints in hostApps resinOS versions

[How would resinhup need to change (or the next generation be architected) so hostOS updates are possible in an on-premises deployment that we are working on.](https://app.frontapp.com/open/cnv_7fnavt) @imrehg 

* Actions
   * We have /resinos namespace in dockerhub, we should follow a similar approach in our registry
   * We deploy with docker push

[How would supervisor updates and resinos supervisor release info work in the world of host apps?](https://app.frontapp.com/open/cnv_7fmrtl) @imrehg @agherzan

* Actions
   * Spec/arch doc on:
      * supervisor.conf reflection of latest version from api
      * supervisor.default.conf - yocto-installed version
      * @agherzan is on it
   * hostOS updates don’t touch that file, they work with the default one

[Discuss how the sidebar should manage authentication to access our support/sales data](https://app.frontapp.com/open/cnv_77ley1) cc @pimterry

* Actions
   * We are fine with using API endpoints for 
      * salesforce proxy
      * App statistics
   * Put versions for custom endpoints

[Discuss building a unified version handling library](https://app.frontapp.com/open/cnv_7ntxrn) cc @pimterry @jviotti @lucianbuzzo

* Discussed resin-semver module
* Contracts can work with or without semver (not tied to it)
* Context: https://www.flowdock.com/app/rulemotion/resin-frontend/threads/nV4peeCwbBU5NlAsv7T5E4sdMKh
* resinos-version-utils would be a better name probably. resin-semver is a confusing name
* Conversation will be continued

[Discuss space limiting for user applications, what options we have on the table currently, or what's planned for multicontainer](https://app.frontapp.com/open/cnv_7gjz4l) cc @imrehg @pcarranzav @camerondiver

* Technology we can use is fs quotas. ext4 and docker support is available after certain kernel versions

### 06 Sep 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/ACM32KhlOCvmwTxmyg3F1ffezxz)
- [Meeting recordings](https://drive.google.com/open?id=0B0NS-URBofBLY2RSR1BYZk16bTA)

[Discuss OSS resin process and roadmap](https://app.frontapp.com/open/cnv_6zzpx1) cc @dfunckt @shaunmulligan

* The plan for OSS resin is to make a simplified version that doesn’t need all peripheral components that we already have , ideally the less components the better
* API, docker registry should be enough. Potentially the registry won’t be needed in the future (e.g. use dockerhub or other registry)
* Still not sure whether or not we need VPN . Still hard to say if we will include it.
* There are feature that will be cut off (e.g. git push pipeline)
* We need to define what is the interface between devices/backend that currently OpenVPN implements and OpenVPN should become optional plugin to resin infra.
* For some features there are substitutes, some will be dropped
* We need to separate building and deployment parts
* For an OSS resin that you use CLI to build image, you need a way to deploy container to device. Currently this requires the builder, which is problematic
* Ideally, we’d like the API to receive image , a very simple API-based deployment flow
   * If we had that, our closed source builder can be a plugin
   * Both build and deployment pipelines should be plugins
* If we wanted to use dockerhub to store all the images:
   * When you login to docker you exchange user/pass with a jwt that has access to specific repo and has specific permissions (r/w). That jwt is all that’s needed for the docker pull.
   * We could have a simple API endpoint that will initiate request to dockerhub, hand over jwt to device and have device initiate docker pull.
   * We need to explore this path, needs more research
   * Workflow would require resin.io connect to user’s dockerhub account. They’d have to have resin-specific account
* We want to explore docker push to API endpoint
* We want a ‘private’ pinejs model, excluded from OSS (e.g. for billing)
* For non OSS resin we’d need to ‘glue’ OSS and private pinejs models


* Actions
   * Investigate how we can have api/registry only to have OSS resin
   * Key architecture goals is to keep extra stuff to a minimum. Should work with existing components , probably with alternative configuration
   * We don’t want a fork, we want to do it on resin first. Resin will be a clean extension of OSS that will utilise the OSS interface. We ‘ll refactor our interfaces wherever needed
   * Need interfaces for deployment, building, VPN
   * First step should be to identify what needs to be done (builder as a plugin, vpn interface etc.)
   * Planning/coordination with other component maintainers will be needed
   * Deliverable: a full product, an experience, not only code. Assume someone wants to set up their own instance of resin. The flows we make available with OSS resin should function smoothly.
   * @dfunckt is project-managing this

Discuss Blog cc @brownjohnf @@craig-mulligan

* Our blogs are not running in containers
* We are running in potentially conflicting dependencies in different components (e.g. node versions), and we can’t have all of them run happily side by side on the same host
* Discussed helm (https://github.com/kubernetes/helm) vs keyframes for kubernetes deployments / haven’t had time to evaluate it

* Actions
   * Migrate to mysql (from sqlite)
   * Run blog containers on GCE / kubernetes
      * Easier to setup, persistence conf should also be easier to add
      * Also good experiment for GCE
   * Investigate helm

[Discuss exploring https://cloud.google.com/logging/ for our logging, monitoring, alerting etc](https://app.frontapp.com/open/cnv_727b0j)

* Evaluating https://cloud.google.com/logging/  (stackdriver logging) as a logentries alternative
* We have a bunch of products that integrate , more or less, happiliy together (logentries, datadog, pagerduty etc.)
* Given that long-term we’re interested in GCE in the long-term
* You can use this agent on any host
* Pricing was also promising
* Discussed sysdig (looks to be more container oriented than datadog)
* Sysdig: google maps for your infrastructure ™ 

* Actions
   * Investigate both solutions (sysdig/stackdriver)

[How to best grant read-access to our DB for the analytics team](https://app.frontapp.com/open/cnv_74p4sv) cc @alisondavis17

* Tableau needs laptop to create charts
* Should we consider drop tableau in favor of chart.io
* Discussed DB read access policy
   * Not easy to manage
* Concerns were raised on Tableau usability
* Discussed Chart.io: supports github, recurly, google sheets integrations

* Actions
   * Explore chart.io / wrt to cloud - friendliness, it looks far better than tableau

[Discuss using heroku as secure enclave for bots](https://app.frontapp.com/open/cnv_75hafx) cc @jviotti

* What if we made an account in heroku with limited access and use that as an enclave w/ a git push deployment to update our bots?
* The problem is that we don’t want to have bots in the same deployment env with our infrastructure

* Actions
   * Needs more discussion

---

### 04 Sep 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/x5NvvHI0Z8EV_bFceygZfNYP74k)
- [Meeting recording](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLUG1CU21ZdDJVOVU)

[Reusable bare-minimal typings for external modules we're using](https://app.frontapp.com/open/cnv_77mpxb) cc @emirotin @pimterry

- The problem: we're using some modules that don't have native, nor DefinitelyTyped typings
-  We used to have the minimal typings for them inside of the specific projects, example: https://github.com/resin-io/resin-ui/tree/master/src/typings
- These are often only covering the parts of the package's API we're using, so are not good enough to get PRed to the original module or DefinitelyTyped
- It's not cool cause some of these modules are used across multiple packages, esp. in the SDK cluster.
  - So we've come up with the solution for the SDK cluster that we'd like to discuss and suggest for the rest of the org (or get replaced with something different). It's our own DefinitelyTyped-like repo: https://github.com/resin-io-modules/ts-types . But it does not require you to provide the complete typings

[Discuss the gooee issue with needing to add some env to uboot; we have uboot without env (using built-in env and no possibility to saveenv); they need this env to uniquely identify devices](https://app.frontapp.com/open/cnv_71yy5x) cc @agherzan @telphan @floion

Context:
* They want to inject data during manufacturing process
* Things like serial numbers (ids of devices)
* They need this info in their app to distinguish device in unique way
* The first thing they suggested us to implemented is to have this info stored in uboot env
* How will their app access this? Can an app running in a container access this info from uboot?
   * In theory, it can. Normally, even privileged containers can’t read that info easily
   * The TS device has another uboot device that can probably be used to access this data
* They could also pre-provision. The problem is that they also plan to go out and reprovision devices, which would show as a different id in our platform but will still be the same device
   * Problem: if they reprovision they use uboot anyway
* Discussed whether the device already has a unique id (E.g. cpuid?) that they can use
* Sounds like a legitimate request for hw configuration set by manufacturer (e.g. mac address)
* Should we use a config file separate to config.json to store manufacturer-specific configuration?

* Actions
   * Need a platform-wide solution for devices without uboot . Boot is most likely not the place to add this info
   * Instead of going the uboot way, we are going to build a feature that the manufacturer will add whatever env vars they need. We’ll use a separate config file next to config.json. and split config vars and env vars.
   * We’ll propose using cpuid as a unique device id


Self service resinHUP cc @imrehg @agherzan

* Actions:
   * The goal is to have self-service resinHUP (1.x -> 2.x, 2.x -> 2.x) available to our users before/around summit


TX2 - Pyro - Wifi firmware and license cc @telphan @agherzan
* We’ll add wifi firmware in resinOS 
* NVidia ships uboot binary with no source, in the new release you wouldn’t be able to flash (we’d have to exclude it)
* UBoot binary is not in the main emmc, it’s in a separate memory (spi). To flash that you have to go in recovery mode to write raw data in spi. We can’t do that because kernel can’t see spi. We can do it with their tool, but flashing procedure will be more complex. Their tool is a python tool that takes a few xml and position parts in memory. The python program runs on a laptop and the board must be in a special (recovery) mode
* Discussed if/why we are blocking in the Pyro layer
* Actions: 
   * There is no licensing problem with the new build
   * Suggestion: drop new kernel sources and see if it works. The problem is it’s not easy to test: we have to test the demos, libraries etc. connected to the kernel


[What heuristics should we use to determine what image to use as a delta source?](https://app.frontapp.com/open/cnv_76mmnt) cc @pcarranzav , @afitzek , @CameronDiver @dfunckt

- So far we've been matching by application name from the image name (i.e. if we have `registry.resin.io/appName/commit1` and we want `registry.resin.io/appName/commit2`, we use the former as deltaSrc because appName matches). But with multicontainer we'll have a different image naming scheme (have we decided what it's gonna be yet @afitzek?) and more options to choose from.
- We obviously should first try to use the previous version of the same service. Possibly we can switch to just using that directly if we know we have it instead of trying to match the image name.
- But if that's not available yet, should we try to use an image from another service, or the supervisor, or just fall back to scratch? (as we currently do). 
- And for a future version of deltas, would it be possible to tell the delta server *all* the images we have available and get the optimised delta from that?

* What’s the plan when new docker ships in latest resinOS?
   * We need to update supervisor, builder and delta server in order to produce/consume new deltas
   * For mixed fleets (e.g. latest devices w/ new deltas and old deltas/devices), we’ll have to calculate both deltas which will be a bit slower

* Actions
   * Suggestion: start simple and use the delta from same service; diff form previous to next version
   * Leave cross-app deltas for the future
   * Add 17.06 dependency in supervisor before multicontainer (we don’t want to block on multicontainer for delta improvements)
   * @dfunckt to lead v2 (docker-based) deltas (and spec)
      * https://github.com/resin-io/hq/pull/952
   * On delta schema: We should use buildId
      * Multicontainer will only use new deltas w/ buildIds

---

### 30 Aug 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/Xbc9EHI3PTBBe_M7z6eaT_PFLQb)
- [Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLcE9PZGhYWVBaeVk)

[With the advent of user-based permission to access a device directly from the Dashboard, we will no longer be able to rescue devices that aren’t connected to the resin backend but are reachable locally on the same network as a connected device.](https://app.frontapp.com/open/cnv_71pd6n) cc @afitzek @hedss

* We want to implementing hopping workflow in the proxy (give me a shell from device X to device Y)
* Action: 
* Adapt the proxy to tunnel through gateway devices to devices in the same LAN that have lost vpn connectivity Check target device for enabled support access 

[Proposal for sharing UI components](https://app.frontapp.com/open/cnv_7557al) cc @lucianbuzzo

* See: https://docs.google.com/a/resin.io/document/d/1OAAyFAysctdBjI97OF1zSqNRM5qY7Wa30PA3Z5Y8dik/edit?usp=sharing
* Suggestion: Use ‘preact’ (MIT License)

[Discuss how/whether we can take advantage of the image name changes to move current devices to unique image names as well](https://app.frontapp.com/open/cnv_75xt6l) cc @dfunckt

* Problem where deltas cannot be applied if multiple builds exist for the same commit
   * We’ve agreed on using a temporary workaround on not allowing this to happen (because it breaks deltas). At some point we should allow this.
   * The problem with this case is that we cannot rollback to old commit hash
   * Check oldest supervisor that support the state endpoint (2.5)
   * Need to find how many devices are online running a version older than that
   * Solution: put in DB what actually happens in registry, at the same time it’s not a good place to be. We need to change the image scheme. Once we do that, we can remove the unique constraint, because we should be able to build multiple times.
* Actions
   * First step — disable pushing previously pushed commits on the builder; add unique constraint for commit in the DB. Discuss the UX with Shaun.
   * Later step — change to an image name format that makes each build produce unique images. Remove installed DB constraint. Can only move forward with this when all devices are updated to a Supervisor capable of getting image info from the state endpoint (i.e. >= 2.5). As of now, there are approx. 500 online devices with older Supervisors.

[How to proceed with the chip chp image format](https://app.frontapp.com/open/cnv_74rrxr) cc @jhermsmeier

* Where are we going with the Chip format?
* We want a good flow for resin.io support for chip, something reasonable (not ‘download this VM’-style guidelines). We are not restrictive wrt how we will get there
* Action
   * Download the chip VM, understand the workflow (how partitions are allocated in the device) , check if the tools are OSS, portable etc. @michal-mazurek has dived a bit on this
   * Maybe we can replicate it relatively painlessly in a docker container

[How to manage turning services (vpn and resin-info) on and off given that the feature is broken with ro rootfs]() cc @pcarranzav

* Problem: Given that rootfs is ro, if i we restart resin-info or vpn it won’t persist . Systemd resolves dependencies before bind mount
* If you try systemctl disable supervisor will be a noop. The reason is that , in order to enable/disable a service, you need  a symlink but in our state parition it’s a file not a symlink.
* Even when bind mounts happen afterwards, the file should not be there
* This issue ^ is a problem with the way we reset state partition (we reset it at reboot)
* Suggestion: Do nothing in prod images, if it’s a dev image write things in tty and override this behavior with config.json field.
* Suggestion 2: have service shipped but not enabled and have supervisor start or not start - (we don’t want to do that). We want to maintain supervisor/vpn independence .
* Discuss in summit about transitioning bits of the supervisor to the os
* Action
  * code a workaround to do the bind mount before systemd starts (https://github.com/resin-os/meta-resin/issues/825)
[Multicontainer model](https://app.frontapp.com/open/cnv_75x5sl)

* See: https://docs.google.com/drawings/d/1YiY5BsnEQC1VMFrbGHSs4ywUc4LjkQehL_pnJKM7OI8/edit

---

### 28 Aug 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/CUGh5xomdu6k0XxeEKhRDoVyerZ)
- [Meeting recording]()

[Open source status check: pinejs, networking stack, and container registry](https://app.frontapp.com/open/cnv_6vocqp) cc @nazrhom @wrboyce @dfunckt @alisondavis17


* Actions
   * Discussed about having a pinejs-private repo (similar to node private) to work on sensitive fixes
   * OSS abstract sql
   * Documentation (e.g. client is poorly documented)
   * Add VersionBot and add a process that add CI service for automatic npm release (see sdk and cli)




[Talk about the possibility of setting up a temporary staging for using the supervisor, ui, builder and api](https://app.frontapp.com/open/cnv_73aliv) cc @CameronDiver


* Actions
   * Use devenv / e2e


[Talk about new multicontainer model](https://app.frontapp.com/open/cnv_73alo9) cc @CameronDiver


* Actions
   * Discussed ‘multibuild’ naming
   * Need further discussion on model
   * https://docs.google.com/drawings/d/1YiY5BsnEQC1VMFrbGHSs4ywUc4LjkQehL_pnJKM7OI8/edit


[Feature request: have the ability to customise openvpn configuration for custom vpn servers](https://app.frontapp.com/open/cnv_707vzh) cc @agherzan
* See: https://github.com/resin-os/meta-resin/issues/800


* Current solution is to create a new layer, but we don’t want to recommend that
* Question: do we want this to be a resinOS feature? Sounds like we don’t want to
* The motivation if for resinOS promote
* Doesn’t look core enough, so the options are
   * Install openvpn client to container
   * Add configuration in new layer
* Discussed Reconfix as a consistent resinOS configuration framework
* Vision/example: read state partition with old reconfix and write it again with new reconfix file e.g. NM/conman style migration is possible with reconfix
* Actions
   * Convey to the user something in the lines of: we consider it a valid request, don’t have bandwidth to and will offer guidance on what needs to be done if they’re open to contribute this as a core feature of resinOS
   * Suggest to use an openvpn/ directory to add whatever conf and keys for the connection




[Discuss how to handle devices behind the Great Firewall that cannot use our VPN or (apparently?) access AWS resources hosted outside of .cn](https://app.frontapp.com/open/cnv_6x4l6h) cc @mccollam


* GFW is unpredictable because they don’t have a defined set of rules , someth
* OpenVPN connections in China should work / maybe that’s a reason why Amazon has resources in the country, GFW probable won’t block that
* Action
   * Consider asking separate fleets/platforms for China
   * Q: is Amzn allowed to proxy from China to West Virginia data centers?
   * We can maybe ask people/companies who’ve been there before
      * Pablo used rackspace server in .hk
   * Probably not worth pursuing at the moment
   * TBD during summit

---

### 21 Aug 2017

- [FlowDock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/ah52oRCUwGeCpwnkMYE3RVkUr8U)

[Discuss Username change problems.](https://app.frontapp.com/open/cnv_6p9e3r)

Single identifier is user id - we should not

How aliasing works?
All users get distinct id assigned from mixpanel
Aliasing only happens during anonymous user 
e.g. supervisor doesn't alias, it states it's username

scenario: 
- create petrosagg account
- I change username
- Another user gets petrosagg
- Example: 
 - we have ui. cli, supervisor mixpanel clients
 - problem with old clients that use mixpanel distinct id in the events they track
 - we do have a redirect endpoint in the api and do a rewrite for old supervisor versions

**Actions:**

Intercom problem
- if you have an old session it'll send the old 

Intercom plan:
  - create a new column, like "intercom id used"
  - at the moment of creation it should be false for all the existig users and true for all the new users
  - this migration should go with the change to the /config endpoint:
    - if the column is true compute the intercomUsername based on the user ID (rather than the username)
  - in the background run the migration that will rename the Intercom users to the new-style IDs and update this column (taking the Intercom API rate limiting into account)
  - when done delete this column in another migration
    - and remove the check for this column
Mixpanel plan:
   - make the supervisor use the API mixpanel proxy / redirect
  - in the API proxy endpoint rewrite th deistinct_id to be based on the user ID
    - and run the alias if needed?
    - which means a similar column to not run this alias all the time
 
- Eugene is leading this

[discuss issue in devices getting stuck because the downloaded delta can’t be applied because it’s generated from a different source image. And that’s because it’s possible for different images to be uploaded to the registry under the same name](https://app.frontapp.com/open/cnv_703p97)

- Race condition with the builds
- Not all devices use a state endpoint
- The problem happens when user pushes ctrl + c and pushes again
- I git push, the build goes through, I move to a previous commit (git reset) and push again
- When the ctrl + c fix is out we won't see it that often in production

**Actions:**

- Continue discussion in the spec
- resinOS 2.x and spec solve the issue
- ctrl + c fix also mitigates the issue
- Akis is leading this


 [Discuss the encryption of customer data on a device and allowing them to grab it via SDK/Dashboard. Potential idea is via public SSH key (although this probably only works with particular cypher types](https://app.frontapp.com/open/cnv_6rnasn)

- We could add a feature to encrypt sensitive data on the device using the user's ssh key
- The idea is to add this as a simple button
- Different from the case of having access to registry images, it gets hairy with our user's users data (e.g. financial transaction info)
- If we had a button that streams /data to their machine, it'd solves the problem
- Passing this interaction from support (i.e. getting sensitive data) does get hairy
- This looks like a simple actions server action, for the general case (i.e build the button)
- Handling /data during support (i.e. device reachable only through another device and not directly over VPN)
 - discussed using public keys in order to encrypt
- openssl supports such functionality to run encryption using rsa keys
- Petros will look into this (the non general case)
- The solution is not easy, the case seems niche

**Actions:**

  - formalise GPG solution and add in scratchpad
  - support agent is on a device (possibly through another, gateway device)
  - user creates gpg key
  - agent imports it in device that we want to get /data out
  - tar /data
  - to ggp encrypt on device (we ship with gpg)
  - download file locally and send it to them, probably with a command line example on how to decrypt it
  - Hedss is leading this

[Discuss what to do about OS versions we have deployed to production that don't have the uboot resinhup adaptions and how much of a problem we feel this](https://app.frontapp.com/open/cnv_6t04ll)

- The uboot update window is small, we don't feel that it's much of a problem
- Depending on the hardware, uboot update could be atomic. There are boards that we could make this atomic

**Devenv and Siemens**

- DNS, image importing, app building
- There's a recommendation at the bottom
- We're waiting for answers. If some things are not available, we'll reiterate on our solutions
- Suggestion: they'll set up a private DNS to point resindev.io to 10.10.10.10
  - Maybe we should select a subnet that is not private
- All resin command in cli (e.g. resin build / resin deploy) can point to the devenv (resindev.io)
- resin build will build an image locally and push it to local registry
- we'll integrate cli the devenv
- look into network manager configuration
- Hedss is leading this

[Talk about network bonding on resinOS and why the behavior is different from Raspbian](https://app.frontapp.com/open/cnv_6yhfel) 

**Actions:**

- run more tests
- Enable debug flag in kernel to get more info
- Make sure that network manager has same version in resinos/raspbian when testing again (should be the same, need to make sure)
- Joe is leading this

[OSS progress](https://app.frontapp.com/open/cnv_6vocqp)

- pinejs: resolving last open questions with Page, then coordinate with ops for OSS release
- registry: need to re-architect build pipeline
  - the idea was that OSS resin should be much simpler , that is a single server tha creates clear distinctions between resin , the service and resin, the project
  - atm resin is hard to setup, keep running etc. 
  - the closer we get to OSS entirely, we should be able to differentiate from someone else running OSS clone
  - resin is not a pluggable service
  - we need to discuss this more

**Actions:**

- Revisit next week
- Discuss about build pipeline rearchitecture

[360 data](https://app.frontapp.com/open/cnv_6y8a09)

- In the simple case of agents taking notes , the tricky part is where this data will be stored in the future
- Notes should probably be stored in the DB
- Info like who is the account manager can also be added in the DB
- The tricky bit with acct mgmt and sales data is that they are attached to different model
  - salesforce data revolve around accounts and contacts. These don't exactly align with orgs
- Salesforce has a lot of functionality and we can't replicate everything
- When we are talking about people who don't have opened a resin account yet we could
  - a. extend model to include people w/o account and later match
  - b. use salesforce till a user has created account
- We need to draw a line wrt to what data we keep in salesforce
- We want to have a sidebar that unifies all the data
- One of the problems we have is that not every support agent has access there (otherwise we could have the support sidebar draw data from there)
- Discussed whether we could have a single salesforce user that will read/write on behalf of agents
- Examples of data in salesforce
  - when someone comes in support, we want to see in the sidebar info on the opportunity (e.g. trying to sell them X)
  - Discussed on having a single source of truth that will include support and sales info
- The issue is how easy it is to give access to data to the whole team. We don't want to create silos which salesforces appears to encourage
- The idea of having all data in one place will not happen
- next best thing is clear division of labour/data and use API to coordinate (e.g. intercom should never create salesforce accts)

**Actions:**
  - Need to find out how much of salesforce we use
  - need to identify a subset that we can keep in salesforce
  - No blockers for support notes
  - for sales/acct mgmt data no blockers in having 1-1 CRM model with salesforce
    - why not front? Front is not a very good store for leads/customers/companies/contacts
  - Let's keep going with org notes and we'll get there for the rest
  - Open Q: How are we going to surface non-salesforce in salesforce? Answer: currently exploring using Front for this
  - Pinned item 
  - Tim is leading this

---

### 14 Aug 2017

- [FlowDock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/NenMslL7iYnpkrEgO5KwwK3TLPl)

[DevEnv changes for PoC Siemens on-prem. Initial Questions: 1) Single VM instance deploy?, 2) DNS/Networking (local subnet or more)?, 3) DevEnv image pre-loading? Future image upgrades required? 4) Load (how many devices)?](https://app.frontapp.com/open/cnv_6sxf3h) cc @hedss @mccollam

**Actions:**
- Ronald to determine network conditions on sites where PoC will run, access to private DNS. Also determine if they're expecting to build apps in the DevEnv or if they'll build elsewhere and push to the DevEnv for deploy
- Alex/Petros to determine if we're going to supply custom OS images or modify the Image Maker for configs
- Heds to write a spec. to nail down what they'll get from a DevEnv POV

[discuss options for open sourcing container registry](https://app.frontapp.com/open/cnv_6u7h29) cc @alisondavis17 @dfunckt @shaunmulligan @brownjohnf

**Actions:**
- lazy creation of git repos on app creation (on resin-api and resin-git), think about the consequences
- needs further discussion on how to extract and distribute deployment-related bits of functionality out of resin-builder to other components

[discuss plans for open sourcing the networking stack](https://app.frontapp.com/open/cnv_6u7hon) cc @alisondavis17 @wrboyce @shaunmulligan

**Actions:**
- formalise the http-connect style interface for establishing tunnels
- prove that the system can work without a vpn service

**Bonus**: Discussion about removing PubNub

**Actions:**
- @flesler will finish SDK side of user-generated API keys and then we'll define the order for:
	- Logs
	- 3rd-party integrations

[discuss open sourcing pines](https://app.frontapp.com/open/cnv_6v5tsf) cc @alisondavis17 @nazrhom @shaunmulligan

**Actions:**
- Immediate
	- apply proper permissions on odata query filters (bug)
	- check that all the dependency used are open already
- After
	- documentation pinejs-client
	- migrations
	- SBVRjs
	- GraphQL

**Bonus**: Deprecating unused endpoint /my_applications cc @Page

**Actions:**
- Yes, deprecate it


---

### 09 Aug 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/xRiEznQqGoEbrnbQtl0Ul2S3roy)

[testing framework check in](https://app.frontapp.com/open/cnv_6oi871) cc @telphan

**Actions**
- We will make the 1.x into 2.x schemas, we'll bake those in the CLI, if they change we'll add more
- In parallel, Theodor will put a latest on meta-resin's schema

[discuss implications of api keys being able to generate JWTs and more](https://app.frontapp.com/open/cnv_6s9x3n) cc @flesler @afitzek

In the new API keys branch, user-level api keys (new & legacy) could use endpoints to generate api keys or JWTs with higher permissions than they have. Meaning, they can promote themselves.

**Actions**
- Add a new permission to `default-user` (but not the new api keys) that is required on all the endpoints that can create this higher level tokens

---

### 07 Aug 2017

- [Recording - Pending]()
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/Igd8Ks3kyuDFmOugsBrJU4ZWsBY)

[decide on way forward for unified resinOS images that can accommodate the hass.io guys (if possible)](https://app.frontapp.com/open/cnv_6oi1h9) cc @shaunmulligan

**Actions**
- Shaun will attempt to setup a call with them to figure out how to make meta-resin and their layer work together

[discuss trying to align the output of `uname` with our `RESIN_ARCH` dockerfile template variables (which come from the image maker). This helps with automatic install scripts which find the correct architecture to download.
](https://app.frontapp.com/open/cnv_6p655h) cc @CameronDiver

**Actions**
- Cameron will look on ways we can make uname behave like it should for the appropriate architectures. If that fails we'll augment the template context with an additional variable (e.g RESIN_UNAME_ARCH) that is the correct uname arch string for that build

[Discuss mirroring our repos to a second git remote (could be hosted or otherwise)](https://app.frontapp.com/open/cnv_6ploqh) cc @brownjohnf

**Actions**
- Given the very low probability of Github losing data unless we find a trivial solution to this problem it doesn't make sense invest time on it.

[discuss solutions for the "/mnt/data/docker/tmp/ grows large and eventually /mnt/data/ is filled" bug](https://app.frontapp.com/open/cnv_6ptx71) cc @imrehg

**Actions**
- This is a non-issue after we upgrade to docker 17.06

---

### 02 Aug 2017

- [Recording - Pending]()
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/R7q9Ui_3H4CmsZkWFVNqewHa87_)

[Discuss getUser(req) + req.user/req.creds https://github.com/resin-io/resin-api/pull/409#discussion_r130453721](https://app.frontapp.com/open/cnv_6lz14r)

- Actions
  - The final solution is to make login atomic (creds+2fa) and get rid of req.creds
  - if solution above is long, for now we can either:
    - Keep using req.creds where it is, or
    - getUser() throws if req.creds (won't return a user) and we handle with catch

[Re-work the (hash) feature in Flowdock to be a bi-directional communication with Front.](https://app.frontapp.com/open/cnv_6lhigl)

[Discuss API rate limiting ](https://app.frontapp.com/open/cnv_6m8z6l)

[Discuss adopting Etcher JS code style guidelines (eslint and respective conf) in our repositories (are there any strong reasons not to?)](https://app.frontapp.com/open/cnv_6miwsv)

[Discuss possible JWT implications with username changes](https://app.frontapp.com/open/cnv_6mx7tt)

- Actions:
  - JWTs are refreshed after username changes with the /user/username endpoint

---

### 31 Jul 2017

- [Meeting Recording](https://drive.google.com/open?id=0B0NS-URBofBLS3dGQU1FV3lSRzQ)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/Nek4My4UQmnFhFuzq6P07Y_4VvJ)

[We should review the billing plan permissions system & consolidate how/where self-billing implementation should retrieve its data.](https://app.frontapp.com/open/cnv_6iufyx) cc @thgreasi

* **Actions**
   * Get v0 out 
   * For v1 make sure we’re doing good processing of data

[Modifications to the plymouth scripts (e.g. changing the scaling factor) would currently block resinHUP on devices with those modifications. What would be the good way to handle this in particular, and splash screen resizes in general (has open HQ issue)](https://app.frontapp.com/open/cnv_6lj4mt) cc @imrehg

* **Actions**
  * 100% scaling
   * Make logo accommodate for borders if we want to 
   * Create new resinOS version (both 1.x and 2.x) 
   * This particular customer (novavision) will be updated with manual migration of the altered plymouth script.


[We'll need to decide what to do with resinhup images since Alex and several people expressed disagreement with using the staging registry for production means - will we use our production registry or some other v1 registry, or keep using staging?](https://app.frontapp.com/open/cnv_6i0h05) cc @brownjohnf @imrehg

  * Some devices with docker daemon don’t support registry v2
  * This is why we used v1
  * There’s no particular reason why we are using staging registry
  * This is problematic because we don’t give any guarantees on staging registry availability
  * Is it a trivial change, or do we have to update all devices?
  * There’s a concern on whether we have to give push credentials access to specific jobs in Jenkins
  * **Actions**
    * We need to search for any occurrence where staging is used to fetch supervisor image [@imrehg]


[We discontinued a couple of boards this month but even though we documented this in the repositories the dashboard still offers experimental / released images for these boards. What is the way forward here? Removing images? Working on image maker to filter some out?](https://app.frontapp.com/open/cnv_6h8emz) 

  * Do we have any remaining blockers ?
  * **Actions**
    * There must be a last build that only add the ‘discontinued’ flag, make a last build that is uploaded to the S3 and UI will pick up the device type info that simply passes through the image-maker cc @willnewton @thgreasi
    * We’ll reject app creation on the SDK cc @pimterry
    * We don’t care what happens with direct API calls

Addressing issue on VPN scaling PR cc @wrboyce
  
  * Systemd service launching systemd service
  * **Actions**:
    * Launch instance as a child process from nodeJS
---

### 26 Jul 2017

- [Meeting Recording](https://drive.google.com/open?id=0B0NS-URBofBLbGQwRlBJZFBJdE0)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/tz4RY2HNb1KcwC1L9f9omZ3Tnrt)

[Should we continue to generate deltas on the builder, given that the builder no longer has immediate access to the old and new images](https://app.frontapp.com/open/cnv_6hy8vh)

- Action: 
  - disable deltas for arm builds

[Discuss about the behaviour of the build pipeline when a git push is cancelled by the user (using ctrl+C)](https://app.frontapp.com/open/cnv_6gzsrn) 

[Semver - We have the occasional issue where changes are made to a repository, but should not really be added to a Changelog (as it would essentially be noise) or published (should it be an NPM/Crate, etc.). We’ve discussed this in the process call, but we need to continue on an Arch call with Petros](https://app.frontapp.com/open/cnv_6i2vsx)

Alex: not convinced that we should allow some changes not get versions (slippery slope)
Arguments against: noise in the changelog, also different convention in Yocto
Use case: small changes (e.g. typos) will cut new version
Andrei: Changelog is used to communicate changes that affect users, a minor build fix might not warrant a changelog entry

Suggestion: have additional marker to signify a source version that does not cause a new release (e.g. semver metadata)
Downstream users expect more things from a version

It's a presentation issue, we need to explicitly mention that a change-type is sub-patch / cosmetic

Versioning is also a matter of training our users wrt their expectations (even having links on top of changelog explaining our versioning)

Discussed whether we should go full circle and explicitly mark release versions

[Allowing username renames sync up](https://app.frontapp.com/open/cnv_6irxjf)

[User would like to have an application image that can be rolled back to, (e.g. factory reset)](https://app.frontapp.com/open/cnv_6invjv)

- Action
  - Needs a spec

---

### 24 Jul 2017

- [Meeting Recording](https://drive.google.com/open?id=0B0NS-URBofBLTi1QNGdlYXNMM1U)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/87ofubeSF6BcfZqbNwqk-PmPqwq)

[How do we want to see the profiles for users with multiple accounts appearing in our mixpanel analytics?](https://app.frontapp.com/open/cnv_6euxuj)

[How should we unify our customer and user data, so we can do analysis across them, and build 360 views of a user or customer?](https://app.frontapp.com/open/cnv_6f5bud)

[meta-resin has layers for old versions of yocto: daisy for example. Should we leave them there in case of board that we will need to support with old BSPs or remove them to not bother with support on those versions. We can always get them from git history anyway.](https://app.frontapp.com/open/cnv_6h3ibd)

[Use of a pending-master branch on VersionBot merges to try and ensure consistency with version bumping](https://app.frontapp.com/open/cnv_6h7x2r)

[sync up on username changes](https://app.frontapp.com/open/cnv_6h8ut5)

### 19 Jul 2017

- No Meeting Recording
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/JbH8RBK3nx43WaytvBdmdPnLlgf)

Shaun asked if API keys will be by-user or by-app
- First step is to make them compatible with JWTs so by-user with their permissions
- Later on we'll implement scopes that could enable stuff like per-app and such

[Specify a property in resin-devicex repositories that will contain a list with the device capabilities.](https://app.frontapp.com/open/cnv_6cu9uh) 
- **Actions:**
  - We will not add a new `deviceCapabilities` property to the device-type files of the resin-devicex repos
  - We will use the imageDownloadAlerts property (a pre-existing implementation used to display alerts in the download dialog) to warn that RPi3 is not capable to connect to 5GHz WiFi. EG: "Your device will not be able to connect to 5GHz WiFi networks unless you use an external WiFi adapter that supports it."
  - For the RPiZeroW, (which shares the same device-type with RPi 1 & RPi Zero) we will state something like "Raspberry Pi Zero W is not capable of connecting to 5GHz WiFi networks unless you use an external WiFi adapter that supports it."

[Follow-up discussion on 3rd-party integrations](https://app.frontapp.com/open/cnv_6c4zmt)
- Implementation Levels
  1. Every bit in their context (api, ui)
  2. Separated to a module per integration
  3. Integrations loaded at runtime
  4. Plugins in general, integrations are one type of plugins
- Petros suggested we can tie integrations to our events with transactions (and rollback), but we won't do it
- Alex suggested a ghetto cronjob that checks if enough time passed since last execution on each api event

- **Actions:**
  - Integrations will be implemented "one-by-one" on the API & UI (as in no generic template)
  - Integration data (access keys, secrets, etc) will be stored in our schema, either in `application` or a new Vocabulary where is integration type is a model
  - Integration code will run within the same request that triggers the pertinent events (we won't rollback on errors)
  - We'll implement some sort of cronjob that runs on a single API process each time
  - The cronjob will fix sync errors by fetching our integrated apps+devices and comparing to 3rd-parties via their APIs
----

### 17 Jul 2017

- [Meeting Recording](https://drive.google.com/open?id=0B1xAg_Dw2iS8NUt0VnhESTV3eW8)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/r8cSA5HeDysvdkfkM0UuD-so1U7)

[Should /data on resinOS be named volume (instead of host directory mount)?](https://app.frontapp.com/open/cnv_69mi5p)
- The docker feature back then didn't exist
- This should get fixed with multicontainer feature

Actions:
- PR opened on HQ, will be linked to multicontainer because it should be solved in there as well

[Discuss approaches to improving jenkins throughput for yocto builds](https://app.frontapp.com/open/cnv_6a3r4t)
- Yocto builds take hours
- Pablo suggested migrating to Circle
	- Alex said try to make a decent caching before switching build server

Actions:
- We'll provision more boxes on Hetzner

[Discuss how we want to set up CI for Etcher in the Seattle office](https://app.frontapp.com/open/cnv_6c7xav)

Actions:
- Juanchi will prepare a document on how to implement concourse.ci
- Lauren will provision a Mac NUC and a Windows NUC at the office and add Jack as collaborator

---

### 12 Jul 2017

- [Meeting Recording - pending]()
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/gC4vzLEKnfI5lqa3Qeo82LD2Sbf)

[Short discussion about how to implement integrations using webhooks](https://app.frontapp.com/open/cnv_68uhpn)

- Webhooks
  - Registered/enabled per-application, no custom data
  - Select with checkboxes to pick which events
  - An app could have +1 webhook to it
- Integrations
  - Extra config parameters (access keys, etc.) are not sent on payload
  - Integration server will fetch the data from the API
  - (For integrations definition aka type) Use env var system with constraints
  - Maybe integrate with AWS and others on the front-end opening a popup or sth like that, if not standard, UI will be our own
  - Integrations server can have 2 parts, also handle front-end proxy integration to get user keys
  - For now limit to our integrations, not maximum flexibility (plugins), one DB table per integration
  - Maybe have a separate project or integrations (or per integration)
  - Integration project can have ui stuff, backend code and even an sbvr or json. Both UI and API import them but take different parts of it
  - Now there's no actual need to implement webhooks for this
  - Leave webhooks for later, only integrations
  - Self-healing will need to run on API, how to orchestrate multiple servers?
  - We need proper cron jobs, how (?)
- What was last said:
  - Split webhooks spec into webhooks|integrations
    - Finish and park webhooks feature
    - We'll discuss more about integrations on Monday
  - NPM modules with UI, server (pine hooks, endpoints) and sbvr or json file
    - UI requires module and takes ui
    - Server takes module and instantiates

### 10 Jul 2017

- [Meeting Recording - pending]()
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/gC4vzLEKnfI5lqa3Qeo82LD2Sbf)

[Discuss a method to improve the supervisor reliability and device autorecovery](https://app.frontapp.com/open/cnv_627zxb)
  - Has been discussed afk

[Webhooks spec](https://app.frontapp.com/open/cnv_66m5kv)
  - Actions
    - Update the spec first and foremost so we can agree on it
    - Webhooks can be less than 100% reliable (no queue, no retries)
    - Integrations (server) will provide more guarantees, based on the actual integration goal
      - Maybe retries
      - Surely self-healing (fetch state from resin and 3rd-party and sync)
      - Devices created before webhook will be automatically fixed by the self-healing process

[User-generated api keys (focus on `req.user`)](https://app.frontapp.com/open/cnv_66m63b)
  - Actions
    - Remove all the req.user possible
    - Maintain req.user when JWT for PineJS
    - Add a req.getUser() / getUser(req) whenever req.user is in the api
    - Implement all this before starting with API keys and ship separately
    - No change should be needed on PineJS for all this at all

[Discuss load balancing/discovery for new packet arm builders](https://app.frontapp.com/open/cnv_60nlbh)
  - Actions
    -  Prioritise ARM 32 bit builder
    - setup hosts in packet that will have single daemon for 32 bits
    - host info will be in etcd
    - builders will use it and try to connect to arm builders
    - if they fail , fallback to emulated builds
    - no new name, no haproxy
    - devops action:
      - spin up two hosts on packet

### 05 Jul 2017

- [Meeting Recording - pending]()
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/gQPU_JmqBOmIXsshqfxCu_sxPMe)

[Discuss testing framework (mochaJS) ](https://app.frontapp.com/open/cnv_64m3ih)

  - **Action**
    - testing framework should stay in meta-resin
    - resinos-tests as a candidate for name
    - rename the existing 'tests' repo

[Discuss the correct way to query (and set) supervisor versions](https://app.frontapp.com/open/cnv_63y71h)

  - One endpoint is supervisor release , the other one is the device endpoint
    - supervisor_release is target version, set by the cloud
    - supervisor_version is the current running one (as reported by device)

  - **Action**
    - supervisor should add itself in the api on release - https://github.com/resin-io/resin-supervisor/issues/471

[How can admins know if a device in local mode, or the device is update-locked?](https://app.frontapp.com/open/cnv_64o65d)

##### Discussed admin access to device info (e.g. env vars)

  - **Action**
    - In the future, support agents won't have access to anything, unless users have enabled support to their device
    - Side effect: they won't be able to see stale devices anyway

##### Discuss next steps with app transfer and username changes
  - **Action**
    - We are moving forward with resin-git changes (Kostas/Will to work on this)

---

### 03 Jul 2017

- [Meeting Recording - pending]()
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/Tc9ZM-o1yY3QQ8zcwePFpVDb7__)

[Discuss where to host statically linked tools binaries for 1.x to 2.x resinhup](https://app.frontapp.com/open/cnv_6210qd)
  - The first candidate/location is files.resin.io
  - We need a scheme and process to store all different binaries
  - **Actions:**
    - We will store them in the git repo

[Discuss migrating from armhf/alpine, and checking the alpine versions provided by resin.](https://app.frontapp.com/open/cnv_5hjhmn)
  - **Actions:**
    - We'd like to 'differentiate' our images, make them better and make them more 'ours'

[Discuss next steps for leech and other fleet actions in resin-proxy](https://app.frontapp.com/open/cnv_63dg49)
  - **Actions:**
    - We'll continue with the vendoring approach for resinHUP and any other scripts we add (e.g. leech)
    - We need to make proper vendoring, for instance by referencing scripts directly from the respective git repos.

[Discuss using vault as a secret store for environment keyframe configurations](https://app.frontapp.com/open/cnv_5zsagn)

  - problem: env/conf vars stored in production keyframe mean that we need to limit even read access, which complicates deployment process
  - There is no need to store secrets in the same palce as the environment
  - If not there, where?
  - Vault is built for things like that, also solves the problem with cloudformation now (we could move immediately)
  - The issue is how deploy bot will get the encrypted values
  - The deploybot auths with vault, it has a key

  - Worried that someone, because it's a git repo and replicated all over the place, there's no way to revoke old keys if someone gets old decryption pass / so there's no way to restrict access
  - In vault, however, we can revoke the token or even take vault down. Tokens also have TTL
Another option is to use our API and adequate permissions

  - Vault has advantages like key rotation, but it's hard to operate

  - Another option would be to create secrets in Kubernetes and reference them from keyframe
in the interim deploybot can query secrets to kubernetes and port them to fleet

  - **Actions:**
    - Use Kubernetes to store secrets
    - Port a few repos (ui/api) to use as examples
    - ~~Need a spec for the move to kubernetes~~ https://github.com/resin-io/hq/pull/939

[Discuss progress of resin cam](https://app.frontapp.com/open/cnv_62im1d)

---
### 28 Jun 2017

- [Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLbk12Q1dQbHotWE0)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/MYBF6W_rRV1C29e0n5cS1Mk3bsm)

[How do we support a Node.js version of the resin-wifi-connect Rust rewrite](https://app.frontapp.com/open/cnv_5ysg61)

  - We want to keep compatibility with the current resin-wifi-connect project
  - The interface is a binary called with the same args
  - We might have to write a small nodejs wrapper to call the rust binary
  - Suggestion: release version of current wifi-connect version (2.x) and that one has a message that says
  - 'this version is deprecated, we have released this (rust) that is better, native etc.) and 3.x version will be rust
  - There's a build-time 'interface' wrt to how wifi connect is currently installed (Dockerfile instruction) that we do not think should be regarded as a contract / backwards compatible interface

  - **Action:**
    - Go with three repos

[Discuss how we can transfer ownership of applications between users](https://app.frontapp.com/open/cnv_5z0nan)
  - **Action:**
    - ~~Write spec on app/device transfer~~ (https://github.com/resin-io/hq/pull/938)

[Discuss the bigger rootfs size for the Nvidia Jetson TX2](https://app.frontapp.com/open/cnv_5zkiof)
  - **Action:**
    - We should consider / decide on per-board rootFS sizes

[Discuss ideas to implement some device health checks mechanisms / heuristics](https://app.frontapp.com/open/cnv_60m4a9)

  - **Action:**
    - Check existing spec (https://github.com/resin-io/hq/pull/278) and see if we can add supervisor state in the suggested model

---

### 26 Jun 2017

- [Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLQ2VwRnJNdjJtUE0)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/nBrZR5Vw00Op1i7XgIZP13qDbKR)

[Discuss our analytics & error tracking approach](https://app.frontapp.com/open/cnv_5kll9t)
  - **Actions:**
    - Create OSS fork from segment repo
    - Look into corvus and integrate useful stuff from there

[Discuss supervisor update process and state](https://app.frontapp.com/open/cnv_5u3k3b)
  - supervisor.conf contains image/tag of supervisor
  - Need a cache for last confirmed working supervisor version.
  - Why not use existing image/tag as last working?
    - No matter what you do, you need either a file or a docker tag for last confirmed state
    - There's no need to keep a cache of the target state locally, on the disk, because this is a runtime env
    - One of the changes in meta-resin will be to use the value in resin-supervisor.conf instead of latest
  - **Actions:**
    - Already PR'ed a comment to supervisor.conf to note that this is the last confirmed working supervisor version

[Migrating from 1.X to 2.X (partition table) needs host tools that are not available in any version until now (1.26). These tools are: mkfs.ext4 and tar](https://app.frontapp.com/open/cnv_5udh1b)
  - A requirement that came up is that we have to reboot after repartitioning
  - **Actions:**
    - The utils/user data must be persisted on disk in the inactive partition (archived and compressed), having them in ramdisk won't work because we have to reboot
    - The inactive partition is the partition that will write the new file system. Until we use it, nothing uses it, so we can use it as scratch space to do the copying

[Discuss blockers with VersionBot as a ‘private’ Github App](https://app.frontapp.com/open/cnv_5utv1h)
  - **Actions:**
    - Will try to get rid of CI after version bump
    - Found a way forward on fetching branches from forked repos
    - Post-call discussion: https://www.flowdock.com/app/rulemotion/r-process/threads/29dY1NyA5NsEirck8_kKJqOpmd1

[Discuss the necessity to have unique emails](https://app.frontapp.com/open/cnv_5xdkf5)
  - Discussed user support case where the user (for unclear reasons) wanted to convert a social account to email signup
  - The current flow to do this is for the user to ask for a pass reset. That'll result in a password reset link, that will set a password to the account and in effect create a proper account

  - **Actions:**
    - Keep emails unique
    - Collect and verify emails
    - Account managing is complex. We want to continue the conversation about simplifying, which includes:
      - Merging accounts
      - Elevating the username to user visible information

[Discuss and prioritise current delta issues.](https://app.frontapp.com/open/cnv_5xf0yn)
  - **Actions:**
    - We need to prioritise:
      - Reliability / Resiliency in bad networks
      - Resumable deltas
      - Tests

[Continue the actor model discussion in relation to the new user-generated api keys](https://app.frontapp.com/open/cnv_5xqgot)
  - **Actions:**
    - Make a list of the endpoints/hooks that will break if req.user is missing
    - Afterwards, if we agree, add a middleware to the api for all endpoints that, when an api key is used, tries to fill req.user with the user (if user found with actor id)
    - Eventually migrate to pine

---

### 22 Jun 2017

- [Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLSFhCbkE2R1NQN1U)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/g7Y3Eee4oDLmAs9vM1Kc0RRnVff)

[Discuss high-level architecture of the webhooks implementation](https://app.frontapp.com/open/cnv_5uxu6n)
  - Discussing architecture parts of the spec
  - Discussed whether this should be part of the API or a new component. Some arguments were:
    - API has already a lot of responsibility
    - too many sockets open in the API / could overload it
  - Should we use queues?
  - Need to decide on what kind of delivery guarantees we want. For instance, Front doesn't retry
  - **Action:**
    - Continue discussion in spec (https://github.com/resin-io/hq/pull/926)

- Discussed Amber

---

### 19 Jun 2017

- [Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLVnM0MXF6X0x2blk)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/GXbffmqkIc9bbXTgapw48kBU-gZ)

- [Discuss our analytics & error tracking approach](https://app.frontapp.com/open/cnv_5kll9t)
  - Checked segment
  - Shimming didn't work in our first attempts, we're not sure which browser APIs failed
  - **Action:** 
    - write custom integration for node/mixpanel and see how it goes 

- [How to merge all beaglebone applications into a single device type.](https://app.frontapp.com/open/cnv_5u4xpz)
- Not sure if we should merge beaglebone types or deprecate and ignore
    - Deploy beaglebone type and follow a 'compatible with' OS/device type approach 
    - **Actions:**
      - We should start with creating a new beaglebone device type
      - Then implement deprecation in UI/CLI/SDK. This means that we won't list them , but if an app has them it should act as normal    
      - ~~Needs a brief spec to track/organise work & deprecation process (@shaunmulligan)~~ https://github.com/resin-io/hq/pull/785

- [Best way to give ARM builds personalities](https://app.frontapp.com/open/cnv_5u92hp)
  - Parse dockerfile, prepend commands with special binary and then it will run
  - **Action:** 
    - use similar solution with qemu

- [Discuss supervisor update process and state (/etc/supervisor.conf vs API)](https://app.frontapp.com/open/cnv_5u3k3b)
  - Discussed how we bundle the supervisor (should we tie the supervisor version to resinOS or not)
  - No action, needs more discussion

- [Discuss build time secrets. Or the "How do I pull code from a private github/npm account"](https://app.frontapp.com/open/cnv_5u81jt)

  - raised by ray & goee
  - they'd like to authenticate with 3rd party services during build
  - idea: what if we had a keypair for every device
  - They can commit secrets to Dockerfile, but that ends up in the device with multistage builds, args and keys we most likely have  a solution. The mechanism that extracts values is tricky to use, requires education
  - **Actions:**
    - offer encryption key
    - specify them in ui or cli when you do your build
    - builder starts build, decrypts encrypted files (e.g. resin-secrets.yml)
    - the other question is, where do we expose the info? 
    - we should do it to everything but the last build (for multistage builds)
    - bind-mount SECRET bind file
    - Need more discussion w/ @afitzek
    - ref: https://github.com/resin-io/hq/issues/12

- [hass.io request: custom ovpnvpn or ssh keys configuration](https://app.frontapp.com/open/cnv_5u3xu3)
  - **Action:**
    - We'll have a call set up

---

### 16 Jun 2017

- [Meeting Recording](https://drive.google.com/open?id=0B0NS-URBofBLWHIxdzNHTVNnekU)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/crEqlSoWS9FT-ldNttwx5pxiPTl)

- [Discuss potential UX improvements to the prod/dev image selection](https://app.frontapp.com/open/cnv_5rzxgb)
  - **Actions**
    - Moved to product call
    - Need to get designs for that, looks like it's a usability issue
    - We might also change versioning scheme, though not soon
- [Discuss next steps of reconfix and resin-image-fs](https://app.frontapp.com/open/cnv_5pp8e9)
  - Idea: we could run the image maker reconfiguration logic in the browser
  - **Actions**
    - The first step is to integrate reconfix to have it working with images. There's a node version of reconfix we can use
    - We can create a image maker endpoint that'll take reconfigx schema and configuration
    - @zvin is leading this
- [Discuss changing the behaviour of moving devices between apps so that it removed the App data by default.]
(https://app.frontapp.com/open/cnv_5stiyh)
  - **Actions**
    - There was consensus on doing it https://github.com/resin-io/resin-supervisor/issues/110
- [boot to root migration: root space, rpi uboot, 1.X line](https://app.frontapp.com/open/cnv_5sjs55)
  - ref: https://github.com/resin-io/hq/pull/921
  - **Actions**
    - We will be writing tests in https://mochajs.org/
    - We will start with a test for provisioning a device
    - We will try to migrate and automate as much as possible from testlodge, resinos-tests (github), autohat (kernel modules, fingerprints etc)
    - The tests will be using the cli and/or sdk
- [ResinHUP 1.X to 2.X: partition table migration is ready and the scripts are pushed to resinhup respository](https://app.frontapp.com/open/cnv_5q9vo3)
  - **Actions**
    - For 1.x to 2.x, let's use what we have (resinhup script), we don't need to reimplement anything since it will be phased out
    - Need to find which ResinOS version was live when we announced that resin is out of beta (@imrehg is leading this) - https://github.com/resin-io/hq/issues/924
- [We should decide and move forward on what to do for config.txt](https://app.frontapp.com/open/cnv_5ks0b3)
  - Problem:
    - Users don't know what variables are already in the initial config.txt , so when asked to add, they don't know the current state
    - With current key/value we can't set keys that can have multiple values
     - solution 1: use array syntax - can't use comma as a delimiter since it's used as a value
     - solution 2: add underscore and index to values
     - Example config.txt values:
     ```
     enable_uart=1
     dtparam=i2c_arm=on
     dtparam=spi=on
     disable_splash=1
     avoid_warnings=1
     dtparam=audio=on
     dtoverlay=foo,param1=val1,param2=val2
     ```
    - dtparam is sugar for dtoverlay 
    - examples/suggestions during the call (we ended up with the last two suggestions): 
      - dtparam=["audio=on", "param1=bar"]
      - "audio=on","spi=off"
      - "foo,param=val","bar,param2=val2"
      - "foo,param1=val1,param2=val2"   
  - **Actions**
    - We'll use an 'almost JSON' approach with quotes and commas only (no brackets)
    - This special format will **only be used** for config.txt variables
    - We are OK with uploading the initial config.txt env values to the API when the supervisor is updated, there are state machine concerns however
  
- Discussed supervisor update process and state
  - Relevant to supervisor.conf
  - Problem: there are two places where we set supervisor version that a device should be running
  - One is /etc/supervisor.conf, the other is the API
  - This can lead to weird interactions. 
  - Supervisor.conf should be updated with the version in API
  - We discussed about resinHUP and how it should handle OS updates. We'd originally said that it should first find the supervisor version running on he device and update the file.
  - Is supervisor.conf a 'dumb' file (a reflection from API info) or can it be used to determine version (i.e. target)
  - **Actions**
    - Consensus is that we need to fix this, will be brought up in Monday's arch call

---

### 12 Jun 2017

- [Meeting Recording](https://drive.google.com/open?id=0B0NS-URBofBLcDhVM0FPMW9icTQ)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/cxUpl2z6StLKF8fEpixllDN3l-k)

- Items Covered
  - Discuss our analytics & error tracking approach
    - Needs more research
  - RPI 64 support
  - Self service resinhup - Should it update supervisor?
    - Action
      - It should, logic will be implemented in resinhup script. Coordination with action server on the proxy side will also be needed

---

### 7 Jun 2017

- [Meeting Recording](https://drive.google.com/open?id=0B0NS-URBofBLNHhyUEk0dG5HaXM)
- [Flowdock Thread](https://www.flowdock.com/app/rulemotion/r-process/threads/va0FwaYlZYeZZ7uFW-7uO8ZzfgB)

Agenda:

- [Discuss about self billing related DB changes](https://beta.frontapp.com/inboxes/shared/d_architecture/open/337869829)
- [Should we enforce a minimum supervisor version, which is multi-container ready, for application v2s](https://beta.frontapp.com/inboxes/shared/d_architecture/open/339832683)
- ['fingerprint' build contexts to stop rebuilding of containers if we don't need to [multicontainer]](https://beta.frontapp.com/inboxes/shared/d_architecture/open/337947831)
- [Axillera request: The need to initialize a completely assembled system where access to the SD card is not available. (first identified as net-booting a system)](https://beta.frontapp.com/inboxes/shared/d_architecture/open/338638693)
- [discuss contingency plan for watty.io who have flashed 1000 devices with a custom resinOS build that doesn't have the resinHUP prerequisites](https://beta.frontapp.com/inboxes/shared/d_architecture/open/337978305)

---

### 5 Jun 2017

- [Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLM0xjYlMyaW01elU)
- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/fZtCT8zVJHwkAAaPO_G_OhDB2OY)

**Pipage discussion**

[Discuss operation of vault server](https://beta.frontapp.com/inboxes/shared/d_architecture/open/330404867)
- Spec PR: https://github.com/resin-io/hq/pull/857
- In summary, it is still not entirely clear whether we need Vault or not
- Actions:
  - Revisit spec to not include vault and only limit access to support agents

[We need to determine how to implement the white listing for tableau integration in the API](https://beta.frontapp.com/inboxes/shared/d_architecture/open/329801683)
- Actions:
  - We'll proceed with writing a migration / more details to be discussed with Page (Ariel is on it)

**resin.io analytics modules for top-level components**
- Discussed if we should use separate Sentry/Mixpanel modules or resin-corvus
- Current preference is resin-corvus, we'll discuss again on Wednesday's arch call

### 2 Jun 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/1scKcudoTFLBmSmpCL5glUg_nBS)

[Api keys](https://app.frontapp.com/open/cnv_5is5xr) (Ariel)

- Should we list api keys that are not created through the new UI (with a name?)?
-> No, only show those with name

- We said no scopes first, so currently user-level api keys, right?
-> Yes

- Should we use a different token format for the new api keys to differentiate them at the application-level?
-> No

- Will we add the token name as a new field on api key? It is defined on PineJS
-> Yes, coordinate with Page. Probably migration has to be on the api

- We'll hash the API Key string before storing? If so we need a field to indicate it was hashed and how?
-> Don't hash keys for now
-> Eventually migrate all keys by applying hashing to all of them on the DB.
-> Alex asked for this to have rollback 

- Is the token-auth module only there to be compliant with Docker Registry authentication?
-> Yes, no need to do anything about it

- Should I focus on the API side and leave UI for later?
-> Alex: UI will be handled by UI team, product meeting is needed to define the UI

[Managed/unmanaged behavior in one image](https://app.frontapp.com/open/cnv_5j2q73) (Andrei)

Actions:
- Management_services was decided as config.json object to determine managed behavior
- Yocto build will produce by default unmanaged images
- We will let prepare openvpn service to fail in the case of unmanaged

[Etcher / glibc 2.15 in resin base image](https://app.frontapp.com/open/cnv_5iqdd5) (Juanchi)

( We can create a scoped build environment with a custom glibc support, but we decided that the amount of effort needed outweighs the burden of not being able to unify the Etcher base images

['edge' vs 'generic' device types](https://app.frontapp.com/open/cnv_5icubz) (Joe)

Actions:
* Find out if anyone is using the edge device type outside of the resin
* Create a new generic device type @ https://github.com/resin-os/resin-generic
    * generic-architecture (e.g. generic-x86) to be created inside the resin-generic repo (similar to resin-raspberrypi)
* Improve the builder to give a nice error if a user attempts to use templates with the generic device type
* Phase out the edge device type by hiding it on from the UI (eventually we will remove it completely)
* Phase in generic device type, making it the default option when creating a dependent device

[Future of resin-lint & linting for other languages](https://beta.frontapp.com/inboxes/shared/d_architecture/open/334608865)

Actions:
- We'll rename resin-lint gh project to node-resin-lint; we'll keep resin-lint module name in npm
- We'll need per-language/framework linters, e.g. separate tool for Rust, Golang etc.

[Discuss requesting a resin vendor zone for NTP pool, and use that in resinOS devices by default](https://beta.frontapp.com/inboxes/shared/d_architecture/open/332082615) (Gergely)

Actions:
- Submitted application (https://www.flowdock.com/app/rulemotion/resin-ideas/threads/ASZAalJ0dX_AiClfpiy90VpEF6b)
- When this is done, we'll test/configure meta-resin accordingly 

---

### 31 May 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/PfqLoSYpNEAQJ7GuJdqCrRTZEFK)

Recordings (my computer crashed, hence the two recordings):
- https://drive.google.com/open?id=0B0NS-URBofBLbm5ObWE3QmRwNUU
- https://drive.google.com/open?id=0B0NS-URBofBLRWhuZkhsdVdJT3M

[Discuss event status model, soft deletes (if that's the best way to proceed) and the corresponding details](https://beta.frontapp.com/inboxes/shared/d_architecture/open/331704993)

- Update data to have 'deleted_at'
- Update pine to set 'deleted_at' instead of actually deleting
- Also create universal permission filter to hide 'deleted_at' items / analytics accounts will be whitelisted to have access to that
- There will be a constraint to hide devices that are deleted (like, for instance, devices that are not owned by the user are filtered out)
 -Current problem is that names don't get reclaimed

- Good soft-delete case - users accidentally delete device, currently we have to dive into logs to recover info

Actions:
* Conversation to-be-continued (Alexandros, Petros, Page, Ilias)

[Discuss running git gc in resin-git](https://beta.frontapp.com/inboxes/shared/d_architecture/open/329595901)

Actions:
* Move to EFS instead of running git gc (Devops team to handle the transition)

[Discuss adding the ability to modify ntp servers either by directly letting users add a timesyncd.conf in resin-boot or by adding a config.json field for it](https://beta.frontapp.com/inboxes/shared/d_architecture/open/327078889)

Actions:
- We can put it in config.json - no objections were raised on this
- Specifics to be discussed with device team - https://github.com/resin-io/hq/issues/755

---

### 24 May 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/SEEDVeQZuHnGy11DIy0-vUcD56Y)

[Scaling VPN](https://beta.frontapp.com/inboxes/shared/d_architecture/open/323213443)

- Relates to pen source + soracom roadmap
- Would be nice to migrate vpn to present server
- idea to have vpn offer rest of infra a service - tells you if a device is online, where you can reach it etc.
- if so , the vpn is only one of other potential ways to do that
- you could have ngrok, other experimental thing, soracom, even open internet if device has ip
- the default is no-vpn - i.e. periodic polling from device

- How can we separate it. We could:
  - Separate it in presence server to say if device is online and if it can send messages
  - We could offer a full-fledged tcp path to the device
  - With presence server we could combine it with the vpn
  - The API could also be the presence server

- Device connects to vpn 
- Over vpn protocol, it uses some form of pinging/communication that allows the openvpn server to know when it is connected or not
- The API interface is more abstracted, device uuid is online/offline
- The API does not manage heartbeat etc.

- Example: ipv6
  - What type of work would it take to work with ipv6 devices without vpn?
  - It'd be easy to do if we were fine to pass traffic through resin.
  - openvpn client would have a program to say to some server that 'I'm online, here's my ipv6 addr'
  - public urls would hit proxy server, which would then connect directly to the device
  - Ideally, public url would resolve to ipv6 device directly. In that case we'd have to work on the DNS level

- Example: integrating with soracom
  - We'd have to allow multiple VPN servers to exist (curently we have 1)
  - Need to scale VPN / more instances
  - We'd then a have more types of them / e.g. VPN servers for soracom devices, so soracom devices urls would go through soracom server

- Example: ngrok:
  - If device can maintain multiple ngrok tunnels open
  - You need one control tunnel / can be just a connection to our ngrok controller

- Ideally, we'd like to be able to see, for a single device, the status of OpenVPN and soracom links

- **Actions:**
  - ~~Spec 1 : how to scale VPN~~ https://github.com/resin-io/hq/pull/930
  - Spec 2: How can we add different types of servers (presence/tunneling servers) that have interfaces to tell you
    1. online status of device
    2. how to reach a device

[Implementation details on how to merge managed and unmanaged builds.](https://beta.frontapp.com/inboxes/shared/d_architecture/open/315492071)

- Suggestion: have 'resin_server' property in 'config.json' and behave accordingly for managed/unmanaged images

- In unmanaged
  - supervisor will still start, but it should behave differently
  - vpn could be configurable .
  - vpn needs 3 things to start:
    - uuid
    - api key / this will be missing from unmanaged / openvpn client should handle this and not start if this is missing
    - openvpn server address
  - The provisioner could be simplified by injecting missing info ^ (after interacting user)

- We could inject a vpn configuration file only for managed builds

- For flasher images we don't start supervisor and resin-device-register only runs in flasher images
- resin-provisioner downloads supervisor and creates a managed device from an unmanaged one
- In rpi3 the host creates UUID (openssl rand key) , same routine for a key called api_key. Then , it starts supervisor which takes over provisioning process
- Should start moving registration to hostOS , it needs these credentials
- The only reason we have  resin-device-register is for flasher types
- Can we use supervisor during flashing?

- We could add rust binary to remove code duplication

**Actions:**
  - Make supevisor to run in mode for unmanaged devices
  - It already supports setting mode (could be as simple as setting offline to true in config.json) - Need to check with Pablo
  - Make systemd conditional on vpn credential file
  - We need an object that if exists it'll mean connect (managed device) and will contain all needed info, if not it'll be unmanaged
  - Notes
    - Need to decide on implementation details on how to activate services
    - in managed, atm openvpn client tries to connect indefintely
    - in unmanaged, we won't have to change anything because the openvpn config won't be there at all. So systemd service will not start, because the file condition will not be met
    - in summary, there's no need for differentiation as long as the openvpn config does not exist in the unmanaged version
    - vpn configuration will exist in all builds (managed/unmanaged)
    - for vpn file to be created we need api key and uuid
    - til that the openvpn client uses the provisioning key , which fails at first
    - wrt to uuid gen - even if hostOS generates it, supervisor stores it so if you try to reprovision it won't work. We have duplication of uuid / supervisor sqlite and config.json - this will get fixed
    - issue because even if you remove config.json entry for uuid, supervisor will use sqlite one and it will fail

[Nested Changelogs](https://beta.frontapp.com/inboxes/shared/d_architecture/open/324349667)

- Some dependency changelog entries might not be relevant
- Example of etcher deps we'd like nested changelogs for:
  - drivelist
  - image write
  - mount utils

- There's a build vs source division
- Nested changelogs should be for build artifacts and not for source code
- Etcher has nailed-down components in source tree (npm-shrinkwrap.json)
- It also has multiple artifacts created from that source tree
- If you put changelog in build artifacts you'd have a changelog for every version
- We want one big changelog for windows, mac etc fixes

- Idea: there's an intermediate step , when all source deps. are locked and this is where nested changelogs are about
- Idea: have a single build (e.g. SDK ) to generate nested changelog

- We'd generate nested changelogs during build and not during versioning of the source
- In etcher this becomes problematic - we have multiple builds
- We have intermediate state - source + locked deps
- Preference to have a single changelog

- Talk about bump + branch approach

- Bump + branch: we don't want the build process to put the shrinkwrap in master, cause subsequent builds won't be updated, so we branch off, commit shrinkwrap , maybe other files like docker deps and that's the commit that gets tagged as the frozen source from which all builds will be produced and deployed to npm , dockerhub etc.

- In etcher, where you already have shrinkwrap, you do nothing as far as shrinkwrap is concerned, if there are other things that move around the branch would be the place to lock them.
- In case of ecther, the main usecase of npm shrinkwrap is that we don't want anything get updated without us knowing it
- In the bump-and-branch, you're only intersted in reproducing a specific builds
- Having everything moving loosely , on one hand, you get fixes/features, on the other hand you things can break

- In etcher, we could have resin specific modules with floating versions, or packages we trust in general. In that case, these will still be locked just before build in a bump and branch
- npm allows partial shrinkwraps (npm 3 issue https://github.com/npm/npm/issues/7108)
- (npm 4 doesn't support partial npm shrinkwrap)
- npm 5 just got out (need to check)

- Etcher idea: have node_modules as a tarball available somewhere
- We can consider it as build artifact

- Bump and branch: versionbot is going to make a new version, then a branch, nail down all deps and put them in the branch
on that branch, the builder will run

- Are there any transformation before publishing? Like doc generation, png generation - any shared step of the builds could go in this first step

- Packaging and build implementation
  - The etcher team has a method to get frozen source tree and generate a bunch of things
  - sdk/cli/gui , even on the gui it branches and creates a windows version (appveyor) a mac version (on travis) a linux image if run w/ an image flag and recently .deb and .rpm 
  - It does incremental builds (tries to cache pre build)

- Build system:
  - consists of many bash scripts (30-40) per task
  - e.g. signing
  - they are orchestrated by Makefile
  - tons of scripts for things like cli packaging, rpm etc.
  - Makefile detects your OS, allows you to select target arch (64/86)
  - In linux you can generate everything except app image (needs container)
  - Creates a frozen source
  - Targeted for nodejs/electron projects

- cli , rust, enm, wifi-connect will all need generating packages - these worlds should collide

- etcher has a per PR versioning scheme
- Vanity semver approach / marketing semver

- Talking about using versionbot to enforce internal/external contirbution patterns

Adding publishing
- idea: the commit that upgrades your dependency mentions that it affects the cli/ use commit scopes
- idea: for floaring deps, we won't have commits to say ' this dep is for ui and this dep is for gui etc.
  - we could mark 'core' components  that are used by all components / common deps
e.g.
- nested_changelogs:
  - dep
     - category: [core]

- We'd like the nested changelog to be on master - https://www.flowdock.com/app/rulemotion/r-etcherprv/threads/zuFJKu9-wKumVpw40lBK3RceaGD

### 22 May 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/DHS5eSzMyAUP2dG1Nwu8AM1fbeK)

[Discuss how to distribute container images of device types so that they can be consumed by flasher/resinhup and run standalone with docker](https://beta.frontapp.com/inboxes/shared/d_architecture/open/319364093)

* Raised by lifeeth
* Goal: The idea is to have a `resin device spawn` and start a device of any type
* Praneeth has done some work on qemu device type
* The idea is to have a single, runnable image and not a separate one
* If our changes are generic we could get rpi1 and run it under qemu

**Actions:**
- More work/investigation needed

[Support channels 12 & 13 for WiFi on Pi Zero W ](https://beta.frontapp.com/inboxes/shared/d_architecture/open/322827943)

* Raised by floion
* Relevant to https://github.com/resin-os/resinos/issues/309
* We want the user to select country and our OS will select correct channels
* Wifi issue - some bands are illegal

**Actions:**
* The first step is to create test setup by putting country code in config.json in the right format and have crda to get that info
* The end goal is to have this configuration added in config.json during download time by the users from the UI
* In the meantime we will inform users of the workaround i.e. using iw command in the container

**Building images for DT**

* We want to make their life easier 

**Actions**
* We'll give them image that they'll use, won't be able to download that image from resin panel but will be ok for them till we give private device support and hostOS apps
* We should provide both dev and prod images
* We'll push artifacts in google drive plan (Florin/Carlo can upload them there)
* We'll then share images with DT
* Need to schedule a call with Niklas

[Which automated tests should be run against production, and how should we mitigate their impact there](https://beta.frontapp.com/inboxes/shared/d_architecture/open/317799637)

* Raised by pimterry
* Main problem - sdk tests are a lot, hammer api, take 30 mins to run, create reasonable amount of traffic to api, send emails, are noisy in general to sales/emails/analytics
* Should we throttle?
* Running tests is painfully slow already , throttling will make them even slower

**Actions:**
* Add extra property in the model that this is a test account
* e2e tests should create a new user to test user creation as well
* Let's add a flag ('fake') 

[Adding webhook capability to the api](https://beta.frontapp.com/inboxes/shared/d_architecture/open/317859865)

* Raised by pimterry
* UI is doing a lot of polling. Note that with the current configuration it should already stop, or at least decrease, polling when the page is inactive.
* This came up with the sign up email workflow: when you post to the user resource, wait 10 minutes and then send mail
* Cannot easily do websockets / the hook can happen on any instance while the websocket connection will be in one only
* Discussed pinejs-backed hooks:
  - We'll also need it for integration with cloud providers
  - If users ask for this, let's make it a paid feature
  - Excample: a device gets created, API needs to figure out which hooks to run and these are associated with the user.
  - Hooks are resources

**Actions:**
- Have API endpoint that says I want to listen for this resource and then calls the submitted request url/hook
- ~~Need a WIP spec (drafted by Page, prob. implemented by Giovanni or Ilias)~~ https://github.com/resin-io/hq/pull/926
- If resin's services could create hooks we'd solve many problems

[Asking 'have you gotten permission from the user?' and asking resineer  to enter 'yes' before proceeding](https://beta.frontapp.com/inboxes/shared/d_architecture/open/321163595)

* Raised by sonyagreen

Two approaches
- Have a 'yes' or sth that asks you to confirm in the ssh script
- Ask you to confirm that you won't use this access without asking the user before merging your resindeploy key (that allows you to access devices)

- As part of our support access process, we could use resin ssh 
- Concerns were raised on cli having extra features that users might not use (but we already do this for UI)

**Action:**
Short term solution: Add confirmation prompt on script that handles admin ssh access in resindeploy servers (Jack or Hedley could work on this)

---

### 17 May 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/fPI66-t8cOV0-vo58edcVmRGM03)

[Discuss image-maker](https://beta.frontapp.com/inboxes/shared/d_architecture/open/318097795)

We've been working with Lucian to change the way it interacts with image maker.We should discuss this more broadly. 
ResinOS 2.0 has set new requirements

Right now the API is an intermediate between UI/image maker - downloads are proxied through it
We'd like to have UI downloading directly from image maker

The config.json does not apply to 2.0 images
It seems like the API is prescribing the format of the config.json

There's an assumption that all the configuration is  in the config.json file, which is no longer true

Problems

- There's a generic config file (prob in API) that creates config with ssid/pass
- It's version agnostic, so even if you ask for 2.0 image it'll still return this file
- API (or img maker) should send the config schema to UI

The image maker must be an unprivileged component
Idea: use aws lamdas for image maker

The image maker should be receiving a request to create everything that the image needs (that request will be POST)
Some fields from the schema sent to the UI could be autofilled

Need to break up configuration file in two parts/steps:
- UI fills up some fields
- API filling up the remaining fields
Q: How does the UI knows which fields to fill in?
  - We can have a 'filled-by-machine-only' flag in the schema

There is consensus that the API is required to fill the 'filled-by-machine-only' configuration fields

Discussed about how easy would it be to use nodejs-rust bindings

**Actions:**
- High level objective - we want to make the image maker much simpler than it is right now
- Need to move to reconfix
- Work towards getting size estimate directly from S3
- Focus on extfs
  - Implement file operations in extfs
  - Shared interface with fatfs module, then use it in image maker
  - By the time this is done, we should have reconfix by device team and then can integrate with image maker

[How to add supervisor releases to the API without direct database modification](https://beta.frontapp.com/inboxes/shared/d_architecture/open/315611261)

**Action:**
- Ariel can build another resin-admin interface similar to the one that is in progress for permissions management
- Make sure there is an API to update the supervisor versions that can will eventually be used by the automated supervisor deployment process

---

### 15 May 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/gq0b1ediFN1ckwk6u9-7MSAInFN)

[Discuss based on on Alex comments/plan on how to start testing resinOS images in production](https://beta.frontapp.com/inboxes/shared/d_architecture/open/313248423)

Idea:
- If resinOS can run in a container, it could be an intermediate step of the update process
- Then you'd have a host, in a container
    Questions:
        - What happens with the partitions that are already mounted?
        - Ditto on already running processes

**Actions:**
- Testing should be done in production
- Should still be done in staging to make sure 
- Hybrid: test staging image maker and everything else in production

[Discuss use cases and reasons behind pipage (streaming pipelines node module) to create a better understanding of it, and identify other potential uses](https://beta.frontapp.com/inboxes/shared/d_architecture/open/315723805)

When you make a pipeline you have to attach an error handler on every part of the pipeline, or else an error in the pipeline  will cause the whole thing to blow up
A usual pattern in pattern is pipe a -> b and b -> c and all handlers are configured to reject promises when fail
Pipage needs a single handler and makes sure that you dont get unhandled exceptions and crash

**Actions**
- Push adoption of pipage internally
- Pipage can be used in the builder and image maker as well
- We could organise a talk about this
- Blog about it!

[Discuss next steps for 1.x -> 2.x and 2.x -> 2.x resinhup](https://beta.frontapp.com/inboxes/shared/d_architecture/open/310909629)

Will worked on updating partition table

**Action:**
- Release 1.26 and then move to 2.x
- For the data partition, we plan to keep btrfs and only change to ext4 when we switch to 2.0
- We want to test 1.8 in staging
- We want to keep the self service hostOS update for 1.8 -> 1.26 and continue on the vendoring approach on the proxy
- Going far back: Finish 1.8 expansion, then move back to docker 1.10 and then attempt to move even further
- Events from proxy AND UI in mixpanel for resinHUP (https://github.com/resin-io/resin-proxy/issues/77)

[User inquiry: 'Is it possible to get download points for both resin-image-flasher AND resin-image'](https://beta.frontapp.com/inboxes/shared/d_architecture/open/308402565)

For every flasher device we create two images already

**Actions**
- The UI will be fixed by having a drop down
- We'll follow a similar approach to what we did for dev images (separate directories in S3)

[Discuss simple+harmless tasks recurrently evolving to large+risky refactors](https://beta.frontapp.com/inboxes/shared/d_architecture/open/315731567)

improving review speed
broadening scope of solutions
incremental approach to big changes
  - Can only be done in case by case

**VPN is now working properly 🎉**


---

### 10 May 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/M5lVyZsDm-1TvOG0r-tM_C-aw0g)

[Discuss our approach to api keys](https://beta.frontapp.com/inboxes/shared/d_architecture/open/308810507)

They key in config.json does not expire and don't have revocation implemented

Users have JWT keys, but they expire - however they can be renewed
JWT cannot be revoked easily , currently we do it by rotating jwt secret per user

We need to define where we want to use API keys. Based on this, we can decide what to use
(JWT, api tokens etc)

I want to create an API key that only has read access for specific parts (env vars, specific device, application etc.)
  - We can do this with our current permissions model
We could also store hash value of api key and only show the user the API key once , on creation

We could change the permissions of the api key to only renew.
This needs supervisor changes as well (there should be an implementation for renewal in place but we haven't tested it - yet)

Workflow:
Users can create keys
These should work for the cli/sdk
We want to remove the JWT from the cli
If we make the transition correctly, we probably can use it in older cli versions (actually we probably won't be able since cli reads jwt for info e.g. username for `resin whoami')

Currently dashboard, cli, sdk are using JWT
Dashboard renews tokens automatically
In the cli/sdk we want to switch and use the new API keys

Usecase: Have API keys that never expire and don't require. Ephemeral keys can be JWT, longer-lived ones must be proper API keys

**Actions**
  - ~~Write a spec (Ariel)~~ https://github.com/resin-io/hq/pull/861
  - We'd like an extra tab in the 'Preferences' section and have one similar to Github's, where users can select scopes and create API keys. At first
    users won't be able to select anything (no scopes in the first iteration)
  - The functionality to create API keys is already there (e.g. when trying to download an image the api key is injected into config.json of the downloaded image)
  - Test if key rotation works in the supervisor

[Avoiding sql queries to manage admin permissions in production](https://beta.frontapp.com/inboxes/shared/d_architecture/open/310948799)

**Action:**
  - Will add a dropdown in resin admin (Ariel)

**VPN Speed Discussion**

In the maintenance we used a beefy machine
Result: the more powerful machines with our current setup made no difference

Next steps:
- Arrange another maintenance window to test playground options
- We were able to recreate the failure mode in the playground environment and found a way 
  to fix it. The biggest impact seems to be by increasing TLS timeout value

Question: Why, without the fixes, devices fail to connect in the first place? We still try to figure this out.

**Actions:** (Will is leading the charge on this)
  - Try new configuration for tcp buffers and TLS timeouts
  - Verify that we have tcp no delay there
  - Select a maintenance window to test VPN configuration
  - Collect iperf data to between vpn server / device during the experiments to try to isolate the the problem in
   a specific network link

### 08 May 2017

[Discuss dev process for rust reconfix](https://beta.frontapp.com/inboxes/shared/d_architecture/open/308416933)

Internal, private, needed by the build context repos

One of the first users of will be image maker

**Action**
* Make a branch on reconfix and start rewrite in rust
* Setup Travis

[Allow the jenkins container build to be able to access private github repositories](https://beta.frontapp.com/inboxes/shared/d_architecture/open/308421153)

Main issue:
* The key exposed to the build context had access to more things that the thing we needed to clone
* Solution 1
    * Expose key that has access to that repo only

We can store credentials in jenkins
We'd need to manually load them into a keyring/agent
Forward socket to the build system

[Come up with a better process for adding/removing admin privileges](https://beta.frontapp.com/inboxes/shared/d_architecture/open/301509725)

Have finer level permissions for:
- Support level access (bigger group of people)
- Admin level access (smaller group of people)

**Action/Plan**:
  1. Solve Jack's problem , allow doing what Jack does over the admin panel
  2. Fix key problem, which is allow people access devices without private key
  3. Fix user problem, add some type of user authorization, we need to figure out levels of access to grant engineers, and how these will be granted
  4. Add proxy/vpn support for selected users to ssh to hostOS

**Extra: discussed how to drop the all powerful ssh key**

 - Have device query public ssh keys from api (possibly not doable with dropbear)
 - proxy could create ssh key pair and send it to the API

**Action:**
  - De-entagle the ssh key story (needs investigation)
  - Look into integrating proxy with Vault


---

### 05 May 2017

[Flowdock Thread](https://www.flowdock.com/app/rulemotion/r-process/threads/LGmS2vG4DWr3bWnzWy53A4uon5a)

[resin wifi connect next steps](https://beta.frontapp.com/inboxes/shared/d_architecture/open/294484437)
* core is the one-shot flow we are writing https://github.com/resin-io/resin-wifi-connect/tree/server
* network-manager backend https://github.com/resin-io-modules/network_manager
* first release, same control flow and interface as v2 (uses core and network-manager backend), also release core for people to wrap as they like

* Need to decide on sane defaults and control flow for the next version
* release for raspbian - backend for netctl
* release for edison - some way to run device specific code - modprobe
* load custom resource, html etc.
  * boot partition
  * endpoints impl in the user container
* Different front ends i.e. bluetooth, touchscreen
* packaging apt-get etc.
* network maintainer service, always try to maintain a connection
  * what rules, configurability
  * cascade through interfaces and connections continually trying to connect
  * restart the service
  * reboot the device

[Tableau data connection](https://beta.frontapp.com/inboxes/shared/d_architecture/open/304884511)

* Option 1
  - expose db ports and restrict access to tableau server IPs
    - Can we restrict tableau's view?
    - It's almost certain that we can
    - limit a specific user account to specific source ip
    - make said user read only
    - limit their view to specific tables of the slave DB instance
    - Ideally we'd like to 'blind' visibility of env var values, make only names available
    - will be a read slave db
* Option 2 
  - a. run their 'sync' script/program (which only works on windows) on a Windows server
  - b. have a laptop in the office that does that
* Option 3
  - Tableau cloud is not desirable

* Actions:
  - Need whitelist of tables/fields to hide (Andreas)
  - After that, use an API mechanism to actually implement this (SQL configuration?) (Page)
  - Expose the DB to specific subnets (Jack)

[Per device target state](https://beta.frontapp.com/inboxes/shared/d_architecture/open/306115535)

- DT only needs an API endpoint initially and they will enable per-device target state programmatically
- UI/CLI interaction is desirable but not a high priority for now
- We are currently on track with regards to our  Mid-May due date

---

### 03 May 2017

[VPN latency issues](https://front.frontapp.com/inboxes/shared/d_architecture/open/304121413)

* Actions:
  * Add artificial latency on the device side (Will)
  * Emulate web url traffic (check if traffic load is inbound/outbound) (Will)
  * Install network monitoring tools on resin-vpn in production, compare collected metrics with the playground environment (Kostas)
  * Install networking tools by default in the vpn containers (Kostas)
  * Longer term - consider measuring bandwidth usage from users

[Discuss using websockets to update the dashboard](https://front.frontapp.com/inboxes/shared/d_architecture/open/303550217)

* Actions:
  * Will pursue this as a Pinejs feature, an extention to the OData API (use OData queries again for other reasons)
  * Needs a spec for Pine after chatting with Page and Giovanni about it

---

### 24 Apr 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/VJW1A0SaHBnYl49adOexM3fApSK)

[Decide some next steps for resinHUP. Decisions around file-based or image-based, implementation language/libraries/tools, key design goals](https://beta.frontapp.com/inboxes/shared/d_architecture/open/288513607)

  * Meeting notes: https://docs.google.com/document/d/1YApOfPT9IU_ChQvVYSI82vFhfQf5FeggQWitjYOuoSg/edit

---

### 19 Apr 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/YGJERRm4PzEyq4Erpcm4PBqux2W)

[Transitioning an app to auth registry](https://front.frontapp.com/inboxes/shared/d_architecture/open/285871953)

- Builder will stop pushing in the old format at some point
- Question: How are we going to data mine this? 
  - When we start pushing to the new format, old devices won't be able to use it

- 2.0 only fleet enforces pushing to authenticated registry

- What do we gain by saying that a fleet is a 2.0 only?
- Any app created after a certain point of time becomes 2.0 
- Problems:
  - We have old apps with 1.x devices

- Every non paying customer should be locked into 2.0, for new applications only
- Idea: Give a notice that in 6 months 1.x will stop receiving updates

Use switch box, when it's on it affects OS you see on download and the push behaviour as well. 
  - We could name it as 'secure registry mode'

Introduce version field for application as a number
  - Existing users should have 1
  - new users should only have 2

Action: 
  - Work through migration plan (Sonya/Alison/Shaun) - https://github.com/resin-io/hq/issues/790

[resin device spawn -  creating a docker-based (or vm-based) resinOS resin-managed device, for users without a device](https://front.frontapp.com/inboxes/shared/d_architecture/open/288551435)

- We could bundle qemu (or require it to be installled)
- We can use docker and on mac it will be running inside hyperkit

- Follow getting started guide instead of flashing card
  - You can use `resin spawn` and device pops up (or even have a bunch to test fleet stuff)
- The cli will need docker as a dependency
- For docker for windows it'll need to switch to a linux mode
- Seems useful to have, as a primitive, as a technology that will enable us to do things
Action: 
  * Need more investigation on how to actually implement this - https://github.com/resin-io/hq/issues/791

---

### 10 Apr 2017

[Flowdock thread](www.flowdock.com/app/rulemotion/r-process/threads/6gdAOAeDwEWH9ofoZ916tGDaPVf)

[Figure out the process of spawning a Production identical environment to run load tests with simulated devices](https://beta.frontapp.com/inboxes/shared/d_architecture/open/274910663)

- Modifying staging to prod will cost an estimated 2-3k / m
- We can simple spawn a production clone (90 $ / day)
  - Will probably cost less, there are redundancies we don't need in staging

* **Actions**
  - Spawn a production clone
  - Start with replicating the conditions that caused the VPN meltdown when we deployed with OpenVPN changes
  - Proceed with API/DB and Registry tests

[Discuss how to remove the need for sudo on resin local commands](https://beta.frontapp.com/inboxes/shared/d_architecture/open/272283475)

* **Actions**
  - https://github.com/resin-io/resin-cli/issues/477
  - Spec/Draft description of suggested solution

[Decide on an option for resin sync/ssh collaborator support in the WIP PR](https://beta.frontapp.com/inboxes/shared/d_architecture/open/277146009)

* **Actions**
  - Do what git does (fetch JWT)
  - Eventually we'll transition both git and proxy to api-backed ssh auth  

[Define how we take on WiFi based microcontrollers and make sure we have a clear documentation/story to tell the users](https://beta.frontapp.com/inboxes/shared/d_architecture/open/273955829)


[Discuss module that copies our standard configuration files to a project when included](https://beta.frontapp.com/inboxes/shared/d_architecture/open/270589483)

* **Actions**
  - Include es6 (and typescript, when it's ready) resin-lint
  - Continue discussion in https://github.com/resin-io/process for adding more 'global' configuration files and possibly renaming resin-lint to something more general

---

### 07 Apr 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/EA2nTW1_tA900VAMMzLxmQMX4Ck)

[Fixing resin promote issue with initramfs](https://beta.frontapp.com/inboxes/shared/d_architecture/open/273526869)

[Reducing impediments to external resinOS contributors e.g. jenkins, changelogs](https://beta.frontapp.com/inboxes/shared/d_architecture/open/269684571)

**Actions:**

  - Try to fix the builds / jenkins accepting external repos
  - Then proceed to fix external contributor impediments, like not requiring changelogs

[Discuss device behaviour when an app is deleted](https://beta.frontapp.com/inboxes/shared/d_architecture/open/268398079)

- Currently there's a foreign key that cascade-delete devices when an app is deleted
- We're thinking keeping devices around in a 'purgatory' state or default app

**Action:**

  - Needs spec (Shaun) (UI/Backend changes)

[Short-term solution for custom device support](https://beta.frontapp.com/inboxes/shared/d_architecture/open/274752821)

- In the future we want people to push yocto builds. 
- Until then, you'll be getting a config.json and connect your device to a generic app
- People can then at least test their builds

- E.g. for DT we took repo and integrated
- Getting a device support is a paying service (to get it under our control, integrate builds etc)
- ETA on getting generic apps ?

**Action:**

  - Write spec on generic device types (Andrei)

[Resource limits for builds, what should they be](https://beta.frontapp.com/inboxes/shared/d_architecture/open/272855105)

- User talked about fork bomb
- Need to decide on limits/protection (memory limit, number of processes)

**Action:**

  - Give 70% memory to every build (Cameron)
  - More investigation needed

[Node version support in resin modules: do we support Node v4? Should modules like etcher-image-write be v4 compatible or should CLI/other consumers handle transpiling?](https://beta.frontapp.com/inboxes/shared/d_architecture/open/274834777)

**Action:**

  - We should support node v4 (not LTS but maintained till Apr '18)
  - Act on a case-by-case basis (e.g. etcher-image-write uses few ES6 features and module could be refactored to ES5)

---

### 05 Apr 2017

[Flowdock Thread](https://www.flowdock.com/app/rulemotion/r-process/threads/8K_1Df0lCQ1audmxNHXFWl4IguY)

[Discuss a new approach to the standalone images that won't require separate builds](https://beta.frontapp.com/inboxes/shared/d_architecture/open/270761573)

- We don't want to have separate resinOS builds
- The desired outcome for us is having a single image, prebundled with the union of standalone/resin.io images. Whenever we do a resin.io build we can release it as a resinOS image too.

- Supervisor will be part of resinOS
- Added value from having Supervisor shipped with resinOS:
  - For users:
    - preloaded apps work
    - APIS for reboot/identify etc. available
    - wifi connect
    - (probably) rdt features
  - For us internally:
    - We build a single image
    - It simplifies the provisioning/promoting story

Supervisor should start in offline mode, which:
  - supports preloading
  - doesn't try to provision
  - doesn't check for updates
  - basically does no external connections
  - offline/online mode controlled by config.json flag

Actions:
  - Lack of keys could/should be interpreted as offline mode
  - images will still have provisioner, the provisioner will not need to pull supervisor in
  - The provisioner will have to be part of all images
  - The provisioner can be in either host or supervisor / TBD
  - (side task mentioned) Kill sideloading API (and make major semver change)

[Discuss device ownership](https://beta.frontapp.com/inboxes/shared/d_architecture/open/268397659)

What happens when you move an app to another and the other app is owned by a different person?
Need to discuss this in the context of device api keys

When we auth to the vpn, we use uuid and api key
In the supervisor we use user-specific info for:
- mixpanel events (username)
- provisioning device and dependent devices (userid)

Old images shouldn't have a problem provisioning if usernames are changes

Suggestion
- Create 'move device' action in the proxy

Action:
  - Draft Spec

**Discussed resin.io one-org-per-user**

[Discuss what to do about emulated builds with local builds](https://beta.frontapp.com/inboxes/shared/d_architecture/open/271054087)

- Related to [local builds spec](https://github.com/resin-io/hq/pull/732/files)
Action:
  - Prevailing option was modify user's Dockerfile on-the-fly to include qemu instructions

[Discuss getting latest docker version in our next os version](https://beta.frontapp.com/inboxes/shared/d_architecture/open/272187053)

---

### 03 Apr 2017

[Flowdock Thread](https://www.flowdock.com/app/rulemotion/r-process/threads/AbfvBdHEdIk8XFVhoZfClGlc5Ah)

[Several customers and prospects would like to be able to use private docker registries for their images. We would need a way to manage their credentials for this process.](https://beta.frontapp.com/inboxes/shared/d_architecture/open/260785461)
- We'd prefer not to store registry credentials
- Half of the prospects have mentioned legal reasons/teams
- We could tell interested customers we are working on trustless resin and that we are adding authenticated access to registries (ETA: 1-2 months)

[How should we deal with the non-semver version format for ResinOS 2 breaking existing code in our other components?](https://beta.frontapp.com/inboxes/shared/d_architecture/open/269284163)
- Actions: 
  - proposed version from now on : 2.0.0+revision, use + build metadata scheme 
  - rebuild 2.0
  - Remove dev/prod from pretty name
  - Store variant in separate field in os-release (os_variant) , which needs to be an API field as well
  - ~~Supervisor can send additional data to API without issue~~ https://github.com/resin-io/resin-supervisor/pull/418
  - ~~API - side needs an extra os_variant sbvr field and migration~~ https://github.com/resin-io/resin-api/pull/166

[Can we start using autohat to automatically test the cli, and what changes would we need to make to the framework to do that?](https://beta.frontapp.com/inboxes/shared/d_architecture/open/261434045)
- Actions
  - Extend e2e test workflow to include cli 
  - Need to add cli tests in robot framework
  - Before adding more, we need to transform UI sets to robot framework from selenium
  - We want to gradually to 
    - move away from robot to JS framework
    - add implementation of tests into repos
  - Shouldn't be hard to transform to cucumber, most tests run `resin-cli` commands

[Discuss the problem of env vars disappearing from the api and not being altered in the config.txt](https://beta.frontapp.com/inboxes/shared/d_architecture/open/268368959)
- Discussed overlaying options in appending vars at the end of config.txt which would shadow previously set vars
- We'll probably use the local sqlite db to hold default config.txt vals

---

### 29 Mar 2017

* [Discuss next steps for VPN issues](https://beta.frontapp.com/inboxes/shared/d_architecture/open/261567383)
  * Past incident when we deployed https://github.com/resin-io/resin-vpn/pull/20 on production - https://app.datadoghq.com/dash/137608/vpn-tcp-stats?live=true&page=0&is_auto=false&from_ts=1488217295201&to_ts=1490809295201&tile_size=m
  * TCP Mem dropped significantly
    * Note on previous tcp mem issue we had on vpn (caused by eternal FIN wait connections) (https://github.com/resin-io/node-tunnel/pull/8)  
  * Praneeth is working on a script to simulate devices for stress testing
  * Stress tests will also help us identify the current VPN bottleneck, which we haven't hit yet with the current number of devices
  * On the speed issue
    * Latency/Speed issues were reproduced on devenv
    * The original fix seemed to address issues on latency/speed on staging (5x faster)
  * **[Action]**: stress test in an environnment that is an exact copy of production (resin-playground)
  * **[Action]**: Look into tuning TCP settings on the machines that host `resin-vpn` container.

* [Discuss strategy and implementation for deleting accounts](https://beta.frontapp.com/inboxes/shared/d_architecture/open/255935333)
  * Currently DELETE endpoint doesn't require 2FA
  * Maybe soft delete for devices will most likely also be desirable
  * Undelete feature may be related to historical data spec
  * Discussion also related to https://github.com/resin-io/hq/wiki/Architecture-Calls#6-mar-2017
  * Actions
    * Add Delete Button
    * Have extra information/notification when adding devices from a collaborator
    * Have an extra confirmation on devices that will be deleted when deleting an account

* [Discuss a sane deprecation policy for APIs that are device facing](https://beta.frontapp.com/inboxes/shared/d_architecture/open/263272359)
  * In general, we are conservative with regards to API deprecation (haven't broken any API endpoints till now)
  * Even if that happens, if the device is connected to the VPN we can fix it

* [Discuss what is the best way forward for the implementation of per device target state given the deadlines and the roadblocks in pine](https://beta.frontapp.com/inboxes/shared/d_architecture/open/263382649)

  * We want to change references to be builds instead of commit string
  * Link everything to builds, when deploying change target to build
  * Currently it's challenging for pine to have an SBVR model like:
    * `Device should have 'build'`
    * `Device runs 'build'`
    * **[Action]**: needs pine changes

---

### 27 Mar 2017

Postponed

---

### 24 Mar 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/B_EoMLEGFAGybioGwfU1QM9YlmF)

* [Discuss change of plans regarding the hybrid registry](https://beta.frontapp.com/inboxes/shared/d_architecture/open/256674053)
  * PR in supervisor still actively reviewed
* [Discuss labelling, filtering, and deploying for groups of devices](https://front.frontapp.com/inboxes/shared/d_architecture/open/258092291)
  * [promise - May 2017] Let potential resin users (Google) know that they will be able to perform deployments on device groups in a fleet.
* [Dev process: Discuss only allowing rebase merges in GH repos](https://front.frontapp.com/inboxes/shared/d_architecture/open/243061323)
  * We will avoid rebase merging for these main reasons:
    * Verified commits are lost with github rebase
    * It messes up history, because there is no merge commit and adds commits on top of master (you can't easily tell if a series of commits belong to a single PR)

---

### 22 Mar 2017
[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/X3OuWtflVwEiIIdwSZShlT027SE)

* [Discuss deployment process plan for Backend (service containers), npm modules, supervisor (and more)](https://beta.frontapp.com/inboxes/shared/d_architecture/open/255942643)
  * With regards to signalling a keyframe deployment in the repo, the suggested process is to make a PR that will  get merged after the deployment has succeeded.

* [Discuss managing contracts spec](https://beta.frontapp.com/inboxes/shared/d_architecture/open/255992405)
  * Resolved a few outstanding questions and briefly discussed remaining open items

* [Discuss how volumes in multicontainer will work](https://beta.frontapp.com/inboxes/shared/d_architecture/open/256748599)
  * Will need purge per app and per container

* [Discuss enabling DLM by default](https://beta.frontapp.com/inboxes/shared/d_architecture/open/241944239)
  * This is a module included in the mainline kernel so we could probably do it

---

### 20 Mar 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/Bf1cfAGAGztLrPBi2Eunv4KUdxs)

Open architecture items for today's call (right after the all hands call)

* Supervisor rearchitecture
  * [Container sideload API](https://beta.frontapp.com/inboxes/shared/d_architecture/open/230278347)
* [Discuss multi-container issues and roadmap](https://app.frontapp.com/inboxes/shared/d_architecture/unassigned/254103805)
* [What are the pros/cons of running VersionBot as a User rather than an Integration](https://app.frontapp.com/inboxes/shared/d_architecture/unassigned/253944283)
* [Discuss the problem of duplication in resin-boards when using one machine per repository](https://beta.frontapp.com/inboxes/shared/d_architecture/open/250127297)
* [Discuss ways to disable audit](https://app.frontapp.com/inboxes/shared/d_architecture/unassigned/251614869)

---

### 16 Mar 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/c92aUFLx6n2fwJT-qxKQpOpOSna)

* [Discuss components module + redux module with etcher/ui/marketing team](https://beta.frontapp.com/inboxes/shared/d_architecture/open/250213367)
* [Discuss the problem of duplication in resin-boards when using one machine per repository](https://beta.frontapp.com/inboxes/shared/d_architecture/open/250127297)
* [Components need better error reporting](https://beta.frontapp.com/inboxes/shared/d_architecture/open/249321755)
* [Discuss system and process for tagging and tracking paid customers](https://beta.frontapp.com/inboxes/shared/d_architecture/open/222966103)

---


### 15 Mar 2017

https://beta.frontapp.com/inboxes/shared/d_architecture/open/243045479

##### Security Overview

[Supervisor API responses](https://beta.frontapp.com/inboxes/shared/d_architecture/open/239093475)

JSON of the /supervisor endpoints
JSON or these 5 strings (API)
stack traces should be encapsulated in JSON

**Action:** see if there are requests in api and check the user agent, check who uses them
**Action:** we fix in supervisor before release v2 that everything is JSON
for v2 allow on JSON , 5 generic strings (legitimate supervisor responses)
errors should be in JSON as well

[Backend services](https://beta.frontapp.com/inboxes/shared/d_architecture/open/247795387)

resin-builder
    - gets user token from git, can use it to do all things in resin api
    - still, user token is too much power to be handed out, because resin builder should apply it
    to specific app, not every thing owned by user
    - probably the token 

- resin-git is a powerful service. api trusts git to check ssh key, git gets auth token for every user. If we wanted
    to move decision/trust problem away, we'd have to validate ssh key within API
- api could instead issue limited JWT for specific app/build id
- pinejs fine grained permission control
**Action:**
    - Prioritise making services unprivileged, then trim down permissions in JWT tokens

- resin-proxy
    - master ssh key
    - external service
    - vault project
        - one-time password
        - device can ask vault (shell script)
        - device creates https connection , sends it username/password it received (which are one-time)

Proposal:
  - remove master ssh key from services and use a server like vault
  - Hybrid system with vault / user and master ssh keys

Problem:
  - Marketing story has to be easy to communicate / users want to see certificates. We should look into that

**Action:**
  - Check certificates infrastructure / PKI

Registry
  - Currently unauthenticated
  
[Discuss how builder could synchronise state across hosts, to combat concurrent builds](https://beta.frontapp.com/inboxes/shared/d_architecture/open/243045479)

[Versionbot merging without changelogs and version bumps](https://beta.frontapp.com/inboxes/shared/d_architecture/open/248258891)

It is a bit unusual to have versions unpublished, because the rest of the ecosystem does
Discussed option of having opt-in versioning

Proposed action:
- Use branch per version, (e.g next-major)
- Versionist should generate changelog when major branch gets merged onto master
- All PRs to master get versioned and released
- Use next branch to group major versions

[Trusted boot for for Cree](https://beta.frontapp.com/inboxes/shared/d_architecture/open/248461345)
- What would we need to decide whether or not we can do it
- Trusted boot will work on imx6 platform
- Action: need to figure out their trust zone

Discussed Docker (item brought up by Yossi)
- We're currently having issues with failing network integration checks

[CircleCI vs TravisCI](https://beta.frontapp.com/inboxes/shared/d_architecture/open/239387731)
- Are there any arch considerations on whether we use circle or travis?
- Petros: No
- Alex wanted a logical separation e.g linux builds on circle etc, windows on travis etc.
- Jack prefers Circle (had issues with travis)
- Travis also has issue with OS X needs
**Action item:** Try both, get feedback

[Open Sourcing](https://beta.frontapp.com/inboxes/shared/d_architecture/open/240223961)
- need to hold up things that could result in competitive product, like
  - multitenancy
  - collaboration/groups

[How/when "deploys" are cut from sets of versionbot-made versions](https://beta.frontapp.com/inboxes/shared/d_architecture/open/240291711)
- Keep a next branch, when you are ready only then
- Need a system to keep 'next' fresh (manual rebase and/or have versionbot block merges if next is not based on top of current master)

[Merging usernames](https://beta.frontapp.com/inboxes/shared/d_architecture/open/225776394)

**Actions**:
- implement email verification
- should require an email per user
- should block social logins without an email
- make api keys a first class thing

---

### 6 Mar 2017

[Flowdock Thread](https://www.flowdock.com/app/rulemotion/r-process/threads/PvHttIMmYSpYUuxA2LnTcXJqxAt)

Bots Discussion (continuing from last arch call)

[Modelling builder behaviour in the database](https://beta.frontapp.com/inboxes/shared/d_architecture/open/232969841)

[Discuss the moving app fix or the user ownership change for devices](https://beta.frontapp.com/inboxes/shared/d_architecture/open/232670227)
  - OK for devices to have an owner
  - Think about devices not having an owner
  - Why is a non owner allowed to move a device?
  - Assigning someone as a collaborator essentially means that you are a fleet owner except for adding new collaborators
  - Actions: 
    - Before removing a collaborator (who owns a device) mention which devices will not be able to receive an update. Removing a collaborator means removing devices
    - Users that leave can delete the device
    - Need to revisit this item.

---

### 3 Mar 2017

[Flowdock Thread](https://www.flowdock.com/app/rulemotion/r-process/threads/VG2lboCLFLyugX5Nr6VXtCzwEFT)

[hubot vs procbots](https://beta.frontapp.com/inboxes/shared/d_architecture/open/232595583)
- We have two separate automation frameworks, it's not clear what is the right thing for the right job
- Processbots: have the ability to be triggered by events, they can have multiple source of events and multiple destinations. They support specialised execution / internal inheritance hierarchy and are currently stateless
- Hubot is limited by a single event source
- Similarities/differences between aws lamda and procbots
- Hubot - We'd like sight modifications to send responses to different channels other than the source
- Personal Hubot and personal credential management
- Want to connect github/front/discourse/intercom/gitter
- OSS roadmap
- Idea: Instead of having a bot, we could have a chrome extension

[NM modem for Disruptive Tech](https://beta.frontapp.com/signin?redirect_url=%2Finboxes%2Fshared%2Fd_architecture%2Fopen%2F232902357)
- To be continued, hardware is in London and we can start working on it on Monday

VPN Latency
- reproduced on devenv, next step is to test on staging
- server side only VPN configuration improves speed 

[Prebuild task containers](https://beta.frontapp.com/inboxes/shared/d_architecture/open/235540125)
- Discussed implications of running buildpacks in pre-build container
- Will stay with current approach , will discuss again

[Supervisor Rearchitecture](https://beta.frontapp.com/inboxes/shared/d_architecture/open/235478503)
- Supervisor should run on the host
- We want to keep everything on the DB, and we must make the supervisor initialize any other host services that currently use config.json
- How does the ECT authenticate with registries (possibly external) or delta server (and how does the delta server itself authenticate with registries) **TBD**
- resin-compose injects special variables like supervisor API key, resin appId, etc to the container

---

### 1 Mar 2017

- Arch call postponed (board meeting)

---

### 27 Feb 2017

- [vpn-api batching pros and cons](https://beta.frontapp.com/inboxes/shared/d_architecture/all/224033850)

### 23 Feb 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/I2Z--KslGt3ZKp_zl5WzJDy-33V)

* [Discuss how people can preload images + configuration](https://beta.frontapp.com/inboxes/shared/d_architecture/open/223871093)
  * No action
* [Provisioning logs](https://beta.frontapp.com/inboxes/shared/d_architecture/open/224611626)
  * **Action**: ~~Write spec / describe in more detail `.meta/diagnostics`~~ https://github.com/resin-io/hq/pull/367
* [Limited permissions user to allow user-side troubleshooting actions](https://beta.frontapp.com/inboxes/shared/d_architecture/open/221813982)
  * Desirable in development device mode
  * **Action**: discuss in a next arch call
* [rdt: authenticating the docker daemon socket](https://beta.frontapp.com/inboxes/shared/d_architecture/open/223225069)
  * docker daemon can be set to validate the clients and vice versa
  * to do it properly, both should verify each other
  * device generates a certificate, and then we need a second certificates. Actually, we need one cert for rdt clients. 
  * The question is, how does rdt get hold for that? Device has both certs and you can use ssh to establish 
ssh will be protected by the key, that the user will have to put when flashing the device
* [Disruptive Technologies 3G modem issue](https://beta.frontapp.com/inboxes/shared/d_architecture/open/228050605)
  * **Action**: set up a call
* [Discuss .resin.yml build-time variables and overlaps with Multicontainer/resin-compose.yml roadmap](https://beta.frontapp.com/inboxes/shared/d_architecture/open/227150505)
  * **Action**: need a spec
* HostOS size
  * 700mb - approved
* [Transitioning users to community support / Set up API as OAuth2 provider](https://beta.frontapp.com/inboxes/shared/d_architecture/open/226356340)
  * **Action**: We'll move forward with OAuth2.
  * We will probably have to go with openid

---

### 16 Feb 2017

[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/lZoZCWsYA4m4Dm0C9JJxmplU8_5)

* **Versionbot PR tagging and building - (carried over item from devops call)**
* **VPN latency issues**

---

### 14 Feb 2017

[Flowdock Thread](https://www.flowdock.com/app/rulemotion/r-process/threads/ZXBF1znkIOCZqecNnVXq7ay5kPf)

#### AutoHat interface
* If AutoHAT was a product, what would its interface be?
* Its currently limited to:
  * rpi, nuc, bbb
  * boots devices, toggles buttons (e.g. for bbb can provision flash) and that's all
* AutoHAT only controls SD Card and power
* If it was controlling network as well, it could get a device's ip
* **Action**: spec on what to write in SD Card/container to get ip

#### UX Regression in staging
* Discussed a few ways to mitigate it
* **Action**: needs more investigation 

#### Lerna
* **Action**: start with pine, maybe ui/etcher - showcase in sdk

#### VPN <-> API overview discussion
* **Action**: Spec is written and has received some comments, meanwhile we can continue with the implementation of some parts

---

### 13 Feb 2017

[Flowdock Agenda](https://www.flowdock.com/app/rulemotion/r-process/threads/OPh3F6mmpQuKhVamU9OUygul8S_)

#### Discussed items

* [Unifying/sharing tools between the ui and etcher](https://beta.frontapp.com/inboxes/shared/d_architecture/open/221657695)
  - Brainstormed on ideas, frameworks (e.g. ngReact) and processes (swap team members to get the two projects closer) to unify UI/Etcher
* [Supervisor re-architecture](https://beta.frontapp.com/inboxes/shared/d_architecture/open/220226447)
  - Focus on the device state API
  - Pablo's re-architecture notes: https://docs.google.com/document/d/198WxgntVwAoehYhuWWO7RK1Nbeok6a6fv8CVwv6yY8A/edit#
* VPN
  - Next steps
    - Discussed about using an ngrok-like approach to create VPN tunnels to mitigate delays that are very possibly linked to tcp timer/retransmission issues due to tcp-over-tcp 
      - This approach should bring us closer to the desired goal of having per-device letsencrypt 
    - Discussed about having the VPN as a separate service
  - [Fixing latency](https://beta.frontapp.com/inboxes/shared/d_architecture/open/220304085)
    - Attempting to fine-tune openvpn configuration settings can be risky, because a server-side change can result in incompatible changes with the current client-side configuration, possibly resulting in bricked devices
    - **Action:** Create benchmark and continue investigation

---

### 09 Feb 2017

[Flowdock Agenda](https://www.flowdock.com/app/rulemotion/r-process/threads/zm1rDvgUaOKuCnRp5uHx8yREnGU)

- [Discussed OSS builder](https://beta.frontapp.com/inboxes/shared/d_architecture/open/218001908)
  - Dockerfile module should be able to be used by rdt
  - Users ask for resin.io features in rdt, like Dockerfile templates, node.js etc.
  - Talked about buildpacks
    - Action: need to look more into buildbacks
    - Action: research alternatives (e.g. tutum )

- [Merging BBB BBG in a single type](https://beta.frontapp.com/inboxes/shared/d_architecture/open/219443527)
  - BBGW still needs a device type of its own
  - Pending discussion with Juanchi on device types

- **Discussed OS Versioning and investigated better alternatives to the current approach**

- [Device Types](https://beta.frontapp.com/inboxes/shared/d_architecture/open/220226168)

- **Discussed VPN - API (architecture overview)**

---

### 07 Feb 2017

[Flowdock agenda/items](https://www.flowdock.com/app/rulemotion/r-process/threads/8BYFUGNd77gKrYIR2LzLCiXxac1)

* **Pushing docker container directly**

  - Still looking for a way to map this properly with multi container
  - In the proposed model, containers are objects in the DB
  - Build is basically a release
  - We don't want to do docker push , want extra metadata. but, with docker push we get authentication (it'll prompt you for credentials, it won't print the unicorn which want to)
  - Instead, it could handled by resin-cli or rdt push
  - In the case of pushing locally built containers we'd basically need the results of docker save (a container). There are security considerations here with regards to checksums that we need to keep in mind.
  - Another option, instead of pushing a container, is to point to another repo (e.g. dockerhub). This would mean that you push wherever you want and send metadata to the builder that point it where to pull from
  - Pulling from a third party registry should allow us to use deltas, caching and shouldn't be a blocker for features like rollbacks
  - Idea/Proposal: Need to detach the build pipeline from the deployment pipeline
  - Idea/Proposal: git push a docker compose file - we'll need a way to pass build secrets because containers might be located in private registries. We can use this approach as a starting point and allow users pushing yaml files
  - Idea/Proposal: Break-out builder as a separate product - extra features include building yocto images and we're not aware of any service offering this currently.
  - **[Action]:** ~~spec builder secrets~~ pending: https://github.com/resin-io/hq/issues/12

* [resinOS (unmanaged) and its production applicability](https://beta.frontapp.com/inboxes/shared/d_architecture/unassigned/218955868)

  - Context:
    - The resinOS device will have a local command/api to promote it to a resin.io device
    - We also want to release a server (e.g. amazon AMI resin vpn server) that will handle authenticated connectivity to device do promote
    - The server will be optional but highy encouraged
  - Discussed auth issues with openvpn:
    - the rdt promote endpoint on the device is available to the container
    - if the container exposes that to the world (open http server) the device can then be hijacked
  - Discussed whether or not we should move forward with the  proxy/vpn idea that allows rdt promote remotely
  - Also discussed on rdt promote in general and how we should plan our next steps on converging rdt and resin.io
features (to be discussed in a product call)

---

### 06 Feb 2017

[Flowdock thread/Agenda](https://www.flowdock.com/app/rulemotion/r-process/threads/1TKE19xu9fm8OWwbvc0q1xDKM-n
)

* [Discuss AutoHAT issues with udev rules in the host OS so as to make this project a resin.io project](https://beta.frontapp.com/inboxes/shared/d_architecture/open/218004689)
  * Context
    - Autohat board has SD card reader
    - Can't uniquely identify SD card connected to resin boards
  * **[Action]:** Need more investigation to figure out to get this (i.e. udev rules) on resin

* [Discuss VPN <> API synchronisation solution and VPN scaling](https://beta.frontapp.com/inboxes/shared/d_architecture/open/216832552)

  - Overview:
    - Online/offline status that you can see in your dashboard
    - on/off means if its connected or not to the api. The API offers a rest api to the ui and is horizontally scaled. The VPN is currently a singleton server.

  - Question: How will a device record have the correct online/offline status if a device disappears? Currently the VPN won't update the status to offline.

  - Problems:
    - Synchronising status of the VPN with the database/API
whenever a device connects it will generate an event to the vpn server and change the state in the api (offline/online)
in the past we had some issues where the vpn would reset all device status, causing spikes to the API

  - Solution/Desired target state:
    - Spread out the updates in a controllable fashion so that they don't DDoS the API
    - Need to have a VPN heartbeat to the device and a threshold; if the threshold is passed the VPN should mark the device as offline.

  - Brainstormed on scaling VPN

  - Improving our current API device status model:
    - Note that the current timestamp field in devices indicates when it came online or offline
    - We need the following fields:
      - Field 1: State field (read by the UI)
      - Field 2: timestamp to indicate when the state changed (when was it toggled)
      - Field 3: timestamp to indicate how fresh the information is
    - If the 'freshness' threshold is passed and there's no update, the device is considered offline
    - The VPN will set, every X seconds, the state of the all the devices that are connected to it
    - Every VPN server will set the state of their devices
    - Optimisations:
        - If this loop runs every 10 seconds, we can immediately set the device offline in the next cycle

    - There will be two loops:
      - A 'slow' loop between API/VPN - the recurring synchronisation job between them (the loop that sets the devices status) can fire up at bigger intervals
      - A 'fast' loop between VPN/devices - when a disconnect happens there the device status of a device can be updated immediately

   - Heartbeat interval:
    - Use the active VPN tcp connection to poll for connectivity status of dependent devices.

  - Actions:
    * **[Action]:** Write a spec
    * **[Action]:** Fix spike and DDoS with a heartbeat approach. The API should have 'last heartbeat'
    * Need to sort out permissions on who can change the device state
      * Issue: can't set permissions on a field-level yet - if we have mixed data in the device state we can't have finegrained permissions
    * We need field-level permissions - state that is controlled by the device must be READONLY by the user
      * Idea: Might actually be correct to have a resource that is exclusively reflecting what the device has
    * **[Action]:** ~~Need spec for introducing a current vs target state model in the database/API~~ https://github.com/resin-io/hq/pull/636
      * Currently we have one table for device that has things/fields that:
        - Don't change (e.g. device name)
        - Others that change more often (e.g. commit hash)
      * Need a new resource (`Actual State`) that include volatile fields like the commit hash
        * Supervisor can only change actual state
      * Need another resource (`Target State`)
        * API can only change target state

* [Discuss next steps in resin-proxy (short term fixes to resin-ssh-base issues wrt ssh-agent, current status with Go SSH server)](https://beta.frontapp.com/inboxes/shared/d_architecture/open/218381546)
  * Context
    - We're currently working on the [Shared git/proxy SSH authentication](https://github.com/resin-io/hq/pull/452) spec, which is based on reusing a docker layer. The wip is already in staging and need more work.
    - Meanwhile there was progress with a hack-friday project to use Go as an SSH backend
  * Actions
    - It was decided to abandon the ongoing shared docker layer approach and instead move forward with the Go server directly. The main advantages are:
      1. Docker layer can't be used as a component
      2. The docker layer solution keeps the current 'hacky' status where we essentially try to 'force' openssh to work with
    - **[Action]:** Write spec
    - **[Action]:** Move forward with a using a simple Go server in place of OpenSSH, with the plan to reuse it in the Git server as well.
    - **[Action]:** Rename `resin proxy` server to something more meaningful, like 'resin action' server

---

### 02 Feb 2017

[Flowdock thread/Agenda](https://www.flowdock.com/app/rulemotion/r-process/threads/K5e0ivSQsixPqRm37sZBKm2X_Om)

* Discuss/Finalise talks about image size
  - **[Action]:** We'll allocate 600 mb as an upper bound
* Discussed about supervisor startup issues
  - **[Action]:** Need to investigate why the supervisor container takes that long to start

---

### 31 Jan 2017

No new items were present in the agenda, so we had an ad-hoc discussion on:

* Jenkins problems
* Multicontainer
  - Still unclear if we'll go with `docker compose`
* Discussed on setting udev rules as configuration
  - **[Action]:** Need a spec/proposal for udev

---

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

---

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

---

### 16 Jan 2017

#### [Persisting info on provision failures](https://front.frontapp.com/inboxes/shared/d_architecture/unassigned/195530293]
  * Notes
    * The current consensus was to store logs under `.meta/diagnostics`
    * Idea: diagnostics could have a reconfix file that specifies how to parse various sources to create a diagnostics file. If etcher has support for visualising files, it could read diagnostics.
      - We need a set of rules on what to pull (based on what is written in .meta), also need to know what this .meta/diagnostics structure will look
      - Use case:  Etcher can detect manifest and pointed log files, but what does it do with those? Does it offer to email them on behalf of a user? Does it save them?
  * **[Action]:** - Write spec (Shaun) 

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

---

### 12 Jan 2017

[Recorded call](https://drive.google.com/open?id=0B0NS-URBofBLUGdMcG1DMG8waEU)

#### [Discuss enabling update locking/blocking at the API level, so users can use this feature to do staged rollouts instead of abusing the update.lock on the devices](https://front.frontapp.com/inboxes/shared/d_architecture/unassigned/191718363)
  * **[Action]:** ~~Spec (Giovanni could lead this) (https://github.com/resin-io/hq/issues/596)~~ https://github.com/resin-io/hq/pull/745

#### [ENM issues related to bluetooth interface](https://front.frontapp.com/inboxes/shared/d_architecture/unassigned/204844096)
  * ~~**[Action]:** Debugging session with Petros (scheduled)~~

#### Discussed DeviceURL/VPN speed issues
  * **[Action]:** Needs investigation - (https://github.com/resin-io/hq/issues/283)

#### Discuss how we can define a standard, easy to adopt way of informing users why a device failed to provision. It should be able to be used by other OS ditros outside of resin and recognisable/parseable by etcher. currently there is a spec in this vein here: https://github.com/resin-io/hq/pull/367 ) - [Front link](https://beta.frontapp.com/inboxes/shared/d_architecture/open/195530293)
  * **[Action]:** Postponed - discuss again whether writing log file to boot partition would work

#### [Discussed about the way dependent device types (currently 1 and no plan in adding more) are parsed and handled by the UI (and possibly the API itself)](https://front.frontapp.com/inboxes/shared/d_architecture/unassigned/204875955)
 
---

### 10 Jan 2017

* Open Source Builder
  * **[Action item]:** ~~Write spec ~~ ([hq/541](https://github.com/resin-io/hq/issues/541))
* Troubleshooting session/discussion on API/RDS performance issues

https://docs.google.com/document/d/1-9IMrl5c6hPexItKqsEfKN6vKda5RBGmwLXFl_v9u_0/edit

---

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

---

### 5 Jan 2017

* API request max body size
  * **[Action item]:** Start truncating the logs at 512 kb and keep latest
* resinhup - ENM fusion - brainstorming session

https://docs.google.com/document/d/1sP9oGmySedmjCQxGlpwIQlQyqiSy9Szk3oNDzptU6vc/edit

---

### 3 Jan 2017

* Discuss golang ENM interface sharing
  * **[Action item]:** Bluetooth/nodejs related issue that needs more research (Joe)

---

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

---

### 15 Dec 2016

* Setting up a OAuth 2.0 provider on resin.io
  * **[Action item]:** Let's create a spec ([hq/509](https://github.com/resin-io/hq/issues/509))
* Device Actions
  * **[Action item]:** Make a list of all 'scripty' actions (`leech`, `btrfs-fix`, `resin sync` etc.)
  * **[Action item]:** Create a spec
* Device Types ++
  * **[Action item]:** Create a spec

https://docs.google.com/document/d/1HQymDK7SAqxGuZgqon-jEpfThUkLHKs-MhT54d0etOY/edit

---

### 13 Dec 2016

* Migrating to resinOS 2.X (remaining tasks & providing images as non-recommended entries in dashboard)
  * **[Action item]:** Need jenkins jobs to produce images (3 initially, then 4) (related to https://github.com/resin-io/hq/wiki/Architecture-Calls#28-29-nov-2016)
* Aggregating all remaining issues in a github milestone
  * ~~**[Action item]:**  Need a spec that will aggregate the list of remaining items for 2.x~~ https://github.com/resin-io/hq/pull/505
* Discussion on multicontainers, user-defined mounts, what we allow/disallow in resin-compose.yml

https://docs.google.com/document/d/1eKftQ1aduV0g1wqMupJepItwIYRGvVHj2c7pn2twFzY/edit

---

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

---

### 8 Dec 2016
* Resin-on-Resin deployment
  * **[Action Item]**: Keep going with resin-on-resin for high-level stuff (marketing/ui etc.) and experiment with starting/managing a kubernetes cluster
* Supervisor Rearchitecture
  * **[Action Item]**: Iterate on the supervisor rearchitecture spec - aim to re-architect supervisor internally before breaking it out to separate modules and rewriting them as services.
* Morty compatibility layer
  * ~~**[Action Item]**: Aim to resolve this by end of next week (need morty for a ge board in january)~~ - PR: https://www.flowdock.com/app/rulemotion/resin-devices/threads/DAYyep0UXchvYPsWAmEFyzV9gAO

https://docs.google.com/document/d/17O-M8D8eYqGVXkbJP3CnYJ7BSGjd56rjXlfGcyw5twc/edit

---

### 5 Dec 2016
* Zendesk / Front Integration
  * ~~**[Action Item]**: We need to look into Zendesk/Front APIs, discuss in specific what needs to be done and see if we can find a better solution.~~ Zendesk/Front integration issue is fixed

* Supervisor Update lock
  * ~~**[Action Item]**: We need to write a spec~~ - https://github.com/resin-io/hq/pull/488

https://docs.google.com/document/d/1-07hveuJd0Zw8ou-iV8cN7qLhNOj88HI34rJtiW3kYU/edit

---

### 3 Dec 2016 (ad-hoc @ London office)

* Discussion on Device Image Community Contribution workflow

https://docs.google.com/document/d/1daJJGYVuJXir-FRYyQygdMsukJrYlTnPfviXDUYRPuY/edit

---

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

---

### 24 Nov 2016

* Allowing users to select and change their usernames
  * ~~**[Action required]**: Draft a spec~~ - https://github.com/resin-io/hq/pull/450
* Discussion on understanding the Etcher/resin.io connection
  * https://docs.google.com/drawings/d/1ulscHze6R2pG2-7y8MY0K1KwuoCg4Yn7UyaECMzGd0w/edit

https://docs.google.com/document/d/1yXzolkALQSw6DkbcoJ9oBQ2IsY_B4iWNlwicdYPr9Do/edit

---

### 21 Nov 2016

* Combining emmc and sd boot images
  * **[Action required 1]**: Introducing the notion of flashing will require more steps on the hostOS; more research is required on this item because these steps are not obvious at the moment
  * **[Action required 2]**: There was discussion on contacting OpenROV to figure out exactly what they need and how close they are to the particular device type (beaglebone)
  * **[Action required 3]**: Also need to discuss more on flasher-type devices in general
* Signed images (EVRYTHNG request)

https://docs.google.com/document/d/1KTDulTx1ojVXXyvFD1sdKpq3mn7qOv18leheGh7rbDE/edit

---

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