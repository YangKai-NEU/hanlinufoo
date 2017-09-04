function showTitle() {
    $.getJSON("../config/config.json", function (data) {
        document.title = data.web_title;
        if ($("#input-1")) {
            $("#input-1").val(data.web_name);
        }
        if ($("#input-2")) {
            $("#input-2").val(data.web_site);
        }
        if ($("#input-3")) {
            $("#input-3").val(data.web_title);
        }
    })
}
showTitle();

$("#m_home_page").click(function () {
    window.location.href = "../index.html";
});
$("#m_exit").click(function () {
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
$("#admin_manage_grade").click(function () {
    window.location.href = "./grades.html";
});
$("#admin_add_grade_item").click(function () {
    window.location.href = "./grade_item.html";
});
$("#admin_manage_grade_item").click(function () {
    window.location.href = "./grade_items.html";
});
$("#admin_add_chapter").click(function () {
    window.location.href = "./chapter.html";
});
$("#admin_manage_chapter").click(function () {
    window.location.href = "./chapters.html";
});
$("#admin_add_section").click(function () {
    window.location.href = "./section.html";
});
$("#admin_manage_section").click(function () {
    window.location.href = "./sections.html";
});
$("#admin_add_exam").click(function () {
    window.location.href = "./exam.html";
});

$("#manager_cache").click(function () {
    window.location.href = "./cache.html"
});
$("#basic_config").click(function () {
    window.location.href = "./basic.html";
});

$("#admin_add_grade").click(function () {
    window.location.href = "./grade.html";
});
$("#admin_manage_exam").click(function () {
    window.location.href = "./exams.html";
});
$("#admin_manage_account").click(function () {
    window.location.href = "./account.html";
});
$("#admin_add_section_exam").click(function () {
    window.location.href = "./section_exam.html";
});
$("#admin_manage_section_exam").click(function () {
    window.location.href = "./section_exams.html";
});