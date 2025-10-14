// components/FooterScripts.tsx
"use client";

import Script from "next/script";
import React from "react";

export default function FooterScripts() {
  return (
    <>
      {/* GTM */}
      <Script id="gtm" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MPVX3X3');
        `}
      </Script>

      {/* Affiliate Tracking */}
      <Script id="affiliate" strategy="lazyOnload">
        {`
          const params = new URLSearchParams(window.location.search);
          var oib = params.get('oib') || "";
          var exit = "https://app.afterprime.com/live?oib=" + oib;

          var _uf = _uf || {};
          _uf.domain = ".afterprime.com";
          _uf.initial_utm_params = true;
          _uf.additional_params_map = { clickid: "AFFILIATE" };
          _uf.additional_initial_params_map = { clickid: "IAFFILIATE" };
          _uf.secure = true;
          _uf.sessionLength = 1;
          _uf.add_to_form = "first";
          _uf.form_query_selector = 'form[action="/sign_up"]';
          _uf.decode_uris = true;

          class UtmCookie {
            constructor(options = {}) {
              this._cookieNamePrefix = "_gpfx_";
              this._domain = options.domain;
              this._secure = options.secure || false;
              this._initialUtmParams = options.initialUtmParams || false;
              this._sessionLength = options.sessionLength || 1;
              this._cookieExpiryDays = options.cookieExpiryDays || 30;
              this._additionalParams = options.additionalParams || [];
              this._additionalInitialParams = options.additionalInitialParams || [];
              this._utmParams = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","fbclid","rdclid"];
              this.writeInitialReferrer();
              this.writeLastReferrer();
              this.writeVisitorId();
              this.writeIBReferrer();
              this.writeInitialLandingPageUrl();
              this.writeAdditionalInitialParams();
              this.setCurrentSession();
              if(this._initialUtmParams){this.writeInitialUtmCookieFromParams();}
              if(this.additionalParamsPresentInUrl()){this.writeAdditionalParams();}
              if(this.utmPresentInUrl()){this.writeUtmCookieFromParams();}
            }

            createCookie(name,value,days,path,domain,secure){
              var expireDate=null;
              if(days){let date=new Date(); date.setTime(date.getTime() + days*24*60*60*1000); expireDate=date;}
              let cookieExpire = expireDate? "; expires="+expireDate.toGMTString():"";
              let cookiePath = path? "; path="+path:"; path=/";
              let cookieDomain = domain? "; domain="+domain:"";
              let cookieSecure = secure? "; secure":"";
              document.cookie=this._cookieNamePrefix+name+"="+escape(value)+cookieExpire+cookiePath+cookieDomain+cookieSecure;
            }

            readCookie(name){
              let nameEQ=this._cookieNamePrefix+name+"=";
              let ca=document.cookie.split(';');
              for(let i=0;i<ca.length;i++){let c=ca[i];while(c.charAt(0)==' ') c=c.substring(1,c.length); if(c.indexOf(nameEQ)==0) return c.substring(nameEQ.length,c.length);}
              return null;
            }

            eraseCookie(name){ this.createCookie(name,"",-1,null,this._domain,this._secure); }

            getParameterByName(name) {
            return new URLSearchParams(window.location.search).get(name) || "";
            }

            additionalParamsPresentInUrl(){ return this._additionalParams.some(p=>this.getParameterByName(p)); }
            utmPresentInUrl(){ return this._utmParams.some(p=>this.getParameterByName(p)); }

            writeCookie(name,value){ this.createCookie(name,value,this._cookieExpiryDays,null,this._domain,this._secure); }
            writeCookieOnce(name,value){ if(!this.readCookie(name)){ this.writeCookie(name,value); } }

            writeAdditionalParams(){ this._additionalParams.forEach(p=>{ this.writeCookie(p,this.getParameterByName(p)); }); }
            writeAdditionalInitialParams(){ this._additionalInitialParams.forEach(p=>{ this.writeCookieOnce("initial_"+p,this.getParameterByName(p)||null); }); }
            writeUtmCookieFromParams(){ this._utmParams.forEach(p=>{ this.writeCookie(p,this.getParameterByName(p)); }); }
            writeInitialUtmCookieFromParams(){ this._utmParams.forEach(p=>{ this.writeCookieOnce("initial_"+p,this.getParameterByName(p)||null); }); }

            _sameDomainReferrer(ref){ let h=document.location.hostname; return ref.indexOf(this._domain)>-1 || ref.indexOf(h)>-1; }
            writeInitialReferrer(){ let v=document.referrer, url=window.location.href; if(v.includes("facebook")) v="facebook"; if(v.includes("youtube")) v="youtube"; if(v.includes("twitter")||v.includes("t.co")) v="twitter"; if(v.includes("linkedin")) v="linkedin"; if(v.includes("instagram")) v="instagram"; if(v.includes("bing")) v="bing"; if(v.includes("google")&&!url.includes("gclid=")) v="organic search"; if(v.includes("google")&&url.includes("gclid=")) v="google ppc"; if(v.includes("bing")&&url.includes("utm_medium=cpc")) v="bing ppc"; if(this._sameDomainReferrer(v)) v="direct"; this.writeCookieOnce("referrer",v);}
            writeLastReferrer(){ let v=document.referrer, url=window.location.href; if(v.includes("facebook")) v="facebook"; if(v.includes("youtube")) v="youtube"; if(v.includes("twitter")||v.includes("t.co")) v="twitter"; if(v.includes("linkedin")) v="linkedin"; if(v.includes("instagram")) v="instagram"; if(v.includes("bing")) v="bing"; if(v.includes("google")&&!url.includes("gclid=")) v="organic search"; if(v.includes("google")&&url.includes("gclid=")) v="google ppc"; if(v.includes("bing")&&url.includes("utm_medium=cpc")) v="bing ppc"; if(this._sameDomainReferrer(v)) v="direct"; this.writeCookie("last_referrer",v);}
            writeIBReferrer(){ let v=this.getParameterByName("clickId"); if(v) this.writeCookie("ib_referrer",v); }
            writeVisitorId(){ let old=this.lastVisitor(); if(old){ this.writeCookie("visitor_id",old); return; } old=localStorage.getItem("_gpfx_visitor_id"); if(old){ this.writeCookie("visitor_id",old); return; } const userAgent=navigator.userAgent, t=Date.now(), r=Math.random().toString(36).substring(2,15), id=btoa(r+"|"+t+"|"+userAgent).substring(0,32); this.writeCookie("visitor_id",id); localStorage.setItem("_gpfx_visitor_id",id); }
            writeInitialLandingPageUrl(){ this.writeCookieOnce("initial_landing_page", window.location.origin + window.location.pathname + window.location.search + window.location.hash); }
            lastVisitor(){ return this.readCookie("visitor_id"); }
            initialReferrer(){ return this.readCookie("referrer"); }
            lastReferrer(){ return this.readCookie("last_referrer"); }
            initialLandingPageUrl(){ return this.readCookie("initial_landing_page"); }
            incrementVisitCount(){ let n=parseInt(this.readCookie("visits"),10); this.writeCookie("visits",isNaN(n)?1:n+1); }
            visits(){ return this.readCookie("visits"); }
            setCurrentSession(){ if(!this.readCookie("current_session")){ this.createCookie("current_session","true",this._sessionLength/24,null,this._domain,this._secure); this.incrementVisitCount(); } }
          }

          class UtmForm {
            constructor(options={}) {
              this._utmParamsMap={utm_source:"USOURCE",utm_medium:"UMEDIUM",utm_campaign:"UCAMPAIGN",utm_content:"UCONTENT",utm_term:"UTERM"};
              this._initialUtmParamsMap={initial_utm_source:"IUSOURCE",initial_utm_medium:"IUMEDIUM",initial_utm_campaign:"IUCAMPAIGN",initial_utm_content:"IUCONTENT",initial_utm_term:"IUTERM"};
              this._additionalParamsMap = options.additional_params_map || {};
              this._additionalInitialParamsMap = options.additional_initial_params_map || {};
              this._initialReferrerField="IREFERRER";
              this._lastReferrerField="LREFERRER";
              this._initialLandingPageField="ILANDPAGE";
              this._visitsField="VISITS";
              this._addToForm=options.add_to_form||"all";
              this._formQuerySelector=options.form_query_selector||"form";
              this._decodeURIs=options.decode_uris||false;
              this.utmCookie = new UtmCookie({
                domain: options.domain,
                secure: options.secure,
                sessionLength: options.sessionLength,
                initialUtmParams: options.initial_utm_params,
                additionalParams: Object.keys(this._additionalParamsMap),
                additionalInitialParams: Object.keys(this._additionalInitialParamsMap)
              });
              this.addAllFields();
            }

            addAllFields(){ const allForms=document.querySelectorAll(this._formQuerySelector); let len=this._addToForm==="none"?0:this._addToForm==="first"?Math.min(1,allForms.length):allForms.length; for(let i=0;i<len;i++){ this.addAllFieldsToForm(allForms[i]); } }
            addAllFieldsToForm(form){ if(form&&!form._utm_tagged){form._utm_tagged=true; Object.entries(this._utmParamsMap).forEach(([param,field])=>this.addFormElem(form,field,this.utmCookie.readCookie(param))); Object.entries(this._initialUtmParamsMap).forEach(([param,field])=>this.addFormElem(form,field,this.utmCookie.readCookie(param))); Object.entries(this._additionalParamsMap).forEach(([param,field])=>this.addFormElem(form,field,this.utmCookie.readCookie(param))); Object.entries(this._additionalInitialParamsMap).forEach(([param,field])=>{ this.addFormElem(form,field,this.utmCookie.readCookie("initial_"+param)); }); this.addFormElem(form,this._initialReferrerField,this.utmCookie.initialReferrer()); this.addFormElem(form,this._lastReferrerField,this.utmCookie.lastReferrer()); this.addFormElem(form,this._initialLandingPageField,this.utmCookie.initialLandingPageUrl()); this.addFormElem(form,this._visitsField,this.utmCookie.visits());} }
            addFormElem(form,fieldName,fieldValue){ form.appendChild(this.getFieldEl(fieldName,fieldValue)); }
            getFieldEl(fieldName,fieldValue){ const input=document.createElement("input"); input.type="hidden"; input.name=fieldName; input.value=this._decodeURIs?decodeURIComponent(fieldValue):fieldValue; return input; }
          }

          window.UtmForm = new UtmForm(_uf);
        `}
      </Script>

      {/* LiveChat */}
      <Script id="livechat" strategy="lazyOnload">
        {`
          window.__lc = window.__lc || {};
          window.__lc.license = 2536351;
          window.__lc.integration_name = "manual_channels";
          window.__lc.product_name = "livechat";
          
          (function(n, t, c) {
              function i(n) { return e._h ? e._h.apply(null, n) : e._q.push(n) }
              var e = {
                  _q: [],
                  _h: null,
                  _v: "2.0",
                  on: function() { i(["on", c.call(arguments)]) },
                  once: function() { i(["once", c.call(arguments)]) },
                  off: function() { i(["off", c.call(arguments)]) },
                  get: function() { if(!e._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return i(["get", c.call(arguments)]) },
                  call: function() { i(["call", c.call(arguments)]) },
                  init: function() {
                      var n = t.createElement("script");
                      n.async = !0; n.type = "text/javascript";
                      n.src = "https://cdn.livechatinc.com/tracking.js";
                      t.head.appendChild(n);
                  }
              };
              !n.__lc.asyncInit && e.init();
              n.LiveChatWidget = n.LiveChatWidget || e;
          })(window, document, [].slice);
        `}
      </Script>
      <noscript>
        <a
          href="https://www.livechat.com/chat-with/2536351/"
          rel="nofollow noreferrer"
        >
          Chat with us
        </a>
        , powered by{" "}
        <a
          href="https://www.livechat.com/?welcome"
          rel="noopener nofollow"
          target="_blank"
        >
          LiveChat
        </a>
      </noscript>

      {/* UTM Data Cookies */}
      <Script id="utm-cookies" strategy="lazyOnload">
        {`
          function getCookie(name) {
              let nameEQ = name + "=";
              let ca = document.cookie.split(';');
              for(let i=0;i<ca.length;i++){
                  let c = ca[i];
                  while(c.charAt(0)==' ') c = c.substring(1,c.length);
                  if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
              }
              return null;
          }

          function getUTMData() {
              const utms = {};
              const utmSource = getCookie("_gpfx_utm_source");
              const utmMedium = getCookie("_gpfx_utm_medium");
              const utmCampaign = getCookie("_gpfx_utm_campaign");
              const utmContent = getCookie("_gpfx_utm_content");
              const fbp = getCookie('_fbp') || getCookie('fbp');
              const fbc = getCookie('_fbc') || getCookie('fbc') || getCookie('_gpfx_fbclid');
              const liFatId = getCookie('li_fat_id') || getCookie('_li_fat_id');
              const rdclid = getCookie('rdclid') || getCookie('_gpfx_rdclid');

              if(utmSource) utms.utm_source = utmSource;
              if(utmMedium) utms.utm_medium = utmMedium;
              if(utmCampaign) utms.utm_campaign = utmCampaign;
              if(utmContent) utms.utm_content = utmContent;
              if(fbp) utms.fbp = fbp;
              if(fbc) utms.fbc = fbc;
              if(liFatId) utms["li_fat_id"] = liFatId;
              if(rdclid) utms.rdclid = rdclid;

              return utms;
          }

          var visitorId = getCookie("_gpfx_visitor_id");
          const utmData = getUTMData();
          console.log({ visitor_id: visitorId, ...utmData });
          if(window.analytics){
              analytics.page({ visitor_id: visitorId, ...utmData });
              analytics.identify(visitorId, { visitor_id: visitorId, ...utmData });
          }
        `}
      </Script>
    </>
  );
}
