// components/FooterScripts.tsx
"use client";

import Script from "next/script";
import React from "react";

export default function FooterScripts() {
  return (
    <>
      {/* LiveChat */}
      <Script id="livechat" strategy="lazyOnload">
        {`
        console.log("footer scripts loaded for livechat")
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
        <a href="https://www.livechat.com/chat-with/2536351/" rel="nofollow">
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
