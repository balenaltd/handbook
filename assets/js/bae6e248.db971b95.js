"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6628],{3905:(e,t,o)=>{o.d(t,{Zo:()=>c,kt:()=>d});var a=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,a,n=function(e,t){if(null==e)return{};var o,a,n={},r=Object.keys(e);for(a=0;a<r.length;a++)o=r[a],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)o=r[a],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var l=a.createContext({}),u=function(e){var t=a.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},c=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var o=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),h=u(o),d=n,m=h["".concat(l,".").concat(d)]||h[d]||p[d]||r;return o?a.createElement(m,s(s({ref:t},c),{},{components:o})):a.createElement(m,s({ref:t},c))}));function d(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=o.length,s=new Array(r);s[0]=h;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var u=2;u<r;u++)s[u]=o[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,o)}h.displayName="MDXCreateElement"},4894:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>u});var a=o(7462),n=(o(7294),o(3905));const r={},s="Basic tool setup",i={unversionedId:"onboarding/basic-tool-setup",id:"onboarding/basic-tool-setup",title:"Basic tool setup",description:"Basic tools",source:"@site/docs/onboarding/basic-tool-setup.md",sourceDirName:"onboarding",slug:"/onboarding/basic-tool-setup",permalink:"/onboarding/basic-tool-setup",draft:!1,editUrl:"https://github.com/balenaltd/handbook/edit/main/docs/onboarding/basic-tool-setup.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"balena Labs residency",permalink:"/onboarding/balena-labs-residency"},next:{title:"Help the team get to know you",permalink:"/onboarding/help-the-team-get-to-know-you"}},l={},u=[{value:"Basic tools",id:"basic-tools",level:2},{value:"Accounts you need as a dev",id:"accounts-you-need-as-a-dev",level:3},{value:"How to access services that require additional information/steps.",id:"how-to-access-services-that-require-additional-informationsteps",level:3},{value:"Short introduction to the services/tools we use",id:"short-introduction-to-the-servicestools-we-use",level:3}],c={toc:u};function p(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,a.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"basic-tool-setup"},"Basic tool setup"),(0,n.kt)("h2",{id:"basic-tools"},"Basic tools"),(0,n.kt)("p",null,"As mentioned at the start, once you log into your @balena.io e-mail account, you\u2019ll find lots of invitations to join our team in several services, online. These are tools the whole team is using on a daily basis and that will make your everyday balena life easier."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"NOTE:")," Important! You ",(0,n.kt)("strong",{parentName:"p"},"MUST")," use the same handle across Flowdock, Front, balena forums and GitHub. This is because integrations between services rely on matching handles. It will also make your life easier\nwhen it comes to auto-completing @-mentions."),(0,n.kt)("p",null,"For now, make sure you have access to the following services:"),(0,n.kt)("p",null,"Primary:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://www.flowdock.com/app"},"Flowdock")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://calamari.io"},"Calamari")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://frontapp.com/"},"Front")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com"},"Github")," (",(0,n.kt)("strong",{parentName:"li"},"You need to set up 2FA when you first login using the Yubikey you have"),". ",(0,n.kt)("em",{parentName:"li"},"This service requires additional information/steps before you get access."),")"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://jel.ly.fish/"},"Jellyfish")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://trello.com/"},"Trello")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://forums.balena.io/"},"Balena Forums Moderator Access - Discourse")," You can use ",(0,n.kt)("a",{parentName:"li",href:"https://forums.balena.io/invites/6a98ca4583c9f16879dd523f35a4c60b"},"this invitation link")," to get access to the forums. Moderation access needs to be requested though once you have signed up."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://drive.google.com/drive/folders/0BwAxLWVacuL_V3FFRVZmNE1vazg?resourcekey=0-4J9GBKcWBSkPJmTyxuwq5Q&usp=sharing"},"Shared Google Drive-Team Folder"))),(0,n.kt)("p",null,"Depending on your role and team you may have access to additional tech-related, biz-related or team-related tools. Also, if you are employed as a contractor you will have access to ",(0,n.kt)("a",{parentName:"p",href:"https://www.letsdeel.com/"},"Deel")," for invoicing etc, while others employed as employees will have access to ",(0,n.kt)("a",{parentName:"p",href:"https://www.expensify.com/"},"Expensify")," for examples. You will receive invites to any necessary services on Day 1 and then others will follow as they are needed. "),(0,n.kt)("h3",{id:"accounts-you-need-as-a-dev"},"Accounts you need as a dev"),(0,n.kt)("p",null,"You'll need to create accounts for these services and then ask in ",(0,n.kt)("inlineCode",{parentName:"p"},"t/operations")," to give you ",(0,n.kt)("inlineCode",{parentName:"p"},"#access")," to our internal resources."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://hub.docker.com"},"Docker Hub")," (scripts expect you do be ",(0,n.kt)("inlineCode",{parentName:"li"},"docker login"),"ed)"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://www.npmjs.com/"},"NPM.js")," (your access token should be in your ",(0,n.kt)("inlineCode",{parentName:"li"},"~/.npmrc"),")")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Last but very important note! Please bear in mind that to request and obtain access to any service, you need to get in touch with the operations team in the operations flow ",(0,n.kt)("inlineCode",{parentName:"strong"},"t/operations")," using @@operations and "),"#access",(0,n.kt)("strong",{parentName:"p"},". If you require access to a number of services, you can make one access request for all.")),(0,n.kt)("h3",{id:"how-to-access-services-that-require-additional-informationsteps"},"How to access services that require additional information/steps."),(0,n.kt)("p",null,"Github"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Share your username with the Operations team"),(0,n.kt)("li",{parentName:"ol"},"Accept the invitations you'll receive to the inbox connected to your Github account, to join the relevant Github organizations.")),(0,n.kt)("h3",{id:"short-introduction-to-the-servicestools-we-use"},"Short introduction to the services/tools we use"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Flowdock")," is the chat service we\u2019re using for internal communication. Flowdock is organized in flows that are related to specific balena components and teams. This is the best place to communicate with other team members and ask any questions you have. Here's a ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/balena-io/balena/wiki/Flowdock"},"guide")," we have put together and ",(0,n.kt)("a",{parentName:"p",href:"https://www.flowdock.com/help"},"here")," is some more guidance, including some markdown key info ",(0,n.kt)("a",{parentName:"p",href:"https://www.flowdock.com/help/chat_input"},"here")," to help you navigate in the flowdock world. You will soon come across many balena abbreviations and terms, so we have a ",(0,n.kt)("a",{parentName:"p",href:"https://docs.google.com/document/d/1GcHzn-Nxvnh4WWpspeVyJV9D8V890DLXZAOmwO7jB7c/edit"},"glossary")," to help you. This was a hack week project and it is work in progress, so feel free to add what you think might be missing from it :)"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Calamari")," is the leave management service we use. You\u2019ll be using Calamari to submit your time-off requests and check who\u2019s away.  Here's a short ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/balena-io/balena-io/wiki/Calamari"},"Calamari getting started guide")," for your convenience."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Front")," is the service we use to gather all team messages and emails and unite them in one platform. We respond to emails and messages from this platform. It\u2019s integrated with other services, such as Flowdock, Intercom, and Zendesk. Please note that all the Front inboxes you see are not personal -unless you decide to connect your personal inbox to Front- so please do not archive or delete any emails or messages you see, unless you're 100% sure about the process we follow for archiving messages and you know what you're doing. In addition, Front doesn't allow usernames with hyphens so if your GitHub handle has one (or more) then use the underscore instead. "),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Google Meet")," is the main service we\u2019re using for the company calls. You do not have to set up anything for this. When you create a calendar invite and add a participant, a google meet room/link will be automatically available for that invite."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Github*")," hosts all our public repos as well as the majority of our private repos. It\u2019s also part of the developer's workflow since this is the place where all issues and tasks are hosted. 2FA auth required! If you are not familiar with Github and how it works here are some links that the team has found helpful: ",(0,n.kt)("a",{parentName:"p",href:"https://guides.github.com/"},"github guides"),", ",(0,n.kt)("a",{parentName:"p",href:"https://ohshitgit.com/"},"Oh Shit, Git!?!")," & ",(0,n.kt)("a",{parentName:"p",href:"http://sethrobertson.github.io/GitFixUm/fixup.html"},"On undoing, fixing, or removing commits in git"),". Feel free to check with your buddy if you need a bit more help :)"),(0,n.kt)("p",null,"The ",(0,n.kt)("strong",{parentName:"p"},"forums")," are used by our free users for support requests, and generally for discussion about the product, hack Friday projects, etc. It's required that you have an account there because eventually, you'll need it for supporting users. Please don't forget to use the same handle you've used for other basic services (e.g. flowdock, front etc.)"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Jellyfish")," is a social knowledge database and the nerve center of productOS, a platform we are building for developing and maintaining products. It is under active development and is already being used to provide customer support for balena users. Once your Jellyfish account is set up, you will be prompted to change your password. You can check the ",(0,n.kt)("a",{parentName:"p",href:"https://docs.google.com/document/d/1psa9upjr__LDbF0442ndW72Nj8jAuA48mmqPdahQBUs/edit#heading=h.e986klys6hyc"},"Jellyfish specification doc")," for more info. "),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Trello")," is a tool we use to track progress for some of our projects. Some teams use it more than others at the moment. It allows more visibility of what everyone is working on within a team. It has boards, lists, and cards to enable you to organize and prioritize projects, tasks, goals and progress."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Shared Google Drive-Team Folder")," includes some key documents and archives for different projects and work. Depending on the team and area of work, you can find up to date information about some projects there, but Google Drive is surely not where you will find everything you need, so be aware that it includes some old information too. Follow the wiki and you will find links to all the services and sources we use to store key information and documents. "),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"NOTE"),": To avoid any confusion, you might see ",(0,n.kt)("inlineCode",{parentName:"p"},"resin")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"resin.io")," when reading older information. Balena used to be called resin.io and you can read more about the name change ",(0,n.kt)("a",{parentName:"p",href:"https://www.balena.io/blog/resin-io-changes-name-to-balena-releases-open-source-edition/"},"here"),". Rulemotion was the name before resin, although you will probably only see this one on Flowdock room names."))}p.isMDXComponent=!0}}]);