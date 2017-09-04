/**
 * Created by Administrator on 2017/1/7 0007.
 */

$div1 = $('#loading-spinner');

function closeDIV1() {
    if ($div1.is(':visible')) {
        $div1.hide();
    }
}
function checkLogin() {
    $.ajax({
        type: "POST",
        url: "./action/check_login.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            if (obj.Code == "1") {
                window.location.href = "./index.html";
                return true;
            } else {
                return false;
            }
        }
    });
}

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
            data: {username: user_name, password: user_pwd},
            dataType: "json",
            success: function (data) {
                $div1.hide();
                var obj = eval(data);
                if (obj.Code == '1') {
                    if (window.localStorage) {
                        if ($('#save-check').is(':checked')) {
                            window.localStorage["user_username"] = user_name;
                            window.localStorage["user_password"] = user_pwd;
                            window.localStorage["user_issave"] = 'true';
                        } else {
                            window.localStorage["user_username"] = "";
                            window.localStorage["user_password"] = "";
                            window.localStorage["user_issave"] = 'false';
                        }
                    }
                    window.location.href = "./index.html";
                } else {
                    alert("用户名或密码错误");
                }
            }
        });
    }
});

$(document).ready(function () {
    closeDIV1();
    checkLogin();
    if (window.localStorage) {
        if (window.localStorage["user_username"] != null && window.localStorage["user_username"] != "") {
            $("#input-username").val(window.localStorage["user_username"]);
        }
        if (window.localStorage["user_password"] != null && window.localStorage["user_password"] != "") {
            $("#input-pwd").val(window.localStorage["user_password"]);
        }
        if (window.localStorage["user_issave"] != null && window.localStorage["user_issave"] != "") {
            $('#save-check').attr('checked', 'true');
        }
    }
});

