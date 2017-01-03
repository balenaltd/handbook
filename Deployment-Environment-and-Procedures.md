# Table of Contents

* [Deploying resin-proxy](#deploying-resin-proxy)

# Environment

We use a combination of Amazon Cloud Formation and CoreOS for running our
infrastructure.

1. Amazon Cloud Formation is used to describe the placement, databases capacity
  and security policies of the machines that that join our CoreOS cluster.
  * This is done via the VPC.template JSON file in the
    resin-containers/cloudformation directory.
  * The VPC.template controls everything from deciding what machines go behind the
    load balancer to the policies to be followed for scaling and backup procedures
    on machine deletion.
  * To gain familiarity with this please check the documentation at
    http://aws.amazon.com/documentation/cloudformation/
  * Machines are tagged with tags like openvpn, builder, api etc to enable CoreOS
    to understand the placement and deploy appropriate containers.
  * Configurable Parameters are passed to the cloudformation file as Parameters in
    the VPC.template file. Some of these Parameters are made available to the etcd
    CoreOS environment via cloud-config in the Manager instance. The Parameters
    are passed on during the boot of the Manager instance.
  * EXTREME CAUTION making changes to this file can cause wiping of the production
    database and other potentially non recoverable situations - As a practice do
    not apply changes to this file to production unless the file has been tested
    on staging.
2. CoreOS is used to run the containers [services] on the machines in our cloud
  formation cluster.
  * Every container run is a service and the service files are located in
    resin-containers/cloudformation/systemd, we use fleetctl to launch the service
    files.
  * Services in our repos refer to the master builds of the containers, built from
    our Jenkins CI environment.
  * Environment variables for various containers are fetched by etcd from the
    /services/ name space. We use Confd to create the config files needed by
    containers on first run. Confd uses .tmpl and .toml files to generate the
    required config files - these are usually located in config directory of the
    container repository. Note: When etcd isnt reachable by the container - the
    container automatically assumes the development environment.
  * For Production deployment run the deployment.sh script in
    resin-containers/cloudformation/systemd to change the tags used in these files
    to point to production builds of our containers.

## Initial Setup

Create a stack with VPC.template with cloudformation - Select appropriate
variables.

Wait for the stack to be created - This usually takes about 30 mins the first
run - because of the slow RDS provisioning.

Log into the monitor instance and download resin-containers repo there:

git clone git@github.com:resin-io/resin-containers.git

Launch all the services by going into the services directory and executing -
fleetctl start manager.service Note: we need to change from master to production
tag in the services for production deployment by running deployment.sh

At this point the environment should be up - Note that this does not include the
auto update of services.

## Updating Cloudformation template

Log into AWS cloud formation panel.

Use the Update stack option and fill in the relevant details for the update.

Extreme CAUTION DO NOT change variables related to database as it can drop the
db. [ Tick mark use previous settings ]
After the CloudFormation update, choose an instance to scale it up and then back
down to make sure that adding new instances works as expected

# Deployment

## From PR to Staging

We track code from PR to staging via the following process:

* A contributor opens a PR, correctly connecting it to an issue. This will
  create the correct set of entries in [waffle.io](https://waffle.io) (an
  Issue/PR pair of joined cards)
* Once your PR has been merged, move its card in waffle to `waiting for staging`
  (or repo equivalent)
* When you would like to see it on staging, check what else is in `waiting for
  staging` and make sure you're okay with deploying all that
* Go to the `resin-deploy` [Jenkins
  job](https://jenkins.dev.resin.io/view/DevOps/job/resin-deploy/build) and trigger a
  deploy, using the `update` action, specifying the component you would like
  deployed, and specify the branch (almost always `master`; see below for
  switching branches)
* Wait for the job to complete
* Assuming it was successful, you just deployed to staging!

## From Staging to Production

* When you are satisfied that your code (as deployed to staging above) is
  functional and safe to deploy to production, move its waffle card from
  `testing` to `waiting for production`.
* If it's urgent, or you're impatient, you can ping @brownjohnf in flowdock and
  request a deploy of your component.
* Otherwise, eventually your commits will be picked up for a production deploy,
  and `@team` will be notified in the Flowdock `devops` room that a deploy is
  starting.
  * During a production deploy, the most current commit which contains a
    contiguous set of `waiting for production` merge commits will be rebased
    onto the production branch in the repo
  * The commit to be deployed will be tagged with `production-<current date>`,
    and the contents of the tag will be the `CHANGELOG` diff for the repo
  * There will be a `chore(deploy): Update CHANGELOG` commit made to the
    `master` branch of the repo, adding the deploy date and deployed commit to
    the CHANGELOG.
* When the deploy has finished, there will (usually) be another notification, and
  the waffle card will be moved from `waiting for production` to `done`
* You should then go verify that something hasn't gone horribly wrong

## Switching Branches Deployed on Staging

1. Install and configure [resinctl](https://github.com/resin-io/resinctl)
2. Run `resinctl switch-branch COMPONENT BRANCH ENVIRONMENT`
3. Hope it worked. This is an inadvisable procedure

## Updating containers

### For setting up auto-update ( Currently disabled )

* Launch the services in the monitor subfolder - Note: we need to change from
  master to production tag in the services for production deployment.
* Switch all the HEALTH check ports on ELB to 1234 - Once this is done the
  infrastructure is in auto - update mode - changing the ELB health check to
  original values and destroying the monitors brings the infrastructure back to
  manual.

The above can be done selectively for services.

### Manual Update Procedure ( Currently used )

  In the "Auto Scaling Groups" of AWS choose the group for the service you are
  deploying.

  Double the desired number of machines and save.

  Change to the "Load Balancers" section and select the service you are
  deploying.

  Wait until all the "Status" shows as "X of X instances in service" , so that
  all the new ones are running.

  Return to the "Auto Scaling Groups" section and select the correct service.

  Reduce the number of machines back to the original value.

  Move the trello cards to the appropriate column.

  Note: Autoscale on AWS removes the older instances first after connection
  draining - This ensures completion of any existing requests and that new
  requests are served from newer code without downtime.
  WARNING: Do not update a majority of instances at once since it can cause
  issues with etcd.

### Gaining access to the instances

Your access to Staging and Production Environments are controlled by service
files in the resin-containers/cloudformation/systemd directory.
Create a `add_ssh_keys_<username>.service` service and run with fleetctl to
enable access.

You can ssh into the manager instance with `ssh -A
core@manager.resinstaging.io`.

### Deploying an update to git

Build the image as you normally would:
```
sudo resinctl build git production
```

SSH into the git host

Run
```
docker pull resin/resin-git:production
```

Restart the service:

```
sudo systemctl restart resin-git@production.service
```

### Deploying resin-proxy

1. Trigger a build of proxy with `resinctl build proxy production`
2. Copy the contents of `resin-containers/cloud_formation/ssh/resin_devices` to your clipboard
3. Go to https://admin.resin.io/top-level-numbers and check the number of online
   devices. Note the number down somewhere for later
4. Deploy the proxy with `resinctl deploy proxy production`
5. SSH into the new proxy instance and run (MODIFY THE ENVIRONMENT APPROPRIATELY):

  ```
  mkdir -p /root/.ssh
  vi /root/.ssh/resin_devices # add the contents of resin-containers/cloud_formation/ssh/resin_devices
  export SSH_AUTH_SOCK=/var/run/resin-proxy-ssh-agent
  chmod 0400 /root/.ssh/resin_devices
  ssh-add /root/.ssh/resin_devices
  rm /root/.ssh/resin_devices
  ```

6. Go back to https://admin.resin.io/top-level-numbers and make sure that the
   number of online devices is back up close to what it was originally
7. Done

### Deploying an Upgrade to CoreOS

During an upgrade to CoreOS, the CoreOS version is changed in the VPC.template, which immediately re-creates the the manager, git, and vpn instances. This will then drop them out of the etctd cluster because the manager is tho sole leader, and you can't join a cluster without a leader.

To do this deploy do the following:

* Ensure that you've scheduled downtime ~24 hours prior to doing the release.
* Make sure AWS is set up to launch instances with your public key (this is important so you can ssh into the new manager instance!). Verify in the EC2 dashboard.
* Update the VPC template (change CoreOS ami)
* Upload the new VPC template but don't submit it yet
* Get a new discovery URL from https://discovery.etcd.io/new?size=1 and update the value in the CloudFormation form
* Go through the fields in the CloudFormation form and make sure everything's filled in that should be (especially new fields). Verify that the desired number of instances matches what's currently set in the auto-scaling groups.
* Ensure that new instances are set up to launch with your SSH key
* Go into EC2 in another tab and detach the EBS volume from the git instance.
* This won't happen yet.
* Shut down the git instance. Watch the EBS volumes and wait for it to be detached.
* Check https://admin.resin.io/top-level-numbers for current number of connected devices. Remember this number.
* Submit the VPC template. This will recreate manager, git, and vpn instances.
* SSH into the new manager and run (MODIFY THE ENVIRONMENT APPROPRIATELY):

  ```
  git clone git@github.com:resin-io/resin-containers.git
  cd resin-containers/cloud_formation/systemd/services
  git checkout production
  fleetctl submit *
  fleetctl start manager@production.service
  cd ~
  git clone git@github.com:resin-io/resin-ssh-keys.git
  cd resin-ssh-keys/systemd/services
  fleetctl start add_ssh_keys.service
  ```

* [Deploy the proxy server](#deploying-resin-proxy)
* Re-deploy each of the other services to pick up the new discovery token and
  join the new cluster (and get the new CoreOS version, of course)

  ```
  for service in delta registry admin img ui registry2 builder; do
    echo "deploying $service to production..."
    sudo resinctl deploy $service production
  done
  ```

### Deploying interrupted services (git, vpn)

In the case of vpn:

1. Schedule downtime on statuspage.io
2. Do the usual fast-forwarding of production to the selected deploy commit, and push
3. Update CHANGELOG on master. Push
4. Check https://admin.resin.io/top-level-numbers for number of connected devices. Remember this number
5. Run `resinctl build vpn production`
6. Wait for the scheduled downtime window
7. Run `sudo resinctl deploy vpn production`
8. Once it's up, confirm that the number of connected devices at https://admin.resin.io/top-level-numbers matches pre-deploy numbers

## Other Problems You May Encounter

### Ooops etcd is broken

Stop all the etcd instances on the manager and git
```
sudo systemctl stop etcd2 load-etcd
```

Clean etcd data dirs:
```
sudo rm -rf /var/lib/etcd2/*
```

Change the discovery url in cloudformation
Add all the services to fleet

```
cd resin-containers/cloudformation/systemd/services  && fleetctl start manager@master.service
```

Restart the etcd instance on git (it is done automatically on manager by the cloudformation change):
```
sudo systemctl start etcd2
```

Bring missing instances back into fleet:
```
ssh $INSTANCE_IP
sudo rm -rf /var/lib/etcd2/*
sudo systemctl restart etcd2
```

