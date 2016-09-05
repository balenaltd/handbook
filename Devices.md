
Devices
=======

By default, the DevEnv sets the `DEVELOPMENT` Envvar for the Image Maker service (`img` section in the `fig.yml`), which retrieves the list of currently supported devices from the Staging environment, should there be no locally stored device OS images. Created applications can still be built, but you will not be able to download OS images from the Dashboard/`resin` CLI tool.

This can be useful for developing services when interaction with real devices is not required.

However, should a developer want to actually use the Devenv as a self-contained Resin.io on their development machine and LAN with real devices, they can use the `import-images` tool to achieve this.

# Adding Devices

## Via `import-images` Tool

By far the easiest way to get devices working with the Devenv is the `import-images` tool, whose purpose is to allow the interaction of real devices with the Devenv with very little input from a developer. This is located in the `resin-containers` repo in the `/home/vagrant/resin/tools/import-images` directory when SSHd into the Devenv VM (which is where the tool should be run from). Be sure to issue `npm install` in the tool's directory before first use.

It carries out two types of operation:

1. The import of selected device (slug) OS images to be installed in the Devenv, so that they may be served by the Dashboard/`resin` CLI tool.
2. *Should the type of device support it*, the modification of device OS images so they can automatically find the Devenv based on the IP address of the host running it, and bypass SSH key requirements (by squashing `Dropbear`'s requirements for logging into a device).

These operations can be used separately or combined. This allows some flexbility. Here's a couple of scenarios:

* A developer is working on device code, and wants to ensure that it's usable from the Resin.io service. They have no desire to be able to download the image from the Devenv, but they would like to ensure it connects, can be `ssh`d into, `sync`d to, etc. They can build their Yocto image and then instruct the `import-images` tool to inject the changes needed to be able to route to the Devenv and to allow keyless login. They can then flash this image to appropriate media, along with a generated `config.json` that's been built from the `resin` CLI tool with an App created in the Devenv. The device will then boot, connect to the Devenv and be usable as per normal.

* A developer is working on a backend service. They want to ensure that devices are still work with the system, OS images are still served, etc. They decide to import a couple of different device type images. When changes are made, they can now download the OS images for those devices, boot devices with them and now see them working in the Devenv.

Using the tool is fairly simple. It allows the import of a custom image (which is given as a file), or pre-built images stored on Jenkins or in a particular Amazon S3 bucket. For each image, the device type (slug type) is specified so that the import can make sensible decisions about the image.

For the first given scenario above, the developer may have a `resin.img` that a Yocto build has produced for, say, an RPi. To just inject it with the relevant information to communicate with the Devenv but not produce a downloadable OS image and therefore, rely on the default device list from Staging, they would run:

    ./import-images.coffee -q /home/vagrant/tmp/resin-v.img -s raspberrypi3 -n 192.168.1.169

The image will now be usable by, for example, the `resin` CLI tool for initialising appropriate media with. It will require an appropriate App config, however, to ensure it can be associated with the correct App and the Devenv. It will also now communicate with the Devenv and show up as per normal.

**Note:** The `-n` flag denotes the IP address of the host running the Devenv VM. The IP address of the host's external 'internet' interface can be used (NIC name changes depending on host platform), but the easiest way is to use the `eth2` address from within the Vagrant VM. You can find this by running `ifconfig eth2`.

For the second scenario, a developer would import the slug OS image. To import a single slug type from Jenkins, a developer might run the following:

    ./import-images.coffee -J "hedley:fubar" -j -s raspberrypi3 -n 192.168.1.169

This will automatically import the last successfully built slug image on Jenkins into the Devenv, inject the relevant tools required for communicating with it and then prepare the image for download from the Devenv. It will also make relevant changes to the `fig.yml` and restart the appropriate services. An OS image can now be downloaded from within the Dashboard or from the `resin` CLI tool and used in exactly the same way as on Staging or Production.


The `import-images` tool has a variety of options that should cater for most developers, including the alteration of stored image location, version numbering, Jenkins/S3 job/version picking, development and image preparation toggling and also a custom configuration file format should a developer want to process multiple different slug types from different sources repeatedly.

See the `README.md` in the `tools/import-images` directory for a more detailed explanation and option list.

**Important Note**: When the tool is used to import images as opposed to just injecting them with enough information to communicate with the Devenv, the Image Maker will no longer retrieve the list of all currently supported devices from Staging. This means that you will only be able to see and work with those device types imported.

## Via Supervisor

Currently from comments on Confluence page, written by Pagan:

```
Set up config

Edit tools/dind/config.json to contain the values for a staging config.json.
Start the supervisor instance

make ARCH=i386 run-supervisor

View the containers logs

logs supervisor -f

View the supervisor logs

enter supervisor
tail /var/log/supervisor-log/resin_supervisor_stdout.log -f
```

## Via a Reprovision from Staging

**Note: -->** Don't think this works any more due to differences between `systemd` and `System V`, kept for posterity until someone can get round to verifying it.**<--**

This is allegedly a little out of date, as related in this Flowdock [conversation](https://www.flowdock.com/app/rulemotion/resin-starters/threads/br0253uDAJEsHQOXPiyKShh5MVT). It may or may not work.

1. Copy the `tools/make-dev-device.sh` script onto your device (eg. by sshing into it and using nano to paste it in)
2. Make the script executable: `chmod +x make-dev-device.sh`
3. Check out the options: `./make-dev-device.sh -h`
4. Run the script

eg.
For using as dev device connected to staging:

    HOSTNAME=staging EDITOR=/usr/bin/nano ./make-dev-device

For using as dev device connected to the dev env:

    DEV_IP=192.168.2.15 API_ENDPOINT=http://api.resindev.io REGISTRY_ENDPOINT=registry.resindev.io HOSTNAME=dev EDITOR=/usr/bin/nano ./make-dev-device
    API_KEY=$DEV_API_KEY USER_ID=$DEV_USER_ID USERNAME=$DEV_USERNAME APPLICATION_ID=$DEV_APPLICATION_ID reprovision-device

## Via the DIY Method

**Note: -->** The below is, more or less, what the `import-images` tool does, and is kept for understanding what's going on under the hood.**<--**

If you've generated your own image, you can use write that to a device and then use it from the Devenv by following fewer steps than that for using all generated images. This will not allow you to download device OS images, but will allow your device to communicate with the Devenv.

1. Clone and start the Devenv as detailed above, with no changes.
2. Take your custom OS image, and find the first Linux partition, which holds the FS:

        fdisk -l resin.img

            Device Boot      Start         End      Blocks   Id  System
        resin.img1   *        8192       90111       40960    c  W95 FAT32 (LBA)
        resin.img2           90112      458751      184320   83  Linux
        resin.img3          458752      827391      184320   83  Linux
        resin.img4          827392     2981887     1077248    f  W95 Ext'd (LBA)
        resin.img5          835584      876543       20480    c  W95 FAT32 (LBA)
        resin.img6          884736     2981887     1048576   83  Linux
3. Mount the partition locally (assuming you've created a mount point, eg. `/mnt/resin`):

        sudo mount -o rw,loop,offset=$(( 90112 * 512)) resin.img /mnt/resinimage/
4. Now edit the following files (**ensure that you edit the correct file, eg. `/mnt/resinimage/etc/default/dropbear`, and not your local versions!**):
    * `/mnt/resinimage/etc/default/dropbear:`

        `DROPBEAR_EXTRA_ARGS="-B"`

    * `/mnt/resinimage/etc/shadow`

    Remove the second column from the `root` entry, eg:

    `root:*:17011:0:99999:7:::`

    to

    `root::17011:0:99999:7:::`
5. Add the following files, along with their contents:

    * `/mnt/resinimage/lib/systemd/system/resin-devenv.service`

            [Unit]
            Description=Resin Devenv Configure service
            After=resin-supervisor.service

            [Service]
            ExecStart=/bin/bash /usr/bin/resin-devenv-config
            Type=oneshot
            RemainAfterExit=yes

            [Install]
            WantedBy=multi-user.target

    * `/mnt/resinimage/usr/bin/resin-devenv-config`

            #
            # resin-devenv-config
            # ----------------
            #
            # Script which adds a route to a target Devenv environment
            #

            set -e

            route add -net 10.10.10.0 netmask 255.255.255.0 gw <Host IP for Devenv> dev eth0

    Ensure that you fill in the correct host IP for the Devenv machine to route to.
6. Create a systemd symlink to start the routing service on startup:

        ln -s /mnt/resinimage/lib/systemd/system/resin-devenv.service /mnt/resinimage/etc/systemd/system/multi-user.target.wants/

7. Unmount the image:

        sudo umount /mnt/resinimage

8. Write the image to your device. You can do this using `resin os initialize --type <slugName>` (make sure you've logged into the Devenv Dashboard first using `resin login`):

        RESINRC_RESIN_URL=resindev.io resin os initialize --type <slugName>

9. Create a custom config for the Application you want to use the device with:

        RESINRC_RESIN_URL=resindev.io resin config generate --type <slugName> --output myConfig.json

10. Alter the `myConfig.json` so that the `vpnEndpoint` key value is `10.10.10.10`

11. Write the config to your device:

        RESINRC_RESIN_URL=resindev.io resin config inject myConfig.json --type <slugName>

You now have a device running a custom image and config that will communicate correctly with the Devenv. You can use the Dashboard and `resin` command as per normal.

There is work currently in the pipeline to automate all of these steps using a tool within the Devenv framework.

## Via Config Change only

If you've created an App in the Devenv and just want to quickly see a device run it, you can do so without modifying the device at all. Simply load the config appropriate for the Devenv app onto the device and then attach to your network. However, you will have to encourage it to find the Devenv (at IP 10.10.10.10). The following should allow you to do this.

1. Ensure that the machine you're running the DevEnv on has port forwarding enabled. You can do this in OSX and Linux via the `sysctl` command:

* OSX: `sudo sysctl -w net.inet.ip.forwarding=1`
* Linux: `sudo system -w net.ipv4.ip_forward=1`
2. Ensure you have a route setup in your network that forwards the traffic for `10.10.10.0` onto the machine where the DevEnv is. Most routers will allow a static entry that allows you to map a specified machine as a gateway for a destination, eg.:

        Destination: 10.10.10.0
        Netmask: 255.255.255.0
        Gateway: 192.168.1.170

Now, any traffic seen for `10.10.10.10` will automatically be routed to `192.168.1.170` (the Devenv host) where the vagrant machine will handle it.

# Deprecated Database Method

This details how the addition of devices used to occur in the Devenv, using a very manual method to alter the underlying DB. This is documented for posterity, should there be a particular need for it.

## Adding a New Application

Creating a new Application requires a known, valid device type. However, this requires that the registry of valid images is required, and this requires the `resin-image-maker` to be fully cloned or the DEVELOPMENT Envvar set. Usually images are declared in `/images` in the `img` container, but there aren't any. So, we're going to create our own app and device manually.

Get your favourite PostgresSQL client (I'm using Postico for OSX, https://eggerapps.at/postico/) and connect to the DB:

    Host: db.resindev.io
    User: docker
    Password: docker

Now find the `application` table in the `resin` DB, and add a new row with data similar to the following:

    2016-07-14 15:45:23.012345	2	testApp	1	raspberry-pi2	1.2.3.4	80	heds/testapp

Take note of the second parameter (2), this is the User ID and needs to be copied from the `user` table for your user (you'll find it in the `id` column). The fourth parameter (1) is the application ID. You'll need this in a minute.

If you now login to the dashboard and select Applications, you'll see the app you just added.

## Adding a New 'Device'

You can also add a new 'device' once an Application has been created. Go to the `device` table, again in the `resin` DB (which was created once a new app had been added). Add something similar to the following row:

    2016-07-14 16:00:23.012345	1	abcdef1234	testDevice		raspberry-pi2	1	2	0

This will now show up in both the Dashboard and from the `resin` CLI tool. Of course, as it's just an entry in a table, it won't actually be usable.