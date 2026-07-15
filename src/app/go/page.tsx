"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";

const REDIRECT_SECONDS = 5;
const DESTINATION_BASE = "https://app.afterprime.com/live";

function InterstitialContent() {
  const [exitUrl, setExitUrl] = useState("");

  useEffect(() => {
    const url = `${DESTINATION_BASE}${window.location.search}`;
    setExitUrl(url);

    const timer = setTimeout(() => {
      window.location.href = url;
    }, REDIRECT_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Affiliate tracking — fires before redirect */}
      <Script id="affiliate" strategy="lazyOnload">
  {`
    var _uf = _uf || {};
    _uf.domain = ".afterprime.com";
    _uf.initial_utm_params = true;
    _uf.additional_params_map = { clickid: "AFFILIATE" };
    _uf.additional_initial_params_map = { clickid: "IAFFILIATE" };
    _uf.secure = true;
    _uf.sessionLength = 1;
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
        this._utmParams = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","fbclid","rdclid","tnid","click_id","group"];
        
        this.writeInitialReferrer();
        this.writeLastReferrer();
        this.writeVisitorId();
        this.writeIBReferrer();
        this.writeInitialLandingPageUrl();
        this.setCurrentSession();

        // Strict Query Param -> Referrer Value in utm_source -> "direct" Logic
        this.writeUtmAndAdditionalCookies();
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

      getParameterByName(name){ let regex=new RegExp("[\\?&]"+name+"=([^&#]*)"); let results = regex.exec(window.location.search); return results? decodeURIComponent(results[1].replace(/\\+/g,' ')):""; }

      additionalParamsPresentInUrl(){ return this._additionalParams.some(p=>this.getParameterByName(p)); }
      utmPresentInUrl(){ return this._utmParams.some(p=>this.getParameterByName(p)); }

      writeCookie(name,value){ this.createCookie(name,value,this._cookieExpiryDays,null,this._domain,this._secure); }
      writeCookieOnce(name,value){ if(!this.readCookie(name)){ this.writeCookie(name,value); } }

      writeUtmAndAdditionalCookies() {
        const referrer = document.referrer;
        const hasReferrer = referrer && !this._sameDomainReferrer(referrer);
        
        // Derive clean referrer name immediately to use inside the parameter loops
        const derivedReferrer = hasReferrer ? this.deriveChannelFromReferrer(referrer) : "direct";

        // Standard UTM parameters array
        this._utmParams.forEach(p => {
          let value = this.getParameterByName(p);
          
          if (!value) {
            if (p === "utm_source") {
              // If utm_source is empty in URL, give it the derived referrer value ("organic search", "facebook", etc.)
              value = derivedReferrer;
            } else {
              // For all other tracking params, fall back safely to "direct" if missing from URL
              value = "direct";
            }
          }
          
          this.writeCookie(p, value);
          if (this._initialUtmParams) {
            this.writeCookieOnce("" + p, value);
          }
        });

        // Dynamic tracking parameters (e.g., clickid)
        this._additionalParams.forEach(p => {
          let value = this.getParameterByName(p);
          if (!value) {
            value = "direct";
          }
          this.writeCookie(p, value);
        });

        this._additionalInitialParams.forEach(p => {
          let value = this.getParameterByName(p);
          if (!value) {
            value = "direct";
          }
          this.writeCookieOnce("" + p, value);
        });
      }

      deriveChannelFromReferrer(v) {
        if (!v) return "direct";
        let url = window.location.href;

        // Social
        if (v.includes("facebook")) return "facebook";
        if (v.includes("youtube")) return "youtube";
        if (v.includes("twitter") || v.includes("t.co") || v.includes("x.com")) return "twitter/x";
        if (v.includes("linkedin")) return "linkedin";
        if (v.includes("instagram")) return "instagram";
        if (v.includes("reddit")) return "reddit";
        if (v.includes("tiktok")) return "tiktok";
        if (v.includes("pinterest")) return "pinterest";
        if (v.includes("quora")) return "quora";
        if (v.includes("threads.net")) return "threads";

        // Search engines
        if (v.includes("google") && !url.includes("gclid=")) return "organic search";
        if (v.includes("google") && url.includes("gclid=")) return "google ppc";
        if (v.includes("bing") && url.includes("utm_medium=cpc")) return "bing ppc";
        if (v.includes("bing")) return "bing";
        if (v.includes("duckduckgo")) return "duckduckgo";
        if (v.includes("yahoo")) return "yahoo";
        if (v.includes("baidu")) return "baidu";
        if (v.includes("yandex")) return "yandex";
        if (v.includes("ecosia")) return "ecosia";

        // LLMs
        if (v.includes("chatgpt.com") || v.includes("chat.openai.com")) return "chatgpt";
        if (v.includes("perplexity.ai")) return "perplexity";
        if (v.includes("gemini.google.com")) return "gemini";
        if (v.includes("copilot.microsoft.com")) return "copilot";
        if (v.includes("claude.ai")) return "claude";
        if (v.includes("grok.x.ai")) return "grok";
        if (v.includes("you.com")) return "you.com";

        return "referrer";
      }

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

    window.UtmCookie = new UtmCookie({
      domain: _uf.domain,
      secure: _uf.secure,
      sessionLength: _uf.sessionLength,
      initialUtmParams: _uf.initial_utm_params,
      additionalParams: Object.keys(_uf.additional_params_map),
      additionalInitialParams: Object.keys(_uf.additional_initial_params_map)
    });
  `}
</Script>

      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <Image
          src="/img/logo-main.svg"
          alt="Afterprime"
          width={200}
          height={48}
          priority
        />

        {/* Spinner */}
        <div
          className="mt-8 w-10 h-10 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: "var(--ap-electric-blue)" }}
          aria-hidden="true"
        />

        <div className="mt-8 max-w-sm">
          <h1 className="text-3xl font-semibold text-white">
            Securely redirecting you...
          </h1>
          <p className="mt-3 text-lg text-white/60">
            We are taking you to the Afterprime signup page.
          </p>
          <p className="mt-1 text-lg text-white/60">
            Please do not close this window.
          </p>
        </div>
      </main>
    </>
  );
}

export default function GoPage() {
  return <InterstitialContent />;
}
