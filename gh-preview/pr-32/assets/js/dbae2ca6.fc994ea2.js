"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1123],{3905:(e,t,l)=>{l.d(t,{Zo:()=>c,kt:()=>m});var n=l(7294);function r(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function a(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function i(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?a(Object(l),!0).forEach((function(t){r(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):a(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function o(e,t){if(null==e)return{};var l,n,r=function(e,t){if(null==e)return{};var l,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)l=a[n],t.indexOf(l)>=0||(r[l]=e[l]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)l=a[n],t.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(r[l]=e[l])}return r}var u=n.createContext({}),p=function(e){var t=n.useContext(u),l=t;return e&&(l="function"==typeof e?e(t):i(i({},t),e)),l},c=function(e){var t=p(e.components);return n.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var l=e.components,r=e.mdxType,a=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=p(l),m=r,k=s["".concat(u,".").concat(m)]||s[m]||d[m]||a;return l?n.createElement(k,i(i({ref:t},c),{},{components:l})):n.createElement(k,i({ref:t},c))}));function m(e,t){var l=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=l.length,i=new Array(a);i[0]=s;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<a;p++)i[p]=l[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,l)}s.displayName="MDXCreateElement"},6489:(e,t,l)=>{l.r(t),l.d(t,{contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>u});var n=l(7462),r=(l(7294),l(3905));const a={},i="Change Log",o={type:"mdx",permalink:"/CHANGELOG",source:"@site/src/pages/CHANGELOG.md",title:"Change Log",description:"All notable changes to this project will be documented in this file",frontMatter:{}},u=[{value:"2.2.2 - 2022-10-19",id:"222---2022-10-19",level:2},{value:"2.2.1 - 2022-10-19",id:"221---2022-10-19",level:2},{value:"2.2.0 - 2022-10-17",id:"220---2022-10-17",level:2},{value:"2.1.0 - 2022-09-26",id:"210---2022-09-26",level:2},{value:"2.0.0 - 2022-09-26",id:"200---2022-09-26",level:2},{value:"1.4.2 - 2022-09-22",id:"142---2022-09-22",level:2},{value:"1.4.1 - 2022-09-21",id:"141---2022-09-21",level:2},{value:"1.4.0 - 2022-09-21",id:"140---2022-09-21",level:2},{value:"1.3.1 - 2022-09-21",id:"131---2022-09-21",level:2},{value:"1.3.0 - 2022-09-21",id:"130---2022-09-21",level:2},{value:"1.2.2 - 2022-09-05",id:"122---2022-09-05",level:2},{value:"1.2.1 - 2022-09-05",id:"121---2022-09-05",level:2},{value:"1.2.0 - 2022-09-02",id:"120---2022-09-02",level:2},{value:"1.1.1 - 2022-09-02",id:"111---2022-09-02",level:2},{value:"1.1.0 - 2022-09-02",id:"110---2022-09-02",level:2},{value:"1.0.2 - 2022-08-31",id:"102---2022-08-31",level:2},{value:"1.0.1 - 2022-08-29",id:"101---2022-08-29",level:2},{value:"1.0.0 - 2022-08-27",id:"100---2022-08-27",level:2}],p={toc:u};function c(e){let{components:t,...l}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"change-log"},"Change Log"),(0,r.kt)("p",null,"All notable changes to this project will be documented in this file\nautomatically by Versionist. DO NOT EDIT THIS FILE MANUALLY!\nThis project adheres to ",(0,r.kt)("a",{parentName:"p",href:"http://semver.org/"},"Semantic Versioning"),"."),(0,r.kt)("h2",{id:"222---2022-10-19"},"2.2.2 - 2022-10-19"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Use inherited secrets for the flowzone workflow ","[Page-]"),(0,r.kt)("li",{parentName:"ul"},"Revert flowzone config to be able to correctly run/version ","[Page-]"),(0,r.kt)("li",{parentName:"ul"},"Improve preview deploy commit message ","[Page-]"),(0,r.kt)("li",{parentName:"ul"},"Fix custom clean command ","[Page-]"),(0,r.kt)("li",{parentName:"ul"},"Do not run flowzone when the PR is closed without merging. ","[Carlo Miguel F. Cruz]")),(0,r.kt)("h2",{id:"221---2022-10-19"},"2.2.1 - 2022-10-19"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Update README.md ","[Edwin Joassart]")),(0,r.kt)("h2",{id:"220---2022-10-17"},"2.2.0 - 2022-10-17"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"updated basic tool setup - gh handle as username ","[Laura Alison]")),(0,r.kt)("h2",{id:"210---2022-09-26"},"2.1.0 - 2022-09-26"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Add additional features to zulip guide ","[Laura Alison]")),(0,r.kt)("h2",{id:"200---2022-09-26"},"2.0.0 - 2022-09-26"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Added Zulip section to the handbook ","[Chris Crocker-White]")),(0,r.kt)("h2",{id:"142---2022-09-22"},"1.4.2 - 2022-09-22"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Remove Flowdock from basic tool setup ","[apostolism]")),(0,r.kt)("h2",{id:"141---2022-09-21"},"1.4.1 - 2022-09-21"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Fix build command ","[Anuj Deshpande]")),(0,r.kt)("h2",{id:"140---2022-09-21"},"1.4.0 - 2022-09-21"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"remove event info from leave policy ","[Jasmine Gilbert]")),(0,r.kt)("h2",{id:"131---2022-09-21"},"1.3.1 - 2022-09-21"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Remove Zoom from basic tool setup ","[apostolism]")),(0,r.kt)("h2",{id:"130---2022-09-21"},"1.3.0 - 2022-09-21"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Replace Passpack with Bitwarden ","[apostolism]")),(0,r.kt)("h2",{id:"122---2022-09-05"},"1.2.2 - 2022-09-05"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Update workflow step descriptions ","[Kyle Harding]")),(0,r.kt)("h2",{id:"121---2022-09-05"},"1.2.1 - 2022-09-05"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Deploy GitHub Pages previews and clean them up on closed PRs ","[Kyle Harding]")),(0,r.kt)("h2",{id:"120---2022-09-02"},"1.2.0 - 2022-09-02"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Created ",(0,r.kt)("inlineCode",{parentName:"li"},"how we work")," section to document idioms ","[20k-ultra]"),(0,r.kt)("li",{parentName:"ul"},"Moved doughnut call doc to Culture folder ","[20k-ultra]")),(0,r.kt)("h2",{id:"111---2022-09-02"},"1.1.1 - 2022-09-02"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Expose change log ","[Chris Crocker-White]")),(0,r.kt)("h2",{id:"110---2022-09-02"},"1.1.0 - 2022-09-02"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Move security guidelines to the new security.balena.io handbook ","[Micah Halter]")),(0,r.kt)("h2",{id:"102---2022-08-31"},"1.0.2 - 2022-08-31"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Update custom Flowzone finalize action to use new inputs ","[Kyle Harding]")),(0,r.kt)("h2",{id:"101---2022-08-29"},"1.0.1 - 2022-08-29"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Remove specific node versions for testing ","[Kyle Harding]")),(0,r.kt)("h2",{id:"100---2022-08-27"},"1.0.0 - 2022-08-27"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Remove the changelog and reset the version to 1.0.0 ","[Kyle Harding]"),(0,r.kt)("li",{parentName:"ul"},"Move deploy workflow to a Flowzone composite action ","[Kyle Harding]"),(0,r.kt)("li",{parentName:"ul"},"Add search ","[Chris Crocker-White]"),(0,r.kt)("li",{parentName:"ul"},"Add CNAME file ","[Chris Crocker-White]"),(0,r.kt)("li",{parentName:"ul"},"Remove duplicate hardware process files ","[Anuj Deshpande]"),(0,r.kt)("li",{parentName:"ul"},"Initial commit of the new public handbook ","[Kyle Harding]")))}c.isMDXComponent=!0}}]);