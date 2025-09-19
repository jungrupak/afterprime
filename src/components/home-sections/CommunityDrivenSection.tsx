"use client";
import React from "react";
//Imports
import BoxedBlock from "../boxed-block/BoxedBlock";
import Lists from "@/components/ui/Lists";
import Btn from "@/components/ui/Button";

export function CommunityDrivenSection() {
  const sectionTitle = "A community driven by transparency.";
  const sectionParagraph =
    "Our open Discord community ensures accountability — direct, transparent, and trader-led.";
  const CommunitySectionlistItems = [
    "Ask, challenge, or call us out — we're right there with you.",
    "Talk directly with the founders and team — no corporate wall.",
    "Create a trading journal to hold yourself accountable.",
    "Get to know us for a shot at joining our team.",
  ];
  return (
    <>
      <section>
        <div className="grainy_bg"></div>
        <div className="ap_container">
          <BoxedBlock isBoxed={true} vAlign="center">
            {/* left */}
            <div className="max-md:text-center md:pr-25">
              <h2 className="h2-size mb-6">{sectionTitle}</h2>
              <p className="paragraph">{sectionParagraph}</p>
              <div className="mt-12">
                <Btn
                  varient="primary-ghost"
                  href="#"
                  isArrowVisible={true}
                  size="large"
                >
                  Request Invite
                </Btn>
              </div>
            </div>
            {/* Left Ends */}

            {/* right */}
            <div>
              <Lists
                bulletVarient="arrow-blue"
                bulletSize="default"
                listItems={CommunitySectionlistItems}
              />
            </div>
            {/* right ends */}
          </BoxedBlock>
        </div>
      </section>
    </>
  );
}
