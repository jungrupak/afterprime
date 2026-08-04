"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import type { GoPageContent } from "./goPageContent";
import { goPageContent as defaultContent } from "./goPageContent";

const REDIRECT_SECONDS = 5;
const DESTINATION_BASE = "https://app.afterprime.com/live";

interface Props {
  content?: GoPageContent;
}

function InterstitialContent({ content }: Props) {
  const t = content ?? defaultContent;
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
    _uf.secure = true;
    _uf.sessionLength = 1;
    _uf.additional_params_map = { clickid: "AFFILIATE" };

    class UtmCookie {
      constructor(options = {}) {
        this._cookieNamePrefix = "_gpfx_";
        this._domain = options.domain;
        this._secure = options.secure || false;
        this._sessionLength = options.sessionLength || 1;
        this._cookieExpiryDays = options.cookieExpiryDays || 30;
        this._additionalParams = options.additionalParams || [];
        this._utmParams = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","fbclid","rdclid","tnid","click_id","group"];

        this.writeVisitorId();
        this.writeInitialLandingPageUrl();
        this.setCurrentSession();
        this.writeChannelCookies();
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

      getParameterByName(name){ let regex=new RegExp("[\\\\?&]"+name+"=([^&#]*)"); let results = regex.exec(window.location.search); return results? decodeURIComponent(results[1].replace(/\\+/g,' ')):""; }

      writeCookie(name,value){ this.createCookie(name,value,this._cookieExpiryDays,null,this._domain,this._secure); }
      writeCookieOnce(name,value){ if(!this.readCookie(name)){ this.writeCookie(name,value); } }

      hasUrlParams(list){ return list.some(p=>this.getParameterByName(p)); }
      _sameDomainReferrer(ref){ let h=document.location.hostname; return ref.indexOf(this._domain)>-1 || ref.indexOf(h)>-1; }

      deriveChannelFromReferrer(v){
        if (!v) return "direct";
        let url = window.location.href;
        if (v.includes("facebook")) return "facebook";
        if (v.includes("youtube")) return "youtube";
        if (v.includes("twitter") || v.includes("t.co/") || v.includes("x.com")) return "twitter/x";
        if (v.includes("linkedin")) return "linkedin";
        if (v.includes("instagram")) return "instagram";
        if (v.includes("reddit")) return "reddit";
        if (v.includes("tiktok")) return "tiktok";
        if (v.includes("pinterest")) return "pinterest";
        if (v.includes("quora")) return "quora";
        if (v.includes("threads.net")) return "threads";
        if (v.includes("bsky.app")) return "bluesky";
        if (v.includes("t.me/") || v.includes("telegram.org")) return "telegram";
        if (v.includes("whatsapp.com") || v.includes("wa.me/")) return "whatsapp";
        if (v.includes("discord.com") || v.includes("discord.gg")) return "discord";
        if (v.includes("chatgpt.com") || v.includes("chat.openai.com") || v.includes("openai.com")) return "chatgpt";
        if (v.includes("perplexity.ai")) return "perplexity";
        if (v.includes("gemini.google.com") || v.includes("bard.google.com")) return "gemini";
        if (v.includes("copilot.microsoft.com")) return "copilot";
        if (v.includes("claude.ai")) return "claude";
        if (v.includes("grok.com")) return "grok";
        if (v.includes("you.com")) return "you.com";
        if (v.includes("deepseek.com")) return "deepseek";
        if (v.includes("meta.ai")) return "meta ai";
        if (v.includes("mistral.ai")) return "mistral";
        if (v.includes("poe.com")) return "poe";
        if (v.includes("phind.com")) return "phind";
        if (v.includes("google") && !url.includes("gclid=")) return "organic search";
        if (v.includes("google") && url.includes("gclid=")) return "google ppc";
        if (v.includes("bing") && url.includes("utm_medium=cpc")) return "bing ppc";
        if (v.includes("bing")) return "bing";
        if (v.includes("duckduckgo")) return "duckduckgo";
        if (v.includes("yahoo")) return "yahoo";
        if (v.includes("baidu")) return "baidu";
        if (v.includes("yandex")) return "yandex";
        if (v.includes("ecosia")) return "ecosia";
        if (v.includes("search.brave.com")) return "brave search";
        return "referrer";
      }

      writeChannelCookies(){
        const referrer = document.referrer;
        const isExternalReferrer = !!referrer && !this._sameDomainReferrer(referrer);
        const hasTrackingParams = this.hasUrlParams(this._utmParams) || this.hasUrlParams(this._additionalParams);
        const isGenuineTouch = isExternalReferrer || hasTrackingParams;
        const channel = isExternalReferrer ? this.deriveChannelFromReferrer(referrer) : "direct";

        this.writeCookieOnce("referrer", channel);

        this._utmParams.forEach(p => {
          let value = this.getParameterByName(p);
          if (!value) value = (p === "utm_source") ? channel : "direct";
          this.writeCookieOnce(p, value);
        });

        this._additionalParams.forEach(p => {
          let value = this.getParameterByName(p) || "direct";
          this.writeCookieOnce(p, value);
        });

        if (isGenuineTouch) {
          this.writeCookie("last_referrer", channel);
          this._utmParams.forEach(p => {
            let value = this.getParameterByName(p);
            if (!value) value = (p === "utm_source") ? channel : "direct";
            this.writeCookie("last_" + p, value);
          });
          this._additionalParams.forEach(p => {
            let value = this.getParameterByName(p);
            if (value) this.writeCookie("last_" + p, value);
          });
        }
      }

      writeVisitorId(){
        let old=this.lastVisitor();
        if(old){ this.writeCookie("visitor_id",old); return; }
        old=localStorage.getItem("_gpfx_visitor_id");
        if(old){ this.writeCookie("visitor_id",old); return; }
        const userAgent=navigator.userAgent, t=Date.now(), r=Math.random().toString(36).substring(2,15), id=btoa(r+"|"+t+"|"+userAgent).substring(0,32);
        this.writeCookie("visitor_id",id);
        localStorage.setItem("_gpfx_visitor_id",id);
      }

      writeInitialLandingPageUrl(){ this.writeCookieOnce("landing_page", window.location.origin + window.location.pathname + window.location.search + window.location.hash); }
      lastVisitor(){ return this.readCookie("visitor_id"); }
      incrementVisitCount(){ let n=parseInt(this.readCookie("visits"),10); this.writeCookie("visits",isNaN(n)?1:n+1); }
      setCurrentSession(){ if(!this.readCookie("current_session")){ this.createCookie("current_session","true",this._sessionLength/24,null,this._domain,this._secure); this.incrementVisitCount(); } }
    }

    window.UtmCookie = new UtmCookie({
      domain: _uf.domain,
      secure: _uf.secure,
      sessionLength: _uf.sessionLength,
      additionalParams: Object.keys(_uf.additional_params_map)
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
            {t.heading}
          </h1>
          <p className="mt-3 text-lg text-white/60">
            {t.paragraph1}
          </p>
          <p className="mt-1 text-lg text-white/60">
            {t.paragraph2}
          </p>
        </div>
      </main>
    </>
  );
}

export default function GoPageClient({ content }: Props) {
  return <InterstitialContent content={content} />;
}
