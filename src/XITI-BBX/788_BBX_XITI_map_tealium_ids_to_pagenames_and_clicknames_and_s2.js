// This extension maps tealium page identifiers of barbarix to xiti page/click names and s2 parameter
// For a list of the tealium `event_name`s of page events, consult the tagging plan.
// The `event_name`s can also be found in barbarix code in taggingService.ts.
// We keep the source of this at https://github.schibsted.io/willhaben/willhaben-tealium-scripts/blob/master/Extensions/788_BBX_XITI_map_tealium_ids_to_pagenames_and_clicknames_and_s2.js
// Keep it up to date in the git repo, and do not just make random changes directly in the Tealium extension.

if (!b.client || b.client.toLowerCase() !== "bbx") {
    return false;
}

var map, params;

function isPrivateAd() {
    if (b.ad_type_id === "69") {
        return false;
    }

    // as a fallback we always assume private
    return true;
}

function createAutoMotorStartPageTag(vertical_id, category_level_id_1) {
    if (vertical_id !== "3") {
        return undefined;
    }

    switch (category_level_id_1) {
        case "2":
            return "CarsStartpage";
        case "4":
            return "MotorbikeStartpage";
    }

    return "MotorStartpage";
}

var privateOrProfessionalString = isPrivateAd() ? "Private" : "Professional";
var autoMotorStartPageTag = createAutoMotorStartPageTag(b.vertical_id, b.category_level_id_1);
var trendLabel = b.trend_label || "";
var verticalS2 = b.vertical_id;

