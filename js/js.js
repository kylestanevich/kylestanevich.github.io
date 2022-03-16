
function init() {
    
    navbar_init();
    get_head_img();
    map_init();
    createObserver();
    
}
function resize() {
    
    navbar_resize();
    head_img_blur_resize();
    
}



function navbar_init() {
    
    nav_el = document.querySelector("nav");
    navbuttonheight = document.querySelector("nav [href='#home']").clientHeight;
    
    // try { //probably do not need this try catch statement, can delete later after testing
        // document.styleSheets[0].deleteRule(5);
    // } catch (err) {
        // //no need for a catch statement right now
    // }
    
    navbar_resize();
    
}
function navbar_resize() {
    
    is_phone_nav_old = is_phone_nav;
    
    nav_el.removeAttribute("style");
    
    nav_el.style.flexDirection = "row";
    
    if (nav_el.clientHeight==navbuttonheight) {
        nav_el.style.top = "0";
        nav_el.style.left = "0";
        nav_el.style.visibility = "visible";
        is_phone_nav = false;
        if (is_phone_nav_old) {
            remove_js_hover();
        }
    } else {
        nav_el.style.flexDirection = "column";
        is_phone_nav = true;
        if (!is_phone_nav_old) {
            add_js_hover();
        }
    }
    
}
function add_js_hover() {
    
    nb = document.querySelector(".navbar");
    nb.addEventListener("click", nbh, false);
    nb.addEventListener("mouseenter", nbh, false);
    nb.addEventListener("mouseleave", nbh, false);
    
}
function remove_js_hover() {
    
    nb = document.querySelector(".navbar");
    nb.removeEventListener("click", nbh, false);
    nb.removeEventListener("mouseenter", nbh, false);
    nb.removeEventListener("mouseleave", nbh, false);
    
}
function nbh(event) {
    
    switch(event.type) {
        
        case "click":
            
            if ((nav_el.style.visibility == "visible") & (!mouse_enter)) {
                nav_el.style.visibility = "hidden";
            } else {
                nav_el.style.visibility = "visible";
            }
            break;
            
        case "mouseenter":
            
            nav_el.style.visibility = "visible";
            mouse_enter = true;
            setTimeout(function(){ mouse_enter = false; });
            break;
            
        case "mouseleave":
            
            nav_el.style.visibility = "hidden";
            break;
            
    }
    
}



function map_init() {
    
    document.querySelector("#mapid div").remove();
    
    marker_array = [[[41.785801,-88.353572],'High School at IMSA<br>2010-2013<br>Aurora, IL'],
                    [[41.833589,-87.626140],'College at IIT<br>2013-2014<br>Chicago, IL'],
                    [[40.111883,-88.228173],'College at UIUC<br>2015-2018<br>Champaign, IL'],
                    [[33.016071,-117.103620],'Engineer at General Atomics<br>2018-2020<br>San Diego, CA'],
                    [[35.036772,-106.543437],'Engineer at Sandia National Laboratories<br>2020-2021<br>Albuquerque, NM'],
                    [[47.672833,-122.094306],'Engineer at Project Kuiper (Amazon)<br>2021-present<br>Redmond, WA']];
    
    x_min = Infinity
    x_max = -Infinity
    y_min = Infinity
    y_max = -Infinity
    for (z in marker_array) {
        if (z[0][0] < x_min) {
            x_min = z[0][0];
        }
        if (z[0][0] > x_max) {
            x_max = z[0][0];
        }
        if (z[0][1] < y_min) {
            y_min = z[0][1];
        }
        if (z[0][1] > y_max) {
            y_max = z[0][1];
        }
        console.log(x_min)
    }
    
    var map = L.map('mapid',{'worldCopyJump':true}).setView([(x_max+x_min)/2,(y_max+y_min)/2],4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    for (z in marker_array) {
        var marker = L.marker(z[0]).bindPopup(z[1]).addTo(map);
    }
    
}


function get_head_img() {
    
    head_img = document.querySelector("#home img");
    head_img.onload = function() {head_img_blur_init()};
    
}
function head_img_blur_init() {
    
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



function createObserver() {
    
    let levels = 50;
    
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: [ ...Array(levels+1).keys() ].map( i => i/levels)
    };
    
    let observer = new IntersectionObserver(handleIntersect, options);
    
    let els = document.querySelectorAll("body > div");
    let el;
    for (el of els) {
        if (el.id) {
            observer.observe(el);
        }
    }
    
}
function handleIntersect(entries, observer) {
    
    entries.forEach((entry) => {
        
        if (entry.intersectionRatio > 0) {
            // document.querySelector("".concat("a[href='#",entry.target.id,"']")).style.backgroundColor = "".concat("rgba(95,158,160,",entry.intersectionRatio,")");
            // document.querySelector("".concat("a[href='#",entry.target.id,"']")).style.backgroundColor = "".concat("rgba(95,158,160,",entry.intersectionRect.height/entry.rootBounds.height,")");
            document.querySelector("".concat("a[href='#",entry.target.id,"']")).style.backgroundColor = "".concat("rgba(95,158,160,",Math.max(entry.intersectionRatio,entry.intersectionRect.height/entry.rootBounds.height),")");
            //Math.max(...) is used in the case when the element is larger than root. In this case, 'intersectionRatio' will be <1.0 because root shows only a piece of the element, not the entire element. To get around this the ratio 'intersectionRect/rootBounds' is introduced. 'intersectionRect' is the rectangle of element visiable in root. 'rootBounds' is the rectangle of root. The ratio will be 1.0 if element is larger than root and is the only object visiable in root. If element is smaller than root, even if element is entirely visiable, then the ratio will be <1.0. 
            // document.querySelector("".concat("a[href='#",entry.target.id,"']")).style.boxShadow = "".concat("0 10px 5px -5px rgba(0,128,0,",entry.intersectionRatio,")");
        } else {
            document.querySelector("".concat("a[href='#",entry.target.id,"']")).removeAttribute("style");
        }
        
    });
    
}



var nav_el;
var navbuttonheight;
var head_img;
var head_img_blur;
var mouse_enter = false;
var is_phone_nav = false;



document.addEventListener("DOMContentLoaded", init);


