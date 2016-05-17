document.getElementById("file").onchange = function() {
	reverseIndent(); 
};

document.getElementById("select-all").addEventListener('click', function () {
	document.getElementById("result").focus(); 
	document.getElementById("result").select(); 
});

//document.getElementById("save").addEventListener('click', function () {});


function processAll(all) {
	document.getElementById("resultPanel").style.display = "inline";
	document.getElementById("result").innerHTML = "";
	var numberOfTabs = []; 
	var i =0;
	var maxTabs = 0; 
	var useSpacedInsteadOfTabs = false;

	for(i = 0; i < all.length; i++) {
		numberOfTabs[i] = all[i].split('\t').length; 
	}
	maxTabs = Math.max.apply(Math, numberOfTabs); 
	if(maxTabs == 1) {			// \t not used for tab; using leading spaces instead

		useSpacedInsteadOfTabs = true;
		for(i = 0; i < all.length; i++) {
			numberOfTabs[i] = 0; 
			while(all[i].startsWith(" ")) {
				numberOfTabs[i]++;
				all[i] = all[i].substring(1, all[i].length); 
			}
		}
		maxTabs = Math.max.apply(Math, numberOfTabs); 
	}
	
	for(i = 0; i < all.length; i++) {
		var numberOfTabsForThisLine = 0; 
		if(all[i].startsWith("\n")) break; 
		
		all[i] = all[i].trim(); 
		
		var toInsert = ""; 
		for(var j = 0; j < (maxTabs - numberOfTabs[i]); j++) {
			if (useSpacedInsteadOfTabs) {
				toInsert += " ";	
			} else {
				toInsert += "\t"; 
			}
		}	
		
		all[i] = toInsert + all[i]; 
		
		document.getElementById("result").innerHTML += all[i] + "\n"; 	
	}		
}

function reverseIndent() {
	var file = document.getElementById("file").files[0]; 
	var reader = new FileReader(); 

	reader.onload = function(e) {
		var contents = e.target.result;
		var all = contents.split(/\r\n|\r|\n/); 
		
		processAll(all); 
	};
	
	reader.readAsText(file); 	
}


// shims from https://gist.github.com/djKianoosh/7090542
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this === null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;

		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}

/*
  IE Doesn't have a .startsWith either?
*/
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function (str){
		return this.lastIndexOf(str, 0) === 0;
	};
}

// IE < 9 doesn't have a trim() for strings
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};
}