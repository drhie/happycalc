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
  $('input#importance').attr('readonly', true);

  $('.area-example, #add').hover(function() {
    $(this).css('border', '1px solid yellow').css('font-weight', '900');
  }, function() {
    $(this).css('border', '1px solid gray').css('font-weight', '500');
  });

  $('.area-example').on('click', function() {
    var field = ($(this).html());
    $('.name-field input[type="text"]').val(field);
  })

  $('.num-button, .sub-button, .clear-button, .calculate').hover(function() {
    $(this).css('border', '1px solid yellow');
    $(this).css('font-weight', '900');
  }, function() {
    $(this).css('border', '1px solid gray');
    $(this).css('font-weight', '500');
  });

  $('.num-button').on('click', function(){
    var re = /\d/;
    var number = re.exec($(this).html())
    var start = Number.isInteger(parseInt($('input#importance').val())) ? parseInt($('input#importance').val()) : 0
    if ((start === 1) && (parseInt(number) === 0)) {
      $('input#importance').val("10");
    } else {
      if (parseInt(number) !== 0) { $('input#importance').val(number); }
    }
  });

  $('.clear-button').on('click', function() {
    $('input#importance').val("");
  });

  var slider = $('input#satisfaction');
  slider.on("input", function() {
    $('.output').html("I'm <strong>" + Math.floor((this.value/20)*100) + '%</strong> happy about it.');
  })

  $('#add').on('click', function() {
    var name = $('input#area').val();
    var importance = $('input#importance').val();
    var satisfaction = $('input#satisfaction').val();
    if ((name !== "") && (importance !== "") && ($('.output').html() !== "Move the slider!")) {
      $.ajax({
        dataType: 'json',
        url: 'http://localhost:3000/areas',
        method: 'POST',
        data: {
          "area": {
            "name": name,
            "importance": parseInt(importance),
            "satisfaction": parseInt(satisfaction)
          },
        }
      }).done(function(data) {
        if ($('input#area').val() !== "") {
          if($('.screen').html() === "...") {
            $('.screen').html("(" + $('input#area').val().toLowerCase() + ")");
            reset();
          } else {
            $('.screen').append('<br>');
            $('.screen').append(" + (" + $('input#area').val().toLowerCase() + ")");
            reset();
          }
        }
      });
    } else {
      $('.error').fadeIn();
    }
  });

  $('.error button').on('click', function() {
    $('.error').fadeOut();
  })

  var reset = function() {
    $('input#area').val("");
    $('.number-field').html("From 1 to 10").css('color', 'darkgray');
    $('.output').html("Move the slider!");
  }
});
