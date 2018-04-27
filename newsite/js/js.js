$(document).ready(function (){
//jquery function at load
//replace loadFunction with this if things are not loading fast enough
	resize;
});

function loadFunction(){
	resize;
	
	//-----map start-----//
	// create a LatLng object containing the coordinate for the center of the map
	var latlng = new google.maps.LatLng(36.9439079,-103.01245395);
	// create other objects containing the coordinates for other locations
	var cahome = new google.maps.LatLng(33.7428704,-117.7764242);
	var ilhome = new google.maps.LatLng(40.1449454,-88.2484837); 
	// prepare the map properties
	var options = {
		zoom: 5,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		navigationControl: true,
		mapTypeControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true
	};
	// initialize the map object
	var map = new google.maps.Map(document.getElementById('google_map'), options);
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

function resize(){
		//var overallHeight = document.querySelector("ul.topnav").clientHeight;
		var padding = parseInt(window.getComputedStyle(document.querySelector("ul.topnav")).getPropertyValue('padding'),10);
		//var elementHeight = document.querySelector("ul.topnav li a").clientHeight;
		//if (overallHeight > (elementHeight+2*padding)){
		//	isNavTwoLines = true;
		//	alert('two lines');
		//}else{
		//	isNavTwoLines = false;
		//	alert('one line');
		//}
		
		var homebtnWidth = document.querySelector("ul.topnav li a.homebtn").clientWidth;
		var newsbtnWidth = document.querySelector("ul.topnav li a.newsbtn").clientWidth;
		var c12btnWidth = document.querySelector("ul.topnav li a.c12btn").clientWidth;
		var c6btnWidth = document.querySelector("ul.topnav li a.c6btn").clientWidth;
		var c3btnWidth = document.querySelector("ul.topnav li a.c3btn").clientWidth;
		var c4btnWidth = document.querySelector("ul.topnav li a.c4btn").clientWidth;
		var c5btnWidth = document.querySelector("ul.topnav li a.c5btn").clientWidth;
		var aboutbtnWidth = document.querySelector("ul.topnav li a.aboutbtn").clientWidth;
		var comboWidth = homebtnWidth+newsbtnWidth+c12btnWidth+c6btnWidth+c3btnWidth+c4btnWidth+c5btnWidth+aboutbtnWidth;
		alert(comboWidth);
		
		var overallWidth = document.querySelector("ul.topnav").clientWidth;
		alert(overallWidth);
		
		var intViewportWidth = document.body.clientWidth;
		alert(intViewportWidth);
		
		//var intViewportWidtho = window.outerWidth;
		//alert(intViewportWidtho);
		
		if (overallWidth < (comboWidth+2*padding)){
			alert('2 lines');
		}
		
}
window.onresize = resize;
window.onload = resize;