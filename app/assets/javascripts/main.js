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
  $('body').css('cursor', 'pointer');

  $('.area-example, .num-button, .clear-button, .sub-button, #add, #calculate').hover(function() {
    $(this).css('border', '1px solid yellow').css('font-weight', '900');
  }, function() {
    $(this).css('border', '1px solid gray').css('font-weight', '500');
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
        $('#score').html(total_satisfaction.toFixed(0));
        var most = most_least[Object.keys(most_least).sort()[Object.keys(most_least).length-1]];
        var least = most_least[Object.keys(most_least).sort()[0]];
        $('#most').html(most);
        $('#least').html(least);
        $('.results').fadeIn();
        $.ajax({
          url: 'http://localhost:3000/delete_all',
          method: 'DELETE'
        }).done(function(data) {
          console.log(data);
          console.log("Deleted!");
        });
      });
    }
  });

  $('.results button').on('click', function() {
    $('.results').fadeOut();
  })

  $('.error button').on('click', function() {
    $('.error').fadeOut();
  })

  var reset = function() {
    $('input#area').val("");
    $('input#importance').val("");
    $('.output').html("Move the slider!");
  }
});
