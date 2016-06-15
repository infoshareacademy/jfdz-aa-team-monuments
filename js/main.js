// JavaScript Document
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

  // Jumbotron background change
  var bgi = ["1.jpg", "2.jpg", "3.jpg"];
  var bgiRandom = bgi[Math.floor(Math.random()*bgi.length)];

  $(".jumbotron").fadeIn("slow").css('background', 'url("images/main_image/'+ bgiRandom +'")no-repeat center');

});