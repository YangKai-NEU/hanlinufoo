/**
 * Created by Administrator on 2017/1/4 0004.
 */

/*
 * 暂时存放用户信息的一个Object
 * */
var g_user = null;


function showTitle() {
    $.getJSON("./config/config.json", function (data) {
        document.title = data.web_title;
    })
}
function getURLParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function exitLogin() {
    $.ajax({
        type: "POST",
        url: "../action/exit_login.class.php",
        data: {},
        dataType: "json",
        success: function (data) {
            var obj = eval(data);
            if (obj.Code == '1') {
                g_user = null;
                window.location.href = "./index.html";
                return true;
            } else {
                alert(obj.Msg);
                return false;
            }
        }
    });
}

/*
 * When the page was initial
 * */
window.onload =
    function () {
        showTitle();
    };