

function init() {
	//maps();
	getinitsize();
    document.querySelectorAll('body > div').forEach(push_ids_to_sections)
}

function push_ids_to_sections(item){
    sections.push(item.id);
}

var sections = []

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



function getinitsize(){
	var padding = parseInt(window.getComputedStyle(document.querySelector(".topnav")).getPropertyValue('padding'),10);
	var margin = parseInt(window.getComputedStyle(document.querySelector(".topnav")).getPropertyValue('margin'),10);
	var lichildren = document.querySelector(".topnav").children;
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
		document.querySelector(".topnav").style.display = "none";
		document.querySelector(".droptopnav").style.display = "flow-root";
	}else{
		document.querySelector(".topnav").style.display = "flow-root";
		document.querySelector(".droptopnav").style.display = "none";
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
    // console.log(sections[indexmin])
	var activesec = document.querySelector("ul > li > .active");	
	var newactivesec = document.querySelector("a[href='#" + sections[indexmin] + "']");
	if (activesec.getAttribute("href") != sections[indexmin]){
		activesec.classList.remove("active");
		newactivesec.classList.add("active");
	}
}





var secnum = sections.length;
var maxheight;
var criticalBodyWidth;



window.onresize = resize;

