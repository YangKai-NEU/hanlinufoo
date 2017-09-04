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
                if (obj.grade.length == 0) {
                    get_subject(-1);
                }
            }
            return false;
        }
    });
}

$("#delete_grade").click(function () {
    $div1.show();
    var gid = $("#grade").val();
    $.ajax({
        type: "POST",
        url: "../action/grade_delete.class.php",
        data: {gid: gid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            if (obj.Code == "-1") {
                $div1.hide();
                alert(obj.Msg);
            } else {
                $div1.hide();
                alert("删除成功");
                get_grade();
            }
            return false;
        }
    });
});

get_grade();