import{initializeApp as n}from"https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";import{getAnalytics as c}from"https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const f={apiKey:"AIzaSyD01xjfPGJDlffFYOk-2XTyrPTDTzXTtJg",authDomain:"intersinee.firebaseapp.com",projectId:"intersinee",storageBucket:"intersinee.appspot.com",messagingSenderId:"31453578951",appId:"1:31453578951:web:a8af142250fea8d09e60e2",measurementId:"G-W6THT95LWW"},a=n(f);c(a);
