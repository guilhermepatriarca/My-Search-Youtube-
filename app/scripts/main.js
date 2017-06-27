// Searchbar Handler
$(function(){
	var searchField = $('#query');
	var icon = $('#search-btn');
	
	// Focus Event Handler
	$(searchField).on('focus', function(){
		$(this).animate({
			width:'100%'
		},400);
		$(icon).animate({
			right: '10px'
		}, 400);
	});
	
	// Blur Event Handler
	$(searchField).on('blur', function(){
		if(searchField.val() == ''){
			$(searchField).animate({
				width:'45%'
			},400, function(){});
			$(icon).animate({
				right:'360px'
			},400, function(){});
		}
	});
	
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
});

function search(){
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');
	
	// Get Form Input
	var q = $('#query').val();
	
	// Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			type:'video',
			key: 'AIzaSyCYveG45qqQ7omnuNtkYLSqiLxt'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				
				// Log Data
				console.log(data);
        
        $.each(data.items,function(i, item){
          // Get Output
          var output = getOutput(item);

          //Display results 
          $('#results').append(output);
        });


        var buttons = getButtons(prevPageToken,nextPageToken,q);

        // Display Buttons
        $('#buttons').append(buttons)
      }
	);
}

// Bluid Output 
function getOutput(item){
  var videoId= item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  //Build Output String 
  var output ='<li>'+'<div class="list-left">'+'<img src="'+thumb+'">'+'</div>'
  + '<div class="list-right">'+'<h3>'+title+'</h3>'
  +'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>'+
  '<p>'+description+'</p>'+'</div>'+'</li>'+'<div class="clearfix"></div>'
  +'';
  return output;
}


// Build Bottons 
function getButtons(prevPageToken,nextPageToken,q){
if(!prevPageToken){
  var btnOutput ='<div class="button-container">'+
  '<button id="next-button" class="paging-button data-token="'+nextPageToken+'" data-query="'+q+'"'+
  'onlclick="nextPage();">Next Page</button>'+
  '</div>';
}
else{
  var btnOutput ='<div class="button-container">'+
  '<button id="next-button" class="paging-button data-token="'+prevPageToken+'" data-query="'+q+'"'+
  'onlclick="prevPage();">Prev Page</button>'+
  '<button id="next-button" class="paging-button data-token="'+nextPageToken+'" data-query="'+q+'"'+
  'onlclick="nextPage();">Next Page</button>'+'</div>';
}
return btnOutput;
}