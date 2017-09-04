/**
 * Created by Administrator on 2016/12/31 0031.
 */
$div1 = $('#loading-spinner');
var isselect = true;

if ($div1.is(':visible')) {
    $div1.hide();
}
$("#video-btn").click(function () {
    $("#file_video").click();
});

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
    var secid;
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
    if (i < 0) {
        return false;
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
            return false;
        }
    });
}
function update_question_type(i) {
    if (i == '1') {
        document.getElementById("layout_a").style.display = "";
        document.getElementById("layout_b").style.display = "";
        document.getElementById("layout_c").style.display = "";
        document.getElementById("layout_d").style.display = "";
        isselect = true;
    } else if (i == '2') {
        document.getElementById("layout_a").style.display = "none";
        document.getElementById("layout_b").style.display = "none";
        document.getElementById("layout_c").style.display = "none";
        document.getElementById("layout_d").style.display = "none";
        isselect = false;
    } else if (i == '3') {
        document.getElementById("layout_a").style.display = "none";
        document.getElementById("layout_b").style.display = "none";
        document.getElementById("layout_c").style.display = "none";
        document.getElementById("layout_d").style.display = "none";
        isselect = false;
    }
}
get_grade();

var questionUE = UE.getEditor('question', {
    enterTag: 'br',
    toolbars: [[
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', '|', 'date', 'time', 'spechars', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|', 'kityformula'
    ]]
});
questionUE.ready(function () {
    questionUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var selectaUE = UE.getEditor('select_a', {
    enterTag: 'br',
    toolbars: [[
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', '|', 'date', 'time', 'spechars', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'kityformula'
    ]]
});
selectaUE.ready(function () {
    selectaUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var selectbUE = UE.getEditor('select_b', {
    enterTag: 'br',
    toolbars: [[
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', '|', 'date', 'time', 'spechars', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'kityformula'
    ]]
});
selectbUE.ready(function () {
    selectbUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var selectcUE = UE.getEditor('select_c', {
    enterTag: 'br',
    toolbars: [[
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', '|', 'date', 'time', 'spechars', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'kityformula'
    ]]
});
selectcUE.ready(function () {
    selectcUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var selectdUE = UE.getEditor('select_d', {
    enterTag: 'br',
    toolbars: [[
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', '|', 'date', 'time', 'spechars', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'kityformula'
    ]]
});
selectdUE.ready(function () {
    selectdUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var answerUE = UE.getEditor('answer', {
    enterTag: 'br',
    toolbars: [[
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', '|', 'date', 'time', 'spechars', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'kityformula'
    ]]
});
answerUE.ready(function () {
    answerUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var analyseUE = UE.getEditor('analyse', {
    enterTag: 'br',
    toolbars: [[
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', '|', 'date', 'time', 'spechars', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'kityformula'
    ]]
});
analyseUE.ready(function () {
    analyseUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var solutionUE = UE.getEditor('solution', {
    enterTag: 'br',
    toolbars: [[
        'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', '|', 'date', 'time', 'spechars', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'kityformula'
    ]]
});
solutionUE.ready(function () {
    solutionUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});

$("#submit_btn").click(function () {
    var subject = $("#subject").val();
    var type = $("#type").val();
    var question = questionUE.getContent();
    var selecta = selectaUE.getContent();
    var selecrb = selectbUE.getContent();
    var selectc = selectcUE.getContent();
    var selectd = selectdUE.getContent();
    var answer = answerUE.getContent();
    var analyse = analyseUE.getContent();
    var solution = solutionUE.getContent();
    var video = $("#file_video").val();
    var exam = $("#exam").val();

    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/upload.class.php",
        data: {
            subject: subject,
            type: type,
            question: question,
            select_a: selecta,
            select_b: selecrb,
            select_c: selectc,
            select_d: selectd,
            answer: answer,
            analyse: analyse,
            solution: solution,
            file_video: video,
            exam: exam
        },
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                questionUE.setContent("");
                selectaUE.setContent("");
                selectbUE.setContent("");
                selectcUE.setContent("");
                selectdUE.setContent("");
                answerUE.setContent("");
                analyseUE.setContent("");
                solutionUE.setContent("");
                alert("添加成功");
            }
            return false;
        }
    });
});