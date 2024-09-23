$(document).ready(function () {

    /* validate form person */
    $('#btn-statistics-display-detail').on('click', function () {
        $("#applicant-statistics-detail").show();
        $("#applicant-statistics-general").hide();
    })

    $('#btn-statistics-display-general').on('click', function () {
        $("#applicant-statistics-general").show();
        $("#applicant-statistics-detail").hide();
    })
    /* validate form person */

    $('#ProfilePhotoFile').bind('change', function () {

        if (this.files[0].size == 905538) {
            alert("Por favor, selecione uma imagem menor!");
            $("#ProfilePhotoFile").val('');

        }

        console.log(this.files[0].size);

    });

    /* validate form person */

    // MY PAGE FUNCTIONS
    $(document).on('click', '#myPageAgendarEntrevista', function () {

        $("#myPageAgendarEntrevista").attr('disabled', 'disabled');

        var dataAgendamento = $("#datetimepicker").val();

        if (dataAgendamento == "") {
            alert("Escolha uma data!");
            $("#myPageAgendarEntrevista").removeAttr('disabled', 'disabled');
            return;
        }

        if (checkInterviewDate(dataAgendamento) == false) {
            $("#myPageAgendarEntrevista").removeAttr('disabled', 'disabled');
            return;
        }


        proceedSchedule(dataAgendamento);

    });

    $(document).on('click', '#usage-term-reminder', function () {
        $("#usage-term-modal").modal('show');
    });

    $(document).on('click', '#btn-confirm-usage-term', function () {
        var id = $(this).attr("data-id");

        if (!$("#usage-term-check-box").is(":checked")) {
            bootbox.alert("Para confirmar é necessário marcar o termo de aceitação!");
            return;
        }

        $.ajax({
            url: "/Sistema/MyPage/ConfirmUsageTerm",
            type: 'GET',
            data: { applicantId: id },
            success: function (data) {
                if (data == "OK") {
                    $("#usage-term-modal").modal('hide');
                    bootbox.alert("A autorização de utilização foi atualizada com sucesso!");
                    $("#usage-term-reminder").hide();
                }
            }
        });
    });

    $(document).on('click', '#myPageReagendarEntrevista', function () {

        $(this).attr('disabled', 'disabled');

        var dataAgendamento = $("#datetimepicker").val();

        if (dataAgendamento == "") {
            alert("Escolha uma data!");
            $(this).removeAttr('disabled', 'disabled');
            return;
        }

        if (checkInterviewDate(dataAgendamento) == false)
            return;

        proceedReschedule(dataAgendamento);
    });

    $(document).on('click', '#btnRescheduleInterview', function () {
        $.ajax({
            url: "/Sistema/MyPage/RescheduleInterview",  //server script to process data
            type: 'GET',
            success: function (data) {
                $("#interviewInfoContainer").html(data);
                var d = new Date();
                jQuery('#datetimepicker').datetimepicker({
                    minDate: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
                    format: 'd/m/Y H:i', minTime: '8:00', maxTime: '18:30', step: 30, mask: true
                });
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });

    $(document).on('click', '.resend-email', function () {
        startLoading("Aguarde um instante, o e-mail está sendo enviado...");
        $.ajax({
            url: "/Sistema/MyPage/ReSendLoginToNewApplicant",
            type: 'GET',
            data: { applicantEmail: $(this).attr("data-email") },
            success: function (data) {
                stopLoading();
                if (data == "ok") {
                    bootbox.alert("E-mail enviado com sucesso!");
                } else {
                    bootbox.alert(data);
                }
            }
        });
    });
    //INIT HERE

    //FINISH HERE

    $(document).on('click', '#send-applicant-login', function () {
        if ($("#email-applicant-company").val().trim() == "") {
            bootbox.alert("Por favor, insira um e-mail valido!");
            return
        }

        startLoading("Aguarde um instante, o e-mail está sendo enviado...");

        $.ajax({
            url: "/Sistema/MyPage/SendLoginToNewApplicant",
            type: 'GET',
            data: { applicantEmail: $("#email-applicant-company").val() },
            success: function (data) {
                stopLoading();
                if (data == "ok") {
                    bootbox.dialog({
                        message: "E-mail enviado com sucesso!",
                        title: "E-mail para novo candidato",
                        buttons: {
                            success: {
                                label: "Ok",
                                className: "btn-success",
                                callback: function () {
                                    location.reload();
                                }
                            }
                        }
                    });
                } else {
                    bootbox.alert(data);
                }
            }
        });
    });

    $(document).on('click', '.company-applicant-list', function () {
        var applicantId = $(this).attr("data-id");
        $.ajax({
            url: "/Sistema/MyPage/GetApplicantDetail",
            type: 'GET',
            data: { applicantId: applicantId },
            success: function (data) {
                $("#company-applicant-detail-container").html(data);
                $("#company-applicant-modal").modal("show");
            }
        });
    });

    // CAD FUNCTIONS 

    $("#applicant-profile-submit").click(function () {
        $("#wizardApplicantForm").submit();
    });

    $("#company-profile-submit").click(function () {
        $("#companyForm").submit();
    });

    $("#send-basic-form").click(function () {
        if (checkBasicFormFields()) {
            $("#form-basic-info").submit();
        }
    });

    $("#send-company-basic-form").click(function () {
        if (checkCompanyBasicFormFields()) {
            $("#form-company-basic-info").submit();
        } else {
            bootbox.alert("Por favor, preencha os campos obrigatórios!");
        }
    });

    //Resend Email
    $("#resend-email").click(function () {
        var id = $("#person-id").val();

        $.ajax({
            url: "/Sistema/Cadastro/ResendEmail",  //server script to process data
            type: 'GET',
            data: { id: id },
            success: function (data) {
                if (data == "ok") {
                    $("#email-message").html("Um novo e-mail foi enviado! Esse e-mail possui um link para ativação do seu cadastro.");
                    $("#email-message-obs").html("O e-mail pode chegar em alguns instantes ou em algumas horas. Caso você não tenha recebido o e-mail, verifique sua caixa de span. Se ainda assim o e-mail não chegar, clique na opção abaixo que nós enviamos novamente!");
                } else {
                    $("#email-message").html("Não foi possível enviar o e-mail, tente novamente ou aguarde alguns minutos!");
                }

            }
        });
    });

    $(document).on('click', '#resend-applicant-pendentlist', function () {
        var ids = [];
        $('.applicant-pendent-check').each(function () {
            if ($(this).prop("checked"))
                ids.push($(this).attr("data-id"));
        });

        if (ids.length <= 0) {
            bootbox.alert("Escolha algum candidato para reenviar o e-mail!");
            return;
        }

        bootbox.dialog({
            message: "Deseja realmente reenviar o e-mail para o(s) candidato(s) selecionado(s)?",
            title: "Reenvio de E-mail",
            buttons: {
                danger: {
                    label: "Confirmar",
                    className: "btn-primary",
                    callback: function () {
                        startLoading("Aguarde um instante, o e-mail está sendo enviado...");

                        $.ajax({
                            url: "/Sistema/Cadastro/ResendEmailCompanyApplicantList",  //server script to process data
                            type: 'GET',
                            dataType: "json",
                            traditional: true,
                            data: { applicantIds: ids },
                            complete: function (data) {
                                stopLoading();
                                bootbox.alert("E-mail enviado com sucesso!");
                            },
                            success: function (data) {
                                stopLoading();
                                bootbox.alert("E-mail enviado com sucesso!");
                            }
                        });
                    }
                },
                cancel: {
                    label: "Cancelar",
                    className: "btn-default",
                    callback: function () {
                        return;
                    }
                }
            }
        });
    });

    $(document).on('click', '#delete-applicant-pendentlist', function () {
        var ids = [];
        $('.applicant-pendent-check').each(function () {
            if ($(this).prop("checked"))
                ids.push($(this).attr("data-id"));
        });

        if (ids.length <= 0) {
            bootbox.alert("Escolha algum candidato para deletar!");
            return;
        }

        bootbox.dialog({
            message: "Deseja realmente deletar o(s) candidato(s) selecionado(s)?",
            title: "Deletar candidato pendente",
            buttons: {
                danger: {
                    label: "Confirmar",
                    className: "btn-primary",
                    callback: function () {
                        $.ajax({
                            url: "/Sistema/Cadastro/DeleteCompanyApplicantList",  //server script to process data
                            type: 'GET',
                            dataType: "json",
                            traditional: true,
                            data: { applicantIds: ids },
                            complete: function (data) {
                                if (data == "True") {
                                    bootbox.alert("Usuário(s) deletado(s) com sucesso!");
                                    location.reload();
                                } else {
                                    bootbox.alert("Não foi possível deletar o usuário, tente novamente mais tarde!");
                                }
                            },
                            success: function (data) {
                                if (data == "True") {
                                    bootbox.alert("Usuário(s) deletado(s) com sucesso!");
                                    location.reload();
                                } else {
                                    bootbox.alert("Não foi possível deletar o usuário, tente novamente mais tarde!");
                                }
                            }
                        });
                    }
                },
                cancel: {
                    label: "Cancelar",
                    className: "btn-default",
                    callback: function () {
                        return;
                    }
                }
            }
        });
    });

    $(document).on('click', '#btn-filter-pendent-applicants', function () {
        $.ajax({
            url: "/Sistema/MyPage/GetPendentApplicantList",  //server script to process data
            type: 'GET',
            data: { companyId: $("#company-id").val(), name: $("#filter-pendent-name").val(), email: $("#filter-pendent-email").val(), date: $("#filter-pendent-date").val() },
            success: function (data) {
                $("#pendent-applicant-container").html(data);
            }
        });
    });

    $(document).on('click', '#btn-filter-company-applicants', function () {
        $.ajax({
            url: "/Sistema/MyPage/GetCompanyApplicantList",  //server script to process data
            type: 'GET',
            data: { companyId: $("#company-id").val(), name: $("#filter-cuser-name").val(), email: $("#filter-cuser-email").val(), status: $("#filter-cuser-status").val(), result: $("#filter-cuser-final-result").val() },
            success: function (data) {
                $("#company-applicant-container").html(data);
            }
        });
    });

    $(document).on('click', '#btn-export-applicant-list', function () {
        event.preventDefault();
        window.open("/Sistema/MyPage/ExportApplicants?companyId=" + $("#company-id").val() + "&name=" + $("#filter-cuser-name").val() + "&email=" + $("#filter-cuser-email").val() + "&status=" + $("#filter-cuser-status").val() + "&result=" + $("#filter-cuser-final-result").val());
        //$.ajax({
        //    url: "/Sistema/MyPage/ExportApplicants",  //server script to process data
        //    type: 'GET',
        //    data: { companyId: $("#company-id").val(), name: $("#filter-cuser-name").val(), email: $("#filter-cuser-email").val(), status: $("#filter-cuser-status").val() }
        //});
    });




    $(document).on('click', '#btn-export-pdf-applicant-list', function () {
        //  alert("show");
        event.preventDefault();
        window.open("/Sistema/MyPage/ExportPdfApplicants?companyId=" + $("#company-id").val() + "&name=" + $("#filter-cuser-name").val() + "&email=" + $("#filter-cuser-email").val() + "&status=" + $("#filter-cuser-status").val() + "&result=" + $("#filter-cuser-final-result").val());
    });

    $(document).on('click', '.delete-applicant-pendent', function () {
        var id = $(this).attr("data-id");

        bootbox.dialog({
            message: "Deseja realmente deletar esse candidato?",
            title: "Deletar candidato pendente",
            buttons: {
                danger: {
                    label: "Confirmar",
                    className: "btn-primary",
                    callback: function () {
                        $.ajax({
                            url: "/Sistema/Cadastro/DeleteCompanyApplicant",  //server script to process data
                            type: 'GET',
                            data: { applicantId: id },
                            success: function (data) {
                                if (data == "True") {
                                    bootbox.alert("Usuário deletado com sucesso!");
                                    location.reload();
                                } else {
                                    bootbox.alert("Não foi possível deletar o usuário, tente novamente mais tarde!");
                                }

                            }
                        });
                    }
                },
                cancel: {
                    label: "Cancelar",
                    className: "btn-default",
                    callback: function () {
                        return;
                    }
                }
            }
        });
    });


    // DatetimePicker
    var d = new Date();
    jQuery('#datetimepicker').datetimepicker({
        minDate: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, d.getHours(), d.getMinutes()),
        format: 'd/m/Y H:i',
        minTime: '9:00',
        maxTime: '18:00',
        step: 30,
        mask: true
    });

    // Pendent Interview 
    $(document).on('click', '#pendent-interview-reason-a', function () {
        $("#pendent-interview-reason-a").removeClass("pd_button_md");
        $("#pendent-interview-reason-a").addClass("pd_button_md_sel");

        $("#pendent-interview-reason-t").removeClass("pd_button_md_sel");
        $("#pendent-interview-reason-t").addClass("pd_button_md");

        $(".box-reschedule-pendent-interview").show();
        $("#ending-interview-status").val("applicant");
    });

    $(document).on('click', '#pendent-interview-reason-t', function () {
        $("#pendent-interview-reason-t").removeClass("pd_button_md");
        $("#pendent-interview-reason-t").addClass("pd_button_md_sel");

        $("#pendent-interview-reason-a").removeClass("pd_button_md_sel");
        $("#pendent-interview-reason-a").addClass("pd_button_md");

        $(".box-reschedule-pendent-interview").show();
        $("#ending-interview-status").val("teacher");
    });

    $(document).on('click', '#myPagePendentNewInterview', function () {
        var dataAgendamento = $("#datetimepicker").val();

        if (dataAgendamento == "") {
            alert("Escolha uma data!");
            return;
        }

        $.ajax({
            url: "/Sistema/MyPage/SolvePendingInterview",
            type: 'GET',
            data: { interviewId: $("#ending-interview-id").val(), status: $("#ending-interview-status").val(), newDate: dataAgendamento },
            success: function (data) {
                $("#interviewInfoContainer").html(data);
            }
        });
    });


    //** MASK **//
    $('.cpf-mask').inputmask({
        mask: '999.999.999-99'
    });

    $('.birthdate-mask').inputmask({
        mask: '99/99/9999'
    });

    $('.birthdate-mask').inputmask({
        mask: '99/99/9999'
    });

    $('.phone-mask').inputmask({
        mask: '(99) 9999-9999'
    });

    $('.cellphone-mask').inputmask({
        mask: '(99) 99999-9999'
    });

    //** 

    $(document).on('change', '#state', function () {
        var stateInnitials = $(this).val();

        $.ajax({
            url: "/Sistema/MyPage/GetCitiesByState",
            type: 'GET',
            data: { stateId: stateInnitials },
            success: function (data) {
                $("#city").html(data);
            }
        });
    });

    //REPORT
    $(document).on('click', '#btn-filter-matrix-applicants', function () {
        $.ajax({
            url: "/Sistema/MyPage/GetBranchApplicantList",  //server script to process data
            type: 'GET',
            data: { companyId: $("#filter-cuser-branch").val(), name: $("#filter-cuser-name").val(), email: $("#filter-cuser-email").val(), status: $("#filter-cuser-status").val(), result: $("#filter-cuser-final-result").val() },
            success: function (data) {
                $("#company-applicant-container").html(data);
            }
        });
    });

    $(document).on('click', '#btn-export-matrix-applicant-list', function () {
        event.preventDefault();
        window.open("/Sistema/MyPage/ExportBranchApplicants?companyId=" + $("#filter-cuser-branch").val() + "&name=" + $("#filter-cuser-name").val() + "&email=" + $("#filter-cuser-email").val() + "&status=" + $("#filter-cuser-status").val() + "&result=" + $("#filter-cuser-final-result").val());
    });

    $(document).on('click', '#btn-export-matrix-pdf-applicant-list', function () {
        //  alert("show");
        event.preventDefault();
        window.open("/Sistema/MyPage/ExportBranchPdfApplicants?companyId=" + $("#filter-cuser-branch").val() + "&name=" + $("#filter-cuser-name").val() + "&email=" + $("#filter-cuser-email").val() + "&status=" + $("#filter-cuser-status").val() + "&result=" + $("#filter-cuser-final-result").val());
    });
});

function checkCompanyBasicFormFields() {

    if ($("#company-name").val() == "") {
        return false;
    }

    if ($("#company-fantasy-name").val() == "") {
        return false;
    }

    if ($("#company-CNPJ").val() == "") {
        return false;
    }

    if ($("#company-site").val() == "") {
        return false;
    }

    if ($("#company-email").val() == "") {
        return false;
    }

    if ($("#company-phone").val() == "") {
        return false;
    }

    if ($("#company-address").val() == "") {
        return false;
    }

    if ($("#company-neighboorhood").val() == "") {
        return false;
    }

    if ($("#state").val() == "") {
        return false;
    }

    if ($("#city").val() == "") {
        return false;
    }

    if ($("#company-image").val() == "") {
        return false;
    }


    return true;
}

function checkBasicFormFields() {
    //if (!document.getElementById('-usage-term').checked) {
    //    bootbox.alert('Para completar o cadastro é necessário aceitar o termo de utilização!');   
    //    return false;
    //}  

    

    if ($("#applicant-name").val() == "") {
        $("#applicant-name").css('border', '1px solid red');
    } else {
        $("#applicant-name").css('border', '');
    }

    if ($("#applicant-email").val() == "") {
        $("#applicant-email").css('border', '1px solid red');
    } else {
        $("#applicant-email").css('border', '');
    }

    if ($("#applicant-birthDate").val() == "") {
        $("#applicant-birthDate").css('border', '1px solid red');
    } else {
        $("#applicant-birthDate").css('border', '');
    }

    if ($("#applicant-tall").val() == "") {
        $("#applicant-tall").css('border', '1px solid red');
    } else {
        $("#applicant-tall").css('border', '');
    }

    if ($("#applicant-PhoneNumber02").val() == "") {
        $("#applicant-PhoneNumber02").css('border', '1px solid red');
    } else {
        $("#applicant-PhoneNumber02").css('border', '');
    }

    if ($("#applicant-Nationality").val() == "") {
        $("#applicant-Nationality").css('border', '1px solid red');
    } else {
        $("#applicant-Nationality").css('border', '');
    }

    if ($("#applicant-NativeLanguage").val() == "") {
        $("#applicant-NativeLanguage").css('border', '1px solid red');
    } else {
        $("#applicant-NativeLanguage").css('border', '');
    }

    if ($("#applicant-EnglishProficiency").val() == "") {
        $("#applicant-EnglishProficiency").css('border', '1px solid red');
    } else {
        $("#applicant-EnglishProficiency").css('border', '');
    }

    if ($("#applicant-SpanighProficiency").val() == "") {
        $("#applicant-SpanighProficiency").css('border', '1px solid red');
    } else {
        $("#applicant-SpanighProficiency").css('border', '');
    }

    if ($("#applicant-PersonalSynthesis").val() == "") {
        $("#applicant-PersonalSynthesis").css('border', '1px solid red');
    } else {
        $("#applicant-PersonalSynthesis").css('border', '');
    }

    if ($("#applicant-image").val() == "") {
        $("#applicant-image").css('border', '1px solid red');
    } else {
        $("#applicant-image").css('border', '');
    }

    if ($("#applicant-gender").val() == "") {
        $("#applicant-gender").css('border', '1px solid red');
    } else {
        $("#applicant-gender").css('border', '');
    }

    if ($("#applicant-name").val() == "Candidato ") {
        bootbox.alert('O campo nome está preenchido com "Candidato ". <br/>Insira seu nome para ser identificado corretamente!');
        return false;
    }

    //Check Password
    if ($("#applicant-password").val() == "" || $("#applicant-password").val().length < 6) {
        bootbox.alert('Por favor, insira uma nova senha para completar o cadastro básico. Ela deve ser diferente da sua senha atual e conter pelo menos 6 caracteres.');
        return false;
    }


    if ($("#applicant-name").val() == "" || $("#applicant-email").val() == "" || $("#applicant-birthDate").val() == "" || $("#applicant-tall").val() == "" ||
        $("#applicant-PhoneNumber02").val() == "" || $("#applicant-Nationality").val() == "" || $("#applicant-NativeLanguage").val() == "" || $("#applicant-EnglishProficiency").val() == "" ||
        $("#applicant-SpanighProficiency").val() == "" || $("#applicant-PersonalSynthesis").val() == "" || $("#applicant-image").val() == "" || $("#applicant-gender").val() == ""
    ) {
        bootbox.alert("Por favor, preencha os campos obrigatórios!");
        return false;
    }

    return true;
}

function checkInterviewDate(dataAgendamento) {
    var dtAtual = moment().add(1, 'days').format('DD/MM/YYYY HH:mm');

    if (!verifyDates(dtAtual, dataAgendamento)) {
        bootbox.alert("<strong>Não é possivel agendar para a data escolhida. Por favor, escolha outra data! </strong><br/> OBS: Verifique se a data informada é válida e posterior a data atual. Não esqueça que é necessário marcar a entrevista com no mínimo 24 horas de antecedência.");
        return false;
    }

    return true;
}

function verifyDates(date1, date2) {
    // 1- data atual // 2 - data agendamento
    var string1 = date1.substring(6, 10) + date1.substring(3, 5) + date1.substring(0, 2) + date1.substring(11, 13) + date1.substring(14, 16);
    var string2 = date2.substring(6, 10) + date2.substring(3, 5) + date2.substring(0, 2) + date2.substring(11, 13) + date2.substring(14, 16);

    return string1 < string2;
}

function proceedSchedule(interviewDate) {
    if (interviewDate == "") {
        $("#myPageAgendarEntrevista").removeAttr('disabled', 'disabled');
        return;
    }


    var hour = interviewDate.substring(11, 13);
    var minutes = interviewDate.substring(14, 16);


    if (hour < 8 || hour > 19) {

        $("#myPageAgendarEntrevista").removeAttr('disabled', 'disabled');

        if (hour == 19 && minutes == 30) {
            bootbox.alert("Nossos professores estão disponíveis apenas das 09:00 às 18:00 horas. Por gentileza, escolha um horário nesse intervalo.");
        } else {
            bootbox.alert("Nossos professores estão disponíveis apenas das 09:00 às 18:00 horas. Por gentileza, escolha um horário nesse intervalo.");
        }

        return;
    }

    if (minutes == "30" || minutes == "00") {
        scheduleInterview(interviewDate);
    } else {
        $("#myPageAgendarEntrevista").removeAttr('disabled', 'disabled');

        var newMinutes = "00";

        if (parseInt(minutes) > 45) {
            hour = parseInt(hour) + 1;
        }

        if (parseInt(minutes) <= 45 && parseInt(minutes) > 15) {
            newMinutes = "30";
        }

        var newInterviewDate = interviewDate.substring(0, 11) + hour + ":" + newMinutes;
        $("#myPageAgendarEntrevista").removeAttr('disabled', 'disabled');
        bootbox.dialog({
            message: "Para garantir que a conversa entre candidato e professor ocorra de forma tranquila, as entrevistas da  são realizadas a cada meia hora. Verificamos que você escolheu um horário quebrado (" + interviewDate.substring(11, 16) + ") e procuramos arredondar para o horário mais próximo. Podemos agendar sua entrevista para " + newInterviewDate + "?",
            title: "Agendamento de Entrevista",
            buttons: {
                danger: {
                    label: "Confirmar",
                    className: "btn-primary",
                    callback: function () {
                        scheduleInterview(newInterviewDate);
                    }
                },
                cancel: {
                    label: "Escolher outro horário",
                    className: "btn-default",
                    callback: function () {
                        return "";
                    }
                }
            }
        });
    }
}

function proceedReschedule(interviewDate) {
    if (interviewDate == "")
        return;

    var hour = interviewDate.substring(11, 13);
    var minutes = interviewDate.substring(14, 16);

    if (hour < 8 || hour > 18) {
        bootbox.alert("Atualmente nossos professores estão disponíveis das 08 horas da manhã até as 18 horas. Por gentileza, escolha um horário nesse intervalo.");
        $("#myPageReagendarEntrevista").attr('disabled', 'disabled');
        return;
    }

    if (minutes == "30" || minutes == "00") {
        rescheduleInterview(interviewDate);
    } else {
        var newMinutes = "00";

        if (parseInt(minutes) > 45) {
            hour = parseInt(hour) + 1;
        }

        if (parseInt(minutes) <= 45 && parseInt(minutes) > 15) {
            newMinutes = "30";
        }

        var newInterviewDate = interviewDate.substring(0, 11) + hour + ":" + newMinutes;
        $("#myPageReagendarEntrevista").removeAttr('disabled', 'disabled');

        bootbox.dialog({
            message: "Para garantir que a conversa entre candidato e professor ocorra de forma tranquila, as entrevistas da  são realizadas a cada meia hora. Verificamos que você escolheu um horário quebrado (" + interviewDate.substring(11, 16) + ") e procuramos arredondar para o horário mais próximo. Podemos agendar sua entrevista para " + newInterviewDate + "?",
            title: "Agendamento de Entrevista",
            buttons: {
                danger: {
                    label: "Confirmar",
                    className: "btn-primary",
                    callback: function () {
                        rescheduleInterview(newInterviewDate);
                    }
                },
                cancel: {
                    label: "Escolher outro horário",
                    className: "btn-default",
                    callback: function () {
                        return;
                    }
                }
            }
        });
    }
}

function scheduleInterview(dataAgendamento) {
    $.ajax({
        url: "/Sistema/MyPage/ScheduleInterview",
        type: 'GET',
        data: { getDate: dataAgendamento },
        success: function (data) {
            $("#interviewInfoContainer").html(data);
            console.log(data);
            var d = new Date();
            jQuery('#datetimepicker').datetimepicker({
                minDate: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
                format: 'd/m/Y H:i', minTime: '9:00', maxTime: '18:00', step: 30, mask: true
            });
        }
    });
}

function rescheduleInterview(dataAgendamento) {
    $.ajax({
        url: "/Sistema/MyPage/RescheduleInterviewConfirm",
        type: 'GET',
        data: { getDate: dataAgendamento },
        success: function (data) {
            $("#interviewInfoContainer").html(data);
            $("#myPageReagendarEntrevista").attr('disabled', 'disabled');

            var d = new Date();
            jQuery('#datetimepicker').datetimepicker({
                minDate: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
                format: 'd/m/Y H:i', minTime: '9:00', maxTime: '18:00', step: 30, mask: true
            });
        }
    });
}

function selectAllPendentApplicant() {
    $('.applicant-pendent-check').each(
        function () {
            if ($(this).prop("checked"))
                $(this).prop("checked", false);
            else $(this).prop("checked", true);
        }
    );
}

function skypeDetail() {
    bootbox.alert("<h2>About using Skype:</h2><p>Skype is 's chosen tool for carrying out the conversational stage of the language proficiency process. This interview will be conducted through a video call between teacher and candidate.</p>" +
        "<p>Therefore, the candidate must have the Skype application installed on their PC or notebook  (<a href='https://www.skype.com/pt-br/download-skype/skype-for-computer/' target='_blank'>click here to download</a>) by the date and time of the interview.</p>" +
        "<p>Also make sure the video and audio are working properly on your Skype. If you have difficulty testing the sound of your skype calls, <a href='https://support.skype.com/pt-br/faq/FA265/como-posso-testar-se-o-som-esta-funcionando-no-skype-fazer-uma-chamada-de-teste-para-o-echo' target='_blank'>click here </a>to view the skype tutorial. And <a href='https://support.skype.com/pt/faq/FA1267/resolucao-de-problemas-de-webcam-video' target='_blank'>click here </a> for help on how to test the video.</p>");
    //<p>Caso encontre, entre em contato conosco pelo e-mail: <a href='mailto:contato@.com.br?Subject=DuvidaSkype' target='_top'>contato@.com.br</a><p>
}


function imageDetail() {
    bootbox.alert("<h2>Dicas para envio de imagem:</h2>" +
        "<h4>Sobre o o tipo de foto: </h4><ul><li>Envie uma foto onde você apareça nitidamente</li></ul>" +
        "<h4>Evite: </h4><ul><li>Fotos com excesso de maquiagem</li><li>Evite fotos de biquini, roupa de banho, roupas de academia, etc.</li></ul>" +
        "<h4>Sobre o tamanho, formato e qualidade da foto: </h4><ul><li>São permitidos arquivos de fotos PNG e JPG</li><li>Prefira fotos no modo retrato (altura maior que a largura)</li><li>Evite fotos descofadas e de baixa qualidade</li><li>Evite fotos muito grandes, o tamanho máximo recomendado é de 800X600</li></ul>")
}

function startLoading(message) {
    $("#custom-load-text").text(message);
    $("#custom-load").show();
}

function stopLoading() {
    $("#custom-load").hide();
}