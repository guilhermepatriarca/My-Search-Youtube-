// Searchbar Handler
$(function () {
  var searchField = $('#query');
  var icon = $('#search-btn');

  // Focus Event Handler
  $(searchField).on('focus', function () {
    $(this).animate({
      width: '100%'
    }, 400);
    $(icon).animate({
      right: '10px'
    }, 400);
  });

  // Blur Event Handler
  $(searchField).on('blur', function () {
    if (searchField.val() == '') {
      $(searchField).animate({
        width: '45%'
      }, 400, function () {});
      $(icon).animate({
        right: '360px'
      }, 400, function () {});
    }
  });

  $('#search-form').submit(function (e) {
    e.preventDefault();
  });
});

function search() {
  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  // Get Form Input
  var q = $('#query').val();

  // Run GET Request on API
  $.get(
    'https://www.googleapis.com/youtube/v3/search/', {
      part: 'snippet, id',
      q: q,
      type: 'video',
			maxResults: 9,
      key: 'AIzaSyCYveG45qqQ7omnuNtkYLSqiLxt'
    },
    function (data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      // Log Data
      console.log(data);

      $.each(data.items, function (i, item) {
        // Get Output
        var output = getOutput(item);

        //Display results 
        $('#results').append(output);
      });


      var buttons = getButtons(prevPageToken, nextPageToken, q);

      // Display Buttons
      $('#buttons').append(buttons)
    }
  );
}

// Next Page Function
function nextPage() {

  console.log('call next Page')

  var token = $('#next-button').data('token');
  var query = $('#next-button').data('query');

  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  // Get Form Input
  var q = $('#query').val();

  // Run GET Request on API
  $.get(
    'https://www.googleapis.com/youtube/v3/search/', {
      part: 'snippet, id',
      q: q,
      type: 'video',
      pageToken: token,
			maxResults: 9,
      key: 'AIzaSyCYveG45qqQ7omnuNtkYLSqiLxt'
    },
    function (data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      // Log Data
      console.log(data);

      $.each(data.items, function (i, item) {
        // Get Output
        var output = getOutput(item);

        //Display results 
        $('#results').append(output);
      });


      var buttons = getButtons(prevPageToken, nextPageToken, q);

      // Display Buttons
      $('#buttons').append(buttons)
    }
  );

}
// Next Page Function
function prevPage() {

  console.log('call prev Page')

  var token = $('#prev-button').data('token');
  var query = $('#prev-button').data('query');

  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  // Get Form Input
  var q = $('#query').val();

  // Run GET Request on API
  $.get(
    'https://www.googleapis.com/youtube/v3/search/', {
      part: 'snippet, id',
      q: q,
      type: 'video',
      pageToken: token,
			maxResults: 9,
      key: 'AIzaSyCYveG45qqQ7omnuNtkYLSqiLxt'
    },
    function (data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      // Log Data
      console.log(data);

      $.each(data.items, function (i, item) {
        // Get Output
        var output = getOutput(item);

        //Display results 
        $('#results').append(output);
      });


      var buttons = getButtons(prevPageToken, nextPageToken, q);

      // Display Buttons
      $('#buttons').append(buttons)
    }
  );

}

// Bluid Output 
function getOutput(item) {
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  //Build Output String 
  //   var output ='<li>'+'<div class="list-left">'+'<a data-fancybox data-type="iframe" href="http://www.youtube.com/embed/'+videoId+'"><img class="circle responsive-img" src="'+thumb+'"></a></div>'
  //   + '<div class="list-right">'+'<h3><a data-fancybox data-type="iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'
  //   +'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>'+
  //   '<p>'+description+'</p>'+'</div>'+'</li>'+'<div class="clearfix"></div>'
  //   +'';

  var output = '<div class="col-sm-12 col-md-6 col-lg-4 p-3">' +
    '<div class="card">' +
    '<img class="card-img-top"  src="' + thumb + '" alt="Card image cap">' +
    '<div class="card-block">' +
    '<h4 class="card-title">' + title + '</h4>' +
    '<p class="card-text">' + description + '</p>' +
    '<a href="#" class="btn btn-primary">Go somewhere</a>' +
    '</div>' +
    '</div>' +
    '</div>';
  return output;
}


// Build Bottons 
function getButtons(prevPageToken, nextPageToken, q) {
  if (!prevPageToken) {
    var btnOutput = '<div class="button-container">' +
      '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '" onclick="nextPage()">Next Page</button>' +
      '</div>';
  } else {
    var btnOutput = '<div class="button-container">' +
      '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
      'onclick="prevPage()">Prev Page</button>' +
      '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
      'onclick="nextPage()">Next Page</button>' + '</div>';
  }
  return btnOutput;
}

$(document).ready(function () {
  $('.fancybox').fancybox();
});
