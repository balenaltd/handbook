"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1123],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=l,h=d["".concat(u,".").concat(m)]||d[m]||s[m]||a;return n?r.createElement(h,o(o({ref:t},p),{},{components:n})):r.createElement(h,o({ref:t},p))}));function m(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,o=new Array(a);o[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:l,o[1]=i;for(var c=2;c<a;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6489:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>u});var r=n(7462),l=(n(7294),n(3905));const a={},o="Change Log",i={type:"mdx",permalink:"/CHANGELOG",source:"@site/src/pages/CHANGELOG.md",title:"Change Log",description:"All notable changes to this project will be documented in this file",frontMatter:{}},u=[{value:"1.3.1 - 2022-09-21",id:"131---2022-09-21",level:2},{value:"1.3.0 - 2022-09-21",id:"130---2022-09-21",level:2},{value:"1.2.2 - 2022-09-05",id:"122---2022-09-05",level:2},{value:"1.2.1 - 2022-09-05",id:"121---2022-09-05",level:2},{value:"1.2.0 - 2022-09-02",id:"120---2022-09-02",level:2},{value:"1.1.1 - 2022-09-02",id:"111---2022-09-02",level:2},{value:"1.1.0 - 2022-09-02",id:"110---2022-09-02",level:2},{value:"1.0.2 - 2022-08-31",id:"102---2022-08-31",level:2},{value:"1.0.1 - 2022-08-29",id:"101---2022-08-29",level:2},{value:"1.0.0 - 2022-08-27",id:"100---2022-08-27",level:2}],c={toc:u};function p(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"change-log"},"Change Log"),(0,l.kt)("p",null,"All notable changes to this project will be documented in this file\nautomatically by Versionist. DO NOT EDIT THIS FILE MANUALLY!\nThis project adheres to ",(0,l.kt)("a",{parentName:"p",href:"http://semver.org/"},"Semantic Versioning"),"."),(0,l.kt)("h2",{id:"131---2022-09-21"},"1.3.1 - 2022-09-21"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Remove Zoom from basic tool setup ","[apostolism]")),(0,l.kt)("h2",{id:"130---2022-09-21"},"1.3.0 - 2022-09-21"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Replace Passpack with Bitwarden ","[apostolism]")),(0,l.kt)("h2",{id:"122---2022-09-05"},"1.2.2 - 2022-09-05"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Update workflow step descriptions ","[Kyle Harding]")),(0,l.kt)("h2",{id:"121---2022-09-05"},"1.2.1 - 2022-09-05"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Deploy GitHub Pages previews and clean them up on closed PRs ","[Kyle Harding]")),(0,l.kt)("h2",{id:"120---2022-09-02"},"1.2.0 - 2022-09-02"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Created ",(0,l.kt)("inlineCode",{parentName:"li"},"how we work")," section to document idioms ","[20k-ultra]"),(0,l.kt)("li",{parentName:"ul"},"Moved doughnut call doc to Culture folder ","[20k-ultra]")),(0,l.kt)("h2",{id:"111---2022-09-02"},"1.1.1 - 2022-09-02"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Expose change log ","[Chris Crocker-White]")),(0,l.kt)("h2",{id:"110---2022-09-02"},"1.1.0 - 2022-09-02"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Move security guidelines to the new security.balena.io handbook ","[Micah Halter]")),(0,l.kt)("h2",{id:"102---2022-08-31"},"1.0.2 - 2022-08-31"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Update custom Flowzone finalize action to use new inputs ","[Kyle Harding]")),(0,l.kt)("h2",{id:"101---2022-08-29"},"1.0.1 - 2022-08-29"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Remove specific node versions for testing ","[Kyle Harding]")),(0,l.kt)("h2",{id:"100---2022-08-27"},"1.0.0 - 2022-08-27"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Remove the changelog and reset the version to 1.0.0 ","[Kyle Harding]"),(0,l.kt)("li",{parentName:"ul"},"Move deploy workflow to a Flowzone composite action ","[Kyle Harding]"),(0,l.kt)("li",{parentName:"ul"},"Add search ","[Chris Crocker-White]"),(0,l.kt)("li",{parentName:"ul"},"Add CNAME file ","[Chris Crocker-White]"),(0,l.kt)("li",{parentName:"ul"},"Remove duplicate hardware process files ","[Anuj Deshpande]"),(0,l.kt)("li",{parentName:"ul"},"Initial commit of the new public handbook ","[Kyle Harding]")))}p.isMDXComponent=!0}}]);