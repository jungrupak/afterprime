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
    inner_banner_is_type_form_cta?: string | undefined;
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
    content_block_with_image_is_type_form_cta?: string | undefined;
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
    multipurpose_block_content_vertical_alignment?: string;
    multipurpose_block_section_heading?: string;
    multipurpose_block_section_content?: string;
    multipurpose_block_block_cta_label?: string;
    multipurpose_block_cta_url?: string;
    multipurpose_block_block_has_featured_image?: string;
    multipurpose_block_has_feature_bullet_list?: string;
    multipurpose_block_active_right_column_content_block?: string;
    multipurpose_block_text_content_block_title?: string;
    multipurpose_block_text_content_block_content?: string;
    multipurpose_block_is_type_form_cta?: string | undefined;
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
  "section-with-cards": {
    section_card_list_big_section_title?: string;
    section_card_list_big_section_paragraph?: string;
    [
      key: `section_card_list_big_cards_${number}_${
        | "title"
        | "paragraph"
        | "button_label"
        | "button_url"}`
      ]: string | undefined;
    section_card_list_big_cards?: number;
    section_card_list_big_card_size?: string | undefined;
    section_card_list_big_section_heading_alignment?: string;
    section_card_list_big?: string | undefined;
  };
  "reviews-section": {
    google_reviews_section_section_title?: string;
    google_reviews_section_section_paragraph?: string;
    google_reviews_section_enable_page_layout?: string;
  };
  "founder-messages": {
    founder_message_cart_title?: string;
    founder_message_card_paragraph?: string;
  };
  "hero-banner-home": {
    hero_banner_home_banner_heading?: string;
    hero_banner_home_banner_paragraph?: string;
    hero_banner_home_banner_btn_text?: string;
    hero_banner_home_banner_btn_url?: string;
    hero_banner_home?: string | undefined;
    hero_banner_home_is_type_form_cta?: string | undefined;
    hero_banner_home_data_source_note?: string | undefined;
  };
  "earning-flow-block": {
    earning_flow_section_heading?: string;
    [key: `earning_flow_list_items_${number}_list_item`]: string | undefined;
    earning_flow_list_items?: number;
    earning_flow_is_cta_visible?: string;
    earning_flow_button_text?: string;
    earning_flow_button_link?: string;
    earning_flow?: string | undefined;
  };
  "usp-under-home-hero": {
    usp_under_home_static_info_text?: string;
    usp_under_home_static?: string | undefined;
  };
  "section-datavisualization": {
    data_visialization_section_section_title?: string;
    data_visialization_section_paragraph?: string;
    data_visialization_section?: string | undefined;
  };
  "live-pricing-table": {
    live_pricing_table_select_live_feed_?: string;
    live_pricing_table?: string | undefined;
  };
  "block-pros-and-cons": {
    pros_and_cons_section_title?: string;
    pros_and_cons_section_paragraph?: string;
    pros_and_cons_section_cta_label?: string;
    pros_and_cons_cta_url?: string;
    [key: `pros_and_cons_pros_title_pros_or_advantages_${number}_list_item`]:
      | string
      | undefined;
    [
      key: `pros_and_cons_cons_title_cons_or_disadvantages_${number}_list_item`
      ]: string | undefined;
    pros_and_cons_pros_title_pros_or_advantages?: number;
    pros_and_cons_cons_title_cons_or_disadvantages?: number;
    pros_and_cons?: string | undefined;
    pros_and_cons_pros_title_title?: string;
    pros_and_cons_cons_title_title?: string;
    pros_and_cons_is_boxed?: string;
  };

  "section-more-value-real-alignment-static": {
    more_value_alignment_?: string | undefined;
  };

  "platform-cards-section-static": {
    platforms_cards?: string | undefined;
  };
  "margin-and-leverage-table": {
    margin_and_leverage_table_static_label?: string | undefined;
    margin_and_leverage_table?: string | undefined;
  };
  "margin-call-and-leverage": {
    margin_stop_call_table_static_label?: string | undefined;
    margin_stop_call_table?: string | undefined;
  };
  "client-money-section": {
    client_money_static_block_section_title?: string;
    client_money_static_block_paragraph?: string;
  };
  "funding-card-lists": {
    funding_cards_section_section_title?: string;
    funding_cards_section_section_paragraph?: string;
    funding_cards_section_select_method_type?: string;
    funding_cards_section?: string | undefined;
  };
  "swap-table-section": {
    swap_data_csv_endpoint_end_point_forex_major?: string;
    swap_data_csv_endpoint_end_point_forex_minor?: string;
    swap_data_csv_endpoint_end_point_forex_exotic?: string;
    swap_data_csv_endpoint_end_point_commodities?: string;
    swap_data_csv_endpoint_end_point_indices?: string;
    swap_data_csv_endpoint_end_point_crypto?: string;
    swap_data_csv_endpoint?: string | undefined;
  };
  "rebate-table": {
    rebate_table_title?: string | undefined;
    rebate_table_section_paragraph?: string | undefined;
    rebate_table?: string | undefined;
  };
  "reading-content": {
    reading_content?: string | undefined;
    block_image?: {
      url?: string | undefined;
      alt?: string | undefined;
    }
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
// Card Object generic type
// --------------------------------------------
export type CardObjects = {
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
  bottom_cta?: {
    section_title?: string;
    section_paragraph?: string;
    card_apply?: {
      title?: string;
      paragraph?: string;
      cat_label?: string;
      cat_link?: string;
    };
    card_referal?: {
      title?: string;
      paragraph?: string;
      cat_label?: string;
      cat_link?: string;
    };
  };
  // add other field groups here
  faq_section?: {
    ssection_title?: string;
    q_and_a?: {
      question?: string;
      answer?: string;
    }[];
  };
  // add other field groups here
  seo_block?: {
    title?: string;
    description?: string;
    opengraph?: {
      title?: string;
      description?: string;
      site_url?: string;
      sitename?: string;
      og_image?: {
        url?: string;
        alt?: string;
      };
    };
  };
  // add other field groups here
  instrument_page_fields?: {
    what_is_flow_rewards_section?:{
      heading?:string;
      paragraph?:string;
    };
    execution_quality_rational?:Record<string,string> // instead of writing "{}" for object items
    lp_cta?:Record<string,string>
  }
};

//AIOSEO Types
export type Aioseo = {
  title?: string | undefined;
  description?: string | undefined;
  keywords?: string[];
};

// --------------------------------------------
// WP NotFound type
// --------------------------------------------
export type WPPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  acf?: PageFieldGroups;
  acf_blocks?: ACFBlock[];
};
