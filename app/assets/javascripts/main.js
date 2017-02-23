// window.addEventListener("load", function() {
//   var slider = document.getElementById("area_importance");
//   slider.addEventListener("input", function() {
//     document.getElementById("output").innerHTML = this.value;
//   })
// })

$(document).ready( function() {
  $('input#satisfaction').attr('orient', 'vertical');
  var name;
  var importance;
  var satisfaction;
  var currentSession;
  $('body').css('cursor', 'pointer');
  $('html, body').css({ overflow: 'hidden', height: '100%' });
  $('.intro, .start').fadeIn();

  $('.start button').on('click', function() {
    currentSession = parseFloat(Math.random().toFixed(10));
    // console.log(currentSession);
    $('html, body').css({ overflow: 'auto', height: 'auto' });
    $('.intro, .start').fadeOut();
    // $.ajax({
    //   url: '/delete_all',
    //   method: 'DELETE'
    // });
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
    $('.output').html("<strong>" + Math.floor((this.value/20)*100) + '%</strong> satisfied!');
  })

  $('#add').on('click', function() {
    var name = $('input#area').val();
    var importance = $('input#importance').val();
    var satisfaction = $('input#satisfaction').val();
    if ((name !== "") && (importance !== "") && ($('.output').html() !== "Move the slider!") && (!$('.screen').html().includes(name.toLowerCase()))){
      $.ajax({
        dataType: 'json',
        url: '/areas',
        method: 'POST',
        data: {
          "area": {
            "name": name,
            "importance": parseInt(importance),
            "satisfaction": parseInt(satisfaction),
            "session_id": currentSession,
          },
        }
      }).done(function(data) {
        // console.log(data);
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
        url: '/',
        dataType: 'json',
        method: 'GET',
      }).done(function(data) {
        var totalImportance = 0;
        var totalSatisfaction = 0
        var mostLeast = {}
        data.forEach(function(object) {
          // console.log(object.session_id, currentSession);
          if (object.session_id === currentSession) {
            totalImportance += object.importance;
          }
        });
        data.forEach(function(object) {
          if (object.session_id === currentSession) {
            var weightedImportance = object.importance / totalImportance;
            var satisfaction = (object.satisfaction / 20) * 100;
            weightedSatisfaction = (satisfaction * weightedImportance);
            totalSatisfaction += weightedSatisfaction
            mostLeast[weightedSatisfaction] = object.name;
            // console.log(object.name, weightedSatisfaction)
          }
        });
        $('#score').html(totalSatisfaction.toFixed(1));
        var highest_number = Math.max.apply(Math, (Object.keys(mostLeast)))
        var lowest_number = Math.min.apply(Math, (Object.keys(mostLeast)))
        var most = mostLeast[highest_number];
        var least = mostLeast[lowest_number];
        $('#most').html(most.toUpperCase());
        $('#least').html(least.toUpperCase())
        $('.screen').append("<br>= " + totalSatisfaction.toFixed(1));
        $('.results').fadeIn();
        generateFeedback(totalSatisfaction);
        $.ajax({
          url: '/delete',
          method: 'DELETE',
          data: {
            "session_id": currentSession
          }
        });
        reset();
        currentSession = parseFloat(Math.random().toFixed(10));
        // console.log(currentSession);
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

  var generateFeedback = function(totalSatisfaction) {
    if (totalSatisfaction >= 85) {
      $('#feedback').html("Wow! Life is going great for you! Keep it up!");
    } else if (totalSatisfaction < 85 && totalSatisfaction >= 73) {
      $('#feedback').html("Life is good! Continue to cultivate good perspective and good habits!");
    } else if (totalSatisfaction < 73 && totalSatisfaction >= 62) {
      $('#feedback').html("You're generally satisfied with life, but there's stuff you want changed.");
    } else if (totalSatisfaction < 62 && totalSatisfaction >= 50) {
      $('#feedback').html("You're pretty unhappy with life. We hope you seek out help beyond HappyCalc.");
    } else {
      $('#feedback').html("We're sorry to see you so unhappy. Please seek out support in your community.");
    }
  }

  var reset = function() {
    $('input#area').val("");
    $('input#importance').val("");
    $('.output').html("Move the slider!");
  }
});
