Devices
=======

To poke about in the guts of the system, it's useful to have some dummy data in it. Once the DevEnv is up and running, you can login to the system at https://dashboard.resinio.dev

By default, the DevEnv sets the `DEVELOPMENT` Envvar which serves up dummy devices. There are no OS images for these devices however, so you can't download any. Created applications can still be built.

To add Devices, see the 'Adding Devices' section below.

# Adding a New Application

Creating a new Application requires a known, valid device type. However, this requires that the registry of valid images is required, and this requires the `resin-image-maker` to be fully cloned or the DEVELOPMENT Envvar set. Usually images are declared in `/images` in the `img` container, but there aren't any. So, we're going to create our own app and device manually.

Get your favourite PostgresSQL client (I'm using Postico for OSX, https://eggerapps.at/postico/) and connect to the DB:

    Host: db.resindev.io
    User: docker
    Password: docker

Now find the `application` table in the `resin` DB, and add a new row with data similar to the following:

    2016-07-14 15:45:23.012345	2	testApp	1	raspberry-pi2	1.2.3.4	80	heds/testapp

Take note of the second parameter (2), this is the User ID and needs to be copied from the `user` table for your user (you'll find it in the `id` column). The fourth parameter (1) is the application ID. You'll need this in a minute.

If you now login to the dashboard and select Applications, you'll see the app you just added.

# Adding Devices

## Via DB

You can also add a new device once an Application has been created. Go to the `device` table, again in the `resin` DB (which was created once a new app had been added). Add something similar to the following row:

    2016-07-14 16:00:23.012345	1	abcdef1234	testDevice		raspberry-pi2	1	2	0

## Via Supervisor
TBD

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

## A Real Device

There are a couple of ways to achieve this.

* One requires a device provisioned on the Staging environment and its reprovisioning.
* One requires the download of the full `resin-img:master` container (this is very large).

### Reprovision from Staging

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

### Using Real Images in `resin-img:master`

This one requires a lot of space and, depending on the speed of your net connection, a little patience. The advantage of this one is that you can carry out the whole 'Create Application -> Download OS Image -> Push Application' flow directly from the DevEnv, emulating it as if it were on Staging or Production.

1. Clone a new version of the `resin-containers` repo:

    git clone https://github.com/resin-io/resin-containers.git
2. Get a repackaged version of the Ubuntu Vivid vagrant box [here](https://drive.google.com/open?id=0B0xOid60TZZAeXIzVDl6Yjl1MVU). Put it somewhere useful, and remember the path to it. This box is simply a repackaged version of the  ubuntu-15.04-server-amd64.iso which has been given a 140GB disk instead of a 40GB disk (don't worry, it's a dynamically sized VDD, it won't swallow 140GB of disk).
3. Edit the `Vagrantfile` in the root of the `resin-containers` project, change:

    	config.vm.box = 'ubuntu_vivid'
    	config.vm.box_url = 'https://cloud-images.ubuntu.com/vagrant/vivid/current/vivid-server-cloudimg-amd64-vagrant-disk1.box'

   to:

        config.vm.box = 'ubuntu_vivid-140GB'
        config.vm.box_url = 'file:///path/to/the/ubuntu-15.04-server-amd64-140GB.box'
4. Do `vagrant up` as per normal.
5. Once running, alter the `fig.yml` changing the line:
        image: resin/resin-img:master-slim
    to:
        image: resin/resin-img:master

   Also change the line:

        - DEVELOPMENT=1
   to:   

        - DEVELOPMENT=0
6. Carry out `fig kill img && fig pull img`. Wait. A. While.

If you now restart the `img` service, you'll get a list of the current real OS images for every supported device. However, we want to be able to connect a real device, download the OS image for it and then push applications to it. To do this, you'll also need to change the config that's written to each device when the OS image s downloaded. This is pretty simple, but requires altering the `resin-image-maker` source:

1. Clone the `resin-image-maker` source:

        cd src
        git clone https://github.com/resin-io/resin-image-maker.git
        mv resin-image-maker img
        cd img
        npm install
2. Alter `fig.yml`, uncommenting the following line in the `img` services block:

        - ./src/img:/usr/src/app
3. Now fire up your favourite editor and edit the `img/src/operations/configure.coffee` script, altering:

        exports.execute = (operation) ->
        	Promise.try ->
        		if not operation.data

    to:

        exports.execute = (operation) ->
        	operation.data.vpnEndpoint = '10.10.10.10'

        	Promise.try ->
        		if not operation.data
4. Restart the `img` service:

    fig kill img && fig rm -f img && fig up -d img

This will ensure that for every downloaded OS image, the VPN now points to the DevEnv host. Ideally this should end up being a patch given the `DEVELOPMENT` Envvar, but work's being continued to get a process in place before submitting one.

You should now be able to download the OS image for your chosen real device which will attempt to talk to the DevEnv.

**HOWEVER!** You'll probably need to do some extra work to make this happen in your local network, though (unless your development machine is also your router). Assuming that the network/internet exposed interface of the host machine has an IP of `192.168.1.170`:

1. Ensure that the machine you're running the DevEnv on has port forwarding enabled. You can do this in OSX and Linux via the `sysctl` command:

* OSX: `sudo sysctl -w net.inet.ip.forwarding=1`
* Linux: `sudo system -w net.ipv4.ip_forward=1`
2. Ensure you have a route setup in your network that forwards the traffic for `10.10.10.0` onto the machine where the DevEnv is. Most routers will allow a static entry that allows you to map a specified machine as a gateway for a destination, eg.:

        Destination: 10.10.10.0
        Netmask: 255.255.255.0
        Gateway: 192.168.1.170

    If your router is one of these awful Telecom supplied boxes, your final option is to update the routing table from within the produced OS image you download.
    **TBD**


Now, any traffic seen for `10.10.10.10` will automatically be routed to `192.168.1.170` where the vagrant machine will handle it.

### Using Custom Generated Images

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

### Using Only Specific Device Images

Ideally we want to not have to download what ends up being tens of gigs of compressed data, and instead use device OS images specifically useful to the developer. We can grab this data from any built device image (or Jenkins), as long as the metadata accompanies it.

TBD
