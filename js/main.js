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
  
});