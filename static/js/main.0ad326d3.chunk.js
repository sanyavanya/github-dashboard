(this["webpackJsonpgithub-dashboard"]=this["webpackJsonpgithub-dashboard"]||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a(17)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){e.exports=a.p+"static/media/spinner.23616449.png"},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(2),o=a.n(s),i=(a(12),a(3)),l=a(4),c=a(6),u=a(5),m=(a(13),function(e){var t=e.onInputChange,a=e.input;return r.a.createElement("div",null,r.a.createElement("input",{placeholder:"search on GitHub",className:"br3 f4 pa2 w-70",type:"text",value:a,onChange:t}))}),p=(a(14),function(e){var t=e.items;e.heading;return r.a.createElement("div",{className:"repoList"},t)}),g=(a(15),function(e){var t=e.pagesAmount,a=e.page,n=e.onPageChange,s=[];if(t>1){s=[r.a.createElement("span",{key:"leftbracket"},"[\xa0")];for(var o=1;o<=t;o++){var i="pageLink";o===a&&(i+=" current");var l=[r.a.createElement("li",{key:o,className:i,onClick:n,style:{display:"inline"}},o)],c=[r.a.createElement("span",{key:"separator ".concat(o)},",\xa0")];o<t&&(l=l.concat(c)),s=s.concat(l)}s=s.concat(r.a.createElement("span",{key:"rightbracket"},"\xa0]"))}return r.a.createElement("div",{id:"paginator"},s)}),h=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).onInputChange=function(t){e.setState({input:t.target.value}),e.setState({page:1}),localStorage.setItem("state",JSON.stringify(e.state)),e.setState({loading:!0});var a="";setTimeout((function(){a=e.state.input}),0),setTimeout((function(){a===e.state.input&&setTimeout((function(){return e.setItems()}),0)}),600)},e.onPageChange=function(t){e.setState({page:Number(t.target.innerHTML)}),localStorage.setItem("state",JSON.stringify(e.state)),setTimeout((function(){return e.setItems()}),0)},e.openCard=function(t){e.setState({loading:!0}),setTimeout((function(){fetch(t,{method:"get",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(t){var a=!1;0===t.size&&(a=!0);var n="https://github.com"+t.url.substr(28),s=[],o=[];a?t.description="This repo is empty.":fetch(t.languages_url,{method:"get",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=[];for(var a in e)t.push(a);var n=[];if(0!==t.length){for(var o=0;o<t.length;o++){var i=[r.a.createElement("li",{key:"lang li #"+o},t[o])];n=n.concat(i)}s=r.a.createElement("div",{key:"languages list"},r.a.createElement("div",{className:"listTitle"},"Languages used:"),r.a.createElement("ul",{key:"languages list"},n))}})).then((function(){fetch(t.contributors_url,{method:"get",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=[];if(Array.isArray(e)){var a=10;e.length<10&&(a=e.length);for(var n=0;n<a;n++){var s=[r.a.createElement("li",{key:"contr li #"+n},e[n].login)];t=t.concat(s)}o=1===e.length?r.a.createElement("div",{key:"contributors list"},e[0].login," is the only contributor."):r.a.createElement("div",{key:"contributors list"},r.a.createElement("div",{className:"listTitle"},"Top 10 contributors:"),r.a.createElement("ul",null,t))}else o=r.a.createElement("div",{key:"contributors list"},"The history or contributor list is too large to list contributors for this repository via the API.")}))}));var i=[r.a.createElement("div",{key:"cardDiv",className:"cardDiv"},r.a.createElement("div",{className:"ownerDiv"},r.a.createElement("img",{src:t.owner.avatar_url,alt:"avatar",className:"userpic"}),r.a.createElement("br",null),r.a.createElement("a",{href:"https://github.com"+t.owner.url.substr(28),className:"fatName"},t.owner.login)),r.a.createElement("div",{className:"repoDiv"},r.a.createElement("h3",{className:"repoName"},r.a.createElement("a",{href:n,className:"fatLink"},t.name)),r.a.createElement("span",{className:"repoStars"},r.a.createElement("span",{role:"img","aria-label":"star"},"\u2b50"),t.stargazers_count),r.a.createElement("br",null),"Last commit: ",t.updated_at.slice(0,-10)," at ",t.updated_at.slice(11,-4),r.a.createElement("br",null),r.a.createElement("br",null),t.description,r.a.createElement("br",null),r.a.createElement("br",null),s,o,r.a.createElement("br",null)))];e.setState({loading:!1}),e.setState({card:i}),e.setState({route:"card"}),localStorage.setItem("state",JSON.stringify(e.state))}))}),0)},e.setItems=function(){var t="";e.setState({loading:!0}),t=""===e.state.input?"https://api.github.com/search/repositories?q=stars%3A%3E100&sort=stars&order=desc&per_page=".concat(e.state.itemsPerPage,"&page=").concat(e.state.page):"https://api.github.com/search/repositories?q=".concat(e.state.input,"&sort=stars&order=desc&per_page=").concat(e.state.itemsPerPage,"&page=").concat(e.state.page),fetch(t,{method:"get",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(t){if(e.setState({loading:!1}),t.total_count>0){var a=e.state.itemsPerPage;t.total_count<10&&(a=t.total_count),""===e.state.input?e.setState({heading:[r.a.createElement("h2",{key:"top10"},"Top 10 GitHub repositories:")]}):e.setState({heading:[r.a.createElement("h2",{key:"mostpop"},"Most starred \u201c",e.state.input,"\u201d repositories on GitHub:")]});for(var n=[r.a.createElement("thead",{key:"thead"},r.a.createElement("tr",null,r.a.createElement("th",null,"Rank"),r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Rating"),r.a.createElement("th",null,"Updated"),r.a.createElement("th",null,"URL")))],s=[],o=function(a){var n="https://github.com"+t.items[a].url.substr(28),o=[r.a.createElement("tr",{key:"key"+a},r.a.createElement("td",null,"#",e.state.itemsPerPage*(e.state.page-1)+a+1),r.a.createElement("td",null,r.a.createElement("span",{className:"fatName",onClick:function(){return e.openCard(t.items[a].url)}},t.items[a].name)),r.a.createElement("td",null,r.a.createElement("span",{role:"img","aria-label":"star"},"\u2b50"),t.items[a].stargazers_count),r.a.createElement("td",null,t.items[a].updated_at.slice(0,-10)),r.a.createElement("td",null,r.a.createElement("a",{href:n,className:"fatLink"},n.substr(8))))];s=s.concat(o)},i=0;i<a;i++)o(i);var l=[r.a.createElement("tbody",{key:"tbody"},s)],c=[r.a.createElement("table",{key:"table"},n,l)];if(e.setState({items:c}),localStorage.setItem("state",JSON.stringify(e.state)),""!==e.state.input)if(t.total_count>=e.state.itemsPerPage*e.state.pagesAmountMax)e.setState({pagesAmount:e.state.pagesAmountMax});else{var u=Math.floor(t.total_count/e.state.itemsPerPage);t.total_count%e.state.itemsPerPage!==0&&u++,e.setState({pagesAmount:u}),localStorage.setItem("state",JSON.stringify(e.state))}else e.setState({pagesAmount:1}),localStorage.setItem("state",JSON.stringify(e.state))}else e.setState({heading:[r.a.createElement("h2",{key:"notfound"},"No \u201c",e.state.input,"\u201d repositories found on GitHub!")],items:[],pagesAmount:1,page:1})})).catch((function(t){e.setState({loading:!1}),e.setState({items:[r.a.createElement("div",{key:"err"},"We are limited to 10 requests per minute :(")],heading:[r.a.createElement("h2",{key:"mostpop"},"Oops!")]}),localStorage.setItem("state",JSON.stringify(e.state))}))},e.state={card:"",route:"home",cardName:"",input:"",items:[],itemsPerPage:10,loading:!0,page:1,pagesAmountMax:10,pagesAmount:1,heading:[r.a.createElement("h2",{key:"mostpop"},"Top 10 GitHub repositories:")]},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("state");t&&(t=JSON.parse(t),this.setState({input:t.input,page:t.page})),setTimeout((function(){return e.setItems()}),0)}},{key:"render",value:function(){var e=this,t=[r.a.createElement("div",{key:"spinner",className:"spinnerWrap"},r.a.createElement("img",{src:a(16),alt:"...",className:"spinner"}))],n=[r.a.createElement("h2",{key:"mostpop"},"Loading...")];return this.state.loading||(t=this.state.items,n=this.state.heading),r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,r.a.createElement("span",{id:"gh"},"GitHub")," ",r.a.createElement("span",{id:"db"},"Dashboard")),"home"===this.state.route?r.a.createElement("div",null,r.a.createElement(m,{onInputChange:this.onInputChange,input:this.state.input}),n,r.a.createElement(p,{items:t}),r.a.createElement(g,{pagesAmount:this.state.pagesAmount,page:this.state.page,onPageChange:this.onPageChange})):r.a.createElement("div",null,r.a.createElement("span",{className:"fatName",onClick:function(){return e.setState({route:"home"})}},"\u2190 Back to Dashboard"),r.a.createElement("br",null),r.a.createElement("br",null),this.state.card),r.a.createElement("footer",null,"\xa92020 ",r.a.createElement("a",{href:"https://github.com/sanyavanya"},"@sanyavanya")))}}]),n}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[7,1,2]]]);
//# sourceMappingURL=main.0ad326d3.chunk.js.map