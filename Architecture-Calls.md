## Description

Architecture calls take place several times a week (usually 2 or 3). It is the time and (virtual) place where we generally try to come up with an action plan to tackle non-trivial technical issues across the resin.io platform. This call is usually technically oriented and the subjects range from resin.io backend, devices, cli tools etc. Everyone from the resin.io team is welcome to join.

### Using the #architecture Flowdock tag

Many interesting technical discussions often produce very long threads that are difficult to follow, so what we do  instead is have a call, keep meeting minutes and come up with an action plan. There are no hard-defined rules on when a Flowdock thread should be discussed in an architecture call, but if you think it should, please tag the thread by adding a comment with the `#architecture` tag **and** a small summary. The reason is that Hubot picks these `#architecture`-tagged comments up and sends them to the [`architecture` FrontApp inbox](https://app.frontapp.com/inboxes/shared/d_architecture), which largely forms our next meeting agenda.

`#architecture` and Architecture Calls related discussions live in the [`r-process` Flowdock channel](https://www.flowdock.com/app/rulemotion/r-process).

### Architecture call recordings

We are uploading architecture call recordings as a convenience to people who might not be able to attend a specific architecture call and want finer-grained details that cannot possibly be captured with the overview notes. The calls are brainstorming sessions and the recordings should be treated as such.

### Pinned Agenda Items

* [No items pinned currently]

## Recent Meeting Notes

### 5 Jun 2017

[Meeting recording](https://drive.google.com/open?id=0B0NS-URBofBLM0xjYlMyaW01elU)
[Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/fZtCT8zVJHwkAAaPO_G_OhDB2OY)

**Pipage discussion**
[Discuss operation of vault server](https://beta.frontapp.com/inboxes/shared/d_architecture/open/330404867)
- Spec PR: https://github.com/resin-io/hq/pull/857
- In summary, it is still not entirely clear whether we need Vault or not
- Actions:
  - Revisit spec to not include vault and only limit access to support agents
[We need to determine how to implement the white listing for tableau integration in the API](https://beta.frontapp.com/inboxes/shared/d_architecture/open/329801683)
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
- Specifics to be discussed with device team

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
  - Spec 1 : how to scale VPN
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
- Need a WIP spec (drafted by Page, prob. implemented by Giovanni or Ilias)
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
  - Write a spec (Ariel)
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
  * **Action**: Write spec / describe in more detail `.meta/diagnostics`
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
  - **[Action]:** spec builder secrets

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
    * **[Action]:** Need spec for introducing a current vs target state model in the database/API
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
  * **[Action]:** Spec (Giovanni could lead this) (https://github.com/resin-io/hq/issues/596)

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
  * **[Action item]:** Write spec ([hq/541](https://github.com/resin-io/hq/issues/541))
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