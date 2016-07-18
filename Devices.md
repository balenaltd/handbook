Devices
=======

To poke about in the guts of the system, it's useful to have some dummy data in it. Once the DevEnv is up and running, you can login to the system at https://dashboard.resinio.dev

By default, without cloning the `resin-img` repo (see the setup guide [here](https://github.com/resin-io/hq/wiki/Setting-up-the-Development-Environment), you'll not be able to create an App via the Dashboard or CLI. If you don't want (or can't) clone the API and re-run the `img` container, you can do the following to add a new Application and Device (you need at least one Application in the system before you can create a Device).

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

# Adding a New Device

## Via DB

You can also add a new device now (previously the `device` table did not exist). Go to the `device` table, again in the `resin` DB (which was created once a new app had been added). Add something similar to the following row:

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
TBD
