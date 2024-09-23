$(document).ready(function () {
    // DatetimePicker
    var d = new Date();
    jQuery('.datetimepicker').datetimepicker({
        format: 'd/m/Y H:i',
        minTime: '6:00',
        maxTime: '23:00',
        step: 30,
        mask: true
    });

    $(document).on('click', ".schedule-tool-applicant", function () {        
        $("#schedule-applicant-name").val($(this).attr("title"));
        $("#schedule-applicant-id").val($(this).attr("data-id"));
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    });

    $("#check-teacher-schedule").click(function () {
        if ($("#schedule-teacher-id").val() == "" || $("#schedule-teacher-id").val() == "0") {
            bootbox.alert("<strong>Please, choose a teacher!</strong>");
            return;
        }

        if ($("#schedule-interview-date").val() == "" || $("#schedule-interview-date").val() == "__/__/____ __:__") {
            bootbox.alert("<strong>Please, choose a date!</strong>");
            return;
        }
        $("#check-teacher-schedule").attr("disabled", "disabled");

        $.ajax({
            url: "/Schedules/CheckDate",
            type: 'GET',
            data: { date: $("#schedule-interview-date").val(), teacherId: $("#schedule-teacher-id").val() },
            success: function (data) {
                
                if (data == "False") {
                    $("#teacher-schedule-status-label").text("This date is unavailable on teacher's schedule");
                    $("#teacher-schedule-status-label").addClass("teacher-schedule-unavailable");
                    $("#teacher-schedule-status-label").removeClass("teacher-schedule-available");
                    $("#teacher-schedule-status").val(false);
                } else {
                    $("#teacher-schedule-status-label").text("This date is available on teacher's schedule");
                    $("#teacher-schedule-status-label").addClass("teacher-schedule-available");
                    $("#teacher-schedule-status-label").removeClass("teacher-schedule-unavailable");
                    $("#teacher-schedule-status").val(true);                    
                }
            }
        });

        $("#check-teacher-schedule").removeAttr("disabled", "disabled");
    });

    $("#confirm-new-interview").click(function () {

        if ( $("#teacher-schedule-status").val() == "false") {
            bootbox.alert("<strong>The requeted date is unavailable!</strong>");
            return;
        }

        if ($("#schedule-applicant-id").val() == "" || $("#schedule-applicant-id").val() == "0") {
            bootbox.alert("<strong>Please, choose an applicant!</strong>");
            return;
        }

        if ($("#schedule-teacher-id").val() == "" || $("#schedule-teacher-id").val() == "0") {
            bootbox.alert("<strong>Please, choose a teacher!</strong>");
            return;
        }

        if ($("#schedule-interview-date").val() == "" || $("#schedule-interview-date").val() == "__/__/____ __:__") {
            bootbox.alert("<strong>Please, choose a date!</strong>");
            return;
        }

        $.ajax({
            url: "/Schedules/ScheduleInterview",
            type: 'GET',
            data: { date: $("#schedule-interview-date").val(), teacherId: $("#schedule-teacher-id").val(), applicantId: $("#schedule-applicant-id").val() },
            success: function (data) {
                if (data == "False") {
                    bootbox.alert("There was a problem to schedule this interview. Try selecting another date!");
                } else {
                    bootbox.alert("Interview scheduled sucessfully!");
                }
            }
        });
    });
});