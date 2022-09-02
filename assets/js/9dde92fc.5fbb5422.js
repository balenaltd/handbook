"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6764],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>d});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),c=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(a),d=n,h=u["".concat(s,".").concat(d)]||u[d]||m[d]||o;return a?r.createElement(h,i(i({ref:t},p),{},{components:a})):r.createElement(h,i({ref:t},p))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=a[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},1492:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=a(7462),n=(a(7294),a(3905));const o={},i="Brainstorm calls",l={unversionedId:"meetings/brainstorm-calls",id:"meetings/brainstorm-calls",title:"Brainstorm calls",description:"Brainstorm calls are core to how we work and reflect our approach for finding the highest-possible quality answer to the issues we face. You can read more about the brainstorm! game here. Brainstorm calls are scoped by loop and type.",source:"@site/docs/meetings/brainstorm-calls.md",sourceDirName:"meetings",slug:"/meetings/brainstorm-calls",permalink:"/meetings/brainstorm-calls",draft:!1,editUrl:"https://github.com/balenaltd/handbook/edit/main/docs/meetings/brainstorm-calls.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Meetings",permalink:"/meetings/"},next:{title:"Doughnut Calls",permalink:"/meetings/doughnut-calls"}},s={},c=[{value:"Brainstorm types",id:"brainstorm-types",level:2},{value:"Loop specific brainstorm calls",id:"loop-specific-brainstorm-calls",level:2},{value:"balena.io brainstorms",id:"balenaio-brainstorms",level:3},{value:"Creating and submitting brainstorm topics",id:"creating-and-submitting-brainstorm-topics",level:3},{value:"balena.io brainstorm",id:"balenaio-brainstorm",level:3},{value:"productOS brainstorms",id:"productos-brainstorms",level:3},{value:"teamOS brainstorm - product/arch combined",id:"teamos-brainstorm---productarch-combined",level:3},{value:"companyOS brainstorm - product/arch combined",id:"companyos-brainstorm---productarch-combined",level:3},{value:"How to run a brainstorm call",id:"how-to-run-a-brainstorm-call",level:2}],p={toc:c};function m(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"brainstorm-calls"},"Brainstorm calls"),(0,n.kt)("p",null,"Brainstorm calls are core to how we work and reflect our approach for finding the highest-possible quality answer to the issues we face. You can read more about the ",(0,n.kt)("strong",{parentName:"p"},"brainstorm!")," game ",(0,n.kt)("a",{parentName:"p",href:"https://docs.google.com/document/d/1mHb-D2vJxufa8OZPU55V5WBIXuQ44MNL4fcXw52lEe8/edit#"},"here"),". Brainstorm calls are scoped by loop and type. "),(0,n.kt)("p",null,"You can navigate brainstorm ",(0,n.kt)("a",{parentName:"p",href:"https://jel.ly.fish/view-all-brainstorm-calls"},"calls")," and ",(0,n.kt)("a",{parentName:"p",href:"https://jel.ly.fish/view-all-brainstorm-topics"},"topics")," in Jellyfish."),(0,n.kt)("h2",{id:"brainstorm-types"},"Brainstorm types"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"product")," for questions around ",(0,n.kt)("inlineCode",{parentName:"li"},"what")," we want to do (i.e. what can be done to reduce a certain kind of friction for users)"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"architecture")," or ",(0,n.kt)("inlineCode",{parentName:"li"},"arch")," for ",(0,n.kt)("inlineCode",{parentName:"li"},"how")," questions, such as \u201chow should a certain feature be implemented\u201d")),(0,n.kt)("h2",{id:"loop-specific-brainstorm-calls"},"Loop specific brainstorm calls"),(0,n.kt)("h3",{id:"balenaio-brainstorms"},"balena.io brainstorms"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Product calls")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Arch calls")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Commercial"),(0,n.kt)("p",{parentName:"li"},"  Commercial calls take place once a week and are led by the Customer Success team. It is the time and (virtual) place where we discuss the sales/customer success team process, pricing plans, and commercial strategy. Everyone is welcome to join.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Outreach"),(0,n.kt)("p",{parentName:"li"},"  Outreach brainstorm calls take place once a week and are led by the outreach team. Brainstorm prompts and items usually come up when we need the collective thinking power and ideas from the group. Everyone is welcome to join. "))),(0,n.kt)("h3",{id:"creating-and-submitting-brainstorm-topics"},"Creating and submitting brainstorm topics"),(0,n.kt)("p",null,"You can add brainstorm topics ",(0,n.kt)("a",{parentName:"p",href:"https://jel.ly.fish/view-all-brainstorm-topics"},"here")," in Jellyfish."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Select the green '+' icon in the bottom right of the page. "),(0,n.kt)("li",{parentName:"ol"},"You will need to include information about your topic ",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"name - the title of your topic / question or discussion point summary"),(0,n.kt)("li",{parentName:"ul"},"loop - select the relevant loop of your topic"),(0,n.kt)("li",{parentName:"ul"},"category - the call you want the topic to be assigned to e.g. 'balena.io Product'"),(0,n.kt)("li",{parentName:"ul"},"reporter - your jellyfish handle"),(0,n.kt)("li",{parentName:"ul"},"description - as much information, context, links. etc as you can give"),(0,n.kt)("li",{parentName:"ul"},"JF links - link out to relevant patterns, support threads, improvements. etc")))),(0,n.kt)("h3",{id:"balenaio-brainstorm"},"balena.io brainstorm"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"product"),(0,n.kt)("p",{parentName:"li"},"  These take place twice a week and are lead by the product team. We discuss user experience UX, feature idea/questions and implementation plans.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"arch"),(0,n.kt)("p",{parentName:"li"},"  These take place twice a week and we generally try to come up with the highest-possibly quality solutions to tackle non-trivial technical issues across the balenaCloud platform.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"hardware"),(0,n.kt)("p",{parentName:"li"},"  These take place twice a week and we discuss topics pertaining to hardware and distribution."))),(0,n.kt)("h3",{id:"productos-brainstorms"},"productOS brainstorms"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"product"),(0,n.kt)("p",{parentName:"li"},"  It takes place weekly and is where we discuss user experience (UX), feature ideas, and prioritization for productOS. ")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"arch "),(0,n.kt)("p",{parentName:"li"},"  It takes place weekly and is where we generally try to come up with the highest-possibly quality solutions to tackle non-trivial technical issues for productOS.\n",(0,n.kt)("em",{parentName:"p"},"You can find more information about loopMVP in the ",(0,n.kt)("a",{parentName:"em",href:"https://docs.google.com/document/d/17_EnBWn_JKQzlAE98UiHp4cuy-l50Ist2_q-c24ojds/edit#heading=h.o9drtpe4wedmunder"},"productOS draft spec")," and the ",(0,n.kt)("a",{parentName:"em",href:"https://docs.google.com/document/d/18G1vzYte-wSmoVLmPafG4gWm6eJ4ZUDCs40llWgc9s8/edit#heading=h.lj0g2s7qd8jq"},"productOS team manual"),".")))),(0,n.kt)("h3",{id:"teamos-brainstorm---productarch-combined"},"teamOS brainstorm - product/arch combined"),(0,n.kt)("p",null,"TeamOS calls take place once a week and are led by the teamOS team. It is the time and (virtual) place where we discuss team processes, policies, team feedback and the overall user experience for the team. Everyone is welcome to join."),(0,n.kt)("h3",{id:"companyos-brainstorm---productarch-combined"},"companyOS brainstorm - product/arch combined"),(0,n.kt)("p",null,"CompanyOS calls take place once a week and are led by the team members that form the companyOS team. It is the time and (virtual) place where we discuss our company architecture - legal, financial and operational. Everyone is welcome to join."),(0,n.kt)("h2",{id:"how-to-run-a-brainstorm-call"},"How to run a brainstorm call"),(0,n.kt)("p",null,"Brainstorm calls are for everyone to both participate and run. I'll take the balena-io architecture call as an example, but the same principles and tooling applies to any other brainstorm call."),(0,n.kt)("p",null,"Once a team member raises an item for a brainstorm call as described above, that will be created in Jellyfish marked with the appropriate loop and category. You can find all submitted items ",(0,n.kt)("a",{parentName:"p",href:"https://jel.ly.fish/view-all-brainstorm-topics"},"here"),". Once you are on that page, it is advised that you apply the appropriate filter for the brainstorm call you are running (eg. ",(0,n.kt)("inlineCode",{parentName:"p"},'category is "balena-io architecture"'),"), and save the view. Once saved, it will appear on the left-hand side menu which you can easily access later on."),(0,n.kt)("p",null,"A couple of hours before the scheduled call, ping everyone in Jellyfish to notify them that they need to participate in the brainstorm. Once everyone joins the call, you can share the list of topics on your screen and start tackling them one by one. Most brainstorms are recorded for anyone can watch them later. You will find the recordings attached to the calendar invites. "),(0,n.kt)("p",null,"When it comes to prioritizing topics, it's a good practice to ask if there is anything urgent that blocks anyone from progressing on their project. If there is nothing that is urgent, you can start from the oldest first. Some things to keep in mind during a brainstorm:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"If you see a topic is taking too long to resolve or is going nowhere, suggest having an ad-hoc call so other topics can be handled as well"),(0,n.kt)("li",{parentName:"ul"},"Make sure people introduce the problem first before jumping to a solution. In general, you need to moderate ",(0,n.kt)("a",{parentName:"li",href:"https://docs.google.com/document/d/1mHb-D2vJxufa8OZPU55V5WBIXuQ44MNL4fcXw52lEe8/edit"},"these principles for participating in a brainstorm")),(0,n.kt)("li",{parentName:"ul"},"Remind people to summarize and close topics"),(0,n.kt)("li",{parentName:"ul"},"As a general rule, it's good to verbally summarize what was discussed around a topic, just to make sure that everyone is on the same page.")))}m.isMDXComponent=!0}}]);