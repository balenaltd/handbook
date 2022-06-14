# Preset.io Playbook

---
> **_TL;DR_** Preset is a platform to self-serve balenaCloud product analytics (regarding fleets, devices, users, etc.) and is available to every balenista.
Send an #access request in the t/operations flow and the ops team will take care of the rest.
---

In 2022 Chartio has been replaced by [Preset](https://preset.io/) (SaaS version of [Apache Superset](https://superset.apache.org/)). This reference guide provides an overview of the current situation, next steps, and usage instructions.

## General guidance

We know everyone hates reading documentation. However, it would not be practical to cover the whole Preset (Superset) tooling by ourselves. Therefore, the idea is to rely on resources curated and maintained by creators of the platform, namely:
- [Getting Started Guide by Preset](https://docs.preset.io/docs/welcome-to-preset) - a wiki-style resource covering core aspects of Preset, its terminology and concepts.
- [Preset User's Corner YouTube channel](https://www.youtube.com/channel/UCzg8opP7sG8n0Mi0e8yeqAg) - the official channel serving bite-sized video tutorials of using various Preset functionalities.

Specifically, [here](https://youtu.be/hvp4NMgifqY) is the official Preset onboarding video taken from the channel above.

## Company-specific guidance

There are three workspaces (isolated Superset environments) accessible from [the main dashboard](https://manage.app.preset.io/app), in order of expected relevance:
- [Balena Sandbox](https://868c5593.us2a.app.preset.io/) - the playground workspace that includes examples and real production resources. Feel free to experiment here without worrying about breaking anything.
- [Balena Analytics](https://373617ab.us2a.app.preset.io/) - the main workspace with real production resources. Currently similar to the playground but possibly will contain only verified/approved content in the future.
- [Balena Staging](https://d0671a1a.us2a.app.preset.io/) - the workspace connected to the staging database. Only relevant to those interested in analyzing https://dashboard.balena-staging.com/ data.

## What now?

Once you have familiarized yourself with the resources above, feel free to dive into the world of self-served product analytics.

Starting with “Charts” is always a good idea (no SQL knowledge required!). Every chart in every dashboard has a "View chart in Explore" option, showing exactly how the chart was made and allowing users to clone/modify it.
If it still feels intimidating, take a look at [this](https://drive.google.com/file/d/1t7Tl_kQzRyvt7WR9rZXHMCgnci95YS6c) demo where Pranas and Jasmine built a rolling 28-day signups chart from scratch in 10 minutes.

For advanced use cases, the “SQL Lab” feature allows building arbitrary virtual datasets to be used by charts and dashboards down the stream. The possibilities are almost endless!

Good luck!

## FAQ

- **Can I get access to Preset?**  
The answer is yes, regardless of your position at balena. Just send an #access request in the t/operations flow.

- **I had something very important in Chartio, is it gone for good?**  
While Chartio is no longer accessible, most of our business intelligence (e.g. queries underlying the charts) were backed up [here](https://github.com/balena-io/analytics-pipeline/tree/master/chartio/backup) and can be recreated.

- **Why wasn’t this rolled out earlier, before Chartio’s EOL?**  
It’s complicated. ["Analytics and Reporting: the quest to replace Chartio"](https://github.com/balena-io/balena-io/wiki/All-hands-presentations#fri-january-28--2022-analytics-and-reporting-the-quest-to-replace-chartio) all-hands presentation is the most comprehensible overview of the challenges along the way.

- **I couldn’t find the answer to my question, who can help?**  
Regarding Preset and analytics-related questions it’s always a good idea to ping the r/analytics flow.