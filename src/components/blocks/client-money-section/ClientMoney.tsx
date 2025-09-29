"use client";
import BoxedBlock from "@/components/boxed-block/BoxedBlock";
import Button from "@/components/ui/Button";
import { Blocks } from "@/types/blocks";

type PropData = Blocks["client-money-section"];

export function ClientMoneySection({
  client_money_static_block_section_title,
  client_money_static_block_paragraph,
}: PropData) {
  //repeater keys to gra their values

  //function to get list data

  const heading = String(client_money_static_block_section_title || "");
  const contents = String(client_money_static_block_paragraph || "");
  const htmlContent = contents
    .split(/\r?\n\r?\n/)
    .map((para?: string) => `<p>${para}</p>`)
    .join("");

  ////////
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <BoxedBlock vAlign="start">
          {/* Left */}
          <div>
            <div className="max-md:text-center md:pr-25">
              <h2>{client_money_static_block_section_title}</h2>
              <div
                className="wysWygEditor"
                dangerouslySetInnerHTML={{ __html: htmlContent || "&nbsp;" }}
              />
              <p>Paragraph</p>
            </div>
          </div>
          {/* Left ends */}

          {/* Right */}
          <div>
            <div className="genericTable">
              <table>
                <tbody>
                  <tr>
                    <td>Contracting Entity</td>
                    <td>Afterprime Pty. Ltd.</td>
                  </tr>
                  <tr>
                    <td>Contracting Entity</td>
                    <td>FSA</td>
                  </tr>
                  <tr>
                    <td>Client Classification</td>
                    <td>Retail and Wholesale</td>
                  </tr>
                  <tr>
                    <td>Segregated Client Trust Account</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Banking Partner(s)</td>
                    <td>ABSA (Seychelles) Limited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
