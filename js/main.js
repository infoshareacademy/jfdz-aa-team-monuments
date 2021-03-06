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
    $(".navbar a, .back a, .action-call").on('click', function(event) {
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

function initScrollBasedAnimations() {
    var $animationElement = $('.animation-element');
    var $sliderElement = $('.teaser');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animationElement, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            $element.removeClass('animation-element-active');
            
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('animation-element-active');
            }

            menuScrollAnimation();
        });
    }

    function menuScrollAnimation(){
        if($window.scrollTop() > 400) {
            $('.main-nav').addClass('scroll-animated');
            $('.navbar-logo').addClass('logo-scroll-animated');
        }

        else{
            $('.main-nav').removeClass('scroll-animated');
            $('.navbar-logo').removeClass('logo-scroll-animated');
        }
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
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

function initFormSend(){
    if (document.location.search.indexOf('mailerResult=sent') != -1) {
        alert('Wiadomość została wysłana. Dziękujemy!');
        document.location.href = './#';
    };
}

//
// $('#newsletter-submit').on('submit', function(e){
//     e.preventDefault();
//
//     $.ajax({
//         url: 'http://tools.is-academy.pl/mailer.php',
//         method: 'post',
//         data: $( this ).serialize()
//     })
//         .always(function( msg ) {
//           alert('wysłany');
//         })
// })


$(document).ready(function () {
    initMenuToggle(); 
    initMenuScroll();
    initTeaserSwitch();
    initCookiesAlert();
    initFormValidation();
    initFormSend();
    initScrollBasedAnimations();


}); // Document Last Line  