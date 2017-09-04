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
    var i = $("#grade").val();
    if (i == null || i == "") {
        var department = document.getElementById('subject');
        department.options.length = 0;
    }
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/subject.class.php",
        data: {grade_id: i},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('subject');
            department.options.length = 0;
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
    if (i == null || i == "" || iid == null || iid == "") {
        $("#chapter ").empty();
    }
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
function delete_question(sid, type, qid) {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/question_delete.class.php",
        data: {sid: sid, type: type, qid: qid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("删除成功");
                $div1.hide();
                get_question();
            }
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
    question_item_select_b.innerHTML = "<strong>B．</strong>" + selectb;
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
    var block1 = document.createElement('div');
    block1.setAttribute("class", "cur-hand inline-block-style");
    var block1_1 = document.createElement('div');
    block1_1.setAttribute("class", "question_bottom_block_1");
    var block1_1_img = document.createElement('img');
    block1_1_img.setAttribute("class", "question_edit_img");
    block1_1_img.setAttribute("src", "./image/question_edit.png");
    block1_1.append(block1_1_img);
    var block1_2 = document.createElement('div');
    block1_2.setAttribute("class", "question_bottom_block_2");
    var block1_2_img = document.createElement('a');
    block1_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block1_2_img.innerHTML = "<strong>编辑试题</strong>";
    block1_2.append(block1_2_img);
    block1.append(block1_1);
    block1.append(block1_2);

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
    block3_1_img.setAttribute("src", "./image/question_delete.png");
    block3_1.append(block3_1_img);
    var block3_2 = document.createElement('div');
    block3_2.setAttribute("class", "question_bottom_block_2");
    var block3_2_img = document.createElement('a');
    block3_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block3_2_img.innerHTML = "<strong>删除</strong>";
    block3_2_img.setAttribute("onClick", "delete_question(" + $("#subject").val() + ",1," + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    question_item_bottom.append(block1);
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
    var block1 = document.createElement('div');
    block1.setAttribute("class", "cur-hand inline-block-style");
    var block1_1 = document.createElement('div');
    block1_1.setAttribute("class", "question_bottom_block_1");
    var block1_1_img = document.createElement('img');
    block1_1_img.setAttribute("class", "question_edit_img");
    block1_1_img.setAttribute("src", "./image/question_edit.png");
    block1_1.append(block1_1_img);
    var block1_2 = document.createElement('div');
    block1_2.setAttribute("class", "question_bottom_block_2");
    var block1_2_img = document.createElement('a');
    block1_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block1_2_img.innerHTML = "<strong>编辑试题</strong>";
    block1_2.append(block1_2_img);
    block1.append(block1_1);
    block1.append(block1_2);

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
    block3_1_img.setAttribute("src", "./image/question_delete.png");
    block3_1.append(block3_1_img);
    var block3_2 = document.createElement('div');
    block3_2.setAttribute("class", "question_bottom_block_2");
    var block3_2_img = document.createElement('a');
    block3_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block3_2_img.innerHTML = "<strong>删除</strong>";
    block3_2_img.setAttribute("onClick", "delete_question(" + $("#subject").val() + ",2," + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    question_item_bottom.append(block1);
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
    var block1 = document.createElement('div');
    block1.setAttribute("class", "cur-hand inline-block-style");
    var block1_1 = document.createElement('div');
    block1_1.setAttribute("class", "question_bottom_block_1");
    var block1_1_img = document.createElement('img');
    block1_1_img.setAttribute("class", "question_edit_img");
    block1_1_img.setAttribute("src", "./image/question_edit.png");
    block1_1.append(block1_1_img);
    var block1_2 = document.createElement('div');
    block1_2.setAttribute("class", "question_bottom_block_2");
    var block1_2_img = document.createElement('a');
    block1_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block1_2_img.innerHTML = "<strong>编辑试题</strong>";
    block1_2.append(block1_2_img);
    block1.append(block1_1);
    block1.append(block1_2);

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
    block3_1_img.setAttribute("src", "./image/question_delete.png");
    block3_1.append(block3_1_img);
    var block3_2 = document.createElement('div');
    block3_2.setAttribute("class", "question_bottom_block_2");
    var block3_2_img = document.createElement('a');
    block3_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block3_2_img.innerHTML = "<strong>删除</strong>";
    block3_2_img.setAttribute("onClick", "delete_question(" + $("#subject").val() + ",3," + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    question_item_bottom.append(block1);
    question_item_bottom.append(block2);
    question_item_bottom.append(block3);
    question_item.append(question_item_title);
    question_item.append(question_item_bottom);
    $("#questions-content").append(question_item);
}
function get_question() {
    var subject = $("#subject").val();
    var type = $("#type").val();
    var eid = $("#exam").val();
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/questions.class.php",
        data: {sid: subject, type: type, eid: eid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            if (obj.Code == "1") {
                var examdiv = document.getElementById("exam");
                var examname = examdiv.options[examdiv.selectedIndex].text;

                if (obj.type == "1") {
                    $("#questions-content").html("");
                    if (obj.question.length == 0) {
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
                            add_choice_item(i + 1, obj.question[i].id, obj.question[i].question, obj.question[i].select_a, obj.question[i].select_b, obj.question[i].select_c, obj.question[i].select_d, examname);
                        }
                        fun();
                    }
                } else if (obj.type == "2") {
                    $("#questions-content").html("");
                    if (obj.question.length == 0) {
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
                            add_fillin_item(i + 1, obj.question[i].id, obj.question[i].question, examname);
                        }
                        fun();
                    }
                } else if (obj.type == "3") {
                    $("#questions-content").html("");
                    if (obj.question.length == 0) {
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
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