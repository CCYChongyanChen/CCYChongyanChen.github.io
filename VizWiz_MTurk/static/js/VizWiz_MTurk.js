var searchParams = new URLSearchParams(window.location.search);
var imageURLvalue = searchParams.get("img1");
document.getElementById("VizWiz_img").src=imageURLvalue;
