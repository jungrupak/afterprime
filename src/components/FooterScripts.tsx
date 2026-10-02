// components/FooterScripts.tsx
import Script from "next/script";

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

      {/* LiveChat — deferred 5s after idle to keep 12 JS chunks out of LCP window */}
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
              n.LiveChatWidget = n.LiveChatWidget || e;
              setTimeout(function() { e.init(); }, 5000);
          })(window, document, [].slice);

          // Mobile: keep widget collapsed to just the launcher icon,
          // never auto-expanded (desktop keeps whatever LiveChat dashboard sets).
          window.LiveChatWidget.on("ready", function() {
            if (window.matchMedia("(max-width: 767px)").matches) {
              window.LiveChatWidget.call("minimize");
            }
          });
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
          if(window.analytics){
              analytics.page({ visitor_id: visitorId, ...utmData });
              analytics.identify(visitorId, { visitor_id: visitorId, ...utmData });
          }
        `}
      </Script>

      {/* TypeForm UTM setting */}
      <Script id="utm-typeform" strategy="lazyOnload">
        {`
        document.addEventListener("DOMContentLoaded", () => {
          try {
            const observer = new MutationObserver((mutationsList, observer) => {
              const iframe = document.getElementById("typeform-iframe");
              if (!iframe || iframe.tagName !== "IFRAME") return;

              observer.disconnect(); // stop watching once found

              const params = new URLSearchParams(window.location.search);
              const utms = [];

              ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
                const value = params.get(key);
                if (value) utms.push(\`\${key}=\${value}\`);
              });

              if (utms.length) {
                const src = iframe.getAttribute("src");
                if (!src) return;
                const separator = src.includes("?") ? "&" : "?";
                iframe.setAttribute("src", src + separator + utms.join("&"));
              }
            });

            observer.observe(document.body, { childList: true, subtree: true });
          } catch (e) {
            console.error("Typeform UTM sync error:", e);
          }
        }); `}
      </Script>
    </>
  );
}
