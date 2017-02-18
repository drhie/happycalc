// window.addEventListener("load", function() {
//   var slider = document.getElementById("area_importance");
//   slider.addEventListener("input", function() {
//     document.getElementById("output").innerHTML = this.value;
//   })
// })

$(document).ready( function() {
  var name;
  var importance;
  var satisfaction;

  $('.area-example, #add').hover(function() {
    $(this).css('border', '1px solid yellow').css('font-weight', '900');
  }, function() {
    $(this).css('border', '1px solid gray').css('font-weight', '500');
  });

  $('.area-example').on('click', function() {
    var field = ($(this).html());
    $('input[type="text"]').val(field);
  })

  $('.num-button, .sub-button, .clear-button').hover(function() {
    $(this).css('border', '1px solid yellow');
    $(this).css('font-weight', '900');
  }, function() {
    $(this).css('border', '1px solid gray');
    $(this).css('font-weight', '500');
  });

  $('.num-button').on('click', function(){
    var re = /\d/;
    var number = re.exec($(this).html())
    if (parseInt($('.number-field').html() + number) <= 10 && ($('.number-field').html().length <= 1)) {
      $('.number-field').append(number);
      $('.number-field').css('color', 'black');
    } else {
      $('.number-field').html(number);
      $('.number-field').css('color', 'black');
    }
  });

  $('.clear-button').on('click', function() {
    $('.number-field').html("");
  });

  var slider = $('input#satisfaction');
  slider.on("input", function() {
    $('.output').html("I'm " + Math.floor((this.value/20)*100) + '% happy about it.');
  })

  $('#here').on('click', function() {
    if ($('input#area').val() !== "") {
      if($('.screen').html() === "...") {
        // $.ajax({
        //   url: 'http://localhost:3000/areas',
        //   method: 'POST',
        //   data: {
        //     name: $('input#area').val(),
        //     importance: parseInt($('.number-field').html()),
        //     satisfaction: parseInt($('input#satisfaction').val()),
        //   }
        // }).done(function(data) {
        //   console.log(data)
        // });
        $('.screen').html("(" + $('input#area').val().toLowerCase() + ")");
        reset();
      } else {
        $('.screen').append('<br>');
        $('.screen').append("+ (" + $('input#area').val().toLowerCase() + ")");
        reset();
      }
    }
  });

  var reset = function() {
    $('input#area').val("");
    $('.number-field').html("From 1 to 10").css('color', 'darkgray');
    $('.output').html("Move the slider!");
  }
});
