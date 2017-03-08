/**
 * Created by Jevgeni on 19.02.2017.
 */

$(document).ready(function(){
    $.ajax({
      type: 'POST',
      url: "/list",
      async: false,
      data: {
          username:"" + sessionStorage.user},
      success: function(data){
          console.log(data);
          if (data != "None") {
              for (var i = 0; i < data.length; i++) {
                  $('.list').append('<div class="item">' + data[i][2] + '</div>');
              }
          }
      }
    });
    //Hide clear btn on page load
    $('#update').hide();
    //Add text input to list on button press
    $('#add').click(function(){
        //var toAdd gets the value of the input field
        var toAdd = $("input[name=checkListItem]").val();
        //Append list item in its own div with a class of item into the list div
        //It also changes the cursor on hover of the appended item
        $('.list').append('<div class="item new">' + toAdd + '</div>');
        //fade in clear button when the add button is clicked
        $('#update').fadeIn('fast');
        //Clear input field when add button is pressed
        $('input').val('');
    });
    //Checks off items as they are pressed
    $(document).on('click', '.item', function() {
        //fade in clear button when the add button is clicked
        $('#update').fadeIn('fast');
        //Chamge list item to red
        $(this).css("color", "#cc0000");
        //Change cursor for checked item
        $(this).css("cursor","default");
        //Strike through clicked item while giving it a class of done so it will be affected by the clear
        $(this).wrapInner('<strike class="done"></strike>');
        $(this).addClass('done');
        //Add the X glyphicon
        $(this).append(" " + '<span class="glyphicon glyphicon-remove done" aria-hidden="true"></span>');
        //Stops checked off items from being clicked again
        $(this).prop('disabled', true);
    });
    //Removes list items with the class done
    $('#update').click(function(){
        //$('.done').remove('.done');
        $('.done').each(function() {
            console.log(": " + $( this ).text());
            $.ajax({
              type: 'POST',
              url: "/remove",
              async: false,
              data: {
                  username:"" + sessionStorage.user,
                  todo:"" + $( this ).text()},
              success: function(data){
                  console.log(data);
                  //$(this).remove('.done');
              }
            });
        });

        $('.new').each(function() {
            console.log(": " + $( this ).text());
            $.ajax({
              type: 'POST',
              url: "/add",
              async: false,
              data: {
                  username:"" + sessionStorage.user,
                  todo:"" + $( this ).text()},
              success: function(data){
                  console.log(data);
                  //$(this).removeAttr('class', 'new');
              }
            });
        });
        location.reload();
    });
});