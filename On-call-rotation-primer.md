On-call rotation primer
===

**Note 2:** UI references to specific services ("the button in the top right") may not endure over time

## 0. Onboarding ("So you want to survive on-call?")

1. Read this doc (Video version: (TODO: add link))
2. Read the [DevOps Playbook](https://balena-io.github.io/devops-playbook/)



## I. The basic "loop":

0. An incident occurs
1. Acknowledge the incident (in our own flows and if needed, on the statuspage)
2. Investigate the incident
    - Escalate to / pull in those who know
3. Keep as much information as possible to analyze later
    - monitoring data
    - logs
    - enter an affected machine and gather info not otherwise exported / saved
4. Resolve the incident (in our own flows, services, and if needed, on the statuspage)
5. Analysis and prevention
    - Causal analysis
    - Logs/evidence/indicators considered for future alerting / automation
    - Aim for at least a provisional postmortem within 24h (can be improved later)



## II. Operations

There are various actions an on-call agent might take during their rotation, for example:

- Remove an incident from the load-balancer pool
- Scaling up the DB (trade some downtime for increased performance / reliability if we're being overwhelmed) (needs a long-term strategy, of course)
- Scaling up number of instances (API, for example)
- Scale back down after an incident is over
- etc...

Most of these kinds of actions can be found in the [DevOps Playbook](https://balena-io.github.io/devops-playbook/) (see below, III.4.)



## III. Tools

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

Can be viewed from *"Teams" > "Operations" > "On-call schedule"*

We (specifically @wrboyce) are working on syncing our rotation times to our Google Calendars. [fd link](https://www.flowdock.com/app/rulemotion/autohat/threads/nfyY1OwaSrPXQ2iv8BZkfYZkDzz)



### 2. Monitoring

Dashboards enable a more open-ended sort of observation of the system in various metrics. Visually, you can find indications of the roots of an incident, or at least observe its most proximate causes and effects, spikes, etc.

Familiarize yourself with the basic grafana UI so you can selected different time ranges, hover your cursor on the graphs to visually correlate data points across graphs, etc.

There will be a set of dashboards which are standard, well-reviewed, checked into source, and used most often.

#### Staging
- dashboards: monitor.balena-staging.com
- prometheus: monitor.balena-staging.com/prometheus/graph

#### Production
- dashboards: monitor.balena-cloud.com
- prometheus: monitor.balena-cloud.com/prometheus/graph



### 3. Logentries

https://logentries.com/

Production / staging logs for those systemd services which are integrated with logentries

- There is a quite powerful regex search box

Let's say you saw from the API dashboard that we have elevated 400's. You can then come to Logentries and regex the logs to find example request paths, context of other kinds around specific requests.



### 4. DevOps Playbook

Lots of accumulated knowledge based on previous incidents. What to do, when, etc.

Recommended reading *as preparation for taking on-call duties*

- github live page: https://balena-io.github.io/devops-playbook/


### 5. SSH access

TODO: expand



### 6. AWS console

Various services have their own subsections of the UI

For example, RDS > Databases, in which you can view CPU, MEM, all those good things.

Most of the metrics you can find here will be in our cloudwatch exporter prometheus metrics / grafana dashboards


### 7. StatusPage

- outside view: status.balena.io
- our view: manage.statuspage.io (need to get your BalenaIO creds)
#### "Components" UI

Lets you set a *status* on a given *component*
    - Operational
    - Degraded performance
    - Partial outage
    - Major outage
    - Under maintenance

Note: Partial / Major outage ought to correspond to incidents

#### "Incidents" UI

Lets you create *incidents*

- Give it descriptive title - descriptive of the symptoms (ie. "High error rate of API requests")
- Depending how severe, you can write a small description which adds info to assuage user's fears.
- Checkbox of components affected, along with *status* (as above)
- Incidents have a lifecycle of their own in StatusPage (distinct from VictorOps):
    - investigating
    - identified
    - monitoring
    - resolved
- In the top-right, see the "Apply template" dropdown, which can help get you started
- Hubot will ping the team in the cloud/production flow
    - can be snoozed only so long as it's being worked on (snooze is not for "ignore"!)
    - reminds us to *close* the incident in StatusPage if it's still up once we've resolved it
- Incidents can be edited over time as we progress



### 8. End-to-end tests (jenkins)

We regularly run end-to-end (e2e) tests on Jenkins.

Our VictorOps alerts for e2e contain links to the relevant resources / logs in Jenkins (@ http://jenkins.dev.resin.io)

- Navigate to the Jenkins instance
    - (e2e are under the "DevOps" tab)
- Open the specific job
- View "Console output"
    - The logs are very verbose about what tests are being performed, so the specific point of failure can usually be identified
    - That said, there may not be much information about *why* that specific point failed (for example, we'll get, "Checking if kernel module loading works" will be "`[FAIL]`"

Ocassionally, retrying the e2e tests may cause a pass (they are somewhat flakey as of this writing! Thu 05 Dec 2019 01:11:21 PM EST)



### 9. Healthchecks.io

Hourly e2e tests have a dead man's switch alert configured via this service (if no e2e test)
Consecutive failures for > 1h also alert here

TODO: expand



### 10. Nodeping

TODO: expand



### 11. Packet.net (arm builders)

- terraform
- log in, see statuses, if anything's gone wrong

TODO: expand



### 12. Deployments & Rollbacks

TODO: expand


