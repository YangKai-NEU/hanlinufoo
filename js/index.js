/**
 * Created by Administrator on 2017/1/2 0002.
 */
var g_user = null;
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
                g_user = obj.Data;
                $(".question_header_left").hide();
                $(".question_header_right").show();
                $("#welcome").html($("#welcome").html() + g_user.m_username + "[LV" + g_user.m_lv + "]");
                return true;
            } else {
                $(".question_header_right").hide();
                $(".question_header_left").show();
                return false;
            }
        }
    });
}
function clicksubject(value) {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "./action/subject_session_set.class.php",
        data: {subject: value},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                window.location.href = "./questions.html";
            }
        }
    });
}
function getSubject() {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "./action/grade_subject.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            var pre = null;
            var sub_pre = null;
            var gname_pre = "";
            $("#subject_content").html("");
            for (var i = 0; i < obj.Data.length; i++) {
                if (pre == null) {
                    pre = document.createElement("div");
                    pre.setAttribute("class", "subject_item");
                    var title_div = document.createElement("div");
                    title_div.setAttribute("class", "subject_item_title");
                    title_div.innerHTML = "<strong>" + obj.Data[i].grade_name + "</strong><a class=\"subject_item_title_img\"><strong>></strong></a>";
                    pre.append(title_div);
                    sub_pre = document.createElement("div");
                    sub_pre.setAttribute("class", "subject_item_content");
                    var tmp_div = document.createElement("div");
                    tmp_div.setAttribute("class", "subject_item_content_item");
                    var a1 = document.createElement("a");
                    a1.setAttribute("class", "subject_item_content_item_main cur_hand");
                    a1.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                    a1.innerHTML = "<strong>" + obj.Data[i].subject_name + "</strong>";
                    var a2 = document.createElement("a");
                    a2.setAttribute("class", "subject_item_content_item_name cur_hand");
                    a2.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                    a2.innerHTML = "试题";
                    var a3 = document.createElement("a");
                    a3.setAttribute("class", "subject_item_content_item_name cur_hand");
                    a3.innerHTML = "|";
                    var a4 = document.createElement("a");
                    a4.setAttribute("class", "subject_item_content_item_name cur_hand");
                    a4.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                    a4.innerHTML = "试卷";
                    tmp_div.append(a1);
                    tmp_div.append(a2);
                    tmp_div.append(a3);
                    tmp_div.append(a4);
                    sub_pre.append(tmp_div);
                } else {
                    if (obj.Data[i].grade_name == gname_pre) {
                        var tmp_div = document.createElement("div");
                        tmp_div.setAttribute("class", "subject_item_content_item");
                        var a1 = document.createElement("a");
                        a1.setAttribute("class", "subject_item_content_item_main cur_hand");
                        a1.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                        a1.innerHTML = "<strong>" + obj.Data[i].subject_name + "</strong>";
                        var a2 = document.createElement("a");
                        a2.setAttribute("class", "subject_item_content_item_name cur_hand");
                        a2.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                        a2.innerHTML = "试题";
                        var a3 = document.createElement("a");
                        a3.setAttribute("class", "subject_item_content_item_name cur_hand");
                        a3.innerHTML = "|";
                        var a4 = document.createElement("a");
                        a4.setAttribute("class", "subject_item_content_item_name cur_hand");
                        a4.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                        a4.innerHTML = "试卷";
                        tmp_div.append(a1);
                        tmp_div.append(a2);
                        tmp_div.append(a3);
                        tmp_div.append(a4);
                        sub_pre.append(tmp_div);
                    } else {
                        pre.append(sub_pre);
                        $("#subject_content").append(pre);
                        pre = document.createElement("div");
                        pre.setAttribute("class", "subject_item");
                        var title_div = document.createElement("div");
                        title_div.setAttribute("class", "subject_item_title");
                        title_div.innerHTML = "<strong>" + obj.Data[i].grade_name + "</strong><a class=\"subject_item_title_img\"><strong>></strong></a>";
                        pre.append(title_div);
                        sub_pre = document.createElement("div");
                        sub_pre.setAttribute("class", "subject_item_content");
                        var tmp_div = document.createElement("div");
                        tmp_div.setAttribute("class", "subject_item_content_item");
                        var a1 = document.createElement("a");
                        a1.setAttribute("class", "subject_item_content_item_main cur_hand");
                        a1.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                        a1.innerHTML = "<strong>" + obj.Data[i].subject_name + "</strong>";
                        var a2 = document.createElement("a");
                        a2.setAttribute("class", "subject_item_content_item_name cur_hand");
                        a2.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                        a2.innerHTML = "试题";
                        var a3 = document.createElement("a");
                        a3.setAttribute("class", "subject_item_content_item_name cur_hand");
                        a3.innerHTML = "|";
                        var a4 = document.createElement("a");
                        a4.setAttribute("class", "subject_item_content_item_name cur_hand");
                        a4.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                        a4.innerHTML = "试卷";
                        tmp_div.append(a1);
                        tmp_div.append(a2);
                        tmp_div.append(a3);
                        tmp_div.append(a4);
                        sub_pre.append(tmp_div);
                    }
                }
                gname_pre = obj.Data[i].grade_name;
            }
            if (pre != null) {
                pre.append(sub_pre);
                $("#subject_content").append(pre);
            }
            return false;
        }
    });
}

$("#phone_logo").mouseover(function () {
    $("#two").show();
});
$("#phone_logo").mouseout(function () {
    $("#two").hide();
});
$("#phone_logo").click(function () {
    window.location.href = "./android/index/hanlin.apk";
});
$("#logo").click(function () {
    window.location.href = "./index.html";
});
$("#phone_text").click(function () {
    window.location.href = "./android/index/hanlin.apk";
});
$("#search_btn").click(function () {
    window.location.href = "./questions.html";
});
$("#exit_login").click(function () {
    exitLogin();
});

closeDIV1();
checkLogin();
getSubject();