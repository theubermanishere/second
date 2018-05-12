var time = 10
var div = document.getElementById("watch");
var count = document.getElementById("count");
var submit = document.getElementById("submit");

submit.addEventListener("click", function() {
	time = count.value;
	timer();
});

function timer() {
	setTimeout(function() {
		div.innerHTML = time.toString();
		console.log(time);
		time-= 1
		if ( time > -1 ) {
			timer();
		}
	}, 1000) 
};
