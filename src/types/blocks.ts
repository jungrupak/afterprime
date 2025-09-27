//All block types goes here//////////////////
export type Blocks = {
  "inner-page-intro-block": {
    intro_block_title_: string;
    intro_block_description: string;
    intro_block?: string;
  };
  "inner-page-hero-banner": {
    inner_banner_title?: string;
    inner_banner_paragraph?: string;
    inner_banner_button_label?: string;
    inner_banner_button_url?: string;
    inner_banner?: string;
  };
  "highlight-texts": {
    highlight_text?: string;
    content_width?: string;
  };
};
//

export type CustomBlocks = keyof Blocks; //"intro_block" | "cta_block" | "testimonial_block";

export type ACFBlock<K extends CustomBlocks = CustomBlocks> = {
  name: `acf/${K}`;
  fields: Blocks[K];
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
