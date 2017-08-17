# Contents

- [Contents](#contents)
- [Introduction](#introduction)
- [Facts](#facts)
- [Troubleshooting](#troubleshooting)
  - [Docker won't start](#docker-wont-start)
    - [Address already in use](#address-already-in-use) 
  - [Device stuck in "Stopping" state](#device-stuck-in-stopping-state)
  - [(can't) Swap on BTRFS](#cant-swap-on-btrfs)
  - [Issues with Line Endings](#issues-with-line-endings)
    - [Signs and Symptoms](#signs-and-symptoms)
    - [Treatments](#treatments)
  - [Bluetooth not working](#bluetooth-not-working)
    - [Signs and Symptoms](#signs-and-symptoms-1)
    - [Treatments](#treatments-1)
  - [Bluez (Bluetooth protocol stack) support](#bluez-bluetooth-protocol-stack-support)
  - [Device appears online but not updating](#device-appears-online-but-not-updating)
    - [Signs and Symptoms](#signs-and-symptoms-2)
    - [Treatments](#treatments-2)
  - [Device files not populating in /dev a.k.a. Why isn't my device working?](#device-files-not-populating-in-dev-aka-why-isnt-my-device-working)
    - [Signs and Symptoms](#signs-and-symptoms-3)
    - [Treatments](#treatments-3)
  - [My environment variables aren't set?!!](#my-environment-variables-arent-set)
    - [Signs and Symptoms](#signs-and-symptoms-4)
    - [Treatments](#treatments-4)
  - [Couldn't satisfy node version 0.X.Y](#couldnt-satisfy-node-version-0xy)
    - [Signs and Symptoms](#signs-and-symptoms-5)
    - [Treatments](#treatments-5)
  - [Why is my device showing the incorrect time?! (resinOS 1.x)](#why-is-my-device-showing-the-incorrect-time-resinos-1x)
    - [Signs and Symptoms](#signs-and-symptoms-6)
    - [Treatment](#treatment)
  - [Why doesn't ADC work on my Beaglebone Black?! (resinOS 1.0.0-pre **ONLY**)](#why-doesnt-adc-work-on-my-beaglebone-black-resinos-100-pre-only)
    - [Signs and Symptoms](#signs-and-symptoms-7)
    - [Treatment](#treatment-1)
  - [Beaglebone Black Not Powering Up](#beaglebone-black-not-powering-up)
    - [Signs and Symptoms](#signs-and-symptoms-8)
  - [Dockerfile COPY fails with alarming btrfs subvolume error](#dockerfile-copy-fails-with-alarming-btrfs-subvolume-error)
    - [Signs and Symptoms](#signs-and-symptoms-9)
    - [Treatment](#treatment-2)
  - [apt-get install fails with 'Error: No information about packages! (Maybe no deb entries?)' error](#apt-get-install-fails-with-error-no-information-about-packages-maybe-no-deb-entries-error)
    - [Signs and Symptoms](#signs-and-symptoms-10)
  - [Issue with missing certificates on SSL download](#issue-with-missing-certificates-on-ssl-download)
    - [Signs and Symptoms](#signs-and-symptoms-11)
    - [Treatment](#treatment-3)
  - [Pulling from resin registry fails](#pulling-from-resin-registry-fails)
    - [Signs and Symptoms](#signs-and-symptoms-12)
    - [Treatment](#treatment-4)
  - [Download starting/stopping loops over and over, never completing](#download-startingstopping-loops-over-and-over-never-completing)
    - [Signs and Symptoms](#signs-and-symptoms-13)
    - [Treatment(after resinOS v1.1.2, this issue shouldn't happen as DNSmasq is used as the resolver.)](#treatmentafter-resinos-v112-this-issue-shouldnt-happen-as-dnsmasq-is-used-as-the-resolver)
  - [ApplyLayer Error](#applylayer-error)
    - [Symptoms](#symptoms)
    - [Treatment](#treatment-5)
  - [Wifi connect app stops working when systemd enabled (should only affect very old versions of resinOS)](#wifi-connect-app-stops-working-when-systemd-enabled-should-only-affect-very-old-versions-of-resinos)
    - [Symptoms](#symptoms-1)
    - [Treatment](#treatment-6)
      - [REFS:](#refs)
  - [Build fails because of `pip install`](#build-fails-because-of-pip-install)
    - [Symptoms](#symptoms-2)
    - [Treatment](#treatment-7)
  - [Build hangs because of `pip install`](#build-hangs-because-of-pip-install)
  - [User software fails with cannot resolve `$(hostname)` issue](#user-software-fails-with-cannot-resolve-hostname-issue)
    - [Symptoms](#symptoms-3)
    - [Treatment](#treatment-8)
  - [Build Hangs and Never completes (Legacy)](#build-hangs-and-never-completes-legacy)
    - [Symptoms](#symptoms-4)
    - [Treatment](#treatment-9)
  - [EGL Bug/Screen freezes when using GPU-accelerated features](#egl-bugscreen-freezes-when-using-gpu-accelerated-features)
    - [Symptoms](#symptoms-5)
    - [Treatment](#treatment-10)
  - [Beaglebone goes into 'read only' filesystem mode](#beaglebone-goes-into-read-only-filesystem-mode)
    - [Symptoms:](#symptoms)
  - [409 While Uploading Metadata](#409-while-uploading-metadata)
    - [Symptoms](#symptoms-6)
  - [Debugging CLI issues](#debugging-cli-issues)
  - [Retrieving Dashboard URL from device UUID](#retrieving-a-dashboard-url-from-a-device-uuid)
- [Canned Responses](#canned-responses)
    - [Generic 1.x SD Card corruption issues and suggesting a move to 2.x](#generic-1x-sd-card-corruption-issues-and-suggesting-a-move-to-2x)
    - [Static IP (resinOS 1.x **ONLY**)](#static-ip-resinos-1x-only)
    - [Host OS](#host-os)
    - [Device Configuration](#device-configuration)
      - [Raspberry Pi](#raspberry-pi)
    - [Forwarding Ports](#forwarding-ports)
    - [Accessing EXT3 partitions (and /data) in OS X](#accessing-ext3-partitions-and-data-in-os-x)
    - [Using supervisord](#using-supervisord)
    - [Setting SSID and passphrase via `connmanctl`](#setting-ssid-and-passphrase-via-connmanctl)
    - [Getting a Permanent API Key](#getting-a-permanent-api-key)
    - [Authentication on the device with the SDK](#authentication-on-the-device-with-the-sdk)
    - [Using the same application image for multiple applications](#using-the-same-application-image-for-multiple-applications)
    - [Is it possible to have different device types in an application / Is it possible to keep a single codebase between applications?](#is-it-possible-to-have-different-device-types-in-an-application--is-it-possible-to-keep-a-single-codebase-between-applications)
    - [Which data is persisted on devices across updates/power cycles?](#which-data-is-persisted-on-devices-across-updatespower-cycles)
    - [Why does `/data` disappear when I move a device between applications?](#why-does-data-disappear-when-i-move-a-device-between-applications)
    - [How to move devices between applications using the API, CLI, and SDK?](#how-to-move-devices-between-applications-using-the-api-cli-and-sdk)
      - [CLI and SDK](#cli-and-sdk)
    - [Which ports does resin.io use?](#which-ports-does-resinio-use)
    - [What is the best SD Card to use?](#what-is-the-best-sd-card-to-use)
    - [How to insert out-of-tree kernel modules on a device?](#how-to-insert-out-of-tree-kernel-modules-on-a-device)
    - [How to remotely update config.json?](#how-to-remotely-update-configjson)
    - [User wants new device/board supported on resin.io](#user-wants-new-deviceboard-supported-on-resinio)
    - [User wondering why download is so big - 1.5GB????](#user-wondering-why-download-is-so-big---15gb)
    - [User wants to use WPA Enterprise](#user-wants-to-use-wpa-enterprise)
    - [Disabling IPv6 on a device](#disabling-ipv6-on-a-device)
    - [What is the registry image name format?](#what-is-the-registry-image-name-format)
    - [Disable screen blanking in X](#disable-screen-blanking-in-x)
    - [Disable wpa_supplicant in the host](#disable-wpa_supplicant-in-the-host)
    - [Multi-container apps](#multi-container-apps)
    - [Multiple displays support](#multiple-displays-support)
    - [Pass environment variables to custom systemd service](#pass-environment-variables-to-custom-systemd-service)
    - [Use npm vendor (i.e. local) modules](#use-npm-vendor-ie-local-modules)
    - [User wants to git clone from Github, but build keeps hanging (**Legacy**)](#user-wants-to-git-clone-from-github-but-build-keeps-hanging-legacy)
    - [Example iBeacon Projects](#example-ibeacon-projects)
    - [Enabling Deltas](#enabling-deltas)
    - [Disabling Logs](#disabling-logs)
    - [Can you disable 2FA so I can recover my account](#can-you-disable-2fa-so-i-can-recover-my-account)
    - [Get image download size with the Resin SDK](#get-image-download-size-with-the-resin-sdk)
    - [User wants to set a file as an Environment Variable](#user-wants-to-set-a-file-as-an-environment-variable)
    - [User wants to update only some Devices attached to an Application](#user-wants-to-update-only-some-devices-attached-to-an-application)
    - [User wants to delete account](#user-wants-to-delete-account)
    - [ENOENT on docker.sock](#enoent-docker-sock)
- [Internals](#internals)
  - [Accessing User Devices](#accessing-user-devices)
    - [Setting Up](#setting-up)
    - [Getting Access](#getting-access)
    - [Troubleshooting](#troubleshooting-1)
    - [On the Device](#on-the-device)
    - [Accessing Devices via Another Device](#accessing-devices-via-another-device)
    - [Fixing the Bash/Node Race (Legacy??)](#fixing-the-bashnode-race-legacy)
    - [Checking Disk Space Usage (btrfs)](#checking-disk-space-usage-btrfs)
  - [Updating the host OS](#updating-the-host-os)
    - [Scheduling an update](#scheduling-an-update)
  - [1. Checking Disk Space Usage](#1-checking-disk-space-usage)
    - [Pre-3.18](#pre-318)
  - [2. Clearing Down Space](#2-clearing-down-space)
    - [Using btrfs-fix](#using-btrfs-fix)
    - [Fixing the Inability to Delete Files](#fixing-the-inability-to-delete-files)
    - [2.1 Clearing Down Space](#21-clearing-down-space)
    - [2.2 Removing Orphaned Subvolumes](#22-removing-orphaned-subvolumes)
    - [2.3 Removing Dangling Volumes](#23-removing-dangling-volumes)
    - [Getting Back to Normal](#getting-back-to-normal)
  - [3. Clearing Down Space (aufs/resinOS 2.x)](#3-clearing-down-space-aufsresinos-2x)
  - [Fix Superblock Corruption](#fix-superblock-corruption)
    - [Authorisation Tokens](#authorisation-tokens)
    - [Build Hanging (**Legacy**)](#build-hanging-legacy)
    - [Disable Ofono (resinOS 1.x ONLY)](#disable-ofono-resinos-1x-only)
    - [Use a staging build on production environment](#use-a-staging-build-on-production-environment)
    - [Cleaning orphaned volumes](#cleaning-orphaned-volumes)
    - [Manually starting rce](#manually-starting-rce)
    - [Remotely reprovisioning (i.e. nuking) a device](#remotely-reprovisioning-ie-nuking-a-device)
    - [Resetting VPN devices state](#resetting-vpn-devices-state)
    - [Persistent journal log](#persistent-journal-log)
    - [Disabling tty-replacement (i.e. what is spawned instead of getty in production images)](#disabling-tty-replacement-ie-what-is-spawned-instead-of-getty-in-production-images)
      - [Fixing serial console for raspberrypi3](#fixing-serial-console-for-raspberrypi3)
    - [Disabling HDMI/enabling TTYS5](#disabling-hdmienabling-ttys5)
    - [Checking whether offline device is really offline](#checking-whether-offline-device-is-really-offline)
      - [Things to check](#things-to-check)
    - [Updating supervisor](#updating-supervisor)
    - [Provision a new device, but keeping the same UUID](#provision-a-new-device-but-keeping-the-same-uuid)
    - [Fixing http code 400 when pulling](#fixing-http-code-400-when-pulling)
    - [Failed to register layer: rename, directory not empty](#failed-to-register-layer-rename-directory-not-empty)
    - [The name "/resin_supervisor" is already in use by container`](#the-name-resin_supervisor-is-already-in-use-by-container)
    - [Misc](#misc)
      - [raspberry-pi](#raspberry-pi)
    - [Checking if an application or a device open for support]


# Introduction
This is a raw scratchpad for centralised knowledge both in terms of user support as well as internal technical documentation we've picked up along the way. It's intended to be a staging point for stuff which will later be ported to the appropriate places.
Having this here, raw and with no expectation as to quality is useful, since it means the knowledge goes somewhere, rather than being scattered disparately around.

__IMPORTANT:__ The information contained here might be outdated, proceed with caution + check to make sure the steps you are following are correct.

# Facts
* Though the host rootfs is read-write, we configure our distro to not write to it as you usually would a rootfs. resinOS 2.0 actually now has the rootfs mounted read-only.
* On devices running resinOS older than `version 1.2`, docker is renamed to `rce`, so you have to do thing like `rce images`, etc.
* Adjusting network configuration on already-provisioned devices isn't easy, due to needing to mount the ext rootfs. Its also dangerous and can brick a device. In general users should be heavily cautioned when working with network config.
* Images tagged jessie/wheezy/etc. at e.g. [resin/rpi-rasbian](https://hub.docker.com/r/resin/rpi-raspbian/) refer to the `:latest` version of the tag. So for example, at the time of writing, `resin/rpi-raspbian:jessie` is the same as `resin/rpi-raspbian:jessie-2015-06-24`.
* The host OS for production devices has no valid login/password credentials.
* The Raspberry Pi <2 which uses SD cards ignores the read-only physical switch. Micro SD cards appear to lack this switch altogether.
* You use [this link](http://jenkins.dev.resin.io/securityRealm/addUser) to add a user to jenkins.
* The only officially support wifi adapters are ones using the `Broadcom bcm43143 chipset`, however many others should work.
* connmanctl can be used to control networking settings from within the container (but this requires access to the host OS dbus). In resinOS 2.x the network can be controlled via NetworkManager dbus API.
* When an app gets killed, the container gets a `SIGTERM` which users can catch and react to. After a grace period, though, the app will get a `SIGKILL` which can't be caught.
* Installing openssh via a Dockerfile causes ssh-keygen to be triggered in the build, however this will result in each device having the same keys across the fleet.
* When you see `{"message":"HTTP code is 500 which indicates error: ` entries in the supervisor logs, this `500` error refers to an error that docker is receiving from its daemon **NOT** an actual server. Any real server error will be described in the remainder of the error message.
* This also goes for messages like `Failed to download application 'registry.resinstaging.io/testhummingboard/5a4f45244cb66724782b2ebf34e576fd8b4d553a' due to 'server error'` - when this error occurs the 'server' in question is the docker daemon running on the device not one of our network servers.
* Ethernet will always work even if wifi is configured, so this is always an option for a user if wifi is not functioning.
* eMMC devices can be provisioned with the same SD card with absolutely no changes required, just pop that sucka into the devices you want to configure.


# Troubleshooting


## Docker won't start

Check `systemctl status docker.service` and `journalctl -xe`.

### Address already in use

Docker might be failing to create a network bridge at startup.

You might see the following logs:

```
Error starting daemon: Error initializing network controller: Error creating default "bridge" network: failed to allocate gateway (X.X.X.X): Address already in use
```
Or this:
```
Error starting daemon: Error initializing network controller: error obtaining controller instance: failed to get bridge network configurations from store: error while populating kmap: meta1 error: checksum error
```

In order to fix it, delete the network files:

```sh
rm -rf /var/lib/docker/network/files/*
```

Start docker:

```sh
systemctl start docker
```

Start the supervisor:

```sh
systemctl start resin-supervisor
```
[Add GitHub issue https://github.com/resin-io/hq/issues/784 to ticket](https://github.com/resin-io/hq/issues/784)

## Device stuck in "Stopping" state

This is usually a symptom of the Supervisor being dead. Most times this is caused by https://github.com/resin-io/hq/issues/401 - refer to the workaround there. If it is **not** that issue (i.e. logs don't show the "name already taken" error), then the same fix might still work, but first **please run [leech](https://github.com/resin-io/leech), attach to the ticket as a .txt file, and ping the Supervisor team** (e.g. @pcarranzav) for diagnosis. Then fix the device.

Other logs that can be useful:
```
journalctl -fn 100 -u resin-supervisor
journalctl -fn 100 -u docker
dmesg | tail -n 100
docker ps -a # before and after applying any fixes
docker images
```

## (can't) Swap on BTRFS
**About the issue:** http://superuser.com/questions/539287/swapon-failed-invalid-argument-on-a-linux-system-with-btrfs-filesystem
**Workaround:** map the file to a loop device
So here are the steps to workaround it on BTRFS (tested on your container):
* dd if=/dev/zero of=/swapfile bs=1024 count=1048576
* losetup -f /swapfile
* losetup (check assigned loop device - next commands assumes loop0)
* mkswap /dev/loop0
* swapon /dev/loop0
* free -m (check output)
__Important:__ This will result in severely degraded swap performance, see https://wiki.archlinux.org/index.php/swap#Swap_file

## Issues with Line Endings

### Signs and Symptoms
Line endings differ between windows and the unix-y world (they used to be different again for mac but not for many years), which can result in issues. E.g. a user seeing something like:
`/usr/src/app/run.sh: line 2: $'\r': command not found`

### Treatments
To resolve this, the user needs to configure git to auto convert line endings. Point them at https://help.github.com/articles/dealing-with-line-endings/#platform-windows.

## Bluetooth not working
### Signs and Symptoms
Bluetooth device not available.
### Treatments
Run the following on startup:
`hciconfig hci0 reset && hciconfig hci0 up`
On the Raspberry Pi 3 you can point them to this example project: https://github.com/resin-io-projects/rpi3-bluetooth

## Bluez (Bluetooth protocol stack) support
For the `wheezy` image, bluez v4 is available via the apt package manager. However, that image provides experimental support for systemd, and thus, we do not encourage users to enable systemd via their Dockerfile. This could lead to udevd problems, which in turn could lead to bluetooth problems.
We suggest users to use the `jessie` image and to enable systemd support in their container via their Dockerfile. In that distro, bluez v5 will be available via the apt package manager. In order for the bluetooth to be fully functional, the `bluez-utils` package must also be downloaded.

If for application-specific reasons, another version of bluez must be used, then:

1. Get the preferred version sources
2. Install dependencies: `sudo apt-get install -y libusb-dev libdbus-1-dev libglib2.0-dev libudev-dev libical-dev libreadline-dev`
3. Enter bluez directory and type: `./configure && make && sudo make install`

Since the bluez service runs with systemd:
* `systemctl status bluetooth` # check status
* `sudo systemctl start bluetooth` # start service
* `sudo systemctl enable bluetooth` # to enable run at boot

## Device appears online but not updating
### Signs and Symptoms

1. Appears online, but device is Idle.
2. Application commit hash vs. device commit hash doesn't change over an extended period of time - no updates.
3. If IP addresses are listed for the device it's not RES-233, as the device would have to be registered for this to happen. The cause is likely #2.
4. The VPN address being incorrect (or more than one VPN address) is a sure indicator of a broken supervisor and indicates #2.

### Treatments
There are 2 possible causes encountered so far -

1. The device is failing to register correctly, probably due to the UUID not being correctly written to config.json. This has been fixed in later versions of resinOS.

The solution here is to SSH into the device, edit the `config.json` and set our own UUID then restart the supervisor. A device reboot might also do it, but that's not confirmed. See below for detailed instructions!

2. The device is having trouble running the supervisor, quite possibly due to running out of memory.

The solution here is to either have the user power-cycle or SSH in and kill the `rce` (resinOS < 1.2) or `docker` (resinOS >= 1.2) process, first ensuring that it is indeed using significant amounts of memory. The OOM killer may do the job for you (smile)

## Device files not populating in /dev a.k.a. Why isn't my device working?
### Signs and Symptoms

1. `/dev` is missing device files the user expects to see.
2. Alternatively, a **library** that relies on a `/dev` file fails reporting a missing file error or perhaps something more general about the device not being available.

__Important Note:__ this is obsolete since we trigger udevd, but this issue may be encountered in custom base images, or if users are use non-resin base images in general.

### Treatments
Simply execute the udev (https://en.wikipedia.org/wiki/Udev) daemon inside the container and use `udevadm trigger` (http://linux.die.net/man/8/udevadm) to replay the udev events which occurred on host OS startup to pick up any devices added on startup to the container's `/dev` directory, e.g.:-

```
#!/bin/bash
mount -t devtmpfs none /dev
udevd &
udevadm trigger
```

## My environment variables aren't set?!!
### Signs and Symptoms

1. User enters the ssh session and finds that the environment variables they've set in the app/device panels are not present.
2. (Perhaps) notices that they are set in applications they run.
3. The env vars are also expected to be set in the web terminal session.

### Treatments
Custom SSH sessions do not import existing environment variables meaning the user will not see them when using it. The following incantation will allow a user to have read access (check - how to get read/write? > to /proc/1/environ?) to environment variables:-

`export $(xargs -0 -n1 < /proc/1/environ)`

An alternative is to ask the user to build a simple application to output the environment, e.g. in node:-
`console.log(process.env);`

This acts as a replacement for the test the user was attempting to perform in the terminal and should give them confidence that the env vars are in fact available.

## Couldn't satisfy node version 0.X.Y
### Signs and Symptoms

1. User pushes node project.
2. When pushing user encounters 'Error: Couldn't satisfy node version 0.X.Y'

### Treatments
This is either 1 of 2 issues. Ask the user which device they're using, then load the docker hub registry tags page for the appropriate architecture:-

* Raspberry Pi <2 - https://hub.docker.com/r/resin/raspberrypi-node/tags/
* Raspberry Pi 2 - https://hub.docker.com/r/resin/raspberrypi2-node/tags/
* Beaglebone Black - https://hub.docker.com/r/resin/beaglebone-node/tags/
* etc. 😄

Check whether a tag exists for the specified node version, both `[arch]-node:0.X.Y` and `[arch]-node:0.X.Y-onbuild` - the former is used when preinstall, install and/or postinstall scripts are present, the latter when there aren't ([ref 1](https://bitbucket.org/rulemotion/resin-builder/src/0700ef812357d53d2cc090554b67a0c5c6ae6579/src/project-types/nodejs.coffee?at=master#cl-55), [ref 2](https://bitbucket.org/rulemotion/resin-builder/src/0700ef812357d53d2cc090554b67a0c5c6ae6579/src/project-types/nodejs.coffee?at=master#cl-64).)

If no tag exists, this is the issue. Upload the missing tags, making sure to consider the issue discussed below, uploading too many tags could result in it recurring and breaking all images. Note that caching of hub images means a delay of up to an hour before the updated images will be available to use.

If the tags page fails to load (i.e. the tag page shows a loading animation which never completes), then it's a bug with docker hub, see https://www.flowdock.com/app/rulemotion/resin-frontend/threads/Dcfo3--9uF5O2ifDGaCMuMvI4Rp for the discussion on this. The solution is to trim existing tags so we avoid this rather serious bug :/

## Why is my device showing the incorrect time?! (resinOS 1.x)
### Signs and Symptoms

User notices that the date/time on the device is incorrect, usually via logs.

### Treatment
There seems to be some flakiness with NTP, in theory, it ought to update on connection to the internet (via connman), and then every 2 hours, but appears to fail to do so sometimes altogether.

A potential cause is the NTP port (123 UDP) being blocked on the network the device belongs to. Diagnosing this is difficult as the NTP package is not installed in the supervisor container (or user container of course) by default.

Once SSH'd into the host OS of the device, the following can be used to diagnose the issue:-
```
rce exec -it resin_supervisor /bin/bash
apt-get -y update
apt-get -y install ntp
 ntpq -p [ntp server address]
If the port is accessible, you should get a response like the below:-
[~]$ ntpq -p 81.168.77.149
 remote refid st t when poll reach delay offset jitter
==============================================================================
*ntp1.exa-networ 135.81.191.59 2 u 460 1024 377 40.326 3.667 0.365
+addtec10-tr3.ka 62.45.45.70 3 S 4971 128 176 40.964 3.854 0.582
 mx1.thompson-tr 81.168.77.149 4 S 143 1024 377 85.331 9.075 6.470
 LPuteaux-656-1- 81.168.77.149 4 S 2 256 377 44.158 6.857 1.816
 87.83.215.50 (i 81.168.77.149 4 S 4971 1024 377 36.204 2.305 0.452
 jtdmltd.gotadsl 81.168.77.149 4 S 382 1024 176 47.512 2.144 0.553
 82-69-242-34.ds 81.168.77.149 4 S 652 1024 346 41.127 3.130 1.305
+host81-152-12-0 129.67.1.164 2 S 643 1024 376 41.007 -11.452 1.293
 109.111.201.42 81.168.77.149 4 S 4971 16 177 38.141 0.623 11.045
 109.111.201.42 81.168.77.149 4 S 4971 16 377 45.537 -6.498 5.196
 105.210.64.244 130.88.212.143 3 S 10 64 2 251.130 -16.077 35.753
 23.127.107.92.d 81.168.77.149 4 S 4971 1024 3 84.771 14.046 4.688
 193.130.120.196 81.168.77.149 4 S 237 64 240 76.231 -184.51 7.418
```

If not, you'll get a response complaining that it can't connect.

## Why doesn't ADC work on my Beaglebone Black?! (resinOS 1.0.0-pre **ONLY**)
### Signs and Symptoms
User tries to use some application which relies upon a library which uses ADC, and it fails to work correctly at all.

### Treatment

**__NOTE:__ this is now working on resinOS 1.1 and up**

Sadly the diagnosis is currently terminal - we don't  support ADC/capemgr because of it requiring ancient linux. Some discussion from Andrei Gherzan is included below:-

We have two options here. capemgr was discontinued from 3.8 and replaced by https://github.com/RobertCNelson/dtb-rebuilder/tree/4.1.x from 4. We basically have two options:
downgrade and use linux-beaglebone 3.8 - dynamic dtb loading via capemgr
keep meta-ti kernel and use dtb-rebuilder - statuc dtb loading - basically this is a tool which patches the default dts and builds it for a specific cape.
In any case we need to think of a way for a user to be able to upload his dtb - new cape for example. As well, a cape is not something that you switch and given our business model, we do remote deployment which doesn't involve any hw interaction. So from my perspective maybe we can instruct users how to build their dts or have a way for users to upload their dtb and have the imagemaker inject it in the right place.

## Beaglebone Black Not Powering Up
### Signs and Symptoms
User restarts power on Beaglebone Black and it fails to restart correctly. In some cases LEDs are lit, in some not.
**It is worth asking if the Beaglebone is connected to any serial devices, since noise on the serial line during boot can cause the boot to hang in U-boot. We have a fix for this in resinOS 1.17.**

###Treatment
It seems generally the advise is to not do this, and it's a hardware issue. Relevant links:-
http://elinux.org/Beagleboard:BeagleBoneBlack#Improper_Power_Down....All_Revisions
https://groups.google.com/forum/#!topic/beagleboard/aXv6An1xfqI%5B101-125%5D
http://stackoverflow.com/questions/27426975/beaglebone-black-doesnt-power-on

## Dockerfile COPY fails with alarming btrfs subvolume error
### Signs and Symptoms
On push user encounters the following error:

`Error while processing push: Error: stat /var/lib/docker/btrfs/subvolumes/56d4f782ac53b2b3f858c0c64caaf31208a3be1552e57e864f10d5f7f41ce76f/app/package.json: not a directory`
When running a statement like:

`COPY package.json /app`

### Treatment

This is simply a terrible error message for a simple problem - the `COPY` command happily copies a file over the `/app` directory rather than in to it. The solution is simple:
```
COPY package.json /app/
```

The trailing slash forces Docker to recognise 'app' as a directory.

## apt-get install fails with 'Error: No information about packages! (Maybe no deb entries?)' error
### Signs and Symptoms
E.g. https://app.intercom.io/a/apps/yg02r5dz/inbox/all/conversations/1166584613

```
Setting up apt-show-versions (0.22.4) ...
** initializing cache. This may take a while **
Error: No information about packages! (Maybe no deb entries?)
dpkg: error processing package apt-show-versions (--configure):
subprocess installed post-installation script returned error exit status 255
Errors were encountered while processing:
apt-show-versions
E: Sub-process /usr/bin/dpkg returned an error code (1)
Removing intermediate container 67817652f5ec
```

###Treatment

The issue appears to be with `apt-show-versions` not correctly handling gzipped apt indexes. The fix is to remove a configuration file which instructs apt to compress this index:
```
rm /etc/apt/apt.conf.d/docker-gzip-indexes
```

So in general the Dockerfile will end up looking like:
```
RUN rm /etc/apt/apt.conf.d/docker-gzip-indexes
RUN apt-get -y update \
    && apt-get install -y apt-show-versions <yada yada> \
    && rm -rf /var/lib/apt/*
```

It's even more important than usual to remove `/var/lib/apt/*` here as without compression the index stored here will be even larger than usual.

## Issue with missing certificates on SSL download
### Signs and Symptoms
When attempting to `wget` an https resource, an error similar to the below is shown:
```
curl performs SSL certificate verification by default, using a "bundle"
of Certificate Authority (CA) public keys (CA certs). If the default
bundle file isn't adequate, you can specify an alternate file
using the --cacert option.
If this HTTPS server uses a certificate signed by a CA represented in
the bundle, the certificate verification probably failed due to a
problem with the certificate (it might be expired, or the name might
not match the domain name in the URL).
If you'd like to turn off curl's verification of the certificate, use
the -k (or --insecure) option.
```

### Treatment
Install the `ca-certificates` package by adding the following to the Dockerfile (sensibly appending to other apt-get install's present in the file as necessary):
```
RUN apt-get install ca-certificates
```

## Pulling from resin registry fails
### Signs and Symptoms
You get an error when trying to pull an image from the resin registry, e.g.:
```
$ docker pull resin/resin-api
Pulling repository resin/resin-api
Get https://registry-1.docker.io/v1/repositories/resin/resin-api/tags: read tcp 52.0.195.198:443: i/o timeout
```

It turns out that this is a rather unfriendly error message that occurs in some version of docker which in fact means the default `latest` tag cannot be found.

### Treatment

You also need to specify the image tag, e.g.:
```
$ docker pull resin/resin-api:v0.0.1
```

## Download starting/stopping loops over and over, never completing
### Signs and Symptoms
A device appears to be stuck in the downloading state however, never completing the download successfully. Typically the device stays online throughout.
Additionally supervisor logs show errors like:
```
IncomingMessage.<anonymous> (/app/node_modules/dockerode/node_modules/docker-modem/lib/modem.js:243:9)\n    at IncomingMessage.emit (events.js:117:20)\n    at _stream_readable.js:944:16\n    at process._tickCallback (node.js:448:13)"}}
Updating failed, but there is already another update scheduled immediately:  [Error: 1 error: HTTP code is 500 which indicates error: server error - Invalid registry endpoint https://registry.resin.io/v1/: Get https://registry.resin.io/v1/_ping: dial tcp: i/o timeout. If this private registry supports only HTTP or HTTPS with an unknown CA certificate, please add `--insecure-registry registry.resin.io` to the daemon's arguments. In the case of HTTPS, if you have access to the registry's CA certificate, no need for the flag; simply place the CA certificate at /etc/rce/certs.d/registry.resin.io/ca.crt
]
Event: Device info update failure {"error":{"message":"getaddrinfo ENOTFOUND","stack":"Error: getaddrinfo ENOTFOUND\n    at errnoException (dns.js:37:11)\n    at Object.onanswer [as oncomplete] (dns.js:124:16)"},"stateDiff":{"status":"Idle"}}
Updating failed, but there is already another update scheduled immediately:  { [Error: getaddrinfo ENOTFOUND]
  cause: { [Error: getaddrinfo ENOTFOUND] code: 'ENOTFOUND', errno: 'ENOTFOUND', syscall: 'getaddrinfo' },
```

On the device itself you often notice a very slow speed when retrieving data from the web, e.g. curl'ing example.com. This is because the Google servers listed in `resolv.conf` are timing out before the local DNS is resorted to and actually functioning correctly.

The reason there are problems despite the ability to actually resolve addresses is that the slowdown is so great that docker simply fails to function correctly, rendering all docker-related tasks (like downloading a new image) completely broken.

### Treatment(after resinOS v1.1.2, this issue shouldn't happen as DNSmasq is used as the resolver.)
**IMPORTANT:** This isn't the exclusive cause, as other issues have presented with similar symptoms.
The local network is having trouble using either `8.8.8.8` or both `8.8.8.8` and `8.8.4.4` of the Google DNS servers. This can often occur when the device is located on a restrictive network that wants to perform filtering of some kind.

It's possible to confirm the issue by very carefully adjusting `/etc/resolv.conf` and curl-ing e.g. example.com, by a process of elimination you can see which request is resolved quickly or slowly - slowly indicates a problem (see note above about why this is.)

The solution is to firstly as soon as possible, comment out the problematic google servers in `/etc/resolv.conf`. Once this initial triage is performed, go ahead and edit `config.json` (typically in `/mnt/conf` in the host OS) and remove the `NameServers=` line from all network configurations to force use of the local DNS server only.

The user can be advised as to how to do this remotely for devices that need it, see [this intercom conversation](https://app.intercom.io/a/apps/yg02r5dz/inbox/all/conversations/1730803796) for more details on that.

## ApplyLayer Error
### Symptoms
Errors occurring like:
```
Failed to download application 'registry.resin.io/nvraspiclientdev/e6b722e6f4082c164dd61abaeb89f987014aa997' due to 'Error pulling image (latest) from registry.resin.io/nvraspiclientdev/e6b722e6f4082c164dd61abaeb89f987014aa997, ApplyLayer exit status 1 unexpected EOF'
```

And the download repeatedly failing.

### Treatment
This is thought to be due to a problem with the device connection resulting in an early termination of the download of an image layer and is usually caused by network connectivity issues. Unfortunately docker will restart the entire image download again if it encounters this.

Deltas will strongly mitigate this issue, as explained in this snippet that can be passed on to a user:
> To mitigate this issue, you can set `RESIN_SUPERVISOR_DELTA` in the Fleet Configuration menu to a value of `1`. This will enable binary delta updates, download size should be significantly reduced on update and devices will have the ability to resume layer downloads that have failed. In the future DELTA updates will become the default update method.

If you bump into this during support, please link the Front ticket to [this issue](https://github.com/resin-io/hq/issues/712)

*[26 May 2017] Note: while we still don't know the underlying cause of this, we suspect that it might have to do with registry v1 as opposing to registry v2. If you bump into this you can attempt to pull from a registry v2 by following these teardown instructions from https://app.frontapp.com/open/cnv_5aacrv :*

> In the end I checked Docker on the device is >=1.6, pulled the image from registry v2, tagged it as a registry1 image and started the supervisor. I probably cheated and that "fix" only kicked the can down the road, it's possible the device will hit the same issues again on next update. we'll have to see.

If you do attempt to pull from v2 please update the relevant ticket at https://github.com/resin-io/hq/issues/712 with the results.

## Wifi connect app stops working when systemd enabled (should only affect very old versions of resinOS)
### Symptoms
wlan de-authenticates immediately after authentication with error code = 3

**Important note:** This is fixed for our base images. However, custom user base images might still encounter it.

### Treatment
This is because the container's systemd takes over the host's systemd socket.
We must ensure for 2 things:

1. the application reaches the host's systemd always
2. to disable the container's connman service because the container's systemd tries to run another connman service.

In order to do so, add the following in the Dockerfile:
```
RUN systemctl disable connman
```
And add the following line in a startup script (that can be part of the CMD command in the Dockerfile):
```
export DBUS_SYSTEM_BUS_ADDRESS='unix:path=/host_run/dbus/system_bus_socket'
```

#### REFS:
Related convo: https://app.intercom.io/a/apps/yg02r5dz/inbox/all/conversations/1820026687
wifi-connect-app: https://github.com/resin-io/resin-wifi-connect
Relavant discussion in r/ideas: https://www.flowdock.com/app/rulemotion/resin-ideas/threads/u51wowG3P3LIpLQzp7G_xTzZFdN
Connmap API: https://github.com/Doodle3D/connman-api
Killing and masking services: https://docs.fedoraproject.org/en-US/Fedora/19/html/Installation_Guide/s1-boot-init-shutdown-administration-kill.html

## Build fails because of `pip install`
### Symptoms

The build fails when `pip` tries to uninstall existing packages during pip install.

### Treatment
The reason for this is an issue with overlay storage from Docker. Detail here: https://github.com/docker/docker/issues/12327.
There is a workaround here by adding `--ignore-installed` to `pip install` commands to make sure it won't uninstall existing packages which are not in the same layer.
Another workaround is: take everything to one layer only by executing all pip commands under single `RUN` command in Dockerfile.

## Build hangs because of `pip install`
### Symptoms

User does a pip install, and the builder seems to hang forever.

### Treatment

This can be confirmed by asking the user to run the pip install using the `-v` flag for verbose output, which will confirm that one of the dependencies of their desired install package is numpy or scipy.

To fix this, users can install the system package manager versions for numpy or scipy, for example in debian:
```
apt-get install python-numpy python-scipy
or
apt-get install python3-numpy python3-scipy
```

## User software fails with cannot resolve `$(hostname)` issue
### Symptoms
This is because these pieces of software assume that `$(hostname)` resolves to an IP address. Known offenders are tomcat and rabbitmq.

### Treatment
The solution is to append an appropriate entry to the `/etc/hosts` file. This can be accomplished in a startup script (i.e. one run via CMD in the Dockerfile) via:
```
grep -q "$(hostname)" /etc/hosts || echo "127.0.0.1 $(hostname)" >> /etc/hosts
```
This checks whether the entry already exists before inserting one if it doesn't.
Discussion for a more permanent fix was raised [in r/ideas](https://www.flowdock.com/app/rulemotion/resin-ideas/threads/wcEF__kZsKI7hqH2FC-Gg7qEG-y).

## Build Hangs and Never completes (Legacy)
### Symptoms
Build gets stuck for ages and the output just repeats `"still working..."` over and over. Usually this is during an NPM install or RUN git clone step.

### Treatment
Refer to the two canned responses below:canned responses below:
TODO: add links here.
* Use npm vendor (i.e. local) modules
* User wants to git clone from Github, but build keeps hanging

## EGL Bug/Screen freezes when using GPU-accelerated features
### Symptoms
Screen freezes when trying to run a GPU-accelerated application, this can include 2D accelerated applications or video playback as well as obviously 3D applications. Generally the app runs without error but as soon as it tries to show video/render something in 3D/etc. the image freezes and often all inputs appear to freeze too. Sometimes a few frames of playback/rendering will be displayed before the freeze occurs, but not always.

### Treatment
We've created a workaround for the underlying bug which causes this - in short, userland processes that use the GPU communicate with it ultimately via a messaging system called VCHIQ - this uses Process IDs (PIDs) to uniquely identify each 'service' associated with a given userland process, however under a PID namespace (which is established when a docker container is running), the PIDs as far as the kernel is concerned vs. as far as the container-run userland process is concerned vary, meaning that the messages do not get routed correctly. The fix adjusts the raspberry pi userland tools to use VCHIQ's own API for determining the global identifier and using that instead of the container namespaced one.
Base images are now adjusted to include the fix and the patch is upstream.

## Beaglebone goes into 'read only' filesystem mode
### Symptoms:
Data can't be written to the filesystem, only read.
###Treatment
This appears be down to how often the kernel tries to reclaim memory used for the VFS cache. If so, there's a way to hotfix this on an device, using the repo at https://github.com/resin-os/resinos-fixes Simply clone, make sure you've followed the details on how to SSH into a user device (you'll need to be added to the admin access list), and then from your host run:
```
./run-fix.sh -f fix-mmc-bbb -u <deviceId> -s resin
```
This will reduce the chance of this occurring again on the device. If the fix is applied then the device rebooted, the device should hopefully not get into this state again. If reboot doesn't fix the situation and the FS is corrupted, then a re-provision of the device will be required. As Lorenzo noted, 'Think of this as a vaccine rather than a cure'.

## 409 While Uploading Metadata
### Symptoms

In terminal during git push:

```
-----> Uploading image to registry...
Retrying due to 'Error: HTTP code 409 while uploading metadata: "{\"error\": \"Cannot set this image checksum\"}"'
       Image uploaded successfully
```

On device during image download:

```
Server error: 400 trying to fetch remote history for 89839ddbec51e95ea4f4659c91f1efd7ad357c9760153fd5033fb4f7d7dc6dc7
```

### Treatment

None. This is a known issue with registry v1, solved in v2. Fixing in v1 is
non-trivial to the point of not being worth it.

## Debugging CLI issues

If the issue isn't obvious, the first step here is almost always to ask the user to update their CLI, if they're not on the latest version. 

Modern versions (5.6.1+) of the CLI should log any errors received to Sentry, which can provide further useful detail. You can browse these at https://sentry.io/resinio/cli/. More modern versions (5.10.0+) include user and full CLI argument information with all errors. For these, you can query by user with https://sentry.io/resinio/cli/?query=user%3Aid%3AUSERNAME to get the full trace for the issue the user is seeing, as well as every package version they're using, see previous errors they might've hit, and other debug data.

Miscellaneous more specific resin CLI troubleshooting tips can be found in the [public troubleshooting doc](http://docs.resin.io/troubleshooting/cli-troubleshooting/).

Asking the user to set the `DEBUG` env var (to any non-empty value) will also produce some extra output for the user locally, including a full stack trace (though that should also be available in Sentry) and background debug-level logging generally.

## Retrieving a Dashboard URL from a Device UUID

Sometimes a user will only supply a UUID. In these cases, it's now possible to use `resin-cli` to retrieve the full Dashboard URL for the device. As an admin, login to `resin-cli` and run the following:

```
resin device <UUID>
```

This will return full details for the device (OS, IP addy, etc.) but also the Dashboard URL.

# Canned Responses

### Generic 1.x SD card corruption issues and suggesting a move to 2.x

In resinOS 2.x [a number of changes were introduced](https://docs.resin.io/runtime/migrate-to-2.0/), one of which is improved file system reliability. Moving to resinOS 2.x currently requires an SD card reflash; soon it will be possible to perform the hostOS update action remotely. As a last note, please make sure that your application is working as expected in resinOS 2.x in test environment before deploying it to a production setting.

### Static IP (resinOS 1.x **ONLY**)

In order to configure static IP on a pre-provisioned SD card (we don't currently have an easy means of changing network settings on a provisioned device SD card) perform the following steps:-

* Mount the FAT partitions of the image either directly from the image file, or by burning the SD card and mounting it on your computer. The volume will be called `resin-conf`.
* Find `config.json` and in it you will find a network key/value pair which contains json string encoded connman settings. Decode it (can be done via JSON.parse), and then  edit the entry to include the following entry, replacing [static IP] with your desired static IP:-
```
[service_home_ethernet]
Type = ethernet
IPv4 = [static IP]/255.255.255.0/192.168.1.1
Nameservers = 192.168.1.1,8.8.8.8
```

Note that this assumes your network gateway is `192.168.1.1`, this can vary so adjust this according to your local network configuration.

* Encode this data as json (can be done via JSON.stringify), and then replace the existing value with the new one.
* The image will now contain your static IP configuration, simply write it to your SD card as you usually would.
* If you're curious about further configurability, this network.config file is simply a connman network configuration file (see https://en.wikipedia.org/wiki/ConnMan and https://wiki.archlinux.org/index.php/Connman), http://git.kernel.org/cgit/network/connman/connman.git/tree/doc/config-format.txt has more details on the configuration options available here.

### Host OS
The containers in which resin.io applications are run are extremely powerful, nearly any code you run will have no idea it's not being run in the host OS. We map devices, network and persistent storage (located at `/data`) to provide applications with more than a typical container-run application would have access to. While we provide a lot of power to these applications, we disallow access to the host OS for a number of reasons:-

1. A core feature of resin.io is that we keep track of your code and make it updateable. Code in the host OS obviously isn't kept inside a container so we are unable to track or update it at all.
2. If code run in the host OS inadvertently (or otherwise :) kills our supervisor or overwrites critical data such as data used to identify it, the device could become inaccessible.
3. Configuration of network device drivers, mount points, security provisions, and many other details have been carefully chosen to serve the resin ecosystem and your containers - code running in the host OS might interfere with this leading to issues or degradation of performance which we would likely not be able to help you with, see issue 4.
4. When troubleshooting issues we base our assumptions on the host OS behaving as we expect it to - if you have made changes here, there's a good chance we won't be able to reproduce the issues locally and therefore won't be able to help you.
5. The whole purpose of a container is to give you complete control over the environment your code operates in and allow you to configure it exactly as you wish - the host OS has to have things configured a certain way and is extremely minimal in what it provides to code running inside of it (enough to allow resin containers to run), why throw all of that away?

If there's something you need to do or inspect that resin.io doesn't provide you within your application container, let us know and we will do all we can to help. There is a surprisingly little that requires host OS access and very soon we hope to reduce this to virtually zero.

__NOTE:__ In resinOS 2.x devices we have a read-only rootfs and will also be allowing direct hostOS from the dashboard, but at the time of writing this feature is not released yet.

### Device Configuration
The FAT partition feature is under development and not yet deployed to production. In the meantime, a workaround is to access the EXT filesystem if the user can (write-access is a pain in Windows/OS X.)
There are boot and configuration partitions exposed as FAT for easy access from any OS (though in Windows these won't necessarily automount - some extra effort may be required to gain access to these TODO: How to do that?)

The `config.json` file controls specific manual configuration of resin (TODO: Parameters? What can be changed?), and for some systems their configuration is determined by the contents of configuration files in the boot partition:

#### Raspberry Pi
System configuration of the Raspberry Pi is determined by `/boot/config.txt`. We don't expose this directly from the container itself, however you can access it on the SD card directly in the FAT boot partition (TODO: Label?)

### Forwarding Ports
It's usually not necessarily to forward ports within the container (in the way you would with a `docker run -p [host port]:[container port]` command), however if you do need to do this, it can be achieved with `iptables`.

For example, mapping port 80 to 8080 can be achieved with the following:-
```
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

### Accessing EXT3 partitions (and /data) in OS X

* Firstly install Fuse for OS X -https://osxfuse.github.io/.
* Next, install fuse-ext2 (this covers ext3 also) - http://sourceforge.net/projects/fuse-ext2/.
* Use the fuse-ext2 too to gain access to the boot-raspi partition (this is FAT) and a disk2s2 (or similar name) drive appear - this latter drive (well, partition) is what you need and you will be able to access whatever has been stored in /data in the /resin-data/[app id] directory.

### Using supervisord
Docker has a guide at https://docs.docker.com/articles/using_supervisord/ which gives a lot of detail on this. Ignore the `EXPOSE` part of the Dockerfile as by default all ports are exposed in resin containers.

Generally you need to copy in the supervisord configuration and then execute supervisord via the CMD:
```
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord"]
```

### Setting SSID and passphrase via `connmanctl`
See [this intercom thread](https://app.intercom.io/a/apps/yg02r5dz/inbox/all/conversations/1142657594) for more details on the user issue that provoked this need.
To activate this execute the following list of `connmanctl` commands:

```
scan wifi
services (parse output to get id for our ssid)
agent on
connect <service-id>
[enter passphrase]
```

### Getting a Permanent API Key
We plan to add this to the API properly in future, for the time being there is an early access workaround:

1. Using your auth token do a POST request to https://api.resin.io/application/#{application.id}/generate-api-key(sending the token in the Auth header) - see https://github.com/resin-io/resin-sdk/blob/397c0e5dc570c3d094561b6d3d27ae3254d9a141/build/models/application.js#L324 for example usage
2. The server should reply with an API key (json-encoded string, so you may need to strip an extra pair of quotes)
Add `?apikey=API_KEY` to all your API requests and do __not__ send the token header anymore.

**Using the SDK:**
```
resin.auth.login({ /* credentials */ });
// ...
resin.models.application.getApiKey('MyApp').then(function(apiKey) {
  // use apiKey
});
```

### Authentication on the device with the SDK
Our SDKs will automatically pick up the API token from the exposed `RESIN_API_TOKEN` env var if available, and use that for requests. In this case you don't need to login explicitly.

Otherwise, you must make available to your application either your Auth Token (from prefs), or a username/password pair and use these to login:
```
resin.auth.login({ /* credentials */ });
```
or, with an Auth Token:
```
resin.auth.loginWithToken(authToken);
```

### Using the same application image for multiple applications
This is possible using the resin CLI (see [this thread](https://app.intercom.io/a/apps/yg02r5dz/inbox/all/conversations/1194504367) for discussion.) Assuming you already have NodeJS installed in your computer, install the CLI using:
```
    $ npm install -g resin-cli # might need sudo depending on the environment
```
Then login:
```
    $ resin login
```
Then to download a device image, configure it and burn it to an sd card (make sure the sd card is plugged into your computer before you run this command), run:
```
    $ sudo resin device init --application <application name>
```

Going forward you can re-use this command to initialise a device for a new application of the same device type without having to redownload the image.
The images are stored in `~/.resin/cache`, and remain cached for a week.

### Is it possible to have different device types in an application / Is it possible to keep a single codebase between applications?

At the moment each application is tied to a specific device type. So, for example, if you have created an application by specifying an Rpi2 device, then only Rpi2 devices will be able to join this application's fleet.

However, you can easily add multiple remotes to your git repository, each pointing to a different resin.io application. You can then use `Dockerfile.template`s (http://docs.resin.io/deployment/docker-templates/) to keep a single codebase and push to multiple device types.

### Which data is persisted on devices across updates/power cycles?
The only data we **guarantee** to be persisted across reboot, shutdown and device update/container restart is the contents of the `/data` folder.

However at the time of writing, when a device is restarted or power cycled the container is not recreated, meaning all the data that was present in the container's filesystem before, remains. There is a pull request changing that behaviour here: https://github.com/resin-io/resin-supervisor/pull/138

It's very important not to rely on this behaviour, as containers are recreated on application updates, when environment variables are changed in the UI or API, or when an application restart is requested.

### Why does `/data` disappear when I move a device between applications?
the `/data/` is specific to a given app, so if you move the device back to the other app you'll find /data/ is there for that app again.  The reason for this is that if you move devices between applications running different code then keeping `/data/` from the other would potentially cause issues, there are plans to add the option to purge `/data/` on move (so it will be gone on moving back, without having to purge before moving), as well as the option to transfer the data across.

### How to move devices between applications using the API, CLI, and SDK?
So to do this via the API directly, you need to use an OData expresion.
In order to execute this command you need:

* your authorisation token, which you can grab athttps://dashboard.resin.io/preferences?tab=details.
* The ID of the application you want to transfer the device to - if you click on an app, the URL will be https://dashboard.resin.io/apps/<app id>/devices, this<app id> is what you need. For example, https://dashboard.resin.io/apps/12345678/devices would indicate app id 12345678.
* The UUID for the device you want to move. You can find this in the device dashboard on the 'Device Summary' tab, and there's even a handy copy button for you to copy it to the clipboard easily.

Once you have all these, you are good to go. The ODATA query you need to use here is `$filter=uuid eq '<device uuid>'`, and to move the device we want to alter the device record, so we want to submit a **PATCH** request with JSON data set to `{ "application": <app id> }`.

Putting this all together, we can achieve what we need with a simple bash script using cURL. You need to export the device uuid as **DEVICE_UUID**, the token as **TOKEN** and the app id as **APPLICATION_ID**:
```
#!/bin/bash

export DEVICE_UUID="<the device uuid from the device dashboard>"
export TOKEN="<the auth token from your preferences page>"
export APPLICATION_ID="<the application id from the application dashboard>"

curl -X PATCH "https://api.resin.io/ewa/device?\$filter=uuid%20eq%20'${DEVICE_UUID}'" -H "Authorization: Bearer ${TOKEN}" \
     -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, */*' \
     --data-binary "{\"application\": ${APPLICATION_ID}}" --compressed
```

#### CLI and SDK
Now this can be done via the CLI and the SDK also (from an [intercom conversation](https://app.intercom.io/a/apps/yg02r5dz/inbox/all/conversations/1382657966)):

You can install the tool with the following command (given that you have NodeJS and NPM installed):
```
$ npm install -g resin-cli
```
You can check the version to confirm it was installed correctly (the device move command was introduced in v2.2.0, so make sure you're running the latest one!):
```
$ resin version
```
You will need to log in to your account with the following command:
```
$ resin login
```
You can try listing your applications to see you were logged in successfully:
```
$ resin apps
```
Once everything it set up, you can move a device with the following command:
```
$ resin device move <uuid>
```
The command will interactively prompt you to select an application that you own that matches the device type of the device you're trying to move.

Alternatively, if you want to accomplish this programatically, this functionality was implemented on our NodeJS SDK as well (https://github.com/resin-io/resin-sdk).

If so, you can find extensive documentation in the following file: https://github.com/resin-io/resin-sdk/blob/master/DOCUMENTATION.md.

The one that you might be interested in is `resin.models.device.move()`: https://github.com/resin-io/resin-sdk/blob/master/DOCUMENTATION.md#resin.models.device.move.

### Which ports does resin.io use?
Our port requirements are as follows:

* 443 TCP - This is the most fundamental requirement - it is used to connect to the VPN and the web terminal, as well as of course any web endpoints using TLS (https://.)
* 123 UDP - For NTP time synchronisation.
* 53 UDP - For DNS name resolution.

Each of these should work with outward only (and inward once outward connection established) firewall settings.

### What is the best SD Card to use?
Some of our customers whose application writes a lot of data the cards have done automated test on various SD cards. They found that the Lexar Pro had the best results.
http://it.lexar.com/products/professional-microsd-1000x
http://www.lexar.com/microsd-633x
These cards allow their devices to operate for at least 3 years without fear of card fatigue.

### How to insert out-of-tree kernel modules on a device?

Note that these instructions are only the very, very early method for including kernel modules. We are actively working on a far simpler approach, however for the time being we can offer this as a means of achieving what you need today :)

1. Let us know which device in particular you need this for. At the moment, we need to provide you with a copy of the kernel source, a .config file and a Module.symvers file, so we need to determine the precise files to obtain.
2. Ensure you have the tools required to compile the kernel source code for module building (this doesn't require a complete build don't worry :) - gcc, make, etc. `sudo apt-get install build-essential` should do it.
3. Install a cross-compiler suite via e.g. `sudo apt-get install gcc-arm-linux-gnueabihf` (for arm) or check out Linaro's site https://releases.linaro.org/components/toolchain/binaries/latest-5/arm-linux-gnueabihf/.
4. Extract the kernel source we provide into a directory, then copy .config and Module.symvers into the same directory.
5. Enter the kernel source directory then run `make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- modules_prepare`, adjusting this command if the architecture is different or the cross-compile suite you've installed has a different prefix.
6. Enter the directory of the module you wish to build and run `make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- -C <kernel source directory> M=$(pwd)`, again adjusting if arch/cross-compile suite are different.
7. This should result in 1 or more files with `.ko` extensions. These are the actual kernel module binaries you need to add to your repository and transfer to your device.
8. Once on the device, you can load the module either via `insmod <filename>.ko`, or if the modules rely on other modules on the system or one another, you will have to do some more housekeeping:
9. (Optional) Copy the modules into `/lib/modules/$(uname -r)/`, then run `depmod -a`. Finally load the module via `modprobe <filename with no extension>`.

### How to remotely update config.json?
To do this you need to mount the partition containing config.json and edit it directly there. For the changes to take effect either connmand needs to be restarted or the device has to be restarted. **IMPORTANT:** This is very risky. Any mistake here can lead to a bricked device.

You can do this with something like:
```
configdev=$(blkid | grep "resin-conf" | awk '{print $1}' | tr -d ':')
mount $configdev /mnt
<edit /mnt/config.json with your favourite editor>
umount /mnt
```

### User wants new device/board supported on resin.io
We want to let the user know that we are interested, and not be dismissive about the suggested device because of time constraints. A good method here is to switch the discussion to a. how we choose devices, b. a discussion about why they particularly want this device, and c. some additional details on how to add device yourself. Sometimes it may be the case that an existing device we support might do the job better, so based on their answer you can explore that too. Something like:

>We are committed to choosing which devices to support based on what our users need, so are always open to suggestions. Could you give me some more information on how you plan to use the device? What of its features are particularly useful to you?

>Alternatively, for ultimate control, we are proud to offer the ability to add custom device support on your own via a Yocto Linux layer. Let me know if you're interested, and I can connect you with someone who can give you some insights into the process. Also, there's more details on that over at our docs.

### User wondering why download is so big - 1.5GB????
__NOTE:__ We are discussing moving away from on-the-fly compression for images so this might rapidly become redundant. Do check to see how image download currently works to be safe.

Although the image size seems large, the actual data that you will have to download will be far less as the image is compressed and it is being decompressed on the fly by your browser, resulting to a transfer length of a few hundred MBs.

In addition, you might be interested in using our CLI tool: http://docs.resin.io/#/pages/tools/cli.md which has the ability to cache images and reuse them!

### User wants to use WPA Enterprise
The user's specific settings will vary, but the following gives a general case:
```
Name=<ssid name>
EAP=peap
Identity=<login>
Passphrase=<pass phrase>
Phase2=MSCHAPV2
```
Note that the 'Phase2' setting will vary depending on the network. See the references below for more details on these settings. Also see this [intercom thread](https://app.intercom.io/a/apps/yg02r5dz/inbox/conversation/1844228437) for a case where settings were applied successfully.

In order to set this, you'll need to modify your config.json file either inside the device image, or on the SD card once mounted (we are going to add the ability to specify this before image download too.)
If you follow the steps for setting a static IP at http://docs.resin.io/#/pages/deployment/wifi.md#set-static-ip then, rather than locating the ethernet configuration, find the wifi one and adjust the entry to use these settings everything should work correctly.

Keep in mind this string is JSON-encoded, and it's important to insert '\n's as needed, also note that connman key values are case-sensitive.
**Refs:** See the [Arch Wiki](https://wiki.archlinux.org/index.php/WPA2_Enterprise#connman) page on this, and [this page](https://github.com/aldebaran/connman/blob/master/doc/config-format.txt) is also useful. Connman seem to not like to explain their settings very clearly

### Disabling IPv6 on a device
This works well for dealing with a broken DHCP server which sends an invalid IPv6 DNS address even to IPv4 only devices.

As far as I can tell this needs to be done at the host OS level.  Essentially you are running:
```
echo net.ipv6.conf.all.disable_ipv6=1 >/etc/sysctl.d/disableipv6.conf
echo net.ipv6.conf.eth0.disable_ipv6=1 >>/etc/sysctl.d/disableipv6.conf
echo net.ipv6.conf.default.disable_ipv6=1 >>/etc/sysctl.d/disableipv6.conf
```
However even without access to the host os this can be done within the device image by adding a file at `/etc/sysctl.d/disableipv6.conf` containing `net.ipv6.conf.all.disable_ipv6=1`.

You can however adjust this at runtime, though it won't affect the current `/etc/resolv.conf` (though that can be edited.) You do this by running:
```
sysctl -w net.ipv6.conf.all.disable_ipv6=1
sysctl -w net.ipv6.conf.eth0.disable_ipv6=1
sysctl -w net.ipv6.conf.default.disable_ipv6=1
```

Additionally you have to adjust the connman settings (and in config.json too to persist it) to set `IPv6 = off` for the interface in question otherwise connman will switch IPv6 back on. Seriously.
Also ensure you update `/var/lib/connman/network.config` otherwise connman will overwrite any changes to `/etc/resolv.conf`.

Restart connman to take these changes into account via:
```
systemctl daemon-reload
systemctl restart connman
```

### What is the registry image name format?
`registry.resin.io/<app name>/<commit>`

### Disable screen blanking in X
X will default to blanking the screen after a certain period of time. This is pertinent to graphical applications on devices which use X and can be disabled via:
```
xset -dpms
xset s off
xset s noblank
```
The [Arch wiki article on DPMS](https://wiki.archlinux.org/index.php/Display_Power_Management_Signaling#Prevent_screen_from_turning_off) has more details on this!

### Disable wpa_supplicant in the host
We do this via the systemd DBUS API:
```
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host_run/dbus/system_bus_socket dbus-send --system --print-reply --dest=org.freedesktop.systemd1 /org/freedesktop/systemd1 org.freedesktop.systemd1.Manager.StopUnit string:'wpa_supplicant.service' string:'fail'
```
(same with StartUnit to re-enable it).

### Multi-container apps
That's a feature we're currently working on. I don't have information on when it'll be available, but there are some experimental ways of doing this using docker in docker. Here are a couple of projects that are using on this method:

* https://github.com/abresas/multi-container
* https://github.com/pcarranzav/resin-aerofs
* https://github.com/pcarranzav/resin-kubernetes

You might also want to check a blog post we have on this topic: https://resin.io/engineering/our-first-experiments-with-multi-container-apps/

### Multiple displays support
To enable separate displays (i.e. not mirrored) create a script `script.sh` and add the following, modifying parameters accordingly:
```
xrandr --output HDMI-0 --auto --primary --output DisplayPort-0 --auto --left-of HDMI-0
<command to run your application>
```
In your Dockerfile specify this script as part of your CMD:
```
CMD ["xinit", "./script.sh"]
```

### Pass environment variables to custom systemd service
We save the environment variables in `/etc/docker.env`.

If users want to inherit the environment variables in the custom systemd service, we need to add this line to systemd service file.
```
EnvironmentFile=/etc/docker.env
```

### Use npm vendor (i.e. local) modules
It can be useful, especially when working around the git/qemu issue, to be able to manually add npm modules to a project rather than npm install them which might invoke git clone. The steps are as follows:

1. Enter the vendor module parent directory (where its package.json file is)
2. Run [npm pack](https://docs.npmjs.com/cli/pack) to create a tarball (e.g. private-module-1.0.0.tgz)
3. Copy the .tgz file in a folder in your resin project (e.g. vendor/private-module-1.0.0.tgz)
4. Run 'npm install --save vendor/private-module-1.0.0.tgz'
5.Include the `vendor/` folder in your application docker image by using the following `COPY` Dockerfile instruction:
```
COPY vendor ./vendor
```
This `COPY` command must precede the 'npm install' `RUN` Dockerfile instruction.
6. 'git add/commit' the vendor/ directory, the updated package.json and the Dockerfile of your application.
7. Run 'git push resin master' to initiate the build.

### User wants to git clone from Github, but build keeps hanging (**Legacy**)

__NOTE:__ ARM native builders have been deprecated.

Sorry that you have encountered this issue. This is part of a problem that exists between qemu and git, due to git relying upon some fairly exotic system call mechanics which confuse qemu. This results in sporadic issues with git operations in this environment, which is what we use to run ARM binaries on the build servers while building your image. Recently we've gone to the lengths of patching qemu to work around the problem, in fact twice, but regardless of local testing it seems there are many iterations of the issue which make it more difficult than we anticipated. We are now actively looking at different approaches to the problem, and are working to resolve this as soon as we can. I've added you to our notification list and we'll notify you as soon as we have a fix production.

In the meantime, I recommend simply editing your Dockerfile to avoid the git clone. One fairly straightforward method is to simply retrieve the code using the packaged-up release from github, e.g.:
```
RUN wget --output-document=subg_rfspy.tar.gz https://github.com/ps2/subg_rfspy/archive/v0.6-1-g28d741f-1-g02f7164.tar.gz
RUN mkdir subg_rfspy && tar --strip 1 --directory subg_rfspy -xf subg_rfspy.tar.gz
```
This can be slotted in to replace the git clone line.Alternatively, you can try our native arm servers by running:
```
git push resin master:master-arm
```
However I must warn you that we've been having issues with our ARM server providers which might result in issues, which is why I prefer a solution of avoiding git clone if possible.

### Example iBeacon Projects

* https://github.com/lifeeth/ResinBeacon
* https://github.com/craig-mulligan/re-eddy
* https://github.com/lifeeth/ResinBeaconScanner

### Enabling Deltas
You can enable deltas by simply creating a fleet config variable named `RESIN_SUPERVISOR_DELTA` with its value set to `1`. The supervisor version needs to be `> 1.5.0`.

### Disabling Logs
Set `RESIN_SUPERVISOR_LOG_CONTROL` env var to `false`, see https://resin.io/blog/device-bandwidthdata-usage-how-low-can-we-go/ for more details.

### Can you disable 2FA so I can recover my account
__Note:__ replace `CHANGE_ME` with a unique string. You can generate one by running:
```
openssl rand -hex 32
```
In the canned response, add the output of `openssl rand -hex 32` as `CHANGE_ME`

**Canned response:**
>By choosing to enable two-factor authentication, you have made it clear to us that security is as an important concern for you as it is for us. It also means you do not completely trust authenticating with just a password.

>Therefore you will understand that we need to take extra measures to be sure that we are not disabling two-factor authentication for an attacker who learned your password.

>We would like to verify that you're in possession of the SSH key you have provided to us. To do this you'll have to run the following command and send us the output from the email account associated with your resin account, to support@resin.com. After we validate the signature we'll disable 2FA on your account and you'll be able to login with just your password.
```
echo CHANGE_ME | openssl rsautl -sign -inkey ~/.ssh/id_rsa | base64
```
>If the command doesn't work, it may be that your SSH keys are stored elsewhere, you can edit the command to point to where your SSH keys are. Please let us know if you have trouble with these instructions.

**Verifying Users Response via SSH Challenge**
__Note:__ You'll need a GNU version of openssl to run this.

1. Go to their ssh key tab in preferences https://dashboard.resin.io/preferences?tab=sshkeys
2. For each key, copypasta into a local file with a name like `userskey.pub`.
Open Terminal, run file as:
```
ssh-keygen -f userskey.pub -e -m pem > userskey.pem
```

In Finder, there's a new file called userskey.pem.

3. Next, you have to convert that to a PEM encoded (plain? not sure what this format is called) public key using this command:
```
openssl rsa -in userskey.pem -RSAPublicKey_in -pubout > userskey.plain.pem
```
4. Now you're ready to verify whatever the user sent you
Say they sent you this response:
```
o7+ga4dl8cNB+O/9kxvEZj6UP5r3Tx3bno1ukYNdBd/hd0zNk7y153qxHfj9MOlmG6+VuaqXLZmJ
8rEOUjsGxqq377SSV9OEs0PkvvVhKyjtYxb3Vm2apJLal9Mfhktr/QW3pht1kX4XgZmzo8CcbL5q
5EWMVVuXttSbjcZY2hDB3lYU9OElggkOxKNO/jug9X0mOc6XeUM7+aSd12LDHTydpgQ0MZxgNfHv
KQnkCHcP50rbIqnhcbjBFzeOWFcAVcpKCuUumnKuQv7k2SRjUEIIZEXVWqiXAeEl2jpblYsDUmKV
jQLi+rLohLBZDlsBxtQuxBYK4NVhnj01wzkThw==
```
You put this in a file, say `response.base64` and then do:
```
cat response.base64 | base64 -d | openssl rsautl -verify -inkey userskey.plain.pem -pubin
```
This should print the original random challenge you sent him. i.e if you sent `echo foobarfoobar`, then the above command should print `foobarfoobar`

If the user's key doesn't match, you'll see
They may have another SSH key to try.
If not, it means we don't have a unique way to confirm the account. Here's a potential canned response that ensures the user knows why we can't disable 2FA and hopefully reduces frustration.

> At Resin we believe that security is one of the cornerstones of a reliable service. As such, we need to be absolutely sure that in cases where users have mislaid their credentials we can authenticate them using other means.
>
> Where Two Factor Authentication (2FA) is involved, we need to ensure that the account does belong to you. To allow us to do this we ask you to sign a unique passphrase with the private key associated with your account; this enables us to validate your ownership of the account.
>
> Unfortunately, in this case, without the ability to verify your ownership we cannot disable 2FA for the account.
>
> However, there is nothing stopping (and we actively encourage!) you to create a new account to continue using the Resin service.
>
> Thank you for your understanding, and please let us know if we may assist you any further.

If the key does match, and there's reason to believe that the computer is compromised, the next challenge is to ask the user to confirm private information about their account.
>Thank you for sending the key. We think it's prudent to ask you one more security question. Please reply with both the name and device type for an application associated with your account.

If the key does match, and there's no reason to believe the computer is compromised, 2FA can be disabled. (Currently, this requires directly editing the database. Petros or Page are the only ones who can do this.)
>Thank you for confirming. I've disabled two-factor authentication for your account.


**IT IS REALLY IMPORTANT TO VERIFY THE WHOLE STRING**

### Get image download size with the Resin SDK
The stream object resolved by [resin.models.os.download()](https://github.com/resin-io/resin-sdk/blob/master/DOCUMENTATION.md#resin.models.os.download) contains the original `node-request` response as a `.response` property. User can check the HTTP headers in `stream.response.headers` to determine the size, before deciding to pipe to a location.

### User wants to set a file as an Environment Variable

You can do this by Base64 encoding the file you want to use and using this value for either an Application or Device specific environment variable. This will need to be decoded by a startup script for you application. We are planning on supporting environment files in the future.

### User wants to update only some Devices attached to an Application
It is currently not possible to selectively update a subset of devices associated with an application.

However, what you could do is create a new application for each group of devices you want to update separately, and use the same git repository for each application.

To do this, you'd add a new remote to the same source repository for each device group, eg:
```
     git remote add appone <user>@git.resin.io:<user>/appone.git
     git remote add apptwo <user>@git.resin.io:<user>/apptwo.git
```
for each different application (in this case, 'appone' and 'apptwo').
You can then assign half your fleet to application 'appone' and the other half of your fleet to application 'apptwo'.
Now if you push to the appropriate remote (eg. 'appone'), only those devices attached to that application will be updated.
You can easily move devices between applications by selecting a device from a current application, then selecting 'Actions' and then 'Move device'.

### User wants to delete account

**IMPORTANT!!!** Do not help users delete their accounts until you are 100% sure that they are not collaborators with one of our customers, because deleting their account will cause any devices they created for the company be deleted as well.

It is currently not possible for a user to delete their account using the dashboard.  However it is possible to do so using a direct API request with the *user's* auth token (the auth token must belong to the account being deleted), so either the user can perform the request with their auth token from the preferences panel or an admin can use the 'login as' admin panel feature to copy the user's auth token and run the request themself.

```sh
userId="..."
userAuthToken="..."
curl -X DELETE "https://api.resin.io/v2/user($userId)" -H "Authorization: Bearer $userAuthToken" --compressed
```

You should get an `OK` response on successful account deletion.

Also, since we don't use email verification we need to take some extra steps to establish the identify of the user that is asking for account deletion:

1. The user must provide the username of the account that he wants to delete.
2. The account deletion request must originate the email that is set in the account 'Preferences'.
3. Even if the original account deletion request satisfies both 1. and 2., we should ask for a final confirmation by sending an email to the account email address, because some misconfigured email servers are still open to spoofing attacks.

In closing, since this is a parting user we should ask for feedback, e.g.:

> We are sad to see you go and would really appreciate any feedback you have on our service/platform or things we can improve.

### ENOENT on docker.sock

**WARNING**: This was encountered during experimental work on the ubuntu-supervisor,
and should not be applied to a customer's device without talking to the device/supervisor
teams.

We used to bind-mount the Docker socket in on `/run/docker.sock`, but at some point
switched to `/var/run/docker.sock`. This can cause problems with deltas depending on
the library version in use.

Sample output:

```
17.11.16 15:52:54 [-0800] Failed to download application 'registry.resin.io/jenkinsgateway/<hash>' due to 'connect ENOENT /var/run/docker.sock'
```

Solution(s):

* Change the bind-mount to the newer version (`/var/run/docker.sock`)
* OR: Try symlinking the socket inside the supervisor

**

# Internals
## Accessing User Devices
### Setting Up

1. Add your SSH key to [resin-ssh-keys
   project](https://github.com/resin-io/resin-ssh-keys), at
   `systemd/services/add_ssh_keys_[your_flowdock_handle].service`, using one of the
   existing files as a template.
2. Add an ExecStart line in `add_ssh_keys.service`
   (located in the same directory), using another line as a template.
3. PR these changes, have them merged in and ask the appropriate people (currently Jack) to deploy
   them to the server,
4. Grab the key files from `resin-containers` at
   `cloud_formation/ssh/resin_devices*` and copy them to your `~/.ssh` folder.
   This key is password-protected, and the key is available from passpack. Ask @apostolism
   for access.

### Getting Access

1. Make sure your ssh agent knows about the key you've added to the resin-containers `cloud_formation/systemd/services` folder, if it isn't your default key, by running:

  ```
  ssh-add /path/to/private/key
  ```

2. Find the UUID of the device you want to access.
3. Ensure the key is loaded into your ssh agent by running `ssh-add ~/.ssh/resin_devices`.
  * If you are on mac, the old ssh installed will fail on the previous step complaining of a bad keyphrase even if it's correct. To get around this update your version:

    ```
    brew install homebrew/dupes/openssh
    ```

    This will install binaries into `/usr/local/bin`, symlinked into entries in `/usr/Cellar/openssh/[version]/bin`.
    As of 16th December 2015, the version installed by default in /usr/bin/ssh is OpenSSH_6.9p1, LibreSSL 2.1.8 - this is the version that *does not work*.

    After installing via openssh, /usr/local/bin/ssh reports version OpenSSH_7.1p1, OpenSSL 1.0.2e 3 Dec 2015. To determine version run `ssh -V`, and if you want to compare between these locations specify the whole path, e.g. `/usr/local/bin/ssh -V` (this will be what 'ssh' defaults unless your path has been edited unusually.)

    You may need to look at how ssh-agent starts/runs but experiments locally suggest it works out of the box .

    Another issue with ssh on mac is that the ssh-agent sometimes refuses to use the correct key if many keys are already loaded (ssh-add -l shows a list). Temporarily removing some keys (with ssd-add -d <key>) until there are only a few left (3 or 4, maybe less) mitigates the problem. When this problem arises, even forcing a specific key with the '-i' option will not work. This issue has been seen in version OpenSSH_7.1p2, OpenSSL 1.0.2e 3 Dec 2015.

5. Set up aliases in ~/.ssh/config as follows:

  ```
  Host resin
   User root
   Port 22222
   ProxyCommand ssh -A core@manager.resin.io 'enter vpn "sudo nsenter --target \$(docker inspect --format {{.State.Pid}} resin-vpn) --mount --net nc %h %p"'
   StrictHostKeyChecking no
   UserKnownHostsFile /dev/null
  Host resinstaging
   User root
   Port 22222
   ProxyCommand ssh -A core@manager.resinstaging.io 'enter vpn "sudo nsenter --target \$(docker inspect --format {{.State.Pid}} resin-vpn) --mount --net nc %h %p"'
   StrictHostKeyChecking no
   UserKnownHostsFile /dev/null
  ```

  Note: Even if you can think of other, more fun ways of setting up your
  aliases, please use the form above, since some of our tooling you may use
  while on support assumes aliases set up in the manner above. If you've got
  good ideas to improve them, raise it in the devops channel on Flowdock.

6. You can then log in to a users device using `ssh resin -o Hostname=${UUID}.vpn`

### Troubleshooting
If your key and the device key are configured correctly but you are unable to log in and seeing errors like the following:

```
sign_and_send_pubkey: signing failed: agent refused operation
```

you may need to disable any keychain manager you have running in your desktop environment and restart the ssh-agent.  An example of this for a default Ubuntu GNOME environment is here: http://askubuntu.com/a/861328/349 but short instructions are:

1. Remove gnome-keyring from startup applications
2. `killall ssh-agent ; killall gnome-keyring-daemon`
3. `eval $(ssh-agent -s)`
4. Re-add keys (`ssh-add ; ssh-add ~/.ssh/resin_devices`) and verify they are there (`ssh-add -l`)

You should now be able to ssh to devices.

If you are seeing errors like the following:

```
1234567.vpn: forward host lookup failed: Unknown server error : Invalid argument
```
Then this is because you are not using the full UUID.  If you use the clipboard link by the UUID field then the full UUID will be put on your clipboard, and should work in the command above.

### On the Device

Check `/var/volatile/vpnfile` - this should contain the UUID of the device you are looking at, check this to ensure that a stale VPN IP address or some other issue hasn't occurred (that might land you in an unrelated device.)

Once on the (non-systemd, before resinOS 1.2) device, `/var/logs/*` is your friend. `rce` should be running, which is the `resin container engine`, i.e. our fork of docker.
Check  `/var/log/supervisor-log/resin_supervisor_stdout.log` for supervisor output.

On resinOS 1.2+ device you can use `journalctl` to look at the logs. To get the last 100 logs for the supervisor:
```
journalctl -u resin-supervisor -n100
```

### Accessing Devices via Another Device
If a device is showing offline but you suspect it's the VPN not functioning or there is some other reason it appears offline, then you can gain access to it via a known working device in the same network as the affected device..

**Important:** A device might have changed its IP address since it last reported it to the dashboard if it has been unable to connect via the VPN, so not being able to access that IP address does not mean the device is necessarily unreachable. In this case you need to look at performing an ARP scan (see below.)

Access the known working device via `ssh -A -o HostName=<uuid.vpn> resin`, then once inside the device, run:
```
ssh -p 22222 root@<device ip>
```
If you are unable to determine the IP of the device, you will need to run something similar to an ARP scan. The host os will not have this installed, but you can try this in the supervisor container in a pinch:
```
docker exec -it resin_supervisor /bin/bash
apt-get update -y
apt-get install -y arp-scan
arp-scan --interface=eth0 --localnet
```
Replace `docker` with `rce` if the device is older, as we used to name the docker binary this, and in addition if the device is not connected via eth0 (determine this via `ip addr`), then replace 'eth0' here with the interface name.

This will list devices on the local network that respond to ARP, with output like:
```
# arp-scan --interface=eth0 --localnet
Interface: eth0, datalink type: EN10MB (Ethernet)
Starting arp-scan 1.9 with 256 hosts (http://www.nta-monitor.com/tools/arp-scan/)
192.168.0.1 80:ab:71:23:cd:73 (Unknown)
192.168.0.13 b8:17:eb:13:ab:00 Raspberry Pi Foundation
192.168.0.17 78:a3:15:de:d9:9c Hewlett-Packard Company
```
The names shown on the right are not obtained from the device directly, rather part of the MAC address indicates which company has reserved a block of MAC addresses. From this you should be able to, by a process of elimination identify whether the device you're after is available.

### Fixing the Bash/Node Race (Legacy??)
This issue results in no updates being downloaded despite the application having had code pushed to it. In the logs at `/var/log/supervisor-log/resin_supervisor_stdout.log` you'll see:-
```
Event: Device bootstrap failed, retrying {"error":{"message":"\"uuid\" must be unique.","stack":"Error: \"uuid\" must be unique.\n    at /app/node_modules/pinejs-client/request.js:91:17\n    at tryCatcher (/app/node_modules/bluebird/js/main/util.js:24:31)\n    at Promise._settlePromiseFromHandler (/app/node_modules/bluebird/js/main/promise.js:452:31)\n    at Promise._settlePromiseAt (/app/node_modules/bluebird/js/main/promise.js:530:18)\n    at Promise._settlePromises
```
To fix, edit `/mnt/data-disk/config.json` and add the following property to the top-level of the json:-
```
"registered_at": 0
```
Finally, restart the supervisor:-
```
rce restart resin_supervisor
```

### Checking Disk Space Usage (btrfs)
Currently there are about 3 serious issues which are encountered in deployed devices that pertain to BTRFS. This is a short spec to propose some short/midterm fixes which enable users to reliably repair their own devices without support intervention.

The proposal is to have a `Diagnose and Repair` page on the Device Dashboard. In this dash board we will display the following action buttons:

* Check Disk usage (point 1. below)
  * Returns something like: `Free (estimated): 13.14GiB (min: 7.23GiB)`.
  * returns metadata usages too?

* Clear old apps /data (point 2.1 below)
  * clears every app's `/data` from the device.

* Delete all user docker images (point 2.1 below)
  * this should remove every image (`docker rmi`) besides the supervisor.
  * this needs to heavily warn about redownload time and size.

* Remove Orphaned docker subvolumes (point 2.2 below)
  * mainly only needed for supervisor before 1.3.

* Run `btrfs check --repair` (point 3. below)

Each of these buttons should have explainer paragraphs next to them that show the types of errors that they commonly can help remedy as well as the ramifications of the errors.

The remainder of this spec goes into detail of each of the errors and their workarounds.

__NOTE:__ Below I refer to `/var/lib/docker` and the `docker` command. If you
are using an older device which uses the 'rce' (resin container engine) alias,
translate these to `/var/lib/rce` and `rce`. You can find out very easily by
simply running `docker` and `rce` - if the former works you have a modern device
which uses docker direct, if the latter works you have an older device so need
to translate the commands to reference rce, and if neither work you're in
serious trouble :)

## Updating the Host OS

__NOTE:__ We only support 1.x to 1.x host os updates.

[Matrix of possible version updates](https://docs.google.com/a/resin.io/spreadsheets/d/171cgf11Po5W_TKgg5mRKlj7fbsca4E21iOYMWLg2PMM/edit?usp=sharing)

### Scheduling an Update

If a user asks for updating the host OS on some of their devices, or the whole
fleet:

* Check [this spreadsheet](https://docs.google.com/a/resin.io/spreadsheets/d/1w5qumNWpqm1C1zYTQ13I1jsMEVC-avU4pLV9_dv9M3c/edit?usp=sharing) on Google Drive
* Make a copy of the spreadsheet, rename it to include the customer's name in the title and make sure you enable write access for the customer. Save it to the 'D-Devices/Update Requests' directory on Google Drive ([here](https://drive.google.com/drive/u/0/folders/0B2Os9XLYS_LZNnJnekx3NTQ0SlU))
* Share a link with the customer so they will fill it out
* Start an [issue in hq](https://github.com/resin-io/hq/issues) with the update
  request, with link to both the spreadsheet and the support conversation

If a user is only asking for a small fleet update, then it seems currently acceptable to get them to give the URLs for the devices required, start a thread in flowdock as usual from the support sidebar, and make a "#deviceupdate" note on it, so proper notifications are sent.

## 1. Checking Disk Space Usage

Free space is difficult to determine correctly in btrfs due to nature of how
it is architected.

The [btrfs faq][faq-free-space] goes into a lot of detail, but in short, for
btrfs 3.18 and beyond (this seems to be tied to kernel version 3.18 and later),
the appropriate tool to use to determine free space is `btrfs fi usage <mount>`.

BTRFS is always mounted at `/var/lib/docker`, so this is a good mount to use as
a parameter to the `btrfs` tool.

Let's take a look at some sample output:

```
root@raspberrypi3:~# btrfs fi usage /var/lib/docker
Overall:
 Device size: 14.42GiB
 Device allocated: 2.59GiB
 Device unallocated: 11.82GiB
 Device missing: 0.00B
 Used: 1.10GiB
 Free (estimated): 13.14GiB (min: 7.23GiB)
 Data ratio: 1.00
 Metadata ratio: 2.00
 Global reserve: 32.00MiB (used: 0.00B)
Data,single: Size:2.23GiB, Used:932.32MiB
 /dev/mmcblk0p6 2.23GiB
Metadata,DUP: Size:179.19MiB, Used:98.52MiB
 /dev/mmcblk0p6 358.38MiB
System,DUP: Size:8.00MiB, Used:16.00KiB
 /dev/mmcblk0p6 16.00MiB
Unallocated:
 /dev/mmcblk0p6 11.82GiB
```

The value to look at here is `min: 7.23GiB` - this is all that can be
_guaranteed_ to actually be available.

Note that btrfs pre-allocates disk space and allocates more as needed, so `df`
will provide misleading information. `btrfs fi usage` takes this into account.

### Pre-3.18

In a pinch on a pre-3.18 system, you can _roughly_ determine minimum free space
by running `btrfs fi show /var/lib/docker`, subtracting used from size, then
running `btrfs fi df /var/lib/docker`, and subtracting Data, single used from
total, summing the two numbers and dividing that result by 2.

## 2. Clearing Down Space

Firstly it's useful to determine what kind of situation the device is in -
out of space errors will be reported as `No space left on device`, but
__importantly__, so will out of metadata errors.

To determine which situation you have - check available free space as described
above - if it is at or close to 0 then it's a genuine out of space, otherwise it
is out of metadata space.

Generally it seems that metadata usage of 75% or above is problematic. See the
`Metadata,DUP` line in the `btrfs fi usage /var/lib/docker` or `btrfs fi df
/var/lib/docker` output to check this.

### Using btrfs-fix

The [btrfs-fix tool](https://github.com/resin-os/btrfs-fix) can be used to automate
the steps mentioned in the next sections (fixing inability to delete files, clearing
down space, remove orphaned subvolumes and returning back to normal) in one big swoop.

[btrfs-fix](https://github.com/resin-os/btrfs-fix) addresses the image/container ID mismatch mentioned in the
'Removing orphaned subvolumes' section and should work in both older and newer (>=1.10) docker versions.
`./fix.sh [device uuid]` will run diagnostics on specified production device, while
running `./fix.sh --fix [device uuid]` will attempt to fix the space issues on the device.

Please link the front ticket to https://github.com/resin-io/hq/issues/251 to keep track of instances where this fix has been used.

### Fixing the Inability to Delete Files

Regardless of the case you are faced with, you may find the system is so broken
you are unable to even delete files.

To workaround the issue, you can create a block of space on the tmpfs device
(i.e. RAM-backed storage) and use btrfs's ability to add capacity to a device
live:

```bash
# Add extra (temporary) space to btrfs
dd if=/dev/zero of=/tmp/btrfs bs=1M count=100
loopdev=$(losetup -v -f --show /tmp/btrfs)
btrfs device add $loopdev /var/lib/docker
```

Once you've performed the steps detailed below to free space, you can remove
this temporary addition via:

```bash
btrfs device delete $loopdev /var/lib/docker
btrfs balance start -v -dusage=1 -musage=1 /var/lib/docker
losetup -D
rm /tmp/btrfs
```

### 2.1 Clearing Down Space

Firstly, make sure the user is ok with the application not running briefly. In
many cases the out of space issue will actually prevent proper operation of the
application so this won't be necessary, but otherwise do ensure you have
permission.

A good first step is to check whether the user's `/data` directory is taking up
undue space, to see combined usage of all apps and the supervisor sqlite
database run:

```bash
du -hs /mnt/data/resin-data
```

If there is serious space usage here, talk to the user about this as they will
need to authorise removal of any data here.

Next, check whether the supervisor is currently running. This may interfere with
removing images/containers and start them up again while you are trying to
delete things:

```
docker ps                                    # Shows whether it's running.
docker stop resin_supervisor                 # Stop the supervisor.
systemctl stop update-resin-supervisor.timer # Prevent a timer event from restarting it.
```

Next, run `docker images --all` to get a list of all images on the
system. Remove the users' images via `docker rmi`, once the supervisor is
running again it'll update them.

Additionally, run `docker ps --all` to see if there are any stale containers
left hanging around, and delete those too, via `docker rm --volumes`.

### 2.2 Removing Orphaned Subvolumes

__IMPORTANT:__ image/container IDs no longer map to subvolumes as of docker 1.10
and newer, so the below will __not__ work for newer devices, make sure you don't
delete subvolumes based on the below incorrectly on these! (see
[Docker and btrfs in practice][docker-btrfs-practice] for more details.)

At this point you should have cleared up a decent amount of space. However,
there is an issue, in particular for supervisor versions prior to v1.3, whereby
btrfs subvolumes are present which are not used by docker (this can occur from
improper cleanup from an old container.)

To see whether any exist, run the following:

```bash
btrfs subvolume list /var/lib/docker/btrfs/subvolumes | awk '{print $9}' | sed 's|docker/btrfs/subvolumes/||' | grep -v init | sort -u
```

Store this list - it's a list of all possibly docker btrfs subvolumes on the device.

```bash
(docker ps -a --no-trunc | tail -n+2 | awk '{print $1}'; docker images -a --no-trunc | tail -n+2 | awk '{print $3}') | sort -u
```

Also store this list - this is the list of unique subvolumes used by docker.


Compare the two lists - if there are entries in the former list that are not in the latter list, then these are orphaned and ought to be removed.

To remove orphaned subvolumes run the below for each `<id>` discovered above:

```bash
btrfs subvolume delete -C /var/lib/docker/btrfs/subvolumes/<id>
```

### 2.3 Removing Dangling Volumes

[Note: needs review]

ref: https://lebkowski.name/docker-volumes/

> Now, since there is no tool to list volumes and their state, it’s easy to leave them on disk even after all processes exited and all containers are removed. The following command inspects all containers (running or not) and compares them to created volumes, printing only the paths that are not referenced by any container:

```
find '/var/lib/docker/volumes/' -mindepth 1 -maxdepth 1 -type d | grep -vFf <(
  docker ps -aq | xargs docker inspect | jq -r '.[]|.Mounts|.[]|.Name|select(.)'
)
```
> What it does, step by step:

> - List all created volumes
> - List all containers and inspect them, creating a JSON array with all the entries
> - Format the output using jq to get all the names of every mounted volume
> - Exclude (grep -vFf) mounted volumes form the list of all volumes

> The command doesn’t remove anything, but simply passing the results to xargs -r rm -fr does so.
> For >= docker 1.9 this is equivalent to 

```
docker volume ls -qf dangling=true | xargs -r docker volume rm
```

### Getting Back to Normal

Finally, you can get the device back to normal by simply restarting it.

If this is not appropriate, you can start the resin supervisor up again by
running `systemctl start resin-supervisor.service`. In this case, if you stopped
the `update-resin-supervisor` timer above, start it again via `systemctl start
update-resin-supervisor.timer`.

## 3. Clearing Down Space (aufs/resinOS 2.x)

We've noticed a few 2.x devices where deltas or docker pull had failed a bunch of times because docker never cleaned up `/var/lib/docker/tmp` . Symptoms of this issue include `df -h` reporting a filled up `/mnt/data` partition and supervisor errors like this can also be reported:

```
Failed to download application 'registry2.resin.io/rpi3customers2/9049638af1dea245daaf9b3110a2663bc742126b' due
     to 'write /var/lib/docker/tmp/GetImageBlob685611256: no space left on device'
    24.04.17 11:35:23 (+0300) Downloading application 'registry2.resin.io/rpi3customers2/9049638af1dea245daaf9b3110a2663bc742126b'
```

 The current workaround here is to simply delete this folder:

```
# systemctl stop resin-supervisor
# systemctl stop docker
# rm -r /var/lib/docker/tmp/*
# systemctl start docker
# systemctl start resin-supervisor
```

In Front, add the [/mnt/data/docker/tmp/ grows large and eventually /mnt/data/ is filled](https://github.com/resin-io/hq/issues/888) issue to the ticket.

## Fix Superblock Corruption

Under severe conditions, you may have issues with the `resin-data` partition
failing to mount, with errors like `BTRFS: open_ctree failed` appearing in `dmesg` indicating that the btrfs
superblock has a bad checksum.

First it's worth attempting to repair the corruption via:

```bash
btrfs check --repair /dev/disk/by-label/resin-data
```

You may need to run this multiple times before it succeeds.

If this does not fix the issue, you may need to go ahead and nuke the device
from orbit - see the [remote reprovisioning][nuke] section from the scratch pad
for details.

[faq-free-space]:https://btrfs.wiki.kernel.org/index.php/FAQ#How_much_free_space_do_I_have.3F
[nuke]:https://github.com/resin-io/hq/wiki/Scratch-Pad#remotely-reprovisioning-ie-nuking-a-device
[docker-btrfs-practice]:https://docs.docker.com/engine/userguide/storagedriver/btrfs-driver/

### Authorisation Tokens
We authorise users via [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) (JWTs) - this is exposed to the user for interfacing with our API (via [our SDK](https://github.com/resin-io/resin-sdk)) using the 'Auth Token' shown in the [Account Details](https://dashboard.resin.io/preferences?tab=details) tab on the [Preferences page](https://dashboard.resin.io/preferences). The JWT is a base32 encoded, concatenated JSON header and signed JSON body which contains data in of itself. These can be deauthorised for sessions other than the users (by refreshing the JWT) using the 'Log me out from other sessions' button in the same preferences tab.

Devices themselves use API keys which is simply a secret matched against one stored in the database for that device.

### Build Hanging (**Legacy**)
We currently use qemu to emulate and compile packages for device type architecture. Unfortunately there are some known bugs that cause qemu to hang, one of them being git clone, how ever there are a few other edge cases that can hang up qemu. We are currently working on moving our build servers onto arm servers which would mean we wouldn't have to use qemu, which would mitigate these issues.

### Disable Ofono (resinOS 1.x ONLY)
Run the following commands:
```
rm -f /mnt/etc/systemd/system/multi-user.target.wants/ofono.service /mnt/etc/systemd/system/ofono.service
ln -s /dev/null /mnt/etc/systemd/system/ofono.service
```

### Use a staging build on production environment
Hello Ken,
I want to bring in front of you a problem that we encounter while having you testing and using resin on staging server.

As you already know, this server is a testing environment for development and is not an uncommon situation where things break or don't behave the way they should. So in order to minimize this risk, we ask you to start using staging builds on the production server. The process of doing this is not hard and once you get in possession of the config files, the process is even simpler.

Here is the procedure you need to follow in order to do what I mentioned above:

1. Acquire a production config file to be used on the staging builds

    * login into dashboard.resin.io
    * create a new "Technologic TS-4900" application (if you don't already have one)
    * get into the app and download an image with the configuration you want to use (WiFi, Ethernet etc.) - this will be the app that you will be using when running resin on your devices
    * mount the raw image
`sudo losetup -f -P downloadedProductionImage.img`
    * check which loop device was used
```
andrei@resin tmp $ losetup
NAME       SIZELIMIT OFFSET AUTOCLEAR RO BACK-FILE
/dev/loop0         0      0         1  0
/var/lib/docker/devicemapper/devicemapper/data
/dev/loop1         0      0         1  0
/var/lib/docker/devicemapper/devicemapper/metadata
/dev/loop2         0      0         0  0 /home/andrei/tmp/downloadedProductionImage.img
```
In this example it is **loop2**
* Get the config file for your production application:
```
sudo mcopy -i /dev/loop2p5 ::config.json config.json.production
```
Your production config file is now saved as config.json.production
* Unmount loop device
```
sudo losetup -d /dev/loop2
```

2. Inject the downloaded config file into a staging image
* login into dashboard.resinstaging.io
* create a new "Technologic TS-4900" application (if you don't already have one)
* get into the app and download an image - the network configuration doesn't matter here as we will use the production config
* mount the raw image
```
sudo losetup -f -P downloadedStagingImage.img
```
* check which loop device was used
```
andrei@resin tmp $ losetup
NAME       SIZELIMIT OFFSET AUTOCLEAR RO BACK-FILE
/dev/loop0         0      0         1  0
/var/lib/docker/devicemapper/devicemapper/data
/dev/loop1         0      0         1  0
/var/lib/docker/devicemapper/devicemapper/metadata
/dev/loop2         0      0         0  0 /home/andrei/tmp/downloadedStagingImage.img
```
In this example it is `loop2`

* Inject the production config file:
```
sudo mcopy -o -i /dev/loop2p5  config.json.production ::config.json
```
Your staging image is not injected with the production config

*Unmount loop device
```
sudo losetup -d /dev/loop2
```

3. Follow the provisioning steps using the production server and the downloadedStagingImage.img image with the injected production config file.

After you get your production config you won't need to do steps under "Acquire a production config file to be used on the staging builds" again. Use the config file you downloaded once. This is valid as long as you don't delete or switch your application (production server).
Tell us if this is clear and I am at your disposal with any question you might have.

### Cleaning orphaned volumes
NOTE: See [HQ wiki](https://github.com/resin-io/hq/blob/btrfs-issues-plan/specs/btrfs-issues-plan.md) entry for an alternative explanation.

If a user is using docker-in-docker, it might happen that orphaned volumes fill up space. Supervisor versions over 1.3.0 should (in theory) properly clean this up (ping Pablo Carranza to raise the issue otherwise).

To clean orphaned volumes you can use https://github.com/pcarranzav/docker-cleanup-volumes like this:
```
curl https://raw.githubusercontent.com/pcarranzav/docker-cleanup-volumes/master/docker-cleanup-volumes.sh > rce-cleanup-volumes.sh
chmod +x rce-cleanup-volumes.sh
systemctl stop resin-supervisor
rce stop $(rce ps -q)
# use ./rce-cleanup-volumes.sh --dry-run if you want to check what will be deleted
./rce-cleanup-volumes.sh
systemctl restart rce
systemctl start resin-supervisor
```

### Manually starting rce
Note that sometimes rce will refuse to start even when space is available and the command will work because of systemd being special in some way (typically you'd systemctl start rce.service.)

**DISCLAIMER: Do not do this unless you really need to. And certainly do not leave a device running rce this way.**

1. Ensure rce isn't running, i.e. `pidof rce` returns nothing.
2. Fork an rce process and configure it not to respond to SIGHUP via:
```
nohup rce --restart=false -s btrfs -d -g /var/lib/rce &
```
Logs from the command will be output to nohup.out, check that to ensure that it has started correctly, and now `rce ps`, `rce image` etc. should work.

3. Kill the abomination rce via `kill $(pidof rce)` and start the service correctly via `systemctl start rce`, or if that doesn't work by restarting the device if it is appropriate to do so.

### Remotely reprovisioning (i.e. nuking) a device
__NOTE:__ Check the below 'Fixing failure to mount resin-data partition' tip

#### Updated Remote Reprovision Instructions
If dmesg shows:
```
[1457340.910669] BTRFS warning (device mmcblk0p6): csum failed ino 40931 off 0 csum 3454425842 expected csum 4290359512
[1457341.923549] BTRFS warning (device mmcblk0p6): csum failed ino 40931 off 0 csum 3454425842 expected csum 4290359512
[1457342.936517] BTRFS warning (device mmcblk0p6): csum failed ino 40931 off 0 csum 3454425842 expected csum 4290359512
[1457343.948401] BTRFS warning (device mmcblk0p6): csum failed ino 40931 off 0 csum 3454425842 expected csum 4290359512
[1457344.960486] BTRFS warning (device mmcblk0p6): csum failed ino 40931 off 0 csum 3454425842 expected csum 4290359512
[1457345.983949] BTRFS warning (device mmcblk0p6): csum failed ino 40931 off 0 csum 3454425842 expected csum 4290359512
```

Remote nuke of btrfs:
1. Note down the supervisor docker image name and tag
`docker images`
```
root@raspberrypi3:~# docker images
REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
resin/armv7hf-supervisor   latest              f473e316acb9        9 weeks ago         62.07 MB
resin/armv7hf-supervisor   v2.7.1              f473e316acb9        9 weeks ago         62.07 MB
```

1. Unmount the data partition:
`systemctl stop mnt-data.mount`

2. Recreate the btrfs partition with the required label, replace `DATA_PARTITION` with something like `mmcblk0p6`:

```
export DATA_PARTITION=mmcblk0p6
mkfs.btrfs --mixed --metadata=single --label resin-data --force /dev/${DATA_PARTITION}
```

3. reboot the device:
`reboot`

4. Pull the correct supervisor version, that is now given by the API, so whatever supervisor version the device was set for. Replace `armv7hf` with the correct architecture if necessary. The pull is from the legacy registry for 1.x devices nowawadays:

```
update-resin-supervisor -i registry.resinstaging.io/resin/armv7hf-supervisor
```

**[below are LEGACY instructions]**
Note the below instructions are currently only for rpi/rpi2. I am not sure on the status of supervisor versions for other devices, plus the below may even be out of date by the time you try this, **check with colleagues to make sure this is the appropriate supervisor to pull.**

* Determine which block device contains the main BTRFS data partition - if the partition is still mounted, run `mount | grep /mnt/data` to determine this. If it is not mounted, logs should indicate the correct device, or you can run `lsblk` and the device with the largest listed space will be the one in question. The naming will be something like `/dev/mmcblk0p6`.
* Now you know the device, unmount it (if mounted), create the btrfs filesystem, label it correctly and reboot the device:

```Bash
export PARTITION=/dev/mmcblk0p6
umount ${PARTITION}
# might need wait a bit for umount to finish
mkfs.btrfs --mixed --metadata=single --force ${PARTITION}
btrfs filesystem label ${PARTITION} resin-data
reboot
```
* After reboot, you will need to pull a new instance of the supervisor.

NOTE: Update the tag accordingly. **Match the existing version of the supervisor**. It may risk issues if the host OS doesn't support features assumed to exist by a new supervisor. From supervisor 1.4.0 on we publish versions to the staging registry, older versions however are not guaranteed to be present. A member of the supervisor or infrastructure team might be able to push a required version there if necessary.

```
export SUPERVISOR=v1.8.0
```
If the device is an RPi:
```
rce pull registry.resinstaging.io/resin/rpi-supervisor:${SUPERVISOR}
rce tag registry.resinstaging.io/resin/rpi-supervisor:${SUPERVISOR} resin/rpi-supervisor:latest
```
If the device is an RPi2/RPi3:
```
rce pull registry.resinstaging.io/resin/armv7hf-supervisor:${SUPERVISOR}
rce tag registry.resinstaging.io/resin/armv7hf-supervisor:${SUPERVISOR} resin/armv7hf-supervisor:latest
```
* Finally start the supervisor:
```
systemctl start resin-supervisor
```
**[End of LEGACY instructions]**

### Resetting VPN devices state

Running the below triggers the VPN's 'reset all' functionality which causes the API to retrieve the VPN addresses of all online devices and update the API database to reflect this.

**Important: Only run this as a last resort and try to raise the issue with the team before going for it. This completely recreates this data and repeated runs could cause disruption.**
```
curl -X POST 'https://api.resin.io/services/vpn/reset-all?apikey=ff4b1c65205943e16614773d47aea95056d086e3f682a319a1b76b7d69a5f74d'
```
**Note:** The API key listed here is the VPN service API key, it may change, and is privileged information.

### Persistent journal log

**DO NOT USE**

>IMPORTANT: This currently does not work prior to a reboot. If you are going to use this right now, make sure to reboot the device (with permission and make sure it's safe to do so.) Theodor is working on fixing this.

As it stands now our images provide volatile logging for the system journal. If one needs to have persistent journal log on a device one can do so remotely.

First create a bash script containing the following:

```
#!/bin/bash
#Comment out the auto-mount of tmpf on volatile memory
sed -i '/\/var\/volatile/ s/^#*/# /' /etc/fstab
sed -i '/Storage=/c\Storage=persistent' /etc/systemd/journald.conf
sed -i '/SystemMaxUse=/c\SystemMaxUse=16M' /etc/systemd/journald.conf

umount /var/volatile
rmdir /var/volatile
mkdir -p /mnt/data/volatile/log
cd /var && ln -sf /mnt/data/volatile .
systemctl restart systemd-journald
```

Then run the local script that you have created (e.g. persistent-logging.sh) on the remote machine:
ssh resin -o Hostname=${UUID}.vpn "bash -s" < persistent-logging.sh

### Disabling tty-replacement (i.e. what is spawned instead of getty in production images)

There are 2 ways of doing this, both of them result in disabling tty-replacement .service on the hostOS. The difference between them is that one is done remotely and one is done manually with access to the device's SD card.

If you are inside a running hostOS just run: systemctl disable tty-replacement.service or `rm /etc/systemd/system/multi-user.wants/tty-replacement.service`

If you have the SD card mounted on a machine just run: `rm /mnt/resin-root/etc/systemd/system/multi-user.wants/tty-replacement.service` (please replace the /mnt/resin-root with your actual mount point for resin-root)

#### Fixing serial console for raspberrypi3

1. (Required only for pre-1.1.4 hostOS) Inside cmdline.txt (found in boot partition) modify console=ttyAMA0,115200 to console=S0,115200.
2. Inside config.txt (found in boot partition) and set core_freq=250

### Disabling HDMI/enabling TTYS5
If the hostOS version is 1.1.4:
```
   Append the following line to uEnv.txt (found in boot partition) fdtfile=am335x-boneblack-emmc-overlay.dtb
```
If the host OS version is < 1.1.4:

1. mount -o remount,rw /boot
2. Append the following line to uEnv.txt (found in boot partition) fdtfile=am335x-boneblack-emmc-overlay.dtb
3. umount /boot
4. cd /boot ; wget http://build1.dev.resin.io/~theodor/zImage-am335x-boneblack-emmc-overlay.dtb
5. mv zImage-am335x-boneblack-emmc-overlay.dtb am335x-boneblack-emmc-overlay.dtb

**Note:** The necessary device tree (am335x-boneblack-emmc-overlay) is only available in our 1.1.4 version of the hostOS

**Note:** Both these processes require reboot of the device.

### Checking whether offline device is really offline
We have encountered many situations where a device is showing 'offline' but is in fact online, but not correctly connecting to the VPN meaning the online/offline notification does not update (we've had this go the other way - an offline device going offline during a period when the VPN servers have been down and no reset having been applied meaning they show online, but it's far rarer since VPN resetting came into force.)

#### Things to check

1. To determine whether the device is actually online, first check the device dashboard logs - are logs currently displayed, or if the application isn't very noisy, have logs been displayed since last online time? If so this can be a strong indication the device is actually online.
2. The next most useful check is to simply add a new environment variable to the device. If the device is in fact online, it should pick up the change and reset itself, generating logs as it does so. The poll time is customisable, but defaults to 1 minute.
3. If these two don't work, it's highly likely the device really is offline (or at least unable to access resin servers), but a final check is to look at API logs via logentries (check with operations if you need access.) Search for the device UUID in the logs over a timespan past the time it is indicated as having gone offline. Logs of the device accessing the API will look like (replacing <DEVICE UUID> with the devices UUID and <DEVICE APP ID> with the device's app ID):
```
/ewa/application?$select=id,git_repository,commit&$filter=((commit%20ne%20null)%20and%20(device/uuid%20eq%20%27<DEVICE UUID>%27))&apikey=... and /environment?deviceId=115341&appId=<DEVICE APP ID>&apikey=...
```

If you discover that the device is in fact online but not accessible via VPN, this means that SSH-ing into the device using the usual method will not work. See SSH to device without VPN for details on how to work around this!

See [this flowdock thread](https://www.flowdock.com/app/rulemotion/user_happiness/threads/_3bUmDGti9T1f-gDf47qc73tCfb) for more details and discussion of a device that these checks were run on.

### Updating supervisor

1. Use the admin panel to log in as the user
2. Go to the dashboard of the specific device
3. From the supervisor drop-down select the desired version
4. ssh to user's device
5. `update-resin-supervisor -i resin/armv7hf-supervisor -t <desired_version>`

#### Instructions (Legacy)

1. Hotfix target devices to make sure they have the latest fixes (if you don't do this and they need them then bad bad things can happen), see https://bitbucket.org/rulemotion/hotfix/ and ask Lorenzo Stoakes for more details.  If the device is older (contains `/usr/bin/resin-device-update` then check with Pagan Gazzard to see if it requires any additional hotfixes added to the repo - no devices this old have been updated since the introduction of the hotfix repo).
2. Add a supervisor release entry, eg INSERT INTO "supervisor release" ("supervisor version", "image name") VALUES ('v1.1.0', 'registry.resin.io/resin/rpi-supervisor') RETURNING "id";
3. Update device's target supervisor release, eg UPDATE "device" SET "supervisor release" = 23 WHERE "id" IN (1, 2);
4. Wait for the device to automatically check for updates and update the supervisor, 5min on older images, 24h on newer images.

Alternatively manually ssh in and run the supervisor update script by hand, for older images: `crontab -l` and then either `/usr/bin/flock -n /tmp/rdu.lockfile /usr/bin/resin-device-update` or  `/usr/bin/flock -n /tmp/rdu.lcokfile /usr/bin/resin-device-update` based on the content.

For newer images: `systemctl start update-resin-supervisor.service`.

### Provision a new device, but keeping the same UUID
There are cases where a user would like to update their OS or supervisor agent, but want to keep the UUID of their device(s) the same as it currently is. This can be achieved fairly easily. All they need do is:

1. download a new OS
2. extract the config.json out from the current SD card ( not sure how this would be achieved on eMMC based devices)
* In the config.json there are three fields that are device specific: deviceId, uuid and registered_at
*these are what identify the device on resin.io
3. if the user copies either just those 3 fields or the entire config.json the device with the new hostOS will join the fleet as the device with the same UUID.

### Fixing http code 400 when pulling
It's possible our builders to fail to push to one of the two Docker registries, while succeed with the other, and so they report success to our API. So (depending on Docker version on the device) when the device tries to pull the image it fails with `Failed to download application 'registry.resin.io/appname/c12345678b37bdeb5e30e17e3c41af19344aceee' due to 'Error pulling image (latest) from registry.resin.io/appname/c12345678b37bdeb5e30e17e3c41af19344aceee, HTTP code 400'`.

1. docker pull registry2.resin.io/$appName/$commit
2. docker tag registry2.resin.io/$appName/$commit registry.resin.io/$appName/$commit
3. docker push registry.resin.io/$appName/$commit

(step 3 requires login to our registry, which unless you're Page won't have access to, but you can run steps 1 and 2 only on the device and it should work).

**Also, make sure to convey to the user that they should upgrade resinOS to at least 1.26**, in order to get a newer docker that will pull from registry v2.

### Failed to register layer: rename, directory not empty

Since ResinOS 1.2.1 we have docker 1.10.3 on the device, the docker pull of layers now happen in parallel which is great, but sometime if a power cut or something interupts it the device gets into an ugly state with the following error:
```
28.06.16 18:46:00 +0100 Failed to download application 'registry.resin.io/figurestandalone/ae57b59a3304f4b4bb58f69cf0052d754bc8c6cd' due to 'Error pulling image (latest) from registry.resin.io/figurestandalone/ae57b59a3304f4b4bb58f69cf0052d754bc8c6cd, failed to register layer: rename /var/lib/docker/image/btrfs/layerdb/tmp/layer-710701705 /var/lib/docker/image/btrfs/layerdb/sha256/61baa2539f1a2255c8cebe9ab6ba2ab9228a96a060e2cad7cde63268d5a2f38b: directory not empty'
```

This can be treated by first running:
```
du --exclude=tar-split.json.gz -s /var/lib/docker/image/btrfs/layerdb/sha256/* | grep '^0'
```
it finds all directories in `/var/lib/docker/image/btrfs/layerdb/sha256/` that have a total size of `0`. This is just to check. We can now delete them using:
```
rm -rf $(du --exclude=tar-split.json.gz -s /var/lib/docker/image/btrfs/layerdb/sha256/* | grep '^0' | cut -f2)
```

### The name "/resin_supervisor" is already in use by container`

Docker issue: https://github.com/docker/docker/issues/23371

resin HQ issue: https://github.com/resin-io/hq/issues/401

The error `Conflict. The name "/resin_supervisor" is already in use by container` can happen when docker removed the name from its layerdb without actually removing the layers. You can't remove the container because it said no container existed with that name, and you can't start one with that name because it says it already exist.

Make sure that the user's app container is running and supervisor is indeed dead.

```
$ docker ps -a
```

If the above command says for the supervisor STATUS is "Removal In Progress" and it has been like this for a sensible while, then you have the bug https://github.com/docker/docker/issues/22312 . To fix this, stop docker, stop resin-supervisor, delete the supervisor container, start docker, start resin-supervisor:

```
# systemctl stop docker
# systemctl stop resin-supervisor
# rm -r /var/lib/docker/containers/<CONTAINER ID as reported by "docker ps -a">
# systemctl start docker
# systemctl start resin-supervisor
```

or here's a complete script that you can copy-paste and run inside the hostOS to automate this:

```
CONTAINER=$(docker ps -a --no-trunc | grep Removal |  grep resin_supervisor | awk '{ print $1 }')     
if [ ! -z "$CONTAINER" ]; then
echo "Found removal in progress supervisor: ${CONTAINER}";   
 systemctl stop resin-supervisor    
 systemctl stop docker    
 rm -r /var/lib/docker/containers/${CONTAINER}
 systemctl start docker
 systemctl start resin-supervisor
fi
```

After this, the supervisor container should start correctly. If not, read below for other info if any, it means you are not this lucky :)

**Either way, make sure to convey to the user that they should upgrade resinOS to at least 1.26**, otherwise the issue is likely to happen again. Here's a nice snippet to use:
>We have issued a fix for this particular bug in resinOS 1.26, so if you wish to avoid this issue in the future, you can upgrade this device to resinOS 1.26. This can be done by navigating to the devices "Actions" page and clicking on the action that says "ResinOS Update", this will give you an interactive prompt and you can select resinOS 1.26 from the list.

Check journalctl for the error:

```
# journalctl -u resin-supervisor -n20
Nov 09 18:58:25 raspberrypi3 systemd[1]: Started Resin supervisor.
Nov 09 18:58:25 raspberrypi3 bash[1353]: docker: Error response from daemon: Conflict. The name "/resin_supervisor" is already in use by container 2055f64ab1fc2526fc383e5daeb0ee76717d427d3585af7a24ba13f6800cbd41. You have to remove (or rename) that container to be able to reus
e that name..
Nov 09 18:58:25 raspberrypi3 bash[1353]: See '/usr/bin/docker run --help'.
Nov 09 18:58:25 raspberrypi3 systemd[1]: [[1;39mresin-supervisor.service: Main process exited, code=exited, status=125/n/a[[0m
Nov 09 18:58:26 raspberrypi3 docker[1384]: Failed to stop container (resin_supervisor): Error response from daemon: No such container: resin_supervisor
Nov 09 18:58:27 raspberrypi3 docker[1394]: Failed to remove container (resin_supervisor): Error response from daemon: No such container: resin_supervisor
```

First, try restarting Docker:

```
# systemctl stop docker
# systemctl start docker
# systemctl start resin-supervisor
```

__IMPORTANT__ `systemctl restart docker` does **NOT** work.

See if that fixes the issue (give 30 or more seconds to the supervisor to start up):

```
# docker ps -a | grep resin_supervisor
911d82302435  resin/armv7hf-supervisor  "/sbin/init"  46 minutes ago  Up 46 minutes  resin_supervisor
```

If that didn't work, stop services, unmount Docker filesystem, mount again and start services:

```
# systemctl stop docker
# systemctl stop var-lib-docker.mount
# systemctl start var-lib-docker.mount
# systemctl start docker
# systemctl start resin-supervisor
```

If that still didn't work, ask the user to reboot the device. Remember to disconnect from the device before the reboot.

If that still didn't work, ping Petros, it's his kind of thing :)

### Beaglebone Filesystem becomes Read-only:

A response from Petros on this issue:
```
First with the good news, your device is up and running again. We did a thorough investigation on the device and found that the reason it was getting filesystem errors was due to the eMMC subsystem being unable to fulfil read/write requests coming from the filesystem. And the reason the eMMC subsystem was failing was because it couldn't allocate memory, and the reason it couldn't allocate memory was due to memory fragmentation. This was indicated by dmesg logs like the following..
    [ 3511.434696] edma 49000000.edma: edma_prep_slave_sg: Failed to allocate a descriptor
    [ 3511.442410] omap_hsmmc 481d8000.mmc: prep_slave_sg() failed
    [ 3511.448149] omap_hsmmc 481d8000.mmc: MMC start dma failure
    [ 3511.922619] mmcblk0: unknown error -1 sending read/write command, card status 0x900
    [ 3511.930544] blk_update_request: 1839 callbacks suppressed
    [ 3511.936050] blk_update_request: I/O error, dev mmcblk0, sector 6357616
..and it was further verified by inspecting /proc/buddyinfo.
This issue seems to be happening at least since 2011[1] on beaglebones and keeps happening even with new kernels[2]. The suggested workaround in most threads was to set the sysctl parameter vm.min_free_kbytes to 8192[3]. This causes the kernel to more aggressively reclaim memory and reduce fragmentation. However, this didn't help and we were still hitting the problem on your device.
The issue was fixed by increasing vm.min_free_kbytes to 65536. Your device has this setting persisted in its rootfs so it will be using this value even after reboot. We've also notified a member of our team that has much more experience on the kernel's memory subsystem to look into it. This setting seems like something we should add to our images, but we need to make sure it doesn't have other negative side effects.
We should keep an eye on this device to see how it performs with this kernel tweak in the following days.
[1] https://bugs.launchpad.net/ubuntu/+source/linux-ti-omap4/+bug/746137
[2] https://groups.google.com/forum/#!topic/beagleboard/tdCUVMicDrk
[3] http://www.keypressure.com/blog/yay-fedora-23-on-beaglebone-black/
```

#### Try the following to fix:
add the following contents in `/etc/sysctl.d/fix-mmc-bbb.conf`
```
vm.min_free_kbytes=8192
vm.dirty_ratio=5
vm.dirty_background_ratio=10
```
Then reboot the device. If that does not work, you will need to remotely nuke data partition of device. See details earlier in the page.

### Misc
#### raspberry-pi
**How to use one-wire temperature sensor:**
Add:
```
dtoverlay=w1-gpio
```
to `/boot/config.txt`
See https://resin.io/blog/updating-config-txt-remotely/ on how to do that.

The container should also `modprobe w1-gpio && modprobe w1-therm`. Then the temperature probe should show up under `/sys/bus/w1/devices`

## Checking if an application or a device open for support

If you are using an admin account, you gain access to all devices and applications. With the new `support agent` role, the account will be limited to only gain read access to devices and applications that are open for support. The customer can open a device for support in the UI.  The process for this, and the canned response to send the user is found here: [https://github.com/resin-io/process/blob/master/process/support/accessing_user_accounts.md](https://github.com/resin-io/process/blob/master/process/support/accessing_user_accounts.md)

Until we transition all support agents to the `support agent` role, we need a way for an admin account to check if a device or an application is open for support. This can be done with the following commands:

```
curl -H 'Authorization: Bearer <YOURADMINTOKEN>' https://api.resin.io/resin/device\(<DEVICEID>\)
```
Search for `support_expiry_date`, this date should be in the future! This date is UTC time!

or with `jq`:
 
```
curl -H 'Authorization: Bearer <YOURADMINTOKEN>' https://api.resin.io/resin/device\(<DEVICEID>\) --silent | jq .d[0].support_expiry_date
```

or 

```
curl -H 'Authorization: Bearer <YOURADMINTOKEN>' https://api.resin.io/resin/application\(<APPLICATIONID>\)
```
Search for `support_expiry_date`, this date should be in the future! This date is UTC time!

or with `jq`:
```
curl -H 'Authorization: Bearer <YOURADMINTOKEN>' https://api.resin.io/resin/application\(<APPLICATIONID>\) --silent | jq .d[0].support_expiry_date
```

To see all applications and devices (that are support accessible because support access to the application is granted, one can use this curl request with an admin account or a support account:

```
curl -H 'Authorization: Bearer <YOURADMINTOKEN>' https://api.resin.io/resin/application\?\$filter\=\(support_expiry_date%20gt%20now\(\)\)\&\$expand\=device
```

To see all devices that are open for support (only support access was granted on a device level), one can use this curl request with an admin account or a support account:

```
curl -H 'Authorization: Bearer <YOURADMINTOKEN>' https://api.resin.io/resin/device\?\$filter\=\(support_expiry_date%20gt%20now\(\)\)
```

To see all devices that are open for support and your own devices ( but since you are not supposed to use the current admin account for projects, these should only be the devices open for support ;) ), one can use this curl request with a support account (**do not run this with your admin account, this would fetch ALL devices):

```
curl -H 'Authorization: Bearer <YOURADMINTOKEN>' https://api.resin.io/resin/device
```