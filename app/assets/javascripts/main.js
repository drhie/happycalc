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
  $('body').css('cursor', 'pointer');
  $('html, body').css({ overflow: 'hidden', height: '100%' });
  $('.intro, .start').fadeIn();

  $('.start button').on('click', function() {
    $('html, body').css({ overflow: 'auto', height: 'auto' });
    $('.intro, .start').fadeOut();
    $.ajax({
      url: 'http://localhost:3000/delete_all',
      method: 'DELETE'
    });
  })

  $('input#importance').attr('readonly', true);
  $('.area-example, .num-button, .example, .clear-button, .sub-button, #add, #calculate').hover(function() {
    $(this).css('border', '1px solid yellow').css('font-weight', '900');
  }, function() {
    $(this).css('border', '1px solid gray').css('font-weight', '500');
  });

  $('.area-example, .num-button, .example, .clear-button, .sub-button, #add, #calculate')
  .mousedown(function(){
    $(this).css('box-shadow', 'inset 1px 1px 2px black');
  })
  .mouseup(function() {
    $(this).css('box-shadow', '1px 1px 2px black');
  });

  $('.area-example').on('click', function() {
    var field = ($(this).html());
    $('.name-field input[type="text"]').val(field);
  })

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
    if ((name !== "") && (importance !== "") && ($('.output').html() !== "Move the slider!") && (!$('.screen').html().includes(name.toLowerCase()))){
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

  $('#calculate').on('click', function() {
    if ($('.screen').html() !== "...") {
      $.ajax({
        url: 'http://localhost:3000/',
        method: 'GET',
        dataType: 'json',
      }).done(function(data) {
        var total_importance = 0;
        var total_satisfaction = 0
        var most_least = {}
        data.forEach(function(object) {
          total_importance += object.importance;
        });
        data.forEach(function(object) {
          var weighted_importance = object.importance / total_importance;
          var satisfaction = (object.satisfaction / 20) * 100;
          weighted_satisfaction = (satisfaction * weighted_importance);
          total_satisfaction += weighted_satisfaction
          most_least[weighted_satisfaction] = object.name;
        });
        $('#score').html(total_satisfaction.toFixed(1));
        var most = most_least[Object.keys(most_least).sort()[Object.keys(most_least).length-1]];
        var least = most_least[Object.keys(most_least).sort()[0]];
        $('#most').html(most.toUpperCase());
        $('#least').html(least.toUpperCase())
        $('.screen').append("<br>= " + total_satisfaction.toFixed(1));
        $('.results').fadeIn();
        $.ajax({
          url: 'http://localhost:3000/delete_all',
          method: 'DELETE'
        });
        reset();
      });
    } else {
      $('.calculate-error').fadeIn();
    }
  });

  $('.results button').on('click', function() {
    $('.results').fadeOut();
    $('.screen').html("...");
  })

  $('.error button').on('click', function() {
    $('.error').fadeOut();
  })

  $('.calculate-error button').on('click', function() {
    $('.calculate-error').fadeOut();
  })

  var reset = function() {
    $('input#area').val("");
    $('input#importance').val("");
    $('.output').html("Move the slider!");
  }
});
