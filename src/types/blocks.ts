//All block types goes here//////////////////
export type Blocks = {
  "acf/inner-page-intro-block": {
    intro_block_title_: string;
    intro_block_description: string;
    intro_block?: string;
  };
  "acf/inner-page-hero-banner": {
    inner_banner_title: string;
    inner_banner_paragraph: string;
    inner_banner_button_label?: string;
    inner_banner_button_url?: string;
    inner_banner?: string;
  };
};
//

export type CustomBlocks = keyof Blocks;

export type ACFBlock = {
  name: "acf/inner-page-intro-block";
  fields: Blocks["acf/inner-page-intro-block"];
};

///////////////////////////////////////////////////////////////////////////////

//Acf Field Groups############/////////
export type PageFieldGroups = {
  founder_message: {
    cart_title?: string;
    card_paragraph?: string;
  };
  // add other field groups here
};
//Acf Field Groups############///////// Ends

export type FieldGroupName = keyof PageFieldGroups;

///
export type WPPage = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  acf?: PageFieldGroups;
  acf_blocks?: ACFBlock[];
};
//
