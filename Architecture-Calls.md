
## Description

Architecture calls take place several times a week (usually 2 or 3). It is the time and (virtual) place where we generally try to come up with an action plan to tackle non-trivial technical issues across the resin.io platform. This call is usually technically oriented and the subjects range from resin.io backend, devices, cli tools etc. Everyone in the resin.io team is welcome to join.

### Using the #architecture Flowdock tag

Many interesting technical discussions often produce very long threads that are difficult to follow, so what we do  instead is have a call, keep meeting minutes and come up with an action plan. There are no hard-defined rules on when a Flowdock thread should be discussed in an architecture call, but if you think it should, the process to bring it up is to send a Flowdock reply, ideally in a Flowdock thread that has context of the discussion, and use the following convention: 

```
#architecture [brief description] cc [pings to people who need to attend or be kept in the loop]
```

Example:

```
#architecture Discuss keyframes cc @jviotti @brownjohnf @hedss @mikesimos
```

You can add a bigger multiline description, if you feel like it, but only the first line will be fetched for the arch call agenda. Example:

```
#architecture Discuss keyframes cc @jviotti @brownjohnf @hedss @mikesimos

[More lines with more context that will be ignored from the agenda description]
```

Open `#architecture` items can be found at the respective Front inbox - https://front.frontapp.com/inboxes/shared/39382 . The agenda and the notes will be posted at the  [`r/architecture` Flowdock channel](https://www.flowdock.com/app/rulemotion/r-architecture).

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

### 4 Oct 2018

**discuss the certiicate not yet valid issue on devices, and the mitigations which might be performed by the supervisor to automatically handle this cc pcarranzav**
- Reporter: @CameronDiver
- Mentions: @pcarranzav
- Front Ticket: https://app.frontapp.com/open/cnv_zwr0h7
- Summary (author: @camerondiver)

more investigation needed will raise again when time allows


**discuss methods of allowing resin push to work with massive input directories, which currently fails with payload too large errors**
- Reporter: @CameronDiver
- Front Ticket: https://app.frontapp.com/open/cnv_zx8mxv
- Summary (author: @camerondiver)

more investigation needed. Will re-raise after this.


**For new devexp, katapult currently has hardcoded `resindev.io` certs. Each host needs to be able to identify itself as `*.<hostUUID>.local` so that requests work. We need to be able to ideally use a CA chain that doesn’t need installing (LetsEncrypt perhaps). How do we get to a point where we can get a working CA chain for devices**
- Reporter: @hedss
- Front Ticket: https://app.frontapp.com/open/cnv_11a8w2b
- Summary (author: @hedss)

The 'nice' way to do this is to ensure that each device has a specific certificate for itself, via its UUID. We could create an external service that obtains a suitable certificate (*.<uuid>.resindev.io) for the development device from LetsEncrypt and installs the certificate into the deployed docker-compose artefact (or even on-device in resin-haproxy). Heds is looking into this.


**arch We’ve historically matched version tags on a repo with built images (ie. `resin/resin-s3-minio:v1.2.3`). ResinCI’s prefers not prefixing the version number with `v`. Should we be dropping this altogether? If so, then we should probably do it in repos too, to stay consistent**
- Reporter: @hedss
- Front Ticket: https://app.frontapp.com/open/cnv_113lqv7
- Summary (author: @hedss)

We should drop the v prefix for registries, but keep them for repositories. This means updating the Circle configs for those components still using them.


**cust-arch discuss Rombit’s fast boot question. They are currently seeing 20 second boot time and need to get it down to 10 seconds for their automotive use case. ( lekkas the cust-arch hashtag will still make it into the arch call noes, right?)**
- Reporter: @alisondavis17
- Mentions: @lekkas
- Front Ticket: https://app.frontapp.com/open/cnv_111ydaz
- Summary (author: @alisondavis17)

we will devote engineering resources to improving resource consumption and boot times between now and the end of the year. Fundamental architecture is now in place and this will be a next big push.


**Discuss how to solve the problem that push events for forked repo PRs (external contributors) don't show up in our org timeline.**
- Reporter: @brownjohnf
- Mentions: @jviotti @nazrhom @hedss
- Front Ticket: https://app.frontapp.com/open/cnv_104qwjv
- Summary (author: @nazrhom)

This can only be solved via webhooks as the events API does not expose that event. The workaround for the time being is to manually trigger a build with `@resinci retest` after a PR update. This can be done either by a resineer or directly by the external contributor. This will be solved by using JF to feed events to concourse since JF will collect events with webhooks


### 21 Aug 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/QXVp-kzzYRylBThV7IsZlvaWhvS)
- Meeting notes
  - https://drive.google.com/open?id=1u0YvPgT7dom_BYQCtfxkjuu4ZEfmshhM
  - https://docs.google.com/document/d/1bgUXKSifZmS5LPxhG-zWlUM4F4cevYgZ201R5bahYas/edit

discuss how to get on-prem ready with balena-on-balena for SoCal Edison cc @pcarranzav @hedss @CameronDiver


* katapult + build secrets should help make b-o-b closer to our production environment
* this should help avoid some tweaks currently done on. git server where we add keys to the image during build
* @hedss to PR a change to the git server that uses env vars instead, so no need for build secrets
* another issue is with changes in devenv's compose, an iptables NAT flush in the builder breaks DNS
* Heds PRd a change that uses an etcd variable to decide whether to do or not the NAT flush
* Petros suggests, instead, creating a separate iptables chain, so that rules can be flushed and readded there. @hedss will try it out.
* Supervisor changes required for networking creation/service network aliasing is required for VPN IP to be properly stored by API
* Another important thing for onprem is how to inject resinhup images. TBD with Greg on Thursday. Easiest solution would be to push to resin registry in the onprem. Nicer but trickier would be to make this part of a public resin application.
* Device types are added using minio to copy into the onprem S3.
* For emulation, we use a trick in the CLI since we can't assume the user has the right config. This adds extra build steps internally. We should consider using the same in the builder. This would require open sourcing the builder. Idea: getting the builder running with balena-in-docker when the user does resin push. (Or getting a subset of the builder)
* How do we update this? Need local push for unmanaged devices. We can discuss next week, but we can have a rough update mechanism at first and improve on it.


Should we use the interface-name rule from tslint cc @sqweelygig


