/**
 * Created by Administrator on 2016/12/31 0031.
 */
$div1 = $('#loading-spinner');

if ($div1.is(':visible')) {
    $div1.hide();
}

function checkLogin(){
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/check_login.class.php",
        data: {type:2},
        dataType: "json",
        success: function(data){
            $div1.hide();
            var obj = eval(data);
            if(obj.Code=="-1"){
                window.location.href="./index.html";
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
                    op.value = obj.grade[i].g_id;
                    op.text = obj.grade[i].g_name;
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
                    op.value = obj.subject[i].s_id;
                    op.text = obj.subject[i].s_name;
                }
            }
            get_exams();
            return false;
        }
    });
}
function add_nothing() {
    var nothing_img_div = document.createElement('div');
    var nothing_text_div = document.createElement('div');
    nothing_img_div.setAttribute("class", "nothing-img-div");
    var block1_1_img = document.createElement('img');
    block1_1_img.setAttribute("class", "nothing-img");
    block1_1_img.setAttribute("src", "./image/notthing.png");
    nothing_img_div.append(block1_1_img);
    nothing_text_div.setAttribute("class", "empty-questin");
    nothing_text_div.innerHTML = "该模块下暂无数据，看看其他模块吧";
    $("#exam_content").append(nothing_img_div);
    $("#exam_content").append(nothing_text_div);
}
function get_exams() {
    var sid = $("#subject").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quizs.class.php",
        data: {sid: sid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                $("#exam_content").html("");
                for (var i = 0; i < obj.quizs.length; i++) {
                    show_exam(obj.quizs[i].h_id, obj.quizs[i].h_homework_name, obj.quizs[i].h_time);
                }
                if (obj.quizs.length == 0) {
                    add_nothing();
                }
            }
            return false;
        }
    });
}

function delete_quiz(id) {
    var sid = $("#subject").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quiz_remove.class.php",
        data: {h_id: id, sid: sid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                alert("删除成功");
                get_exams();
            } else {
                alert(obj.Msg);
            }
            return false;
        }
    });
}

$("#delete_multi").click(function () {
    var sid = $("#subject").val();
    var time = $("#time").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quiz_remove_multi.class.php",
        data: {time: time, sid: sid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                alert("删除成功");
                get_exams();
            } else {
                alert(obj.Msg);
            }
            return false;
        }
    });
});

function quiz_item(qid) {
    window.location.href = "exam_item.html?q=" + qid;
}

function show_exam(id, name, time) {
    var exam_item = document.createElement('div');
    exam_item.setAttribute("class", "exam_item");

    var a1 = document.createElement("a");
    a1.setAttribute("class", "cur-hand blue_on_deep exam_item_left");
    a1.innerHTML = name;
    a1.setAttribute("onClick", "quiz_item(" + id + ")");
    var a2 = document.createElement("a");
    a2.setAttribute("class", "exam_item_right");
    a2.innerHTML = time;
    var a3 = document.createElement("a");
    a3.setAttribute("class", "delete cur-hand");
    a3.setAttribute("onClick", "delete_quiz(" + id + ")");
    a3.innerHTML = "删除";
    exam_item.append(a1);
    exam_item.append(a3);
    exam_item.append(a2);


    $("#exam_content").append(exam_item);
}

get_grade();