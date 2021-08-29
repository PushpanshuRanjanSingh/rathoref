var header = document.getElementById("myHeader");  
var sticky = header.offsetTop;
$(document).ready(function () {
    window.onscroll = function () { myFunction() };
});

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}


$(document).ready(function () {
    $('#myHeader a').bind('click', function (e) {
        e.preventDefault(); // prevent hard jump, the default behavior

        $headerHeightSticky = $('#myHeader').outerHeight();
        // perform animated scrolling by getting top-position of target-element and set it as scroll target

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - $headerHeightSticky
        }, 500, 'linear');



        return false;
    });

    $(".next-button").click(function () {
        $("#myHeader a.active").next().trigger('click');
    });
    $(".prev-button").click(function () {
        $("#myHeader a.active").prev().trigger('click');
    });
});
$(window).scroll(function () {
    $headerHeightSticky = $('#myHeader').outerHeight();
    var scrollDistance = $(window).scrollTop() + ($headerHeightSticky + 50);

    // Assign active class to nav links while scolling
    $('.page-section').each(function (i) {
        if ($(this).position().top <= scrollDistance) {
            $('#myHeader a.active').removeClass('active');
            $('#myHeader a').eq(i).addClass('active');
        }
    });
}).scroll();


$(document).ready(function () {

    $('.navbar-toggler').click(function () {
        $('#navbarNav').toggleClass('menu-show');
        $(this).toggleClass('collapsed');
        $('body').toggleClass('menu-open');
    });


    //HamBurger
    var forEach = function (t, o, r) {
        if ("[object Object]" === Object.prototype.toString.call(t))
            for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
        else
            for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
    };
    var hamburgers = document.querySelectorAll(".hamburger");
    if (hamburgers.length > 0) {
        forEach(hamburgers, function (hamburger) {
            hamburger.addEventListener("click", function () {
                this.classList.toggle("is-active");
            }, false);
        });
    }



    //WOW
    // new WOW().init();

    //padding-top
    $('.inner-page').css('padding-top', $('#main-header').height() + 'px');

    $('.owl-carousel-blogs').owlCarousel({
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoWidth: false,
        loop: false,
        margin: 0,
        nav: false,
        dots: false,
        pag: true,
        responsive: {
            320: {
                items: 1
            },
            600: {
                items: 2
            },
            800: {
                items: 2
            },
            1024: {
                items: 2
            },
            1366: {
                items: 3
            },
            1440: {
                items: 3
            }
        }
    });

});









$(window).scroll(function () {
    //padding-top
    $('.page-wrapper').css('padding-top', $('.banner-sec').height() + 'px');


});

$(window).resize(function () {
    //padding-top
    $('.page-wrapper').css('padding-top', $('.banner-sec').height() + 'px');
});



  $('#customers-testimonials').owlCarousel({
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1170: {
            items: 3
        }
    }
});

$(document).ready(function () {
    $('.vehicle-details-top-slider').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      items: 1
    });
    $('.similar-cars').owlCarousel({
      loop: true,
      margin: 15,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        992: {
          items: 3
        }
      }
    });

});