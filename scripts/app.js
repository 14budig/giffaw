$(document).on("ready", function(){
    var offset = 0;
    var last = "";
    $.ajax({
      method:"GET",
      url:"http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC",
      dataType: 'json',
      success:populate,
      error: errorMSG
    });
    function populate(json){
      $('.gif-gallery').empty();
      for(var i = 0; i < json.data.length; i++){
        $('.gif-gallery').append('<a href="' + json.data[i].images.original.url
        + '"> <img src="' + json.data[i].images.fixed_height_small.url + '" /> </a>')
      }
    }

    function errorMSG(xhr, status, error){
      console.log("Error: " + error);
    }

    $('form').on('submit', function(event){
      event.preventDefault();
      last = $('#q').val();
      offset = 0;
      $.ajax({
        method:'GET',
        url: 'http://api.giphy.com/v1/gifs/search?' + $(this).serialize(),
        datatype: 'json',
        success:populate,
        error: errorMSG
      });
    });

    $('#More').on('click', function(event){
      event.preventDefault();
      offset += 25;
      var str;
      if(last){
        str = 'http://api.giphy.com/v1/gifs/search?q='+last+'&api_key=dc6zaTOxFJmzC&offset=' + offset;
      }
      else{
        str = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&offset=' + offset;
      }


      $.ajax({metod:"GET",
        url: str,
        datatype:'json',
        success:popNoDepop,
        error:errorMSG
      });
      function popNoDepop(json){
        for(var i = 0; i < json.data.length; i++){
          $('.gif-gallery').append('<a href="' + json.data[i].images.original.url
          + '"> <img src="' + json.data[i].images.fixed_height_small.url + '" /> </a>')
        }
      }


    });

});
