// Search bar 
$(function () {
  var searchField = $('#query');
  var icon = $('#search-btn');

  //Focus Hander
  $(searchField).on('focus', function () {
    $(this).animate({
      width: '100%'
    }, 400);
    $(icon).animate({
      right: '10px'
    }, 400);
  });

  //Blur Handler 
  $(searchField).on('blur', function () {
   if(searchField.val() == '' ){
    $(searchField).animate({
        width:'45%'
    },400, function(){})};
    $(icon).animate({
        right:'360px'
    },400, function(){});
  });

  $('#search-form').submit(function(e){
    e.preventDefualt();
  });
});

function search(){
    //Clear Result
    $('#results').html('');
    $('#buttons').html('');

    //Get Form Input
    q =$('#query').val()

    // run get Resquest on API
    $.get(
    'https://www.googleapis.com/youtube/v3/search',{
        part:'snippet, id',
        q:q,
        type:'video',
        key:'4444'},
        function(data){
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            // Log Data
            console.log(data);

            // $each(data.items){

            // }
        }
    );
};
