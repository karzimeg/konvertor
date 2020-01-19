var tabs = $(".tabs");
var items = $(".tabs").find("a").length;
var selector = $(".tabs").find(".selector");
var activeItem = tabs.find(".active");
var activeWidth = activeItem.innerWidth();
$(".selector").css({
  left: activeItem.position.left + "px",
  width: activeWidth + "px"
});

$(".tabs").on("click", "a", function() {
  $(".tabs a").removeClass("active");
  $(this).addClass("active");
  var activeWidth = $(this).innerWidth();
  var itemPos = $(this).position();
  $(".selector").css({
    left: itemPos.left + "px",
    width: activeWidth + "px"
  });
});

var getaudio = $("#player")[0];
/* Get the audio from the player (using the player's ID), the [0] is necessary */
var mouseovertimer;
/* Global variable for a timer. When the mouse is hovered over the speaker it will start playing after hovering for 1 second, if less than 1 second it won't play (incase you accidentally hover over the speaker) */
var audiostatus = "off";
/* Global variable for the audio's status (off or on). It's a bit crude but it works for determining the status. */

$(document).on("mouseenter", ".speaker", function() {
  /* Bonus feature, if the mouse hovers over the speaker image for more than 1 second the audio will start playing */
  if (!mouseovertimer) {
    mouseovertimer = window.setTimeout(function() {
      mouseovertimer = null;
      if (!$(".speaker").hasClass("speakerplay")) {
        getaudio.load();
        /* Loads the audio */
        getaudio.play();
        /* Play the audio (starting at the beginning of the track) */
        $(".speaker").addClass("speakerplay");
        return false;
      }
    }, 1000);
  }
});

$(document).on("mouseleave", ".speaker", function() {
  /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
  if (mouseovertimer) {
    window.clearTimeout(mouseovertimer);
    mouseovertimer = null;
  }
});

$(document).on("click touchend", ".speaker", function() {
  /* Touchend is necessary for mobile devices, click alone won't work */
  if (!$(".speaker").hasClass("speakerplay")) {
    if (audiostatus == "off") {
      $(".speaker").addClass("speakerplay");
      getaudio.load();
      getaudio.play();
      window.clearTimeout(mouseovertimer);
      audiostatus = "on";
      return false;
    } else if (audiostatus == "on") {
      $(".speaker").addClass("speakerplay");
      getaudio.play();
    }
  } else if ($(".speaker").hasClass("speakerplay")) {
    getaudio.pause();
    $(".speaker").removeClass("speakerplay");
    window.clearTimeout(mouseovertimer);
    audiostatus = "on";
  }
});
