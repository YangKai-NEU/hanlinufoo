/**
 * Created by Administrator on 2016/12/31 0031.
 */
$div1 = $('#loading-spinner');

if ($div1.is(':visible')) {
    $div1.hide();
}

function checkLogin() {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/check_login.class.php",
        data: {type: 3},
        dataType: "json",
        success: function (data) {
            $div1.hide();
            var obj = eval(data);
            if (obj.Code == "-1") {
                window.location.href = "./index.html";
            }
        }
    });
}
checkLogin();

function get_grade() {
    $div1.show();
    $.ajax({
        type: "GET",
        url: "../action/grade.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('grade');
            department.options.length = 0;
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                for (var i = 0; i < obj.grade.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.grade[i].m_id;
                    op.text = obj.grade[i].m_name;
                }
            }
            get_gread_item();
            return false;
        }
    });
}
function get_gread_item() {
    var grade = $("#grade").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/grade_item.class.php",
        data: {gid: grade},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('grade_item');
            department.options.length = 0;
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.grade.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.grade[i].m_id;
                    op.text = obj.grade[i].m_name;
                }
            }
            get_subject();
            return false;
        }
    });
}
function get_subject() {
    var i = $("#grade").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/subject.class.php",
        data: {grade_id: i},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('subject');
            department.options.length = 0;
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.subject.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.subject[i].m_id;
                    op.text = obj.subject[i].m_name;
                }
            }
            get_chapter();
            return false;
        }
    });
}
function get_chapter() {
    $div1.show();
    var i = $("#subject").val();
    var iid = $("#grade_item").val();
    if (i == null || i == "" || iid == null || iid == "") {
        $("#chapter ").empty();
    }
    $.ajax({
        type: "POST",
        url: "../action/chapter.class.php",
        data: {sid: i, iid: iid},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('chapter');
            $("#chapter ").empty();
            department.options.length = 0;
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.chapter.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.chapter[i].id;
                    op.text = obj.chapter[i].name;
                }
            }
            return false;
        }
    });
}
$("#delete_chapter").click(function () {
    var sid = $("#subject").val();
    var chapter = $("#chapter").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/chapter_delete.class.php",
        data: {sid: sid, cid: chapter},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("删除成功");
            }
            get_chapter();
            return false;
        }
    });
});
get_grade();
