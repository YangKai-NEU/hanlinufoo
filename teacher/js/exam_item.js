/**
 * Created by Administrator on 2017/1/1 0001.
 */

$div1 = $('#loading-spinner');
var q=null;
if ($div1.is(':visible')) {
    $div1.hide();
}

function checkLogin() {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/check_login.class.php",
        data: {type: 2},
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

function getURLParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function checkURLParam(){
    if(getURLParam("q")==null){
        window.location.href="index.html";
    }else{
        q=getURLParam("q");
    }
}
checkURLParam();

function add_title(title) {
    var nothing_img_div = document.createElement('div');
    nothing_img_div.setAttribute("class", "title");
    nothing_img_div.innerHTML = "<strong>" + title + "</strong>";
    $("#questions-content").append(nothing_img_div);
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
function update_exam_select(exam, select) {
    $div1.show();
    var hid = q;
    var selectval = $("#" + select).val();
    $.ajax({
        type: "POST",
        url: "../action/quiz_expect.class.php",
        data: {hid: hid, eid: exam, expect: selectval},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                alert("设置成功");
            } else {
                if (obj.Type == "1") {
                    alert("参数错误");
                } else if (obj.Type == "2") {
                    alert("设置失败");
                }
            }
            return false;
        }
    });
}
function add_exam_title(id, exam, num, title) {
    var question_item = document.createElement('div');
    question_item.setAttribute("class", "exam_title");
    question_item.innerHTML = title;
    var exam_select = document.createElement('div');
    exam_select.setAttribute("class", "exam_select_div");
    var select_div = document.createElement('select');
    select_div.setAttribute("class", "exam_select");
    select_div.id = "select_select" + id;
    for (var i = 1; i <= num; i++) {
        var op = document.createElement("option");
        select_div.appendChild(op);
        op.value = i;
        op.text = "答对" + i + "题";
    }
    select_div.setAttribute("onchange", "update_exam_select(" + exam + ",'select_select" + id + "')");
    exam_select.append(select_div);
    question_item.append(exam_select);
    $("#questions-content").append(question_item);
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

    question_item_bottom.append(block2);
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

    question_item_bottom.append(block2);
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

    question_item_bottom.append(block2);
    question_item.append(question_item_title);
    question_item.append(question_item_bottom);
    $("#questions-content").append(question_item);
}

function get_question() {
    $div1.show();
    var qid = q;
    $.ajax({
        type: "POST",
        url: "../action/quiz_content.class.php",
        data: {qid: qid},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            $("#questions-content").html("");
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                add_title(obj.title);
                if (obj.question.length != 0) {
                    var pre = -1;
                    var i;
                    for (i = 0; i < obj.question.length; i++) {
                        if (i == 0) {
                            pre = 0;
                        } else {
                            if (obj.question[i].q_exam != obj.question[i - 1].q_exam) {
                                add_exam_title(i, obj.question[i - 1].q_exam, i - pre, obj.question[i - 1].name);
                                pre = i;
                            }
                        }

                        if (obj.question[i].q_type == "1") {
                            add_choice_item(i + 1, obj.question[i].q_id, obj.question[i].q_question, obj.question[i].q_select_a, obj.question[i].q_select_b, obj.question[i].q_select_c, obj.question[i].q_select_d, obj.question[i].name);
                        } else if (obj.question[i].q_type == "2") {
                            add_fillin_item(i + 1, obj.question[i].q_id, obj.question[i].q_question, obj.question[i].name);
                        } else if (obj.question[i].q_type == "3") {
                            add_answer_item(i + 1, obj.question[i].q_id, obj.question[i].q_question, obj.question[i].name);
                        }
                    }
                    if (obj.question.length > 0) {
                        add_exam_title(i, obj.question[i - 1].q_exam, i - pre, obj.question[i - 1].name);
                    }
                    fun();
                } else {
                    add_nothing();
                }
            }
            return false;
        }
    });
}

$("#publish").click(function () {
    $div1.show();
    var hid = q;
    var cid = $("#classes").val();
    $.ajax({
        type: "POST",
        url: "../action/quiz_add_class.class.php",
        data: {hid: hid, cid: cid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                alert("发布成功");
                window.location.href = "./exams.html";
            } else {
                if (obj.Type == "1") {
                    alert("参数错误");
                } else if (obj.Type == "2") {
                    alert("发布失败");
                }
            }
            return false;
        }
    });
});
function get_classes() {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/classes.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('classes');
            department.options.length = 0;
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.classdata.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.classdata[i].c_id;
                    op.text = obj.classdata[i].c_name;
                }
            }
            get_question();
            return false;
        }
    });
}
get_classes();

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