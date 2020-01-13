var willhabenSPT = {} | willhabenSPT;

willhabenSPT = {
    EVENTS: {
        AD_VIEW: "adview",
        AD_INSERTION_FINISHED: "ad_insertion_finished",
        AD_INSERTION_PAID_CONFIRM: "ad_insertion_paid_confirm",
        AD_INSERTION_CONFIRMED_MWEB: "insert_bap_ad_form_confirm",
        AD_INSERTION_PAID_CONFIRMED_MWEB: "insert_bap_ad_form_payment_confirm",
        AD_INSERTION_PAID_CONFIRMED_COMM_MWEB: "insert_bapcomm_ad_form_payment_confirm",
        AD_INSERTION_BOATS_CONFIRMED_MWEB: "boats_insert_bap_ad_form_payment_confirm",
        AD_INSERTION_BOATS_CONFIRMED_COMM_MWEB: "boats_insert_bapcomm_ad_form_payment_confirm",
        CALL_BUTTON: "call_button",
        CONTACT_SELLER_CHAT_CONFIRMATION: "contact_seller_chat_confirmation",
        CONTACT_SELLER_CONFIRMATION: "contact_seller_confirmation",
        EMAIL_CONFIRMATION: "email_confirmation",
        LIST: "list",
        K_G_CHAT: "k_g_chat",
        SEARCH_RESULT_LIST: "search_result_list",
    },

    B_PROPS: {
        AD_TYPE_ID: "ad_type_id",
        EVENT_NAME: "event_name",
        SPT_CUSTOM: "spt_custom",
        VERTICAL_ID: "vertical_id",
    },

    PUBLISHER_TYPE_ENUM: {
        PRIVATE: "private",
        PRO: "pro",
    },

    utilities: {
        appendSPTCustom: function(name, value) {
            b[willhabenSPT.B_PROPS.SPT_CUSTOM] = b[willhabenSPT.B_PROPS.SPT_CUSTOM] || {};
            var sptCustom = JSON.parse(b[willhabenSPT.B_PROPS.SPT_CUSTOM]);
            sptCustom["object"] = sptCustom["object"] || {};
            sptCustom["object"][name] = value;
            b[willhabenSPT.B_PROPS.SPT_CUSTOM] = JSON.stringify(sptCustom);
        },
        addPublisherToInReplyTo: function(classifiedPublisher) {
            b.spt_in_reply_to = b.spt_in_reply_to || {};
            b.spt_in_reply_to.publisher = classifiedPublisher;
        },
        isAdInsertionConfirmation: function() {
            return (
                b["event_name"].toLowerCase() === "ad_insertion_finished".toLowerCase() ||
                b["event_name"].toLowerCase() === "ad_insertion_paid_confirm".toLowerCase() ||
                b["event_name"].toLowerCase() === "ad_insertion_edit_paid_confirm".toLowerCase() ||
                b["event_name"].indexOf("ad_form_confirm") > -1 ||
                b["event_name"].indexOf("ad_form_payment_confirm") > -1 ||
                b["event_name"].indexOf("ad_payment_confirm") > -1
            );
        },
    },

    classifiedAd: {
        includeCategories: function() {
            function make_marketplace_categories() {
                var rootCategoryName;
                var rootCategoryId;

                switch (b[willhabenSPT.B_PROPS.VERTICAL_ID]) {
                    case "1":
                        rootCategoryName = "Jobs";
                        break;
                    case "2":
                        rootCategoryName = "Realestate";
                        rootCategoryId = 7274;
                        break;
                    case "3":
                        rootCategoryName = "Motor";
                        break;
                    case "5":
                        rootCategoryName = "Generalist";
                        rootCategoryId = 2;
                        break;
                    default:
                        rootCategoryName = "Unknown";
                        rootCategoryId = -1;
                }
                var categories = [];

                categories.push(map_marketplace_category(rootCategoryId, rootCategoryName, 0, rootCategoryName));
                if (b["category_level_1"]) {
                    categories.push(map_marketplace_category(b["category_level_id_1"], b["category_level_1"], 1, rootCategoryName, b[willhabenSPT.B_PROPS.AD_TYPE_ID]));
                }
                if (b["category_level_2"]) {
                    categories.push(map_marketplace_category(b["category_level_id_2"], b["category_level_2"], 2, rootCategoryName, b[willhabenSPT.B_PROPS.AD_TYPE_ID]));
                }
                if (b["category_level_3"]) {
                    categories.push(map_marketplace_category(b["category_level_id_3"], b["category_level_3"], 3, rootCategoryName, b[willhabenSPT.B_PROPS.AD_TYPE_ID]));
                }
                if (b["category_level_4"]) {
                    categories.push(map_marketplace_category(b["category_level_id_4"], b["category_level_4"], 4, rootCategoryName, b[willhabenSPT.B_PROPS.AD_TYPE_ID]));
                }
                if (b["category_level_5"]) {
                    categories.push(map_marketplace_category(b["category_level_id_5"], b["category_level_5"], 5, rootCategoryName, b[willhabenSPT.B_PROPS.AD_TYPE_ID]));
                }

                return categories;
            }

            function map_marketplace_category(id, name, level, rootCategoryName, adTypeId) {
                var category = {};
                category["@type"] = "MarketplaceCategory";
                category["localName"] = name;
                category["level"] = level;
                category["name"] = name;

                var sdrn;
                var extension;

                switch (rootCategoryName) {
                    case "Motor":
                        sdrn = "sdrn:willhabenat:legacycategory";
                        if (level !== 0) {
                            extension = adTypeId;
                        }
                        break;
                    case "Realestate":
                        sdrn = "sdrn:willhabenat:category";
                        if (level !== 0) {
                            extension = b["category_tree_id"];
                        } else {
                            extension = id;
                        }
                        break;
                    default:
                        sdrn = "sdrn:willhabenat:category";
                        extension = id;
                }

                var localId = sdrn + ":" + rootCategoryName.toLocaleLowerCase();
                if (extension) {
                    localId = localId + ":" + extension;
                }
                category["localId"] = localId;

                return category;
            }

            var mapMarketPlaceEvents = [
                willhabenSPT.EVENTS.AD_VIEW,
                willhabenSPT.EVENTS.AD_INSERTION_CONFIRMED_MWEB,
                willhabenSPT.EVENTS.AD_INSERTION_PAID_CONFIRMED_COMM_MWEB,
                willhabenSPT.EVENTS.AD_INSERTION_BOATS_CONFIRMED_MWEB,
                willhabenSPT.EVENTS.AD_INSERTION_BOATS_CONFIRMED_COMM_MWEB,
                willhabenSPT.EVENTS.AD_INSERTION_FINISHED,
                willhabenSPT.EVENTS.AD_INSERTION_PAID_CONFIRM,
                willhabenSPT.EVENTS.CONTACT_SELLER_CHAT_CONFIRMATION,
                willhabenSPT.EVENTS.CALL_BUTTON,
                willhabenSPT.EVENTS.K_G_CHAT,
                willhabenSPT.EVENTS.EMAIL_CONFIRMATION,
                willhabenSPT.EVENTS.LIST,
                willhabenSPT.EVENTS.SEARCH_RESULT_LIST
            ]
            var event_name = b[willhabenSPT.B_PROPS.EVENT_NAME].toString().toLowerCase();
            if(mapMarketPlaceEvents.indexOf(event_name) > -1 
                || event_name.indexOf("ad_form_payment_confirm") > -1
                || event_name.indexOf("ad_form_confirm") > -1
                || event_name.indexOf("ad_payment_confirm") > -1) {

                    var categories = make_marketplace_categories();
                    b["spt_category"] = "";
                    b["spt_category_id"] = "";
                    b["spt_subcategory"] = null;
                    b["spt_subcategory_id"] = null;
                    for (var i = 0; i < categories.length; i++) {
                        if (i !== 0) {
                            b["spt_category"] = b["spt_category"] + ",";
                            b["spt_category_id"] = b["spt_category_id"] + ",";
                        }
                        b["spt_category"] = b["spt_category"] + categories[i].name;
                        b["spt_category_id"] = b["spt_category_id"] + categories[i].localId;
                    }
            } 
        },

        includePublisher: function() {
            function setPublisher() {
                b["spt_publisher_id"] = b.seller_uuid || " ";
                if (b["is_private"]) {
                    b["spt_publisher_type"] = b["is_private"] === "true" ? willhabenSPT.PUBLISHER_TYPE_ENUM.PRIVATE : willhabenSPT.PUBLISHER_TYPE_ENUM.PRO;
                }
            }

            switch (b[willhabenSPT.B_PROPS.EVENT_NAME].toString().toLowerCase()) {
                case willhabenSPT.EVENTS.AD_VIEW:
                case willhabenSPT.EVENTS.K_G_CHAT:
                case willhabenSPT.EVENTS.EMAIL_CONFIRMATION:
                case willhabenSPT.EVENTS.CONTACT_SELLER_CHAT_CONFIRMATION:
                case willhabenSPT.EVENTS.CONTACT_SELLER_CONFIRMATION:
                case willhabenSPT.EVENTS.LIST:
                    setPublisher();
                    break;
            }
            if (willhabenSPT.utilities.isAdInsertionConfirmation()) {
                setPublisher();
            }
        },
    },
    build: function() {
        willhabenSPT.classifiedAd.includeCategories();
        willhabenSPT.classifiedAd.includePublisher();
    },
};

willhabenSPT.build();
