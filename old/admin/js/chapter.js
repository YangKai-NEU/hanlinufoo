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
            var obj = eval(msg);
            if (obj.Code == "-1") {
                $div1.hide();
                alert(obj.Msg);
            } else {
                $div1.hide();
                var department = document.getElementById('grade');
                department.options.length = 0;
                for (var i = 0; i < obj.grade.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.grade[i].m_id;
                    op.text = obj.grade[i].m_name;
                }
                get_gread_item();
                get_subject();
            }
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
            var obj = eval(msg);
            if (obj.Code == "-1") {
                $div1.hide();
            } else {
                $div1.hide();
                var department = document.getElementById('grade_item');
                department.options.length = 0;
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
    $.ajax({
        type: "POST",
        url: "../action/subject.class.php",
        data: {grade_id: i},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                var department = document.getElementById('subject');
                department.options.length = 0;
                for (var i = 0; i < obj.subject.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.subject[i].m_id;
                    op.text = obj.subject[i].m_name;
                }
            }
            return false;
        }
    });
}

$("#add_chapter").click(function () {
    var sid = $("#subject").val();
    var iid = $("#grade_item").val();
    var name = $("#chapter").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/chapter_add.class.php",
        data: {sid: sid, iid: iid, name: name},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            if (obj.Code == "-1") {
                $div1.hide();
                alert(obj.Msg);
            } else {
                $div1.hide();
                alert("添加成功");
                $("#chapter").val("");
            }
            return false;
        }
    });
});
get_grade();