
jQuery(document).ready(function ($) {

    // Scrollreveal
    // ============================================

    sr.reveal('.reveal-nav', {
        duration:1000,
        viewFactor: 0.1,
        scale:1,
        distance:0,
        mobile: false,
        origin:"top"
    });

    sr.reveal('.reveal', { 
        duration:1000,
        viewFactor: 0.2,
        mobile: false
    }); 

    sr.reveal('.reveal-blog', { 
        duration:1000,
        viewFactor: 0.5,
        mobile: false
    }); 


    sr.reveal('.reveal-static', { 
        duration:1000,
        viewFactor: 0.6,
        mobile: false,
        distance:0,
        scale:1
    }); 

    sr.reveal('.reveal-from-left', { 
        duration:1000,
        viewFactor: 0.6,
        mobile: false,
        distance:'100%',
        origin:'left',
    }); 

    sr.reveal('.reveal-from-right', { 
        duration:1000,
        viewFactor: 0.6,
        mobile: false,
        distance:'100%',
        origin:'right'
    });
  

    sr.reveal('.reveal-opaque', {
        duration:1000,
        viewFactor: 0.2,
        opacity:1,
        mobile: false
    });

    sr.reveal('.reveal-stagger', { 
        duration: 1000,
        viewFactor: 0.2,
        mobile: false
    }, 100);

    sr.reveal('.reveal-stagger-blog', { 
        duration: 1000,
        viewFactor: 0.2,
        scale:1,
        mobile: false,
        distance:0,
    }, 100);


    // Datepicker
    // ============================================

    $('.input-group.date').datepicker({});

    
    // Countdown
    // ============================================

    $('#countdown').countdown("2018/04/03", function(event) {

        $(this).html(
          event.strftime('<div class="counter-inner">' 
                        + '<div class="cont">'
                        + '<div class="outer">%D</div>' 
                        + '<div class="list">Days</div>' 
                        + '</div>'
                        + '<div class="cont">'
                        + '<div class="outer">%H</div>' 
                        + '<div class="list">Hours</div>' 
                        + '</div>'
                        + '<div class="cont">'
                        + '<div class="outer">%M</div>' 
                        + '<div class="list">Minutes</div>' 
                        + '</div>'
                        + '<div class="cont">'
                        + '<div class="outer">%S</div>' 
                        + '<div class="list">Seconds</div>' 
                        + '</div>'
        ));
      });
 

    // Toggle tooltip
    // ============================================

    $('[data-toggle="tooltip"]').tooltip(); 

    // Element height matching
    // ============================================

    $('.match').matchHeight({
        byRow: true,
        property: 'height',
    });

    $('.match-second').matchHeight({
        byRow: true,
        property: 'height',
    });

    $('.match-generic').matchHeight({
        byRow: true,
        property: 'height',
    });

    // Navbar animated hamburger
    // ============================================

    $('.navbar-toggle').click(function () {
        $(this).children('div').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Show Password
    // ============================================

    $('.show-password').on('click', function(e) {
        e.preventDefault();
        
        if ($('.password').attr('pass-show') == 'false') {
            
            $('.password').removeAttr('type');
            $('.password').attr('type', 'text');
            
            $('.password').removeAttr('pass-show');
            $('.password').attr('pass-show', 'true');
            
            $('.show-password .btn-form').html('<i class="fas fa-eye-slash"></i>');
            
        } else {
            
            $('.password').removeAttr('type');
            $('.password').attr('type', 'password');
            
            $('.password').removeAttr('pass-show');
            $('.password').attr('pass-show', 'false');
            
            $('.show-password .btn-form').html('<i class="fas fa-eye"></i>');
            
        }
        
    });

    // Fixed Navbar
    // ============================================

    var navHeight;
    var logoHeight;
    var header = $('.header');
    var logo = $('.header .header-logo');
    var navbar = $('.navbar');
    var $window = $(window);

    function checkWidth() {
        navHeight = $('.header').outerHeight();
        logoHeight = $('.header .header-logo').outerHeight();
        sticky = header.offset().top + logoHeight;
    }

    $(window).resize(checkWidth);
    checkWidth();

    window.onscroll = function () {
        stickMe()
    };

    function stickMe() {

        if (window.pageYOffset >= sticky) {

            if ($(".checker").css("position") === "static" ){
                // Do nothing as this is a mobile device
            } else {
                header.addClass("sticky");
                $('body').css({
                    "padding-top": navHeight,
                });
            }
            
        } else {
            if ($(".checker").css("position") === "static" ){
                // Do nothing as this is a mobile device
            } else {
                header.removeClass("sticky");
                $('body').css({
                    "padding-top": "0"
                });
            }
        }
    }

    // Fixed Navbar
    // ============================================

    function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .toggleClass('corners no-corners')
            .find(".more-less")
            .toggleClass('fa-plus fa-minus')

    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
});