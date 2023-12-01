$(function () {
    // Start Scroll Up Nav
    if ($(window).width() < 768) {
        $("#nav-icon3").click(function (event) {
            $(this).toggleClass("open");
            $(".nav").toggleClass("fade");
            document.body.classList.toggle('lock-scroll');
            event.stopPropagation(); // Prevent the click event from propagating to the document
        });
    
        $(".nav li a").click(function () {
            $("#nav-icon3").toggleClass("open");
            $(".nav").toggleClass("fade");
            document.body.classList.toggle('lock-scroll');
        });
    
        // Close the navigation when clicking outside of it
        $(document).click(function (event) {
            const nav = $(".nav");
            const navIcon = $("#nav-icon3");
    
            // Check if the clicked element is not within the navigation or the button
            if (!nav.is(event.target) && !navIcon.is(event.target) && nav.has(event.target).length === 0 && navIcon.has(event.target).length === 0) {
                $("#nav-icon3").removeClass("open");
                $(".nav").removeClass("fade");
                document.body.classList.remove('lock-scroll');
            }
        });
    }


    if ($(window).width() > 768) {
        var lastScrollTop = 600;
        $(window).scroll(function () {
            var st = $(this).scrollTop();
            var banner = $('.nav');
            setTimeout(function () {
                if (st > lastScrollTop) {
                    banner.addClass('fade-out').removeClass('fade-in');
                } else {
                    banner.addClass('fade-in').removeClass('fade-out');
                }
                lastScrollTop = st;
            }, 100);
        });
    }


    var nav = $(".nav");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 10) {
            nav.removeClass('transparentBG').addClass("blackBG");
        } else {
            nav.removeClass("blackBG").addClass('transparentBG');
        }
    });

    $(".sec03_cont01 .hover").mouseleave(
        function () {
            $(this).removeClass("hover");
        }
    );

    // End Scroll Up Nav

    // Start To the top
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 100) {
            $("#return-to-top").fadeIn(300);
        } else {
            $("#return-to-top").fadeOut(200);
        }

        if ($(window).scrollTop() + $(window).height() < $(document).height() - $(".copyright").height()) {
            $('#return-to-top').css("position", "fixed"); //resetting it
            $('#return-to-top').css("bottom", "30px"); //resetting it
        }

        if ($(window).width() < 769) {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - $(".copyright").height()) {
                $('#return-to-top').css("position", "fixed"); // make it related
                $('#return-to-top').css("bottom", "155px"); // 60 px, height of #toTop
            }
        } else {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - $(".copyright").height()) {
                $('#return-to-top').css("position", "fixed"); // make it related
                $('#return-to-top').css("bottom", "30px"); // 60 px, height of #toTop
            }
        }
    });

    $("#return-to-top").click(function () {
        $("body,html").animate({
                scrollTop: 0,
            },
            100
        );
    });
    // End To the top


    AOS.init({
        once: true
    });

});

//ANIMATION ILLUSTRATION

const playerContainers = document.querySelectorAll("lottie-player");
playerContainers.forEach((container) => {
    container.addEventListener("mouseover", () => {
        const player = container.querySelector("lottie-player");
        player.play();
    });
});

//TYPEWRITER
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 100 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};