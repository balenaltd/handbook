### overview
While our overall [product surface](https://docs.google.com/drawings/d/1SBDms6dAYtJvKwbgehbc16GK_tZQ9Kq1ITT5VOh_uIc/view) is vast, the scope for SRE specific tools is much narrower.

### SRE tools
> ensure all SREs have access to ([at least](https://balena-io.github.io/devops-playbook/#b5964e00-2de4-11e8-9b2a-ab7685d3014e)) the following tools by using your G Suite `@balena.io` email address or your existing GitHub account to sign-up and then requesting organisation access in the `t/operations` flow using hashtag `#access` (i.e. `#hashtag please grant "foo" access to bar@balena.io|username`). Some services may require an invitation first (i.e. VictorOps).

#### infrastructure
* generate `RSA|EC` and `GPG` keys

* request SSH access
```
- misc1.dev.balena.io
- misc2.dev.balena.io
- balenaCloud bastion host(s)
- Jellyfish bastion host(s)
```

* [Passpack v7](https://www.passpack.com/online/) (⚠️ not on https://app.passpack.com/...) and [activate sharing](https://github.com/balena-io/balena/wiki/passwords-management)

* Okta Account - many of our services authenticate through Okta. Follow [this guide](https://docs.google.com/document/d/1OLgOcMDCJcdISe_bv0tvF87HeaLrFmoP7CfGSxYEK8Q/edit#bookmark=id.naso1geqapb7) to setup the Okta browser plugin and `saml2aws` cli tool.

* AWS CLI access using roles to production, staging & playground. [CLI HowTo](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-cli.html) AWS CLI is now authenticated using `saml2aws`.
> ⚠️ `default` is `balena-production`
```
# (example) ~/.aws/credentials

[default]
aws_access_key_id=foo
aws_secret_access_key=bar
```

```
# (example) ~/.aws/config

[default]

[profile balena-playground]
role_arn = arn:aws:iam::240706700173:role/admin
source_profile = default

[profile balena-staging]
role_arn = arn:aws:iam::567579488761:role/admin
source_profile = default

[profile balena-production]
role_arn = arn:aws:iam::491725000532:role/admin
source_profile = default
```

* ARM architecture builders hosted in [packet.net](https://www.packet.com/)
* Kubernetes (k8s) cluster(s) [balenaCloud]() and Jellyfish[[1]](https://github.com/balena-io/resin-k8s/blob/master/docs/ACCESS_CLUSTER.md)[[2]](https://balena-io.github.io/devops-playbook/#150828a0-2d2b-11e8-9718-9f724d93afd5)
* [CloudFlare](https://dash.cloudflare.com/) 
* [Hubot](https://github.com/balena-io/hubot-as-mainbot) hosted at [Heroku](https://www.heroku.com/)


#### CI/CD
* GitHub (assumes existing account)
* [Jenkins](https://jenkins.dev.resin.io/) hosted at [Hetzner](https://www.hetzner.com/) (admin access)
* Jenkins master and build agents (SSH)
* [CircleCI](https://onboarding.circleci.com/)
* [balenaCI/concourse-ci](https://ci.balena-dev.com/)
* DockerHub


#### monitoring
* [Prometheus](https://monitor.balena-cloud.com/prometheus/graph) metrics aggregator
* [Grafana](https://monitor.balena-cloud.com/oauth2/sign_in) metrics visualiser
* [VictorOps](https://portal.victorops.com/client/resin-io-) on-call scheduling
* [Sentry](https://sentry.io/organizations/balena/issues/) front-end logging
* [Logentries](https://logentries.com/app/5915e005) back-end logging
* [statuspage.io](https://manage.statuspage.io/pages/5b4dcn321xtp) customer facing status page
* [Nodeping](https://nodeping.com/) TBC/legacy?
* [healthchecks.io](https://healthchecks.io/accounts/login/) TBC/legacy?


#### balena|product
* JellyFish
* personal account (e.g. GitHub linked) [balenaCloud](https://dashboard.balena-cloud.com/apps) team member group membership
* company account (e.g. G Suite linked) [balenaCloud](https://dashboard.balena-cloud.com/apps) support agent permission
* [balenaStaging](https://dashboard.balena-staging.com/apps) and [admin](https://admin.balena-staging.com/) support agent permission
* marketing|blog server SSH access