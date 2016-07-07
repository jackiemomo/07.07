function singleVibration() {
	navigator.vibrate(2000)
}

function multiVibration() {
	navigator.vibrate([ 200, 500, 200, 500, 200, 200, 200, 200, 200, 500, 200,
			100, 200, 100, 200, 100, 200, 500, 200, 100, 200, 500 ])
}

function stopVibration() {
	navigator.vibrate(0)
}

var BTadapter = null;
var CHECK_INTERVAL = 200;
function sliderBT() {
	if (BTadapter.powered) {
		$("#BTslide").val("on");
	} else {
		$("#BTslide").val("off");
	}
	$("#BTslider").slider('refresh');
}
(function checkBT() {
	try {
		if (tizen.bluetooth == undefined) {
			console.log("Bluetooth not found");
		} else {
			BTadapter = tizen.bluetooth.getDefaultAdapter();
			window.setInterval(sliderBT, CHECK_INTERVAL);
		}
	} catch (a) {
	}
}());

function BTpowerOn() {
	BTadapter.setPowered(true, null, null);
}

function BTpowerOff() {
	BTadapter.setPowered(false, null, null);
}

function switchBT() {
	if ($('#BTslider').val() == "on") {
		BTpowerOn();
	} else {
		BTpowerOff();
	}
}