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
            if (obj.Code == "1") {
                window.location.href = "./grade.html";
            }
        }
    });
}

$(document).ready(function(){
    if (window.localStorage) {
        if (window.localStorage["admin_username"] != null && window.localStorage["admin_username"] != "") {
            $("#input-username").val(window.localStorage["admin_username"]);
        }
        if (window.localStorage["admin_password"] != "" && window.localStorage["admin_password"] != "") {
            $("#input-pwd").val(window.localStorage["admin_password"]);
        }
        if (window.localStorage["admin_issave"] == 'true' && window.localStorage["admin_issave"] != "") {
            $('#save-check').attr('checked', 'true');
        }
    }
    checkLogin();
});

$("#login-btn").click(function () {
    $div1.show();
    var user_name = $("#input-username").val();
    var user_pwd = $("#input-pwd").val();
    if (user_name == "" || user_pwd == "") {
        return false;
    } else {
        $.ajax({
            type: "POST",
            url: "../action/login.class.php",
            data: {username: user_name, password: user_pwd, type: 3},
            dataType: "json",
            success: function (data) {
                $div1.hide();
                var obj = eval(data);
                if (obj.Code == '1') {
                    if (window.localStorage) {
                        if ($('#save-check').is(':checked')) {
                            window.localStorage["admin_username"] = user_name;
                            window.localStorage["admin_password"] = user_pwd;
                            window.localStorage["admin_issave"] = 'true';
                        } else {
                            window.localStorage["admin_username"] = "";
                            window.localStorage["admin_password"] = "";
                            window.localStorage["admin_issave"] = 'false';
                        }
                    }
                    window.location.href = "grade.html";
                } else {
                    alert("用户名或密码错误");
                }
            }
        });
    }
});