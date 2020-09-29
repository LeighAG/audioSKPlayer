var audio;

//Hide Pause button
$("#pause").hide();
//initialize
initAudio($("#playlist li:first-child"));

//initialize function
function initAudio(element){
  var song = element.attr("song");
  var title = element.text();
  var cover= element.attr("cover");
  var artist = element.attr("artist");

  //create audio object

  audio = new Audio("music/" + song);
  //if song hasn't started yet/ no time
  if(!audio.currentTime){
    $("#duration").html(".0.00");
  }

  $("#audio-player .title").text(title);
  $("#audio-player .artist").text(artist);

  //insert cover
console.log(cover);
  $("img.cover").attr("src", cover);

  //remove active class from last song

  $("#playlist li").removeClass("active");
  element.addClass("active");

}

//Play button
$("#play").click(function(){
  audio.play();
  $("#play").hide();
  $("#pause").show();
  $("#duration").fadeIn(400);
  showDuration();
});

//Pause buttons
$("#pause").click(function(){
  audio.pause();
  $("#pause").hide();
  $("#play").show();

});

//stop button
$("#stop").click(function(){
  audio.pause();
audio.currentTime = 0;
  $("#pause").hide();
    $("#play").show();
  $("#duration").fadeOut(400);
  showDuration();
});

//next button

$("#next").click(function(){
  audio.pause();
var next = $("#playlist li.active").next();
if(next.length == 0){
  next = $("#playlist li:first-child");
}
initAudio(next);
  audio.play();
  showDuration();
  $("#play").hide();
  $("#pause").show();

});

//previous
$("#prev").click(function(){
  audio.pause();
var prev = $("#playlist li.active").prev();
if(prev.length == 0){
  prev = $("#playlist li:last-child");
}
initAudio(prev);
  audio.play();
  showDuration();
    $("#play").hide();
  $("#pause").show();


});
//volume control

$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});

//click function
$("li").click(function(event){
  audio.pause();
var events = event.target;
  var songs= event.target.attributes.song.value;
  var artis= event.target.attributes.artist.value;
  audio = new Audio("music/"+ songs);
  audio.play();
  $("#play").hide();
  $("#pause").show();
  $("#duration").fadeIn(400);
  showDuration();
  $("#playlist li").removeClass("active");
  $(events).addClass("active");
  $("#audio-player .title").text(songs);
  $("#audio-player .artist").text(artis);

})

//Time showDuration
/*function showDuration(){
  $(audio).bind("timeupdate", function(){
    //get hours and minutes

    var s = parseInt(audio.currentTime % 60);
    var m = parseInt((audio.currentTime/60) % 60);
  //add 0 if less than 10
if(s < 10){
  s="0"+ s;
}

$("$duration").html(m + "." + s);
var value = 0;
if(audio.currentTime>0){
  value = Math.floor((100/audio.duration) * audio.currentTime);
}
$("#progress").css("width", value+ "%");
});
}*/

//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + '.' + s);
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');
	});
}
