"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5567],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),d=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=d(e.components);return o.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=d(n),h=a,u=m["".concat(l,".").concat(h)]||m[h]||p[h]||i;return n?o.createElement(u,r(r({ref:t},c),{},{components:n})):o.createElement(u,r({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,r[1]=s;for(var d=2;d<i;d++)r[d]=n[d];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2401:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var o=n(7462),a=(n(7294),n(3905));const i={},r="Model Framework",s={unversionedId:"tooling/model-framework",id:"tooling/model-framework",title:"Model Framework",description:"We have an ensemble of models in Google Sheets, designed for storing data and reporting on various aspects of the company, for example keeping track of service subscriptions, customers and resulting revenue, and team member attributes, including salaries. Most of these models also have TypeScript code living in Github repositories, containing customized code to execute the more involved processing not achievable with native GSheets functions.",source:"@site/docs/tooling/model-framework.md",sourceDirName:"tooling",slug:"/tooling/model-framework",permalink:"/tooling/model-framework",draft:!1,editUrl:"https://github.com/balenaltd/handbook/edit/main/docs/tooling/model-framework.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Google Calendar",permalink:"/tooling/google-calendar"},next:{title:"Preset Playbook",permalink:"/tooling/preset-playbook"}},l={},d=[{value:"Importing data from one GSheet into another",id:"importing-data-from-one-gsheet-into-another",level:2},{value:"People with access to B also allowed access all of A",id:"people-with-access-to-b-also-allowed-access-all-of-a",level:3},{value:"People with access to B not allowed access to all of A",id:"people-with-access-to-b-not-allowed-access-to-all-of-a",level:3},{value:"Notes",id:"notes",level:3},{value:"Visualizing the links between our models",id:"visualizing-the-links-between-our-models",level:2}],c={toc:d};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"model-framework"},"Model Framework"),(0,a.kt)("p",null,"We have an ensemble of models in Google Sheets, designed for storing data and reporting on various aspects of the company, for example keeping track of service subscriptions, customers and resulting revenue, and team member attributes, including salaries. Most of these models also have TypeScript code living in Github repositories, containing customized code to execute the more involved processing not achievable with native GSheets functions."),(0,a.kt)("p",null,"As our models and the associated functionality have expanded, a strong need has developed to express a common framework for these models, including various aspects such as formalizing shared data structures, tracking how data is shared across the models, extracting commonly used functions to shared npm libraries, and implementing a CI/CD pipeline."),(0,a.kt)("p",null,"This aim of this section is to express this common framework, and thus serve as a guideline for current and new developers of our models. Google Sheets represent a very flexible environment, hence we ask all contributors to carefully follow these guidelines, to ensure we retain the much-needed coherence and structure across our models."),(0,a.kt)("p",null,"NB: This is very much a living and growing document, so if you have any suggestions on how to improve the framework, please create an issue in the relevant repository and/or initiate a conversation in Zulip."),(0,a.kt)("h2",{id:"importing-data-from-one-gsheet-into-another"},"Importing data from one GSheet into another"),(0,a.kt)("p",null,"Let's say there exists a sheet named ",(0,a.kt)("inlineCode",{parentName:"p"},"X")," within the GSheet named ",(0,a.kt)("inlineCode",{parentName:"p"},"A"),", and we need the data within sheet ",(0,a.kt)("inlineCode",{parentName:"p"},"X")," for some calculations in the GSheet named ",(0,a.kt)("inlineCode",{parentName:"p"},"B"),". There are two cases to consider:"),(0,a.kt)("h3",{id:"people-with-access-to-b-also-allowed-access-all-of-a"},"People with access to B also allowed access all of A"),(0,a.kt)("p",null,"In this case, the following steps are needed:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Make sure that GSheet ",(0,a.kt)("inlineCode",{parentName:"li"},"B")," has a ",(0,a.kt)("inlineCode",{parentName:"li"},"MANIFEST")," tab where GSheet A is imported, for example ",(0,a.kt)("a",{parentName:"li",href:"https://docs.google.com/spreadsheets/d/1RsQjoMqQaw2Xv_Dk6UobmsBSnNJy2cGuKE57C2qIo2s/edit#gid=0"},"here"),". If setting up a new connection, you will need to click in column C of the ",(0,a.kt)("inlineCode",{parentName:"li"},"MANIFEST")," to allow access."),(0,a.kt)("li",{parentName:"ul"},"Within GSheet ",(0,a.kt)("inlineCode",{parentName:"li"},"B"),", create a sheet named ",(0,a.kt)("inlineCode",{parentName:"li"},"A: X"),", and change its colour to red (indicating it is an import). Import the necessary data from ",(0,a.kt)("inlineCode",{parentName:"li"},"X")," by using an ",(0,a.kt)("inlineCode",{parentName:"li"},"IMPORTRANGE")," statement based on the ",(0,a.kt)("inlineCode",{parentName:"li"},"MANIFEST"),", for example ",(0,a.kt)("a",{parentName:"li",href:"https://docs.google.com/spreadsheets/d/1RsQjoMqQaw2Xv_Dk6UobmsBSnNJy2cGuKE57C2qIo2s/edit#gid=926876263"},"here"),". The simplest option is to import all columns with a single ",(0,a.kt)("inlineCode",{parentName:"li"},"IMPORTRANGE")," in cell ",(0,a.kt)("inlineCode",{parentName:"li"},"A1"),". You can also import a subset of columns, making use of multiple ",(0,a.kt)("inlineCode",{parentName:"li"},"IMPORTRANGE")," statements if necessary. However, please use ",(0,a.kt)("inlineCode",{parentName:"li"},"IMPORTRANGE")," only in row 1 and not further down as well, to make the sheet easier for others to understand at a glace."),(0,a.kt)("li",{parentName:"ul"},"For those instances in ",(0,a.kt)("inlineCode",{parentName:"li"},"B")," where you need the data from ",(0,a.kt)("inlineCode",{parentName:"li"},"X"),", you can now use a direct cell reference to the ",(0,a.kt)("inlineCode",{parentName:"li"},"A: X")," sheet. The goal is not to use ",(0,a.kt)("inlineCode",{parentName:"li"},"IMPORTRANGE")," in any other sheets apart from the ",(0,a.kt)("inlineCode",{parentName:"li"},"MANIFEST"),", and the red reference sheets formatted like ",(0,a.kt)("inlineCode",{parentName:"li"},"A: X"),".")),(0,a.kt)("h3",{id:"people-with-access-to-b-not-allowed-access-to-all-of-a"},"People with access to B not allowed access to all of A"),(0,a.kt)("p",null,"In this case, people with access to GSheet ",(0,a.kt)("inlineCode",{parentName:"p"},"B")," are allowed access to (all, or a subset of) the contents of ",(0,a.kt)("inlineCode",{parentName:"p"},"X"),", but not necessarily to the other sheets in GSheet ",(0,a.kt)("inlineCode",{parentName:"p"},"A"),". Allowing ",(0,a.kt)("inlineCode",{parentName:"p"},"B")," access to ",(0,a.kt)("inlineCode",{parentName:"p"},"A")," like we did in the ",(0,a.kt)("inlineCode",{parentName:"p"},"MANIFEST")," in the previous section, can thus create privacy issues and is best avoided. Therefore, in this case, we do not use the ",(0,a.kt)("inlineCode",{parentName:"p"},"MANIFEST")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"IMPORTRANGE")," as above. What we do instead is to have a script connected to ",(0,a.kt)("inlineCode",{parentName:"p"},"B"),", pushing the necessary data from ",(0,a.kt)("inlineCode",{parentName:"p"},"X")," into the red sheet named ",(0,a.kt)("inlineCode",{parentName:"p"},"A: X")," within ",(0,a.kt)("inlineCode",{parentName:"p"},"A"),"."),(0,a.kt)("p",null,"Going forward, we should probably find a way to reflect this type of push in the ",(0,a.kt)("inlineCode",{parentName:"p"},"MANIFEST")," of ",(0,a.kt)("inlineCode",{parentName:"p"},"A")," as well."),(0,a.kt)("h3",{id:"notes"},"Notes"),(0,a.kt)("p",null,"The guidelines above were chosen and applied across all our models, since this is what we have already been doing in most cases. The upside of these red ",(0,a.kt)("inlineCode",{parentName:"p"},"IMPORTRANGE"),' tabs are (a) they make it easy to understand at a glance which data flows into the GSheet in question, and (b) they dramatically simplify the searching algorithm used when refreshing the visualization created by the "GSheet Model Structure" project linked below.'),(0,a.kt)("p",null,"However, one obvious downside is that they lead to duplication of data, which can be problematic in cases where the importing sheet is already very large. "),(0,a.kt)("h2",{id:"visualizing-the-links-between-our-models"},"Visualizing the links between our models"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/company-os/gsheet-model-structure"},"GSheet Model Structure")," project presents an automatically updated visualization of how the various GSheets in our ecosystem are connected."))}p.isMDXComponent=!0}}]);