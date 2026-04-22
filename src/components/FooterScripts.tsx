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
          {
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
                this._utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "rdclid"];

                // 1. Determine Referrer Type First
                const detectedRef = this.getReferrerType();

                // 2. Commit basic tracking cookies
                this.writeCookieOnce("referrer", detectedRef);
                this.writeCookie("last_referrer", detectedRef);
                this.writeVisitorId();
                this.writeIBReferrer();
                this.writeInitialLandingPageUrl();
                this.writeAdditionalInitialParams();
                this.setCurrentSession();

                // 3. Force creation of UTM cookies on 1st load using detectedRef as fallback
                this.writeUtmCookies(detectedRef);

                if (this._initialUtmParams) { this.writeInitialUtmCookies(); }
                if (this.additionalParamsPresentInUrl()) { this.writeAdditionalParams(); }
              }

              createCookie(name, value, days, path, domain, secure) {
                var expireDate = null;
                if (days) { let date = new Date(); date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); expireDate = date; }
                let cookieExpire = expireDate ? "; expires=" + expireDate.toGMTString() : "";
                let cookiePath = path ? "; path=" + path : "; path=/";
                let cookieDomain = domain ? "; domain=" + domain : "";
                let cookieSecure = secure ? "; secure" : "";
                document.cookie = this._cookieNamePrefix + name + "=" + escape(value) + cookieExpire + cookiePath + cookieDomain + cookieSecure;
              }

              readCookie(name) {
                let nameEQ = this._cookieNamePrefix + name + "=";
                let ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                  let c = ca[i];
                  while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                  if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
                }
                return null;
              }

              getParameterByName(name) {
                let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                let results = regex.exec(window.location.search);
                return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : "";
              }

              writeCookie(name, value) { this.createCookie(name, value, this._cookieExpiryDays, null, this._domain, this._secure); }
              writeCookieOnce(name, value) { if (!this.readCookie(name)) { this.writeCookie(name, value); } }

              // Logic requested for source, medium, campaign
              writeUtmCookies(detectedRef) {
                // Source: URL or Referrer
                const source = this.getParameterByName("utm_source") || detectedRef;
                this.writeCookie("utm_source", source);

                // Medium: URL or 'none'
                const medium = this.getParameterByName("utm_medium") || "none";
                this.writeCookie("utm_medium", medium);

                // Campaign: URL or Referrer
                const campaign = this.getParameterByName("utm_campaign") || detectedRef;
                this.writeCookie("utm_campaign", campaign);

                // Others: Only if in URL
                ["utm_term", "utm_content", "fbclid", "rdclid"].forEach(p => {
                  let val = this.getParameterByName(p);
                  if (val) this.writeCookie(p, val);
                });
              }

              writeInitialUtmCookies() {
                this._utmParams.forEach(p => {
                  let val = this.getParameterByName(p);
                  if (val) this.writeCookieOnce("initial_" + p, val);
                });
              }

              getReferrerType() {
                let v = document.referrer, url = window.location.href;
                if (!v || v.indexOf(this._domain) > -1 || v.indexOf(location.hostname) > -1) return "direct";

                if (v.includes("facebook")) return "facebook";
                if (v.includes("youtube")) return "youtube";
                if (v.includes("twitter") || v.includes("t.co") || v.includes("x.com")) return "twitter/x";
                if (v.includes("linkedin")) return "linkedin";
                if (v.includes("instagram")) return "instagram";
                if (v.includes("google")) return url.includes("gclid=") ? "google ppc" : "organic search";
                if (v.includes("bing")) return url.includes("utm_medium=cpc") ? "bing ppc" : "bing";
                if (v.includes("duckduckgo")) return "duckduckgo";
                if (v.includes("chatgpt.com") || v.includes("chat.openai.com")) return "chatgpt";

                return "referral";
              }

              // Boilerplate helpers
              additionalParamsPresentInUrl() { return this._additionalParams.some(p => this.getParameterByName(p)); }
              writeAdditionalParams() { this._additionalParams.forEach(p => { this.writeCookie(p, this.getParameterByName(p)); }); }
              writeAdditionalInitialParams() { this._additionalInitialParams.forEach(p => { this.writeCookieOnce("initial_" + p, this.getParameterByName(p) || null); }); }
              writeIBReferrer() { let v = this.getParameterByName("clickId"); if (v) this.writeCookie("ib_referrer", v); }
              writeVisitorId() {
                let id = this.readCookie("visitor_id") || localStorage.getItem("_gpfx_visitor_id") || btoa(Math.random().toString(36) + Date.now()).substring(0, 32);
                this.writeCookie("visitor_id", id);
                localStorage.setItem("_gpfx_visitor_id", id);
              }
              writeInitialLandingPageUrl() { this.writeCookieOnce("initial_landing_page", window.location.href); }
              initialReferrer() { return this.readCookie("referrer"); }
              lastReferrer() { return this.readCookie("last_referrer"); }
              initialLandingPageUrl() { return this.readCookie("initial_landing_page"); }
              visits() { return this.readCookie("visits"); }
              setCurrentSession() {
                if (!this.readCookie("current_session")) {
                  this.createCookie("current_session", "true", this._sessionLength / 24, null, this._domain, this._secure);
                  let n = parseInt(this.readCookie("visits"), 10);
                  this.writeCookie("visits", isNaN(n) ? 1 : n + 1);
                }
              }
            }

            class UtmForm {
              constructor(options = {}) {
                this._utmParamsMap = { utm_source: "USOURCE", utm_medium: "UMEDIUM", utm_campaign: "UCAMPAIGN", utm_content: "UCONTENT", utm_term: "UTERM" };
                this._initialUtmParamsMap = { initial_utm_source: "IUSOURCE", initial_utm_medium: "IUMEDIUM", initial_utm_campaign: "IUCAMPAIGN", initial_utm_content: "IUCONTENT", initial_utm_term: "IUTERM" };
                this._additionalParamsMap = options.additional_params_map || {};
                this._additionalInitialParamsMap = options.additional_initial_params_map || {};
                this._addToForm = options.add_to_form || "all";
                this._formQuerySelector = options.form_query_selector || "form";
                this._decodeURIs = options.decode_uris || false;
                this.utmCookie = new UtmCookie(options);
                this.addAllFields();
              }
              addAllFields() {
                const allForms = document.querySelectorAll(this._formQuerySelector);
                let len = this._addToForm === "none" ? 0 : this._addToForm === "first" ? Math.min(1, allForms.length) : allForms.length;
                for (let i = 0; i < len; i++) { this.addAllFieldsToForm(allForms[i]); }
              }
              addAllFieldsToForm(form) {
                if (form && !form._utm_tagged) {
                  form._utm_tagged = true;
                  const add = (p, f) => {
                    let val = this.utmCookie.readCookie(p);
                    if (val) {
                      let input = document.createElement("input");
                      input.type = "hidden";
                      input.name = f;
                      input.value = this._decodeURIs ? decodeURIComponent(val) : val;
                      form.appendChild(input);
                    }
                  };
                  Object.entries(this._utmParamsMap).forEach(([p, f]) => add(p, f));
                  Object.entries(this._initialUtmParamsMap).forEach(([p, f]) => add(p, f));
                  add("referrer", "IREFERRER");
                  add("last_referrer", "LREFERRER");
                  add("initial_landing_page", "ILANDPAGE");
                  add("visits", "VISITS");
                }
              }
            }

            window.UtmForm = new UtmForm(_uf);
          }
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
