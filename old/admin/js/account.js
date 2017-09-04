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
            } else {
                $("#input-username").val(obj.Data.m_username);
                $("#input-password").val(obj.Data.m_password);
                $("#input-phone").val(obj.Data.m_phone);
                $("#input-qq").val(obj.Data.m_qq);
            }
        }
    });
}
checkLogin();

$("#edit-password").click(function () {
    $("#input-password").removeAttr("disabled");
});
$("#edit-phone").click(function () {
    $("#input-phone").removeAttr("disabled");
});
$("#edit-qq").click(function () {
    $("#input-qq").removeAttr("disabled");
});
$("#submit-btn").click(function () {
    var password = $("#input-password").val();
    var phone = $("#input-phone").val();
    var qq = $("#input-qq").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/account_modify.class.php",
        data: {password: password, phone: phone, qq: qq},
        dataType: "json",
        success: function (data) {
            $div1.hide();
            var obj = eval(data);
            if (obj.Code == '1') {
                window.location.href = "./account.html";
            } else {
                alert(obj.Msg);
            }
        }
    });
});