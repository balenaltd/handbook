"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[987],{3905:(e,t,a)=>{a.d(t,{Zo:()=>b,kt:()=>d});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},b=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),u=p(a),d=r,h=u["".concat(s,".").concat(d)]||u[d]||c[d]||o;return a?n.createElement(h,i(i({ref:t},b),{},{components:a})):n.createElement(h,i({ref:t},b))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},9089:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const o={},i="Github orgs",l={unversionedId:"balenalabs/github-orgs",id:"balenalabs/github-orgs",title:"Github orgs",description:"We\u2019ll be working within 4 main organizations:",source:"@site/docs/balenalabs/github-orgs.md",sourceDirName:"balenalabs",slug:"/balenalabs/github-orgs",permalink:"/balenalabs/github-orgs",draft:!1,editUrl:"https://github.com/balenaltd/handbook/edit/main/docs/balenalabs/github-orgs.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"balenaLabs",permalink:"/balenalabs/"},next:{title:"How we work",permalink:"/balenalabs/how-we-work"}},s={},p=[{value:"balena-io-playground",id:"balena-io-playground",level:2},{value:"balenaLabs-incubator",id:"balenalabs-incubator",level:2},{value:"balenaLabs",id:"balenalabs",level:2},{value:"balenaBlocks",id:"balenablocks",level:2}],b={toc:p};function c(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},b,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"github-orgs"},"Github orgs"),(0,r.kt)("p",null,"We\u2019ll be working within 4 main organizations:"),(0,r.kt)("h2",{id:"balena-io-playground"},(0,r.kt)("a",{parentName:"h2",href:"https://github.com/balena-io-playground"},"balena-io-playground")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"anything from initial proof-of-concept to basic promotion but not necessarily maintained and working"),"\nWhen working on and building a project, and whilst under development, the code should be stored and iterated upon whilst in the playground."),(0,r.kt)("h2",{id:"balenalabs-incubator"},(0,r.kt)("a",{parentName:"h2",href:"https://github.com/balenalabs-incubator"},"balenaLabs-incubator")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"interim state, could be being polished ready for promotion"),"\nWhen an MVP is reached and a project has a blog post published about it, the project should be promoted to the incubator and a comprehensive readme added (and linked to the public post)."),(0,r.kt)("h2",{id:"balenalabs"},(0,r.kt)("a",{parentName:"h2",href:"https://github.com/balenalabs"},"balenaLabs")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"top tier promoted and maintained projects"),"\nPopularity and user participation is monitored, if we decide the project needs further promotion/development and reaches the next level it can be promoted to the balenalabs org where it will receive a Landr website hosted on a subdomain on balenalabs.io, and should be maintained and supported."),(0,r.kt)("h2",{id:"balenablocks"},(0,r.kt)("a",{parentName:"h2",href:"https://github.com/balenablocks"},"balenaBlocks")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Primitive functional components forming part of app enablement"),"\nThe repos here are not apps or examples, they are the source for docker images, which users can pull into their apps, to provide them functionality such as data storage and charting. More info in this ",(0,r.kt)("a",{parentName:"p",href:"https://www.balena.io/blog/introducing-balenablocks-jumpstart-your-iot-app-development/"},"blog post")))}c.isMDXComponent=!0}}]);