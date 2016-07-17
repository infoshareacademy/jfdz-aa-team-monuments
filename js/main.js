// “Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”

$(document).ready(function () {
    
    // Navigation Toggle starts here
    $(".navbar-toggle").click(function () {
        $("#mainNavbar").toggle();
    });

    $(".nav li").click(function () {
        $(".nav").children().removeClass("active");
        $(this).toggleClass("active")
    });
    // Navigation Toggle ends here

    // Main Teaser Image Switch/Animation starts here
    var bgi = ["2.jpg", "3.jpg", "4.jpg","1.jpg"]; // images list

    setInterval(function(){
    var bgiNext = bgi.shift();
        bgi.push(bgiNext);
        $(".teaser-image").css("opacity", "0").css('background-image', 'url("images/main_image/' + bgiNext + '")').animate({opacity: "1"});
     }, 7000);
    // Main Teaser Image Switch/Animation ends here

    // MainMenu page scrolling starts here
    $('body').scrollspy({target: ".navbar"});
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top,
                }, 1000);
                return false;
            }
        }
    });
    // MainMenu page scrolling ends here

    // Cookies alert control starts here
    var cookieList = document.cookie.split(";");
    for (var i = 0; i < cookieList.length; i++) {
        var cookieElement = cookieList[i];
        if (cookieElement == "cookies-note=confirmed") {
            $("#cookies-alert").hide();
        }
    }

    $("#cookies-confirm").on("click", function () {
        document.cookie = "cookies-note=confirmed";
        $("#cookies-alert").hide();
    });
    // Cookies alert control ends here

    //Contact form fields disable //
    $(".antibot").click(function () {
        $(".locked").prop("disabled", !$(this).is(":checked"));
    })
    
}); // Document Last Line  