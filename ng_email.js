"use strict";

var app = angular.module("email", []);

app.controller("email_ctrl", ["$scope", "$interval", "$timeout", "send", "track", "increment", "ampm", function ($scope, $interval, $timeout, send, track, increment, ampm) {
	$scope.name = "Email Me Whenever!";
	$scope.time = "01:27:00 PM";
	var edit_status = $("#send_time_boxes").attr("data");
	$interval( function () {
		$scope.today = new Date();
	}, 100);

	var set = $interval( function () {
		edit_status = $("#send_time_boxes").attr("data");
		if(edit_status === "1"){
			$interval.cancel(set);
		} else {
			track.time(edit_status);
		}
	}, 100);

	$scope.submit = function () {
		var message_html = $("#message").val();
		var email = $("#email_text_input").val();
		send.send_email( email, message_html );
	};

	$scope.edit = function () {
		edit_status = $("#send_time_boxes").attr("data", "1");
	};

	$scope.change_time = function ($event) {
		increment.change($event);
	};

	$scope.midday = function ($event) {
		ampm.change($event);
	};

}]);

app.service("send", function ($interval) {
	this.send_email = function (email, message_html) {
		var send_wait = $interval( function () {
			var current_time = $("#time").html();
			var split = current_time.split(":");
			split[0] = split[0].trim();
			var am_pm = split[2].split(" ");
			var ampm_split = am_pm[1].split("");
			var hours = split[0].split("");
			var mins = split[1].split("");
			var medday = split[2].split(" ");
			var medday_checker = medday[1].split("");
			var hour1 = $(".time[data=1]").html();
			var hour2 = $(".time[data=2]").html();
			var mins1 = $(".time[data=3]").html();
			var mins2 = $(".time[data=4]").html();
			var medday_html = $(".time[data=5]").html();
			if( hours[0] == hour1 && hours[1] == hour2 && mins[0] == mins1 && mins[1] == mins2 && medday_checker[0] == medday_html ){
				$interval.cancel(send_wait);
				emailjs.send("outlook",
							 "template_hd4gZ80X",
							 {
								"email": email,
							 	"reply_to":"ijh5005@outlook.com",
							 	"from_name":"isaiah",
							 	"to_name":"isaiah harrison",
							 	"message_html": message_html});
			}
		}, 100);				
	};
});

app.service("track", function () {
	this.time = function (edit_status) {
		var current_time = $("#time").html();
		var split = current_time.split(":");
		split[0] = split[0].trim();
		var am_pm = split[2].split(" ");
		var ampm_split = am_pm[1].split("");
		var hours = split[0].split("");
		var mins = split[1].split("");
		$("#hourFirst").html(hours[0]);
		$("#hourSecond").html(hours[1]);
		$("#minFirst").html(mins[0]);
		$("#minSecond").html(mins[1]);
		$("#am_pm").html(ampm_split[0]);
	};
});

app.service("increment", function () {
	this.change = function ($event) {
		var id = $event.target.attributes.data.textContent;
		var current = parseInt( $event.target.innerHTML );
		current++;
		var second_num_check = parseInt($(".time[data=2]").html());
		var second_num_check2 = parseInt($(".time[data=1]").html());
		if ( current == 1 && id == 1 && second_num_check > 2) {
			$(".time[data=2]").html("0");
			$(".time[data="+id+"]").html("1");
		} else if( current == 2 && id == 1 ){
			$(".time[data="+id+"]").html("0");
		} else if ( current == 6 && id == 3 ) {
			$(".time[data="+id+"]").html("0");
		} else if ( current == 10 && id == 4 ) {
			$(".time[data="+id+"]").html("0");
		} else if ( current > 2 && id == 2 && second_num_check2 == 1){
			$(".time[data="+id+"]").html("0");
		} else if ( current == 10 && id == 2 ){
			$(".time[data="+id+"]").html("0");
		} else {
			$(".time[data="+id+"]").html(current);
		}
	}
});

app.service("ampm", function () {
	this.change = function ($event) {
		var id = $event.target.attributes.data.textContent;
		var html = $event.target.innerHTML;
		if ( html == "P" ){
			$(".time[data="+id+"]").html("A");
		} else if ( html == "A" ) {
			$(".time[data="+id+"]").html("P");
		}
	}
});