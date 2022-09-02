"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9597],{3905:(e,a,t)=>{t.d(a,{Zo:()=>c,kt:()=>d});var n=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function i(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=n.createContext({}),p=function(e){var a=n.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):s(s({},a),e)),t},c=function(e){var a=p(e.components);return n.createElement(l.Provider,{value:a},e.children)},u={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},m=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(t),d=r,y=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return t?n.createElement(y,s(s({ref:a},c),{},{components:t})):n.createElement(y,s({ref:a},c))}));function d(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=m;var i={};for(var l in a)hasOwnProperty.call(a,l)&&(i[l]=a[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var p=2;p<o;p++)s[p]=t[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},7988:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=t(7462),r=(t(7294),t(3905));const o={},s="Password Management",i={unversionedId:"tooling/passwords-management-passpack",id:"tooling/passwords-management-passpack",title:"Password Management",description:"Starting from Day 1, you\u2019ll be required to join a list of services that you\u2019ll be using on a daily basis. Also, depending on your job position and the team that you\u2019ll join, you\u2019ll be given access to additional services. We strongly recommend using a password management service to manage all your passwords and logins. In any case, NEVER keep your passwords in a notebook. NEVER share your, or company\u2019s, passwords with anyone.",source:"@site/docs/tooling/passwords-management-passpack.md",sourceDirName:"tooling",slug:"/tooling/passwords-management-passpack",permalink:"/tooling/passwords-management-passpack",draft:!1,editUrl:"https://github.com/balenaltd/handbook/edit/main/docs/tooling/passwords-management-passpack.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Jellyfish FAQ\u2019s",permalink:"/tooling/jellyfish-faqs"},next:{title:"Preset Playbook",permalink:"/tooling/preset-playbook"}},l={},p=[],c={toc:p};function u(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"password-management"},"Password Management"),(0,r.kt)("p",null,"Starting from Day 1, you\u2019ll be required to join a list of services that you\u2019ll be using on a daily basis. Also, depending on your job position and the team that you\u2019ll join, you\u2019ll be given access to additional services. We strongly recommend using a password management service to manage all your passwords and logins. In any case, NEVER keep your passwords in a notebook. NEVER share your, or company\u2019s, passwords with anyone. "),(0,r.kt)("p",null,"If you don\u2019t know of any password management services to manage all your passwords, take a look and choose from the list below: "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://bitwarden.com"},"Bitwarden")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://keepass.info/"},"Keepass")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://lastpass.com/"},"Lastpass")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.dashlane.com/"},"Dashlane")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://1password.com/"},"1Password")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.passwordstore.org"},"Pass"))),(0,r.kt)("p",null,"Balena is using ",(0,r.kt)("a",{parentName:"p",href:"https://www.passpack.com/online/"},"Passpack")," to manage passwords centrally and share them with team members when needed. As soon as you need shared log in details to access a service, you will be required to create a Passpack account, using your @balena.io e-mail account and share your nickname with the Operations team. Make sure you sign up for Passpack v7 though (not v8!!) and ",(0,r.kt)("a",{parentName:"p",href:"https://support.passpack.com/hc/en-us#200038679"},"activate sharing"),". You can sign up and follow the instructions ",(0,r.kt)("a",{parentName:"p",href:"https://support.passpack.com/hc/en-us/articles/200730564-How-to-Activate-Secure-Collaboration-Features#passpack7"},"here")," to activate the secure collaboration feature. You can ask the Operations Team by pinging @@operations and ",(0,r.kt)("strong",{parentName:"p"},"#access")," in Jellyfish and they will share any passwords you require to access services through Passpack."))}u.isMDXComponent=!0}}]);