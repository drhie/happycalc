// window.addEventListener("load", function() {
//   var slider = document.getElementById("area_importance");
//   slider.addEventListener("input", function() {
//     document.getElementById("output").innerHTML = this.value;
//   })
// })

$(document).ready( function() {
  $('.area-example').hover(function() {
    $(this).css('border', '1px solid blue');
    $(this).css('font-weight', '900');
  }, function() {
    $(this).css('border', '1px solid gray');
    $(this).css('font-weight', '500');
  });

  $('.area-example').on('click', function() {
    $('input[type="text"]').val($(this).html());
  })

  $('.num-button, .sub-button, .clear-button').hover(function() {
    $(this).css('border', '1px solid blue');
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
});
