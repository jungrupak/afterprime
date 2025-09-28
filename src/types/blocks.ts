// --------------------------------------------
// All block types
// --------------------------------------------
export type Blocks = {
  "inner-page-intro-block": {
    intro_block_title_?: string;
    intro_block_description?: string;
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
  };
  "simple-image-content": {
    content_block_with_image_heading?: string;
    content_block_with_image_content?: string;
    content_block_with_image_enable_cta_button?: string;
    content_block_with_image_button_group_cta_label?: string;
    content_block_with_image_button_group_cta_link?: string;
    content_block_with_image_block_image_image_alignment?: string;
    content_block_with_image_block_image_add_image?: {
      url?: string;
      alt?: string;
    };
    content_block_with_image_content_wrap_in_box?: string;
  };
  "inner-page-usp": {
    usps?: USPItem[];
  };
  "section-feature-four-cards": {
    section_card_repeator_section_title?: string;
    section_card_repeator_section_paragraph?: string;
    section_card_repeator_enable_cta?: string;
    section_card_repeator_cta_button_label?: string;
    section_card_repeator_cta_button_link?: string;
    [
      key: `section_card_repeator_cards_${number}_${
        | "title"
        | "paragraph"
        | "button_label"
        | "button_url"}`
    ]: string | undefined;
  };
  "block-multipurpose": {
    multipurpose_block_is_boxed?: string;
    multipurpose_block_section_heading?: string;
    multipurpose_block_section_content?: string;
    multipurpose_block_block_cta_label?: string;
    multipurpose_block_cta_url?: string;
    multipurpose_block_block_has_featured_image?: string;
    multipurpose_block_has_feature_bullet_list?: string;
    multipurpose_block_featured_image?: {
      url?: string;
      alt?: string;
    };
    [key: `multipurpose_block_feature_bullet_lists_${number}_list_item`]:
      | string
      | undefined;
  };

  "section-more-value-real-alignment": {
    more_value_real_alignment_section_title?: string;
    more_value_real_alignment_sub_title?: string;
    more_value_real_alignment_card_1_title?: string;
    more_value_real_alignment_card_1_sub_title?: string;
    more_value_real_alignment_card_1_cta_label?: string;
    more_value_real_alignment_card_1_cta_link?: string;
    more_value_real_alignment_card_2_title?: string;
    more_value_real_alignment_card_2_sub_title?: string;
    more_value_real_alignment_card_2_cta_label?: string;
    more_value_real_alignment_card_2_cta_link?: string;
    more_value_real_alignment_card_3_title?: string;
    more_value_real_alignment_card_3_sub_title?: string;
    more_value_real_alignment_card_3_cta_label?: string;
    more_value_real_alignment_card_3_cta_link?: string;
  };
};
//

// --------------------------------------------
// USP repeater type
// --------------------------------------------
export type USPItem = {
  title?: string;
  description?: string;
};

// --------------------------------------------
// Card repeater type
// --------------------------------------------
export type CardRepeaterType = {
  title?: string;
  paragraph?: string;
  button_label?: string;
  button_url?: string;
};

// --------------------------------------------
// Keys for custom blocks
// --------------------------------------------
export type CustomBlocks = keyof Blocks; //"inner-page-intro-block" | "section-feature-four-cards" | ...

// --------------------------------------------
// ACF Block type
// --------------------------------------------
export type ACFBlock<T extends CustomBlocks = CustomBlocks> = {
  name: `acf/${T}`;
  fields: Blocks[T];
};

// --------------------------------------------
// ACF Field Groups (for WPPage.acf)
// --------------------------------------------
export type PageFieldGroups = {
  founder_message?: {
    cart_title?: string;
    card_paragraph?: string;
  };
  // add other field groups here
};

// --------------------------------------------
// WP Page type
// --------------------------------------------
export type WPPage = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  acf?: PageFieldGroups;
  acf_blocks?: ACFBlock[];
};
