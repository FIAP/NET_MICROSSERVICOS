$(document).ready(function () {

    $(".delete-applicant").click(function () {
        $("#table-message").html("<div class='alert alert-dismissable alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><strong>Well done!</strong> You successfully read this important alert message.</div>");
    });

    $(".delete-teacher").click(function () {
        $("#table-message").html("<div class='alert alert-dismissable alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><strong>Well done!</strong> You successfully read this important alert message.</div>");
    });

    $(".delete-company").click(function () {
        $("#table-message").html("<div class='alert alert-dismissable alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><strong>Well done!</strong> You successfully read this important alert message.</div>");
    });

    $(".teacher-days").click(function () {
        var isAvaliable = $(this).hasClass("btn-success");
        var myInput = $(this);

        $.ajax({
            url: "/Teacher/UpdateScheculePeriod",
            type: 'GET',
            data: { scheduleDayId: myInput.attr("data-id"), period: myInput.attr("data-period"), available: !isAvaliable },
            success: function (data) {
                if (data != "OK") {
                    alert(data);
                    return;
                }

                if (!isAvaliable) {
                    myInput.children().removeClass("icon-dislike");
                    myInput.children().addClass("icon-like");
                    myInput.removeClass("btn-danger");
                    myInput.addClass("btn-success");
                } else {
                    myInput.children().removeClass("icon-like");
                    myInput.children().addClass("icon-dislike");
                    myInput.removeClass("btn-success");
                    myInput.addClass("btn-danger");
                }
            }
        });
    });

    $("#add-unavailable-period").click(function () {
        if ($("#unav-start-date").val() == "") {
            alert("Insert the first date!");
            return;
        }

        var startDate = $("#unav-start-date").val();
        var endDate = $("#unav-end-date").val();
        startDate = startDate.split('/');
        endDate = endDate.split('/');

        var newStartDate = new Date(startDate[2], startDate[1] - 1, startDate[0]);
        var newEndDate = new Date(endDate[2], endDate[1] - 1, endDate[0]);


        if (newStartDate < new Date()) {
            alert("You can't select an old date!");
            return;
        }

        if ($("#unav-end-date").val() != "" && newStartDate > newEndDate) {
            alert("The final date must be higher than begin date!");
            return;
        }

        var formData = new FormData($('#form-add-unavailable')[0]);
        formData.append("Morning", $('#Morning').is(":checked"));
        formData.append("Afternoon", $('#Afternoon').is(":checked"));
        formData.append("Night", $('#Night').is(":checked"));

        $.ajax({
            url: "/Teacher/AddUnavailablePeriod",  //server script to process data
            type: 'Post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                $("#unavaiable-days-container").html(data);
            }
        });
    });

    $(document).on('click', '.btn-feedback', function () {
        var id = $(this).attr("data-id");
        var applicantId = $(this).attr("data-applicant");

        $.ajax({
            url: "/Teacher/ShowFeedbackModal",  //server script to process data
            type: 'GET',
            data: { id: id, applicantId: applicantId },
            success: function (data) {
                $("#modal-container").html(data);
                $("#feedback-modal").modal('show');
            }
        });
    });

    $(document).on('click', '.btn-feedback-display', function () {
        var id = $(this).attr("data-id");
        var applicantId = $(this).attr("data-applicant");

        $.ajax({
            url: "/Teacher/ShowFeedbackDisplayModal",  //server script to process data
            type: 'GET',
            data: { id: id, applicantId: applicantId },
            success: function (data) {
                $("#modal-container").html(data);
                $("#feedback-modal").modal('show');
            }
        });
    });

    $(document).on('click', '#save-teacher-feedback', function () {

        if ($("#SkypeNote").val() > 10 || $("#SkypeNote").val() < 0) {
            bootbox.alert("A nota precisa estar entre 0 e 10");
            return;
        }

        $.ajax({
            url: "/Teacher/SaveFeedback",  //server script to process data
            type: 'POST',
            data: $("#form-feedback").serialize(),
            success: function (data) {
                if (data == "ok") {
                    location.reload();
                } else {
                    bootbox.alert("feedback salvo com sucesso!");
                }
            }
        });
    });

    $(document).on('click', '#solve-pending-interview', function () {
        var id = $(this).attr("data-id");
        var applicantId = $(this).attr("data-applicant");

        $.ajax({
            url: "/Teacher/ShowSolvePendingModal",
            type: 'GET',
            data: { id: id, applicantId: applicantId },
            success: function (data) {
                $("#modal-container").html(data);
                $("#solving-modal").modal('show');
            }
        });
    });


    $(document).on('click', '.teacher-cancel-interview', function () {
        var id = $(this).attr("data-id");
        var applicantId = $(this).attr("data-applicant");
        $.ajax({
            url: "/Teacher/ShowCancelModal",
            type: 'GET',
            data: { id: id, applicantId: applicantId },
            success: function (data) {
                $("#modal-container").html(data);
                $("#cancel-modal").modal('show');
            }
        });
    });

    $(document).on('click', '#cancel-interview-back', function () {
        $("#cancel-modal").modal('hide');
    });

    $(document).on('click', '.delete-unavailable-date', function () {
        var unavailableId = $(this).attr("data-id");

        $.ajax({
            url: "/Teacher/RemoveUnavailablePeriod",
            type: 'GET',
            data: { unavailableId: unavailableId },
            success: function (data) {
                if (data = "ok") {
                    $("#unav-row-" + unavailableId).hide();
                }
            }
        });
    });

    // ADMIM
    $(document).on('click', '.company-type', function () {
        $("#company-change-modal").modal("show");
        $("#company-change-id").val($(this).attr("data-pk"));
        $("#company-to-change-name").text("Change " + $(this).attr("data-name") + " category");
    });


    $(document).on('click', '#confirm-matrix-config-change', function () {
        company_new_category = $("#company-change-operation").val();
        company_id = $("#company-change-id").val();
        matrix_id = $("#company-matrix").val();

        $.ajax({
            url: "/Users/UpdateCompanyCategory",
            type: 'GET',
            data: { companyId: company_id, category: company_new_category, matrixId: matrix_id },
            success: function () {
                location.reload();
            }
        });
    });

    $(document).on('click', '.company-change-branch', function () {
        $('#company-change-operation').val($(this).attr("data-id"));

        switch ($(this).attr("data-id")) {
            case "0":
                $(".company-matrix-container").hide();
                $(".company-branch-container").hide();
                $(".company-default-container").show();
                $('#matrix-config-change-text').text('Flag as default');
                break;
            case "1":
                $(".company-matrix-container").show();
                $(".company-branch-container").hide();
                $(".company-default-container").hide();
                $('#matrix-config-change-text').text('Flag as Matrix');
                break;
            case "2":
                $(".company-matrix-container").hide();
                $(".company-branch-container").show();
                $(".company-default-container").hide();
                $('#matrix-config-change-text').text('Flag as Branch');
                break;
        }
    });

    $(document).on('change', '.chk-enable-user', function () {
        var userItens = $(this).attr("data-item").split("||");
        $.ajax({
            url: "/Users/EnableUsers",
            type: 'GET',
            data: { userType: userItens[0], userId: userItens[1], enable: $(this).is(":checked") }
        });
    });


    function myFunctionConfirm(msg) {
        var r = confirm(msg);
        if (r == true) {

        }

        return r;
    }

    $(document).on('click', '.btn-delete-user', function () {
        var userItens = $(this).attr("data-item").split("||");

        var result = myFunctionConfirm("Do You really want to delete this " + userItens[0] + "?");

        if (result) {
            $.ajax({
                url: "/Users/DeleteUsers",
                type: 'GET',
                data: { userType: userItens[0], userId: userItens[1] },
                success: function (data) {
                    if (data === "ok") {
                        $("#row-" + userItens[0] + "-" + userItens[1]).hide();
                    }
                }
            });
        }

        //bootbox.dialog({
        //    message: "Do You really want to delete this " + userItens[0] + "?",
        //    title: "Delete",
        //    buttons: {
        //        cancel: {
        //            label: "Cancel",
        //            className: "btn-default"
        //        },
        //        danger: {
        //            label: "Delete",
        //            className: "btn-danger",
        //            callback: function () {
        //                $.ajax({
        //                    url: "/Users/DeleteUsers",
        //                    type: 'GET',
        //                    data: { userType: userItens[0], userId: userItens[1] },
        //                    success: function (data) {
        //                        if (data = "ok") {
        //                            $("#row-" + userItens[0] + "-" + userItens[1]).hide();
        //                        }
        //                    }
        //                });
        //            }
        //        }
        //    }
        //});
    });

    $(document).on('click', '.btn-delete-test', function () {
        var userItens = $(this).attr("data-id").split("||");

        bootbox.dialog({
            message: "Do You really want to delete this test?",
            title: "Delete",
            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default"
                },
                danger: {
                    label: "Delete",
                    className: "btn-danger",
                    callback: function () {
                        $.ajax({
                            url: "/TestResult/DeleteTest",
                            type: 'GET',
                            data: { testId: userItens[0], interviewId: userItens[1] },
                            success: function (data) {
                                if (data = "ok") {
                                    $("#row-" + userItens[1]).hide();
                                }
                            }
                        });
                    }
                }
            }
        });
    });

    $(document).on('click', '.question-enable', function () {

        var isAvaliable = $(this).hasClass("icon-lock-open");
        var questionItens = $(this).attr("data-item").split("||");
        var myInput = $(this);

        $.ajax({
            url: "/Questions/EnableQuestion",
            type: 'GET',
            data: { questionId: questionItens[1], enabled: !isAvaliable, questionType: questionItens[0] },
            success: function (data) {
                if (data != "ok") {
                    return;
                }

                if (isAvaliable) {
                    myInput.text(" No");
                    myInput.removeClass("icon-lock-open");
                    myInput.addClass("icon-lock");
                } else {
                    myInput.text(" Yes");
                    myInput.removeClass("icon-lock");
                    myInput.addClass("icon-lock-open");
                }
            }
        });
    });

    $.fn.editable.defaults.mode = 'inline';
    $('.company-total-evaluation').editable({

        type: 'number',
        url: '/Users/UpdateTotalTests'
    });

    $(document).on('click', '.company-total-evaluation', function () {
        $('.company-total-evaluation').editable({

            type: 'number',
            url: '/Users/UpdateTotalTests'
        });
    });

    $(document).on('click', '#add-teacher', function () {
        $("#teacher-modal").modal('show');
    });


    //** SCHEDULES **//

    $(document).on('click', '.schedule-status', function () {
        var sid = $(this).attr("data-sid");
        var aid = $(this).attr("data-aid");

        var feedbackUrl = "/Teacher/Feedback?applicantId=" + aid + "&interviewId=" + sid;
        console.log(feedbackUrl);
        $("#btn-new-feedback").attr("href", feedbackUrl);

        $("#schedule-change-modal").modal("show");
        $("#interview-change-id").val(sid);
        $("#interview-change-applicant-id").val(aid);
    });

    $('.my-date').inputmask({
        mask: '99/99/9999'
    });

    $('.my-hour').inputmask({
        mask: '99:99'
    });

    $(document).on('click', '.admin-change-schedule', function () {
        var id = $(this).attr("data-id");
        var operationText = "";
        $("#text-cancel-interview-reason").val("");
        $("#date-interview").val("");
        $("#hour-interview").val("");
        $("#interview-operation").val(id);

        switch (id) {
            case "0":
                $(".box-admin-reschedule-teacher").show();
                $(".box-admin-reschedule").show();
                $(".box-admin-reschedule-save").hide();
                $(".box-admin-reason").hide();
                $(".box-admin-acomplish").hide();
                $("#text-change-interview").text("Choose the new date:");
                $(".change-operation-indicator").css("color", "#12AFCB");
                operationText = "You're rescheduling an interview";
                break;
            case "1":
                // $(".box-admin-reschedule").show();
                $(".box-admin-reschedule-teacher").hide();
                $(".box-admin-reschedule-save").hide();
                $(".box-admin-reason").hide();
                $(".box-admin-acomplish").show();
                $("#text-change-interview").text("Choose the interview date:");
                $(".change-operation-indicator").css("color", "#22BAA0");
                operationText = "We have a new page for including a more complete feedback. Click below to access:";
                break;
            case "2":
                $(".box-admin-reschedule").hide();
                $(".box-admin-reschedule-teacher").hide();
                $(".box-admin-reschedule-save").hide();
                $(".box-admin-acomplish").hide();
                $(".box-admin-reason").show();
                $(".change-operation-indicator").css("color", "#f2ca4c");
                operationText = "You're canceling an interview";
                break;
            case "3":
                $(".box-admin-reschedule").hide();
                $(".box-admin-reschedule-teacher").hide();
                $(".box-admin-reason").hide();
                $(".box-admin-acomplish").hide();
                $(".box-admin-reschedule-save").show();
                $(".change-operation-indicator").css("color", "#f25656");
                operationText = "You're deleting an interview";
                break;
        }

        $("#operation-descr").text(operationText);
    });

    $(document).on('click', '#confirm-interview-change', function () {
        if ($("#interview-operation").val() == "") {
            alert("Please, choose an operation!");
            return;
        }

        if ($("#interview-operation").val() == "3") {
            var result = confirm("Do you really want to delete this interview!");
            if (result == true) {
                txt = "You pressed OK!";
            } else {
                return;
            }
        }

        if ($("#interview-operation").val() == "1" && $("#skype-result").val() > 10) {
            alert("The maximum grade is 10!");
            return;
        }

        var skypeGrade = $("#skype-result").val() == "" ? 0 : $("#skype-result").val();

        $.ajax({
            url: "/Schedules/ConfirmChangeSchedule",
            type: 'GET',
            data: {
                interviewId: $("#interview-change-id").val(), applicantId: $("#interview-change-applicant-id").val(), operation: $("#interview-operation").val(),
                date: $("#date-interview").val(), hour: $("#hour-interview").val(), reason: $("#text-cancel-interview-reason").val(),
                skypeGrade: skypeGrade, feedback: encodeURI($("#teacher-feedback").val()), teacherId: $("#teacher-interview").val()
            },
            success: function (data) {
                if (data == "ok") {
                    location.reload();
                }

                if (data == "indisponivel") {
                    alert("This date is unavailable!")
                }
            }
        });
    });

    $(document).on('keydown', '#text-cancel-interview-reason', function () {
        if ($("#text-cancel-interview-reason").val() != "") {
            $(".box-admin-reschedule-save").show();
        } else {
            $(".box-admin-reschedule-save").hide();
        }
    });

    $(document).on('change', '#date-interview', function () {
        if ($("#date-interview").val() != "") {
            $(".box-admin-reschedule-save").show();
        } else {
            $(".box-admin-reschedule-save").hide();
        }
    });

    $(document).on('keydown', '#skype-result', function () {
        if ($("#skype-result").val() != "" && $("#teacher-feedback").val() != "") {
            $(".box-admin-reschedule-save").show();
        } else {
            $(".box-admin-reschedule-save").hide();
        }
    });

    $(document).on('keydown', '#teacher-feedback', function () {
        if ($("#skype-result").val() != "" && $("#teacher-feedback").val() != "") {
            $(".box-admin-reschedule-save").show();
        } else {
            $(".box-admin-reschedule-save").hide();
        }
    });

    //$(document).on('click', '#admin-export-applicants', function () {
    //    event.preventDefault();
    //    window.open("/TestResult/ExportApplicants");
    //});

    /* Applicants Custom Filters File*/
    $(document).on('click', '#clear-applicant-filters', function () {
        $("#filter-applicant-name").val("");
        $("#filter-applicant-company").val("0");
        $("#filter-applicant-teacher").val("0");
        $("#filter-applicant-state").val("");
        $("#filter-applicant-gender").val("");
        $("#filter-applicant-photo").val("");
        $("#filter-applicant-term").val("");
        $("#filter-applicant-status").val("0");
        $("#filter-applicant-average").val("0");
    });

    $(document).on('click', '#admin-filter-export-applicants', function () {
        event.preventDefault();
        alert($("#filter-applicant-term").val());
        window.open("/Users/ExportApplicants?name=" + $("#filter-applicant-name").val() + "&companyId=" + $("#filter-applicant-company").val() + "&teacherId=" + $("#filter-applicant-teacher").val() +
            "&state=" + $("#filter-applicant-state").val() + "&gender=" + $("#filter-applicant-gender").val() + "&photo=" + $("#filter-applicant-photo").val() + "&term=" + $("#filter-applicant-term").val() + "&status=" + $("#filter-applicant-status").val() + "&average=" + $("#filter-applicant-average").val());
    });

    $(document).on('click', '#send-applicants-email-modal', function () {
        $("#filtered-email-modal").modal("show");
    });

    $(document).on('click', '#send-test-email', function () {
        tinyMCE.triggerSave();
        startLoading("We are sending the requested mail, wait just a minute...");
        $.ajax({
            url: "/Users/SendTestEmail",
            type: 'GET',
            data: {
                mailSubject: $("#mail-subject").val(), mailMessage: $("#mail-message").val()
            },
            success: function (data) {
                stopLoading();

                if (data == "ok") {
                    alert("The requested email has been send successfully!");
                }
            }
        });
    });

    $(document).on('click', '#send-applicants-email', function () {
        startLoading("We are sending the requested mail, wait just a minute...");
        $.ajax({
            url: "/Users/FilterApplicantsSendEmail",
            type: 'GET',
            data: {
                name: $("#filter-applicant-name").val(), companyId: $("#filter-applicant-company").val(), teacherId: $("#filter-applicant-teacher").val(),
                state: $("#filter-applicant-state").val(), gender: $("#filter-applicant-gender").val(), photo: $("#filter-applicant-photo").val(),
                term: $("#filter-applicant-term").val(), status: $("#filter-applicant-status").val(), average: $("#filter-applicant-average").val(),
                mailSubject: $("#mail-subject").val(), mailMessage: $("#mail-message").val()
            },
            success: function (data) {
                stopLoading();

                if (data == "ok") {
                    alert("The requested email has been send successfully!");
                }

            }
        });
    });

    $(document).on('click', '#search-applicant-filters', function () {
        startLoading("'s engines are processing your request, wait just a minute...");
        $.ajax({
            url: "/Users/FilterApplicants",
            type: 'GET',
            data: {
                name: $("#filter-applicant-name").val(), companyId: $("#filter-applicant-company").val(), teacherId: $("#filter-applicant-teacher").val(),
                state: $("#filter-applicant-state").val(), gender: $("#filter-applicant-gender").val(), photo: $("#filter-applicant-photo").val(),
                term: $("#filter-applicant-term").val(), status: $("#filter-applicant-status").val(), average: $("#filter-applicant-average").val()
            },
            success: function (data) {
                stopLoading();
                $("#list-applicant-filter-container").html(data);
            }
        });
    });

    tinymce.init({
        selector: 'textarea',
        height: 500,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        content_css: '//www.tinymce.com/css/codepen.min.css'
    });
});

function solvePendingInterview(status) {
    $.ajax({
        url: "/Teacher/SolveInterview",
        type: 'POST',
        data: { interviewId: $("#cancel-interview-id").val(), status: status, reasonDescribe: $("#interview-cancel-reason").val() },
        success: function (data) {
            if (data == "ok") {
                location.reload();
            }
        }
    });
}

function startLoading(message) {
    $("#custom-load-text").text(message);
    $("#custom-load").show();
}

function stopLoading() {
    $("#custom-load").hide();
}


/* Model picture */
var modal = document.getElementById('myModalPicture');

$(document).on('click', '.openImage', function () {
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = this.src;

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
});








