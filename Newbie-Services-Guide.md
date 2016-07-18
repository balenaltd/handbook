A Newbie Guide To Resin.io Services
===================================

This guide is a whistlestop tour of the backend services behind Resin.io system. It's been written by a newbie for newbies, after digging through the code and asking questions of the team.

Its aim is to try and get new engineers up to speed a bit more quickly. As such, it includes a few tips and suggestions to quickly get the Development Environment running, and then some places to look in the code for several services to understand what happens underneath.

There will be bits that are incorrect. I'm trusting in the will of the hivemind to correct it. :)

The guide has a few caveats:

1. You have access to all of the Resin.io repos
2. You've cloned the Development Environment (https://github.com/resin-io/resin-containers.git)
3. You're familiar with the basics of:
    * [Docker](https://docs.docker.com/) (containers, how to run them, how they work)
    * [Node.js](https://nodejs.org/en/) (and also how [Express](https://expressjs.com/) works)
    * [systemd](https://www.freedesktop.org/wiki/Software/systemd/)
    * [Coffeescript](http://coffeescript.org/) would help. There's a nice page on here 'Try Coffeescript' that will quickly help JS devs work out the relevant Coffeescript

# Getting Started

The DevEnv is essentially an emulator of the entire Resin.io production stack (ie. what you'd use if you logged into http://resin.io as a user). The emulation works by running all of the services (each as a Docker container) that are usually distributed, on one VM.

There's a page dedicated to the Devenv [here](https://resinio.atlassian.net/wiki/display/RES/Working+with+the+Development+VM). This section expands that out a bit if you need a bit more info.

Once you've cloned and started the DevEnv, you can _ssh_ into it: `vagrant ssh`.
There you'll initially be able to see the various Docker containers that make up the system by running `fig ps`:

      Name                     Command               State                  Ports
      -------------------------------------------------------------------------------------------------
    resin_admin_1       /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_api_1         /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_builder_1     /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_db_1          /docker-entrypoint.sh postgres   Up      5432/tcp
    resin_delta_1       /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_devices_1     /bin/sh -c env > /etc/dock ...   Up      2222/tcp, 80/tcp, 8080/tcp, 9009/tcp
    resin_git_1         /bin/sh -c env > /etc/dock ...   Up      22/tcp, 80/tcp
    resin_haproxy_1     /docker-entrypoint.sh hapr ...   Up
    resin_img_1         /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_registry2_1   /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_registry_1    /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_s3_1          /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_ui_1          /bin/sh -c env > /etc/dock ...   Up      80/tcp
    resin_vpn_1         /bin/sh -c env > /etc/dock ...   Up      443/tcp, 80/tcp

Each of these containers (usually) corresponds to the git repo they originated from. Exposed ports allow each container to expose its service to the others.

Most of the services are 'real', as in they're running current CI deployed code. However, there are three services that emulate parts of the system:

* s3
* db
* haproxy

These services augment the DevEnv so that it is self-contained. Therefore any data added to the system is local only.

Almost every service starts via `systemd` (usually found in the `config/services` directory). Additionally, `confd` is used to allow dynamic setting of script and environment vars based on known keys (`config/confd` directory, see also [here]( https://github.com/kelseyhightower/confd/blob/master/docs/quick-start-guide.md) for more information on `confd`).

Every time you `vagrant up`, be aware that, apart from the initial VM creation, you'll need to do `fig start` again.

## A Note About `fig` And Application Source

`fig` is a Docker container manager that simplifies the creation of applications based around several services (**--> Although it seems like this is now  docker composer territory?<-**). It manages the Docker containers, including running and rebuilding them, and does so from a single file called `fig.yml`.

You can find this file in the root of the Vagrant VM. As can quickly be seen, each Resin.io container is specified as a service in this file. The most important bit here is the `volumes` section for each service, which specify container paths that are mapped to local paths in the Vagrant VM (for example, look at the `git` entry whose `volumes` section describe where in the Vagrant VM the user repos are stored (`data/git/repositories`) and where this is mapped to in the `resin-git` container (`/var/lib/git/repositories`).

You'll note that every service also has a commented out line in each `volumes` section, relating to the the containers `/usr/src/app`. These exist to allow locally cloned copies of the source for each service to be override the pre-built application path for each container. This allows us to clone each containers source directly from the relevant repo, make changes to it, and then re-run the service without having to go through the tedious business of rebuliding the container.

This can be achieved for each component by running a few steps. Running all of these inside the VM is safest, though obviously you could clone, move files, etc. outside if you wish to.

1. Uncomment the relevant line from the `fig.yml` manifest (in the `volumes` section for that service)
2. Clone the repo for the service you want to alter code for in the `src` directory, and rename the repo to the service specified in `fig.yml`
3. Change into the repo directory for the service, and ensure that any dependencies are installed, for most this will just involve an `npm install` (**must** be from inside VM)
4. Restart the relevant service from fig by doing `fig kill <service> && fig rm -f <service> && fig up -d <service>`

Here's a quick example using the `api` service, after uncommenting the `# - ./src/api:/usr/src/app` line:

    cd src
    git clone https://github.com/resin-io/resin-api.git
    mv resin-api api
    cd api
    npm install

Some containers pick up changes automatically (for example if they're running `nodemon`). Some need to be manually kicked again using step 4 of the steps above.

**Note**: There appears to be some sort of issue between the host and Vagrant. If you accidentally do an `npm install` from you host machine rather than from inside the vagrant Devenv (which won't work, as it relies on the setup in the VM), attempting to then carry out `npm install` from vagrant can halt and never respond (has been seen whilst attempting for the `resin-api` repo). Doing an `npm cache clear` doesn't seem to work, but kill the VM, wiping the repo source and starting again does seem to.

There are some very useful aliases set up in the Devenv that allow you to examine the running containers:

`logs <container>` - Lets you see all of the attached log output of the container (if you add the '-f' option, you'll see the tail, handy for observing).

`enter <container>` - Lets you attach to and get a shell for any running container.

Additionally, if you want to nose around in the FS for a non-running container, you can do this with the following:

`docker run --entrypoint=/bin/sh -it <container> -c /bin/sh`

eg:

`docker run --entrypoint=/bin/sh -it resin/resin-git:master -c /bin/sh`


# Getting some Initial Data In

To poke about in the guts of the system, it's useful to have some dummy data in it. Once the DevEnv is up and running, you can login to the system at https://dashboard.resinio.dev

You can sign up in the usual way, and this will populate the DB with your user.

## Adding a New Application

Creating a new Application requires a known, valid device type. However, this requires that the registry of valid images is required, and this requires the `resin-image-maker` to be fully cloned or the DEVELOPMENT Envvar set. Usually images are declared in `/images` in the `img` container, but there aren't any. So, we're going to create our own app and device manually.

**Note**: Actually, this all seems to work if you clone the `resin-image-maker.git` repo (this is the `img` service) and add the codepath into `fig.yml`. So the below steps to create an App and Device aren't required should you do this, as you should be able to create a new Application as-is. These have been left as pointers to the DB.

Get your favourite PostgresSQL client (I'm using Postico for OSX, https://eggerapps.at/postico/).

Connect to the DB:

    Host: db.resindev.io
    User: docker
    Password: docker

Now find the `application` table in the `resin` DB, and add a new row with data similar to the following:

    2016-07-14 15:45:23.012345	2	testApp	1	raspberry-pi2	1.2.3.4	80	heds/testapp

Take note of the second parameter (2), this is the User ID and needs to be copied from the `user` table for your user (you'll find it in the `id` column). The fourth parameter (1) is the application ID. You'll need this in a minute.

If you now login to the dashboard and select Applications, you'll see the app you just added.

You can also add a new device now (previously the `device` table did not exist). Go to the `device` table, again in the `resin` DB (which was created once a new app had been added). Add something similar to the following row:

    2016-07-14 16:00:23.012345	1	abcdef1234	testDevice		raspberry-pi2	1	2	0

## Creating a Git Repo

Finally, we want to add a git repo for the test app. You can do that by copying what the `git` container does when a new application is created.

**TIP**: Username and application names are lowercased into the git repo name, so even if a user specified an app called 'myApp', it will still be lowered to 'myapp'.

From `/home/vagrant/resin`:

    mkdir -p data/git/repositories/<username>/<appName>.git
	git init --bare data/git/repositories/<username>/<appName>.git

(So in the above case, `<username>/<appName>.git` for me is `heds/testapp.git`).

Now there's a repo, we can push to it. You'll see the handy 'git remote' command to add any repo you now want to build from the Application page on the dashboard. However, we need to ensure that we can get to it. Because vagrant is already running SSH on port 22, resin-git has to run on port 2222. So instead of the default command, use a nicknamed host which will allow you to setup a new host in your SSH config (although of course you could just add git.resindev.io in your config). For example:

    git remote add resin heds@resin-gitdev:heds/testapp.git

And then create a new entry in your `.ssh/config` file that references the new port:

    Host resin-gitdev
        User heds
        Port 2222
        Hostname git.resindev.io
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/resinkey

You can now go into the testapp.git repo and do the usual `git push resin master`, which will push changes into the previously inited bare repo.

This doesn't currently get picked up by the `builder`, and I'm yet to figure out why.

# API and curl

Use `curl` to play with the API, rather than try to get the CLI client up and running. The docs for the API are [here](http://docs.resin.io/runtime/data-api/).

Obviously the base URL is `api.resindev.io/v1`, instead. Normal bearer token rules apply (as can be found from your user preferences page).

Example:

    curl -H "Content-Type: application/json" -H "Authorization: Bearer <token>" https://api.resindev.io/v1/application -XGET

# The Services

The following are some influential services (as referenced by `fig.yml`, most repos on Github are prefixed with `resin-`, eg `resin-io/resin-api.git`). Each service is briefly described along with some relevant files inside them (good places to start looking at their operation). Described files are assumed to be within the repo cloned for that service.

## `api` (resin-api.git)

The best place to start is the `api` service, as this provides the endpoints for user interaction with the system. It is responsible for providing access to the user in all forms (UI/SDK/etc), and validating every operation that is requested before it occurs.

The entire system essentially is a framework around `pinejs`, which runs the show.

### `pinejs`

pinejs is essentially the core of the API system. It's a rule parser that takes the SBVR models defining all of the models for the system. These models let it define organised data that is stored in the database (tables in a Postgres DB), as well as accessing this data and ensuring that queries processed adhere to the rules. This includes checking permissions to access data requested.

Here's some excellent Flowdock-based explanation by Ilias (you can see the rest of the thread at https://www.flowdock.com/app/rulemotion/platform/threads/8M2yXFZiax7Sob5JmG_ClT1IA1s):

```
So, very roughly speaking, pine.js is a rules-driven API engine that enables you to define rules in a structured subset of English. Those rules are used in order to generate a database schema and also to generate the associated OData API. Pine.js is a core component of the resin-api.
You can take a look at the following tools:
https://github.com/resin-io-modules/sbvr-compiler
https://github.com/resin-io-modules/odata-compiler
The first one shows the way to use the compile chain from SBVR to SQL query, while the latter shows the way to compiler an OData URL into an SQL query.
You will notice that both tools use some of the main dependencies of pine.js, such as:

* abstract-sql-compiler
* lf-to-abstract-sql
* sbvr-parser
* odata-parser
* odata-to-abstract-sql
The above packages are written in OMeta and compiled into JS. I would recommend to bookmark the following resources in order to get a better understanding:

http://www.tinlizzie.org/~awarth/papers/dls07.pdf (OMeta paper)
http://www.tinlizzie.org/ometa/dls07-slides.pdf (OMeta slides)
http://b-studios.de/ometa-js/ (Intro to OMeta-js)
http://tinlizzie.org/ometa-js/#OMeta_Tutorial (OMeta workspace)
http://codeofrob.com/entries/ometa-odata-odear---polishing-it-off.html

I would also recommend Alexandros' papers:
http://ceur-ws.org/Vol-649/paper7.pdf
http://link.springer.com/chapter/10.1007%2F978-3-642-16289-3_12

From a technical perspective, Page is the guy who can answer everything regarding pine.js, but I will be happy to help as much as I can.

I believe the best way to test the above tools and also start experimenting with pine.js would be to setup your development environment and clone the tools there.
The sbvr lab (http://www.sbvr.co/) is also a good starting point to see some examples of sbvr rules.
Finally, the Open data protocol (http://www.odata.org/) is worth reading, since it constitutes the way we perform the requests to resin-api.
```

Requests coming into pinejs do so as OData (see https://en.wikipedia.org/wiki/Open_Data_Protocol), via the API. The OData is then compiled to SQL queries that are sent to the DB. Data returned from the DB is then translated back into OData and sent out to the caller.

Extra functionality can be added to the models by adding hooks. There are `PREPARSE`, `POSTPARSE` and `POSTRUN` hooks that get called before an incoming request is parsed, after it's been parsed and before the operation that would occur for it is executed.

Some relevant paths:

* `src/models/resin.sbvr` - The SBVR rules for the API. Defines the (and interactions between) apps, devices, users, etc.
* `src/app.coffee` - Shows initialisation and registration of further hooks for models.
* `node_modules/@resin/pinejs/src/server/src/sbvr-api/sbvr-utils.coffee` - Search for `exports.handleODataRequest`. Entrypoint for requests, and a good place to start watching how they're processed.
* `api/src/modules/hooks/index.coffee` - Search for `sbvrUtils.addHook`. Shows how the `PREPARSE`, `POSTPARSE` and `POSTRUN` hooks can be used to augment a request.
* `src/routes/*` - Shows top-level routes for non-model based endpoints.

Important used services:

* `git` - For creating/deleting repos for each user application
* `img` - For getting an initial base image for each new application/device type

## `git` (resin-git.git)

When a user pushes their changes to the resin repo, the `git` service lets all attempts at SSH login succeed (via a custom libnss library and PAM config), and then uses the `api` service to try and get a valid SSH key (the key registered on service signup). If the keys match, it then runs the `git-receive-pack` command against the incoming pack data for that user. It then runs an update hook that kicks the `builder` service into building the new image.

Some relevant paths:

* `src/app.coffee` - Application endpoints called by other services
* `src/bin/shell` - Command called once an SSH authentication has occurred
* `src/hooks/update` - The server-side update hook used to retrieve the newly commit ids and kick off the `builder` service

Important used services:

* `api` - To ensure a user is valid and has correct SSH key
* `builder` - To actually build the new user application

## `builder` (resin-builder.git)

The builder takes freshly pushed changes from the git repo for a users app and then creates the Docker container for that application. Once a build has completed, the 'flow' from a `git push` has ended as far as immediate service calling is concerned. Future actions, such as the download of the application onto a device works via the device being told what it's new state should be (and the new application) when it polls.

 It does this by:

1. Ensuring the user/app are valid
2. Ensuring the architecture type is valid
3. Ensuring there's a valid `Dockerfile` in the pushed repo (generating one first if it finds a `Dockerfile.template` or a `package.json` and no other Dockerfiles)
4. Pulling the previous version of the application from the registry cache (should it exist, checks via previous commit hash of application)
5. Building the new Docker container
6. Pushing the new Docker container to the registry
7. Cleaning up old images

Some relevant paths:

* `app.coffee` - Actual build service
* `project-types/*` - Selection of different ways of acquiring the Dockerfile required (including generating one for `Dockerfile.template` and `package.json` files)

Important used services:

* `api` - To retrieve application data (user validity, etc.)
* `image` - To ensure architecture is valid
* `registry{/2}` - To pull previously/push new cached version of the application

# `registry{/2}` (resin-registry{2}.git)

The registry stores versions of user applications. This is carried out storage-wise by S3 buckets (AWS based).

It essentially runs a private Docker registry using the `docker-registry` script (in `registry` this is a deprecated Python script, in `registry2` it's... compiled Go?), pointing storage to our S3 buckets.

The Docker docs provide a good rundown of how you can run your own registry [here]( https://docs.docker.com/registry/deploying/).

# `img` (resin-image-maker.git)

The image-maker is responsible for the creation of the base image for devices. The `/images` directory should contains sub-directories listing all the current known device types. The contents is compiled so that when a new image is requested (eg. `/v1/image/raspberry-pi3`), the types can be tested against to verify its existence.

**Note**: The `image-maker` used in the Devenv is cut-down version, as the full-fat repo has every base image for all architectures included with it. The branch for this is `master-slim`. A JSON file provides information required for a particular device types image. The 'DEVELOPMENT' Envvar allows simluation of images that don't actually exist, by downloading a config file from https://api.resinstaging.io).

Some relevant paths:

* `src/app.coffee` - Endpoint definition.
* `src/make.coffee` - Generation of images.
* `src/storage.coffee` - Retrieval of image information for device types.