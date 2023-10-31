(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const c=1e3;let u=null;document.addEventListener("click",e=>{var s;const n=e.target;if(n.tagName==="BUTTON"&&n.id){const r={id:n.id,lastIndex:n.dataset.lastIndex,input:window.store.um};console.log(r);const t=n.parentElement.previousElementSibling;n.parentElement.insertAdjacentHTML("beforebegin",i(window.store.um,void 0,+r.lastIndex+1)),(s=t.nextElementSibling.querySelector("summary"))==null||s.focus(),n.dataset.lastIndex=+n.dataset.lastIndex+c,console.log(+n.dataset.lastIndex,window.store.um.length),+n.dataset.lastIndex+1>=window.store.um.length&&n.remove()}});function m(e){return[["&","&amp;"],["<","&lt;"],[">","&gt;"],['"',"&quot;"],["'","&#039;"]].reduce((s,r)=>s.replaceAll(...r),e)}function g(e,n){if(e===null)return'<span class="null">null</span>';const s=n!==void 0;u===null&&(u=document.querySelector(".viewer h2").dataset.isLarge==="true");let r=`
    ${s?`<details class="object-in-array" ${u?"":"open"}>
    <summary> ${n}: <span class="braces"></span> </summary>
    <ul>
    `:"<ul>"}
    `;return r+=Object.keys(e).map((t,o)=>{const a=Array.isArray(e[t]),l=typeof e[t]=="object"&&e[t]!==null,d=t==="";return a||l?`
            <li>
                <details open>
                    <summary>
                        ${d?"":`<span class="key">${m(t)}:</span>`}
                        ${l&&!a?'<span class="braces"></span>':""}
                        ${a?'<span class="brackets">[</span>':""}
                    </summary>
                    ${i(e[t])}
                </details>
            </li>
            `:`
        <li>
            <span class="key">${m(t)}:</span>
            ${i(e[t])}
        </li>
        `}).join(""),r+=`
        </ul>
    ${s?"</details>":""}
    `,r}function $(e,n,s=0){let r="";s===0&&(r+='<ol start="0">');const t=e.length;let o=!1;c<t&&(o=!0);for(let a=s;a<c+s;a++){const l=e[a];if(l===void 0)break;if(!Array.isArray(l)){r+=`<li>${i(l,a)}</li>`,o&&a===c-1&&(window.store={um:e},r+=`<li><button id="um" data-last-index="${a}"> Carregar mais...</button></li>`);continue}const d=a!==void 0?`<span class="index"> ${a}: </span>`:"";r+=`
        <li>
            <details open>
                <summary>
                    ${d}
                    <span class="key"></span>
                    <span class="brackets">[</span>
                </summary>
                ${i(l,a)}
            </details>
        </li>
        `}return s===0&&(r+="</ol>",r+='<span class="brackets">]</span>'),r}function b(e,n){return`
        ${n!==void 0?`<span class="index"> ${n}: </span>`:""}
        <span class="string">
            <span class="string_quotes">"</span>${m(e)}<span class="string_quotes">"</span>
        </span>`}function w(e,n){return`
        ${n!==void 0?`<span class="index"> ${n}: </span>`:""}
        <span class="${e}">${e}</span>
    `}function h(e,n){return`
        ${n!==void 0?`<span class="index"> ${n}: </span>`:""}
        <span class="number">${e}</span>
    `}function i(e,n,s){switch(Array.isArray(e)?"array":typeof e){case"object":return g(e,n);case"array":return $(e,n,s);case"string":return b(e,n);case"boolean":return w(e,n);case"number":return h(e,n);default:return e}}const p=new Worker("worker.js"),y=document.querySelector(".wellcome"),f=document.querySelector(".loading");p.onmessage=e=>{if(e.data instanceof Error){document.getElementById("msg-invalid-json").hidden=!1,f.hidden=!0,y.hidden=!1;return}document.getElementById("msg-invalid-json").hidden=!0;const n=document.querySelector(".viewer");let s=Array.isArray(e.data);f.hidden=!0,n.insertAdjacentHTML("beforeend",i(s?{"":e.data}:e.data))};const L=document.getElementById("input-file");L.onchange=async e=>{const{name:n,content:s}=await x(e.target),r=document.querySelector(".viewer h2");r.innerText=n,r.dataset.isLarge=s.length>162e4,y.hidden=!0,f.hidden=!1,p.postMessage({stringContent:s})};function x(e){return new Promise(n=>{const s=new FileReader;s.onload=()=>n({name:e.files[0].name,content:s.result}),s.readAsText(e.files[0],"latin1")})}
