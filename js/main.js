// “Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”

$(document).ready(function() {
	
	// Navigation Toggle starts here 
  $(".navbar-toggle").click(function() {
    $("#mainNavbar").toggle();
  });

  $(".nav li").click(function() {
    $(".nav").children().removeClass("active");
    $(this).toggleClass("active")
  });
  // Navigation Toggle ends here

  // Main Teaser Image Random Switch/Animation starts here
  var bgi = ["1.jpg", "2.jpg", "3.jpg","4.jpg"]; // images list
  var bgiRandom = bgi[Math.floor(Math.random()*bgi.length)]; // random image select

  $(".teaser-image").css('background-image', 'url("images/main_image/' + bgiRandom + '")').animate({"opacity": "1"}, 150 );
  // Main Teaser Image Random Switch/Animation ends here

  // MainMenu page scrolling starts here
  // $('a[href*="#"]:not([href="#"])').click(function() {
  //   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  //     var target = $(this.hash);
  //     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
  //     if (target.length) {
  //       $('html, body').animate({
  //         scrollTop: target.offset().top
  //       }, 1000);
  //       return false;
  //     }
  //   }
  // });
  // MainMenu page scrolling ends here

  // Cookies alert control starts here
  var cookieList =  document.cookie.split(";");
  for(var i = 0; i <cookieList.length; i++) {
    var cookieElement = cookieList[i];
    if (cookieElement == "cookies-note=xx") {//trzeba zmienić wartość ciasteczka na confirmed
        $("#cookies-alert").hide();
        return;
    }
  }

  $("#cookies-confirm").on("click",function(){
    document.cookie = "cookies-note=confirmed";
    $("#cookies-alert").hide();
    });
  // Cookies alert control ends here
    
});

