$(document).ready(function () {
    //$(document).ajaxSend(function (event, request, settings) {
    //    $('#loading-indicator').show();
    //});

    //$(document).ajaxComplete(function (event, request, settings) {
    //    $('#loading-indicator').hide();
    //});

    //Login Sign Up
    $('#moveleft').click(function () {
        $('#textbox').animate({
            'marginLeft': "0" //moves left
        });

        $('.toplam').animate({
            'marginLeft': "100%" //moves right
        });
    });

    $('#moveright').click(function () {
        $('#textbox').animate({
            'marginLeft': "50%" //moves right
        });

        $('.toplam').animate({
            'marginLeft': "0" //moves right
        });
    });

    $("#send-forgotpwd-email").click(function () {

        if ($("#email-forgot").val() == "") {
            bootbox.alert("Por favor, insira seu e-mail!");
            return;
        }

        startLoading("aguarde um momento, o envio de e-mail está sendo preparado...")
        $.ajax({
            url: "/Sistema/Login/SendForgotPasswordEmail",  //server script to process data
            type: 'POST',
            data: {email : $("#email-forgot").val()},
            success: function (data) {
                stopLoading();
                if (data == "ok") {
                    bootbox.alert("Foi enviado um e-mail com as instruções para recuparar a sua senha!");
                } else {
                    bootbox.alert(data);
                }
            }
        });
    });

    $("#btn-send-newpass").click(function () {

    });
});

function checkPassword() {
    if ($("#password").val() != $("#cPassword").val()) {
        $("#set-password-msg").show();
        $("#set-password-msg").text("A senha e a confirmação não conferem!");
        $("#btn-send-newpass").hide();
    } else {
        $("#set-password-msg").hide();
        $("#btn-send-newpass").show();
    }
}


function startLoading(message) {
    $("#custom-load-text").text(message);
    $("#custom-load").show();
}

function stopLoading() {
    $("#custom-load").hide();
}