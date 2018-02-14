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

The full archive can be found in [this google drive folder](https://drive.google.com/drive/u/2/folders/0B0NS-URBofBLN0xOWHNDTVV0cFk)

We are uploading architecture call recordings as a convenience to people who might not be able to attend a specific architecture call and want finer-grained details that cannot possibly be captured with the overview notes. The calls are brainstorming sessions and the recordings should be treated as such.

### [Architecture call Archive (from 15 Nov 2016 to 06 Sep 2017](https://github.com/resin-io/hq/wiki/Architecture-Calls-Archive)

### Pinned Agenda Items

- We often have items that we want to keep revisiting. The process to do that is simply leaving the respective Front tickets open and also add a descriptive comments (e.g. `Pinned item for Mondays`)

## Recent Meeting Notes

### 13 Feb 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/k3X7ZxKLW0grrZJ4IIYCO-nKxdD)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1n6qq2L5xbCWKbphYbeZDOBOZfdlYdaho)

Can we expose the Docker socket to containers and docker/balena alias on the host OS to enable Foghorn support for Honeywell? cc @mccollam

* Requests
   * Alias from docker to balena
   * Export docker socket
* Open q: can all of Foghorn run into container?
* Worried about making docker part of our API
   * If we expose it, we’re tied to docker
* Giving access to docker will likely be something that’s going to be asked a lot
* Needs to be a label, like dbus, they will need to opt in to this docker api
   * Arbitrary bind mounts can cause issues
* Support implications
   * Separate support package?
   * Make expectations clear (e.g. deleting supervisor or performing other disruptive actions)
* Actions cc @pcarranzav
   * Hard requirement: feature will only work with multicontainer
   * Io.resin.features.balena-socket label
      * Bind mounts hosts balena socket to /var/run/balena.sock in container

VPN sync up 

* Vertical scaling PR in progress, requiring review
* Horizontal scaling on staging for a few weeks, haven’t hit any issues so far (lower traffic though)
* Downtime
   * Depending on the app’s reconnection logic, a VPN redeploy will still cause noticeable connection drops
   * The vpn client can smoothly roll over, the problem is on the server side because the proxy tunnel will break
* Mentioned VPN alternatives https://www.wireguard.com/ https://www.tinc-vpn.org/ 
* Actions cc @wrboyce @brownjohnf
   * Move forward with rolling horizontal scaling out
   * Next steps
      * Make reconnection less of a massive event
      * Add disconnect notifications

Discuss deltas of compositions in multicontainer.

* First time you pull a composition, nothing exists in the devices
   * Creating a diff from nothing has no benefit
* There’s a benefit when comparing in between containers
* Composition deltas are highly leveraged (paid feature, super useful over LTE)
* First pull algorithm
* Delta source selection algorithm 
   * First, we search images that match service name and app id
   * Then only service name
   * Then images from the same app

Discuss providing the ability for extending NetworkManager's global configuration 

* Randomized MAC address regression in recent NM versions that could be disabled in the NM global configuration (e.g. by adding a file in /etc/NetworkManager/conf.d/)
* Currently we do not provide this ability in a way that will persist across Host OS updates
* Current solution: use DBUS api

Reconfix on Host

* We’re currently working on the CLI reconfix PR
* Unification will hopefully be a catalyst to include reconfix on the host

ResinOS in a container. Where to store generic images? Un-Privileged container ideas? Default to overlayfs? 

* We have generic type on the API
* We’re introducing three new generic- types
* +1 on unprivileged containers
* Every new device type should default to overlayfs2
   * we’ll handle migrations when we need to 

Logging: Discuss solutions for device log ordering implementation 

* Core of logging works, we only get out of order logs
* Timestamps are unreliable - we can’t rely on it for ordering due to ntp changes
* Discuss ordering again on Thursday

### 08 Feb 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/dEBICwhnQHicYPE4BMbX6ggb8mP)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1N6EV0W3impuayYTiKqJRNYlQlAeRTRDV)

Meeting was cancelled

### 06 Feb 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/rbSRmOI5xRA7MBkfkKknkaF9KMw)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/18j_Otq2cJUC3CggE9kiTrKMb6WkYaXIj)

We need to ensure that during development of components nothing is added that assumes running on cloud environments, so that changes aren’t made that could break potentially break resin On Premises aren’t made 

* resinHUP was reliant on github to download stuff
* How do we get into devs mind that stuff in backend can potentially run in a closed environment
* Examples
   * Api makes calls to geolocation apis
   * resinHUP as already mentioned
* E2e testing in air-gapped environment e.g. on a VM is straightforward
   * Take a VM and restrict internet access
* Actions
   * Move e2e tests to a VM
      * Ideally pre-PR merge
      * We’ll still run them in production
   * @hedss / @jviotti to look into that after Siemens/Logging
      * Related to Concourse/Pipelines

Discuss resinOS boot times 

* https://docs.google.com/spreadsheets/u/2/d/1b9g8iMivhJN4SonzHLcqS8Ol3RNC6dl5v8oGber108k/edit#gid=0
* Actions cc @agherzan
   * Look into with Initramfs  / mount service optimizations

Discuss about deprecating the Odroid C1 cc @floion @agherzan

* At some point we’ll deprecate it
* Let’s discuss again deprecations in one month

Discuss how to move forward with dependent devices cc @pcarranzav

* Currently broken due to device type mismatch (generic vs generic-amd64). It can be fixed but affects backwards compatibility.
* Plus there's WIP left by Joe that could be worked on.
* Actions
   * Fix generic name , it’s fine that it’s not backwards compatible
   * Release multicontainer without affecting dependent devices, afterwards work on resuming Joe’s work

Discuss adding Sentry to the supervisor cc @pcarranzav @jviotti

* Bandwidth concerns
   * We’d only send error logs
   * We can have additional flags control log streaming to servers
   * Supervisor should not throw exceptions on network errors
* Sentry is being used for uncaught exceptions
* Supervisor has been rewritten, our previous assumptions might not hold now
* Action
   * Implement hidden configuration that disables both Mixpanel and Sentry
      * TBD the specifics on how switching off will be advertised
   * Add Sentry in development images

Discuss making tokens like the mixpanel token something that can change on devices, maybe as part of the target state endpoint cc @pcarranzav @jviotti

* Supervisor has hardcoded mixpanel token
* It’s in config.json currently, should probably be env-var accessible
* Mixpanel should probably live in the mixpanel proxy
* Look into introducing app level state endpoint

Discussed Deltas

* Supervisor never does deltas when starting from scratch
* There shouldn’t be any technical blockers for using balena deltas
* Actions
   * Balena deltas the next thing @dfunckt will work on

### 24 Jan 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/zGSaALpEbH7ghXwqHogPWM9pyip)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1MipuubOBVZ29b1wluWf9JQrb4a5o5iRu)

Currently we're using a release's commit as the ID in the dashboard. This isn't unique across releases unless you add the constraint of a success status. What way do we want to represent releases (especially with the rolling release stuff coming up)? 

* It can be the release number
   * We could have a link back to the release page (of the specific id)
* The commit was transitional
* Suggestion: update the model and have a foreign key to releases
* Translation can be a tricky part
   * We’ll need translations because a lot of thing will break

### 22 Jan 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/fz9wCaEgofU3-rYbZO1CCaKyDvr)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1aTPNtqzNWbaD4ew0gjMdI1vAYp7h8DjA)

On-prem resinHUP spec kick off cc @hedss @imrehg

* Spec: https://github.com/resin-io/hq/pull/1148
* Format for archive w/manifest file with metadata about where to find relevant images
* We should look into integrating the supervisor publishing design (introduced for on prem resinhup) in resin
Currently we need to add the resin_devices key to the proxy manually on startup. We also need to be able to generate keys for rOP instances. There should be a good way of doing this, that ideally doesn’t require altering images for each rOP cc @hedss @imrehg @afitzek @wrboyce @lekkas
* Discussed auto-generating device ssh key that will be injected in devices and the proxy
* Suggestion: make API expose key that are valid and have devices add them in authorized_keys
   * Authorized_keys should be part of the state partition / endpoint
   * Dropbear should auto-detect this w/o restart
   * Users should be able to add their own keys and blend the two lists (user/resin)
      * Definitely a feature that users want
* Idea: use hardware device/key to setup on prem environment
* Moving forward
   * resinOS: read ssh key from config.json
      * Issue: how does cli (esp older versions) interact with config.json when generating one
   * afitzek will look more into this after the current priorities/backlog


Discuss 2FA for SSO accounts and security critical actions, that require a recent password entry. cc @afitzek @thgreasi

* For accounts without social login
   * sudo operations (e.g. enabling/disabling 2FA) will require password
* For social login accounts
   * we should remove 2FA
   * For sudo operations we will ask social login provider (e.g. google) to re-authenticate (in essence requesting a fresh token from the auth provider)
* Suggestion: user before getting to sudo mode. 

Discuss how to store user Dashboard preferences (filter views & column selections) in the DB. Also consider the same for Collaborators & Orgs. cc @thgreasi  @lucianbuzzo

* Currently we save views and column setting in the browser/localstorage
* We’d like to persist these preferences on the backend to reuse from other browsers of private mode
* Not sure if settings are deleted if different users login from the same browser
* Suggestion: free-form / json field, same as localstorage
   * We may want to think more of the schema e.g. views might be useful as a core pine term. One example is shared views across an organization
* Should we model (in sbvr) or not views data
* Discuss again on Wednesday

Discuss the current process for moving an application from one account to another (directly for Delphi but larger question in general)

* Spec: https://github.com/resin-io/hq/pull/938
* Moving apps after in recent resinOS versions should be as easy as changing the user of the application
* Action
   * Need to figure out what devices do with users/usernames
      * Supervisor sends username in mixpanel events
      * @izavits @pimterry were looking into https://github.com/resin-io/resin-api/issues/443 for mixpanel blockers
   * Provision app with a few devices, change userid to a new userid that, see if the new user can use the devices afterwards cc @mccollam
   * In the mid term (after we establish that the backend is working) check if underlying data works we’ll need to think the UX for the feature cc @shaunmulligan


Discuss how to handle support for boards based on the Raspberry Pi Compute Module cc @alisondavis17 @curcuz, @floion, @agherzan
* This includes Rubus/Amber and other boards like the Revolution Pi, etc. that are built on the CM.
   * Related to arch types - we’ll have arch-specific applications
   * TBD in product call 

Discuss current implementation of in container resin OS task and next steps. cc @agherzan

   * We have the first implementation
      * Should work on any device we support
   * We should be able to spawn specific device types 
   * Action
      * We should somehow mark that specific features/actions (like the /reboot supervisor endpoint) need an actual, not-virtualized host, to run - needs a spec for small things that are needed in the dashboard /api / resinOS cc @agherzan will lead this as a low prio part in the porsche deliverable

Refresh our plan/design on bump-n-branch cc @lekkas @jviotti

* Spec: https://github.com/resin-io/hq/pull/630
* For etcher
   * Start branch, start a pre-build process that should be platform-independent which will fetch dependencies and start a build process
   * On shrinkwrap
      * We’ll not put dependencies we trust in the shrinkwrap
      * On bump-n-branch we’ll generate a full shrinkwrap from pinned (untrusted) dependencies and floating (trusted) ones
   * The branches will also be used generate the nested changelog
* Actions
   * Juan will lead this

### 17 Jan 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/WsT_F-EYKWLOFigvqlvAB6dfEWV)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1lyOAdluS4kbxoX2cRF0sygD2BK8JIW9N)

Discuss fixing the non-compliant custom device UUID's issue for Disruptive Tech cc @thgreasi

   * Need to check if they’ll need to reprovision their devices
   * See: https://github.com/resin-io/resin-api/issues/631
   * https://docs.google.com/document/d/1NOa6YNnaTZas7BhCcFH9aDQygHuLu2YieuYviNf3BQ8/edit#heading=h.rnu361uh674x [document shared with DT]
   * https://docs.google.com/document/d/1MckooOxPGKYdW2JmKjgbkutj03RMApNRVaoQQNKelU0/edit#heading=h.71ei84pvenm0 [dt tech, milestones, promises]
   * In recent supervisors device keys cannot be used for reprovisioning
   * Action
      * We’ll arrange to re-provision their devices, @thgreasi will reach out to them through support for this matter
      * @pcarranzav @page- @imrehg to be kept in the loop for the actual reprovisioning action

Discuss booting ResinOS on RPi3 over USB HDD. - intale mentioned this is a blocker for them cc @thgreasi @telphan @agherzan @floion

   * Postponed
   * USB Boot is possible in rpi3 through config.txt
      * https://www.raspberrypi.org/documentation/hardware/raspberrypi/bootmodes/msd.md
   * In theory we should be able to write resinOS in a usb drive and use it to boot
      * Hard coded partition names might be an issue here
   * Will using a usb stick be any better? Not sure at all

Porsche architecture

   * Got additional info on how registration works
   * @petrosagg to join the next Porsche call

Discuss how the CLI et al could better allow for incremental adoption of breaking API changes cc @pimterry

   * You can install multiple versions of the SDK in the CLI
   * Tricky part is shared code that has to be switched at the same time
   * No automated tests at the moment, plan to add, in the meantime it needs lots of testing
   * Actions
      * Dual SDK approach looks like the proper way forward

Discuss SDK roadmap (dev process, coordination between SDKs, what the expectations are) cc @pimterry @nghiant2710 @jviotti

   * Motivation: v1.7.0 of the python SDK contained a breaking change but did not increment a major version
   * Additional points from Juanchi
      * Do we plan to create SDKs for other languages?
      * Is auto-generating SDKs an option?
   * API automated documentation
      * Open API specification: https://github.com/resin-io-playground/pine-to-oas/blob/master/openapi.yaml
      * https://github.com/swagger-api/swagger-codegen
      * Interactive docs demo: https://resin-io-playground.github.io/pine-to-oas
   * GraphQL / OpenAPI integration
      * Likely won’t work
      * Alternative: find another way to auto-generate our SDK
      * We’re not prioritising ‘expand’ operations to be supported from the autogenerated SDKs, we’re more interested in filters
      * How do we handle batching?
   * Python SDK
      * Need tests, VersionBot, automatic deployments
      * Can we share tests between sdks?
      * We could use shims and share tests, doable but not trivial to implement
      * Autogeneration will not require that many tests
      * In the short term we can use simpler smoke tests for the SDK
   * Actions/moving forward
      * Pine/API endpoint to auto-generate core SDKs
         * Put the generated core SDKs to replace modules like pine client
         * Prioritised over GraphQL
      * Look into intersection of GraphQL. GraphQL-to-data translator opens us up to GraphQL tools for automatic doc/sdk generation
      * Get VersionBot on python sdk

Discuss how to handle orphaned diffs during resinhup / hostapp-update cc @agherzan @imrehg

   * hostApp update/balena pull, unplugging device leaves diffs behind, that are not cleaned up automatically, nor can be removed with balena tools. Retrying to pull update will create a new diff directory every time (and can run out of space)
      * Sound like balena bugs that can be fixed
   * resinOS 2.7.x (docker) appears to exhibit same behavior after power-cut
   * Actions
      * Register bugs as issues in the balena repo cc @imrehg

Discuss CloudFlare usage for resinio wrt to automatic certificate management cc @afitzek @brownjohnf

   * RapidSSL cert for resin.io website still manually updated - will switch to AWS cert management when it expires end of February
   * We already have a wildcard resin cert, should be as simple as updating ELB to use that one
   * Left with JWT, code singing, VPN, arm certs also a couple of hetzner servers with letsencrypt
   * In theory should have single CA to sign builder and vpn certs
      * VPN CA is already set up, expires after 2020
      * What’s the plan of rotating CA on devices?
         * Release new version of OS that has both old and new CA, switch when new OS has propagated
   * We could set up our own air-gapped CA, in which case it’s not clear how automated renewal will work
   * Action
      * Make sure cert expiry dates are added in the admin calendar cc @afitzek

Develop a plan for stable concourse infrastructure on-prem cc @brownjohnf @jviotti @jhermsmeier

   * Proposal
      * Set up a new concourse VPC
      * Connect office concourse networks to VPC via VPNs
      * Move master node into VPC
      * Move postgres off of master and into RDS
      * Use resin device to remotely turn on/off the hardware running in the office
      * Eventually we want to also start converting Hetzner nodes to concourse linux workers.
   * Discussed Distributing concourse build nodes in Athens/London
* Decide how to manage secrets on the concourse on-prem build nodes cc @brownjohnf @jviotti
   * One option is to use Vault: https://concourse.ci/creds.htmlvault It sounds like the standard practice for concourse is to store secrets external to the nodes, and grant the nodes the necessary access.
   * Code sign certificates, deployed keys etc. must be stored securely in concourse
   * In concourse, master nodes do not handle connecting to workers, it works the other way around. Workers register themselves
   * Some Vault benefits are centralised secret manager , key rotation. Also supported by Concourse
   * Are we comfortable with putting sensitive keys in AWS?
      * We use a separate VPC in our production account for Concourse
   * Discussed if Concourse infra should be hosted on Kubernetes
   * Action
      * Add Vault and connect it to concourse

Logging / moving away from pubnub

* Progress update

### 15 Jan 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/cPWom6P22Rtl_wXbw3DVzcICrRp)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1uIsiNXKzpocCsCbt6Qeskw0TK6iwv3aU)

Open source resin sync up 

* Follow-up meeting on 16 Jan 2018

Logging - batching - multicontainer 

* Logging branches from multicontainer
* PubNub relaying nearly ready, having an issue with PubNub API
* Alex asked to store both server time and supervisor time in the log, not done yet
* Switch to a custom endpoint and either use batching or not from within the API
* Delays and problems to be escalated to Shaun and then Alex
* Follow-up meeting on 16 Jan 2018

Discuss configuring multiple networks for OS images, and how development overlaps with reconfix 

* Can be closed for now

canAccess endpoint

* Action: move forward with PR merge

Discuss using jsonschema to generate the forms used for configuring device images on the dashboard 

* Objectives: 
   * Support multiple networks (main objective)
   * move away current options system for device types (longer term objective)
* The options systems is an array of objects that we use to create forms in the UI
   * Specifically image download configuration
* Incompatible with how we do things now in the dashboard
* Suggestion: Add a new property in device-type.json that contains json schema for device type configuration and eventually deprecate options
   * The migration is not trivial. We’d have to make it backwards compatible and not re-release existing types
* Other suggestion: create translation from current to next schema
* Actions cc @lucianbuzzo
   * Write translator
   * Expand what’s in the system to support multiple networks

Discussed Rubus schematics

Discuss enabling deltas by default 

* Enabling current (not balena ones) deltas by default
* Makes sense to spend resources on new deltas
* Action cc @dfunckt @pcarranzav
   * Resumable deltas and better timeouts have improved things, so shift the underlying default (https://github.com/resin-io/resin-supervisor/issues/546)


Discuss the future of the intel-nuc device type 

* We don’t need to deprecate the nuc, it’s solved by the subtype solution
* Actions cc @lucianbuzzo @floion @telphan
   * Will keep intel nuc device type
   * Move generic x86 into resin-intel repo and essentially start releasing it as the same image under intel-nuc 

boot time graphs on current resinOS version (RPI 1) and the latest Raspbian on the same machine.

* https://docs.google.com/spreadsheets/d/1b9g8iMivhJN4SonzHLcqS8Ol3RNC6dl5v8oGber108k/edit#gid=0
* Trying to figure out 3x resinOS delay in kernel 

Discuss how to handle orphaned diffs during resinhup / hostapp-update 

* When resinHUP is interrupted we can’t clear up the download that’s happening in the background. So starting a new update we can get in an out-of-space situation
* balena/docker prune
* If you re-download the same image the old layers should be re-used
* Needs some experimentation to see where the issue is with docker/balena pull
* Re-review on Wednesday

discuss proxy/hostname on supervisor configuration API endpoint (time sensitive due to Room Ready needing it) cc @pcarranzav

* Suggestion: have hostname change in the same api as proxy change instead of config variable
* We are fine with having a config endpoint that we will patch
* Action
   * Global config endpoint with PATCH requests

### 10 Jan 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/-VGh8EGAEgbsRwtl5A-d76C_l5t)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1UTu84TO0jV2iLEvXchOSLtFiXV5oiNun)

### 08 Jan 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/e5cuhn8pA_svZdhETch83azwT3N)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1apBsoLS4Kkl6Bt2h2Ni_txauXEdR6WyS)

### 18 Dec 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/yTo-ygzHdGgZYtbAQkc6QLHTPVp)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/17NJIFZoiNOzDZA1tqb2xrM1yy0z1dwZR)

Open Source Resin cc @dfunckt

* Sync up
* Discuss whether/how on-prem tool can be used by Open Source Resin cc @hedss
* Context: https://www.flowdock.com/app/rulemotion/resin-tech/threads/cWLubc0vt3hIsGSJ5MmzvOPxX1e
* Export tool
   * Takes devenv, strips out credentials
   * Devenv has more things than needed for onprem, approach could be problematic especially with regards to credentials
* The second tool migrates data
   * How is the VM updated?
   * Data can be migrated from old VM to new VM
* Unifying resin between how we run it on production and how we run it on devenv/onprem
   * VM Kubernetes, or resinOS for host OS ?
   * We can run kubernetes on resinOS, either with the supervisor or running kubernetes on the side with resinos managing the host
* Having a separate container for networking/dependencies that run on onprem and not devenv 
* Incremental approach. If onprem is ‘smaller’ than devenv, we should build devenv on onprem. Same for OSS < on prem
* Why do we need to give them instructions to install things outside the VM i.e. on the host
* Dns, dhcp, ntp all run on the host
* When you run a VM, your vm will get an ip address on the ethernet interface. It’ll appear as another machine connected to the network infrastructure
   * When we run the vm for devenv, we have the 10.10.10.10 configuration. Vagrant has 3 adapters: nat, private network and public network
   * We should be using the public network for on prem deployments, vm must be present on the network (we do)
   * All traffic should go to the network
   * That said, we don’t need to install anything on the host
* Would resinOS network help here? Probably not
   * The unpredictability factor we’re more resilient for is DNS
* A container that could encapture onprem/devenv/open source resin and deal with a range of situations would be nice to have
* Our VM is also the router of the network
* If that extra container implements the router (as well as ntp, dhcp etc.) we shouldn’t be putting it on the Vagrant
   * The problem is that it needs host networking, probably even privileged
* Actions (@hedss)
   * We should install all network services on in the Vagrant box
   * The container is a step towards moving everything on the VM
   * TBD again in the week

Discuss how to store resinOS images, and how to let the proxy/resinHUP know which registry/repo to use in the updates cc @hedss

* Previous arch call 1
* Previous arch call 2
* Can be archived

Mass-provision of the TX2 cc @telphan

* Postponed / they didn’t come back

Discuss INITSYSTEM=on for multicontainer and cellular cc @shaunmulligan

* Postponed

Discuss how local mode will work in multicontainer cc @shaunmulligan

* Proposal is the supervisor exposing an API for the CLI to set target state
* Details
* Postponed

Discuss how to display combined device progress on multicontainer cc @lucianbuzzo

* On device list
   * If there’s something on device level, you just ignore that
   * If there’s nothing going on on device level, you show an average of all things that are happening
   * We can try displaying all info (x updating, n downloading etc) 
* TBD in product call

Discuss the future of CLI plugins 

* PR #728: *BREAKING*: Remove support for plugins entirely by pimterry in resin-io/resin-cli on GitHub
* Doesn’t work well with packaged cli
* Plugin arch uses capitano, but does not rely on capitano
* We care about build time capability
* We need a well defined development loop
* We can still rapidly iterate on separate functionalities e.g. resin sync
* Actions cc @pimterry @MoranF
   * We’re happy killing runtime plugins

Discuss implementing API per-request timeouts VPN side is resolved with 

* https://github.com/resin-io/resin-vpn/pull/73/files
* Action
   * @nazrhom - @page- syncup

### 13 Dec 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/yTo-ygzHdGgZYtbAQkc6QLHTPVp)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1RIUdUcG5_YIQ3Y2VaMYIDH4QKnreNDVC)

Open Source Resin - sync up 

* @dfunckt will work full time on OSR in the next couple of weeks
* Chat with @hedss for the on prem tool on Monday

Can we lower the requirements for resinOS devices so that the state endpoint tells them to use registry v2?

* Currently the tests are for resinOS >=2.0.0 and supervisor >=4.1.1; seems like resinOS since 1.2 (inclusive) could use registry v2, unless we've missed something (hence the question)
* So should we alter that check to enable more devices to use v2? what versions to include? is there a downside, that this will trigger all the currently not v2 devices to update their application? (though it should be a noop according to Pablo). (that should be resinOS >=1.26.0 or other devices that are on newer supervisor due to been super-updated) If we can do this, updating the supervisor on more 1.x devices would immediately benefit them as we do that.
* Pablo’s opinion: yes
* 1.8 is tested and well covered, we’ll test lower than that
* Discussed having a UI checkbox where users can opt out automatic updates to their hostOS/supervisor devices. Should free users have this option unavailable/greyed out? This is for 1.x -> 1.x , 2.x -> 2.x updates
* Actions[a] (@imrehg)
  * Test 1.x devices (pre resinOS 1.8.0, ideally 1.2.0), check if everything works with registry v2; write up test results
  * We can then lower the version limits in the API (lowering the resinOS version check, keeping the supervisor check in place
  * Add UI option to allow paid users opt out from OS/supervisor updates to the Fleet Updates Plan spec and bring it to a product call
  * Update resinOS supervisor version according to some agreed plan 
  * Milestone: no resinOS version below that agreed cut-off point for registry v2; all other supervisors are updated to newer supervisor

Discuss multi container deltas 

* We need to extend the modules for balena deltas
* More investigation on delta issues needed
* Postponed for Monday 

Adding a snooze directive to SyncBot's tricks, and the perils of reverse engineering HTTP requests 

* We already have an archive function for flowdock -> front , discussing about adding a snooze command for flowdock -> front as well
* Action
   * Move forward with monitoring the snooze HTTP requests and replicate them (@sqweelygig)

Discuss API rate limiting during SDK tests cc @afitzek @pimterry

* Test are probably going to break rate limiting
* Signup rate limiting prevents attackers from figuring out if an email address is taken, also prevents flooding our system with dummy users
* Increasing the rate limiting, which we’ve already done (200 signups/day), should be fine
* Action
   * We’re fine with 200/day signup limit for now

Discuss all certificates in resin and how we can ensure that no certificate ever expires

* https://docs.google.com/a/resin.io/spreadsheets/d/19_rKfYnSID9RqVuf5I0pTpfox81wjhwxfogM3kAYDaA/edit?usp=sharing
* Goals:
   * Guaranteed auto renewal for all certificates before they expire
   * Notifications to check if auto renewal worked
   * Enter new items (certificates) into the system
   * For specific certificates, team members must be notified when renewals are going to occur, and when they have occurred
* We have multiple *.resin.io certificates
* Builder CA, jwt, OpenVPN
* Could we create a certificate in Amazon , for a fake domain, that will be automatically updated and converted to a JWT certificate?
   * AWS certificates are free
   * Can we automate that? How would it look like?
* Actions (@afitzek)
   * Use cloudflare for certificate auto renew of marketing site and everything under resin.io
   * Move resindev.io to amazon
   * Move away from RapidSSL
   * See how we can use AWS to get certificates for them , see if we can use these certificates to auto renew jwt and cloud services
   * Ideally we’d solve our problems w/o code
   * The VPN transition needs some investigation (we have a couple of years till next expiry)

Discuss how to securely implement a child worker process on Etcher architecture The GUI app runs as a normal user. On ‘flash’ , a new child process is spawned with 
elevated perms (root)

* Idea: have a root process that remains alive throughout the app lifetime to be used for elevated actions
* Approach 1: spawn IPC, processes can communicate over this. We could have a shared secret between the elevated/non-elevated processes
* Approach 2: Start elevation process first (on startup) , spawn child process w/ dropped privileges to run the UI
* Counter argument - if malware runs as root, game is lost already. Even if malware runs as a user, it’s probable that etcher UI can be spoofed an steal user’s credentials.
* Action cc @afitzek @jviotti
   * Use asymmetric encryption, elliptic curve in specific for fast key generation. Flow: start etcher, it generates key, then it spawns privileged server that only accepts signed commands. We should use JWT

Discuss how to store resinOS images for OnPrem, and how to let the proxy/resinHUP know which registry/repo to use in the updates cc @imrehg @hedss

* Images will move in our registry (from dockerhub) when we have hostapps
* For on prem, images will have to be environment dependent
* Idea: provide similar interface in the API like what we have for supervisor releases (i.e. where to get images from)
* Idea: add a parameter in resinHUP
* For on prem we’ll have to manually push an image
* We’ll need to constraint CI to push resinOS and resin supervisor, they shouldn’t be able to push from the user application repo


Discuss the Porsche Architecture 

* Use case: entertainment system with screen. Runs chromium
* When the container is installed, the registration manager will make a few requests
* The registration manager has registry of all apps, e.g. you click spotify app, it sends you to spotify service which is a container, all requests go there
* They want to install apps through resin
* They want something on our side (supervisor/hostos) to integrated their hooks
* It will not need a custom supervisor
* Porsche runs single-container apps
* Similarities with micros architecture 
* Suggested flow: container starts, finds service, registers itself, give whatever assets it has
   * How does the manager find the container and vice versa
   * Their manager must listen on a well know address, there are things they can do there
   * When the container registers, it can give its up or the register service itself can find that out
* resinOS will also have to register itself as an app in their system. We can alternatively have a core Porsche container that does that for us
* Porsche unwilling to reveal more details about their registration system, so we can’t help them more
* Need to make sure that the time we invest on is worth it (monetary-wise)
* TBD on custarch call

Discuss implementing API per-request timeouts

* VPN side resolved with https://github.com/resin-io/resin-vpn/pull/73/files
* Keep @nazrhom in the loop for the API side improvements we need to do

Discuss timestamped data

* Store query results over time and keep that
* Ideally, we’d keep historical data 
* Suggestion: save query results in a db table, point chart.io there
   * I.e. turn device table in historical table
* Action (@imrehg)
   * Look into what it’d take to turn device table into a historic table cc @izavits

### 11 Dec 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/EKRbQxO1XZKFZCaswvne1aurJNe)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1u5ifUuA8cuZWUsz4qCBVm7D3xwqf1G0C)

Note, all items but one were postponed for the next scheduled arch call due to a Balena emergency.

Should we introduce a new command called resinos in the proxy, that is exposed via the CLI, To implement hostOS access for customers? cc @afitzek
* We’d prefer not to include a permissions check in the proxy (i.e have the proxy check if a user can access the host of a device)
* We should try to have a single command. Doesn’t make a lot of sense to have two separate commands for the same function
* Suggestion: add a hidden flag
* Action
   * Add a custom API endpoint that the proxy can use and check if a user is support agent (in which case they’ll be allowed to enter the host without any resinOS version restrictions) cc @afitzek

### 29 Nov 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/tVA5wl6-c-7Q3c8IRWRhTuVY52a)
- [Meeting notes](https://docs.google.com/document/d/1jBRvMXn0WxSh_MzZaL1xl_IDBSnBB4YY_H3vgpUH0is/edit)

### 27 Nov 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/ugANbGR7UdNpF1HECoXXxMoDElk)
- [Meeting notes](https://drive.google.com/drive/u/2/folders/1XYYTnoUuNHU7rQJ4fHBHnw7w4MuFv4HP)

### 22 Nov 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/3x7BCZcdJvxahF_PCrAN8vtAyhR)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/11a3N8QAhMsm4YwgCoi8ECQVGDaquyDmf)

WiFi Connect does not cover the use case where a user would like to move his device to a different WiFi network. Currently it exits directly if it cannot connect to any stored network. It should launch AP instead. Additionally it clears stored network credentials in the second mode it runs, which is not useful. It is better to have one execution mode only. Changing those, will need a major version update. 

* User request to support multiple request profiles
   * Use case: move devices to different networks
* Both moving and coming back are not currently allowed
* https://github.com/resin-io/resin-wifi-connect/blob/master/docs/state-flow-diagram.md
* Previous releases supported both NM and connman
* Wifi connect should go to AP mode when you run it
   * Timeout feature (e.g. exiting after 5 minutes) sounds like a good idea
* We support env vars to change things like IP of captive portal, the new version will have no arguments
* Actions (@majorz)
   * Make new version that does not support connman
   * Will need a new major release
   * Need example shell script on how to run it
   * Be very clear on what it does, and what it does not do
   * Move old scripts to examples/ folder


Open Source Resin: Discuss about the delivery/deploy API cc @dfunckt @camerondiver

* The end goal is, given the OSS API and the registry, a user should be able to upload a docker image (probably using the CLI) and upload it to their app, essentially creating a new release
* Ideally this setup will leverage the resin push (deploy?) CLI command
* Two alternatives
   * Push to registry and register that (As a release)
   * Create new image in the api (create an image resource w/ a placeholder registry url)
* When you create an image you get an image resource that has the repo path, which could be a random string
* The deploy endpoint will be on the API (the current one is on the builder)
* Suggestion
   * The API should create an image, return a registry to push to
   * Image should be marked as in progress (e.g. in case cli dies mid-push)
   * Image digest can be added in the image resource afterwards
   * Status can be an enum. The issue with enums is that our clients don’t have good support of them
* The model needs a registry url
* Logs can be optional
* Custom thing: check that registry url is not random
* The digest will be needed for validation in the end
* Registry urls are not well formed but refer to the right thing
* Flow: create image in api, returns registry url, push image to registry url, send digest to api
* There have been 1.x releases with later supervisor
* 2.0.0 has all prerequisites
* >= 1.26 should be good (convenient because we’re not pushing people to upgrade from 1.x)
* On-device Docker version should be fine
* ~1000 devices that can’t use auth when pulling (pre 1.26)
* 1.1 devices (~100) not a priority atm
* Suggestion
   * Deploy endpoint should not support legacy devices, even for CLI
* Actions
   * Create registry url datatype (@page-)
   * We don’t need to make the legacy system work with a deploy endpoint
   * Let’s make the deploy endpoint with app v2 assumptions
   * When a push goes to the builder for legacy app it should push copies of the image to the legacy endpoint
   * Single registry url per image
   * Local builds and multicontainer must be compatible (customers ask for both)
   * Add new deploy endpoint, use that endpoint directly when pushing containers with CLI
   * @dfunckt will work on deploy endpoint
      * Can probably be done on top of MC model

Discuss whether to move away from using the commit hash as a method of defining what code a device should be running. This was initially done as a resource could not reference more than one of the same resource, but with pine 5 this is now possible.

* This is something we want - now possible with the new model changes
* Target state feature users: ~3-4 important users, ~80 devices (DT/Axilera, OpenDoor, Buddy)
* No preference on implementing this in MC or afterwards
* Term change to ‘app should be running build’
* At some point the commit will be a label that may or may not be there
* Action
   * Let’s address this in a separate step, not as part of MC (@camerondiver)


Should labels provided in the compose file be attached to the service or the image object?

* Labels should be in the service object (not the image object)
* We want labels to go across releases
* We have labels in the service, we want to add them in the ‘image is part of release’ resource

Discuss methods of debugging multicontainer builder failing with go panic of "no such file or directory" when using non-resin base images.
* Fixed

Discuss fleet data, joining 2 data sets (keen data and DB) for the creation of charts
* DB/keen data structured differently, db more efficient, keen more easy to manage
* We converted our db data to keen format
* Suggestion
   * Some devices were online on keen during the switch-over
   * We could create an ‘online’ set
* Discussed about vanished long-running devices
   * Roughly 20 devices vanished
   * Device id does not exist in device table, the connectivity table or other resources. 
   * Device connectivity table does not forget about connectivity events
   * If the device gets deleted, it’s removed from the device table (but can the id can still appear in the connectivity table)
   * We could check old DB snapshots, we don’t do long retention (probably max 1-2 months)
* Actions @dimosgp
   * Getting # of devices on Aug 2
   * Look into extending our DB snapshot retention cc @brownjohnf #devops
   * Add initial events to DB
   * Whenever a device is deleted we should probably add a hook that sends an event (w/ @flesler)
   * Add ability to give access to analytics see the VPN events (w/ @flesler)

Discuss problem with creating charts based on Rolling 28-days Count distinct due to long execution times

* Calculation are simply too many to complete in the provided window
* We should look into caching results
* For a single user it takes > 20s
* Action
   * Check datastore feature - https://support.chartio.com/docs/datastores/ @dimosgp

---

### 20 Nov 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/YT-o8-es4T7xTGkqAFeQPwZXWBC)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1l8azrLITMVl8og_F-S7_kHGeQGQyNYTf)

Discuss doing a breaking change release of pine that makes $select mandatory and disallow $select=*. Basically the client needs to know what it expects, otherwise it won't get it cc @nazrhom

* Actions
  * No blockers, let's start working on this

Open Source Resin cc @dfunckt

* Discussed device types and merging image maker parts into API
* Extending OSS version to create managed resin
* New questions have arised
* Git: resin-api is dependent on it on app creation, because it calls and endpoint on git server to create the repo
   * We want to remove this dependency
* The commit has to be renamed to something else (e.g. ‘description of the build’) and refer to builds with ids we have in the database. We want non git ways to deploy where commit is irrelevant so we should use release id.
   * Description is very generic, probably not something we want to use
   * We have a unique id already (the DB id) that uniquely identifies the build
   * Different sources of releases need to attach metadata specific to them
   * Tags/labels could be used
   * We want to move away from commits in general, not only for the OSR context
   * Note: currently commit id is not the actual commit
* We’ve been talking about making the deploy endpoit a more full fledged endpoint that git also uses
* Deploy endpoint should be on the API
* Builder currently exposes an endpoint (/v1/push) directly to the user, this can be problematic because we’d like a single point where all information/user flows pass
* Action
   * App creation should succeed and not create a repo in git. The repo should be created on git push

PubNub logging sync up cc @flesler @pimterry @pcarranzav

* No blockers
* In multicontainer logs are per service so uuid will not be enough
* The log server should serve requests of the form ‘give me logs of a particular service’
* Logs should attach to image install
* Actions
   * Logs server will poll the DB (& PubNub?), it won't use any streaming mechanism (neither in-memory or PubNub subscribe)
   * The server will always first try the DB and if there's no log there, it will try PubNub
   * We'll re-check permissions and which DB to rely on every 1 hour

Discuss self-signed certificates in OnPrem and supervisor.  cc @hedss @page- @pcarranzav

* See https://app.frontapp.com/open/cnv_byxol5 and https://app.frontapp.com/open/cnv_cclg41
* Devices need to know that they’re talking to the correct server. There are defaults CAs 
* When running with a custom CA (e.g. OnPrem scenarios with self-signed CAs), this custom CA needs to be installed on resinOS. 
* Can be fixed by updating nodeJS version in the supervisor
* If it’s in a known location in resinOS CA extras can be accessed from the supervisor because we bind mount root (/)
* Probably better idea to bind mount the specific file (ca extras) directly into supervisor. The reason is that we need a well defined interface between os/supervisor
* We’d like CA ‘injection’ a first class feature and not something to be maintained as an  OnPrem-only feature on devices
* Environment files could be the solution of shipping CAs
* We would need an abstraction similar to NM in order to fall back if a CA update is faulty (so that the device does not get locked out)
* Affects OnPrem, Open Source Resin, also Cert-based authentication
* If users (e.g. Merck) can use a certificate signed by a known CA we might not need to add self signed CAs in resinOS
* Actions
   * We need at least 6.10 nodeJS (@pcarranzav)
   * Only need new arch specific nodeJS base images (if we don’t already have) (@nghiant2710)

---

### 15 Nov 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/XHGgxyewJO8q3EqyzLPs6AlGkke)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1JocmnEtgPFBBlWjzGFsplWmJYvI5hdK8)

Discuss how to get the current user's details (user id, username, and notably email) when using API keys, to continue to support the various SDK methods and CLI commands that do so when auth with both JWTs & API keys is allowed

* We’re trying to add support for API keys and CLI
* Emails are not in the whitelist so you cannot get user’s email from API key
* You need userid and username because there’s a bunch of commands that use it.
* /whoami endpoint on the API currently returns a refreshed JWT 
* Actions (@pimterry)
   * Version /whoami endpoint
   * Add a properly named refresh endpoint

We want postgres's data to be stored outside of the devenv's vm cc @zvin

* Postgres requires creating hard links which VirtualBox does not support in shared folders.
* For now the idea is to put postgres's data in an ext4 partition image and mount it in the VM. This prevents us from seeing the data on the host but it shouldn't be a big deal.
* Do we have a better solution? Should we do the same thing for s3 and git data?
* Idea: partition image stored in host and mounted in the vm
* Actions
   * Investigate if VBox supports forwarding/mounting a file as a block device (@zvin)
   * Need to transfer postgres outside in order to perform data migration
      * Alternatively we could have an export tool/function that enters the VM (instead of having the data in a ‘constant’ exported state)

Replacing PubNub sync-up

* We have two endpoints that fetch data from pubnub
* Need to coordinate for supervisor parts, also need to see how it plays with MC
* Other question: CLI (local mode) should be able to stream logs out of the device, how will this work?
   * Local mode will likely have to change completely for MC
* @flesler will resume benchmarking
* With regards to schema, we shouldn’t use uuid and a bunch of logs, since we’ll need to filter logs per service/image
* Gzip should be enough and we’ll likely not need to optimize for json property name length in the logs. Ideally the format will converge with what we’re using in resin-device-logs
* Actions (@flesler)
   * We'll output JSON from the device, the format won't be translated by the logs-proxy so doing local logs is easier
   * We will use longer keys on the JSONs, matching the API format (underscore) and output them as NDJSON
   * We will surely use a separate DB for the logs

Discuss how to fix is_online (can we use Pine translations?) 

* If pine translations work, the general pattern is fine (we need to test though)
* Some performance concerns, so we’ll need to test impact, since we’ll have to expand to get to service_last_connectivity_event
* Performance issues will be largely mitigated by requiring explicit selects in pine in future, and services table is actually a pretty cheap join
* It would be good to not have internal data called is_online that doesn’t match the external representation (but only very occasionally) since that will definitely confuse us later.
* We can do that without a breaking API change, as only internal services write to is_online. We can create a new column (online_at_last_reporting or similar), make internal services write to the old & new columns, generate is_online from the new column + last_connectivity_event, then remove the old column entirely from everywhere.
* Actions:
   * @Page- to investigate whether translations can do things like this
   * @pimterry to close the SDK issue

What should an 'image reconfiguration bundle' look like, since nowadays config.json alone is not sufficient? 

* Currently the CLI allows you configure images (resinOS 1.x and 2.x)
* For resinOS 1.x it allowed config.json configuration
* Suggestion: define a ‘bundle’, that will contain image configuration
   * Use case: customers will send an image and a bundle per device that they will provision. Bundle will then be applied on top of the image
* Should the bundle be a json or another file format?
* Manufacturers are likely open to run resin cli, in which case we can ship a JSON bundle (e.g. skycatch). In the future we might need to find more elaborate ways to do that.
* This JSON configuration/bundle should be a reconfix-generated 
* Need to add a version file in /boot in resinOS that can be easily accessible
* Action
   * Create issue in resinOS to add vesion in /boot
   * Configuration bundle, which will be representation of reconfix
   * Manufacturing process will use CLI to apply configuration to devices

---

### 13 Nov 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/Re_YQRu_p9i7Lzp2FmkbJwE_FOr)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1oXCj5ia2RJbTadmDKVm73EEsVwiAZL2K)

User is requesting to have a way to be notified in case of kernel update (rpi). This is because they use custom kernel modules and they need to recompile when that happens. Cc @agherzan

* Ref.:  Issue #144: Could you note in the change log when an update includes a linux kernel version change? by BrianAdams in resin-os/resin-raspberrypi on GitHub
* Should check if there’s a new kernel
* Should we have a changelog entry for kernel updates? We never update kernel specifically, we update the bsp that may or may not have a new kernel
* We should list kernel versions in the changelog. We’ll have to dig into the changes to check if this is done. It’s likely hard to script but it’s an overhead we‘ll deal with. 

Linux kernel, docker version, systemd are quite integral, core components that we should probably track and show anyway.

* Useful internally for us internally as well
* The component metadata has to be stored ‘somewhere’, could be handled by contracts
* Action: 
   * We’ll start adding the kernel version in the changelog for our logs. (@agherzan)
   * Need spec on how we will handle resinOS core component metadata (@agherzan - https://github.com/resin-io/hq/issues/1084)
      * Will require Image maker & UI changes 
      * Need ‘approved builds’ metadata/file

Discuss the current state of multicontainer, and whether our aim for a demo next week will be viable cc @CameronDiver

* Discussed creating a new environment to unblock staging and demo MultiContainer
* We’ll need a supervisor deploy mechanism for this new environment
* Resin in a box could be used as well
* Caught up with translations in the API
* Actions
   * We’ll setup a new environment for MC demo (@brownjohnf)
   * @Page- will help with prep work with the new environment

Open Source Resin cc @dfunckt

* Device types: image maker won’t make it in OSR, all device types come from this so provisioning/registering is breaking.
* Great opportunity to fix this problem - image maker shouldn’t have anything to do with this.
* Two possible ways to fix this:
   * Rip out the relevant code from image maker, add it in API and have img maker use the API instead of keeping this state internally
   * Currently for every env we host we have separate S3 buckets. OSR could point to the same buckets, however there’s an issue with OSR supporting custom device types (it’s a big value item)
   * We can start with pointing it to resin.io S3 buckets
   * There’s a concern that we won’t be able to update/remove artifacts from S3 buckets
   * We need an environment to show metadata of artifacts
   * Some friction on testing images in production before releasing them
      * .admin extention idea for image files to stop image maker from exposing the said images. This would facilitate testing while not releasing images for everyone but for admins only
* We’re doing things in the API that require ‘root’ privileges in the model
* Integration should happen in the code level with extra schemas, hooks etc.
* Actions/Moving forward
   * Point to production resin image files / S3 Bucket for OSR
   * Rip code out of img maker and into the API
   * Managed/Unmanaged unification is a prerequisite
   * Making pine a framework /  thin API framework that imports pine
   * Break API in two parts
      * Application / api logic
      * Loader - loads pine and logic, starts everything in correct sequence
   * If the loader mature we can import it in pine
   * We’d likely prefer importing pine framework, OSR as npm modules rather than doing the integration on the Dockerfile level

Discuss how we're managing the code that runs our visualisations, how we make sure it's optimal (or close to it), and in general how to add some versioning and review over it, since it's code like everything else. cc @dimosgp

* Approach: git repo that whenever we merge to master it sends whatever code we have to chart.io - for production diagrams
* Need some info that if given to someone else they’d be able to re-create the exact diagrams in chart.io
* Actions (@dimosgp)
   * Need to define what the repo looks like, how we described the diagrams and write code that takes these files and deploy them to chart.io 
   * Investigate if chart.io provides an API to re-create what we want and devise a developer workflow
   * Ask chart.io if there’s an automatic way to create charts

Discuss how our migrations cause production meltdowns and how we can modify them to avoid those cc @flesler @brownjohnf @afitzek

* Discussed postgresql locking and how we can tune/prevent the meltdown from happening again
        
Discuss doing a breaking change release of pine that makes $selectmandatory and disallow $select=*. Basically the client needs to know what it expects, otherwise it won't get it cc @nazrhom

* Spec doesn’t say that this is required
* All versions should be optional
* Should be a huge performance improvement
* Action
   * Implement mandatory selects in pine (@nazrhom)

---

### 06 Nov 2017

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-process/threads/Qt20-su760Ynz7l4x1-hAhqKgWT)
- [Minutes and recording](https://drive.google.com/drive/u/2/folders/1nVtbMCHq3mXsWbyee289XZikHOhCy-E1)

Device Types / HostOS apps

Discuss how our migrations cause production meltdowns and how we can modify them to avoid those cc @flesler @brownjohnf @afitzek @page-

* Why did we have a meltdown?
* Postgres log reported a deadlock.
* Migrations on staging went fine, in production we hit a deadlock scenario
   * DB connections couldn’t get a result, this slowed down the API too much
   * We don’t know exactly how the deadlock happened
* Migrations don’t lock the resources they are about to change.
   * Locking resources could solve the issue
* If we have a migration that changes multiple tables, how do they run?
   * All migrations run in transactions, in these there are alter table instructions
* If we start a migration and we have ‘alter table users’ it should take a table-wide lock.
   * If that’s the case we shouldn’t have a deadlock
   * The update users happens and then there’s a second alter table
   * Tables A and B. Table-wide lock on A, another one table-wide lock on B, this could cause a deadlock.
* Massive congestion situation could be caused if many requests piled up while the users table is locked for the migration. But this doesn’t sound and shouldn’t be reported as a deadlock because the migration is active
* We apply migrations in alphanumeric order, it’s possible that the migrations in staging and production ran with different order.
* Actions
   * Pick up a snapshot of DB before the incident and run offending migrations , see what happens
   * Instead of using dates, we need something that will cause conflicts so we’ll start using sequence numbers e.g. migration-1, migration-2 etc.
   * Ongoing discussion: https://www.flowdock.com/app/rulemotion/resin-devops/threads/cydBGnPkKBTHQExU_d536-PsBlg

Email verifications spec sync up cc @thgreasi

* Questions
* New signup that never clicks verification within grace period.
   * Whenever one tries to signup with the user that already exists it sends an email that says ‘click here to login’, same way that the verification email says ‘click here to verify email’. ‘click here to login’ also verifies the email
   * We can use automatic verification infra and get rid of automatic login code
* To sum up, whenever someone signs up
   * If the user exists, we create a pending email change request. We send an email that says someone tried to sign up, if it’s you click to login. Your email gets verified and you log in
   * If the user didn’t exist, you create the user, the exact same email request but the email message changes (‘welcome to resin, click here to login’)
   * The url/mechanism is the same in both cases under the hood
* Unverified user must be able to login but not modify/read resources
   * These users are authenticated, but not authorized
   * After the grace period we shouldn’t deactivate any users or remove the emails. Users should be able to login but not do anything. It’ll ask email verification.
* Unverified users can change their emails (e.g. if original email has typo)
* Should be easy in PineJS
* The API or the UI must be backwards compatible, we don’t do concurrent deployments
* Actions
   * Add email verification test cases
   * UI -> API -> UI deployment plan likely
   * Remove grace period
      * New users are forced to go through verification process because they don’t have anything
      * Old users get nudged to update

Balena on resinOS session

Discuss the current state of multicontainer, and whether our aim for a demo next week will be viable cc @camerondiver @page-

* Blocked on translations
* Page will resume work this week
* Cameron/Page to do a checkin this week (probably on Wednesday)

Discuss Open Source Resin spec from https://github.com/resin-io/hq/pull/1074/files cc @dfunckt

* Petros to review the spec
* Device management: Anything involving vpn/proxy, what’s our take there. Resin VPN won’t be included in OSR
   * Solution: Make VPN pluggable
   * resinOS unification spec is related: There has to be a provisioning scenario where the device doesn’t use openvpn, no-vpn should be available as well
      * E.g. for soracom provisioned devices we have soracom-networking
* At the component level we’ll split open source components to their separate repos (e.g. api, db registries) and we’ll need an extra repo with compose file, readme etc.
* In the closed source resin we extend the OSS components that are not identical
   * Etcd configuration shouldn’t be an issue since we’re moving on kubernetes. We’d prefer to have an extra etcd container/components to avoid differentiating closed/open components on etcd conf only
* Target state: components depending on etcd (e.g. registry) should work with both etcd and env vars to facilitate the kubernetes transition and OSR
* There should be separate, atomic units of third party endpoints

Discuss and confirm the 360 sidebar plan cc @pimterry

* The approach is: there is a sidebar running on Front (for now) that is client side code and either talks directly to our data apis or there’s stateless proxying/authentication when there’s a third party api. The api doesn’t do copying of data over other things, maybe in the future it’ll do caching
   * That was the core element of spec, confirmed - talks either directly api , either directly for data model or for other services

Discuss how to avoid arch mismatches on some device types. Example. The artik710 base images are armv7 but the RESIN_ARCH resolves to aarch64 cc @shaunmulligan @nghiant2710

* Default wifi-connect uses resin device architecture in dockerile templates
* Artik710 has a weird setup because it (resin_arch) resolves to arch64 but all base images are armv7 , so it breaks completely.
* Rust compiler fetches 64 binary that breaks on 32 image
* Why are we using resin_arch to decide what binary to run?
   * resin_arch describes arch of the kernel, not the cpu
   * Probably problem of the dockerfile. The base image itself should say, prob with a different env var, its arch
* Action: correct architecture should be stated as an env var in base images

---

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
