"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6030],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(a),u=r,m=d["".concat(s,".").concat(u)]||d[u]||h[u]||o;return a?n.createElement(m,i(i({ref:t},c),{},{components:a})):n.createElement(m,i({ref:t},c))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},2559:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const o={},i="Preset Playbook",l={unversionedId:"tooling/preset-playbook",id:"tooling/preset-playbook",title:"Preset Playbook",description:"_TL;DR_ Preset is a platform to self-serve balenaCloud product analytics (regarding fleets, devices, users, etc.) and is available to every balenista.",source:"@site/docs/tooling/preset-playbook.md",sourceDirName:"tooling",slug:"/tooling/preset-playbook",permalink:"/tooling/preset-playbook",draft:!1,editUrl:"https://github.com/balenaltd/handbook/edit/main/docs/tooling/preset-playbook.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Google Calendar",permalink:"/tooling/google-calendar"},next:{title:"WSL2",permalink:"/tooling/wsl-2"}},s={},p=[{value:"General guidance",id:"general-guidance",level:2},{value:"Company-specific workspace guidance",id:"company-specific-workspace-guidance",level:2},{value:"Plotting a chart",id:"plotting-a-chart",level:2},{value:"Advanced use cases and datasets",id:"advanced-use-cases-and-datasets",level:2},{value:"FAQ",id:"faq",level:2}],c={toc:p};function h(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"preset-playbook"},"Preset Playbook"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"TL;DR"))," Preset is a platform to self-serve balenaCloud product analytics (regarding fleets, devices, users, etc.) and is available to every balenista.\nSend an #access request to @@operations in Jellyfish and the operations team will take care of the rest."),(0,r.kt)("hr",null),(0,r.kt)("p",null,"In 2022 Chartio has been replaced by ",(0,r.kt)("a",{parentName:"p",href:"https://preset.io/"},"Preset")," (SaaS version of ",(0,r.kt)("a",{parentName:"p",href:"https://superset.apache.org/"},"Apache Superset"),"). This reference guide provides an overview of the current situation, next steps, and usage instructions."),(0,r.kt)("h2",{id:"general-guidance"},"General guidance"),(0,r.kt)("p",null,"We know everyone hates reading documentation so we will try to get you up and running with the minimum amount of terminology needed. The key components of Preset are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Dataset"),' \u2013 a table containing the data that is going to be plotted. All available datasets in each workspace can be found by clicking on "Data > Datasets". If you need to create your own dataset, please read the \u201cAdvanced use cases and datasets\u201d section below. Note that if you click on a dataset, Preset creates a ',(0,r.kt)("inlineCode",{parentName:"li"},"Table")," chart rather than directly showing a table."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Chart")," \u2013 a graph that visualizes the dataset. Charts can be of different types with some common choices at balena being ",(0,r.kt)("inlineCode",{parentName:"li"},"Table"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"Big Number with Trendline"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"Time-series")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"Pie Chart"),".  "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Dashboard")," \u2013 a collection of charts. Dashboards allow one to arrange charts and add headings and descriptions as text boxes but most importantly it is possible to define filters that can be applied to all dashboard charts."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Workspace")," - an organizational unit, accessible by team members, that is created for a specific purpose. Every workspace serves as an isolated Superset environment.")),(0,r.kt)("p",null,"As mentioned earlier this playbook covers only the basics. Preset Docs and their YouTube channel are fantastic places if you ever feel stuck or simply want to expand your knowledge and plot fancier graphs."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.preset.io/docs/welcome-to-preset"},"Getting Started Guide by Preset")," - a wiki-style resource covering core aspects of Preset. It is highly recommended you read through the ",(0,r.kt)("inlineCode",{parentName:"li"},"Terminology")," and ",(0,r.kt)("inlineCode",{parentName:"li"}," Data Visualizations")," sub-sections."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.youtube.com/channel/UCzg8opP7sG8n0Mi0e8yeqAg"},"Preset User's Corner YouTube channel")," - the official channel serving bite-sized video tutorials on using various Preset functionalities.")),(0,r.kt)("p",null,"Nevertheless, if you prefer all-in-one guides, there is an official 25-min long Preset onboarding video that also covers the basics discussed in this Playbook. You can find the video ",(0,r.kt)("a",{parentName:"p",href:"https://youtu.be/hvp4NMgifqY"},"here"),"."),(0,r.kt)("h2",{id:"company-specific-workspace-guidance"},"Company-specific workspace guidance"),(0,r.kt)("p",null,"There are three workspaces accessible from",(0,r.kt)("a",{parentName:"p",href:"https://manage.app.preset.io/app"}," the main dashboard"),", in order of expected relevance:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://868c5593.us2a.app.preset.io/"},"Balena Sandbox")," - the playground workspace that includes examples and real production resources. Feel free to experiment here without worrying about breaking anything. ",(0,r.kt)("strong",{parentName:"li"},"This is the workspace")," that you should be using when following the Preset Playbook for the first time."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://373617ab.us2a.app.preset.io/"},"Balena Analytics")," - the main workspace with real production resources. Currently similar to the playground but possibly will contain only verified/approved content in the future."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://d0671a1a.us2a.app.preset.io/"},"Balena Staging")," - the workspace connected to the staging database. Only relevant to those interested in analyzing",(0,r.kt)("a",{parentName:"li",href:"https://dashboard.balena-staging.com/"}," https://dashboard.balena-staging.com")," data.")),(0,r.kt)("h2",{id:"plotting-a-chart"},"Plotting a chart"),(0,r.kt)("p",null,"Once you have familiarized yourself with the resources above, feel free to dive into the world of self-served product analytics and plot a chart. Starting with \u201cCharts\u201d requires no SQL knowledge if you are using the available datasets! Now let\u2019s plot a chart of the chargeable devices."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Click on \u201cCharts\u201d and then on the \u201c+CHART\u201d button."),(0,r.kt)("li",{parentName:"ol"},"Select an appropriate dataset. In this case, the \u201canalytics fleet chargeable\u201d dataset will do the job."),(0,r.kt)("li",{parentName:"ol"},"Choose a chart type. You can use the search box to find and select the \u201cTime-series Chart\u201d."),(0,r.kt)("li",{parentName:"ol"},"Click on the \u201cCreate New Chart\u201d button at the bottom right."),(0,r.kt)("li",{parentName:"ol"},"Once you are on the actual Chart page you will see the dataset column names on the left hand (the data we are going to plot), the chart options in the middle panel, and the actual chart on the right-hand side. Don\u2019t worry, it will appear soon!"),(0,r.kt)("li",{parentName:"ol"},"To plot a time-series chart, we need to choose the time column, i.e. the x-axis, in the chart options panel. In our case ",(0,r.kt)("inlineCode",{parentName:"li"},"date")," should already be pre-selected."),(0,r.kt)("li",{parentName:"ol"},"Then we need to select the y-axis metric. In this example, it is the sum of chargeable devices per day. Click on the + sign below \u201cMetrics\u201d and a new window will open."),(0,r.kt)("li",{parentName:"ol"},"Click on the tab called \u201cSimple\u201d, select the \u201cdevices_chargeable\u201d column, and for aggregation select \u201cSum\u201d. Before saving the metric it is recommended to click on top of the window and label it appropriately. Let\u2019s call it \u201cChargeable devices\u201d."),(0,r.kt)("li",{parentName:"ol"},"Then click on \u201cSave\u201d and \u201cUpdate Chart\u201d."),(0,r.kt)("li",{parentName:"ol"},"There you go! Your first Preset chart is ready! Feel free to play with it and explore the customization settings, ",(0,r.kt)("strong",{parentName:"li"},"you can\u2019t break anything"),"!")),(0,r.kt)("p",null,"If it still feels intimidating, take a look at ",(0,r.kt)("a",{parentName:"p",href:"https://drive.google.com/file/d/1t7Tl_kQzRyvt7WR9rZXHMCgnci95YS6c"},"this")," demo where Pranas and Jasmine built a rolling 28-day signups chart from scratch in 10 minutes."),(0,r.kt)("p",null,'Note that every chart in every dashboard has an "Edit chart" option, showing exactly how the chart was made and allowing users to clone/modify it.'),(0,r.kt)("p",null,"For advanced use cases, the \u201cSQL Lab\u201d feature allows building arbitrary virtual datasets to be used by charts and dashboards down the stream. The possibilities are almost endless!"),(0,r.kt)("p",null,"Good luck!"),(0,r.kt)("h2",{id:"advanced-use-cases-and-datasets"},"Advanced use cases and datasets"),(0,r.kt)("p",null,"Datasets are SQL queries under the hood. They can be 2 types \u2013 ",(0,r.kt)("strong",{parentName:"p"},"physical"),", where we directly copy a table from the database, or ",(0,r.kt)("strong",{parentName:"p"},"virtual"),", where we do some sort of data manipulation in the form of aggregation.\nIf you decide to create datasets on your own, here are a couple of useful tips that can help."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"You can click on the dataset dotted menu while exploring a dataset or a chart and click on \u201cView in SQL Lab\u201d. This will open a new tab with \u201cSQL Lab\u201d and show you the exact query."),(0,r.kt)("li",{parentName:"ul"},"You can click on the chart dotted menu (next to the \u201cSave\u201d button) and view the query or run it in \u201cSQL Lab\u201d. Note that this is the query that generated the chart rather than the dataset.")),(0,r.kt)("p",null,"\u201cSQL Lab\u201d can utilize some complex syntax and if you are not the query owner there is a slim chance that the query gives you an error when being inspected via the methods described above. In such a case, or if you need to create your own dataset but do not feel confident in your SQL skills, simply reach out to our Analytics team. They will be more than happy to help!"),(0,r.kt)("h2",{id:"faq"},"FAQ"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Can I get access to Preset?"),(0,r.kt)("br",{parentName:"p"}),"\n","The answer is yes, regardless of your position at balena. Send an #access request to @@operations in Jellyfish.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"I had something very important in Chartio, is it gone for good?"),(0,r.kt)("br",{parentName:"p"}),"\n","While Chartio is no longer accessible, most of our business intelligence (e.g. queries underlying the charts) were backed up ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/balena-io/analytics-pipeline/tree/master/chartio/backup"},"here")," and can be recreated.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Why wasn\u2019t this rolled out earlier, before Chartio\u2019s EOL?"),(0,r.kt)("br",{parentName:"p"}),"\n","It\u2019s complicated. ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/balena-io/balena-io/wiki/All-hands-presentations#fri-january-28--2022-analytics-and-reporting-the-quest-to-replace-chartio"},'"Analytics and Reporting: the quest to replace Chartio"')," all-hands presentation is the most comprehensible overview of the challenges along the way.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"I couldn\u2019t find the answer to my question, who can help?"),(0,r.kt)("br",{parentName:"p"}),"\n","Regarding Preset and analytics-related questions it\u2019s always a good idea to ping @@analytics in Jellyfish."))))}h.isMDXComponent=!0}}]);