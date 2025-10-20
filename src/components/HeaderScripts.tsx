// components/HeadScripts.tsx
"use client";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import SchemaData from "@/utils/SchemaData";

export default function HeadScripts() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HEY7V85S14"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
        console.log("GTA scripts are loaded");
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config','G-HEY7V85S14');
        `}
      </Script>

      {/* Segment analytics */}
      <Script id="segment-init" strategy="afterInteractive">
        {`
          !function(){
            var i="analytics",analytics=window[i]=window[i]||[];
            if(!analytics.initialize)
              if(analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");
              else {
                analytics.invoked=!0;
                analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];
                analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};
                for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}
                analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/"+key+"/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};
                analytics._writeKey="DyAswc0rZ9OhZtgyzHoQICD23h7qXEhh";
                analytics.SNIPPET_VERSION="5.2.0";
                analytics.load("FOwmUTI04nj3XpuCBuNxaNw9r6RhJGZo");
              }
          }();
        `}
      </Script>

      {/* LinkedIn Insight Tag */}
      <Script id="linkedin-partner" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "8012492";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
      </Script>
      <Script id="linkedin-load" strategy="afterInteractive">
        {`
          (function(l){
            if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
            var s=document.getElementsByTagName("script")[0];
            var b=document.createElement("script");
            b.type="text/javascript";b.async=true;
            b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b,s);
          })(window.lintrk);
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          aria-hidden="true"
          src="https://px.ads.linkedin.com/collect/?pid=8012492&fmt=gif"
        />
      </noscript>

      {/* jQuery and custom JS */}

      {/* HelpCrunch widget */}
      <Script id="helpcrunch-widget" strategy="afterInteractive">
        {`
          (function(w,d){
            var widgetPrefix='widget';
            var helpcrunchwidgetLink = window.location.protocol + '//' + widgetPrefix + '.helpcrunch.com';
            w.HelpCrunch=function(){ w.HelpCrunch.q.push(arguments) };
            w.HelpCrunch.q=[];
            function r(){
              var s=d.createElement('script'); s.async=1; s.type='text/javascript'; s.src=helpcrunchwidgetLink;
              (d.body||d.head).appendChild(s);
            }
            if(w.attachEvent){ w.attachEvent('onload',r) } else { w.addEventListener('load',r,false) }
          })(window,document);
        `}
      </Script>

      <Script id="clarity-inline" strategy="afterInteractive">
{`
  try {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "tsxcbosv2y");
  } catch(e) {
    console.error("Clarity init error:", e);
  }
`}
</Script>

      {/* Example: Any additional head meta or script tags */}
      <Head>
        <meta name="theme-color" content="#000000" />
        <SchemaData />
      </Head>
    </>
  );
}
