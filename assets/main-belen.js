var st, headerSub_limit = 0;

function setWhitespace() {
  $('.js-whitespace').animate({ height: $('header').height() }, 200, "swing");
}

$(document).ready( function() {
  
  st = $(window).scrollTop();
  setWhitespace();
  if ( $('.headerSub_limit').length > 0 ) {
  	headerSub_limit = 54;
  }
  
});




/*
$(window).scroll( function() {
  if ( st > headerSub_limit ) {
    $('.js-header').addClass('is-stuck');
  } else {
    $('.js-header').removeClass('is-stuck');
  }
  st = $(this).scrollTop();
});
*/
