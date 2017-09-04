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

$("#edit-1").click(function () {
    $("#input-1").attr("disabled",false);
});

$("#edit-2").click(function () {
    $("#input-2").attr("disabled",false);
});

$("#edit-3").click(function () {
    $("#input-3").attr("disabled",false);
});

$("#submit_btn").click(function () {
    $div1.show();
    var web_name = $("#input-1").val();
    var web_site = $("#input-2").val();
    var web_title = $("#input-3").val();
    $.ajax({
        type: "POST",
        url: "../action/basic_modify.class.php",
        data: {web_name: web_name, web_site: web_site, web_title: web_title},
        dataType: "json",
        success: function (data) {
            $div1.hide();
            var obj = eval(data);
            if (obj.Code == "1") {
                $("#input-1").attr("disabled",true);
                $("#input-2").attr("disabled",true);
                $("#input-3").attr("disabled",true);
            }
        }
    });
});