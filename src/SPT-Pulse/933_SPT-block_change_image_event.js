var client = (b.client || "").toLowerCase();
if (
    a === "view" &&
    ((client === "bbx" && b.event_name === "adimage_view") ||
        (client === "bbx" && b.event_name === "adimage_view_fullscreen") ||
        (client === "desktop" && b.event_name === "ad_img") ||
        (client === "mweb" && b.event_name === "adimg") ||
        (client === "mweb" && b.event_name === "view_image"))
) {
    // do not track change image events in Pulse
    return false;
}
