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

$("#add_grade_btn").click(function () {
    var name = $("#grade_name").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/grade_add.class.php",
        data: {name: name},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            if (obj.Code == "-1") {
                $div1.hide();
                alert(obj.Msg);
            } else {
                $div1.hide();
                alert("添加成功");
                $("#grade_name").val("");
            }
            return false;
        }
    });
});