// “Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”

function initMenuToggle() {
    $(".navbar-toggle").click(function () {
        $("#mainNavbar").toggle();
    });

    $(".nav li").click(function () {
        $(".nav").children().removeClass("active");
        $(this).toggleClass("active")
    });
}

function initMenuScroll(){
    $('body').scrollspy({target: ".navbar", offset: 50});
    $(".navbar a, .back a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
}

function initTeaserSwitch() {
    var bgi = ["2.jpg", "3.jpg", "4.jpg","1.jpg"]; // images list

    setInterval(function(){
        var bgiNext = bgi.shift();
        bgi.push(bgiNext);
        $(".teaser-image").css({"opacity":"0",'background-image':'url("images/main_image/' + bgiNext + '")'}).animate({opacity: "1"});
    }, 5000);
}

function initCookiesAlert() {
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
}

function initFormValidation() {
    $(".antibot").click(function () {
        $(".locked").prop("disabled", !$(this).is(":checked"));
    });
}

$(document).ready(function () {
    initMenuToggle(); 
    initMenuScroll();
    initTeaserSwitch();
    initCookiesAlert();
    initFormValidation()

}); // Document Last Line  