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

function create_table() {
    var sid = $("#subject").val();
    var name = $("#quiz_div_input").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quiz_add.class.php",
        data: {sid: sid, name: name},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                document.getElementById("header_quiz").style.display = "none";
                document.getElementById("quiz_submit_text").style.display = "";
                document.getElementById("quiz_new_text").style.display = "";
                document.getElementById("quiz_name_text").style.display = "";
                $("#quiz_name_text").html("《" + name + "》");
                document.getElementById("grade_tr").style.display = "none";
                document.getElementById("grade_item_tr").style.display = "none";
                document.getElementById("subject_tr").style.display = "none";
            }
            return false;
        }
    });
}

function create_new_quiz() {
    $("#header_quiz").html("");
    var quiz_div_input = document.createElement('input');
    quiz_div_input.setAttribute("type", "text");
    quiz_div_input.setAttribute("id", "quiz_div_input");
    quiz_div_input.setAttribute("class", "header_quiz_input");
    quiz_div_input.setAttribute("placeholder", "在此输入试卷名称");

    var quiz_div_button = document.createElement('input');
    quiz_div_button.setAttribute("type", "button");
    quiz_div_button.setAttribute("value", "创建试卷");
    quiz_div_button.setAttribute("class", "add_new_quiz_edit cur-hand");
    quiz_div_button.setAttribute("onClick", "create_table()");

    $("#header_quiz").append(quiz_div_input);
    $("#header_quiz").append(quiz_div_button);

}
function add_no_exam() {
    $("#header_quiz").html("");
    var no_quiz_div = document.createElement('div');
    no_quiz_div.setAttribute("class", "no_exam black-on-deep cur-hand");
    no_quiz_div.setAttribute("onClick", "create_new_quiz()");
    no_quiz_div.innerHTML = "<strong>当前不存在任何试卷，立即创建</strong>";
    $("#header_quiz").append(no_quiz_div);
}

$("#quiz_submit_text").click(function () {

    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quiz_clear.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "-1") {
                alert("提交失败");
            } else {
                add_no_exam();
                document.getElementById("header_quiz").style.display = "";
                document.getElementById("quiz_submit_text").style.display = "none";
                document.getElementById("quiz_new_text").style.display = "none";
                document.getElementById("quiz_name_text").style.display = "none";
                document.getElementById("grade_tr").style.display = "";
                document.getElementById("grade_item_tr").style.display = "";
                document.getElementById("subject_tr").style.display = "";
            }
            return false;
        }
    });
});
$("#quiz_new_text").click(function () {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quiz_delete.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "1") {
                create_new_quiz();
                document.getElementById("header_quiz").style.display = "";
                document.getElementById("quiz_submit_text").style.display = "none";
                document.getElementById("quiz_new_text").style.display = "none";
                document.getElementById("quiz_name_text").style.display = "none";
                document.getElementById("grade_tr").style.display = "";
                document.getElementById("grade_item_tr").style.display = "";
                document.getElementById("subject_tr").style.display = "";
            }
            return false;
        }
    });
});
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
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.grade.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.grade[i].g_id;
                    op.text = obj.grade[i].g_name;
                }
            }
            get_gread_item();
            return false;
        }
    });
}
function get_gread_item() {
    $div1.show();
    var grade = $("#grade").val();
    if (grade == null || grade == "") {
        var department = document.getElementById('grade_item');
        department.options.length = 0;
    }
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/grade_item.class.php",
        data: {gid: grade},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('grade_item');
            department.options.length = 0;
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
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
    $div1.show();
    var i = $("#grade").val();
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
            get_chapter();
            return false;
        }
    });
}

