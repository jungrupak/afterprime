"use client";
import BoxedBlock from "../boxed-block/BoxedBlock";
import Btn from "@/components/ui/Button";
import Lists from "../ui/Lists";

export function AbookSection() {
  const aBookListsItems = [
    "No B-Book – We never profit from losses.",
    "Trades aligned with you, not against you.",
    "Consistently called the most honest broker.",
  ];
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <BoxedBlock isBoxed={true} vAlign="center">
          {/* Left */}
          <div>
            <div className="max-md:text-center md:pr-25">
              <h2 className="h2-size mb-6">
                A-Book+
                <br />
                Never Against You.
              </h2>
              <p className="paragraph">
                We operate with no conflict of interest. Every trade is hedged,
                every execution aligned with you.
              </p>
              <div className="mt-12">
                <Btn
                  varient="primary-ghost"
                  href="#"
                  isArrowVisible={true}
                  size="large"
                >
                  Execution Model
                </Btn>
              </div>
            </div>
          </div>
          {/* Left ends */}

          {/* Right */}
          <div>
            <Lists listItems={aBookListsItems} bulletVarient="arrow-blue" />
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
