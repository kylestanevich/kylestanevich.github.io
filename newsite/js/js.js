//$(document).ready(function (){
//jquery function at load
//replace loadFunction with this if things are not loading fast enough
//	resize;
//});

function init() {
	//maps();
	getinitsize();		
}

function textboxheight(){
	document.querySelectorAll(".row").forEach(eachrow);
}

function eachrow(item){
	var textboxes = item.querySelectorAll(".textbox");
	var len = textboxes.length;
	if (len > 1){
		maxheight = 0;
		textboxes.forEach(resetheight);
		textboxes.forEach(getheight);
		textboxes.forEach(setheight);
	}
}

function getheight(item){
	var height = item.clientHeight;
	if (height > maxheight){
		maxheight = height;
	}
}

function setheight(item){
	item.style.height = maxheight + "px";
}

function resetheight(item){
	item.style.height = "auto";
}

function maps() {
	//-----map start-----//
	// create a LatLng object containing the coordinate for the center of the map
	var latlng = new google.maps.LatLng(36.9439079,-103.01245395);
	// create other objects containing the coordinates for other locations
	var cahome = new google.maps.LatLng(33.7428704,-117.7764242);
	var ilhome = new google.maps.LatLng(40.1449454,-88.2484837); 
	// prepare the map properties
	var options = {
		zoom: 4,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		navigationControl: true,
		mapTypeControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true
	};
	// initialize the map object
	var map = new google.maps.Map(document.getElementById('map'), options);
	// add Markers
	var marker1 = new google.maps.Marker({
		position: cahome, map: map
	});
	var marker2 = new google.maps.Marker({
		position: ilhome, map: map
	});
	// add listener for a click on the cahome pin
	google.maps.event.addListener(marker1, 'click', function() {
		infowindow1.open(map, marker1);
	});
	// add listener for a click on the ilhome pin
	google.maps.event.addListener(marker2, 'click', function() {
		infowindow2.open(map, marker2);
	});
	// add information window for cahome
	var infowindow1 = new google.maps.InfoWindow({
		content:  '<div class="info"><strong>Where I reside when not at school.</strong><br><br>Tustin California</div>'
	});
	// add information window for ilhome
	var infowindow2 = new google.maps.InfoWindow({
		content:  '<div class="info"><strong>Where I reside when at school.</strong><br><br>Champaign Illinois</div>'
	});
	//-----map end-----//
}

function getinitsize(){
	var padding = parseInt(window.getComputedStyle(document.querySelector("ul.topnav")).getPropertyValue('padding'),10);
	var margin = parseInt(window.getComputedStyle(document.querySelector("ul.topnav")).getPropertyValue('margin'),10);
	var lichildren = document.querySelector("ul.topnav").children;
	var linum = lichildren.length;
	var lilenarr = new Array(linum)
	var i;
	for (i = 0; i < linum; i++) { 
		lilenarr[i] = lichildren[i].clientWidth;
	}
	criticalBodyWidth = lilenarr.reduce(getSum)+2*padding+2*margin;
	resize();
}

function getSum(total, num) {
	return total + num;
}

function resize(){
	if (document.body.clientWidth <= criticalBodyWidth){
		document.querySelector("ul.topnav").style.display = "none";
		document.querySelector("ul.droptopnav").style.display = "block";
	}else{
		document.querySelector("ul.topnav").style.display = "block";
		document.querySelector("ul.droptopnav").style.display = "none";
	}
	textboxheight();
}

function navbarupdate(){
	var tempsecy;
	var i;
	var indexmin = 0;
	var minsofar = 99999;
	for (i = 0; i < secnum; i++) {
		tempsecy = Math.abs(document.querySelector(sections[i]).getBoundingClientRect().y);
		if (tempsecy < minsofar){
			minsofar = tempsecy;
			indexmin = i;
		}
	}
	var activesec = document.querySelector("ul > li > .active");	
	var newactivesec = document.querySelector("a[href='" + sections[indexmin] + "']");
	if (activesec.getAttribute("href") != sections[indexmin]){
		activesec.classList.remove("active");
		newactivesec.classList.add("active");
	}
}

function say(){
	alert("1");
}

var sections = ["#home","#welcome","#bio","#edu","#research","#proj","#skills","#act","#resume","#contact"];
var secnum = sections.length;
var maxheight;
var criticalBodyWidth;

document.onclick = function(e) {
	e = e.target;
	if (e.className && e.className.indexOf('modaltrig') != -1) {
		var modal = document.getElementById('modal'+e.id);
		modal.style.display = "block";
	}
	else if (e.parentElement.className && e.parentElement.className.indexOf('modaltrig') != -1) {
		var modal = document.getElementById('modal'+e.id);
		modal.style.display = "block";
	}
	else if (e.className && e.className.indexOf('close') != -1) {
		var modal = document.getElementById(e.parentElement.parentElement.id);
		if (modal != null) {
			modal.style.display = "none";
		}
	}
	else if (e.className && e.className.indexOf('modal') != -1) {
		var modal = document.getElementById(e.id);
		if (modal != null) {
			modal.style.display = "none";
		}
	}
}

window.onresize = resize;
