if (!b.client || b.client.toLowerCase() !== "jobs") {
    return false;
}

if (a === "link" && b.application === "employerPublic") {
    if (b.application_view === "employerSelfservice") {
        if (b.event_name === "purchaseBuy") {
            b.fb_event = "Purchase";
            b.currency = "EUR";
            b.price = b.product_price;
        } else {
            // unused - do not send facebook events
            return false;
        }
    } else {
        // unused - do not send facebook events
        return false;
    }
}
