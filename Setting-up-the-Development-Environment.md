Setting up the Development Environment
======================================

This document describes how a new user can get up and running with the Development Environment. A good chunk of this is taken from a document Akis wrote.

# Prerequisites

You'll need to install the following:

* [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - A Virtual Machine implementation
* [Vagrant](https://www.vagrantup.com/downloads.html) - A suite of tools to easily configure and run a known, stable VM 'anywhere'. It uses VirtualBox to run VM images

It's recommended to install VirtualBox before Vagrant. Once you've installed both, bring up a new terminal and type:

    vagrant plugin install vagrant-vbguest

The guest additions allow easy communication between host (your machine) and guest (what will be the Development Environment).

# Getting the DevEnv

The DevEnv is actually an integration that brings all of the Resin.io services together, and this is the `resin-containers` repo. Assuming you have access to the Resin repos, type:

git clone https://github.com/resin-io/resin-containers.git

# Developing Inside Vagrant

If you want to actually develop from within the DevEnv (rather than from the host OS), you might need to add your id_rsa.pub public key to the VM. Here's how:

    On the host computer: $ cat ~/.ssh/id_rsa.pub | pbcopy
    Enter the VM with: $ vagrant ssh
    $ nano ~/.ssh/authorized_keys
    Move to the last line and paste your public key from clipboard
    Ctrl+X to exit, type "Y" to accept changes and hit Enter
    You might also need to copy id_rsa and id_rsa.pub into your VM

# Starting the DevEnv

Once cloned, `cd` into the `resin-containers` repo and type:

    vagrant up

Vagrant will now pull down the relevant Linux dist (an Ubuntu-provided 64bit server) image to base the environment on, run it in VirtualBox and configure it. You will be asked which network interface to connect to. It is recommended you use the interface that all 'normal' incoming/outgoing traffic goes through (ie. connects to the Internet).

On first start, a large amount of work is carried out to grab all of the Docker containers that comprise the Resin.io services (it runs the `bin/provision` script, which does all of this and sets up the config files). This will take some time. Grab a cup of tea.

Once finished, vagrant will drop back to the command line. You can now connect to it via:

    vagrant ssh

You should now be able to type `fig ps`, and see a list of all the services (`fig` is the Docker container manager used in the VM):

Once you've cloned and started the DevEnv, you'll initially be able to see the various Docker containers that make up the system by running fig ps:

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

**If you do not** see the services running, you may have to issue:

    fig up -d
    sudo systemctl restart start-network
    fig restart haproxy

For more on services see [here]().

# Restarting the DevEnv

Shutting down a Vagrant machine requires the user to type:

    vagrant halt

This will clean up and then stop the DevEnv VM that was running. To restart it again, simply do another `vagrant up`.

Be warned that on all subsequent `vagrant up` commands, you will have to `vagrant ssh` in and then run `fig start` to start all of the services again. You may also have to start the previous network services (`start-network`, `haproxy`) if you had to before.

# Database

The DB backend for the DevEnv can be connected with the following details:

Connect to the DB:

    Host: db.resindev.io
    User: docker
    Password: docker

You should be able to do this from your host machine. For OSX, [Postico](https://eggerapps.at/postico/) is a great little Application. The DB you'll be most interested in is `resin` (where user, application, device, etc. tables are held).

# Connecting to the dashboard

**Note that in order to actually create an Application, you'll either have to install the source for the `img` container (see section below), or you'll need to edit the DB by hand (see the Devices page here[]()).**

Once startup has completed, you should be able to see a local copy of the Resin.io dashboard. Simply navigate to https://dashboard.resindev.io/

# API and curl

Use `curl` to play with the API, rather than try to get the CLI client up and running. The docs for the API are [here](http://docs.resin.io/runtime/data-api/).

Obviously the base URL is `api.resindev.io/v1`, instead. Normal bearer token rules apply (as can be found from your user preferences page).

Example:

    curl -H "Content-Type: application/json" -H "Authorization: Bearer <token>" https://api.resindev.io/v1/application -XGET
# Creating an Application Git Repo

Finally, we want to add a git repo for the test app. You can do that by copying what the `git` container does when a new application is created.

**TIP**: Username and application names are lowercased into the git repo name, so even if a user specified an app called 'myApp', it will still be lowered to 'myapp'.

From `/home/vagrant/resin`:

    mkdir -p data/git/repositories/<username>/<appName>.git
	git init --bare data/git/repositories/<username>/<appName>.git

(So in the above case, `<username>/<appName>.git` for me is `heds/testapp.git`).

Now there's a repo, we can push to it. You'll see the handy 'git remote' command to add any repo you now want to build from the Application page on the dashboard. However, we need to ensure that we can get to it. Because vagrant is already running SSH on port 22, resin-git has to run on port 2222. So instead of the default command, use a nicknamed host which will allow you to setup a new host in your SSH config (although of course you could just add git.resindev.io in your config). For example:

    git remote add resin heds@resin-gitdev:heds/testapp.git

And then create a new entry in your `.ssh/config` file that references the new port (this assumes you're doing it from the host and **not** from inside the DevEnv):

    Host resin-gitdev
        User heds
        Port 2222
        Hostname git.resindev.io
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/resinkey

You can now go into the testapp.git repo and do the usual `git push resin master`, which will push changes into the previously inited bare repo.

This doesn't currently get picked up by the `builder`, and I'm yet to figure out why.

# `fig` And Source Repos

`fig` is a Docker container manager that simplifies the creation of applications based around several services (**--> Although it seems like this is now  docker composer territory?<-**). It manages the Docker containers, including running and rebuilding them, and does so from a single file called `fig.yml`.

You can find this file in the root of the Vagrant VM. As can quickly be seen, each Resin.io container is specified as a service in this file. The most important bit here is the `volumes` section for each service, which specify container paths that are mapped to local paths in the Vagrant VM (for example, look at the `git` entry whose `volumes` section describe where in the Vagrant VM the user repos are stored (`data/git/repositories`) and where this is mapped to in the `resin-git` container (`/var/lib/git/repositories`).

You'll note that every service also has a commented out line in each `volumes` section, relating to the the containers `/usr/src/app`. These exist to allow locally cloned copies of the source for each service to be override the pre-built application path for each container. This allows us to clone each containers source directly from the relevant repo, make changes to it, and then re-run the service without having to go through the tedious business of rebuilding the container.

This can be achieved for each component by running a few steps. Running all of these inside the VM is safest, though obviously you could clone, move files, etc. outside if you wish to.

1. Uncomment the relevant line from the `fig.yml` manifest (in the `volumes` section for that service)
2. Clone the repo for the service you want to alter code for in the `src` directory, and rename the repo to the service specified in `fig.yml`.
3. Change into the repo directory for the service, and ensure that any dependencies are installed, for most this will just involve an `npm install` (**must** be from inside VM)
4. Restart the relevant service from fig by doing `fig kill <service> && fig rm -f <service> && fig up -d <service>`

By default, you can't create an Application in the Dashboard as default, as the `img` service is a lightweight version that doesn't contain any of the device type definitions. To solve this and to be able to create Apps, do the following (this should also be applied to all other repos for containers, but check the relevant documents to ensure there are no extra steps required):

Here's a quick example using the `img` service, after uncommenting the `# - ./src/api:/usr/src/app` line:

    cd src
    git clone https://github.com/resin-io/resin-image-maker.git
    mv resin-image-maker img
    cd img
    npm install
    fig kill img && fig rm -f img && fig up -d img

After this, you should now be able to pick from a list of dummy devices.

Some containers pick up changes automatically (for example if they're running `nodemon`). Some need to be manually kicked again using step 4 of the steps above.

**Note**: There appears to be some sort of issue between the host and Vagrant. If you accidentally do an `npm install` from you host machine rather than from inside the vagrant Devenv (which won't work, as it relies on the setup in the VM), attempting to then carry out `npm install` from vagrant can halt and never respond (has been seen whilst attempting for the `resin-api` repo). Doing an `npm cache clear` doesn't seem to work, but kill the VM, wiping the repo source and starting again does seem to.

# Userful CLI Tools

You can use:

    fig pull [container]

to update any containers that have been updated since you created the DevEnv. Without a container parameter, it will update all of them.

Additionally, there are some very useful aliases set up in the DevEnv that allow you to examine the running containers:

`logs <container> [-f] [-n <number>]` - Lets you see all of the attached log output of the container.
    `-f` option - See the tail, handy for observing
    `-n <number>` - See the last 'n' lines

`enter <container>` - Lets you attach to and get a shell for any running container.

Additionally, if you want to nose around in the FS for a non-running container, you can do this with the following:

`docker run --entrypoint=/bin/sh -it <container> -c /bin/sh`

eg:

`docker run --entrypoint=/bin/sh -it resin/resin-git:master -c /bin/sh`