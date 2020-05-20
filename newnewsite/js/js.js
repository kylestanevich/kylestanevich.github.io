
function init() {
    
    navbar_init();
    map_init();
    
}

function resize() {
    
    navbar_init();
    
}



function navbar_init() {
    
    nav_el = document.querySelector("nav");
    navbutton_el = document.querySelector("nav [href='#home']");
    
    nav_el.removeAttribute("style");
    
    nav_el.style.flexDirection = "row";
    
	navheight = nav_el.clientHeight;
    navbuttonheight = navbutton_el.clientHeight;
    
    if (navheight==navbuttonheight) {
        nav_el.style.top = "0";
        nav_el.style.left = "0";
        nav_el.style.visibility = "visible";
    } else {
        nav_el.style.flexDirection = "column";
    }
    
}



function map_init() {
    
    var map = L.map('mapid',{}).setView([37.27530545,-102.39404495],4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var marker = L.marker([41.7869998,-88.3547522]).bindPopup('High School at IMSA').addTo(map);
    var marker = L.marker([41.8348729,-87.6270061]).bindPopup('College at IIT').addTo(map);
    var marker = L.marker([40.1019523,-88.2271615]).bindPopup('College at UIUC').addTo(map);
    var marker = L.marker([32.715738,-117.1610838]).bindPopup('Engineer in San Diego').addTo(map);
    
}







