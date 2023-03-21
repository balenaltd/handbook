# On-call rotation primer

**Note:** UI references to specific services ("the button in the top right") may not endure over time

## I. Setting up to work on call

0. (async) Request credentials for the services you will find in the [SRE Resources](sre-resources.md)
1. Read this doc
2. Read the [DevOps Playbook](https://jel.ly.fish/view-all-faqs) (topic filter: `devops`)
3. Check your DevOps on-call schedule in [the DevOps calendar](https://calendar.google.com/calendar/u/0?cid=Y19rdG43azdoZ2I4MjZsMThtbGw0aWxwamJsOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t) or in VictorOps.

## II. The basic on call procedure

Our incident handling procedure is described in new SRE Handbook - [here](https://github.com/balena-io/sre-handbook/blob/main/oncall/incidents.md).

## IV. Tools

There are several services / aspects to know when working the on-call rotation

### 1. victorops

Alerts pop here. Alerts will page people according to an escalation policy.

#### Contact methods / paging policies

- Set up via "Contact methods" and "Paging policies" in VictorOps UI
- Very useful to have the application set up on your phone
- Example policy: "push notification to app, if not ack'd in 10 minutes, call me"
- **Your paging policy should ensure that you can be alerted, whatever method it is, it must be able to alert you reliably (if you are asleep, afk, etc.)**
- The phone call number may be the same every time. You can put that contact in an exceptional group that will bypass "do not disturb"
- There may be different numbers, at the very least you can try to add each of these
- The alerts will contain information about the incident, possibly links to dashboards, etc.

#### Incident lifetime

1. triggered
2. acknowledged (VictorOps UI feature)
   - Should only ACK if you know you're going to be able to handle it.
3. resolved (double check-mark button in top-right of incident ticket)

(Incidents can be re-routed if you know someone else can handle the issue and you cannot)

#### Filtering incidents

There are going to be some test incidents, or other incidents not routed to you for whatever reason. "Your incidents" is a useful tab, for this reason.

#### Rotation calendar

Can be viewed from _"Teams" > "Operations" > "On-call schedule"_

We are working on syncing our rotation times to our Google Calendars.

### 2. Monitoring

#### Staging

- dashboards: monitor.balena-staging.com
- prometheus: monitor.balena-staging.com/prometheus/graph

#### Production

- dashboards: monitor.balena-cloud.com
- prometheus: monitor.balena-cloud.com/prometheus/graph

Dashboards enable a more open-ended sort of observation of the system in various metrics. Visually, you can find indications of the roots of an incident, or at least observe its most proximate causes and effects, spikes, etc.

Familiarize yourself with the basic grafana UI so you can selected different time ranges, hover your cursor on the graphs to visually correlate data points across graphs, etc.

There will be a set of dashboards which are standard, well-reviewed, checked into source, and used most often.

### 3. Loki

https://monitor.balena-cloud.com

Production / staging logs for systemd services which are aggregated in loki

Access through graphana, login with github.

Let's say you saw from the API dashboard that we have elevated 400's. You can then come to Loki look for the logs to find example request paths, context of other kinds around specific requests.

### 4. DevOps Playbook

Lots of accumulated knowledge based on previous incidents. What to do, when, etc.

Recommended reading _as preparation for taking on-call duties_

- Jellyfish FAQs, filter by `topic is devops`. We recommend saving the filtered list as a view: https://jel.ly.fish/view-all-faqs

### 5. SSH access

Services running on balenaCloud can be accessed using the balenaCloud dashboard web terminal or by using the `balena ssh` CLI command. Most of the servers running on Hetzner are running balenaOS and connected to balenaCloud.

Almost all EC2 instances running in our AWS environments can be accessed using [AWS CLI](https://aws.amazon.com/cli/) with the [Session Manager Plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html). Admin access to the environments are required to have SSH permissions to access the EC2 instances.

The ARM build servers running on Packet.net/Equinix are still accessed using the regular SSH client. Please ask DevOps to add your keys to the servers to be able to access them.

### 6. AWS console

Various services have their own subsections of the UI

For example, RDS > Databases, in which you can view CPU, MEM, all those good things.

Most of the metrics you can find here will be in our cloudwatch exporter prometheus metrics / grafana dashboards

### 7. StatusPage

- outside view: status.balena.io
- our view: manage.statuspage.io (need to get your BalenaIO creds)

#### "Components" UI

Lets you set a _status_ on a given _component_ - Operational - Degraded performance - Partial outage - Major outage - Under maintenance

Note: Partial / Major outage ought to correspond to incidents

#### "Incidents" UI

Lets you create _incidents_

- Give it descriptive title - descriptive of the symptoms (ie. "High error rate of API requests")
- Depending how severe, you can write a small description which adds info to assuage user's fears.
- Checkbox of components affected, along with _status_ (as above)
- Incidents have a lifecycle of their own in StatusPage (distinct from VictorOps):
  - investigating
  - identified
  - monitoring
  - resolved
- In the top-right, see the "Apply template" dropdown, which can help get you started
- Hubot will ping the team in the Jellyfish
  - can be snoozed only so long as it's being worked on (snooze is not for "ignore"!)
  - reminds us to _close_ the incident in StatusPage if it's still up once we've resolved it
- Incidents can be edited over time as we progress

You can also create _scheduled maintenance_ advisories that will be posted on our Statuspage.
This can be added under the _Maintenances_ tab.

- Scheduled maintenances have a lifecycle of their own in StatusPage (distinct from VictorOps):
  - scheduled
  - in progress
  - verifying
  - completed
- Scheduled maintenances should be posted at least a week before the maintenance period to make sure
  that users are aware that some services may not be available at the time of the maintenance.

### 8. End-to-end tests (jenkins)

We regularly run end-to-end (e2e) tests on Jenkins.

Our VictorOps alerts for e2e contain links to the relevant resources / logs in Jenkins (@ http://jenkins.product-os.io)

- Navigate to the E2E job in the Jenkins instance using this link: [balena-e2e-ephemeral](https://jenkins.product-os.io/view/__hack__/job/balena-e2e-ephemeral/)
- Open the specific job
- View "Console output"
  - The logs are very verbose about what tests are being performed, so the specific point of failure can usually be identified
  - That said, there may not be much information about _why_ that specific point failed (for example, we'll get, "Checking if kernel module loading works" will be "`[FAIL]`"

Ocassionally, retrying the e2e tests may cause a pass (they are somewhat flakey as of this writing! Thu 05 Dec 2019 01:11:21 PM EST). E2E tests may fail if the balenaCloud API is slow to respond and may indicate that something within the backend may need to be optimized (adding more resources, adding an index to a table, etc.).

### 9. Healthchecks.io

Hourly e2e tests have a dead man's switch alert configured via this service (if no e2e test)
Consecutive failures for > 1h also alert here.

If you have received an alert that originates from Healthchecks.io, check the [E2E jobs](https://jenkins.product-os.io/view/__hack__/job/balena-e2e-ephemeral/) in Jenkins to investigate why the jobs do not start or why the jobs continue to fail.

### 10. Nodeping

Nodeping contains periodic healthchecks that ping the balenaCloud endpoints. This service triggers webhook calls to Statuspage & VictorOps when a service is inaccessible. This is usually one of the first things to check to see what response has been received from the service being checked.

### 11. Equinix/Packet.net (ARM builders)

- The servers hosted in Equinix are provisioned using Terraform: [environment-production repo](https://github.com/balena-io/environment-production/blob/balena-api-switch-replica/terraform/packet/packet_devices.tf)
- The SSH keys to access the servers are also managed using Terraform. Please inform DevOps if you need access to the servers.

The running ARM servers are registered to the balena-builder backend in [this configuration file](https://github.com/balena-io/environment-production/blob/master/kubernetes/balenacloud/balena-builder/configmap.yaml#L4-L6).

### 12. Deployments & Rollbacks

Deployments for components that run in the production Kubernetes cluster can be done using [this deployment job](https://jenkins.product-os.io/view/__hack__/job/Deploy-Component-To-Production/) in Jenkins. The allows you to select an existing component and set the version to be deployed. We can use the same job to rollback components to a previous version. The job manipulates the Kubernetes configuration files stored in the [environment-production repo](https://github.com/balena-io/environment-production) which are then applied to the production cluster using [flux](https://fluxcd.io/).

Components that run the in staging Kubernetes cluster are automatically updated to the latest version. [flux](https://fluxcd.io/) queries the docker image repositories for the latest semantic versions and applies the latest version to the Kubernetes configuration files in the [environment-stagin repo](https://github.com/balena-io/environment-staging).

We have started moving components such as Jellyfish/balenaChat from Kubernetes to balenaCloud. These components are updated the same way apps are updated in balenaCloud. Rollbacks can be done by pinning the fleet to a previous version.