if (a === "view") {
    map = {
        contact_contact: {
            page: "Contact::Contact",
            s2: "5",
        },
        terms_conditions_general: {
            page: "GeneralTerms",
            s2: "5",
        },
        terms_conditions_payment_and_delivery: {
            page: "TermsPaymentAndDelivery",
            s2: "5",
        },
        ad_rules: {
            page: "AdRules",
            s2: "5",
        },
        privacy_policy: {
            page: "PrivacyPolicy",
            s2: "5",
        },
        imprint: {
            page: "Imprint",
            s2: "5",
        },
        terms_conditions: {
            page: "TermsOfUse",
            s2: "5",
        },
        press_about_willhaben: {
            page: "Press::AboutWillhaben",
            s2: "5",
        },
        press_presstext: {
            page: "Press::PressText",
            s2: "5",
        },
        press_download: {
            page: "Press::Download",
            s2: "5",
        },
        security_hints_overview: {
            page: "SecurityHints::Overview",
            s2: "5",
        },
        security_hints_buy: {
            page: "SecurityHints::Buy",
            s2: "5",
        },
        security_hints_account: {
            page: "SecurityHints::Account",
            s2: "5",
        },
        security_hints_sell: {
            page: "SecurityHints::Sell",
            s2: "5",
        },
        security_hints_puppy: {
            page: "SecurityHints::Puppy",
            s2: "5",
        },
        mywillhaben_myprofile: {
            page: "MyWillhaben::MyProfile",
            s2: "10",
        },
        mywillhaben_changelogindata: {
            page: "MyWillhaben::MyProfile::Edit",
            s2: "10",
        },
        login: {
            page: "MyWillhaben::MyAccount::Login",
            s2: "10",
        },
        register_form: {
            page: "MyWillhaben::MyAccount::Registration",
            s2: "10",
        },
        register_confirm: {
            page: "MyWillhaben::MyAccount::RegistrationDone",
            s2: "10",
        },
        forgot_password: {
            page: "MyWillhaben::MyAccount::ForgotPassword",
            s2: "10",
        },
        forgot_password_confirm: {
            page: "MyWillhaben::MyAccount::ForgotPasswordDone",
            s2: "10",
        },
        change_password: {
            page: "MyWillhaben::MyAccount::ChangePassword",
            s2: "10",
        },
        my_search_agents: {
            page: "MyWillhaben::MySearchAgents",
            s2: "10",
        },
        my_search_agents_create: {
            page: "MyWillhaben::MySearchAgents_Create",
            s2: "10",
        },
        my_search_agents_edit: {
            page: "MyWillhaben::MySearchAgents_Edit",
            s2: "10",
        },
        my_search_agents_edit_modal: {
            page: "MyWillhaben::MySearchAgents_Edit_Overlay",
            s2: "10",
        },
        upselling: {
            page: "AI::".concat(privateOrProfessionalString).concat("::Upselling"),
            s2: "4",
        },
        checkout: {
            page: "AI::".concat(privateOrProfessionalString).concat("::Checkout"),
            s2: "4",
        },
        billrequest: {
            page: "MyWillhaben::MyAds::RequestInvoice",
            s2: "10",
        },
        invoices: {
            page: "MyWillhaben::MyAds::Invoices",
            s2: "10",
        },
        renew_ad_page: {
            page: "MyWillhaben::MyAds::RenewAd",
            s2: "10",
        },
        my_ads: {
            page: "MyWillhaben::MyAds",
            s2: "10",
        },
        my_saved_ads: {
            page: "MyWillhaben::MySavedAds",
            s2: "10",
        },
        chat_view: {
            page: "MyWillhaben::Messages",
            s2: "10",
        },
        adview: {
            page: "AdDetail",
            s2: verticalS2,
        },
        contact_seller_confirmation: {
            page: "MessageConfirmation",
            s2: verticalS2,
        },
        search_result_list: {
            page: "ResultList",
            s2: verticalS2,
        },
        detail_search: {
            page: "DetailSearch",
            s2: verticalS2,
        },
        vertical_home: {
            page: autoMotorStartPageTag,
            s2: verticalS2,
        },
        immotips: {
            page: "ImmoTips",
            s2: "2",
        },
    };

    params = map[b.event_name];

    if (!params) {
        utag.DB("ignoring unhandled event_name '" + b.event_name + "' in BBX XITI view map");
        return false;
    }

    b.xiti_page_chapter_name = params.page;
    b.xiti_s2 = params.s2;
} else if (a === "link") {
    map = {
        send_confirm: {
            click: "SendConfirm",
            s2: "5",
        },
        send_error: {
            click: "SendError",
            s2: "5",
        },
        mywillhaben_myprofile_save: {
            click: "MyProfile::Save",
            s2: "10",
        },
        mywillhaben_myprofile_seller_profile: {
            click: "MyProfile::SellerProfile",
            s2: "10",
        },
        mywillhaben_myprofile_privacy_policy: {
            click: "MyProfile::PrivacyPolicy",
            s2: "10",
        },
        login_success: {
            click: "Login::SendConfirm",
            s2: "10",
        },
        login_error: {
            click: "Login::SendError",
            s2: "10",
        },
        register_success: {
            click: "Registration::SendConfirm",
            s2: "10",
        },
        register_error: {
            click: "Registration::SendError",
            s2: "10",
        },
        my_search_agents_detail: {
            click: "MySearchAgents::Open::SearchResult_List",
            s2: "10",
        },
        my_search_agents_edit_click: {
            click: "MySearchAgents::Edit",
            s2: "10",
        },
        my_search_agents_deactivate: {
            click: "MySearchAgents::InactiveOn",
            s2: "10",
        },
        my_search_agents_activate: {
            click: "MySearchAgents::ActiveOn",
            s2: "10",
        },
        my_search_agents_delete: {
            click: "MySearchAgents::Delete",
            s2: "10",
        },
        my_search_agents_save: {
            click: "MySearchAgents_Edit::Save",
            s2: "10",
        },
        my_search_agents_change_criteria: {
            click: "MySearchAgents_Edit::ChangeCriteria",
            s2: "10",
        },
        upselling_purchase_click: {
            click: "Upselling::Purchase",
            s2: "4",
        },
        renew_ad_renew_click: {
            click: "RenewAd::Publish",
            s2: "10",
        },
        my_ads_click_open_context_menu: {
            click: "MyAds::Edit",
            s2: "10",
        },
        my_ads_click_delete_ad: {
            click: "MyAds::Delete",
            s2: "10",
        },
        my_ads_click_share_ad: {
            click: "MyAds::Share",
            s2: "10",
        },
        my_ads_click_upselling: {
            click: "MyAds::Upselling",
            s2: "10",
        },
        my_ads_click_finalize: {
            click: "MyAds::Resume",
            s2: "10",
        },
        my_ads_click_activate: {
            click: "MyAds::Activate",
            s2: "10",
        },
        my_ads_click_republish: {
            click: "MyAds::Resubmit",
            s2: "10",
        },
        my_ads_contextmenu_click_edit_images: {
            click: "MyAds::Edit::Image",
            s2: "10",
        },
        my_ads_contextmenu_click_edit_text: {
            click: "MyAds::Edit::Description",
            s2: "10",
        },
        my_ads_contextmenu_click_edit_delivery: {
            click: "MyAds::Edit::Delivery",
            s2: "10",
        },
        my_ads_contextmenu_click_activate: {
            click: "MyAds::Edit::Activate",
            s2: "10",
        },
        my_ads_contextmenu_click_deactivate: {
            click: "MyAds::Edit::Deactivate",
            s2: "10",
        },
        my_ads_contextmenu_click_toggle_availability: {
            click: "MyAds::Edit::ToggleAvailability",
            s2: "10",
        },
        my_ads_contextmenu_click_finalize: {
            click: "MyAds::Edit::Resume",
            s2: "10",
        },
        my_ads_contextmenu_click_republish: {
            click: "MyAds::Edit::Resubmit",
            s2: "10",
        },
        my_ads_contextmenu_click_upselling: {
            click: "MyAds::Edit::Upselling",
            s2: "10",
        },
        my_ads_contextmenu_click_delete: {
            click: "MyAds::Edit::Delete",
            s2: "10",
        },
        my_ads_contextmenu_click_request_bill: {
            click: "MyAds::Edit::RequestInvoice",
            s2: "10",
        },
        my_ads_click_goto_aza: {
            click: "MyAds::EmptyState::CreateAd",
            s2: "10",
        },
        my_saved_ads_click_renew: {
            click: "MySavedAds::Save::Renewed",
            s2: "10",
        },
        my_saved_ads_click_sorting_DATE_ADDED: {
            click: "MySavedAds::Sort::Date",
            s2: "10",
        },
        my_saved_ads_click_sorting_MARKET: {
            click: "MySavedAds::Sort::AdType",
            s2: "10",
        },
        my_saved_ads_click_sorting_PRICE_DESC: {
            click: "MySavedAds::Sort::PriceDescending",
            s2: "10",
        },
        my_saved_ads_click_sorting_PRICE_ASC: {
            click: "MySavedAds::Sort::PriceAscending",
            s2: "10",
        },
        header_click_logo: {
            click: "Menu::Logo",
            s2: "11",
        },
        header_click_messages: {
            click: "Menu::Messages",
            s2: "11",
        },
        header_click_login: {
            click: "Menu::Login",
            s2: "11",
        },
        header_click_register: {
            click: "Menu::Register",
            s2: "11",
        },
        header_click_myWillhaben: {
            click: "Menu::MyWillhaben",
            s2: "11",
        },
        header_click_insertAd: {
            click: "Menu::InsertAd",
            s2: "11",
        },
        header_click_marketplace: {
            click: "Menu::Generalist",
            s2: "11",
        },
        header_click_realestate: {
            click: "Menu::RealEstate",
            s2: "11",
        },
        header_click_motor: {
            click: "Menu::Motor",
            s2: "11",
        },
        header_click_jobs: {
            click: "Menu::Jobs",
            s2: "11",
        },
        header_click_ImgSearch: {
            click: "Menu::ImgSearch",
            s2: "11",
        },
        header_click_myAds: {
            click: "Menu::MyAds",
            s2: "11",
        },
        header_click_mySearches: {
            click: "Menu::MySearchAgents",
            s2: "11",
        },
        header_click_myFindings: {
            click: "Menu::MySavedAds",
            s2: "11",
        },
        header_click_chat: {
            click: "Menu::MyMessages",
            s2: "11",
        },
        header_click_editUser: {
            click: "Menu::MyProfile",
            s2: "11",
        },
        header_usermenu_click_myAdverts: {
            click: "Menu::MyWillhaben::MyAds",
            s2: "11",
        },
        header_usermenu_click_mySearches: {
            click: "Menu::MyWillhaben::MySearchAgents",
            s2: "11",
        },
        header_usermenu_click_myFindings: {
            click: "Menu::MyWillhaben::MySavedAds",
            s2: "11",
        },
        header_usermenu_click_chat: {
            click: "Menu::MyWillhaben::MyMessages",
            s2: "11",
        },
        header_usermenu_click_jobsProfile: {
            click: "Menu::MyWillhaben::MyJob",
            s2: "11",
        },
        header_usermenu_click_editUser: {
            click: "Menu::MyWillhaben::MyProfile",
            s2: "11",
        },
        header_usermenu_click_logout: {
            click: "Menu::MyWillhaben::Logout",
            s2: "11",
        },
        addetail_previous_ad_click: {
            click: "AdDetail::Navigation::Previous",
            s2: verticalS2,
        },
        addetail_next_ad_click: {
            click: "AdDetail::Navigation::Next",
            s2: verticalS2,
        },
        addetail_favorite_ad_click_save: {
            click: "AdDetail::SaveAd",
            s2: verticalS2,
        },
        addetail_favorite_ad_click_unsave: {
            click: "AdDetail::UnsaveAd",
            s2: verticalS2,
        },
        addetail_share_email_click: {
            click: "AdDetail::Share::Email",
            s2: verticalS2,
        },
        addetail_share_whatsapp_click: {
            click: "AdDetail::Share::Whatsapp",
            s2: verticalS2,
        },
        addetail_share_facebook_click: {
            click: "AdDetail::Share::Facebook",
            s2: verticalS2,
        },
        addetail_share_twitter_click: {
            click: "AdDetail::Share::Twitter",
            s2: verticalS2,
        },
        addetail_share_link_click: {
            click: "AdDetail::Share::Link",
            s2: verticalS2,
        },
        addetail_print_click: {
            click: "AdDetail::Print",
            s2: verticalS2,
        },
        addetail_dealer_website_click: {
            click: { "3": "AdDetail::DealerWebsite", "2": "AdDetail::BrokerWebsite" }[b.vertical_id] || "",
            s2: verticalS2,
        },
        addetail_contact_seller_top_click: {
            click: "AdDetail::ContactSeller",
            s2: verticalS2,
        },
        addetail_contact_seller_expand_address_fields_click: {
            click: "AdDetail::ShowAdressInputfields",
            s2: verticalS2,
        },
        addetail_show_phone_number_click: {
            click: "AdDetail::ShowPhoneNumber",
            s2: verticalS2,
        },
        addetail_more_ads_click: {
            click: "AdDetail::SellerProfile",
            s2: verticalS2,
        },
        addetail_show_opening_hours_click: {
            click: "AdDetail::ShowOpeningHours",
            s2: verticalS2,
        },
        addetail_expand_description_click: {
            click: "AdDetail::ShowDescription",
            s2: verticalS2,
        },
        addetail_expand_location_click: {
            click: "Addetail::ShowLocationDescription",
            s2: verticalS2,
        },
        addetail_more_from_dealer_ad_click: {
            click: { "3": "AdDetail::MoreFromDealer", "2": "AdDetail::MoreFromBroker" }[b.vertical_id] || "",
            s2: verticalS2,
        },
        addetail_similar_ad_click: {
            click: { "3": "AdDetail::MoreSimilarCars", "2": "AdDetail::MoreSimilarAds" }[b.vertical_id] || "",
            s2: verticalS2,
        },
        addetail_warranty_click: {
            click: "AdDetail::Warranty",
            s2: verticalS2,
        },
        addetail_defects_liability_click: {
            click: "AdDetail::DefectsLiability",
            s2: verticalS2,
        },
        addetail_warranty_logo_click: {
            click: "AdDetail::Warranty::Logo",
            s2: verticalS2,
        },
        addetail_dealer_profile_click: {
            click: { "3": "AdDetail::ShowDealerProfile", "2": "AdDetail::ShowBrokerProfile" }[b.vertical_id] || "",
            s2: verticalS2,
        },
        addetail_map_click: {
            click: "AdDetail::ShowMap",
            s2: verticalS2,
        },
        addetail_send_email_click: {
            click: "AdDetail::SendEmail",
            s2: verticalS2,
        },
        addetail_send_message_click: {
            click: "AdDetail::SendMessage",
            s2: verticalS2,
        },
        addetail_call_phone_click: {
            click: "AdDetail::Call",
            s2: verticalS2,
        },
        addetail_virtual_tour_click: {
            click: "AdDetail::360Tour",
            s2: verticalS2,
        },
        search_result_list_keyword_search: {
            click: "ResultList::KeywordSearch",
            s2: verticalS2,
        },
        search_result_list_reset_click_navigators: {
            click: "ResultList::RemoveAttribute::Filter",
            s2: verticalS2,
        },
        search_result_list_reset_click_top: {
            click: "ResultList::RemoveAttribute::Top",
            s2: verticalS2,
        },
        search_result_list_ad_click_save: {
            click: "ResultList::SaveAd",
            s2: verticalS2,
        },
        search_result_list_ad_click_unsave: {
            click: "ResultList::UnsaveAd",
            s2: verticalS2,
        },
        search_result_list_show_all_makes: {
            click: "ResultList::Filter::ShowAll::Make",
            s2: verticalS2,
        },
        search_result_list_show_all_equipments: {
            click: "ResultList::Filter::ShowAll::Extras",
            s2: verticalS2,
        },
        search_result_list_filter_small_click: {
            click: "ResultList::Filter",
            s2: verticalS2,
        },
        search_result_list_search_agent_click_top: {
            click: "ResultList::SearchAgent::Top",
            s2: verticalS2,
        },
        search_result_list_search_agent_click_sticky: {
            click: "ResultList::SearchAgent::Sticky",
            s2: verticalS2,
        },
        search_result_list_search_agent_click_sticky_small: {
            click: "ResultList::SearchAgent::Sticky::Small",
            s2: verticalS2,
        },
        search_result_list_search_agent_click_empty_result: {
            click: "ResultList::SearchAgent::EmptyResult",
            s2: verticalS2,
        },
        search_result_list_search_agent_click_bottom: {
            click: "ResultList::SearchAgent::Bottom",
            s2: verticalS2,
        },
        vertical_home_tab_car_click: {
            click: "MotorStartpage::Cars",
            s2: verticalS2,
        },
        vertical_home_tab_mc_click: {
            click: "MotorStartpage::Motorbikes",
            s2: verticalS2,
        },
        vertical_home_tab_truck_click: {
            click: "MotorStartpage::Trucks",
            s2: verticalS2,
        },
        vertical_home_tab_caravan_click: {
            click: "MotorStartpage::Caravans",
            s2: verticalS2,
        },
        vertical_home_search_box_search_button_click: {
            click: "MotorStartpage::ViewResults",
            s2: verticalS2,
        },
        vertical_home_search_box_detail_search_click: {
            click: "MotorStartpage::MoreOptions",
            s2: verticalS2,
        },
        vertical_home_search_box_condition_new_activate: {
            click: "MotorStartpage::NewOption::ToggleOn",
            s2: verticalS2,
        },
        vertical_home_search_box_condition_new_deactivate: {
            click: "MotorStartpage::NewOption::ToggleOff",
            s2: verticalS2,
        },
        vertical_home_quicklink_1_click: {
            click: "MotorStartpage::QuickLink::1st",
            s2: verticalS2,
        },
        vertical_home_quicklink_2_click: {
            click: "MotorStartpage::QuickLink::2nd",
            s2: verticalS2,
        },
        vertical_home_quicklink_3_click: {
            click: "MotorStartpage::QuickLink::3rd",
            s2: verticalS2,
        },
        vertical_home_quicklink_4_click: {
            click: "MotorStartpage::QuickLink::4th",
            s2: verticalS2,
        },
        vertical_home_spareparts_click: {
            click: "MotorStartpage::SpareParts",
            s2: verticalS2,
        },
        vertical_home_dealers_click: {
            click: "MotorStartpage::Dealers",
            s2: verticalS2,
        },
        vertical_home_ad_insertion_button_click: {
            click: "MotorStartpage::AdInsertion",
            s2: verticalS2,
        },
        vertical_home_topad_click: {
            click: "MotorStartpage::TopAd",
            s2: verticalS2,
        },
        vertical_home_trend_click: {
            click: "MotorStartpage::Trends::".concat(trendLabel),
            s2: verticalS2,
        },
        vertical_home_popular_car_make_click: {
            click: "MotorStartpage::PopularMakes::Cars",
            s2: verticalS2,
        },
        vertical_home_popular_mc_make_click: {
            click: "MotorStartpage::PopularMakes::Motorbikes",
            s2: verticalS2,
        },
        detail_search_container_search_agent_car_click_bottom: {
            click: "DetailSearch::Cars::ActivateSearchAgent",
            s2: verticalS2,
        },
        detail_search_container_search_agent_mc_click_bottom: {
            click: "DetailSearch::Motorbikes::ActivateSearchAgent",
            s2: verticalS2,
        },
        detail_search_search_button_car_click: {
            click: "DetailSearch::Cars::Search",
            s2: verticalS2,
        },
        detail_search_search_button_mc_click: {
            click: "DetailSearch::Motorbikes::Search",
            s2: verticalS2,
        },
        detail_search_search_button_caravan_click: {
            click: "DetailSearch::Caravans::Search",
            s2: verticalS2,
        },
        detail_search_search_button_truck_click: {
            click: "DetailSearch::Trucks::Search",
            s2: verticalS2,
        },
        immotips_aza_click: {
            click: "ImmoTips::Aza",
            s2: "2",
        },
        immotips_tips_click: {
            click: "ImmoTips::tipps",
            s2: "2",
        },
        immotips_glossar_click: {
            click: "ImmoTips::glossar",
            s2: "2",
        },
        immotips_immy_click: {
            click: "ImmoTips::immy",
            s2: "2",
        },
        immotips_contact_click: {
            click: "ImmoTips::contact",
            s2: "2",
        },
        // -------- self-promotions ----------
        addetail_more_from_dealer_viewed_selfpromotion: {
            xiti_selfpromotion_impression: {
                adId: "3",
                productId: "AdDetail",
                format: { "3": "SimilarAdsWidgetCarB2C", "2": "SimilarAdsWidgetREB2C" }[b.vertical_id] || "",
            },
        },
        addetail_similar_ads_viewed_selfpromotion: {
            xiti_selfpromotion_impression: {
                adId: "3",
                productId: "AdDetail",
                format: { "3": "SimilarAdsWidgetCar", "2": "SimilarAdsWidgetRE" }[b.vertical_id] || "",
            },
        },
    };

    params = map[b.event_name];

    if (!params) {
        utag.DB("ignoring unhandled event_name '" + b.event_name + "' in BBX XITI link map");
        return false;
    }

    b.xiti_click_chapter_name = params.click;
    b.xiti_s2 = params.s2;

    b.xiti_selfpromotion_impression = params.xiti_selfpromotion_impression;
}