* Action agreed: research the coding convention of popular typescript repos and report back on Thursday [results](https://www.flowdock.com/rest/files/240548/aDj1B0dJwuGpA06JdiLskg/i_prefix.md)


The Builder currently needs changes for Devenv/resinOS runs where the Docker iptables rules do not explicitly flush the NAT, as this stops external comms. This currently occurs as a bind-mounted file, or a rebuilt Builder container for resinOS. I’ve created a PR to use an etcd/envvar instead. Should we do something else? cc @hedss


* Next steps (see notes on onprem discussion above)

### 16 Aug 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/GLf5DeaCnuGKIH1gJBa-o_2ekiG)
- Meeting notes
  - https://docs.google.com/document/d/1z_UAwy2v7ey3aBXXKlbwAessY12fuNp32E9EGmGCKkM/edit
  - https://drive.google.com/open?id=1AcZuK5gb0ekUptlah68eiCiq1WL9iK42

[Discuss Recurly reporting options](https://app.frontapp.com/open/cnv_ylligb) @pimterry
* Yes, we should change to do simply scheduling Recurly usage reporting
Schedule tasks very simply in the API somehow, such that only one API instance runs them, and we recover if that fails or that instance goes down.
Look into Redis primitives to handle that synchronization
* Next step
  * Tim to look into this and get it built

[Discuss release pinning for flasher types](https://app.frontapp.com/open/cnv_ymkhdv) @telphan
* Fix this now with a quick hack in the resin-image-flasher (direct API call to pin the release)
* Long term solution will be a unification of the provisioning process
track here: https://github.com/resin-os/meta-resin/issues/1154

[We’d like to add an uptime SLA to our production-level agreements with customers. to do that, we need to agree on a solid and reliable way of defining and measuring downtime. How can we best define and measure downtime?](https://app.frontapp.com/open/cnv_ynf82z) @alisondavis17 @brownjohnf, @pcarranzav
* StatusPage has a way to calculate downtime, but only when there is an incident created (either automatically or manually) 
  * This has to do with integration between nodeping and status page
  * Could explore other status page products 
  * Numbers are not currently public, but we could make it so
  * 99.89 API uptime in past 90 days (2.4 hours of outage) - seems too low. 
  * SLA should include ability to push an update
    * API is a clear one then; dashboard too 
    * What about the builder and git server too? Probably yes 
    * Registry and Delta server too
    * NOT imagemaker, device URLs, and VPN 
* We will start making these public now (@brownjohnf and @mikesimos to check this) 
* And we will work on making the calculations more accurate (@mikesimos to check this)
* How we want to count degraded performance? 
* StatusPage does partial outage *.3 to count towards overall downtime 
* How should we handle outages that are, say, less than 5 or 10 minutes? 
* We will see if we have a lot of outages that are this short that are being counted towards the total, and if so, we’ll figure out how to deal with it 
* Note that nodeping will default to major outage so we need to know if it’s a partial outage to go in and mark it as such in the status page 

[Discuss the dangling diffs problem we keep seeing on devices. We either need a mitigation, either to be done by support agents or the supervisor, or we need to fix the root cause, which as of now is unknown](https://app.frontapp.com/open/cnv_yo4qlf) @CameronDiver
* Cameron to try to reproduce
* Chat to Pepe again about a mitigation

[How do we make devices which have been deleted from the dashboard stop spamming mixpanel with events](https://app.frontapp.com/open/cnv_yp9ky3) @CameronDiver
* Ongoing discussion
* Some ideas include returning empty state, or similar, so they stop running stuff, and also stop spamming mixpanel (possibly also pubnub) with events
* There might also be multiple issues for the devices that are generally spamming mixpanel, so not just deleted devices, * but other issues too, so will need triage
* Need to make mixpanel more useful as well, as curently the team is not checking it, so then what's the point
* Need some care, investigating
  * Michael will send a recent snapshot of overly chatty devices
  * Petros wants to look at those, and see possible issues to solve
  * … take it from there

[Best way to mitigate the certificate not yet valid mixpanel issues. This is because the supervisor can start up before the NTP server, and start requesting the API. Methods I can think of are not reporting this at all, or making the supervisor pause it's updating while it waits for the NTP server.](https://app.frontapp.com/open/cnv_yp9umb) @CameronDiver
* Will not report this error in the future in the supervisor


### 09 Aug 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/yyZ7EOKBAVL21GpW3Mz3mVxWIit)
- Meeting notes
  - https://docs.google.com/document/d/1lUMkjUJDFqXiD6ebWtZZgxNKw6rGYT3q1cBPV2jpSXs/edit

Discuss remaining billing model vs Recurly questions cc @pimterry

* How to handle history/future subscriptions, and how to report usage to Recurly itself
* DT are an interesting case: current have overlapping subscriptions in the ARR sheet. We can simplify this to sequential subscriptions.
* Want to avoid needing Recurly webhooks to report usage
* We can support a computed term which points to the current subscription
* Next steps
   * Tim to investigate rolling windows vs reporting billing usage attached to a specific time
   * Tim to investigate scheduling billing changes with Recurly, if we can do this, we should include start/end times on our subscriptions

We 're experiencing an outage on the discovery service our fleet clusters are using ( discovery.etcd.io ) for many hours. This is blocking new instances from joining our fleet cluster. Discuss architecture and plans for potential migration to own-managed discovery service. cc @mikesimos
More info on the current status of discovery.etcd.io: https://github.com/coreos/etcd/issues/9978 

* Next steps
   * discovery.etcd.io recovered (after many hours).
   * We have an own-managed discovery service deployed in k8s cluster (discovery.k8s.resin.io).
   * We will combine the discovery url update with next coreOS update, or deploy if needed in case of any future discovery.etcd.io outage.

Discuss automated test/release of resinOS cc @zubairlk

* None. Wait for testbot work to happen

Discuss options for hardware-level identification, which has uses for fixed device licenses, opendoor’s request to automaticalyl delete “duplicate” devices, etc. (hopefully arch is the right call for this) cc @alisondavis17

* Technical implementation: 
   * Every resinOS implementation for every device type will generate a “hardware UUID” that is deterministic and based on hardware attributes of that particular device
      * I.e. Rpi could be CPU ID and MAC address
      * I.e. for Fin might be wifi chip, or ARTIK identifier 
      * Will need to define this for all device types 
   * Change so that when device provisions to backend, reports hardware UUID, backend accepts and stored in the database, needs to be in all history tables for billing etc 
* What happens when a duplicate device DOES provision, what happens to the old device? 
   * Default: deactivate old device for free? (bring to product call) 
      * But needs to be clear that deactivated-duplicates are different from other deactivated devices, so you can easily delete the deactivated-duplicates 
   * But let user configure this as well with various triggers
      * Might want to automatically delete the old device 
         * But this has security implications
         * Would need to make sure you overwrite previous data with random data to “truly” delete the device 
            * We need to fix this anyway 
      * Might also want new device to live in quarantine / be deactivated until you decide to activate it

### 07 Aug 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/0kXgND08eROsnaqaq9yl5LYUKSy)
- Meeting notes
  - https://drive.google.com/open?id=1TZU0UGu-Lla17MLIcKODOPZTGE1g4fg8
  - https://docs.google.com/document/d/1hMF73fmgtoDE9n-CP6pIRXvWYFa7FQd4CD2-qbNra5E/edit

Is uuid considered secret information? This came up during forum support, since as load increases, it's starting to becoming a pattern that users share dashboard urls in public channels cc @lekkas

* It is not
   * It used to be when uuid was part of the pubnub log channel id
   * See https://www.flowdock.com/app/rulemotion/r-architecture/threads/039bt-cPo_8wiWt7NvA3pYdeXZ2

Discuss how to use a better endpoint in the ALB to avoid false positives for healthy hosts architecture cc @brownjohnf @flesler, @mikesimos

* Next steps
   * Refine ping endpoint for covering database and redis status.
   * Ping endpoint should check health of all API processes.

Discuss e2e alerting for individual components and services, (that could enable automation of status page integration for most incidents). We could work on some/better health-check endpoints on services, that include checks to most/all dependences basic checks. These endpoints can be leveraged for automation of instances(fleet)/pods(k8s) rotation. cc @mikesimos

* Next steps
   * Refine health-checks across services.
   * Refine monitoring metrics/alerts.
   * Auto rotation threshold alerts (for instances rotated by ASG)
   * Keep instances for debugging (detached from ASG, ALB/ELB)


### 02 Aug 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/wkHHIyGx6ATkMC7aPqkwC_sfACH)
- Meeting notes
  - https://docs.google.com/document/d/1Gu6EjLnrqmerpxCRGhsySw4QRh8ZSBIqGo-KBxaNXHo/edit

Discuss potential use of own gpg keys (instead of bintray's) for signing etcher packages (deb/rpm) cc @mikesimos

* Next steps
   * Create Master-key, and subkey for signing deb
   * Create package for failing update (preinst), and printing sources list update message.

how to create images from branches of external contributors cc @camerondiver
* Cameron to chat to Giovanni or Jack to see what we’re going to do with versionbot

Discuss fixing the race condition in the update lock: if after reboot, the supervisor comes up before the app has taken the lock, the supervisor will update the app. My proposal would be to implement the lock as an API endpoint on the supervisor API rather than a lockfile - that way the lock can be taken across reboots, and the app can query whether the lock is taken to avoid deadlocks. cc @pcarranzav @camerondiver

* We want to move towards a lock based mechanism which will persist over reboots
* We want to still support the current method, but have it based on the new persistent system
* The new system should have a concept of ownership, so we can know who took the lock
* Next steps
  * Create an issue for this, allowing it to be attached to front tickets, and add it to Cameron’s todo list
  * https://github.com/resin-io/resin-supervisor/issues/716 

Discuss future of device logs limits and reading defaults @flesler

* Default ?count for history is `1000`, default for subscribing is `0` (skip history)
* We’ll still leave the count logic outside the backends, move it into RedisBackend once PubNubBackend goes away
* We might have to implement pagination in the future, the current schema (rotating List) is quite incompatible with paging
* Created an issue for this: https://github.com/resin-io/resin-api/issues/1234

### 31 Jul 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/s1TsGFs6zpYAuDGRGsAzIPiK3bS)
- Meeting notes and recording
  - https://docs.google.com/document/d/1xOFL3cJeJVzkRlbYK7AlFGXJy6DRZpOQV09H2leP0Es/edit

### 19 Jul 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/N_8s-dfsKRzUAKJwfpBgLgLLDiU)
- Meeting notes and recording
  - https://docs.google.com/document/d/1E5y7LcI_vsAJoikwS0Ww3EdTiBeTK6Enp-UnOZfkIRU/edit

### 17 Jul 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/6o880C8svOHbr__4NoEcV7YXeSs)
- Meeting notes and recording
  - https://drive.google.com/open?id=1OSjOgcXwiPJSAO_f5MOAcOSm9EtfWFzx
  - https://docs.google.com/document/d/18eYRi3M60a_sdm-Qn1uA4DR4s5J1NM5c_4U10inPEvo/edit

Have a diagnostic resin-os service that reports results of a predefined set of tests ran on the device and outputs them in the dashboard. For example report ro file system, report modified rootfs, report systemd failed services etc. cc @agherzan @zubairlk

* Greg will take this item and supervise as it gets implemented
* For now we will first get the leech script in the proxy actions
* We will bring this in a product call after we have it as a proxy action

Currently the API determines the IP address of the VPN service by using the IP the request has come from. This fails in the instance where the LB (HAProxy) exists within the same network as the other components, because it sets the X-Forwarded-For header to itself (ie. the gateway) rather than the VPN component. There is a way round this (move the LB to a diferent network, such as the host network in Docker), but do we want to specifically pass the service IPs to the API? (I believe there are potential future applications with Katapult here too). cc @hedss @wrboyce

* Traffic for API from VPN goes via Docker bridge userland proxy, which rewrites the source IP, hence VPN can’t register. This needs some further thought; @hedss to come up with a minimal example that exhibits this that can be used as a base for discussion and experimentation.

discuss possibility of having the resin-data partition in SD card when OS is in internal eMMC. voyage.auto would need it for the TX2, so that they can have huge docker images (~28GB, since they store maps) cc @pcarranzav

* looks like it might just work
* Andrei will test this and report to Pablo. The OS should *just work* by moving the data partition to another disk as long as we keep the label

### 12 Jul 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/qAcaOWv4x66X-tqtArwnX9RgNHT)
- Meeting notes and recording
  - https://docs.google.com/document/d/1lccx_V9JX8k5PO43SAjK9kDZg86pe9MjWZQCK73fqXk/edit
  - https://drive.google.com/open?id=1ORbf34u_xPTKiabYVwqKc02uE0MNlU1b

Coordinate pubnub log effort cc @pimterry, @CameronDiver, @flesler, @imrehg

* Aim to start making releases by the start of next week
* Add a custom permission for writing logs and use canAccess
* Petros needs to add some tweaks to the supervisor yet
* Send a special log announcing the switch when the supervisor migrates
* Make the key expiration a month
* Limit API log buffer size
* Try to implement back-pressure in the server, the supervisor is already ready for it
* Can merge intermediate versions of the write endpoint if it works ok, since it won’t be used
* On 415 in the write endpoint, abort the connection
* For read permissions, if the caller can read the device, they can read the logs
* Ping Petros and Kostas to get Ariel’s tomorrow’s support shift to someone else
* (later that night) API was still expecting snake_case but new supervisor now sends camelCase, API will be tweaked to support both
* (later that night) New supervisor was sending `isStderr` and was supposed to send `isStdErr`


Customer stem wants to migrate ~800 brownfield devices to resinOS, starting with their custom x86 boards (~200), which we are currently building custom device support for, and eventually their beaglebone XM (~400) and black (~200) boards. cc @alisondavis17 @imrehg, @pcarranzav

* Currently running custom Ubuntu 14. I’ve asked for the image.
* Options could include:
   * having Gergely help with remote host OS update, highly manual, likely would require services payment from Stem, need to see their image to evaluate possibility.
   * running resinOS in container on existing host?
* Ask about:
   * are there variations in current OS between devices in the field
   * what remote access they currently have (we need root)
   * available free space
   * if there's local data that needs to be preserved and its max size
   * if they currently have an update solution
   * what failure rate they could tolerate (potentially tricky question)
* Quote will depend on the answers to these questions
* If the BBXM and BBB are running similar setups, it's possible that much of the initial x86 work could be reused for them
* We'll need a test setup with device and peripherals that match what they have in the field. Maybe even have some devices set up by them that we can test-drive in (and maybe break).

Discuss etcher apt and deb packages repo transition process to bintray open source account cc @mikesimos @jviotti, @jhermsmeier

* Moving to a new (open-source) bintray account will save ~500$/mo. (was 637.86$ in Feb)
We have two options for that:
   * Move all packages to the new account. Keep both accounts online for a while. Then, decommission resin-io account. We can inform etcher users to update their apt/rpm repos. Bintray doesn't have apt/deb mirror redirect feature. When we decommission resin-io account, resin-io repo will appear broken, (404  Not Found on apt update from all users that installed etcher via apt).
   * Distribute an update, that updates etcher package repos
(bintray key should be already in place) (the update can check /etc/apt/sources.list.d/etcher.list and replace deb https://dl.bintray.com/resin-io/debian stable etcher line. This should cover recommended installation described here. We could also check /etc/apt/sources.list.d/ files and maybe /etc/apt/sources.list as well?). We can then keep resin-io account for a while (1 month?). This would allow users to fetch the update that will update their package repos. When we decommission resin-io account, resin-io repo will appear broken, (404  Not Found on apt update) only for users that haven't run apt update for the last month.
   * Next Steps
   * Copy packages from resin-io to etcher bintray
   * Setup a mirror URL we control, for redirecting etcher apt repos (similar with httpredir.debian.org).
   * Distribute a package for notifying users, of the apt repo change. Replace all resin-io etcher versions with this package.
   * We ll be keeping resin-io bintray account for a while, drastically reducing cost towards 150/month minimum pro edition account.


A user has posted some patches in an issue on the supervisor repo, which reduce memory footprint at the expense of CPU cycles by adding node arguments, is this something we want to add to supervisors? cc @camerondiver @Page- @pcarranzav

   *  Issue #690: Reduce memory usage by splitice in resin-io/resin-supervisor on GitHub
   * Tell user that we’re happy with two of the options straight off, which are --optomise-for-size and --always-compact
   * We’d need some more investigation into the other two options ( --stack_size=700 and --max_old_space_size=40)
   *  Ask the user for a PR, and also for more information about the gains that the questionable options can provide us.

### 10 Jul 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/8A8yvAmg_LBvL1-uWWOHcVbanic)
- Meeting notes and recording
  - https://drive.google.com/open?id=1eStyvUiXbeY23HNJgYdRYWI0k8RrWJi2
  - https://docs.google.com/document/d/1IhGM_c9w8_osU7a4DgTaGEMHMOzcTe0NndsDoKHxfVg/edit

We use the set of HKPS pools at sks-keyservers.net to grab the right keys for several packages used in backend components (ui, registry2, etc.). However, these are becoming more and more flakey, sometimes requiring rebuilds to actually get the keys. We could hardcode keys into the repo or do SHA256 checks on them, instead, or try and find a far more reliable keyserver. cc @hedss

* Whilst there’s no reason why we can’t put hashes into component Dockerfiles to check that the downloaded package is correct, it does mean a lot of refactoring of those components doing so. Looks like there may be a way to specify multiple specific keyservers at once, so @hedss will look into making these a lot more reliable if possible.

Discuss if we should allow rebase and merge to master with the new concourse workflow cc @nazrhom @jviotti, @brownjohnf, @agherzan, @floion

* Disallow rebase and merge for now. Some ways to support this feature were discussed, however the implementation effort is deemed not worth the benefit for the time being.
* To support rebase and merge we need a way to associate between the commits that are rebased on top of master and the branch they originate from.

With open sourcing resin-api, we'll split the SBVR in two files, where one is extending the other. What is the best way to discover and load these SBVRs into Pine? cc @dfunckt @Page- @richbayliss

* discovery:
   * as we currently do: hardcode paths in config.json -- potentially ugly as it means adding paths in node_modules
   * each module/package declares its SBVR in its own config.json -- we then need a way to discover these modules in the first place
   * ???
* loading:
   * concatenate the SBVRs before passing to pine -- seems to work nicely; we could instead have pine concatenate them internally
   * ???
* Next steps
  - Put discovery and loading aside for the moment
  - Focus on pine-launcher, part of a 4-part whole:
    - api core (npm module)
    - pine launcher (npm module)
    - open-balena-api (top level component): configures pine launcher with "api core" and let's it start the server
    - resin-api (top level component): configures pine launcher with "api core" and managed Resin' proprietary code and let's it start the server
- @dfunckt and @richbayliss will get together to explore

### 5 Jul 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/HEBn9ccEgg6si7NNgQWmg3EmCXP)
- Meeting notes and recording
  - https://docs.google.com/document/d/1iOL7rFxiJ8mwCP3Yn9DDnsFpFcQrZ2EJrWtYnvvGtjk/edit

Discuss secret management in kubernetes for katapult deployments. cc @mikesimos

* In katapult v0 secrets are expressed as environment variables with a SECRETS_ prefix in docker-compose Manifest file. We can remove this prefix during template generation, (for eliminating this naming convention limitation, and minimizing required changes in components)
* The straightforward way forward for now is using kubernetes secrets. We can maintain a gpg encrypted secrets file per environment in a repo. (similar with this) 
* Vault integration raises several concerns:
   * Level of integration (use vault as confd backend? Integrate in app?)
   * Security (wrt data resilience), 
   * Versioning, etc.

Discuss deployment strategies for DB migrations. We are transitioning to k8s and therefore rebuilding the deployment process, within this process, we should try to optimize it, by being able to easily deploy the API without any interruptions. This goes for small changes, but also for potential breaking changes, in the DB. Also we could design the process to potentially enable rollbacks. cc @afitzek @page- @mikesimos

* Prepare a deployment strategy that can handle different kinds of migrations
   * There are two different kinds of migrations:
      * Schema migrations and data migrations
      * For schema migrations
         * One possibility is that the component provide versions and therefore successive keyframes, that have an intermediate version, that can operate on old and new database schemas.
      * For data migrations
         * We probably need a background process to perform the long running data migration, and component versions, that can still operate while the migration is executed
   * Wrt to rollbacks, this is a feature that would be great to have
* Come up with a concrete solution to implement this and then discuss this again in an arch call.

Discuss update solution proposed for Infomoss' custom device case, and compare possible solutions (by us and them). cc @imrehg @chrisrwilkes

* (outcome: a 3rd way)
* Implement a more automatic update system on resin:
   * HUP learns to respect update locks on devices
   * API learns a target resinOS version state, which version the device should be on
   * “Cronjob” on the action server going around looking for devices that are not on their target version and they are online, triggering update on them
* @imrehg will create a spec for this to move forward till the next step

Device update event table history cc @imrehg

* Likely relevant for after the above feature
* Similar to how device connectivity events work today, stored in the database, but more along the line of the future audit logs feature (still being developed)
* Postpone till later, revisit it after the automatic updates above, try to have this feature in mind for the automatic updates

Discuss how we can accelerate getting private device types, its a constant burden on the device and sales team cc @shaunmulligan

* Add a field to device-type.json called “private”: [true|false]
* For specific users we associate “extra device types” that they should see
* Need to find engineering resources

### 3 Jul 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/8Lvpml1GsboRMuOaHaiidvWhIC5)
- Meeting notes and recording
  - Minutes: https://drive.google.com/drive/u/1/folders/1oyNqqdk9WtSF_bdagSApj8Z3xjAJbaAn
  - Recording: https://drive.google.com/open?id=1UBSHQa0iKvDGBGng7OGoMTqnylCnlQix

Discuss migrating marketing website to React, preferably using GatsbyJS cc @dimitrisnl @pimterry, @lucianbuzzo, @thgreasi

* Talked about
   * Benefits of making the transition
   * Problems of current implementation
   * Advantages that Gatsby could offer
* Next steps
   * Could proceed it fits the timeline and doesn’t push any deadlines back
   * Keep using Heroku for now for the deployment process

Discuss recent delta server memory issues in production cc @dfunckt
* Next steps
   * Reproduce locally (or maybe staging)

### 21 June 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/1PlSFR7JwRclfN_YHpyy1sWgbQ3)
- Meeting notes and recording
  - https://drive.google.com/drive/u/1/folders/1XXIVt9VJPMk1kL2jCGfG8VkIbJ3A6heg

Discuss S3 object lifecycle management policy, for reducing S3 storage cost. cc @mikesimos @brownjohnf
S3 storage classes pricing , and info, lifecycle management info

* Next steps
   * Create reports for stale objects, object access profile, and object size.
   * Follow up on FD

Discuss methods of reducing latency between remote arm builders and our registry cc @CameronDiver @brownjohnf @mikesimos

* Next steps
   * Check if registries support mirror mode for both pull and push
   * Cameron to create benchmarks which test if the problem is overall image size, or huge layers 

### 19 June 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/0uVUoqAI-hLQhfl5eEDRU57nKBV)
- Meeting notes and recording
  - https://drive.google.com/file/d/16WZ79pyozMnG7f7UsLCRr0F99YK2pec5/view
  - https://docs.google.com/document/d/1YVXegsWq-AdShamljTAPPU8b7gI9iThV_nA90TzZJcA/edit

Discuss how onprem could be scaled for ~10k devices (may be necessary for SCE)

* Next steps
   * Recommend a high spec. Machine to run the OnPrem instance on
   * Concerns are load on API/DB from devices' steady state polling etc, and also the registry when 10k devices pull at once
   * Reduce the device polling times to a higher value to ensure they don’t poll as much (move to thirty minute interval) - and in general propose some settings (e.g. deltas on, only staged releases)
   * Ideally we want to get them to a resin-os-resinOS solution (or K8 deployment if required) but the current Ubuntu VM would work the same
   * We need to find someone with some time to test provisioning 10,000 devices into an onprem instance (probably using resinos-in-container, and setting up the instance in a beefy NUC), and seeing how it performs
   * Setup a call with SCE with @petrosagg to discuss exactly what they need

Discuss the data we've collected on the DELETE queries during SDK test runs causing API incidents 

* Next steps
   * @thgreasi to collect logs of all requests made by the SDK tests
   * @Page- to investigate tuning dropping requests when the pool is full
   * @thgreasi and @brownjohnf to test SDK tests against staging, looking for the same behavior as in production
      * Assuming we can duplicate the behavior, we’ll mess with the pool/timeout parameters and attempt to make the tests work or fail, but either way not to cause the API/DB to lock up

Consider getting rid of buildpacks in our base images

* We will get rid of any documentation that mentions buildpack deps as a way to start deprecating them
* Buildpack deps will not be a thing anymore in the new re-designed balena base images
* We still need to have some discussion about how to reorganize the new base images stacks, and at which granularity

Can we impose a commit convention company wise and integrate that as a concourse check.

* Next steps

   * @jviotti to write a spec defining the conventions we intend to adopt
      * versionist tags as they are currently used (cfr. resin-os team)
      * enforce consistent language in commit messages (verb tense, whitespace, etc.)
      * unify with resin-lint

Discuss how to manage cache storage for yocto builds on ConcourseCI

* Question: How much data does a given yocto build use/generate in cache?
* We want to start moving yocto builds to Concourse, but we need to solve the cache storage issue. A few options:
   * AWS EFS should work equivalently to how things work in Jenkins, but it could be very expensive (~1k/mo @ $0.30/GB/mo)
   * Running our own NFS server in AWS (@0.10/GB/mo for gp2 EBS vols)
   * Leaving the NFS store where it is in Hetzner. This could be done in conjunction with running the Concourse workers on Hetzner, or attempting to run NFS over the internet. Leaving the local network will have security challenges and latency issues.
   * Use something like S3 or Backblaze B2 to cache objects instead of having a shared fs. I’m not sure of the implications of this for yocto builds, but it would be a lot of uploads/downloads
* Next steps
   * Convert Hetzner workers to Concourse workers, leaving the existing NFS infrastructure in place.

### 14 June 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/Mh636MGrEOvcr4GWXxiEWteFfJE)
- [Meeting notes and recording](https://drive.google.com/drive/u/1/folders/1sJvRf1NrVNxTmb6LAqvy8w5ulKozUe_o)

Discuss issue 'API v3 env var translations should use the new envvar resources' to clarify how to proceed. cc @richbayliss @thgreasi

* See https://github.com/resin-io/resin-api/issues/1023
* Next steps
   * Deduplicate existing IDs
   * Change schema so that IDs do not clash going forward

resinOS: Discuss how to handle dtb overlays in pi-uboot cc @zubairlk @agherzan

* See https://app.frontapp.com/open/cnv_u02usj for more context
* Keep thinking
* Investigate copying/moving/renaming dtb overlays in u-boot shell magic

Discuss the impact of updating the device model record everytime the /device/v2/:uuid/state endpoint GET requested cc @richbayliss @CameronDiver, @afitzek

* Next steps
   * Pass update trigger to “new service”
   * “new service” triggers API to notify of online/offline status & event
   * Redis-backed cache
      * Notification of expired records
   * (Refer to VPN spec)
   * (Refer to Online/Offline spec https://github.com/resin-io/hq/pull/278)

Discuss a method to update a device that is temporarily offline (asked for by Skycatch, but still need to clarify how important it is for them) cc @pcarranzav

* see https://github.com/resin-io/hq/issues/1352
* see https://app.frontapp.com/open/cnv_rovpvf
* See below

Re-discuss a USB stick (or other removable media) based method to deploy an update to a device without connectivity. For Skycatch, they need it for customers in the Australian outback. cc @pcarranzav

* Can be done at the application level with small supervisor changes
* Basically, the supervisor would expose the same target state endpoint as in local mode, but without stopping trying to fetch target state from the resin API.
* The app would load the containers into balena, and hit the target state endpoint on the resin API.
* Propose this to Skycatch as prof. services? (but we'd keep IP)

Discuss setting up a China-specific resin instance (would help skycatch and others, and product call conclusion was "yes, we want this") cc @pcarranzav

* Not yet because of commercial issues charging to customers in China (would require a partnership with a Chinese company?)

### 12 June 2018

- Postponed

### 07 June 2018

- Postponed

### 05 June 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/sNK2L_9K3SLuWSrv5EzhimgcdOH)
- [Meeting notes and recording](https://drive.google.com/drive/u/1/folders/1Pt-u49gFHk5hWmqGW3wCq00vTYNXC0Jn)

Discuss how we might carry out fingerprinting/licensing of resin backend stack (Devenv/rOP/OSS/…) cc @hedss

* After discussion, the pain of implementing a full licensing solution would currently outweigh the potential of a rOP customer from ‘pirating’ it. However, it would be useful to have a soft warning for the customer that the end of a licensing period is fast approaching, or has expired
* @hedss to propose a specification for how we could achieve this, that needs to go back to both the Product and Arch team

Keyframes design review cc @brownjohnf, @mikesimos

  * See: https://www.flowdock.com/app/rulemotion/e-onprem/threads/1ysBGdviOqDlYHueB32TAOMfo7Z
  * Next steps[
   * Each service should have an environment agnostic, core compose file. 
   * Per environment extensions/customizations on top of the core compose file, can be declared by the annotation:  `extends: path/filename.yml` (syntax example: yaml-extend)
   * Kompose can be used for translating docker-compose files to k8s manifests.

### 31 May 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/pVIHkx1DtKIit_tH8JW3JMZXLGb)
- [Meeting notes and recording](https://drive.google.com/drive/u/0/folders/1sVpYntPsgvEq_LzBcVFz6lmMxyyL0gv4)

Discuss orgs permissions implementation in the UI. The UI should probably hide the button to add a new device for an application (download the OS image) if the user is not allowed to do that. The UI can just know the current rules and implement them, but ideally we should make them dynamic and read from the API? cc @afitzek @thgreasi

* Next steps
* Initial ideas
   * We could have the UI do many queries to the canAccess endpoint
      * This might lead to many requests
      * The canAccess endpoint can’t be used to determine record creation. It currently needs a record ID to work.
   * We could we have a way to express the rules in the API and pass that to the UI
      * It will be hard to define rules consumable by the UI that are now in hooks
* Using API permissions and the canAccess endpoint seems the correct thing to do, regardless of whether we have to do many requests or we can combine them into a single one with batch
   * Ideally we could retrieve all permissions/actions for a single resource
* In theory you need to query for allowed operations on each item of a list (eg env vars) but in practice checking the first one might in most cases be enough.
* It needs some more thought
* Actions:
   * Midterm solution
      * In order to not block the Orgs, the UI will have the logic to allow/prohibit actions. The UI should “know” the allowed actions for each application member type and hold this information coded in a separate place
   * Longterm
      * Figure out all the actions that the UI does
      * Extend the canAccess endpoint (for posts and patches) and use it in the UI
      * We will then work that backwards and have the UI enable/disable actions based on the API’s responses
      * Follow the single request per group of items hint, wherever it makes sense (eg env vars)
      * Full general solution would be to have a custom endpoint, to query for a resource and a list of ids and request the allowed actions on these resources

Discuss how to normalise the blog process (Build, deployment and hosting) cc @dimitrisnl

* Next steps
   * Merge less-whitespace to master
   * Rebase PR over master
   * (..)
   * Check next versions for security issues - Worth to update?
   * Check http://seclists.org/fulldisclosure/2017/Jan/49


Discuss fsck on resin-data partition and the timeout in resin-expand script. A customers board (industrial pi 3 with emmc only ethernet cable plugged). Timeout in resin-data label caused fsck to not run. Corruption on resin-data prevented board from running properly. cc @zubairlk, @imrehg, @floion, @agherzan,

* Next steps
   * Fsck everything and reboot in case of timeout in resin-filesystem-expand

resinOS: discuss adding plymouth to initramfs cc @zubairlk @agherzan

* Boot splash displays earlier if plymouth is started in initramfs
* Increases the initramfs size slightly.
* Delays the time to init systemd by 0.5s (due to mounting /mnt/boot for the logo. Move logo?)
* Have a flag file in /mnt/boot/splash/early (which tells initrd script in initramfs that early splash is needed. default disabled so people without screens don't need to delay boot times
* Next steps
* Remove initramfs. Move init scripts into the main root partition.
* (labels/machine-id file. Hence the initramfs was needed. But should be fine now)

The current implementation of build secrets creates a tmp directory on resin-builder's fs, but the remote arm builders cannot access this. Discuss methods of providing the secrets to these builds cc @camerondiver

* Next steps
   * We should create a container on the remote arm builders whose context is the build secrets, and the list of services etc. This will then create the secrets on the tmp directory, which will be mounted into the service specific builds

Discuss the switch to Redis for storing device logs cc @flesler

* Next steps
   * Add a custom API endpoint for the SDK/CLI to abstract PubNub/Redis ASAP (ping Petros in PR)
   * Do a performance test of Sorted Sets vs Lists + SUBSCRIBE (Circular Buffer) 
   * Investigate how to handle legacy payloads coming from old supervisors once we patch them
   * (said after the call) also make the post logs endpoint ready asap to take all the supervisors

### 17 May 2018

- [Flowdock thread](https://docs.google.com/document/d/1RPi04ipP5mCbieea45_Tiukt75f19hNp09L8P-0gKQM/edit)
- [Meeting notes and recording](https://drive.google.com/drive/u/1/folders/1ebxytbXpjC9r7ttuwySz8gltI-zoOr_k)

Discuss methods of allowing the mounting and using of external storage devices in multiple containers @CameronDiver

* HostOS will automatically mount any external media with the label beginning with resin-external- onto /mnt
* Labels on volume entries will inform the host to create a volume from the external
* Cameron to talk to Andrei about the host OS side

Discuss the state of IPv6 support for resin (and it might help with link-local support to have it up and running?) @imrehg @agherzan

* Supervisor is IPv6 ready
* Anything happening on meta-resin? (need to check)
* We should have dual-stack networking - but it’s tricky:
   * Dual stack on services, but on the host is IPv6-only - the request might not go anywhere (if it only tries the IPv6 stack)
   * When the host has IPv4 networking, add a default route
   * When the host has no-IPv4 networking, do not add a default route
* Quick fix, possibly: enabling host networking
* Tasking: the devices team

Discuss architecture drivelist: discuss usage of /dev/disk/by-path and alternatives / fallbacks, as it's not available on all distros equally /cc @jhermsmeier @curcuz

* /dev/disk/by-path does not exist on all distros (known to not exist on Ubuntu 14.04)
* Just go deeper; look at the /sys/ fs 
* Look at libudev (?) bindings for node
* If all fails, read udev code & figure out how `test-builtin path_id` works
* Figure out if libudev work regardless of whether the udev daemon is running on the system

### 15 May 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/Q5GAkk7mfgB9PIt91rbHFKm0vz8)
- [Meeting notes and recording](https://drive.google.com/drive/u/1/folders/19fJzO-QWYJSmghFmA9FjZaZduEM4rU4k)

Discuss approach for soracom/vpn integration cc wrboyce

* More detailed context at https://app.frontapp.com/open/cnv_rpjv4r
* Next step: Arrange arch call with Alexis from Soracom
* Considerations/thoughts: use device id as gsm auth and passthru to resin, enable soracom connectivity on a per-device basis?

Discuss how we can allow users to add custom udev rules to the hostOS. cc shaunmulligan agherzan

* Also raised by spanceac from a support ticket: This would be needed to solve issues like ModemManager trying to access a serial port to check if it is a modem, when the serial port is not a modem but another device
* Next steps
   * Assembly a project with Juanchi Andrei Zahari and Petros
   * Put whatever is urgent in the OS in the meanwhile (udev rules that is)

Discuss the supervisor issues that are pending for resinOS unification cc agherzan

* Next steps
   * Pablo to talk with Cameron about supervisor provisioning steps
   * Note: ensure initialConfigReported is false after deprovision, or tied to an apiEndpoint
   * Make target state tied to an apiEndpoint, and therefore null if apiEndpoint is gone
   * Andrei has OS image for testing, ping him

Should we consider fuzzy backoff (ie. some value between <min> and <max> seconds) timing in components to ensure that if a response does not occur (eg. from the API), then retries do not occur in a similar block of connectoins some ‘x’ seconds in the future (with the potential to continue an incident that might otherwise self-regulate if connections were attempted over a broader time period) cc hedss

* Backoffs in general seem a good idea, it’s the VPN/Delta/Supervisor components that make the state calls. VPN should actually be limited in workers, so it shouldn’t be making a huge difference
* Ongoing, I’ll look at the Supervisor as the priority and add backoffs in there, should make the most difference and give us some breathing room should a similar incident occur

Discuss using config vars to allow users to modify uEnv.txt and extlinux.conf cc pcarranzav chriswilkes

* To be added with the reconfix work mentioned above
* in the meantime, add a config var for CPU affinity to unblock 6river (discuss with CameronDiver)

Discuss method to inject device env vars on a file in the boot partition, that the supervisor would then post to the resin servers cc pcarranzav

* Bash environment file called resin-env-vars or something similar
* Supervisor reads file, sets env vars in resin API, deletes file
* Pablo to implement quickly for DT and others

### 10 May 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/35YREbR68awl_QeINpqKBMTohh4)
- [Meeting notes and recording](https://drive.google.com/drive/u/1/folders/1Mqsk-C1dOuP2O2qSAMOempMSRejqAHsT)

On etcherPro we need to allow the user to configure network via a UI. wifi-connect does not expose (afawk) APIs for interacting with NetworkManager, so we are currently about to start implementing a completely unrelated DBUS wrapper for NM. ( we also need to cover edge cases on ethernet like static IP configuration ). We need to understand if these NM APIs should be integrated on wifi-connect, whether the NM DBUS wrapper can be decoupled from wifi-connect as a stand-alone component we can use, or we need to start implementing all of this from scratch. 

* Integrate with WiFi Connect now, later with the future daemon that will handle those in the OS. Example Python web application that uses WiFi Connect's JSON API already exists - https://github.com/resin-io-projects/resin-wifi-connect-api. It can be used as a starting point for the etcherPro integration.

Discuss publishing resin-electronjs base images. resin-electronjs handles architecture-specific graphic libraries with branches and it's far from ideal. A better approach could be having a script that builds and pushes base images every time a new release happens. 

* Follow up with @nghiant2710 & @brownjohnf on base image building, @jviotti mentioned we might be able to automate this entirely through the Concourse CI pipeline to build the Docker base images
* Use Dockerfile.{arch|deviceType} format to consolidate arch- / deviceType-specific branches into master

Discuss whether we can/want to support custom logging drivers like AWS logging 

* https://github.com/resin-io/hq/issues/1315
* Petros could take a look at the size of the driver, but decision is we won't carry this forward because it would require restarting the balena daemon with env vars for AWS credentials.

Discuss bringing back the RESIN_SUPERVISOR_UPDATE_STRATEGY config var, which would override any update strategies set in docker-compose.yml labels? or act as default? useful for users with mixed-resinOS-version fleets, and users who want strategies without multicontainer.

* Config var will be a default (i.e. only affect services that don't have a label). This will be added to the composition in the device state endpoint. To be developed by @flesler

Discuss if we can mark reported timestamps in the Dashboard as “unknown”, “booting” (or something else) when devices get online but don't know the time yet 
* Problematic for devices with RTC. No real way to tell if time is accurate or not. So dropping.

Discussion on packaging Reconfix schema in ResinOS images during build process. 

* We need to discuss a proper way to split resinOS Reconfix schemas into what is device type specific and device type independent. This type of JSON Schema “inheritance” might be useful for Jellyfish as well, so it can yield very positive results if done right
* We need to then figure out what parts of the Reconfix schema will be part of meta-resin (the device-independent part) and what parts will belong to each device specific layer
* The combined Reconfix schemas will live in the resinOS images (in the boot partition along with the device type JSON file, etc). We should also host them online, so that if the client is connected to the internet, it can check if the online one is more up to date (we can start with just embedding it into the OS though)
* In order to get the schemas injected, we should look at how device-type.json files get converted from JavaScript to a JSON file in the boot partition and follow the same pattern. See this piece of code
   * https://github.com/resin-os/meta-resin/blob/master/meta-resin-common/classes/image-resin.bbclass#L52

Discuss EC2 instance reservation (production & staging) 

* Production: 3 c5.large (masters) + [4 c5.xlarge or m5.xlarge] (workers)
* Staging: 3 t2.small (masters) + [2 c5.large] (workers)
* Next steps
   * Partial upfront 1y option.
   * Confirm with @brownjohnf and @page-. Then reserve 3 c5.large + 4 c5.xlarge instances in Production account, and 3 t2.small + 2 c5.large instances in Staging account.

We want to be able to use etcher on resin images to burn attached block devices which contain resin images. How can we make sure boot doesn't break as the OS is relying on the filesystem labels and having multiple of the same value will result in race condition for udev? 

* Next steps
   * The plan is to store UUID at build time in the boot partition, let the OS generate new ones at first boot and use the for all the subsequent boot

### 08 May 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/LiQ3IuSV4zt07CAfAsoTVNd38Xi)
- [Meeting notes and recording](https://drive.google.com/drive/u/1/folders/1gzIpHfJhmSQF7HGJo8JPu6qLVnaQmCZQ)

Discuss the balenaFin device subtype cc @agherzan @imrehg @konmouz @floion @alisondavis17 @lucianbuzzo @thgreasi @zwalchuk @dimitrisnl

* We want to provision Fins in RPi3 applications
* We want the Fin app type in the “Create Application” list for visibility
* We want to provision RPi3s to Fin applications
* Option 1
   * In any application with app type X you should be able to add any device type with a compatible architecture
   * There is not reason not to be able to provision other RPi version on a Fin application
* Actions
   * Drop the `subtype_of` (https://github.com/resin-os/resin-raspberrypi/issues/197)
   * In the “Add Device” modal, allow choosing the device type. Show the app type + all the boards with a compatible architecture type. Default the selection on the application’s application type

Discuss how to handle delta auth now that we’re changing api keys to be stored in a hashed form. cc @afitzek @dfunckt

* We need the ability in the API to create scoped JWTs: https://github.com/resin-io/resin-api/issues/991
* This work will become part of the Hashed API Keys work
* Hashed API keys work is postponed in order to not block the new deltas
* We'll pick it up again in the future, after Andreas' work on Orgs

Discuss how the API should infer which UI url should be used for responses. cc @thgreasi

* We currently have a UI_HOST env var which is used for:
   * email content (eg: password reset)
   * SSO callback urls
   * will be needed on the U2F auth PR
* There is also the ADMIN_HOST which atm is only used to populate the respective field in /config.
* See: https://github.com/resin-io/resin-api/search?utf8=✓&q="env.UI_HOST"&type=
* Actions
   * TL;DR: No need for changes
   * Always have the master domain name (now resin, later belena) in the UI_HOST and keep things as is.
   * No need for whitelisting since we will redirect users to the new domains (UI, API, etc)
   * Hold U2F until we change domain name
      * So that registered keys do not suddenly stop working when we move to the balena domain
      * Since cross-domain multifacet is prohibited by the U2F spec

Discuss events & usage tracking approach for automated billing cc @pimterry

* Updating Recurly usage via a nightly job would work, but has some downsides
* Updating Recurly live (in hooks) is actually easier, we should do that:
   * On every change to a relevant resource, recalculate the usage (from scratch - e.g. count the current number of devices) and update it in our DB, and Recurly (if it’s changed)
* We’ll track historical usage numbers by tracking the events individually, as originally planned
* Event tracking should be based off the old spec for exactly this: https://github.com/resin-io/hq/pull/316/files
* Next steps
   * @pimterry to investigate the old historical events spec, and start implementing it

Discussion on packaging Reconfix schema in ResinOS images during build process. cc @abrodersen

* Spec: https://github.com/resin-io/hq/pull/1253
* Add reference support
* Determine whether the generic schema should reference device specific schemas or vise versa
* TBD with @jviotti and Alex during the next arch call

### 03 May 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/PDfDqJNWXF4z9L-2DkDQ6Qqoikc)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1qbuCRAOW7GHMIWKLWc7gG4DC4bBpsu0T)

Discuss db instance reservation. cc @mikesimos

* Next steps
   * Reserve db instance with the current size (m4.4xlarge) for a year with a partial upfront.
   * TODO: raise an arch item with recommendation for reserving ec2 instances as well.

Discuss ways to reduce S3 costs cc @mikesimos @CameronDiver @hedss

* Reduce traffic charges: Remove associated public IPs for img, registry/2, and delta instances.
* Reduce storage data (archive legacy/old images, maybe delete and rebuild on demand old user app images).
* As applications are deleted, we currently don’t delete their images.
* There are application images, that can’t be referenced from the API, yet persist in our registry
* Next steps
* Test removing the associated public IP from registry instances.
* No steps for data cleanup for the moment.


A customer wants to manage their configured NTP servers dynamically. Is there a way they can do that? What happens if their application stops our NTP server via dbus, and they just run their own inside the container? cc @agherzan

* See https://app.frontapp.com/open/cnv_rn7v3n
* Next steps
   * Do something similar to what we did with redsocks/hostname. Have an interface based on which supervisor will set NTP servers in config.json and restart “some services”. Expose this interface to the user application.
   * Issue: https://github.com/resin-io/resin-supervisor/issues/642
   * Other things to consider: https://github.com/resin-os/meta-resin/issues/1068

Discuss if there is a short term solution for udev cc @agherzan

* Net steps
   * To be brought offline with Petros for a long term solution but in the meanwhile, the intermediate solution is to recommend using sysfs.

Discuss infomoss devices with multiple partitions. Suggested solution: cc @imrehg

* adding new entries to config.json: a) how much the Data partition should be expanded to max; b) is there an extra partition?
* the expansion size in integer GB values, and cannot have lower than the default 1GB that the yocto output comes with
* these values are read on the first boot, and the data partition expanded (to all the space, or the max size), and an extra partition is added after resin-data. It's not formatted, etc.
* since some devices have different number of partitions (TX2, Edison), the user needs some way to know what's the device name of the patition they should manipulate (/dev/sda7? /dev/mmcblk0p10?), could expose that throught the supervisor creating an env var for the user containers with that value.
* Next steps
   * Add new entries to config.json:
   * Maximum expansion size of data partition is optional
   * There’s only one possible “max expansion” setting
   * For partitions provide size / type / name (label)
   * Type can be raw (then they are on their own finding it)
   * Check if gparted supports math grammar of `max-5G`, for example, when the user defines a 5GB partiton), or even in the case whenmultiple partitions defined
   * Work with the OS team on this
   * Specking (?)

Discuss GDPR compliance and providing an appropriate DPA (Data Processing Addendum) for resin customers cc @philipall @sonyagreen

* Next Steps
   * Sonya will start more research on GDPR requirements
   * Our plan is to figure out what the priorities of GDPR are, and focus on them first
   * The DPA is top of the list of questions

### 01 May 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/L1iLI3fu6ThftYS8xLpVO2VQqwZ)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1I_sWMiRMPWYCozw0zTqmTh6-Q7BKUz7T)

Including support for the fin in resin. Especially how to handle dt-blob file cc @agherzan @alisondavis17

* Ref.: We used to have copy operations in the past in image maker https://github.com/resin-os/resin-parallella/blob/master/parallella-hdmi-resin.coffeeL48 .
* We could deploy the dt-blob under a specific name and let image maker rename (copy) it when a certain UI element is set.
* Next steps
   * Requirement: We naeed to allow customers to add finds in the current rpi applications
   * DB: Remove constraint from the db for the apps (app slug doesn’t need to match the device slug)
   * OS: New device type for balena fin with subtype field (subtype_of = raspberrypi3) slug=fincm3 https://github.com/resin-os/resin-raspberrypi/issues/193
   * UI - when `add device` be able to select what device you want (application device type + everything in the descending tree)
   * Note: We can expand this subtype_of to additional device types in the future

Discuss having some kind of license key that expires for on-prem deployments cc @hedss @chrisrwilkes

* Pausing for a week for after Product call discussion.

Discuss SD card reliability and corruption troubleshooting. Should we look into filesystem metadata checksums? cc @agherzan @pcarranzav

* Previous arch call discussion: https://github.com/resin-io/hq/wiki/Architecture-Calls#17-apr-2018
* Next steps (by @imrehg)
   * Look at what are the system requirements for metadata checksums (kernel module)
   * Check whether we need to create new file systems or can we convert existing file systems too?
   * Enabling it would “create” more errors, that might prevent the system from running? (e.g. could an error be able to prevent systemd running if there’s a corruption in there that otherwise wouldn’t block stuff to operate to on some level) (e.g. rescue btrfs-corrupted devices) 
   * Do research and get back to the thread

How do we allow the usage of private base images in builds, assuming we have build time args and build time secrets cc @camerondiver

* Previous arch call discussion: https://github.com/resin-io/hq/wiki/Architecture-Calls#17-apr-2018
* Next steps
   * `./.resin/resin-registries.json` will have authentication data for registries
   * Secrets stored in `./.resin/secrets/`, as secret files, which will be mounted
   * The builder will pull Dockerfile base images explicitly

Discuss how/if the new env vars should have translations to the v3 env vars. Consumers of v3 API (eg sdk users) get confused when running operations on env vars which get reflected to the dashboard's service var pages. cc @thgreasi @afitzek (Andreas won't be around)

* 4-5 user requests on support
* Next steps
* Suggested approach
   * Should make the translations
      * read from both envvars & service envvars, overlaying the service envvars on top
      * When setting env vars, set the envvar and delete any existing service envvar with the same name
   * Users using MC features shouldn’t be able to downgrade to legacy/classic
   * Migrate service env vars of legacy, classic & essential apps to normal env vars (the new ones)
   * Hide the service env vars on the UI for legacy, classic & essential app types
   * Do the same for device env vars - device service env vars
* Deploying that isn’t trivial,
   * Release a UI version that
      * Hides service env var pages
      * Change the env var pages to also fetch and overlay the service envvars
   * Release the new API
   * Revert the UI changes (but still keep the service env var page hidden)
* Thodoris is leading both the API & UI

Discuss adding URL targets to the builder's supported build targets cc @camerondiver

* Next steps
   * Frozen, maybe will revisit

Admin user's named API keys don't have admin access (as opposed to the JWT tokens which do). Is that intended and the correct solution? cc @imrehg

* Next steps
   * It is intended at the moment, and while our API keys story is not perfect, any changes will have to wait.
   * Thus shelve it for the time being, will revisit this if it will be more pressing.

Garret at SGS has a question/complaint about our API cc @mccollam

* "We have code that moves a device from one application to another. If that device ID does not exist, then the API returns a 200 response with no body, so it looks like it succeeded. It would be very useful to return some error information (either via the HTTP error code or response body, I think in other cases you return 4xx codes)."
* Previous arch call discussion: https://github.com/resin-io/hq/wiki/Architecture-Calls#17-apr-2018
* Return 404 (or whatever the appropriate status is) if a user uses bracket notation on a device that does not exist
* Return number of rows affected for groups

Preben wants to store a certificate different per device on the device during manufacturing, where they do not have access to resin env vars. This file needs to survive under all circumstances (os updates, application updates, etc.), and needs to be accessible by the application.cc @mccollam

* Preben followed up mentioning that they'll use /boot partition to store secrets/data
   * https://app.frontapp.com/open/cnv_kp0ygp 
* Using the boot partition might break in the future, so they should not do this and there's no guarantee that files on the boot partition will persist across host OS updates
* Best option is to set env vars via the API (and we can build a sample project to show this -- @pcarranzav may be able to help here?)

### 17 Apr 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/KSmJV3AbCA1HgxkHIGofk4r3nKf)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1g9LUEFksldW8UKr4t0j_RhaCAi460F6Q)

WiFi Connect and multicontainer: WiFi Connect example start script starts the application after WiFi Connect has finished execution. With multicontainer the flow is parallel and we need a new example approach to this.

* The common usage with single container application was to start WiFi Connect first and after it has completed execution to start the user application. One possibility we discussed is extending the WiFi Connect API with a route exposing WiFi Connect’s state, but for now we won’t take action in this direction as alternatives exists. One alternative is if somebody needs to ensure Internet connectivity before running his application, he may query NetworkManager through D-Bus for this.
* Alex gave the idea of creating a minimal container from scratch that includes WiFi Connect and Dnsmasq, which will be uploaded on DockerHub for the different architectures we support. This will minimize greatly the size of the container that includes WiFi Connect. Zahari will work on implementing this.

How do we allow the usage of private base images in builds, assuming we have build time args and build time secrets

* We will specify a certain build secret/variable which defines authentication for any number of registries. We will then use this authentication to request a registry token for said registry and pull any base images using this token. (This will need to be done for base images and image: entries in the compose file)
* Next steps
   * Get Petros to look over the above
   * Research for google’s Kaniko engine handles this
   * Implement 

Discuss cancellation PR in the API and how it will mitigate

* https://www.flowdock.com/app/rulemotion/resin-devops/threads/-9CdYMXC1pwFPxhXdcyZDU8ecsM
* Cancellation will mitigate the issues caused by excessive requests coming in, but doesn’t address the underlying issues:
   * Why rate limiting didn’t kick in in this case
   * Why it’s possible to DOS the API while staying under the rate limit
* Next steps
   * Discuss next week in arch call with @petrosagg

Discuss SD card reliability and corruption troubleshooting. Should we look into filesystem metadata checksums?

* https://www.jeffgeerling.com/blog/2018/raspberry-pi-microsd-card-performance-comparison-2018
* https://news.ycombinator.com/item?id=16775768
* https://ext4.wiki.kernel.org/index.php/Ext4_Metadata_Checksums
* Not a mainstream project yet
* Next steps
   * We are interested in the solution, Andrei has looked into that a bit but we need more investigation. It’s something we would like to move forward. Will be discussed in the next arch.

Cust-arch: Garret at SGS has a question/complaint about our API
"We have code that moves a device from one application to another. If that device ID does not exist, then the API returns a 200 response with no body, so it looks like it succeeded. It would be very useful to return some error information (either via the HTTP error code or response body, I think in other cases you return 4xx codes)."
* It's not fully clear what response we should return when you request an action on a device that does not exist or you do not have permission to access (maybe see what OData says?)
* Might also want to return the number of devices affected
* Next steps
   * Revisit next week when @petrosagg is back
   * @Page- to do some investigation into how we should handle this (especially for UUIDs vs. IDs)

### 12 Apr 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/T-rak8dGtTefutgQVY_MiOcJ0b2)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1TAOwOUz873HB-q142ZDLC-ctoPiNCom-)

At least a couple of users have had issues with hanging/crashing/restarting problems on x86 chips that seem to be caused by power management issues - should we offer c-state modification in the supervisor/fix it in os images/have users handle it on a case-by-case basis?

* Actions/Next steps
   * Will add for all Intel NUC boards the grub.cfg parameter that will fix this (downside is that idle c-states won’t be possible anymore, resulting in slightly more power consumption)

Continue discussion about u-boot injection.

* Actions/Next steps
   * We will try 

Discuss builder resource limitation implementation. Proposal keep resource limits and decisions in the API, have builder query custom endpoint to obtain limits from the API for the build at hand. cc @afitzek

* Actions/Next steps
   * Get access to chartio
      * Get some metrics to determine free users build time
      * Percentiles for build times (how long is X to contain 50%, 80% or 90% of all builds)
      * Histogram for build times (how many builds finish within X)
      * Build times per free users
   * Create a custom endpoint in the API to hand out builder resource limits
   * Use these limits in the builder

Discuss how to support multiple domains on the API cc @brownjohnf @alisondavis17  @afitzek @wrboyce

* The context here is that we want to run resin under both resin.io and balena-cloud.com simultaneously. The first use case for this is making the branding migration. The second is enable white-labeling of the platform in the future.
* Actions/Next steps
   * Should accept multiple valid names
      * Need to identify specific error and send to page (@brownjohnf)
   * After API can accept multiple domains, we can switch the domain passed via etcd to the new one (balena-cloud.com)

How should we handle the license in meta-resin cc @agherzan

* Especially for
   * patches that we wrote
   * yocto recipes that we imported from upstream but we needed to have some modifications to make them compatible with multiple yocto versions
   * various configuration files (ex. dhclient.conf)
* As well, how do we handle upstreaming changes given that yocto uses MIT as license.
* Actions/Next steps
* We will add the apache boilerplate to all the bits in meta-resin we wrote from scratch
* Raise the issue for a process call

[cust-arch] discuss how to provision devices in china without ability to connect to the internet - Skycatch wants to provision and bring up devices at their factory in China, but knows they can’t connect because of the GFW

* Actions/Next steps
   * Propose test containers to Skycatch (so that they can test devices in the factory but then provision outside of the GFW) and see if this meets their use case

### 10 Apr 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/YPQC7OFrgEs4yBi_21JC0I7l4gX)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1pXs3JSSIK0guw_90Un1Xm6eFpy47DD1l)

Pick up “novpn” discussions and discuss approach for distributing resin with a vpn (or proxy?) component 

* Actions / Next steps
   * VPN to be released as part as open source solution (in its entirety?)
   * No resin-proxy in open source resin, ssh acheived by resin-cli and direct comms with vpn
   * “Jellyfish” to (eventually) replace actions service from resin-proxy (as standalone component)
   * Remove `tunnel-proxy` service from resin-proxy

Discuss methods of transferring secrets files to the builder, along with a tar file in the push endpoint 

* Actions / Next steps
  * Build secrets should not be able to reference arbitrary files on the file system, this is a massive security concern (for example “just pull my repo and push to resin”, all your private data can be stolen)
  * This means that we need the files to be with the build context so that we can “know” that the user wants them transferred
     * .resin/secrets/ ??
  * Build arguments can still be specified within the .resin.yml file and this will be sent along to the builder
  * All information flow will be sent within a tar archive, keeping the same interface as now, and the builder will extract the relevant entities.
  * Take the interface to a process call, as some things needs resolved.
  * In the meantime, focus on resin push just as a replacement for git push, if git push doesn’t support it, then neither does resin push (only for now of course).


Revise logs in the database plan

* Actions / Next steps
   * Petros wants to see the benchmarks with an added oData cache
   * Page will make a new version with the cache
   * Ariel will benchmark this new Pine version

Issue with the GE corporate proxy and getting resin.io to work through it. The customer expresses this as a dealbreaker, and I'd be prepared to believe them. I think it needs prompt and expert attention - https://www.flowdock.com/app/rulemotion/public-s-premium/threads/S1-QKBdZQ8rn0oiaFETeWvxFdao

* SOCKS proxies DNS as well as data, http-proxy does not proxy DNS (which customer required)
* @agherzan to try out configuration as outlined in thread, create product issue/OS issue

Need a unified API (using reconfix) to manage network settings, configuration on resin-managed devices (which WiFi Connect can then talk to) - https://www.flowdock.com/app/rulemotion/public-s-premium/threads/S1-QKBdZQ8rn0oiaFETeWvxFdao 

* @majorz to look at this once his current work winds down

### 05 Apr 2018

- [Flowdock thread]()
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1RthLxi_qQIM54phhwTT4cOeFOt6vtOVE)

### 03 Apr 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/nqL320ninzGboqHYO2QtikXDB8N)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/192y1zHoYbwwZXpJJmxl06QeOeSxXwcR7)


### 22 Mar 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/BXH5NzWL6zYhsh04pC4TUiiCOWD)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1gAB5cz5X-IucesqdLSvt4omKOXNofYP7)

### 20 Mar 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/YQFaZ86xMpK3dCG1akKhrsk2ggP)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1uzuS35Tawaqh9gwV4_PSUCKgy0vu6sYD)

Discuss the future of devenv with regard to kubernetes migration. There are a few options to consider: a) Move to minikube + ingress/haproxy. b) maintain a fully functional minikube devenv in parallel. c) Minikube Hybrid environment (using haproxy for proxying some service/services to minikube). 

* Actions
   * We are fine to put on-prem on a minikube - needs investigation
   * Once we have this working to minikube we’ll deploy in staging and then production

WiFi Connect: continue the discussion about allowing applications to take advantage of the access point WiFi Connect provides. Possibly splitting the UI and the JSON API on separate ports: 80 and another one + ability to turn off the UI on port 80. 

* Actions
   * Add a CLI argument for changing the listen port of WiFi Connect. For now we will NOT split the UI and the JSON API into different services.

Discuss whether it makes sense to add a RESIN_SUPERVISOR_LOCK config var for users to lock updates on a device manually (only advantage over pinned release: prevents updates when an env var changes) cc @pcarranzav

* Actions
   * We should tell the user that they can use either pinned releases or update lock

Discuss what will happen with dependent devices / proxyvisor now that multicontainer is out (we still have the WIP PR that Joe left 

* Actions
   * No immediate actions
   * Currently Pablo is the spec owner, but it needs reprioritization. 

Log retention based on permissions 

* Actions
   * We’ll use a cache layer (memoizee module)

Discuss custom device-trees for device-types. The TX2 in particular. cc @telphan

* Actions
   * Theodor will draft a spec

Decide what we will call balena engine executable 

* Actions
   * The name we’ll use is balenadctl

Discuss supporting the following scenario: A fleet of devices, each with a pinned release A. A default fleet release of B. A new device preloaded with release C, but not yet provisioned. When the new device comes online, it should continue to run release C, regardless of what the default fleet release is or becomes set to. At such a time when the device receives a new pinned version, it should then (and only then) update to that new pinned version. 

* Actions
   * Give device permission to enable “should be running release” on provisioning (needs api permission), then have supervisor support that

### 14 Mar 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/elLTlLOrNlFWsKYnyktoyt4756g)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/13b-r3KDd2U3t1PPIGUsW-5Lh5-a-tuig)

WiFi Connect: user wants to access his web application even without network connectivity through the access point network WiFi Connect creates. cc @majorz

   * A possible easy to implement solution only needs configuring the listening port of WiFi Connect.
   * Then both WiFi Connect and web application can be put behind a reverse proxy like nginx.
* Alex: why don’t we break out captive portal or AP mode implementation from wifi-connect? (besides the question above)
* Approach to take
   * Wifi connect stays on the same port, but user can specify another port / full IP / container hostname, and wifi-connect checks that, if anything there, use that for UI
   * @majorz will explore this options

Discuss shortcoming of Etcher's multi-write performance, and potential remedies cc @jhermsmeier

* Switched to a faster hash (md5)
* The fastest hash us SHA512 on these boards, as they have instructions in the CPU for that - check if UP^2 has that?
* Another change: on write stream reduced the number of validation hashes (from n where n is the number of write streams). What speeds we have with all parallel when reading?
* In testing seen 350MB/s on 16 streams (Jonas)
* Testing with i5 NUC
* Hashing is not getting the max performace, still there’s some bottleneck
* Found that used “o_sync” flag to try to bypass the cache but didn’t quite work as as was assumed. Now it’s removed, everything is faster. NUC: 600MB/s - but that’s going through the cache, so not actually meaningful test.
* Now testing direct i/o (o_direct) - pending to do; expectation is that there’s no difference compared to o_sync.
* The CPU is ~20% in the 350MB/s case. Have to check whether this is because of single-core performance?
* Alex got 420-450MB/s on his test with dd
* dd seems to be able to do 600MB/s. Has to verify it, whether we can do it with no checksumming, no validation? 
* List of experiments:
   * Verify that can 600MB/s without the o_direct flag, just fsync (called o_sync here)
   * If that’s true, then do that in nodejs, since that’s easier than o_direct which needs
   * If no (o_direct needed):
      * Nodejs use it without checksum
      * Nodejs use it with checksum
   * Main focus goal: nodejs hit dd speed without checksum + investigating where our real bottlenecks are (all the whys)
* Also, always use the o_sync flag, together with o_direct to be on the safe side (or be absolutely sure that not both needed)

Discuss update locks for resinHUP cc @imrehg

* One option: behaviour as the application lock check
* We should check for the lock and grab them. If they are locked, then bail out.
* Multiple tries and bail out (timeout, 5mins)

Discuss exposing resinHUP through the API cc @imrehg

* Is the HUP action long lived?
   * Long lived ones are trouble if we go through the API
* Add support in the CLI using the action server. The interface is the CLI

Discuss where the configure endpoint from the os unification spec should get its data from (env vars, db, elsewhere?) cc @thgreasi @agherzan

* See: https://github.com/resin-io/hq/pull/1077/files
* * It needs dropbear:
   * key
* It needs Openvpn
   * up/down script
   * Certificate
   * Configuration
* https://github.com/resin-io/hq/pull/1077/files#diff-23cf838503f4ed6a155f7497a5ee6a89R146 this files ^^
* Rename dropbear to SSH
* Current idea: 5 env vars
* The API aggregates these into a json with a specific schema
* Idea: using some of these env vars in our current service; to stop having a hard-coded openvpn configuration; coordinate with @thgreasi & @wrboyce
* Start a project: improve vpn servers - what else can we do with openVPN, and uninterrupted service, 
* Seems like up/down scripts don’t belong to the OS side only, not to configuration. 
* Actions TL;DR
   * The configuration options will be made available to the API through env vars/etcd
   * Rename dropbear property to ssh to make it less specific
   * Drop the up & down scripts from the API json result

Managed unmanaged unification: users seem to find supervisor as an intrusive component. Cc @agherzan

* “We consider the supervisor an integral part of the system”
* We are going to implement a recipe that prepares the data disk and have recipes that add images to the data and other metadata to rootfs

Cust-arch (@mccollam)

* Customer (Biobright) asking for full this encryption
* Current proposal: encrypt a file as file system on /data, and decrypt it with some supplied key on an USB disk or something like that
* TPM is on the roadmap
* Also other customers asking as well (AD-Link)

### 08 Mar 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/AmlKxc4zg7K-HyCY3WBeIx0sAna)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1f6-RwjVzKxDK-xrYoTjA6RgPcH6xSDqs)

### 06 Mar 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/n5E4EL6lzQtXoBrcCqWuRYF_4Nq)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1_r8LSglsmHr6SoieBPGUn-LdS3izpTyX)

Discuss admin panel access 

* In response to incident where we deleted all applications
* Review admin access
* Actions cc @afitzek
   * Change admin permissions to be read only
   * Use ‘canaccess’ endpoint in API
   * Andreas to review users that need admin write access

Discuss introducing rudimentary intrusion detection/prevention in our infrastructure (e.g. fail2ban?) 

* [Logentries query for last 30 days in git ssh](https://logentries.com/app/5915e005/search/log/b4bfc9dd?log_q=where(%2FNew TCP connection from (%3FP<ip>.%2B…) groupby(ip)&f=1519911925000&t=1520257525000)
* ~250k connections from the 218.60.30.* ip range during the past month
* Memory leak patterns observed in VPN and Git servers
* Git bomb: 
* Actions - @wrboyce 
   * Investigate memory leaks
      * In VPN and Git
   * Git bomb protection
      * We could add disk quotas
   * Look into installing fail2ban

Switching from etcd to envvars for confd configuration of resin components in k8s, requires some changes in confd TOML and template files of each component. Discuss about the transition plan 

* Two options
   * Only env var templates
   * Use two env templates
      * End state is cleaner, we should move forward with that
* Actions
   * Modify resin-base so confd allows you to toggle env var and etcd vars
   * Per component, copy templates that use env var / etcd compatible templates
   * Remove etcd ones when we’re done

Should WiFi Connect wait forever after somebody connects to the captive portal or exit if no activity occurs after a user connects to the captive portal? 

* “WiFi Connect has an `--activity-timeout`/`$ACTIVITY_TIMEOUT` configuration option. Currently the the application will exit if nobody connects to the captive portal for a given time (e.g. 600 for ten minutes). A user got confused, because he connected to the captive portal, but then abandoned it, and expected WiFi Connect to exit after 10 minutes. Given that this option is set, should WiFi Connect wait forever after somebody connects to the captive portal or exit if no activity occurs after a user connects to the captive portal?”
* Actions
   * It should exit
Discuss reoccurring WiFi Connect request: add support for authenticating to networks with a captive portal.
* Currently the the application will exit if nobody connects to the captive portal for a given time (e.g. 600 for ten minutes).
* A user got confused, because he connected to the captive portal, but then abandoned it, and expected WiFi Connect to exit after 10 minutes.
* https://wiki.archlinux.org/index.php/software_access_point#Wireless_client_and_software_AP_with_a_single_Wi-Fi_device 

Discuss what is blocking us offering both "installer" and "raw" OS images on the dashboard. 

* No device blockers, ui/dashboard planning needed
* TBD in product call

Discuss about deprecating the Odroid C1 cc @floion

* We’ll not deprecate it

Discussed adding custom uEnv/uboot configuration for the TX2 which will enable 6river


Discuss moving forward with self-service troubleshooting actions that are now possible through hostOS access.

* Example: users can technically update their supervisor, but should not, because of possible incompatibilities in the future (e.g. if they update to MC supervisor versions
* Could be discussed in a product call first
* If we gave users guidance to do troubleshoot themselves we’d lose insight from support
* Actions
   * Look into scratchpad, find items that could be safe
      * E.g. dmesg, or reading data from the container
   * Prioritise fixing bugs from our side, keep an eye on how many times agents had to intervene with console access. Automating troubleshooting user actions are not a priority atm 
   * Look into keeping terminal logs which can also be used as audit log

Discuss triggering updates from local paths 

* Example: user can insert a USB stick and trigger the supervisor to apply an update from a path on the stick
* Example: a device with limited two-way connectivity but that can receive satellite broadcasts could receive an update via satellite and store it in /data, then tell the supervisor to apply the update
* They want to short circuit the download process but have anything else work through resin
* Could we have a registry container in the MC world to use as the app registry?
   * Circular problems (update registry with registry)
* This is something @afitzek will likely lead, when it gets prioritised

### 22 Feb 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/RMYGDRbZrRB-GIKP6vU8unl0kua)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1JLE99W4g_h_Ia19tIxi0_bduLMQh8PTr)

Discuss batch requests and hooks integration. 

* Issue: In pine, in many places mainly in the hooks, we have two notions of what is request
   * Our own request object with odata
   * Express request
* With patch you can have an external request turning into multiple internal requests
* In some hooks information is accessed on expres request, other times access as internal request
* In the translation, we have to inspect the resource and the use that to do other requests
* Actions
   * Translations need to be in pine

Discuss device ownership, and what should happen/how to avoid the case when you have a device with an owner who can't see its application. 

* When you’re a collaborator and provision a device in app you don’t own, that device should not have you as an owner. The device should always be owned by the user that owns the app
   * What about moving devices?
* There are devices that are owned by different people than the people who own the apps
* If you have device access you should have read-only access to the app that owns the device
* Currently devices are owned by the image downloader
* Should devices be owned by the application (as opposed to the app owner)
   * The app is an actor
   * The user has practical ownership of the device because they own the app
   * Suggestion: If you have a null user of the device and inherit from the application 
   * Conceptual model: device owned by actor
* Action
   * Migration: reset device ownership
      * Nullify all the owners
   * Set user to ‘nothing’, inherit ownership status from app owner
   * Add perms so that you can have access to the device if you own the application and the device does not have an owner
   * Config.json user property will be ignored
      * Breaking API change, possible that things will break (even user code) that depend on confg.json ‘user’ property
   * We can use translations for the old API endpoints

How should we model billing addons (extra devices/collaborators above plan base) in our DB? 

* Moving forward
   * Every instantiation of the plan
   * We already have a discount, maybe we need to add some tweaking to the discount
   * Need initial discount and final discount and when the discount ends (which is different when the plan ends)

Can we enable the --experimental flag on bluez to allow ElectronRX to use BLE devices that require it? 

* Actions
   * We will do it

Discussed Deltas v3

### 20 Feb 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/kRUWSkfEgT82012KCmk_a3131Qc)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1cCzoRKn3n_TBBOU_G7xxNU8CL1hrgHrD)

Clear up confusion about Proxy/VPN and Open Source Resin cc @dfunckt @wrboyce

* See https://www.flowdock.com/app/rulemotion/p-opensource/threads/kiWq3Fw_vqV31rpRecnKpEFUANR for detailed points
* OSR will work with local devices via "NoVPN" service
* we need however to authenticate that we're communicating with the actual device
* Actions:
   * Akis will discuss with Will how this will work

Discuss way forward with regards to deltas v3 and the fact that pine doesn’t support the rule we need to have to determine staleness cc @dfunckt

* add SQL constraint that rounds down "update timestamp"
* delta will send heartbeat every 10 minutes
* stale is defined as: 20 minutes of inactivity
* Actions:
   * Akis will open pine issue regarding duration in rules


The files in the image-maker S3 bucket have strange permissions when accessed through https://resin-production-img-cloudformation.s3.amazonaws.com/Key , on the first 1000 files 415 are accessible, 71 return a 403 and 514 return a 404. cc @zvin @abrodersen @jviotti

* The 404 were due to not url encoding the + in the urls
* The 403s are fixed in production


Discuss kubernetes cluster spec cc @mikesimos @brownjohnf

* Spec: https://github.com/resin-io/hq/pull/1207
   * Is there an alternative approach to flannel/user space overlay networks?
   * IPv6 is currently not a requirement. (rely on client network DNS64/NAT64)
* Next steps:
   * Sort out overlay networking alternatives
   * Deploy staging cluster
   * Deploy resin.io in staging custer (Coordinate on the changes required)
   * Deploy prod cluster

Talk about the TX2 flashing cc @telphan

- Discussed and Fixed

Discuss MC guards so that legacy devices don't try run compose projects

- Discussed (also see https://www.flowdock.com/app/rulemotion/p-multicontainer/threads/8JG1XTWMl99rtwAXLAcXUxs0_oY)

### 15 Feb 2018

- [Flowdock thread](https://www.flowdock.com/app/rulemotion/r-architecture/threads/e9f0QcW3iafcCR0HozVEtytiAnv)
- [Meeting notes and recording](https://drive.google.com/drive/u/2/folders/1JLE99W4g_h_Ia19tIxi0_bduLMQh8PTr)

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
* We a