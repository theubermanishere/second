var long = 25;
var short = 5;
var count = 4;

var display = document.getElementById("display");
var button = document.getElementById("button");
let span = document.getElementById("eventHolder");

var event = new Event('timeOut');

let timer = {
	state: "init",
	time: 10
}

timer.counter = function (time) {
	console.log('the time is: ' + time.toString());
	timer.time = time;
	setTimeout(function() {
		count.innerHTML = timer.time.toString();
		console.log(timer.time);
		timer.time-=1
		if ( timer.time > -1 ) {
			timer.counter();
		}
		else {
			span.dispatchEvent(event);
		}
	}, 1000) 
};

span.addEventListener("timeOut", function() {
	if (timer.state == "long") {
		// State change to longDone
		timer.state = "longDone";
		console.log(timer.state)
	}
	if (timer.state == "short") {
		// State change to shortDone
		timer.state = "shortDone";
		console.log(timer.state)
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
		timer.counter(long);
		timer.state = "long";
	}
	if (timer.state == "longDone") {
		timer.counter(short);
		timer.state = "short";
	}
	if (timer.state == "shortDone") {
		timer.counter(long);
		timer.state = "long";
	}
}

button.addEventListener("click", buttonPress);

