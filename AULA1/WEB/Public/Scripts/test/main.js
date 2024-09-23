$(document).ready(function () {

    $(document).ajaxSend(function (event, request, settings) {
        $('#loading-indicator').show();
    });

    $(document).ajaxComplete(function (event, request, settings) {
        $('#loading-indicator').hide();
    });
    
    // DISABLE F5
    // slight update to account for browsers not supporting e.which
    function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };

    function disableF12(e) { if ((e.which || e.keyCode) == 123) e.preventDefault(); };
    // To disable f5
    /* jQuery < 1.7 */
    $(document).bind("keydown", disableF5);
    /* OR jQuery >= 1.7 */
    $(document).on("keydown", disableF5);

    // DISABLE RIGHT BUTTON
    //if IE4+   
    document.onselectstart = new Function("return false")
    document.oncontextmenu = new Function("return false")
    //if NS6   
    //if (window.sidebar) {
    //    document.onmousedown = disableselect
    //    document.onclick = reEnable
    //}

    //$(window).blur(function () {
    //    bootbox.alert('Por favor, permaneça na página até o final da prova');        
    //});

    //TIMER TEST
    clock = $('.clock').FlipClock(900, {
        countdown: true,
        clockFace: 'MinuteCounter',
        callbacks: {
            interval: function () {
                var time = this.factory.getTime().time;

                if (time == 0) {
                    //bootbox.alert("Que pena, seu tempo acabou!");
                    this.factory.stop();
                    submitTest($("#step").val(), 0);
                }
            }
        }

    });

    $('.bar').animate({
        width: "100%"
    }, 1200000);

    // TEST FUNCTIONS
    $("#grammarStep").click(function () {
        if (!checkQuestions()) {
            return;
        }

        clock.stop();
        var time = clock.getTime();
        submitGrammarAnswerForm(time);

    });

    // TEST FUNCTIONS
    $(document).on('click', '#readingStep', function () {
        if (!checkQuestions()) {
            return;
        }

        clock.stop();
        var time = clock.getTime();
        submitReadingStep(time);
    });

    $(document).on('click', '#videoStep', function () {
        if (!checkQuestions()) {
            return;
        }

        clock.stop();
        var time = clock.getTime();
        submitVideoStep(time);
    });

    // jQuery Sticky menu
    jQuery(window).scroll(function () {
        if (window.scrollY > 10) {
            jQuery('.main-nav').addClass("sticky");
        } else {
            jQuery('.main-nav').removeClass("sticky");
        }

        if (window.scrollY > 528) {
            jQuery('.timer').addClass("sticky");
        } else {
            jQuery('.timer').removeClass("sticky");
        }
    });

    // Off-screen Navigation
    jQuery('.navbar-toggle, nav').click(function () {
        jQuery('.navbar-toggle').toggleClass('navbar-on');
        jQuery('nav').fadeToggle();
        jQuery('nav').removeClass('nav-hide');
    });


    if (jQuery(window).width() > 768) {

        jQuery('.go-top').click(function (evn) {
            jQuery('html, body').animate({ scrollTop: 0 }, 400);
        });
    }

    // Scroll to Top
    (function () {
        "use strict";

        var docElem = document.documentElement,
	    didScroll = false,
	    changeHeaderOn = 550;
        document.querySelector('#back-to-top');
        function init() {
            window.addEventListener('scroll', function () {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 50);
                }
            }, false);
        }

    })(jQuery);

    jQuery(window).scroll(function (event) {
        var scroll = jQuery(window).scrollTop();
        if (scroll >= 50) {
            jQuery("#back-to-top").addClass("show");
        } else {
            jQuery("#back-to-top").removeClass("show");
        }
    });

    jQuery('a.backToTop').click(function (event) {

        event.preventDefault();

        jQuery('html, body').animate({ scrollTop: 0 }, 610);

    });
});


function submitTest(step, time) {
    switch (step) {
        case "grammar":
            submitGrammarAnswerForm(time);
            break;
        case "video":
            submitVideoStep(time);
            break;
        case "text":
            submitReadingStep(time);
            break;
    }
}

function submitGrammarAnswerForm(time) {

    startLoading("Wait, we are calculating your score. You will be redirected to the next stage in a moment...");

    var fd = new FormData(document.querySelector("form"));
    fd.append("TimeRemaining", time);

    $.ajax({
        url: $("#grammarStepForm").attr("action"),  //server script to process data
        type: 'POST',
        data: fd,
        success: function (data) {
            stopLoading();
            $('#testContainer').html(data);
            clock.setTime(900);
            clock.start();
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function submitReadingStep(time) {

    startLoading("Aguarde, estamos calculando seu resultado. Você será redirecionado para a próxima etapa em instantes...");

    var fd = new FormData(document.querySelector("form"));
    fd.append("TimeRemaining", time);

    $.ajax({
        url: $("#readingStepForm").attr("action"),  //server script to process data
        type: 'POST',
        data: fd,
        success: function (data) {
            stopLoading();
            $('#testContainer').html(data);
            clock.setTime(900);
            clock.start();
        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function submitVideoStep(time) {

    startLoading("Congratulations, you completed the test! We are calculating the final score...");

    $("#videoStepForm").submit();
}

function questionHandler(question, answer) {
    $("input[name='AnswerList[" + question + "].AnswerId']").val(answer);
}

function checkQuestions() {
    var aux = 0;
    var finish = false;
    var result = true;

    while (finish == false) {
        var radios = document.getElementsByName("answer-" + aux);

        if (radios.length == 0) {
            finish = true;
            continue;
        }

        if (!$("input[name='answer-" + aux + "']:checked").val()) {
            bootbox.alert("Atenção! Escolha uma alternativa para a questão nº " + (aux + 1).toString() + "!");
            finish = true;
            result = false;
            continue;
        }
        aux++;
    }

    return result;
}

function startLoading(message) {
    $("#custom-load-text").text(message);
    $("#custom-load").show();
}

function stopLoading() {
    $("#custom-load").hide();
}