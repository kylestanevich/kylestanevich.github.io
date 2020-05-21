
function init() {
    
    navbar_init();
    map_init();
    head_img_blur_init();
    
}
function resize() {
    
    navbar_resize();
    head_img_blur_resize();
    
}



function navbar_init() {
    
    nav_el = document.querySelector("nav");
    navbutton_el = document.querySelector("nav [href='#home']");
    navbuttonheight = navbutton_el.clientHeight;
    
    navbar_resize();
    
}
function navbar_resize() {
    
    nav_el.removeAttribute("style");
    
    nav_el.style.flexDirection = "row";
    
    if (nav_el.clientHeight==navbuttonheight) {
        nav_el.style.top = "0";
        nav_el.style.left = "0";
        nav_el.style.visibility = "visible";
    } else {
        nav_el.style.flexDirection = "column";
    }
    
}


function map_init() {
    
    document.querySelector("#mapid div").remove();
    
    var map = L.map('mapid',{}).setView([37.27530545,-102.39404495],4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var marker = L.marker([41.7869998,-88.3547522]).bindPopup('High School at IMSA').addTo(map);
    var marker = L.marker([41.8348729,-87.6270061]).bindPopup('College at IIT').addTo(map);
    var marker = L.marker([40.1019523,-88.2271615]).bindPopup('College at UIUC').addTo(map);
    var marker = L.marker([32.715738,-117.1610838]).bindPopup('Engineer in San Diego').addTo(map);
    
}



function head_img_blur_init() {
    
    head_img = document.querySelector("#home img");
    
    head_img_blur = document.createElement("IMG");
    head_img_blur.setAttribute("src",head_img.getAttribute("src"));
    head_img_blur.style.position = "absolute";
    head_img_blur.style.width = "100%";
    head_img_blur.style.filter = "blur(10px) grayscale(50%)";
    
    document.querySelector("#home div").insertBefore(head_img_blur,head_img);
    
    head_img_blur_resize();
    
}
function head_img_blur_resize() {
    
    head_img_blur.style.height = String(head_img.height).concat("px");
    
}



var nav_el
var navbutton_el
var navbuttonheight
var head_img
var head_img_blur


