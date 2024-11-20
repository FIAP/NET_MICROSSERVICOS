$(document).ready(function () {
    var max_fields = 50; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap"); //Fields wrapper
    var add_button = $("#add_field_button"); //Add button ID
    aux = Number($("#question-alt-count").val());

    $(add_button).click(function (e) { //on add input button click        

        e.preventDefault();
        if (aux < max_fields) { //max input box allowed            
            $(wrapper).append('<div class="add_line animated fadeIn"><div class="row"><div class="col-md-9 col-sm-9 col-xs-9">' +
                '<input type="text" class="form-control" id="input-rounded"  name="AnswerList[' + aux + '].Description"></div><div class="col-sm-2 col-sm-6 col-xs-12"><label>' +
                '<input type="radio" name="IsCorrect" value="' + aux + '"><strong>Its correct?</strong></label></div></div><a href="#" class="remove_field" data-id="' + aux + '">' +
                '<span class="badge badge-primary"><i class="fa fa-trash"></i></span></a></div>'); //add input box
            $("#grammar-alt-count").val(aux + 1);
            aux++;
        }

    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();

        var id = $(this).attr("data-id");

        console.log(id);
        console.log($('input[name="AnswerList[' + id + '].Title"]').val());
        $('input[name="AnswerList[' + id + '].Description"]').val("");
        $(this).parent('div').hide();
        //x--;
        aux--;
    });

    //Select
    $('#select').dropdown();

    $('.ui.dropdown').dropdown({
        onChange: function (value, text, $choice) {
            $("#textId").val($choice.attr("data-id"));
        }
    });

    $('.menu .item').tab();

    //Popup
    $('.button')
        .popup({
            inline: true
        });

    //Modal
    $('.ui.modal')
        .modal({ blurring: true })
        .modal('attach events', '.test.button', 'show');

    // Datatables
    $('.dataTable').dataTable();

    $('#schedule-datatable').dataTable({
        columnDefs: [
            { type: 'date-hour', targets: 3 }
        ]
    });

    $('#result-datatable').dataTable({
        columnDefs: [
            { type: 'date-sort', targets: 4 }
        ]
    });

    $('#schedule-done').dataTable({
        columnDefs: [
            { type: 'date-sort', targets: 2 }
        ]
    });

    $('#pending-datatable').dataTable({
        columnDefs: [
            { type: 'date-hour', targets: 4 }
        ]
    });
    // Order by the grouping
    $('#example2 tbody').on('click', 'tr.group', function () {
        var currentOrder = table.order()[0];
        if (currentOrder[0] === 2 && currentOrder[1] === 'asc') {
            table.order([2, 'desc']).draw();
        } else {
            table.order([2, 'asc']).draw();
        }
    });

    $.fn.isValid = function () {
        return this[0].checkValidity();
    };

    var t = $('#example3').DataTable();

    $('#add-row').on('click', function () {
        if ($("#add-row-form").isValid()) {
            var day = $('#day-of-week').val(),
                date = $('#date-input').val(),
                datefinal = $('#datefinal-input').val(),
                hoursinitial = $('#hoursinitial').val(),
                hoursfinal = $('#hoursfinal').val(),
                salary = $('#salary-input').val();
            t.row.add([
                day,
                date,
                datefinal,
                hoursinitial,
                hoursfinal,
                '$' + salary
            ]).draw();

            $('.modal').modal('hide');

            return false;
        }
    });

    $('.date-picker').datepicker({
        minDate: 0,
        orientation: "top auto",
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    //System Questions
    $("#save-grammar-question").click(function () {
        console.log('sss');
        if ($('input[name="IsCorrect"]').is(':checked') == false) {
            bootbox.alert("Marque a alternativa correta!");
            return;
        }

        $("#form-grammar-question").submit();
    });


    $("#save-edit-grammar-question").click(function () {
        $("#form-grammar-question").submit();
    });

    $("#save-new-teacher").click(function () {
        if ($('#teacher-name').val() == "" || $('#teacher-email').val() == "") {
            bootbox.alert("Please, insert the Teacher's info!");
            return;
        }

        $("#form-teacher").submit();
    });

    $("#save-interpretation-text").click(function () {
        $("#form-interpretation-text").submit();
    });

    $("#save-video-test").click(function () {
        $("#form-video-test").submit();
    });

    $("#save-interpretation-question").click(function () {
        if ($("#textId").val() == "0" || $("#textId").val() == null || $("#textId").val() == "") {
            bootbox.alert("Choose a text!");
            return;
        }

        if ($('input[name="IsCorrect"]').is(':checked') == false) {
            bootbox.alert("Pick an alternative!");
            return;
        }

        $("#form-interpretation-question").submit();
    });

    $("#save-video-question").click(function () {
        if ($("#textId").val() == "0" || $("#textId").val() == null || $("#textId").val() == "") {
            bootbox.alert("Choose a video in the list!");
            return;
        }

        if ($('input[name="IsCorrect"]').is(':checked') == false) {
            bootbox.alert("Pick an alternative!");
            return;
        }

        $("#form-video-question").submit();
    });

    $('.phone-mask').inputmask({
        mask: '(99)99999-9999'
    });

    $(".display-grade-detail-skype").click(function () {



        $.ajax({
            url: "/TestResult/GetUserAnswer",  //server script to process data
            type: 'GET',
            data: { applicantId: $("#applicant-id").val(), evaluationType: $(this).attr("data-id"), evaluationId: $(this).attr('data-evaluationId') },
            success: function (data) {
                $("#answer-container").html(data);

            }
        });

    });

    $(".display-grade-detail").click(function () {

        $.ajax({
            url: "/TestResult/GetUserAnswer",  //server script to process data
            type: 'GET',
            data: { applicantId: $("#applicant-id").val(), evaluationType: $(this).attr("data-id"), evaluationId: $(this).attr('data-evaluationId') },
            success: function (data) {
                $("#answer-container").html(data);

            }
        });

    });

});

function deleteVideoTest(id) {
    bootbox.dialog({
        message: "Do you really want to delete the selected video?",
        title: "Delete Video Text",
        buttons: {
            cancel: {
                label: "Cancel",
                className: "btn-default"
            },
            danger: {
                label: "Delete",
                className: "btn-danger",
                callback: function () {
                    $("body").load("/Questions/DeleteVideoTest/" + id);
                }
            }
        }
    });
}

function deleteInterpretationText(id) {
    bootbox.dialog({
        message: "Do you really want to delete the selected text?",
        title: "Delete Text",
        buttons: {
            cancel: {
                label: "Cancel",
                className: "btn-default"
            },
            danger: {
                label: "Delete",
                className: "btn-danger",
                callback: function () {
                    $("body").load("/Questions/DeleteInterpretationText/" + id);
                }
            }
        }
    });
}

function deleteGrammarQuestion(id) {
    bootbox.dialog({
        message: "Do you really want to delete the selected question?",
        title: "Delete Grammar Question",
        buttons: {
            cancel: {
                label: "Cancel",
                className: "btn-default"
            },
            danger: {
                label: "Delete",
                className: "btn-danger",
                callback: function () {
                    $("body").load("/Questions/DeleteGrammarQuestion/" + id);
                }
            }
        }
    });
}

/* filter applicants */
$("#search-applicant-filters").click(function () {

    $.ajax({
        url: "/Users/ManagerFilterUsers",  //server script to process data
        type: 'GET',
        data: { name: $("#filter-applicant-name").val() },
        success: function (data) {
            $("#renderApplicant").html(data);

        }
    });

});