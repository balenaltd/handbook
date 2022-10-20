# Glossary

The glossary is a quick reference tool for important terms, concepts and phrasing used at balena. This includes both balena-specific and general terminology that's commonly used in and across balena.

:::note

Is there a word or term that's missing? Does a definition need reworking or further clarity? Additions and improvements to the glossary are encouraged! You can either add these yourself **(make sure an entry is comprised of the word / acronym or phrase, whether it's a balena specific term or not, brief description and (when possible) a link to further reading / single source of truth for that definition)** or create a github issue in the handbook repo.

:::

## A

### Application
A computer software program (written in code) that performs a specific task or function.

### Application Programming Interface aka. API
'A software intermediary that allows two applications to talk to each other.'

### Aspect / Aspect Group 
**(balena specific term)**
An 'aspect' of balena that straddles multiple loops and areas e.g. architecture. Architecture exists in many forms across balena, so we have a group of people that have context and experience in architecture across different loops and areas, that can help unify the best approach for everything related to that aspect. Aspect groups are about knowing who to go to to get advice around an aspect of a loop, not who to delegate / handover a task to.

### Assume Positive Intent
As we're a remote first company that communicates asynchronously across keyboards and screen the majority of the time, social cues, context and body language aren't present to help with understanding each other. We try to stick to 'assume positive intent' when trying to understand how we're communicating with each other. E.g. not using an emoji doesn't mean they're annoyed at you.

