'use client';

import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Script from 'next/script';

const REDIRECT_SECONDS = 5;

function InterstitialContent() {
  const [exitUrl, setExitUrl] = useState('');

  useEffect(() => {
    const oib = new URLSearchParams(window.location.search).get('oib') ?? '';
    const url = `https://app.afterprime.com/live?oib=${oib}`;
    setExitUrl(url);

    const timer = setTimeout(() => {
      window.location.href = url;
    }, REDIRECT_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Affiliate tracking — fires before redirect */}
      <Script id="affiliate" strategy="afterInteractive">
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
              this._utmParams = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","fbclid","rdclid","tnid","click_id"];
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
            getParameterByName(name){ let regex=new RegExp("[\\\\?&]"+name+"=([^&#]*)"); let results = regex.exec(window.location.search); return results? decodeURIComponent(results[1].replace(/\\\\+/g,' ')):""; }
            additionalParamsPresentInUrl(){ return this._additionalParams.some(p=>this.getParameterByName(p)); }
            utmPresentInUrl(){ return this._utmParams.some(p=>this.getParameterByName(p)); }
            writeCookie(name,value){ this.createCookie(name,value,this._cookieExpiryDays,null,this._domain,this._secure); }
            writeCookieOnce(name,value){ if(!this.readCookie(name)){ this.writeCookie(name,value); } }
            writeAdditionalParams(){ this._additionalParams.forEach(p=>{ this.writeCookie(p,this.getParameterByName(p)); }); }
            writeAdditionalInitialParams(){ this._additionalInitialParams.forEach(p=>{ this.writeCookieOnce(""+p,this.getParameterByName(p)||"direct"); }); }
            writeUtmCookieFromParams(){ this._utmParams.forEach(p=>{ this.writeCookie(p,this.getParameterByName(p)); }); }
            writeInitialUtmCookieFromParams(){ this._utmParams.forEach(p=>{ this.writeCookieOnce(""+p,this.getParameterByName(p)||"direct"); }); }
            _sameDomainReferrer(ref){ let h=document.location.hostname; return ref.indexOf(this._domain)>-1 || ref.indexOf(h)>-1; }
            writeInitialReferrer() {
              let v = document.referrer, url = window.location.href;
              if (v.includes("facebook")) v = "facebook";
              else if (v.includes("youtube")) v = "youtube";
              else if (v.includes("twitter") || v.includes("t.co") || v.includes("x.com")) v = "twitter/x";
              else if (v.includes("linkedin")) v = "linkedin";
              else if (v.includes("instagram")) v = "instagram";
              else if (v.includes("reddit")) v = "reddit";
              else if (v.includes("tiktok")) v = "tiktok";
              else if (v.includes("pinterest")) v = "pinterest";
              else if (v.includes("quora")) v = "quora";
              else if (v.includes("threads.net")) v = "threads";
              else if (v.includes("google") && !url.includes("gclid=")) v = "organic search";
              else if (v.includes("google") && url.includes("gclid=")) v = "google ppc";
              else if (v.includes("bing") && url.includes("utm_medium=cpc")) v = "bing ppc";
              else if (v.includes("bing")) v = "bing";
              else if (v.includes("duckduckgo")) v = "duckduckgo";
              else if (v.includes("yahoo")) v = "yahoo";
              else if (v.includes("baidu")) v = "baidu";
              else if (v.includes("yandex")) v = "yandex";
              else if (v.includes("ecosia")) v = "ecosia";
              else if (v.includes("chatgpt.com") || v.includes("chat.openai.com")) v = "chatgpt";
              else if (v.includes("perplexity.ai")) v = "perplexity";
              else if (v.includes("gemini.google.com")) v = "gemini";
              else if (v.includes("copilot.microsoft.com")) v = "copilot";
              else if (v.includes("claude.ai")) v = "claude";
              else if (v.includes("grok.x.ai")) v = "grok";
              else if (v.includes("you.com")) v = "you.com";
              else if (!v || this._sameDomainReferrer(v)) v = "direct";
              this.writeCookieOnce("referrer", v);
            }
            writeLastReferrer() {
              let v = document.referrer, url = window.location.href;
              if (v.includes("facebook")) v = "facebook";
              else if (v.includes("youtube")) v = "youtube";
              else if (v.includes("twitter") || v.includes("t.co") || v.includes("x.com")) v = "twitter/x";
              else if (v.includes("linkedin")) v = "linkedin";
              else if (v.includes("instagram")) v = "instagram";
              else if (v.includes("reddit")) v = "reddit";
              else if (v.includes("tiktok")) v = "tiktok";
              else if (v.includes("pinterest")) v = "pinterest";
              else if (v.includes("quora")) v = "quora";
              else if (v.includes("threads.net")) v = "threads";
              else if (v.includes("google") && !url.includes("gclid=")) v = "organic search";
              else if (v.includes("google") && url.includes("gclid=")) v = "google ppc";
              else if (v.includes("bing") && url.includes("utm_medium=cpc")) v = "bing ppc";
              else if (v.includes("bing")) v = "bing";
              else if (v.includes("duckduckgo")) v = "duckduckgo";
              else if (v.includes("yahoo")) v = "yahoo";
              else if (v.includes("baidu")) v = "baidu";
              else if (v.includes("yandex")) v = "yandex";
              else if (v.includes("ecosia")) v = "ecosia";
              else if (v.includes("chatgpt.com") || v.includes("chat.openai.com")) v = "chatgpt";
              else if (v.includes("perplexity.ai")) v = "perplexity";
              else if (v.includes("gemini.google.com")) v = "gemini";
              else if (v.includes("copilot.microsoft.com")) v = "copilot";
              else if (v.includes("claude.ai")) v = "claude";
              else if (v.includes("grok.x.ai")) v = "grok";
              else if (v.includes("you.com")) v = "you.com";
              else if (!v || this._sameDomainReferrer(v)) v = "direct";
              this.writeCookie("last_referrer", v);
            }
            writeIBReferrer(){ let v=this.getParameterByName("clickId"); if(v) this.writeCookie("ib_referrer",v); }
            writeVisitorId(){ let old=this.lastVisitor(); if(old){ this.writeCookie("visitor_id",old); return; } old=localStorage.getItem("_gpfx_visitor_id"); if(old){ this.writeCookie("visitor_id",old); return; } const userAgent=navigator.userAgent, t=Date.now(), r=Math.random().toString(36).substring(2,15), id=btoa(r+"|"+t+"|"+userAgent).substring(0,32); this.writeCookie("visitor_id",id); localStorage.setItem("_gpfx_visitor_id",id); }
            writeInitialLandingPageUrl(){ this.writeCookieOnce("landing_page", window.location.origin + window.location.pathname + window.location.search + window.location.hash); }
            lastVisitor(){ return this.readCookie("visitor_id"); }
            initialReferrer(){ return this.readCookie("referrer"); }
            lastReferrer(){ return this.readCookie("last_referrer"); }
            initialLandingPageUrl(){ return this.readCookie("landing_page"); }
            incrementVisitCount(){ let n=parseInt(this.readCookie("visits"),10); this.writeCookie("visits",isNaN(n)?1:n+1); }
            visits(){ return this.readCookie("visits"); }
            setCurrentSession(){ if(!this.readCookie("current_session")){ this.createCookie("current_session","true",this._sessionLength/24,null,this._domain,this._secure); this.incrementVisitCount(); } }
          }

          class UtmForm {
            constructor(options={}) {
              this._utmParamsMap={utm_source:"USOURCE",utm_medium:"UMEDIUM",utm_campaign:"UCAMPAIGN",utm_content:"UCONTENT",utm_term:"UTERM"};
              this._initialUtmParamsMap={utm_source:"IUSOURCE",utm_medium:"IUMEDIUM",utm_campaign:"IUCAMPAIGN",utm_content:"IUCONTENT",utm_term:"IUTERM"};
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
            addAllFieldsToForm(form){ if(form&&!form._utm_tagged){form._utm_tagged=true; Object.entries(this._utmParamsMap).forEach(([param,field])=>this.addFormElem(form,field,this.utmCookie.readCookie(param))); Object.entries(this._initialUtmParamsMap).forEach(([param,field])=>this.addFormElem(form,field,this.utmCookie.readCookie(param))); Object.entries(this._additionalParamsMap).forEach(([param,field])=>this.addFormElem(form,field,this.utmCookie.readCookie(param))); Object.entries(this._additionalInitialParamsMap).forEach(([param,field])=>{ this.addFormElem(form,field,this.utmCookie.readCookie(""+param)); }); this.addFormElem(form,this._initialReferrerField,this.utmCookie.initialReferrer()); this.addFormElem(form,this._lastReferrerField,this.utmCookie.lastReferrer()); this.addFormElem(form,this._initialLandingPageField,this.utmCookie.initialLandingPageUrl()); this.addFormElem(form,this._visitsField,this.utmCookie.visits());} }
            addFormElem(form,fieldName,fieldValue){ form.appendChild(this.getFieldEl(fieldName,fieldValue)); }
            getFieldEl(fieldName,fieldValue){ const input=document.createElement("input"); input.type="hidden"; input.name=fieldName; const safeValue = fieldValue == null ? "" : String(fieldValue); if(this._decodeURIs){ try{ input.value=decodeURIComponent(safeValue); } catch(_e){ input.value=safeValue; } } else { input.value=safeValue; } return input; }
          }

          window.UtmForm = new UtmForm(_uf);
        `}
      </Script>

      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <Image
          src="/img/logo-main.svg"
          alt="Afterprime"
          width={160}
          height={48}
          priority
        />

        {/* Spinner */}
        <div
          className="mt-8 w-10 h-10 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: '#263DEA' }}
          aria-hidden="true"
        />

        <div className="mt-8 max-w-sm">
          <h1 className="text-2xl font-semibold text-white">
            Securely redirecting you...
          </h1>
          <p className="mt-3 text-sm text-white/60">
            We are taking you to the Afterprime signup page.
          </p>
          <p className="mt-1 text-sm text-white/60">
            Please do not close this window.
          </p>
          <p className="mt-6 text-sm text-white/40">
            Taking too long?{' '}
            <a href={exitUrl} className="text-white underline underline-offset-2">
              Click here to proceed manually.
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

export default function GoPage() {
  return <InterstitialContent />;
}
