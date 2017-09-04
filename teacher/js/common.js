function showTitle() {
    $.getJSON("../config/config.json", function (data) {
        document.title = data.web_title;
    })
}
showTitle();

$("#m-home-page").click(function () {
    window.location.href = "../index.html";
});
$("#m-exit").click(function () {
    $.ajax({
        type: "POST",
        url: "../action/exit_login.class.php",
        data: {},
        dataType: "json",
        success: function (data) {
            var obj = eval(data);
            if (obj.Code == '1') {
                window.location.href = "./index.html";
            } else {
                alert(obj.Msg);
            }
        }
    });
});

$("#teacher-add-question").click(function () {
    window.location.href = "./question.html";
});
$("#teacher-manage-question").click(function () {
    window.location.href = "./questions.html";
});
$("#teacher-add-exam").click(function () {
    window.location.href = "./exam.html";
});
$("#teacher-manage-exam").click(function () {
    window.location.href = "./exams.html";
});
$("#teacher-manage-account").click(function () {
    window.location.href = "./account.html";
});
$("#teacher-manage-classes").click(function () {
    window.location.href = "./classes.html";
});