function get_chapter() {
    $div1.show();
    var i = $("#subject").val();
    var iid = $("#grade_item").val();
    $.ajax({
        type: "POST",
        url: "../action/chapter.class.php",
        data: {sid: i, iid: iid},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('chapter');
            $("#chapter ").empty();
            department.options.length = 0;
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.chapter.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.chapter[i].id;
                    op.text = obj.chapter[i].name;
                }
            }
            get_section_1();
            return false;
        }
    });
}
function get_section_1() {
    var sid = $("#subject").val();
    var cid = $("#chapter").val();
    var pid = -1;
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/section.class.php",
        data: {cid: cid, sid: sid, pid: pid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            var department = document.getElementById('section1');
            department.options.length = 0;
            $div1.hide();
            if (obj.Code == "1") {
                for (var i = 0; i < obj.section.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.section[i].id;
                    op.text = obj.section[i].name;
                }
            }
            get_section_2();
            return false;
        }
    });
}
function get_section_2() {
    var sid = $("#subject").val();
    var cid = "-1";
    var pid = $("#section1").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/section.class.php",
        data: {cid: cid, sid: sid, pid: pid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            var department = document.getElementById('section2');
            department.options.length = 0;
            $div1.hide();
            if (obj.Code == "1") {
                for (var i = 0; i < obj.section.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.section[i].id;
                    op.text = obj.section[i].name;
                }
            }
            get_section_3();
            return false;
        }
    });
}
function get_section_3() {
    var sid = $("#subject").val();
    var cid = "-1";
    var pid = $("#section2").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/section.class.php",
        data: {cid: cid, sid: sid, pid: pid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            var department = document.getElementById('section3');
            department.options.length = 0;
            $div1.hide();
            if (obj.Code == "1") {
                for (var i = 0; i < obj.section.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.section[i].id;
                    op.text = obj.section[i].name;
                }
            }
            get_section_4();
            return false;
        }
    });
}
function get_section_4() {
    var sid = $("#subject").val();
    var cid = "-1";
    var pid = $("#section3").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/section.class.php",
        data: {cid: cid, sid: sid, pid: pid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            var department = document.getElementById('section4');
            department.options.length = 0;
            if (obj.Code == "1") {
                for (var i = 0; i < obj.section.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.section[i].id;
                    op.text = obj.section[i].name;
                }
            }
            get_exam();
            return false;
        }
    });
}
function get_exam() {
    var sid = $("#subject").val();
    var secid = -1;
    var sidlist = new Array();
    for (var i = 0; i < 4; i++) {
        sidlist[i] = "section" + (i + 1);
    }
    for (var i = 3; i >= 0; i--) {
        if ($("#" + sidlist[i]).val() != null && $("#" + sidlist[i]).val() != "") {
            secid = $("#" + sidlist[i]).val();
            break;
        }
    }

    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/section_exams.class.php",
        data: {sid: sid, secid: secid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            var department = document.getElementById('exam');
            department.options.length = 0;
            $div1.hide();
            if (obj.Code == "1") {
                for (var i = 0; i < obj.exam.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.exam[i].id;
                    op.text = obj.exam[i].name;
                }
            }
            get_question();
            return false;
        }
    });
}
function add_to_homework(sid, type, qid) {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quiz_item_add.class.php",
        data: {sid: sid, type: type, qid: qid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("添加成功");
            }
            return false;
        }
    });
}
$("#quick_make").click(function () {
    var sid = $("#subject").val();
    var type = $("#type").val();
    var num = $("#question_num").val();
    var eid = $("#exam").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quiz_item_add_multi.class.php",
        data: {sid: sid, type: type, num: num, eid: eid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("添加成功");
            }
            return false;
        }
    });
});
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
    $("#questions-content").append(nothing_img_div);
    $("#questions-content").append(nothing_text_div);
}
function add_choice_item(i, id, question, selecta, selectb, selectc, selectd, exam) {
    var question_item = document.createElement('div');
    question_item.setAttribute("class", "question-item");
    var question_item_title = document.createElement('div');
    question_item_title.setAttribute("class", "question_title cur-hand");
    question_item_title.innerHTML = "<strong>" + i + "．</strong></span>" + question;
    var question_item_select_ab = document.createElement('div');
    question_item_select_ab.setAttribute("class", "question_select_abcd");
    var question_item_select_a = document.createElement('div');
    question_item_select_a.setAttribute("class", "question_select");
    question_item_select_a.innerHTML = "<strong>A．</strong>" + selecta;
    var question_item_select_b = document.createElement('div');
    question_item_select_b.setAttribute("class", "question_select");
    question_item_select_b.innerHTML = "<strong>A．</strong>" + selectb;
    question_item_select_ab.append(question_item_select_a);
    question_item_select_ab.append(question_item_select_b);
    var question_item_select_cd = document.createElement('div');
    question_item_select_cd.setAttribute("class", "question_select_abcd");
    var question_item_select_c = document.createElement('div');
    question_item_select_c.setAttribute("class", "question_select");
    question_item_select_c.innerHTML = "<strong>C．</strong>" + selectc;
    var question_item_select_d = document.createElement('div');
    question_item_select_d.setAttribute("class", "question_select");
    question_item_select_d.innerHTML = "<strong>D．</strong>" + selectd;
    question_item_select_cd.append(question_item_select_c);
    question_item_select_cd.append(question_item_select_d);
    var question_item_bottom = document.createElement('div');
    question_item_bottom.setAttribute("class", "question_bottom");

    var block2 = document.createElement('div');
    block2.setAttribute("class", "cur-hand inline-block-style");
    var block2_1 = document.createElement('div');
    block2_1.setAttribute("class", "question_bottom_block_1");
    var block2_1_img = document.createElement('img');
    block2_1_img.setAttribute("class", "question_edit_img");
    block2_1_img.setAttribute("src", "./image/question_exam.png");
    block2_1.append(block2_1_img);
    var block2_2 = document.createElement('div');
    block2_2.setAttribute("class", "question_bottom_block_2");
    var block2_2_img = document.createElement('a');
    block2_2_img.setAttribute("class", "question_exam_text");
    block2_2_img.innerHTML = "<strong>考点：" + exam + "</strong>";
    block2_2.append(block2_2_img);
    block2.append(block2_1);
    block2.append(block2_2);

    var block3 = document.createElement('div');
    block3.setAttribute("class", "cur-hand inline-block-style");
    var block3_1 = document.createElement('div');
    block3_1.setAttribute("class", "question_bottom_block_1");
    var block3_1_img = document.createElement('img');
    block3_1_img.setAttribute("class", "question_edit_img");
    block3_1_img.setAttribute("src", "./image/add_homework.png");
    block3_1.append(block3_1_img);
    var block3_2 = document.createElement('div');
    block3_2.setAttribute("class", "question_bottom_block_2");
    var block3_2_img = document.createElement('a');
    block3_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block3_2_img.innerHTML = "<strong>加入试卷</strong>";
    block3_2_img.setAttribute("onClick", "add_to_homework(" + $("#subject").val() + ",1," + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    question_item_bottom.append(block2);
    question_item_bottom.append(block3);
    question_item.append(question_item_title);
    question_item.append(question_item_select_ab);
    question_item.append(question_item_select_cd);
    question_item.append(question_item_bottom);
    $("#questions-content").append(question_item);
}
function add_fillin_item(i, id, question, exam) {
    var question_item = document.createElement('div');
    question_item.setAttribute("class", "question-item");
    var question_item_title = document.createElement('div');
    question_item_title.setAttribute("class", "question_title cur-hand");
    question_item_title.innerHTML = "<strong>" + i + "．</strong></span>" + question;

    var question_item_bottom = document.createElement('div');
    question_item_bottom.setAttribute("class", "question_bottom");

    var block2 = document.createElement('div');
    block2.setAttribute("class", "cur-hand inline-block-style");
    var block2_1 = document.createElement('div');
    block2_1.setAttribute("class", "question_bottom_block_1");
    var block2_1_img = document.createElement('img');
    block2_1_img.setAttribute("class", "question_edit_img");
    block2_1_img.setAttribute("src", "./image/question_exam.png");
    block2_1.append(block2_1_img);
    var block2_2 = document.createElement('div');
    block2_2.setAttribute("class", "question_bottom_block_2");
    var block2_2_img = document.createElement('a');
    block2_2_img.setAttribute("class", "question_exam_text");
    block2_2_img.innerHTML = "<strong>考点：" + exam + "</strong>";
    block2_2.append(block2_2_img);
    block2.append(block2_1);
    block2.append(block2_2);

    var block3 = document.createElement('div');
    block3.setAttribute("class", "cur-hand inline-block-style");
    var block3_1 = document.createElement('div');
    block3_1.setAttribute("class", "question_bottom_block_1");
    var block3_1_img = document.createElement('img');
    block3_1_img.setAttribute("class", "question_edit_img");
    block3_1_img.setAttribute("src", "./image/add_homework.png");
    block3_1.append(block3_1_img);
    var block3_2 = document.createElement('div');
    block3_2.setAttribute("class", "question_bottom_block_2");
    var block3_2_img = document.createElement('a');
    block3_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block3_2_img.innerHTML = "<strong>加入试卷</strong>";
    block3_2_img.setAttribute("onClick", "add_to_homework(" + $("#subject").val() + ",2," + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    question_item_bottom.append(block2);
    question_item_bottom.append(block3);
    question_item.append(question_item_title);
    question_item.append(question_item_bottom);
    $("#questions-content").append(question_item);
}
function add_answer_item(i, id, question, exam) {
    var question_item = document.createElement('div');
    question_item.setAttribute("class", "question-item");
    var question_item_title = document.createElement('div');
    question_item_title.setAttribute("class", "question_title cur-hand");
    question_item_title.innerHTML = "<strong>" + i + "．</strong></span>" + question;

    var question_item_bottom = document.createElement('div');
    question_item_bottom.setAttribute("class", "question_bottom");

    var block2 = document.createElement('div');
    block2.setAttribute("class", "cur-hand inline-block-style");
    var block2_1 = document.createElement('div');
    block2_1.setAttribute("class", "question_bottom_block_1");
    var block2_1_img = document.createElement('img');
    block2_1_img.setAttribute("class", "question_edit_img");
    block2_1_img.setAttribute("src", "./image/question_exam.png");
    block2_1.append(block2_1_img);
    var block2_2 = document.createElement('div');
    block2_2.setAttribute("class", "question_bottom_block_2");
    var block2_2_img = document.createElement('a');
    block2_2_img.setAttribute("class", "question_exam_text");
    block2_2_img.innerHTML = "<strong>考点：" + exam + "</strong>";
    block2_2.append(block2_2_img);
    block2.append(block2_1);
    block2.append(block2_2);

    var block3 = document.createElement('div');
    block3.setAttribute("class", "cur-hand inline-block-style");
    var block3_1 = document.createElement('div');
    block3_1.setAttribute("class", "question_bottom_block_1");
    var block3_1_img = document.createElement('img');
    block3_1_img.setAttribute("class", "question_edit_img");
    block3_1_img.setAttribute("src", "./image/add_homework.png");
    block3_1.append(block3_1_img);
    var block3_2 = document.createElement('div');
    block3_2.setAttribute("class", "question_bottom_block_2");
    var block3_2_img = document.createElement('a');
    block3_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block3_2_img.innerHTML = "<strong>加入试卷</strong>";
    block3_2_img.setAttribute("onClick", "add_to_homework(" + $("#subject").val() + ",3," + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    question_item_bottom.append(block2);
    question_item_bottom.append(block3);
    question_item.append(question_item_title);
    question_item.append(question_item_bottom);
    $("#questions-content").append(question_item);
}

function check_quiz_info() {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/quiz_info.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "-1") {
                $("#questions-content").html("");
                add_no_exam();
                document.getElementById("grade_tr").style.display = "";
                document.getElementById("grade_item_tr").style.display = "";
                document.getElementById("subject_tr").style.display = "";
            } else {
                document.getElementById("header_quiz").style.display = "none";
                document.getElementById("quiz_submit_text").style.display = "";
                document.getElementById("quiz_new_text").style.display = "";
                document.getElementById("quiz_name_text").style.display = "";
                $("#quiz_name_text").html("《" + obj.name + "》");
                document.getElementById("grade_tr").style.display = "";
                document.getElementById("grade_item_tr").style.display = "";
                document.getElementById("subject_tr").style.display = "";
            }
        }
    });
}
function get_question() {
    $div1.show();
    var subject = $("#subject").val();
    var type = $("#type").val();
    var eid = $("#exam").val();
    $.ajax({
        type: "POST",
        url: "../action/questions.class.php",
        data: {sid: subject, type: type, eid: eid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "1") {
                var examdiv = document.getElementById("exam");
                var examname = examdiv.options[examdiv.selectedIndex].text;
                if (obj.type == "1") {
                    $("#questions-content").html("");
                    var department = document.getElementById('question_num');
                    department.options.length = 0;
                    if (obj.question.length == 0) {
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
                            var op = document.createElement("option");
                            department.appendChild(op);
                            op.value = (i + 1) + "";
                            op.text = (i + 1) + "道题";
                            add_choice_item(i + 1, obj.question[i].id, obj.question[i].question, obj.question[i].select_a, obj.question[i].select_b, obj.question[i].select_c, obj.question[i].select_d, examname);
                        }
                        fun();
                    }
                } else if (obj.type == "2") {
                    $("#questions-content").html("");
                    var department = document.getElementById('question_num');
                    department.options.length = 0;
                    if (obj.question.length == 0) {
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
                            var op = document.createElement("option");
                            department.appendChild(op);
                            op.value = (i + 1) + "";
                            op.text = (i + 1) + "道题";
                            add_fillin_item(i + 1, obj.question[i].id, obj.question[i].question, examname);
                        }
                        fun();
                    }
                } else if (obj.type == "3") {
                    $("#questions-content").html("");
                    var department = document.getElementById('question_num');
                    department.options.length = 0;
                    if (obj.question.length == 0) {
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
                            var op = document.createElement("option");
                            department.appendChild(op);
                            op.value = (i + 1) + "";
                            op.text = (i + 1) + "道题";
                            add_answer_item(i + 1, obj.question[i].id, obj.question[i].question, examname);
                        }
                        fun();
                    }
                } else {
                    $("#questions-content").html("");
                    add_nothing();
                }
            } else {
                $("#questions-content").html("");
                add_nothing();
            }
            $div1.hide();
            return false;
        }
    });
}

check_quiz_info();
get_grade();

function fun() {
    if (window.MathJax === undefined) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
        var config = MathJax.Hub.Config({
            extensions: ["tex2jax.js"],
            tex2jax: {
                inlineMath: [["$", "$"], ["\\\\\\\\\\\\(", "\\\\\\\\\\\\)"]],
                displayMath: [["$$", "$$"], ["\\\\[", "\\\\]"]],
                processEscapes: true
            },
            jax: ["input/TeX", "output/HTML-CSS"]
        });
        MathJax.Hub.Startup.onload();
        if (window.opera) {
            script.innerHTML = config;
        } else {
            script.text = config;
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
}