### Avahi
A system allowing device/service discovery on a local network via the mDNS protocol.  Supports device discovery with the `balena scan` command.
[more](https://www.avahi.org/)

### AUFS
A union filesystem (allows files and directories of separate file systems to be transparently overlaid forming a single coherent file system). The aufs storage driver is used by balenaEngine, but will be replaced by Overlay2 in the future.
[more](https://en.wikipedia.org/wiki/Aufs)

### AWS
[Amazon web services](https://aws.amazon.com/) 'provides on-demand cloud computing platforms and APIs'

## B

### balena Blocks 
**(balena specific term)**
Pre-built containers providing functionality to applications. Dropped into a fleet docker-compose to provide that function. For instance the browser block provides a Chromium instance.
[more](https://github.com/balenablocks/blocks)

### balena CI 
**(balena specific term)**
balena continuous integration system. This is in the process of being deprecated and is being replaced with Flowzone.
[more](https://github.com/balena-ci)

### balena CLI 
**(balena specific term)**
The Command Line Interface for interacting with balenaCloud, openBalena and local balenaOS devices.
[more](https://www.balena.io/docs/reference/balena-cli/)

### balenaCloud
**(balena specific term)**
Device deployment and management infrastructure, hosted by balena.
[more](https://www.balena.io/cloud/)

### balenaEngine
**(balena specific term)**
Balena's fork of Docker, offering a range of added features including real delta downloads, minimal disk writes (for improved media wear) and other benefits for edge devices, in a small resource footprint.
[more](https://www.balena.io/engine/docs/)

### balenaFin
**(balena specific term)**
A single board computer developed by balena with field deployment in mind. It is a carrier board for the Raspberry Compute Module 3 and 3+ Lite (CM3L/CM3+L), that can run all the software that the Raspberry Pi can run, hardened for field deployment use cases.
[more](https://www.balena.io/fin/1.1/docs/)

### balenaHub
**(balena specific term)**
A marketplace that enables the exchange of resources between our users. At a higher-level, the goal of hub is to lower the barrier to entry within the IoT industry.
[more](https://hub.balena.io/what-is-balenahub)

### balenaLabs
**(balena specific term)**
A loop within balena that encompasses Labs, outreach
[more](../docs/balenalabs/README.md)

### balenaMachine
**(balena specific term)**
On-premises fleet management, delivered as a single virtual machine that includes all core balenaCloud services.
[more](https://docs.google.com/document/d/1WHT9RnX9h1GsMWZUhVk5GxEBghUbjTdyu4ivc0xSPmk/edit?usp=sharing)

### balenaOS
**(balena specific term)**
An operating system optimized for running Docker containers on embedded devices, with an emphasis on reliability over long periods of operation. Based on Yocto.
[more](https://www.balena.io/docs/reference/OS/overview/)

### balenaOS image
**(balena specific term)**
A versioned build of the host OS, specific to an fleet and device type.

### balena-proxy
**(balena specific term)**
A reverse proxy that handles requests made to Public Device URLs by passing them to the actual devices through a CONNECT-type proxy. The latter proxy resides on the VPN server and acts as a tunnel. 
[more](https://github.com/balena-io/balena-proxy)

### balenaSDK
**(balena specific term)**
Balena’s Software Development Kit, allowing users to create software that can interact with balenaCloud via the balenaAPI.  Available for node.js and python.
[more](https://www.balena.io/docs/reference/sdk/node-sdk/)

### balena-on-balena (aka.BoB)
**(balena specific term)**
Balena’s developer environment, which is a device run on and managed by balenaCloud that runs a local instance of balena.
[more](https://github.com/balena-io/balena-cloud)

### balenista(s)
**(balena specific term)**
One or more balena team member

### barys
A wrapper around Poky's environment setup scripts used to initialize build directories
[see *Yocto*](#yocto)

### base image
A specific combination of a Linux distribution and additional packages (a docker image), used as the base operating environment for a service.

### Beast, the
**(balena specific term)**
An unholy cluster of 144 RaspberryPi’s running balenaOS and weighing in at 150Kg.
[more](https://www.balena.io/blog/the-evolution-of-the-beast-continues/)

### bitbake
Fundamentally, BitBake is a generic task execution engine that allows shell and Python tasks to be run efficiently and in parallel while working within complex inter-task dependency constraints. One of BitBake's main users, OpenEmbedded, takes this core and builds embedded Linux software stacks using a task-oriented approach.
[see *Yocto*](#yocto)

### Block
A section of code or programming that is grouped together and can consist of one or more statements or declarations.

## C

### Chesterton's Fence
'The principle that reforms should not be made until the reasoning behind the existing state of affairs is understood.' or if you don't understand why something has been done the way it has / why it's there, don't scrap or change it until you understand the reasoning first. 
[more](https://fs.blog/chestertons-fence/)

### CLI
Command Line Interface 'is a text-based user interface (UI) used to run programs, manage computer files and interact with the computer.'
[see *balenaCLI*](#balena-cli)

### Cloudlink
**(balena specific term)**
Previously called balenaVPN, this is the connection that allows balena to have a secure tunnel to the device. Cloudlink uses openVPN as an underlying technology to enable features like [SSH access](https://www.balena.io/docs/learn/develop/local-mode/#ssh-into-the-running-app-container-or-host-os), the [public device URL](https://www.balena.io/docs/learn/manage/actions/#enable-public-device-url), and the [web terminal](https://www.balena.io/docs/learn/manage/ssh-access/#using-the-dashboard-web-terminal) in balenaCloud.

### companyOS
**(balena specific term)**
The loop that manages balena’s legal, financial and corporate architecture and provides it as a service to the rest of the business.

### config.json
**(configuration files are not unique to balena, but in this instance it's a reference specific to balena)**
'The main configuration file'. A file located on the boot partition of balenaOS devices, which can be used to modify the behaviour of the OS. 
[more](https://www.balena.io/docs/reference/OS/configuration/)

### Container (docker)
'a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.'
[more](https://www.docker.com/resources/what-container/)

### Cuelang
An open source language, with a rich set of APIs and tooling, for defining, generating, and validating all kinds of data.  It has lots of [use cases](https://cuelang.org/docs/usecases/) including validating JSON objects using defined schemas and constraints.

### Customer Success aka. CS
**(balena specific term)**
The loop / group of team members that act as account managers / interface with our customers and clients.

## D

### D-Bus
a software bus, inter-process communication, and remote procedure call mechanism that allows communication between multiple processes running on the same machine.
[more](https://en.wikipedia.org/wiki/D-Bus)

### delta server (balena architecture)
Generates a delta between two images.  The delta can then be downloaded by the supervisor to update the application image in the device.

### Device (balena)
**(Devices are not unique to balena, but in this instance it's a reference specific to balena)**
An internet-connected, single-board computer running balenaOS and provisioned with the balena platform.

### Device supervisor
**(balena specific term)**
Balena's agent on the device, responsible for managing fleet updates and reporting device status.

### Devices proxy
[see *balena-proxy*](#balena-proxy)

### Docker
[Docker](https://www.docker.com/) is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers. [Containers](#container-docker) are isolated from one another and bundle their own software, libraries and configuration files.

### Docker image
'A file used to execute code in a Docker container.'

### Downstream
A term to describe the source of something relative to another.

### Deploy with balena aka. DWB
The ‘Deploy with balena’ button is a feature that allows balenaCloud users to create, and push code to an application, in just a few clicks. It’s an alternative deployment method that provides a shortcut so users don’t have to clone or download code and manually add it to their application. It is as much a feature for project builders as it is for project owners, who can enable others to build their projects by adding a single line of code in their readme, or any other web page, and it will link to their own github repo.
[more](https://www.balena.io/blog/deploy-with-balena-makes-it-easier-to-deploy-and-share-iot-apps/)

## E

### Edge (computing)
'a distributed computing paradigm that brings computation and data storage closer to the sources of data.' 
[more](https://www.iiconsortium.org/pdf/Introduction_to_Edge_Computing_in_IIoT_2018-06-18.pdf)

### Etcher
**(balena specific term)**
[A balena product (software).](https://www.balena.io/etcher/) A 'swiss army knife' for getting your software onto a device. Flashes disk images (such as balenaOS) on storage devices like SD cards and validates flash integrity.

### Etcher Pro aka. EP
**(balena specific term)**
[A balena product (software and hardware).](https://www.balena.io/etcher/) A device running Etcher. Can flash 16 devices simultaneously.

### Etcher Featured Project aka. EFP
**(balena specific term)**
The example project that we promote within the etcher app. This changes regularly and the objective of showing this project is to encourage etcher users to discover balenaCloud and follow a tutorial to build a project 

## F

### Feedback Loop
'The part of a system in which some portion (or all) of the system's output is used as input for future operations. Each feedback loop has a minimum of four stages. During the first stage, input is created. During the second stage, input is captured and stored. During the third stage, input is analyzed and during the fourth stage, the insight gained from analysis is used to make decisions.' Feedback loops are a core to the way we work at balena as they are fundamental to systems design. 

### Fleet
A group of devices sharing the same releases, variables, configuration, settings and members.

### Fin
[see *balenaFin*](#balenafin)

### Fog
The term “fog” attempts to categorize network+compute architectures which flatten in order to distribute computing, storage, and networking closer to end users and sensors. While the term “edge computing / nodes” can often be used in these scenarios, not all “edge compute” can be described by fog terminology, because fog requires the inclusion of network components, and not all edge compute models are network (IP) connected. 
[more](https://www.w3.org/2017/05/wot-f2f/slides/OpenFog-Overview-W3C-Open-Day-in-May-2017.pdf)

## G

### Git
A command line tool. An open source distributed code management and version control system.
[more](https://git-scm.com/)

### Github
'A [code hosting platform](https://github.com/) for version control and collaboration.'

### Git server (balena architecture)
**(Git servers are not unique to balena, but in this instance it's a reference specific to balena)**
The balenaCloud-hosted git servers that users may do a “git push” to in order to build their application.  This is more of a legacy feature since we recommend users to do a “balena push” that sends their code directly to the builders.  This is ephemeral and we do not commit to the users any level of persistence for their code.  Users should not use this as a source of truth for their version control system.

## H

### Hardware on demand aka. HOD
Pre-assembled device including customer-specific branding/packaging, pre-configured for use with balenaOS, pre-installed with user software. Essentially, plug and play hardware for customers, provided by balena.

### Hardware Hacker in Residence aka. HHR
A balena job title for [balenistas](#balenistas) that occupied Labs and built cool projects to market and showcase the capabilities of balena. 

### hostapp
A docker image that contains the root filesystem for a device.

### hostapp extension
A docker image that is overlaid over a hostapp to add extra content and functionality

### Host os UPdater aka. HUP
Tool for balena host OS updates. It downloads an update bundle that replaces the BalenaOS for a Balena device, updating both the boot partition and the rootfs (using an inactive rootfs partition).
[more](https://github.com/balena-os/balenahup)

## I

### Internet of Things aka. IOT
The interconnection via the internet of computing devices embedded in everyday objects (e.g. vechicles, thermostats, roofs, lighting, plant electronic systems. etc), enabling them to send and receive data.

### Image maker (balena architecture)
**(Image makers are not unique to balena, but in this instance it's a reference specific to balena)**
Modifies a stock balenaOS image and embeds information needed to map the OS image to an application running on balenaCloud.  The image maker is also used to embed WIFI network connection details into the image.

## J

### Jellyfish aka. JF
**(balena specific term)**
A balena product. Jellyfish is a social knowledge database that the team uses to collaborate. Jellyfish gathers all information company wide and makes it a platform to implement processes that enhance the team's productivity and understanding.
[more](./how-we-work/README.md)

## K

### Katapult
A tool for launching environment variants on different modes and targets, based on kompose format files.
[more](https://github.com/product-os/katapult)

### Kubernetes
Kubernetes (K8s) is a system for automating deployment, scaling, and management of containerized applications.  Used by the balenaCloud backend for scaling.
[more](https://kubernetes.io/)

## L

### Leadership Group
The new name of the Maintainers or Mission Team at balena. This is comprised of a group of individuals trusted to lead the team strategy and vision of balena (Chris, Konstantinos and Phil.)

### Loki
Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by Prometheus. Used by balenaCloud to store customer device logs. Used by productOS to store internal logs.
[more](https://github.com/grafana/loki)

### Loop (balena)
**(balena specific team)**
[See *Feedback Loop*](#feedback-loop). At balena, we structure our team as a collection of feedback loops. What we often call "the loop" is our framework for continuously improving products. We also define specific loops at balena that focus on building products for a particular user. Each of these loops puts "the loop" framework into practice to build a product for its users. For example, the teamOS loop uses "the loop" to build and improve the user experience for balena team members. The balena.io product loop uses "the loop" to build and improve the user experience for balena users. etc

## M

### Maintainers or Mission team aka. M-Team
The former name of the [Leadership Group](#leadership-group) at balena.

### MVP
Minimum Viable Product, an initial or simple implementation of a product or feature.

## N

### NUC
A range of small form factor PCs from Intel.
[more](https://en.wikipedia.org/wiki/Next_Unit_of_Computing)

## O

### openBalena
**(balena specific term)**
[A balena product.](https://www.balena.io/open/) The open source offering of balena’s platform. Devices run balenaOS and are managed via the balena CLI. openBalena does not include the dashboard.

### Organisation (balena)
**(balena specific term)**
A group of members, teams, and fleets that is managed by one or more organization administrators.
[more](https://www.balena.io/docs/learn/manage/organizations/)

## P

### Pants project
**(balena specific term)**
A fully HR compliant code name by the hardware team. It's essentially a new [Fin](#balenafin) but instead of using a compute module it accepts a single board computer (rpi 4 for instance) and extends its capabilities.

### Pattern
**(balena specific term)**
A pattern (or symptom) of behaviour that we've observed, that we feedback into the [loops](#loop-balena). Patterns are observations rather than solutions - For example 'Customer wants the ability to filter device type' is a pattern, as opposed to 'create device filter'. As a pattern receives higher weighting (so, for example, we see more customers experiencing a similar issue or point of friction), or higher urgency signals, its relative importance is raised so that the loop team can see it emerge.

### Pine.js
**(balena specific term)**
Pine.js is a sophisticated rules-driven API engine that enables you to define rules in a structured subset of English. Those rules are used in order for Pine.js to generate a database schema and the associated OData API. This makes it very easy to rapidly create, update and maintain a backend while keeping the logic in an easily understood form, as well as providing the ability to update and maintain this logic going forward.
[more](https://github.com/balena-io/pinejs)

### Pull request aka. PR
'also referred to as a merge request – is an event that takes place in software development when a contributor/developer is ready to begin the process of merging new code changes with the main project repository.'

### productOS
**(balena specific term)**
A loop within balena and aka. [Jellyfish](../docs/how-we-work/README.md). The intention of productOS is to create products that can be used by teams to develop and maintain products.

### Prometheus
Metrics / alerting framework - used by [balena-monitor](https://github.com/balena-io/balena-monitor)
[more](https://prometheus.io/)

### Provisioning (balena)
**(Provisioning is not unique to balena, but in this instance it's a reference specific to balena)**
The process of adding a new device to a balena application.  This involves booting the device with a balenaOS image which has had the application’s provisioning key embedded (e.g. by flashing an SD card and booting from that).
[more](https://www.balena.io/docs/learn/welcome/primer/#device-provisioning)

## Q

## R

### Radical Candor
[A term coined by Kim Scott in her book by the same name](https://www.radicalcandor.com/). It means to describe caring personally while challenging directly. It's something we refer to alot at balena in how we communicate with each other - another term used is 'friends don't let friends be wrong'. 

### Release (balena)
**(Releases are not unique to balena, but in this instance it's a reference specific to balena)**
A snapshot of code collected into one or more [Docker images](#docker-image).

### Resin
The former name for Balena, changed late 2018.

### Rulemotion
The former name for Resin.

## S

### SBVR
SBVR provides a way to capture specifications in natural language and represent them in formal logic, so they can be machine processed. [See *Pine.js*](#pinejs)

### Semantic versioning aka. Semver
A version number given to a new release. Versions are broken into MAJOR.MINOR.PATCH - depending on which number is changed, conveys what type of change has been made to the code between versions. For example if you are running version 2.0.0, a new version with the number 2.1.0 would signify a minor change has been made.
[more](https://semver.org/)

### Service (balena)
**(Services are not unique to balena, but in this instance it's a reference specific to balena)**
An independently deployable component of an application, packaged into a Docker image and run as a container.

### Service (systemd)
A process running on a linux host managed by systemd init system. [Systemd docs for “service”](https://freedesktop.org/software/systemd/man/systemd.service.html)

### Slug
'A human-readable, unique identifier'

### Snapback
**(balena specific term)**
When a JellyFish support ticket “snaps back” from Closed state to Open state and reappears in the queue. This action is driven by linking a GitHub issue in the relevant repository to a ticket. When the issue is closed, the snapback is triggered. A support agent then sees the ticket, and can send a message to the affected user to let them know the issue is resolved. Snapback often is used to notify of a requested OS release.

### Social sign-on aka. SSO
Using a social media account to sign up for a platform

### Supervisor aka. SV
**(balena specific term)**
Balena's on-device agent, responsible for monitoring and applying changes to an IoT device. It communicates with balenaCloud and handles the lifecycle of an IoT application.
[more](https://github.com/balena-os/balena-supervisor)

### Systems design
'The process of defining the elements of a system such as the architecture, modules and components, the different interfaces of those components and the data that goes through that system.' Watch [Nicky Case's talk 'Seeing in Systems'](https://longnow.org/seminars/02017/aug/07/seeing-whole-systems/) to get a clear understanding of how to visualise systems and how they work. Alternatively read 

## T

### teamOS
A loop at balena. In traditional organisations this would be akin to HR. The intention of teamOS is to build products and processes that support the people within the team.

### testbot
**(balena specific term)**
The testbot is a device used to aid in the automation of hardware testing. It connects to a balena fin through a HAT interface, and provides a mechanism to remotely provision, power, and run a test suite against a device under test (DUT). Testbot’s vision is to completely isolate the DUT when testing it much like an octopus around its prey. We control the power, network type and the image flashed to the DUT.
[more](https://docs.google.com/document/d/1UiKDVHHp9HUZrBW2kE9FjKwSLb8BTtlDw_FEqyTWHLY/edit)

## U

### Universally Unique Identifier aka. UUID
A 128-bit label used for information in computer systems

### Upstream
Usually refers to a repository of code being maintained by another organization - changes there flow “downstream” to us as users.

## V

### VersionBot
VersionBot is a Github application that we use as our CI/CD tool. It is in charge of linting, validating, building and deploying or publishing our code. Eventually we would want to integrate it with BalenaCloud so that it can be offered as a service to our users.
[more](https://github.com/product-os/versionbot)

## W

### WiFi Connect
A balena utility for dynamically setting the WiFi configuration on a Linux device via a captive portal.  Allows you to get a device connected to the local wifi without physically accessing the device.
[more](https://github.com/balena-os/wifi-connect)

## X

## Y

### Yocto
The Yocto Project is an open source collaboration project that helps developers create custom Linux-based systems regardless of the hardware architecture. balenaOS is built upon Yocto.
[more](https://www.yoctoproject.org/)

## Z