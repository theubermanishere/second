let long = 2;
let short = 1;
let count = 2;
let flag = 0;

let display = document.getElementById("display");
let span = document.getElementById("eventHolder");
let i = document.querySelector("i");

let event = new Event('timeOut');

let timer = {
	state: "init",
	time: 10,
	count: count
}

timer.runCounter = function (time) {
	timer.time = time
	setTimeout( function() {
		updateFace(time)
		timer.time = time - 1
		if (flag == 1) {
			flag = 0;
			updateFace(0);
			return 0;
		}
		else {
			if ( timer.time > -1 ) {
				timer.runCounter(timer.time);
			}
			else {
				span.dispatchEvent(event);
			}
		}
	}, 1000)
};

span.addEventListener("timeOut", function() {
	if (timer.state == "long") {
		// State change to longDone
		timer.state = "longDone";
		console.log(timer.state)
		toggleButtonClass();
		timer.count--;
		if (timer.count == 0) {
			timer.count = count;
			console.log("Completed");
			timer.state = "init"
		}
	}
	if (timer.state == "short") {
		// State change to shortDone
		timer.state = "shortDone";
		console.log(timer.state)
		toggleButtonClass();
	}
});

function buttonPress() {
	// States:
	// init => The state at the beginning
	// long => The state when the long timer is going on
	// longDone => The state when the long timer is done
	// short => The state when short is going on
	// shortDone => The state when the short timer is done
	if (timer.state == "init") {
		timer.runCounter(long);
		timer.state = "long";
		toggleButtonClass();
		return 0
	}
	if (timer.state == "longDone") {
		timer.runCounter(short);
		timer.state = "short";
		toggleButtonClass();
		return 0
	}
	if (timer.state == "shortDone") {
		timer.runCounter(long);
		timer.state = "long";
		toggleButtonClass();
		return 0
	}
	if (timer.state == "long") {
		flag = 1;
		timer.state = "shortDone";
		toggleButtonClass();
		return 0
	}
	if (timer.state == "short") {
		flag = 1;
		timer.state = "longDone";
		toggleButtonClass();
		return 0
	}
}

function toggleButtonClass() {
	if (i.classList.contains("fa-play-circle")) {
		i.classList.remove("fa-play-circle");
		i.classList.add("fa-stop-circle");
	}
	else {
		i.classList.add("fa-play-circle");
		i.classList.remove("fa-stop-circle");
	}
}

i.addEventListener("click", buttonPress);

function updateFace(sec) {
	if (sec > 3599) {
		var a = parseInt(sec / 3600); // hours
		var b = parseInt((sec % 3600) / 60); // mins
		display.innerHTML = pad(a,2).toString() + ":" + pad(b,2).toString()
	}
	else {
		var a = parseInt(sec / 60) // mins
		var b = sec % 60; // secs
		display.innerHTML = pad(a,2).toString() + ":" + pad(b,2).toString()
	}
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
