var url = 'https://wind-bow.glitch.me/twitch-api/';
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function offlineStreamers(user) {
  $.ajax(
    {
      type: 'GET',
      url: url + '/channels/' + user,
      dataType: "json",

      success: function (data) {
        $('.container-results').append('<div id="' + user + '" class="streamer offline"><div class="name"><a href="' + data.url + '" target="_blank"><img src="' + data.logo + '" alt="logo"><p>' + data.display_name + '</p></a></div><i class="icon"></i><div class="description"><p>Offline</p></div></div>');
      }
    }
  )
}

function displayStreamers(user) {
  $.ajax(
      {
      type: 'GET',
      url: url + '/streams/' + user,
      dataType: "json",

      success: function (data) {
        if (!$.isEmptyObject(data.stream)) {
          var obj = data.stream.channel;
          $('.container-results').append('<div id="' + user + '" class="streamer online"><div class="name"><a href="' + obj.url + '" target="_blank"><img src="' + obj.logo + '" alt="logo"/><p>' + obj.display_name + '</p></a></div><i class="icon fa fa-rss"></i><div class="description"><a href="' + obj.url + '" target="_blank"><p>' + obj.game + ': ' + obj.status + '</p><div><img src="' + data.stream.preview.medium + '" alt="preview"/></div></a></div></div>');
        } else {
          offlineStreamers(user);
        }
      }
    }
  )
}

function iterate() {
  for (var i = 0; i < streamers.length; i++) {
    displayStreamers(streamers[i]);
  }
}

function highlight(event) {
  if (!$(event).hasClass('active')) {
      $(event).addClass('active');
      $(event).parents().siblings().children().removeClass('active');
  }
}

function filtering(event) {
  var target = $(event.target);
  var obj = $('.container-results').children();
  if (target.is("#nav-all")) {
    obj.show();
  } else if (target.is("#nav-online")) {
    obj.filter('.offline').hide();
    obj.filter('.online').show();
  } else if (target.is("#nav-offline")) {
    obj.filter('.online').hide();
    obj.filter('.offline').show();
  }
}

$(document).ready(function() {

  // Display streamers list
  iterate();

  // Filter and highlight
  $('li a').on('click', function(event) {
    filtering(event);
    highlight(this);
  });

});
