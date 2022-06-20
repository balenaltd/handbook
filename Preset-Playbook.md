---
> **_TL;DR_** Preset is a platform to self-serve balenaCloud product analytics (regarding fleets, devices, users, etc.) and is available to every balenista.
Send an #access request in the t/operations flow and the ops team will take care of the rest.
---

In 2022 Chartio has been replaced by [Preset](https://preset.io/) (SaaS version of [Apache Superset](https://superset.apache.org/)). This reference guide provides an overview of the current situation, next steps, and usage instructions.

## General guidance

We know everyone hates reading documentation so we will try to get you up and running with the minimum amount of terminology needed. The key components of Preset are:
* **Dataset** – a table containing the data that is going to be plotted. All available datasets in each workspace can be found by clicking on "Data > Datasets". If you need to create your own dataset, please read the “Advanced use cases and datasets” section below. Note that if you click on a dataset, Preset creates a `Table` chart rather than directly showing a table.
*  **Chart** – a graph that visualizes the dataset. Charts can be of different types with some common choices at balena being `Table`, `Big Number with Trendline`, `Time-series` and `Pie Chart`.  
*  **Dashboard** – a collection of charts. Dashboards allow one to arrange charts and add headings and descriptions as text boxes but most importantly it is possible to define filters that can be applied to all dashboard charts.
*  **Workspace** - an organizational unit, accessible by team members, that is created for a specific purpose. Every workspace serves as an isolated Superset environment.

As mentioned earlier this playbook covers only the basics. Preset Docs and their YouTube channel are fantastic places if you ever feel stuck or simply want to expand your knowledge and plot fancier graphs.
* [Getting Started Guide by Preset](https://docs.preset.io/docs/welcome-to-preset) - a wiki-style resource covering core aspects of Preset. It is highly recommended you read through the `Terminology` and ` Data Visualizations` sub-sections.
* [Preset User's Corner YouTube channel](https://www.youtube.com/channel/UCzg8opP7sG8n0Mi0e8yeqAg) - the official channel serving bite-sized video tutorials on using various Preset functionalities.

Nevertheless, if you prefer all-in-one guides, there is an official 25-min long Preset onboarding video that also covers the basics discussed in this Playbook. You can find the video [here](https://youtu.be/hvp4NMgifqY).

## Company-specific workspace guidance

There are three workspaces accessible from[ the main dashboard](https://manage.app.preset.io/app), in order of expected relevance:
* [Balena Sandbox](https://868c5593.us2a.app.preset.io/) - the playground workspace that includes examples and real production resources. Feel free to experiment here without worrying about breaking anything. **This is the workspace** that you should be using when following the Preset Playbook for the first time.
* [Balena Analytics](https://373617ab.us2a.app.preset.io/) - the main workspace with real production resources. Currently similar to the playground but possibly will contain only verified/approved content in the future.
* [Balena Staging](https://d0671a1a.us2a.app.preset.io/) - the workspace connected to the staging database. Only relevant to those interested in analyzing[ https://dashboard.balena-staging.com](https://dashboard.balena-staging.com/) data.

## Plotting a chart

Once you have familiarized yourself with the resources above, feel free to dive into the world of self-served product analytics and plot a chart. Starting with “Charts” requires no SQL knowledge if you are using the available datasets! Now let’s plot a chart of the chargeable devices.
1. Click on “Charts” and then on the “+CHART” button.
2. Select an appropriate dataset. In this case, the “analytics fleet chargeable” dataset will do the job.
3. Choose a chart type. You can use the search box to find and select the “Time-series Chart”.
4. Click on the “Create New Chart” button at the bottom right.
5. Once you are on the actual Chart page you will see the dataset column names on the left hand (the data we are going to plot), the chart options in the middle panel, and the actual chart on the right-hand side. Don’t worry, it will appear soon!
6. To plot a time-series chart, we need to choose the time column, i.e. the x-axis, in the chart options panel. In our case `date` should already be pre-selected.
7. Then we need to select the y-axis metric. In this example, this is the sum of chargeable devices per day. Click on the + sign below “Metrics” and a new window will open.
8. Click on the tab called “Simple”, select the “devices_chargeable” column, and for aggregation select “Sum”. Before saving the metric it is recommended to click on top of the window and label it appropriately. Let’s call it “Chargeable devices”.
9.  Then click on “Save” and “Update Chart”.
10. There you go! Your first Preset chart is ready! Feel free to play with it and explore the customization settings, **you can’t break anything**!

If it still feels intimidating, take a look at [this](https://drive.google.com/file/d/1t7Tl_kQzRyvt7WR9rZXHMCgnci95YS6c) demo where Pranas and Jasmine built a rolling 28-day signups chart from scratch in 10 minutes.

Note that every chart in every dashboard has an "Edit chart" option, showing exactly how the chart was made and allowing users to clone/modify it.

For advanced use cases, the “SQL Lab” feature allows building arbitrary virtual datasets to be used by charts and dashboards down the stream. The possibilities are almost endless!

Good luck!

## Advanced use cases and datasets

Datasets are SQL queries under the hood. They can be 2 types – **physical**, where we directly copy a table from the database, or **virtual**, where we do some sort of data manipulation in the form of aggregation.
If you decide to create datasets on your own, here are a couple of useful tips that can help.
* You can click on the dataset dotted menu while exploring a dataset or a chart and click on “View in SQL Lab”. This will open a new tab with “SQL Lab” and show you the exact query.
* You can click on the chart dotted menu (next to the “Save” button) and view the query or run it in “SQL Lab”. Note that this is the query that generated the chart rather than the dataset.

“SQL Lab” can utilize some complex syntax and if you are not the query owner there is a slim chance that the query gives you an error when being inspected via the methods described above. In such a case, or if you need to create your own dataset but do not feel confident in your SQL skills, simply reach out to our Analytics team. They will be more than happy to help!

## FAQ

- **Can I get access to Preset?**  
The answer is yes, regardless of your position at balena. Just send an `#access` request in the `t/operations` flow.

- **I had something very important in Chartio, is it gone for good?**  
While Chartio is no longer accessible, most of our business intelligence (e.g. queries underlying the charts) were backed up [here](https://github.com/balena-io/analytics-pipeline/tree/master/chartio/backup) and can be recreated.

- **Why wasn’t this rolled out earlier, before Chartio’s EOL?**  
It’s complicated. ["Analytics and Reporting: the quest to replace Chartio"](https://github.com/balena-io/balena-io/wiki/All-hands-presentations#fri-january-28--2022-analytics-and-reporting-the-quest-to-replace-chartio) all-hands presentation is the most comprehensible overview of the challenges along the way.

- **I couldn’t find the answer to my question, who can help?**  
Regarding Preset and analytics-related questions it’s always a good idea to ping the r/analytics flow.