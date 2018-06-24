var container = document.getElementById('container');
var imageContainer = document.getElementById('imgs');
var body = document.getElementById('test');
var h = container.scrollHeight;
var w = container.scrollWidth;
var bool = true;
var nodeList = [];


container.addEventListener('mousemove', rotateGradients);
container.addEventListener('mouseenter', setNodeList);
container.addEventListener('mouseleave', clearNodeList);


// imageContainer.addEventListener('', getImages);

setTimeout(getImages, 100);

function rotateGradients(e) {
	var x = e.clientX - container.offsetLeft;
	var y = e.clientY - container.getBoundingClientRect().y;

	for(var i = 0; i < nodeList.length; i++) {

		if(nodeList[i].className != undefined 
			&& nodeList[i].className.indexOf('container-bg') > -1) {

			var gradientArr = getGradientArray(nodeList[i].style.background);

			if(gradientArr.length > 0) {
				var style = '';

				for(var j = 0; j < gradientArr.length; j++) {
					var deg = (360/gradientArr.length * (j+1));
					var degree = gradientArr[j].deg * (getDegrees(250,250,250-x,250-y)/90) + deg;

					style = style + 'linear-gradient(' + degree + 'deg, ' + gradientArr[j].styles;
				}

				var bg = style;

				nodeList[i].style.background = bg;

			}
		}
	}
}

function getDegrees (x0, y0, x1, y1) {
	var distY = Math.abs(y1-y0);
	var distX = Math.abs(x1-x0);
	var dist = Math.sqrt(Math.pow(distY, 2) + Math.pow(distX, 2));
	var diff = distY/dist;
	var arcSine = Math.asin(diff); 
	var degrees = arcSine * (180/Math.PI);

	return degrees;
}

function getGradientArray(bg) {
	var arr = bg.split(' ');
	var gradArr = []
	var arr2 = bg.split('linear-gradient');
	var arrStyles = [];

	for(var i = 0; i < arr.length; i++) {

		if(arr[i].indexOf('deg') > -1) {
			var arr3 = arr[i].split('(');
			arr3 = arr3[1].split('deg');
			gradArr.push({'deg' : arr3[0]});
		}
	}

	for(var i = 0; i < arr2.length; i++) {
		if(arr2[i].indexOf('deg') > -1) {
			var gradientStyles = arr2[i].split('deg, ');
			arrStyles.push(gradientStyles[1]);
		}
	}

	for(var i = 0; i < gradArr.length; i++) {
		gradArr[i].styles = arrStyles[i];
	}

	return gradArr;
}

function setNodeList(e) {
	nodeList = e.target.childNodes;
}
function clearNodeList(e) {
	nodeList = [];
}

function moveCircles(e) {
	var x = e.pageX - container2.offsetLeft;
	var y = e.pageY - container2.offsetTop;

	for(var i = 0; i < nodeList.length; i++) {

		if(nodeList[i].className != undefined 
			&& nodeList[i].className.indexOf('circle') > -1) {
			var nodeW = nodeList[i].scrollWidth;
			var percW = nodeW / w * 100;
			var perX = x / w * 100;
			var perY = y / w * 100;

			if(perX < (100 - percW)) {
				nodeList[i].style.left = perX + '%';
			} else {
				nodeList[i].style.left = (100 - percW) + '%';
			}

			if(perY < (100 - percW)) {
				nodeList[i].style.top = perY + '%';
			} else {
				nodeList[i].style.top = (100 - percW) + '%';
			}
		}
	}
}

function getImages(e) {
	console.log('hi');

	var that = imageContainer;
	var arr = ['tissue1.png', 'tissue2.png', 'tissue3.png', 'tissue4.png']
	var idx = 4;

	for(var i = 0; i < 4; i++) {
		console.log(arr);
		console.log(idx);

		var random = getRandomInt(0,idx);

		var img = document.createElement('img');
		var url = '../img/' + arr[random];


		var deg = getRandomInt(0,180);
		var margin = getRandomInt(0,50);

		img.setAttribute('src', url);
		img.setAttribute('style', 'margin-left:' + margin + '%; transform : rotate(' + deg + 'deg) scale(0.9);');
		img.setAttribute('class', 'test');
		that.appendChild(img);


		arr.splice(random, 1);
		idx = idx - 1;

	}
		setTimeout(ok, 500)

}

function ok() {
	var arr = document.getElementsByClassName('test');

	for(var i = 0; i < arr.length; i++) {
		if (arr[i].className.indexOf('test2') == -1) {
			arr[i].className = 'test test2'

			setTimeout(ok, 900)

			break;
		}
	}
}


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


