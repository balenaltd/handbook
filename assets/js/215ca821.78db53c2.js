"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2352],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=d(n),h=o,f=m["".concat(s,".").concat(h)]||m[h]||u[h]||r;return n?a.createElement(f,i(i({ref:t},c),{},{components:n})):a.createElement(f,i({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var d=2;d<r;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7186:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var a=n(7462),o=(n(7294),n(3905));const r={},i="Meetings",l={unversionedId:"meetings/README",id:"meetings/README",title:"Meetings",description:"The Balena Admin calendar contains all our company calls. Make sure it's added to your Google Calendar list (calendar ID admin@balena.io). In addition, bear in mind that the Balena Admin calendar follows London time, which is GMT+1 during British Summer Time (Daylight Saving Time), and GMT otherwise. You are free to join any calls (we do try to keep some calls that might include sensitive information in smaller groups and if that is the case, someone on the call will let you know) but it\u2019s not mandatory if you don\u2019t belong to the specific project team. Joining a few different calls when you are new is a good way to familiarise yourself with different projects and processes and get an idea of how different type of calls are facilitated and flow. Feel free to participate and ask questions too!",source:"@site/docs/meetings/README.md",sourceDirName:"meetings",slug:"/meetings/",permalink:"/meetings/",draft:!1,editUrl:"https://github.com/balenaltd/handbook/edit/main/docs/meetings/README.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Hardware Process",permalink:"/hardware/Hardware-Process"},next:{title:"Brainstorm calls",permalink:"/meetings/brainstorm-calls"}},s={},d=[{value:"Adding yourself to (or removing yourself from) Balena Admin calendar events",id:"adding-yourself-to-or-removing-yourself-from-balena-admin-calendar-events",level:2},{value:"Meeting recordings",id:"meeting-recordings",level:2}],c={toc:d};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"meetings"},"Meetings"),(0,o.kt)("p",null,"The Balena Admin calendar contains all our company calls. Make sure it's added to your Google Calendar list (calendar ID ",(0,o.kt)("inlineCode",{parentName:"p"},"admin@balena.io"),"). In addition, bear in mind that the Balena Admin calendar follows London time, which is GMT+1 during British Summer Time (Daylight Saving Time), and GMT otherwise. You are free to join any calls (we do try to keep some calls that might include sensitive information in smaller groups and if that is the case, someone on the call will let you know) but it\u2019s not mandatory if you don\u2019t belong to the specific project team. Joining a few different calls when you are new is a good way to familiarise yourself with different projects and processes and get an idea of how different type of calls are facilitated and flow. Feel free to participate and ask questions too! "),(0,o.kt)("p",null,"We have the following fixed-time meetings on the Balena Admin calendar, recurring week-to-week:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"all-hands calls; this is our weekly company wide call"),(0,o.kt)("li",{parentName:"ul"},"brainstorms, including per-loop architecture calls and product calls")),(0,o.kt)("p",null,"Then, we also have check-in calls for specific projects that are either fixed or scheduled ad-hoc from week to week, focussing on tracking the progress and updates on individual projects and pipelines. Depending on what we are working on at the time, some calls might be added with a fixed cadence and stay on the calendar for a while, or these might be added on a more ad-hoc basis and for a limited time for smaller projects or when focusing on kicking off a project. Regardless, you can join any call! "),(0,o.kt)("p",null,"Not all, but most calendar invites will also have a spec or relevant document linked to give you more information about the call. If you want to know more about how meetings can be scheduled and the balena meeting scheduler, you can read more ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/balena-io/meeting-scheduler"},"here"),"."),(0,o.kt)("p",null,"We use ",(0,o.kt)("a",{parentName:"p",href:"/meetings/brainstorm-calls"},"brainstorm calls")," to discuss new ideas, issues and solutions. For more guidance on how we run brainstorm calls, check out this ",(0,o.kt)("a",{parentName:"p",href:"https://docs.google.com/document/d/1mHb-D2vJxufa8OZPU55V5WBIXuQ44MNL4fcXw52lEe8/edit#"},"guide"),". "),(0,o.kt)("p",null,"We have one no-scheduled-meetings-week every month to allow more time for everyone to focus on their work and get in any ad-hoc calls and catch ups that end up being difficult to do during a regularly scheduled week. These weeks will only have the company-wide, all-hands call scheduled as normal. "),(0,o.kt)("p",null,"Calls are grouped by loop in order to reduce context switching and allow balenistas to group their calls in fewer days. Just a reminder that ",(0,o.kt)("inlineCode",{parentName:"p"},"loops")," is an approach and system we have been working on for a while and you can get an introduction and more information by watching the relevant summit recordings or watch ",(0,o.kt)("a",{parentName:"p",href:"https://drive.google.com/file/d/1xHaZredpmAN5Ewb8lro6LovkVLVjIDJE/view"},"this video")," to get an overview. As with everything at balena, the best way to get more context and understanding is by asking questions and talking to your teammates! "),(0,o.kt)("h2",{id:"adding-yourself-to-or-removing-yourself-from-balena-admin-calendar-events"},"Adding yourself to (or removing yourself from) Balena Admin calendar events"),(0,o.kt)("p",null,"We all have write/edit access to the Admin calendar. Please use it carefully! "),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"What to do:")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Check the fixed-time-meetings, and add yourself as a guest to all events that you will attend. If you'll attend a meeting every week (or need to keep the option open to attend), select the ",(0,o.kt)("inlineCode",{parentName:"li"},"This and following events")," option."),(0,o.kt)("li",{parentName:"ul"},"Also, if you are on the guest list of meetings that you do not / will not attend, please remove yourself from these."),(0,o.kt)("li",{parentName:"ul"},"You can add events that would be of interest to the whole team and you can decide if you want to invite the team (using ",(0,o.kt)("a",{parentName:"li",href:"mailto:team@balena.io"},"team@balena.io"),") or not. Regardless, adding an event to the admin calendar means that anyone is welcome to join :) ")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"The goal:")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Making sure everyone's calendars reflect their meeting attendance as closely as possible."),(0,o.kt)("li",{parentName:"ul"},"Eliminating the occurrence where you create new events on your personal calendar as reminders to attend Admin calendar events, since they fall out of sync when the Admin calendar is updated.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"What NOT to do:")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Please do not ever remove events from the Balena Admin calendar.")),(0,o.kt)("h2",{id:"meeting-recordings"},"Meeting recordings"),(0,o.kt)("p",null,"Most regular meetings are always recorded and available for those who are not able to attend in real-time and/or want to re-visit for finer information. These include but are not limited to company-wide calls and calls such as brainstorm, architecture and product calls. You will most probably find the link to the recording and any notes if you click on the calendar invite. If the call is using GoogleMeet and it is recorded, the recording will automatically attach to the invite after the call ends (allow some time after the call for the recording to show up). You can use this recording function for any of your calls if you find it useful."))}u.isMDXComponent=!0}}]);