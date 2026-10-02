"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import type { GoPageContent } from "./goPageContent";
import { goPageContent as defaultContent } from "./goPageContent";

const REDIRECT_SECONDS = 3;
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
 <Script id="affiliate" strategy="afterInteractive">
  {`
    var _uf = _uf || {};
    _uf.domain = ".afterprime.com";
    _uf.secure = true;
    _uf.sessionLength = 1;
    _uf.additional_params_map = { clickid: "AFFILIATE", group: "GROUP" };

    class UtmCookie {
      constructor(options = {}) {
        this._cookieNamePrefix = "_gpfx_";
        this._domain = options.domain;
        this._rootHost = (this._domain || "").charAt(0) === "." ? this._domain.slice(1) : (this._domain || "");
        this._secure = options.secure || false;
        this._sessionLength = options.sessionLength || 1;
        this._cookieExpiryDays = options.cookieExpiryDays || 30;
        this._firstTouchDays = options.firstTouchDays || 90;
        this._additionalParams = options.additionalParams || [];
        this._passthroughParams = ["tnid"];
        this._ignoredHosts = ["typeform.com"];
        this._paidMediums = ["cpc","ppc","paid","paid_social","paidsocial","display"];
        // priority order when several click IDs are present
        this._clickIds = ["gclid","gbraid","wbraid","msclkid","li_fat_id","twclid","rdt_cid","ttclid","fbclid"];
        this._clickMap = {
          gclid:["google","cpc"], gbraid:["google","cpc"], wbraid:["google","cpc"],
          msclkid:["bing","cpc"],
          li_fat_id:["linkedin","paid_social"],
          twclid:["twitter/x","paid_social"],
          rdt_cid:["reddit","paid_social"],
          ttclid:["tiktok","paid_social"],
          fbclid:["facebook","paid_social"]
        };
        // [domains, source, medium]. "name*" matches any hostname label (google.com.au etc.)
        this._referrerRules = [
          [["facebook.com","fb.com"],"facebook","social"],
          [["youtube.com","youtu.be"],"youtube","social"],
          [["twitter.com","t.co","x.com"],"twitter/x","social"],
          [["linkedin.com","lnkd.in"],"linkedin","social"],
          [["instagram.com"],"instagram","social"],
          [["reddit.com"],"reddit","social"],
          [["tiktok.com"],"tiktok","social"],
          [["pinterest.com"],"pinterest","social"],
          [["quora.com"],"quora","social"],
          [["threads.net"],"threads","social"],
          [["bsky.app"],"bluesky","social"],
          [["t.me","telegram.org"],"telegram","social"],
          [["whatsapp.com","wa.me"],"whatsapp","social"],
          [["discord.com","discord.gg"],"discord","social"],
          [["chatgpt.com","chat.openai.com","openai.com"],"chatgpt","ai_referral"],
          [["perplexity.ai"],"perplexity","ai_referral"],
          [["gemini.google.com","bard.google.com"],"gemini","ai_referral"],
          [["copilot.microsoft.com"],"copilot","ai_referral"],
          [["claude.ai"],"claude","ai_referral"],
          [["grok.com"],"grok","ai_referral"],
          [["you.com"],"you.com","ai_referral"],
          [["deepseek.com"],"deepseek","ai_referral"],
          [["meta.ai"],"meta ai","ai_referral"],
          [["mistral.ai"],"mistral","ai_referral"],
          [["poe.com"],"poe","ai_referral"],
          [["phind.com"],"phind","ai_referral"],
          [["google*"],"organic search","organic"],
          [["bing*"],"bing","organic"],
          [["duckduckgo*"],"duckduckgo","organic"],
          [["yahoo*"],"yahoo","organic"],
          [["baidu*"],"baidu","organic"],
          [["yandex*"],"yandex","organic"],
          [["ecosia*"],"ecosia","organic"],
          [["search.brave.com"],"brave search","organic"]
        ];

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
      writeIfChanged(name,value,days){
        if(this.readCookie(name) === escape(value)) return;
        this.createCookie(name,value,days,null,this._domain,this._secure);
      }

      hasUrlParams(list){ return list.some(p=>this.getParameterByName(p)); }

      hostOf(url){ try { return new URL(url).hostname.toLowerCase(); } catch(e){ return ""; } }
      hostIs(h,d){ return h===d || h.endsWith("."+d); }
      matchHost(h,d){ return d.slice(-1)==="*" ? h.split(".").indexOf(d.slice(0,-1))>-1 : this.hostIs(h,d); }
      isInternal(h){ return !!this._rootHost && this.hostIs(h,this._rootHost); }
      isIgnored(h){ return this._ignoredHosts.some(d=>this.hostIs(h,d)); }

      deriveFromReferrer(h){
        for (const r of this._referrerRules) {
          if (r[0].some(d=>this.matchHost(h,d))) return {source:r[1], medium:r[2]};
        }
        return {source:"referrer", medium:"referral"};
      }

      resolveTouch(){
        const q = n => this.getParameterByName(n);
        const utm = { source:q("utm_source"), medium:q("utm_medium"), campaign:q("utm_campaign"), term:q("utm_term"), content:q("utm_content") };
        const hasUtm = !!(utm.source || utm.medium || utm.campaign || utm.term || utm.content);
        const mediumPaid = this._paidMediums.indexOf(utm.medium.toLowerCase()) > -1;

        let idName = "", idVal = "";
        for (const k of this._clickIds) { const v = q(k); if (v) { idName = k; idVal = v; break; } }

        let paid = false, derived = null;
        if (idName && idName !== "fbclid") {
          paid = true;
          derived = { source:this._clickMap[idName][0], medium:this._clickMap[idName][1] };
        } else if (idName === "fbclid") {
          if (mediumPaid) {
            paid = true;
            derived = { source:"facebook", medium:"paid_social" };
          } else {
            derived = { source:"facebook", medium:"social" };
            idName = ""; idVal = "";
          }
        } else if (mediumPaid) {
          paid = true;
        }

        const refHost = this.hostOf(document.referrer);
        const external = !!refHost && !this.isInternal(refHost) && !this.isIgnored(refHost);
        if (!derived && external) derived = this.deriveFromReferrer(refHost);

        const genuine = !!(idName || hasUtm || derived);
        const type = paid ? "paid" : (genuine ? "unpaid" : "direct");
        const d = genuine ? "not_set" : "direct";

        return {
          type: type,
          fields: {
            utm_source: utm.source || (derived ? derived.source : "") || d,
            utm_medium: utm.medium || (derived ? derived.medium : "") || d,
            utm_campaign: utm.campaign || d,
            utm_term: utm.term || d,
            utm_content: utm.content || d
          },
          idName: idName || "none",
          idVal: idVal || "none"
        };
      }

      currentTouchType(){
        const tt = this.readCookie("touch_type");
        if (tt) return tt;
        const s = this.readCookie("utm_source");
        if (!s) return null;
        return s === "direct" ? "direct" : "unpaid";
      }

      writeChannelCookies(){
        const t = this.resolveTouch();
        const keys = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"];

        // FIRST TOUCH (Typeform reads _gpfx_utm_*). Paid locks. Unpaid overrides direct/missing only.
        const cur = this.currentTouchType();
        let write;
        if (t.type === "paid") write = cur !== "paid";
        else if (t.type === "unpaid") write = (cur === null || cur === "direct");
        else write = (cur === null);

        if (write) {
          const days = this._firstTouchDays;
          const w = (n,v) => this.createCookie(n,v,days,null,this._domain,this._secure);
          keys.forEach(k => w(k, t.fields[k]));
          w("ad_click_id", t.idVal);
          w("ad_click_id_type", t.idName);
          w("touch_type", t.type);
          w("referrer", t.fields.utm_source);
        }

        // LAST TOUCH: overwrite on every genuine touch, only when value changed
        if (t.type !== "direct") {
          const days = this._cookieExpiryDays;
          keys.forEach(k => this.writeIfChanged("last_" + k, t.fields[k], days));
          this.writeIfChanged("last_ad_click_id", t.idVal, days);
          this.writeIfChanged("last_ad_click_id_type", t.idName, days);
          this.writeIfChanged("last_touch_type", t.type, days);
          this.writeIfChanged("last_referrer", t.fields.utm_source, days);
        }

        // tnid: real value may replace "direct" default
        this._passthroughParams.forEach(p => {
          const v = this.getParameterByName(p);
          if (v) {
            const c = this.readCookie(p);
            if (!c || c === "direct") this.writeCookie(p, v);
            this.writeIfChanged("last_" + p, v, this._cookieExpiryDays);
          } else {
            this.writeCookieOnce(p, "direct");
          }
        });

        // AFFILIATE PARAMS: unchanged
        this._additionalParams.forEach(p => {
          const urlValue = this.getParameterByName(p);
          if (p === "group") {
            // group must always reflect the latest touch. Typeform and app.afterprime.com
            // read _gpfx_group directly for commission-group attribution, so it can never
            // lock to the first value seen like the other additional params do.
            if (urlValue) {
              this.writeCookie(p, urlValue);
            } else {
              this.writeCookieOnce(p, "direct"); // seed a default only if group has never been set
            }
          } else {
            this.writeCookieOnce(p, urlValue || "direct");
          }
          if (urlValue) this.writeCookie("last_" + p, urlValue);
        });
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
          <p className="mt-3 text-lg text-white">
            {t.paragraph1}
          </p>
          <p className="mt-1 text-lg text-white">
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
