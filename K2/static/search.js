/**
 * Created by Jeff on 08/03/2017.
 */
function getCity() {
    var input = $('#country').val();
    console.log(input);
    $.ajax({
      type: 'GET',
      url: "/search",
      async: false,
      data: {
          country: input},
      success: function(data){
          console.log(data);
          var option = "";
          $.each(data, function( index, value ) {
            option += "<option>" + value + "</option>";
          });
          $('.select').html(option);
      }
    });
}


$(document).ready(function(){
    $('legend').click(function(){
        $(".pics").fadeToggle("slow");
    });

    $('.pic').hover(
        function(){$(this).animate({width: "400px", height:"300px"}, 1000);},
        function(){$(this).animate({width: "304px", height:"228px"}, 1000);}
    );
});