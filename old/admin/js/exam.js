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
    if (grade == null || grade == "") {
        var department = document.getElementById('grade_item');
        department.options.length = 0;
    }
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
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.subject.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.subject[i].m_id;
                    op.text = obj.subject[i].m_name;
                }
            }
            get_exam_1();
            return false;
        }
    });
}

function get_exam_1() {
    var sid = $("#subject").val();
    var pid = "-1";
    var iid = $("#grade_item").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/exam.class.php",
        data: {sid: sid, pid: pid, iid: iid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "1") {
                var department = document.getElementById('exam2');
                department.options.length = 0;
                for (var i = 0; i < obj.exam.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.exam[i].id;
                    op.text = obj.exam[i].name;
                }
            }
            get_exam_2();
            return false;
        }
    });
}

function get_exam_2() {
    var sid = $("#subject").val();
    var pid = $("#exam2").val();
    var iid = $("#grade_item").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/exam.class.php",
        data: {sid: sid, pid: pid, iid: iid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            var department = document.getElementById('exam3');
            department.options.length = 0;
            $div1.hide();
            if (obj.Code == "1") {
                var department = document.getElementById('exam3');
                department.options.length = 0;
                for (var i = 0; i < obj.exam.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.exam[i].id;
                    op.text = obj.exam[i].name;
                }
            }
            get_exam_3();
            return false;
        }
    });
}

function get_exam_3() {
    var sid = $("#subject").val();
    var pid = $("#exam3").val();
    var iid = $("#grade_item").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/exam.class.php",
        data: {sid: sid, pid: pid, iid: iid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "1") {
                var department = document.getElementById('exam4');
                department.options.length = 0;
                for (var i = 0; i < obj.exam.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.exam[i].id;
                    op.text = obj.exam[i].name;
                }
            }
            return false;
        }
    });
}

$("#add_exam_1").click(function () {
    var sid = $("#subject").val();
    var name = $("#exam_input_1").val();
    var pid = "-1";
    var iid = $("#grade_item").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/exam_add.class.php",
        data: {sid: sid, name: name, pid: pid, iid: iid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("添加成功");
            }
            $("#exam_input_1").val("");
            get_exam_1();
            return false;
        }
    });
});

$("#add_exam_2").click(function () {
    var sid = $("#subject").val();
    var name = $("#exam_input_2").val();
    var pid = $("#exam2").val();
    var iid = $("#grade_item").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/exam_add.class.php",
        data: {sid: sid, name: name, pid: pid, iid: iid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("添加成功");
            }
            $("#exam_input_2").val("");
            get_exam_2();
            return false;
        }
    });
});

$("#add_exam_3").click(function () {
    var sid = $("#subject").val();
    var name = $("#exam_input_3").val();
    var pid = $("#exam3").val();
    var iid = $("#grade_item").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/exam_add.class.php",
        data: {sid: sid, name: name, pid: pid, iid: iid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("添加成功");
            }
            $("#exam_input_3").val("");
            get_exam_3();
            return false;
        }
    });
});

$("#add_exam_4").click(function () {
    var sid = $("#subject").val();
    var name = $("#exam_input_4").val();
    var pid = $("#exam4").val();
    var iid = $("#grade_item").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/exam_add.class.php",
        data: {sid: sid, name: name, pid: pid, iid: iid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("添加成功");
            }
            $("#exam_input_4").val("");
            return false;
        }
    });
});
get_grade();