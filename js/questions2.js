/**
 * The variables in this page
 */

/*
 * 暂时存放考点的数组，注意是一个数组！！
 * */
var g_exams = null;

var g_edits = null;
var g_editu = null;
var $div1 = $('#loading-spinner');
var iid = "";
var g_active_grade = "";
var g_active_question_type = "";
var g_state = false;
var g_exam = "";
var g_type = "";
var g_page = 0;
var g_question_position = 0;
var g_current_work = "show";
var g_quiz = "";
/*
 * 修改最小题型时候的文字
 * */
var g_edit_oldname_1 = "", g_edit_newname_1 = "", g_edit_id_1 = "", g_edit_object_1 = "";
var g_edit_oldname_2 = "", g_edit_newname_2 = "", g_edit_id_2 = "", g_edit_object_2 = "";
var g_edit_oldname_3 = "", g_edit_newname_3 = "", g_edit_id_3 = "", g_edit_object_3 = "";
var g_edit_oldname_4 = "", g_edit_newname_4 = "", g_edit_id_4 = "", g_edit_object_4 = "";
/*
 * 添加的最小题型ID及其名称
 * */
var g_current_final_exam = "";
var g_current_final_exam_name = "";
/*
 * 表示当前正在修改的最小题型
 * */
/*
 * 作为修改最小题型时的临时ID（为了获取方便，可以递增处理），不是写入数据库的真实ID。
 * */
var g_edit_id = 0;

/*
 * 这个变量表示是不是输入模块，大考点和小考点！！！
 * */
var g_submit_edit_type = "";
/*
 * 这个变量是用来判断是新建还是修改题型！！！也很重要
 * */
var g_submit_type = "";
var g_section = "";

/*
 * Some functions
 * */
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
                authenticCheck();
                getMyClassList();
                return true;
            } else {
                $(".question_header_right").hide();
                $(".question_header_left").show();
                return false;
            }
        }
    });
}
function authenticCheck() {
    if (g_user.m_lv == "1") {
        $("#question_add_item").show();
        $("#edit_exam_div").show();
        $("#my_classes_div").show();
        $("#my_quizs_div").show();
    } else if (g_user.m_lv == "2") {
        $("#question_add_item").show();
        $("#edit_exam_div").show();
        $("#my_classes_div").show();
        $("#my_quizs_div").show();
    } else if (g_user.m_lv == "3") {
        $("#question_add_item").show();
        $("#edit_exam_div").hide();
        $("#my_classes_div").show();
        $("#my_quizs_div").show();
    } else if (g_user.m_lv == "4") {
        $("#question_add_item").hide();
        $("#edit_exam_div").hide();
        $("#my_classes_div").hide();
        $("#my_quizs_div").hide();
    } else if (g_user.m_lv == "5") {
        $("#question_add_item").hide();
        $("#edit_exam_div").hide();
        $("#my_classes_div").hide();
        $("#my_quizs_div").hide();
    }
}
function showErrorMsg(type) {
    if (type == 1) {
        alert("您不具有该权限");
        return false;
    }
}
function resetQuestionType(id, value) {
    if ($("#question_type_1").hasClass("active")) {
        $("#question_type_1").removeClass("active");
    }
    if ($("#question_type_2").hasClass("active")) {
        $("#question_type_2").removeClass("active");
    }
    if ($("#question_type_3").hasClass("active")) {
        $("#question_type_3").removeClass("active");
    }
    $("#" + id).addClass("active");
    g_type = value;
}
function resetType(id) {
    if ($("#type_1").hasClass("active")) {
        $("#type_1").removeClass("active");
    }
    if ($("#type_2").hasClass("active")) {
        $("#type_2").removeClass("active");
    }
    $("#" + id).addClass("active");
}
function addExams(id, array) {
    for (var i = 0; i < array.length; i++) {
        var value = "";
        if (array[i].m_exams.length == 0) {
            value = "<li><a class=\"cur_hand black_on_blue\" id=\"tree__" + array[i].m_id + "\" onclick=\"clickExam(''," + array[i].m_id + ")\">" + array[i].m_name + "</a></li>";
        } else {
            value = "<li><a class=\"cur_hand\">" + array[i].m_name + "</a><ul id='exam" + array[i].m_id + "'></ul></li>";
        }
        addNewItem(id, value);
        if (array[i].m_exams.length != 0) {
            addExams("exam" + array[i].m_id, array[i].m_exams);
        } else {
            if (g_exam == "") {
                g_exam = array[i].m_id;
                $(".blue_color").removeClass("blue_color");
                $("#tree_" + array[i].m_id).addClass("blue_color");
                getQuestion();
            }
        }
    }
}
function getExams() {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "./action/exam_all_get.class.php",
        data: {iid: iid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            // alert(JSON.stringify(msg));
            if (obj.Code == "1") {
                $("#browser").html("");
                if (obj.exam.length != 0) {
                    for (var i = 0; i < obj.exam.length; i++) {
                        var value;
                        if (obj.exam[i].m_exams.length == 0) {
                            value = "<li><a class=\"cur_hand black_on_blue\" id=\"tree__" + obj.exam[i].m_id + "\" onclick=\"clickExam(''," + obj.exam[i].m_id + ")\">" + obj.exam[i].m_name + "</a></li>";
                        } else {
                            value = "<li><a class=\"cur_hand\">" + obj.exam[i].m_name + "</a><ul id='exam" + obj.exam[i].m_id + "'></ul></li>";
                        }
                        addNewItem("browser", value);
                        if (obj.exam[i].m_exams.length == 0) {
                            if (g_exam == "") {
                                g_exam = obj.exam[i].m_id;
                                $(".blue_color").removeClass("blue_color");
                                $("#tree_" + obj.exam[i].m_id).addClass("blue_color");
                                getQuestion();
                            }
                        } else {
                            addExams("exam" + obj.exam[i].m_id, obj.exam[i].m_exams);
                        }
                    }
                } else {
                    $("#questions-content").html("");
                    add_nothing();
                }
            }
        }
    });
}
function getSubjectName() {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "./action/subject_session_get.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                $("#left_near").html("<strong>" + obj.Data + "</strong>");
                getGrade();
            }
        }
    });
}
function clickClassItem(id) {

}
function getMyClassList() {
    $.ajax({
        type: "POST",
        url: "./action/classes.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            console.log("classes", JSON.stringify(msg));
            if (obj.Code == "1") {
                for (var i = 0; i < obj.classdata.length; i++) {
                    var item = document.createElement("div");
                    item.setAttribute("class", "my_class_list_item cur_hand");
                    item.innerHTML = obj.classdata[i].m_name;
                    item.setAttribute("onclick", "clickClassItem(" + obj.classdata[i].m_id + ")");
                    var list = document.getElementById("my_class_list");
                    list.insertBefore(item, list.lastElementChild);
                }
            }
        }
    });
}
function clicksubject(value) {
    iid = "";
    resetQuestionType("question_type_1", "1");
    g_active_grade = "";
    g_active_question_type = "";
    $("#questions-content").show();
    $("#questions-content").html("");
    $("#question_table").hide();
    $("#question_table_bottom").hide();
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
                getSubjectName();
            }
        }
    });
}
function getSubjects() {
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
            $("#select_subject_div").html("");
            for (var i = 0; i < obj.Data.length; i++) {
                if (pre == null) {
                    pre = document.createElement("div");
                    pre.setAttribute("class", "grade_item_div");
                    var title_div = document.createElement("div");
                    title_div.setAttribute("class", "grade_item_div_title");
                    title_div.innerHTML = "<a class=\"grade_item_content_title\"><strong>" + obj.Data[i].grade_name + "</strong></a>";
                    pre.append(title_div);
                    sub_pre = document.createElement("div");
                    sub_pre.setAttribute("class", "grade_item_div_content");
                    var tmp_div = document.createElement("div");
                    tmp_div.setAttribute("class", "grade_item_content_name cur_hand");
                    tmp_div.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                    tmp_div.innerHTML = obj.Data[i].subject_name;
                    sub_pre.append(tmp_div);
                } else {
                    if (obj.Data[i].grade_name == gname_pre) {
                        var tmp_div = document.createElement("div");
                        tmp_div.setAttribute("class", "grade_item_content_name cur_hand");
                        tmp_div.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                        tmp_div.innerHTML = obj.Data[i].subject_name;
                        sub_pre.append(tmp_div);
                    } else {
                        pre.append(sub_pre);
                        $("#select_subject_div").append(pre);
                        pre = document.createElement("div");
                        pre.setAttribute("class", "grade_item_div");
                        var title_div = document.createElement("div");
                        title_div.setAttribute("class", "grade_item_div_title");
                        title_div.innerHTML = "<a class=\"grade_item_content_title\"><strong>" + obj.Data[i].grade_name + "</strong></a>";
                        pre.append(title_div);
                        sub_pre = document.createElement("div");
                        sub_pre.setAttribute("class", "grade_item_div_content");
                        var tmp_div = document.createElement("div");
                        tmp_div.setAttribute("class", "grade_item_content_name cur_hand");
                        tmp_div.setAttribute("onclick", "clicksubject(" + obj.Data[i].subject_id + ")");
                        tmp_div.innerHTML = obj.Data[i].subject_name;
                        sub_pre.append(tmp_div);
                    }
                }
                gname_pre = obj.Data[i].grade_name;
            }
            if (pre != null) {
                pre.append(sub_pre);
                $("#select_subject_div").append(pre);
            }
            return false;
        }
    });
}
function getGrade() {
    if (g_quiz != "") {
        g_quiz.quiz_content.splice(0, g_quiz.quiz_content.length);
        updateQuizNumber();
    }
    $div1.show();
    $.ajax({
        type: "POST",
        url: "./action/grade_get.class.php",
        data: {},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                $("#grade_item").html("");
                for (var i = 0; i < obj.grade.length; i++) {
                    var tmpdiv = document.createElement("a");
                    tmpdiv.setAttribute("class", "right_div_title_item_content_name cur_hand");
                    tmpdiv.setAttribute("onclick", "initLeft(" + obj.grade[i].m_id + ")");
                    tmpdiv.setAttribute("id", "grade" + obj.grade[i].m_id);
                    tmpdiv.innerHTML = obj.grade[i].m_name;
                    $("#grade_item").append(tmpdiv);
                    if (iid == "") {
                        g_active_grade = $("#grade" + obj.grade[i].m_id);
                        g_active_grade.addClass("active");
                        iid = obj.grade[i].m_id;
                        initLeft(iid);
                    }
                }
            }
        }
    });
}
function initLeft(id) {
    iid = id;
    g_exam = "";
    g_page = 0;
    g_question_position = 0;
    $("#questions-content").show();
    $("#questions-content").html("");
    $("#question_table").hide();
    $("#question_table_bottom").hide();
    if (g_active_grade != "" && g_active_grade.hasClass("active")) {
        g_active_grade.removeClass("active");
    }
    g_active_grade = $("#grade" + iid);
    g_active_grade.addClass("active");
    if ($("#type_1").hasClass("active")) {
        getChapter(id);
    } else if ($("#type_2").hasClass("active")) {
        getExams();
    }
}
function isInputShown(type) {
    if (type == 1) {
        if ($("#block_add_input").is(":hidden") && $("#exam_big_add_input").is(":hidden") && $("#exam_small_add_input").is(":hidden") && $("#exam_small_small_add_input").is(":hidden")) {
            return false;
        }
        return true;
    } else {
        if ($("#block_add_input").is(":hidden") && $("#exam_big_add_input").is(":hidden") && $("#exam_small_add_input").is(":hidden")) {
            return false;
        }
        return true;
    }
}
function getChapter(iid) {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "./action/chapter.class.php",
        data: {iid: iid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            // alert(JSON.stringify(msg));
            var obj = eval(msg);
            if (obj.Code == "1") {
                $("#browser").html("");
                if (obj.chapter.length != 0) {
                    for (var i = 0; i < obj.chapter.length; i++) {
                        var value = "<li><a class=\"cur_hand\">" + obj.chapter[i].name + "</a><ul id='chapter" + obj.chapter[i].id + "'></ul></li>";
                        addNewItem("browser", value);
                    }
                    for (var i = 0; i < obj.chapter.length; i++) {
                        getSection("chapter" + obj.chapter[i].id, obj.chapter[i].id);
                    }
                } else {
                    $("#questions-content").html("");
                    add_nothing();
                }
            }
        }
    });
}
function addNewItem(id, value) {
    var branches = $(value).appendTo("#" + id);
    $("#" + id).treeview({
        add: branches
    });
}
function insertToExams(id1, name1, id2, name2, id3, name3, id4, name4) {

}
function submitAddNewItem(id, section) {
    console.log("submit", "我再submitAddNewItem，g_submit_type=" + g_submit_type);
    //添加新题型的提交函数
    if (g_submit_edit_type == 1) {
        var tmp = g_current_final_exam;
        $div1.show();
        console.log("video", videoSelectUE.getContent());
        $.ajax({
            type: "POST",
            url: "./action/section_exam.class.php",
            data: {secid: section, eid: tmp, video: videoSelectUE.getContent()},
            dataType: "json",
            success: function (msg) {
                $div1.hide();
                var obj = eval(msg);
                alert(obj.Msg);
                if (obj.Code == "1") {
                    var value = "<li><a class=\"cur_hand black_on_blue\" id=\"tree_" + section + "_" + g_current_final_exam + "\" onclick=\"clickExam(" + section + "," + g_current_final_exam + ")\">" + g_current_final_exam_name + "</a></li>";
                    addNewItem(id, value);
                    $("#video_select_div").hide();
                }
            }
        });
    } else {
        if (isInputShown(1)) {
            alert("请填写空白处的内容");
            return false;
        }
        if (g_edits.edit_parent == "") {
            alert("填写有误，请重新填写");
            return false;
        }
        // console.log("submitAddNewItem", JSON.stringify(g_exams));
        console.log("parameter", JSON.stringify(g_edits));
        $div1.show();
        console.log("video", videoSelectUE.getContent());
        $.ajax({
            type: "POST",
            url: "./action/section_exam_input.class.php",
            data: {data: JSON.stringify(g_edits), video: videoSelectUE.getContent()},
            dataType: "json",
            success: function (msg) {
                // alert(JSON.stringify(msg));
                $div1.hide();
                console.log("MSG", JSON.stringify(msg));
                var obj = eval(msg);
                alert(obj.Msg);
                if (obj.Code == "1") {
                    var value = "<li><a class=\"cur_hand black_on_blue\" id=\"tree_" + section + "_" + obj.Id[3] + "\" onclick=\"clickExam(" + section + "," + obj.Id[3] + ")\">" + g_edits.edit_small_small + "</a></li>";
                    addNewItem(id, value);
                    $("#video_select_div").hide();
                }
            }
        });
    }
}
function submitModify(section, id) {
    console.log("submit", "我再submitAddNewItem，g_submit_type=" + g_submit_type);
    if (g_exam == "") {
        alert("请先在左侧选择章节");
        return false;
    }
    if (g_submit_edit_type == 1) {
        var tmp = g_edit_id_3;
        $div1.show();
        console.log("video", videoSelectUE.getContent());
        $.ajax({
            type: "POST",
            url: "./action/exam_update.class.php",
            data: {
                eid: g_exam,
                name: $("#exam_forth_" + g_exam).html(),
                parent: g_edit_id_3,
                video: videoSelectUE.getContent()
            },
            dataType: "json",
            success: function (msg) {
                $div1.hide();
                var obj = eval(msg);
                alert(obj.Msg);
                if (obj.Code == "1") {
                    $("#tree_" + section + "_" + id).html($("#exam_forth_" + g_exam).html());
                    $("#video_select_div").hide();
                }
            }
        });
    } else {
        if (isInputShown(2)) {
            alert("请填写空白处的内容");
            return false;
        }
        if (g_editu == null) {
            if (g_exam != "") {
                newEditu();
                g_editu.edit_parent = g_edit_id_3;
                g_editu.edit_small_small = $("#exam_forth_" + g_exam).html();
            } else {
                alert("请先从左侧章节目录中选择题型进行编辑");
                return false;
            }
        }
        $div1.show();
        g_editu.edit_small_small = $("#exam_forth_" + g_exam).html();
        console.log("parameter", JSON.stringify(g_editu));
        console.log("video", videoSelectUE.getContent());
        $.ajax({
            type: "POST",
            url: "./action/section_exam_update.class.php",
            data: {data: JSON.stringify(g_editu), video: videoSelectUE.getContent()},
            dataType: "json",
            success: function (msg) {
                // alert(JSON.stringify(msg));
                $div1.hide();
                console.log("MSG", JSON.stringify(msg));
                var obj = eval(msg);
                alert(obj.Msg);
                if (obj.Code == "1") {
                    $("#tree_" + section + "_" + id).html($("#exam_forth_" + g_exam).html());
                    $("#video_select_div").hide();
                }
            }
        });
    }
}

/*
 * 添加新题型的按钮的点击函数
 * */
function addNewExam(id, section) {
    g_section = section;
    closeEditText(1);
    closeEditText(2);
    closeEditText(3);
    closeEditText(4);
    videoSelectUE.setContent("");
    $("#video_select_div").hide();
    $(".blue_color").removeClass("blue_color");
    $("#tree_add_" + id).addClass("blue_color");
    g_current_work = "edit_exam";
    $("#submit_exam").attr("onclick", "submitAddNewItem('" + id + "'," + section + ")");
    g_submit_type = 1;
    hideOrShowInputDiv(1);
    $div1.show();
    $.ajax({
        type: "POST",
        url: "./action/exam_all_get.class.php",
        data: {iid: iid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            console.log("addNewExam", JSON.stringify(msg));
            var obj = eval(msg);
            if (obj.Code == "1") {
                g_exams = obj.exam;
                $(".exams").remove();
                if (g_exams.length == 0) {
                    showEditText(1);
                    showEditText(2);
                    showEditText(3);
                    showEditText(4);
                } else {
                    closeEditText(1);
                    closeEditText(2);
                    closeEditText(3);
                    closeEditText(4);
                    for (var i = 0; i < g_exams.length; i++) {
                        var newItem = document.createElement("a");
                        newItem.setAttribute("id", "exam_first_" + g_exams[i].m_id);
                        newItem.setAttribute("onclick", "clickEditExam(1," + g_exams[i].m_id + ",2,'exam_first_" + g_exams[i].m_id + "')");
                        newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
                        newItem.innerHTML = g_exams[i].m_name;
                        var list = document.getElementById("block_item");
                        list.insertBefore(newItem, list.lastElementChild);
                    }

                    for (var i = 0; g_exams.length > 0 && i < g_exams[0].m_exams.length; i++) {
                        var newItem = document.createElement("a");
                        newItem.setAttribute("id", "exam_second_" + g_exams[0].m_exams[i].m_id);
                        newItem.setAttribute("onclick", "clickEditExam(2," + g_exams[0].m_exams[i].m_id + ",2,'exam_second_" + g_exams[0].m_exams[i].m_id + "')");
                        newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
                        newItem.innerHTML = g_exams[0].m_exams[i].m_name;
                        var list = document.getElementById("exam_big");
                        list.insertBefore(newItem, list.lastElementChild);
                    }

                    for (var i = 0; g_exams.length > 0 && g_exams[0].m_exams.length > 0 && i < g_exams[0].m_exams[0].m_exams.length; i++) {
                        var newItem = document.createElement("a");
                        newItem.setAttribute("id", "exam_third_" + g_exams[0].m_exams[0].m_exams[i].m_id);
                        newItem.setAttribute("onclick", "clickEditExam(3," + g_exams[0].m_exams[0].m_exams[i].m_id + ",2,'exam_third_" + g_exams[0].m_exams[0].m_exams[i].m_id + "')");
                        newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
                        newItem.innerHTML = g_exams[0].m_exams[0].m_exams[i].m_name;
                        var list = document.getElementById("exam_small");
                        list.insertBefore(newItem, list.lastElementChild);
                    }

                    for (var i = 0; g_exams.length > 0 && g_exams[0].m_exams.length > 0 && g_exams[0].m_exams[0].m_exams.length > 0 && i < g_exams[0].m_exams[0].m_exams[0].m_exams.length; i++) {
                        var newItem = document.createElement("a");
                        newItem.setAttribute("id", "exam_forth_" + g_exams[0].m_exams[0].m_exams[0].m_exams[i].m_id);
                        newItem.setAttribute("onclick", "clickEditExam(4," + g_exams[0].m_exams[0].m_exams[0].m_exams[i].m_id + ",2,'exam_forth_" + g_exams[0].m_exams[0].m_exams[0].m_exams[i].m_id + "')");
                        newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
                        newItem.innerHTML = g_exams[0].m_exams[0].m_exams[0].m_exams[i].m_name;
                        var list = document.getElementById("exam_smallsmall");
                        list.insertBefore(newItem, list.lastElementChild);
                    }
                }
            }
        }
    });
}
/*
 * 添加新题型函数
 * */
function addEditExam(id, section) {
    var value = "<li hidden class='new_exam_li'><a class=\"cur_hand black_on_blue\" id=\"tree_add_" + id + "\" onclick=\"addNewExam('" + id + "'," + section + ",'tree_add_" + id + "')\">添加新题型</a></li>";
    addNewItem(id, value);
}
function addEditExamcheck(id, section) {
    if (g_user.m_lv == "1") {
        addEditExam(id, section);
    }
}
function addExam(id, exams, section) {
    // alert("in");
    for (var i = 0; i < exams.length; i++) {
        var value = "<li><a class=\"cur_hand black_on_blue\" id=\"tree_" + section + "_" + exams[i].m_id + "\" onclick=\"clickExam(" + section + "," + exams[i].m_id + ")\">" + exams[i].m_name + "</a></li>";
        addNewItem(id, value);
        if (g_exam == "") {
            g_exam = exams[i].m_id;
            $(".blue_color").removeClass("blue_color");
            $("#tree_" + exams[i].m_id).addClass("blue_color");
            getQuestion();
        }
    }
    addEditExamcheck(id, section);

}
function clickExam(section, id) {
    g_exam = id;
    g_page = 0;
    g_question_position = 0;
    g_section = section;
    $(".blue_color").removeClass("blue_color");
    $("#tree_" + section + "_" + id).addClass("blue_color");
    //
    if (g_current_work == "edit_exam") {
        closeEditText(1);
        closeEditText(2);
        closeEditText(3);
        closeEditText(4);
        editExamCheck(section, id);
    } else if (g_current_work != "upload") {
        $("#questions-content").show();
        $("#questions-content").html("");
        $("#question_table").hide();
        $("#question_table_bottom").hide();
        $("#question_add_item").show();
        getQuestion();
    }
}
function addSection(id, array) {
    for (var i = 0; i < array.length; i++) {
        var value;
        value = "<li><a class=\"cur_hand\">" + array[i].m_name + "</a><ul id='section" + array[i].m_id + "'></ul></li>";
        addNewItem(id, value);
        if (array[i].m_sections.length != 0) {
            addSection("section" + array[i].m_id, array[i].m_sections);
        } else {
            // alert("here" + array[i].m_id + "," + array[i].m_exams + "," + array[i].m_id);
            addExam("section" + array[i].m_id, array[i].m_exams, array[i].m_id);
        }
    }
}
function getSection(id, cid) {
    $.ajax({
        type: "POST",
        url: "./action/section_all_get.class.php",
        data: {cid: cid},
        dataType: "json",
        success: function (msg) {
            // alert(JSON.stringify(msg));
            var obj = eval(msg);
            if (obj.Code == "1") {
                addSection(id, obj.section.m_sections);
            }
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
function add_choice_item(i, id, question, selecta, selectb, selectc, selectd, answer, analyse, solution, video) {
    var question_item = document.createElement('div');
    question_item.setAttribute("class", "question-item");
    var question_item_title = document.createElement('div');
    question_item_title.setAttribute("class", "question_title cur_hand");
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

    var block2 = document.createElement('div');
    block2.setAttribute("class", "cur_hand inline-block-style");
    var block2_1 = document.createElement('div');
    block2_1.setAttribute("class", "question_bottom_block_1");
    var block2_1_img = document.createElement('img');
    block2_1_img.setAttribute("class", "question_edit_img");
    block2_1_img.setAttribute("src", "./image/question_view.png");
    block2_1.append(block2_1_img);
    var block2_2 = document.createElement('div');
    block2_2.setAttribute("class", "question_bottom_block_2");
    var block2_2_img = document.createElement('a');
    block2_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block2_2_img.innerHTML = "<strong>查看</strong>";
    block2_2_img.setAttribute("onClick", "viewQuestionCheck(" + id + ")");
    block2_2.append(block2_2_img);
    block2.append(block2_1);
    block2.append(block2_2);

    var block3 = document.createElement('div');
    block3.setAttribute("class", "cur_hand inline-block-style");
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
    block3_2_img.setAttribute("onClick", "deleteQuestionCheck(" + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    var block4 = document.createElement('div');
    block4.setAttribute("class", "cur_hand inline-block-style");
    var block4_1 = document.createElement('div');
    block4_1.setAttribute("class", "question_bottom_block_1");
    var block4_1_img = document.createElement('img');
    block4_1_img.setAttribute("class", "question_edit_img");
    block4_1_img.setAttribute("src", "./image/question_add.png");
    block4_1_img.setAttribute("id", "question_img_" + i);
    block4_1.append(block4_1_img);
    var block4_2 = document.createElement('div');
    block4_2.setAttribute("class", "question_bottom_block_2");
    var block4_2_img = document.createElement('a');
    block4_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block4_2_img.innerHTML = "<strong>加入试题蓝</strong>";
    block4_2_img.setAttribute("id", "question_text_" + i);
    // alert("addToQuiz('question_img_" + i + "'," + "'question_text_" + i + "','" + id + "','1','" + question + "','" + selecta + "','" + selectb + "','" + selectc + "','" + selectd + "','" + answer + "','" + analyse + "','" + solution + "','" + video + "')");
    block4_2.append(block4_2_img);
    block4.append(block4_1);
    block4.append(block4_2);

    question_item_bottom.append(block2);
    question_item_bottom.append(block3);
    question_item_bottom.append(block4);
    question_item.append(question_item_title);
    question_item.append(question_item_select_ab);
    question_item.append(question_item_select_cd);
    question_item.append(question_item_bottom);
    $("#questions-content").append(question_item);
    checkQuestionIfInQuiz("question_img_" + i, "question_text_" + i, id, '1', question, selecta, selectb, selectc, selectd, answer, analyse, solution, video);
}
function add_fillin_item(i, id, question, answer, analyse, solution, video) {
    var question_item = document.createElement('div');
    question_item.setAttribute("class", "question-item");
    var question_item_title = document.createElement('div');
    question_item_title.setAttribute("class", "question_title cur_hand");
    question_item_title.innerHTML = "<strong>" + i + "．</strong></span>" + question;

    var question_item_bottom = document.createElement('div');
    question_item_bottom.setAttribute("class", "question_bottom");

    var block2 = document.createElement('div');
    block2.setAttribute("class", "cur_hand inline-block-style");
    var block2_1 = document.createElement('div');
    block2_1.setAttribute("class", "question_bottom_block_1");
    var block2_1_img = document.createElement('img');
    block2_1_img.setAttribute("class", "question_edit_img");
    block2_1_img.setAttribute("src", "./image/question_view.png");
    block2_1.append(block2_1_img);
    var block2_2 = document.createElement('div');
    block2_2.setAttribute("class", "question_bottom_block_2");
    var block2_2_img = document.createElement('a');
    block2_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block2_2_img.innerHTML = "<strong>查看</strong>";
    block2_2_img.setAttribute("onClick", "viewQuestionCheck(" + id + ")");
    block2_2.append(block2_2_img);
    block2.append(block2_1);
    block2.append(block2_2);

    var block3 = document.createElement('div');
    block3.setAttribute("class", "cur_hand inline-block-style");
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
    block3_2_img.setAttribute("onClick", "deleteQuestionCheck(" + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    var block4 = document.createElement('div');
    block4.setAttribute("class", "cur_hand inline-block-style");
    var block4_1 = document.createElement('div');
    block4_1.setAttribute("class", "question_bottom_block_1");
    var block4_1_img = document.createElement('img');
    block4_1_img.setAttribute("class", "question_edit_img");
    block4_1_img.setAttribute("src", "./image/question_add.png");
    block4_1_img.setAttribute("id", "question_img_" + i);
    block4_1.append(block4_1_img);
    var block4_2 = document.createElement('div');
    block4_2.setAttribute("class", "question_bottom_block_2");
    var block4_2_img = document.createElement('a');
    block4_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block4_2_img.innerHTML = "<strong>加入试题蓝</strong>";
    block4_2_img.setAttribute("id", "question_text_" + i);
    block4_2.append(block4_2_img);
    block4.append(block4_1);
    block4.append(block4_2);

    question_item_bottom.append(block2);
    question_item_bottom.append(block3);
    question_item_bottom.append(block4);

    question_item.append(question_item_title);
    question_item.append(question_item_bottom);
    $("#questions-content").append(question_item);
    checkQuestionIfInQuiz("question_img_" + i, "question_text_" + i, id, '2', question, '', '', '', '', answer, analyse, solution, video);
}
function add_answer_item(i, id, question, answer, analyse, solution, video) {
    var question_item = document.createElement('div');
    question_item.setAttribute("class", "question-item");
    var question_item_title = document.createElement('div');
    question_item_title.setAttribute("class", "question_title cur_hand");
    question_item_title.innerHTML = "<strong>" + i + "．</strong></span>" + question;

    var question_item_bottom = document.createElement('div');
    question_item_bottom.setAttribute("class", "question_bottom");

    var block2 = document.createElement('div');
    block2.setAttribute("class", "cur_hand inline-block-style");
    var block2_1 = document.createElement('div');
    block2_1.setAttribute("class", "question_bottom_block_1");
    var block2_1_img = document.createElement('img');
    block2_1_img.setAttribute("class", "question_edit_img");
    block2_1_img.setAttribute("src", "./image/question_view.png");
    block2_1.append(block2_1_img);
    var block2_2 = document.createElement('div');
    block2_2.setAttribute("class", "question_bottom_block_2");
    var block2_2_img = document.createElement('a');
    block2_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block2_2_img.innerHTML = "<strong>查看</strong>";
    block2_2_img.setAttribute("onClick", "viewQuestionCheck(" + id + ")");
    block2_2.append(block2_2_img);
    block2.append(block2_1);
    block2.append(block2_2);

    var block3 = document.createElement('div');
    block3.setAttribute("class", "cur_hand inline-block-style");
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
    block3_2_img.setAttribute("onClick", "deleteQuestionCheck(" + id + ")");
    block3_2.append(block3_2_img);
    block3.append(block3_1);
    block3.append(block3_2);

    var block4 = document.createElement('div');
    block4.setAttribute("class", "cur_hand inline-block-style");
    var block4_1 = document.createElement('div');
    block4_1.setAttribute("class", "question_bottom_block_1");
    var block4_1_img = document.createElement('img');
    block4_1_img.setAttribute("class", "question_edit_img");
    block4_1_img.setAttribute("src", "./image/question_add.png");
    block4_1_img.setAttribute("id", "question_img_" + i);
    block4_1.append(block4_1_img);
    var block4_2 = document.createElement('div');
    block4_2.setAttribute("class", "question_bottom_block_2");
    var block4_2_img = document.createElement('a');
    block4_2_img.setAttribute("class", "question_edit_text blue_on_deep");
    block4_2_img.innerHTML = "<strong>加入试题蓝</strong>";
    block4_2_img.setAttribute("id", "question_text_" + i);
    block4_2.append(block4_2_img);
    block4.append(block4_1);
    block4.append(block4_2);
    question_item_bottom.append(block2);
    question_item_bottom.append(block3);
    question_item_bottom.append(block4);
    question_item.append(question_item_title);
    question_item.append(question_item_bottom);
    $("#questions-content").append(question_item);
    checkQuestionIfInQuiz("question_img_" + i, "question_text_" + i, id, '3', question, '', '', '', '', answer, analyse, solution, video);
}
function getQuestion() {
    $div1.show();
    g_current_work = "show";
    $.ajax({
        type: "POST",
        url: "./action/questions.class.php",
        data: {type: g_type, eid: g_exam, page: g_page},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                if (obj.type == "1") {
                    if (obj.question.length == 0 && g_page == 0) {
                        $("#questions-content").html("");
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
                            add_choice_item(++g_question_position, obj.question[i].id, obj.question[i].question, obj.question[i].select_a, obj.question[i].select_b, obj.question[i].select_c, obj.question[i].select_d, obj.question[i].answer, obj.question[i].analyse, obj.question[i].solution, obj.question[i].video_url);
                        }
                        fun();
                    }
                } else if (obj.type == "2") {
                    if (obj.question.length == 0 && g_page == 0) {
                        $("#questions-content").html("");
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
                            add_fillin_item(++g_question_position, obj.question[i].id, obj.question[i].question, obj.question[i].answer, obj.question[i].analyse, obj.question[i].solution, obj.question[i].video_url);
                        }
                        fun();
                    }
                } else if (obj.type == "3") {
                    if (obj.question.length == 0 && g_page == 0) {
                        $("#questions-content").html("");
                        add_nothing();
                    } else {
                        for (var i = 0; i < obj.question.length; i++) {
                            add_answer_item(++g_question_position, obj.question[i].id, obj.question[i].question, obj.question[i].answer, obj.question[i].analyse, obj.question[i].solution, obj.question[i].video_url);
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
        }
    });
}
function backQuestion() {
    $("#questions-content").html("");
    g_page = 0;
    g_question_position = 0;
    getQuestion();
}
function deleteQuestion(id) {
    if (g_user == null) {
        alert("您还未登录,请先登录");
        return false;
    }
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/question_delete.class.php",
        data: {type: g_type, qid: id},
        dataType: "json",
        success: function (msg) {
            var obj = eval(msg);
            $div1.hide();
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("删除成功");
                g_page = 0;
                g_question_position = 0;
                $("#questions-content").html("");
                getQuestion();
            }
        }
    });
}
function deleteQuestionCheck(id) {
    if (g_user.m_lv == "1" || g_user.m_lv == "2" || g_user.m_lv == "3") {
        deleteQuestion(id);
    } else {
        showErrorMsg(1);
    }
}
function viewQuestion(id) {
    $div1.show();
    g_current_work = "view";
    $.ajax({
        type: "POST",
        url: "./action/question.class.php",
        data: {type: g_type, id: id},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                $("#questions-content").html("");
                var question_item = document.createElement("div");
                question_item.setAttribute("class", "question-item");

                var question_title = document.createElement("div");
                question_title.setAttribute("class", "question_title cur_hand");
                question_title.setAttribute("id", "question");
                question_title.innerHTML = "<a class=\"question_content_title\">【题目】</a>";
                question_item.append(question_title);

                var question_item_select_ab = document.createElement('div');
                question_item_select_ab.setAttribute("class", "question_select_abcd");
                var selecta = document.createElement("div");
                selecta.setAttribute("class", "question_select");
                selecta.setAttribute("id", "select_a");
                selecta.innerHTML = "<strong>A. </strong>";
                var selectb = document.createElement("div");
                selectb.setAttribute("class", "question_select");
                selectb.setAttribute("id", "select_b");
                selectb.innerHTML = "<strong>B. </strong>";
                question_item_select_ab.append(selecta);
                question_item_select_ab.append(selectb);
                question_item.append(question_item_select_ab);

                var question_item_select_cd = document.createElement('div');
                question_item_select_cd.setAttribute("class", "question_select_abcd");
                var selectc = document.createElement("div");
                selectc.setAttribute("class", "question_select");
                selectc.setAttribute("id", "select_c");
                selectc.innerHTML = "<strong>C. </strong>";
                var selectd = document.createElement("div");
                selectd.setAttribute("class", "question_select");
                selectd.setAttribute("id", "select_d");
                selectd.innerHTML = "<strong>D. </strong>";
                question_item_select_cd.append(selectc);
                question_item_select_cd.append(selectd);
                question_item.append(question_item_select_cd);

                var hr = document.createElement("hr");
                hr.setAttribute("class", "question_line");
                question_item.append(hr);

                var question_con = document.createElement("div");
                question_con.setAttribute("class", "question_title");
                var answer_con = document.createElement("div");
                answer_con.setAttribute("class", "content_left");
                answer_con.setAttribute("id", "answer");
                answer_con.innerHTML = "<a class=\"question_content_title\">【答案】</a>";
                question_con.append(answer_con);
                var analyse_con = document.createElement("div");
                analyse_con.setAttribute("class", "content_left");
                analyse_con.setAttribute("id", "analyse");
                analyse_con.innerHTML = "<a class=\"question_content_title\">【分析】</a>";
                question_con.append(analyse_con);
                var solution_con = document.createElement("div");
                solution_con.setAttribute("class", "content_left");
                solution_con.setAttribute("id", "solution");
                solution_con.innerHTML = "<a class=\"question_content_title\">【解答】</a>";
                question_con.append(solution_con);
                question_item.append(question_con);

                var question_item_bottom = document.createElement('div');
                question_item_bottom.setAttribute("class", "question_bottom");

                var block4 = document.createElement('div');
                block4.setAttribute("class", "cur_hand inline-block-style");
                var block4_1 = document.createElement('div');
                block4_1.setAttribute("class", "question_bottom_block_1");
                var block4_1_img = document.createElement('img');
                block4_1_img.setAttribute("class", "question_edit_img");
                block4_1_img.setAttribute("src", "./image/question_add.png");
                block4_1_img.setAttribute("id", "question_img_" + id);
                block4_1.append(block4_1_img);
                var block4_2 = document.createElement('div');
                block4_2.setAttribute("class", "question_bottom_block_2");
                var block4_2_img = document.createElement('a');
                block4_2_img.setAttribute("class", "question_edit_text blue_on_deep");
                block4_2_img.innerHTML = "<strong>加入试题蓝</strong>";
                block4_2_img.setAttribute("id", "question_text_" + id);
                // block4_2_img.setAttribute("onClick", "addToQuiz('question_img_" + id + "'," + "'question_text_" + id + "','" + id + "','" + g_type + "','" + obj.question[0]["question"] + "','" + obj.question[0]["select_a"] + "','" + obj.question[0]["select_b"] + "','" + obj.question[0]["select_c"] + "','" + obj.question[0]["select_d"] + "','" + obj.question[0]["answer"] + "','" + obj.question[0]["analyse"] + "','" + obj.question[0]["solution"] + "','" + obj.question[0]["video_url"] + "')");
                block4_2.append(block4_2_img);
                block4.append(block4_1);
                block4.append(block4_2);

                var block5 = document.createElement('div');
                block5.setAttribute("class", "cur_hand inline-block-style");
                var block5_1 = document.createElement('div');
                block5_1.setAttribute("class", "question_bottom_block_1");
                var block5_1_img = document.createElement('img');
                block5_1_img.setAttribute("class", "question_edit_img");
                block5_1_img.setAttribute("src", "./image/question_back.png");
                block5_1.append(block5_1_img);
                var block5_2 = document.createElement('div');
                block5_2.setAttribute("class", "question_bottom_block_2");
                var block5_2_img = document.createElement('a');
                block5_2_img.setAttribute("class", "question_edit_text blue_on_deep");
                block5_2_img.innerHTML = "<strong>返回</strong>";
                block5_2_img.setAttribute("onClick", "backQuestion()");
                block5_2.append(block5_2_img);
                block5.append(block5_1);
                block5.append(block5_2);

                question_item_bottom.append(block4);
                question_item_bottom.append(block5);

                question_item.append(question_item_bottom);
                $("#questions-content").append(question_item);

                if (obj.type == "1") {
                    $(".question_select_abcd").show();
                    $("#select_a").html($("#select_a").html() + obj.question[0]["select_a"]);
                    $("#select_b").html($("#select_b").html() + obj.question[0]["select_b"]);
                    $("#select_c").html($("#select_c").html() + obj.question[0]["select_c"]);
                    $("#select_d").html($("#select_d").html() + obj.question[0]["select_d"]);
                } else {
                    $(".question_select_abcd").hide();
                }
                $("#question").html($("#question").html() + obj.question[0]["question"]);
                $("#answer").html($("#answer").html() + obj.question[0]["answer"]);
                $("#analyse").html($("#analyse").html() + obj.question[0]["analyse"]);
                $("#solution").html($("#solution").html() + obj.question[0]["solution"]);

                checkQuestionIfInQuiz("question_img_" + id, "question_text_" + id, id, g_type, obj.question[0]["question"], obj.question[0]["select_a"], obj.question[0]["select_b"], obj.question[0]["select_c"], obj.question[0]["select_d"], obj.question[0]["answer"], obj.question[0]["analyse"], obj.question[0]["solution"], obj.question[0]["video_url"]);
                fun();
            } else {
                alert(obj.Msg);
            }
        }
    });
}
function viewQuestionCheck(id) {
    if (g_user.m_lv == "1" || g_user.m_lv == "2" || g_user.m_lv == "3" || g_user.m_lv == "4" || g_user.m_lv == "5") {
        viewQuestion(id);
    } else {
        showErrorMsg(1);
    }
}
function newQuiz() {
    g_quiz = new Object();
    g_quiz.quiz_name = "未命名";
    g_quiz.quiz_content = new Array();
}
function updateQuizNumber() {
    var choice_num = 0;
    var fillin_num = 0;
    var answer_num = 0;
    for (var i = 0; i < g_quiz.quiz_content.length; i++) {
        if (g_quiz.quiz_content[i].quiz_type == "1") {
            choice_num++;
        } else if (g_quiz.quiz_content[i].quiz_type == "2") {
            fillin_num++;
        } else if (g_quiz.quiz_content[i].quiz_type == "3") {
            answer_num++;
        }
    }
    $("#choice_number").html(choice_num + "");
    $("#fillin_number").html(fillin_num + "");
    $("#answer_number").html(answer_num + "");
}
function uploadNewQuestion() {
    if (g_user == "") {
        alert("您还未登录,请先登录");
        return false;
    }
    $("#questions-content").html("");
    $("#questions-content").hide();
    $("#question_table").show();
    $("#question_table_bottom").show();
    g_current_work = "upload";
    if (g_type == "1") {
        $("#choice_tr").show();
        $("#fillin_answer_tr").hide();
        $("#selsection_tr").show();
    } else {
        $("#choice_tr").hide();
        $("#fillin_answer_tr").show();
        $("#selsection_tr").hide();
    }
    $("#question_add_item").hide();
}
function uploadNewQuestionCheck() {
    if (g_user.m_lv == "1" || g_user.m_lv == "2" || g_user.m_lv == "3") {
        uploadNewQuestion();
    } else {
        showErrorMsg(1);
    }
}
function updateImgText(can, img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video) {
    if (can == 1) {
        var img_ = document.getElementById(img);
        img_.setAttribute("src", "./image/question_add.png");
        var text_ = document.getElementById(text);
        text_.innerHTML = "加入试题蓝";
        text_.setAttribute("class", "question_edit_text blue_on_deep");
        text_.setAttribute("onclick", "addToQuiz('" + img + "','" + text + "','" + id + "','" + type + "','" + question + "','" + select_a + "','" + select_b + "','" + select_c + "','" + select_d + "','" + answer + "','" + analyse + "','" + solution + "','" + video + "')")
    } else {
        var img_ = document.getElementById(img);
        img_.setAttribute("src", "./image/question_remove.png");
        var text_ = document.getElementById(text);
        text_.innerHTML = "移除";
        text_.setAttribute("class", "question_edit_text red_on_deep");
        text_.setAttribute("onclick", "removeFromQuiz('" + img + "','" + text + "','" + id + "','" + type + "','" + question + "','" + select_a + "','" + select_b + "','" + select_c + "','" + select_d + "','" + answer + "','" + analyse + "','" + solution + "','" + video + "')")
    }
}
function removeFromQuiz(img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video) {
    for (var i = 0; i < g_quiz.quiz_content.length; i++) {
        if (g_quiz.quiz_content[i].quiz_type == type && g_quiz.quiz_content[i].quiz_id == id) {
            g_quiz.quiz_content.splice(i, 1);
            break;
        }
    }
    updateQuizNumber();
    updateImgText(1, img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video);
}
function addToQuiz(img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video) {
    if (g_user == null) {
        alert("您还未登录,请先登录");
        return false;
    }
    if (g_quiz == "") {
        newQuiz();
    }
    var tmp = new Object();
    tmp.quiz_id = id;
    tmp.quiz_type = type;
    tmp.quiz_question = question;
    tmp.quiz_select_a = select_a;
    tmp.quiz_select_b = select_b;
    tmp.quiz_select_c = select_c;
    tmp.quiz_select_d = select_d;
    tmp.quiz_answer = answer;
    tmp.quiz_analyse = analyse;
    tmp.quiz_solution = solution;
    tmp.quiz_video = video;
    tmp.quiz_exam = g_exam;

    // alert(id + "," + type + "," + question + "," + select_a + "," + select_b + "," + select_c + "," + select_d + "," + answer + "," + analyse + "," + solution + "," + video);

    g_quiz.quiz_content.push(tmp);
    updateQuizNumber();
    updateImgText(0, img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video);
}
function checkQuestionIfInQuiz(img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video) {
    if (g_quiz == "") {
        updateImgText(1, img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video);
        return false;
    }
    for (var i = 0; i < g_quiz.quiz_content.length; i++) {
        if (g_quiz.quiz_content[i].quiz_id == id && g_quiz.quiz_content[i].quiz_type == g_type) {
            updateImgText(0, img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video);
            return;
        }
    }
    updateImgText(1, img, text, id, type, question, select_a, select_b, select_c, select_d, answer, analyse, solution, video);
}
function removeQuestionFromQuiz(i) {
    g_quiz.quiz_content.splice(i, 1);
    $("#questions-content").html("");
    showQuiz();
}
function showQuiz() {
    if (g_quiz == "") {
        alert("请先添加试题");
        return false;
    }
    $("#questions-content").show();
    $("#questions-content").html("");
    g_question_position = 0;
    g_page = 0;
    g_current_work = "show_quiz";
    $("#question_table").hide();
    $("#question_table_bottom").hide();
    $("#question_add_item").show();

    var title = document.createElement("div");
    title.setAttribute("class", "quiz_title");
    title.setAttribute("contenteditable", "true");
    title.setAttribute("id", "quiz_title");
    title.setAttribute("placeholder", "在此输入试卷名称");
    title.innerHTML = g_quiz.quiz_name;
    $("#questions-content").append(title);

    for (var i = 0; i < g_quiz.quiz_content.length; i++) {
        if (g_quiz.quiz_content[i].quiz_type == "1") {
            var question_item = document.createElement('div');
            question_item.setAttribute("class", "question-item");
            var question_item_title = document.createElement('div');
            question_item_title.setAttribute("class", "question_title cur_hand");
            question_item_title.innerHTML = "<strong>" + (i + 1) + "．</strong></span>" + g_quiz.quiz_content[i].quiz_question;
            var question_item_select_ab = document.createElement('div');
            question_item_select_ab.setAttribute("class", "question_select_abcd");
            var question_item_select_a = document.createElement('div');
            question_item_select_a.setAttribute("class", "question_select");
            question_item_select_a.innerHTML = "<strong>A．</strong>" + g_quiz.quiz_content[i].quiz_select_a;
            var question_item_select_b = document.createElement('div');
            question_item_select_b.setAttribute("class", "question_select");
            question_item_select_b.innerHTML = "<strong>B．</strong>" + g_quiz.quiz_content[i].quiz_select_b;
            question_item_select_ab.append(question_item_select_a);
            question_item_select_ab.append(question_item_select_b);
            var question_item_select_cd = document.createElement('div');
            question_item_select_cd.setAttribute("class", "question_select_abcd");
            var question_item_select_c = document.createElement('div');
            question_item_select_c.setAttribute("class", "question_select");
            question_item_select_c.innerHTML = "<strong>C．</strong>" + g_quiz.quiz_content[i].quiz_select_c;
            var question_item_select_d = document.createElement('div');
            question_item_select_d.setAttribute("class", "question_select");
            question_item_select_d.innerHTML = "<strong>D．</strong>" + g_quiz.quiz_content[i].quiz_select_d;
            question_item_select_cd.append(question_item_select_c);
            question_item_select_cd.append(question_item_select_d);

            var question_item_bottom = document.createElement('div');
            question_item_bottom.setAttribute("class", "question_bottom");

            var block3 = document.createElement('div');
            block3.setAttribute("class", "cur_hand inline-block-style");
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
            block3_2_img.innerHTML = "<strong>从该试卷中移除</strong>";
            block3_2_img.setAttribute("onClick", "removeQuestionFromQuiz(" + i + ")");
            block3_2.append(block3_2_img);
            block3.append(block3_1);
            block3.append(block3_2);

            question_item_bottom.append(block3);
            question_item.append(question_item_title);
            question_item.append(question_item_select_ab);
            question_item.append(question_item_select_cd);
            question_item.append(question_item_bottom);
            $("#questions-content").append(question_item);
        } else {
            var question_item = document.createElement('div');
            question_item.setAttribute("class", "question-item");
            var question_item_title = document.createElement('div');
            question_item_title.setAttribute("class", "question_title cur_hand");
            question_item_title.innerHTML = "<strong>" + (i + 1) + "．</strong></span>" + g_quiz.quiz_content[i].quiz_question;

            var question_item_bottom = document.createElement('div');
            question_item_bottom.setAttribute("class", "question_bottom");

            var block3 = document.createElement('div');
            block3.setAttribute("class", "cur_hand inline-block-style");
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
            block3_2_img.innerHTML = "<strong>从该试卷中移除</strong>";
            block3_2_img.setAttribute("onClick", "removeQuestionFromQuiz(" + i + ")");
            block3_2.append(block3_2_img);
            block3.append(block3_1);
            block3.append(block3_2);

            question_item_bottom.append(block3);
            question_item.append(question_item_title);
            question_item.append(question_item_bottom);
            $("#questions-content").append(question_item);
        }
    }

    var submit = document.createElement("div");
    submit.setAttribute("class", "submit_bottom");

    var b3 = document.createElement('div');
    b3.setAttribute("class", "cur_hand inline-block-style");
    var b3_1 = document.createElement('div');
    b3_1.setAttribute("class", "question_bottom_block_1");
    var b3_1_img = document.createElement('img');
    b3_1_img.setAttribute("class", "question_edit_img");
    b3_1_img.setAttribute("src", "./image/submit_img.png");
    b3_1.append(b3_1_img);
    var b3_2 = document.createElement('div');
    b3_2.setAttribute("class", "question_bottom_block_2");
    var b3_2_img = document.createElement('a');
    b3_2_img.setAttribute("class", "question_edit_text white_on_deep");
    b3_2_img.innerHTML = "<strong>快速提交试卷</strong>";
    b3_2_img.setAttribute("onClick", "uploadQuizCheck()");
    b3_2.append(b3_2_img);
    b3.append(b3_1);
    b3.append(b3_2);

    var b4 = document.createElement('div');
    b4.setAttribute("class", "cur_hand inline-block-style");
    var b4_1 = document.createElement('div');
    b4_1.setAttribute("class", "question_bottom_block_1");
    var b4_1_img = document.createElement('img');
    b4_1_img.setAttribute("class", "question_edit_img");
    b4_1_img.setAttribute("src", "./image/question_back_white.png");
    b4_1.append(b4_1_img);
    var b4_2 = document.createElement('div');
    b4_2.setAttribute("class", "question_bottom_block_2");
    var b4_2_img = document.createElement('a');
    b4_2_img.setAttribute("class", "question_edit_text white_on_deep");
    b4_2_img.innerHTML = "<strong>返回</strong>";
    b4_2_img.setAttribute("onClick", "backQuestion()");
    b4_2.append(b4_2_img);
    b4.append(b4_1);
    b4.append(b4_2);

    submit.append(b3);
    submit.append(b4);
    $("#questions-content").append(submit);
    fun();
}
function uploadQuiz() {
    g_quiz.quiz_name = $("#quiz_title").html();
    console.log('来吧', JSON.stringify(g_quiz));

    $div1.show();
    $.ajax({
        type: "POST",
        url: "./action/quiz_upload.class.php",
        data: {quiz: JSON.stringify(g_quiz)},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            alert(obj.Msg);
            if (obj.Code == "1") {
                g_quiz.quiz_content.splice(0, g_quiz.quiz_content.length);
                updateQuizNumber();
                g_question_position = 0;
                g_page = 0;
                g_current_work = "show";
                $("#questions-content").html("");
                getQuestion();
            }
        }
    });
}
function viewQuizs() {

}
function viewQuizsCheck() {
    if (g_user.m_lv == "1" || g_user.m_lv == "2" || g_user.m_lv == "3") {
        viewQuizs();
    } else {
        showErrorMsg(1);
    }
}
function uploadQuizCheck() {
    if (g_user.m_lv == "1" || g_user.m_lv == "2" || g_user.m_lv == "3") {
        uploadQuiz();
    } else {
        showErrorMsg(1);
    }
}
function containExam(object) {
    if (object.m_id == g_exam) {
        return 1;
    }
    for (var i = 0; i < object.m_exams.length; i++) {
        if (containExam(object.m_exams[i]) != 3) {
            return 2;
        }
    }
    return 3;
}
function getObjectById(id, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].m_id == id) {
            return array[i];
        } else {
            var tmp = getObjectById(id, array[i].m_exams);
            if (tmp != null) {
                return tmp;
            }
        }
    }
    return null;
}
function removeExams(type) {
    if (type == 1) {
        $("#block_item .exams").remove();
        $("#exam_big .exams").remove();
        $("#exam_small .exams").remove();
        $("#exam_smallsmall .exams").remove();
    } else if (type == 2) {
        $("#exam_big .exams").remove();
        $("#exam_small .exams").remove();
        $("#exam_smallsmall .exams").remove();
    } else if (type == 3) {
        $("#exam_small .exams").remove();
        $("#exam_smallsmall .exams").remove();
    } else if (type == 4) {
        $("#exam_smallsmall .exams").remove();
    }
}
function hideOrShowInputDiv(type) {
    if (type == 1) {
        $("#exam_last_div_4").show();
    } else {
        $("#exam_last_div_4").hide();
    }
}
function updateEditExam(order, object) {
    if (order == 1) {
        removeExams(1);
        for (var i = 0; i < object.m_exams.length; i++) {
            var newItem = document.createElement("a");
            newItem.setAttribute("id", "exam_first_" + object.m_exams[i].m_id);
            newItem.setAttribute("onclick", "clickEditExam(1," + object.m_exams[i].m_id + ",1,exam_first_" + object.m_exams[i].m_id + ")");
            if (i == 0) {
                newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                g_edit_object_1 = $("#exam_first_" + object.m_exams[i].m_id);
                g_edit_oldname_1 = g_edit_object_1.html();
                g_edit_id_1 = object.m_exams[i].m_id;
            } else {
                newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
            }
            newItem.innerHTML = object.m_exams[i].m_name;
            var list = document.getElementById("block_item");
            list.insertBefore(newItem, list.lastElementChild);
        }
        if (object.m_exams.length != 0) {
            updateEditExam(2, object.m_exams[0]);
        }
    } else if (order == 2) {
        removeExams(2);
        for (var i = 0; i < object.m_exams.length; i++) {
            var newItem = document.createElement("a");
            newItem.setAttribute("id", "exam_second_" + object.m_exams[i].m_id);
            newItem.setAttribute("onclick", "clickEditExam(2," + object.m_exams[i].m_id + ",1,exam_second_" + object.m_exams[i].m_id + ")");
            if (i == 0) {
                newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                g_edit_object_2 = $("#exam_second_" + object.m_exams[i].m_id);
                g_edit_oldname_2 = g_edit_object_2.html();
                g_edit_id_2 = object.m_exams[i].m_id;
            } else {
                newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
            }
            newItem.innerHTML = object.m_exams[i].m_name;
            var list = document.getElementById("exam_big");
            list.insertBefore(newItem, list.lastElementChild);
        }
        if (object.m_exams.length != 0) {
            updateEditExam(3, object.m_exams[0]);
        }
    } else if (order == 3) {
        removeExams(3);
        for (var i = 0; i < object.m_exams.length; i++) {
            var newItem = document.createElement("a");
            newItem.setAttribute("id", "exam_third_" + object.m_exams[i].m_id);
            newItem.setAttribute("onclick", "clickEditExam(3," + object.m_exams[i].m_id + ",1,exam_third_" + object.m_exams[i].m_id + ")");
            if (i == 0) {
                newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                g_edit_object_3 = $("#exam_third_" + object.m_exams[i].m_id);
                g_edit_oldname_3 = g_edit_object_3.html();
                g_edit_id_3 = object.m_exams[i].m_id;
            } else {
                newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
            }
            newItem.innerHTML = object.m_exams[i].m_name;
            var list = document.getElementById("exam_small");
            list.insertBefore(newItem, list.lastElementChild);
        }
        if (object.m_exams.length != 0) {
            updateEditExam(4, object.m_exams[0]);
        }
    } else if (order == 4) {
        removeExams(4);
        var newItem = document.createElement("a");
        newItem.setAttribute("class", " exams input_exam_name cur_hand");
        newItem.setAttribute("contenteditable", "true");
        if (g_exam != "") {
            newItem.setAttribute("id", "exam_forth_" + g_exam);
            newItem.innerHTML = getObjectById(g_exam, g_exams).m_name;
        }
        var list = document.getElementById("exam_smallsmall");
        list.insertBefore(newItem, list.lastElementChild);
        $("#exam_last_div_4").hide();
    }
}
function updateExamsInAddingExam(order, object) {
    if (order == 1) {
        removeExams(1);

        for (var i = 0; i < object.m_exams.length; i++) {
            var newItem = document.createElement("a");
            newItem.setAttribute("id", "exam_first_" + object.m_exams[i].m_id);
            newItem.setAttribute("onclick", "clickEditExam(1," + object.m_exams[i].m_id + ",2)");
            if (i == 0) {
                newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                g_edit_object_1 = $("#exam_first_" + object.m_exams[i].m_id);
                g_edit_oldname_1 = g_edit_object_1.html();
                g_edit_id_1 = object.m_exams[i].m_id;
                g_current_final_exam = object.m_exams[i].m_id;
                g_current_final_exam_name = object.m_exams[i].m_name;
                g_submit_edit_type = 1;
            } else {
                newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
            }
            newItem.innerHTML = object.m_exams[i].m_name;
            var list = document.getElementById("block_item");
            list.insertBefore(newItem, list.lastElementChild);
        }
        if (object.m_exams.length != 0) {
            updateExamsInAddingExam(2, object.m_exams[0]);
        }
    } else if (order == 2) {
        removeExams(2);

        for (var i = 0; i < object.m_exams.length; i++) {
            var newItem = document.createElement("a");
            newItem.setAttribute("id", "exam_second_" + object.m_exams[i].m_id);
            newItem.setAttribute("onclick", "clickEditExam(2," + object.m_exams[i].m_id + ",2)");
            if (i == 0) {
                newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                g_edit_object_2 = $("#exam_second_" + object.m_exams[i].m_id);
                g_edit_oldname_2 = g_edit_object_2.html();
                g_edit_id_2 = object.m_exams[i].m_id;
                g_current_final_exam = object.m_exams[i].m_id;
                g_current_final_exam_name = object.m_exams[i].m_name;
                g_submit_edit_type = 1;
            } else {
                newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
            }
            newItem.innerHTML = object.m_exams[i].m_name;
            var list = document.getElementById("exam_big");
            list.insertBefore(newItem, list.lastElementChild);
        }
        if (object.m_exams.length != 0) {
            updateExamsInAddingExam(3, object.m_exams[0]);
        }
    } else if (order == 3) {
        $("#exam_small_div_total").show();
        $("#exam_small_line_total").show();
        $("#exam_small").show();
        $("#exam_small_div_text").html("<strong>小考点</strong>");
        removeExams(3);

        for (var i = 0; i < object.m_exams.length; i++) {
            var newItem = document.createElement("a");
            newItem.setAttribute("id", "exam_third_" + object.m_exams[i].m_id);
            newItem.setAttribute("onclick", "clickEditExam(3," + object.m_exams[i].m_id + ",2)");
            if (i == 0) {
                newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                g_edit_object_3 = $("#exam_third_" + object.m_exams[i].m_id);
                g_edit_oldname_3 = g_edit_object_3.html();
                g_edit_id_3 = object.m_exams[i].m_id;
                g_current_final_exam = object.m_exams[i].m_id;
                g_current_final_exam_name = object.m_exams[i].m_name;
                g_submit_edit_type = 1;
            } else {
                newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
            }
            newItem.innerHTML = object.m_exams[i].m_name;
            var list = document.getElementById("exam_small");
            list.insertBefore(newItem, list.lastElementChild);
        }
        if (object.m_exams.length != 0) {
            updateExamsInAddingExam(4, object.m_exams[0]);
        }
    } else if (order == 4) {
        $("#exam_small_small_div_total").show();
        $("#exam_small_small_line_total").show();
        $("#exam_smallsmall").show();
        $("#exam_small_small_div_text").html("<strong>题型</strong>");
        removeExams(4);

        for (var i = 0; i < object.m_exams.length; i++) {
            var newItem = document.createElement("a");
            newItem.setAttribute("id", "exam_forth_" + object.m_exams[i].m_id);
            newItem.setAttribute("onclick", "clickEditExam(4," + object.m_exams[i].m_id + ",2)");
            if (i == 0) {
                newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                g_edit_object_4 = $("#exam_forth_" + object.m_exams[i].m_id);
                g_edit_oldname_4 = g_edit_object_4.html();
                g_edit_id_4 = object.m_exams[i].m_id;
                g_current_final_exam = object.m_exams[i].m_id;
                g_current_final_exam_name = object.m_exams[i].m_name;
                g_submit_edit_type = 1;
            } else {
                newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
            }
            newItem.innerHTML = object.m_exams[i].m_name;
            var list = document.getElementById("exam_smallsmall");
            list.insertBefore(newItem, list.lastElementChild);
        }
    }
}
function clickEditExam(order, id, type, elementid) {
    console.log("clickEditExam", "#" + elementid + "的属性：" + $("#" + elementid).attr("contenteditable"));
    if ($("#" + elementid).attr("contenteditable") != "true") {
        var tmp;
        for (var i = order; i < 4; i++) {
            closeEditText(i);
        }
        if (type != 3) {
            g_edits = null;
            $(".add_new_exam").remove();
            tmp = getObjectById(id, g_exams);
            g_current_final_exam = tmp.m_id;
            g_current_final_exam_name = tmp.m_name;
            g_submit_edit_type = 1;
            if (order == 1) {
                g_edit_object_1 = $("#exam_first_" + id);
                g_edit_oldname_1 = g_edit_object_1.html();
                g_edit_id_1 = id;
            } else if (order == 2) {
                g_edit_object_2 = $("#exam_second_" + id);
                g_edit_oldname_2 = g_edit_object_2.html();
                g_edit_id_2 = id;
            } else if (order == 3) {
                g_edit_object_3 = $("#exam_third_" + id);
                g_edit_oldname_3 = g_edit_object_3.html();
                g_edit_id_3 = id;
            } else if (order == 4) {
                g_edit_object_4 = $("#exam_forth_" + id);
                g_edit_oldname_4 = g_edit_object_4.html();
                g_edit_id_4 = id;
            }
            if (order == 1) {
                $("#block_item .active").removeClass("active");
                $("#exam_first_" + id).addClass("active");
                $("#block_div_text").html("<strong>模块</strong>");
                if (type == 1) {
                    updateEditExam(2, tmp);
                } else {
                    updateExamsInAddingExam(2, tmp);
                }
            } else if (order == 2) {
                $("#exam_big .active").removeClass("active");
                $("#exam_second_" + id).addClass("active");
                $("#exam_big_div_text").html("<strong>大考点</strong>");
                if (type == 1) {
                    updateEditExam(3, tmp);
                } else {
                    updateExamsInAddingExam(3, tmp);
                }
            } else if (order == 3) {
                $("#exam_small .active").removeClass("active");
                $("#exam_third_" + id).addClass("active");
                g_edit_id_3 = id;
                $("#exam_small_div_text").html("<strong>小考点</strong>");
                if (type == 1) {
                    updateEditExam(4, tmp);
                } else {
                    updateExamsInAddingExam(4, tmp);
                }
            } else if (order == 4) {
                $("#exam_smallsmall .active").removeClass("active");
                $("#exam_small_small_div_text").html("<strong>题型</strong>");
                $("#exam_forth_" + id).addClass("active");
            }
        } else {
            tmp = getObjectById(id, g_edits);
            g_submit_edit_type = 2;
            if (order == 1) {
                clearEditID(1);
                addEditBlueBack("new_edit_" + id, 1);
                closeEditText(1);
                closeEditText(2);
                closeEditText(3);
                closeEditText(4);
                showEditText(2);
                showEditText(3);
                showEditText(4);
                pushEdit(1, $("#new_edit_" + id).innerHTML, "");
            } else if (order == 2) {
                clearEditID(2);
                addEditBlueBack("new_edit_" + id, 2);
                closeEditText(2);
                closeEditText(3);
                closeEditText(4);
                showEditText(3);
                showEditText(4);
                pushEdit(2, $("#new_edit_" + id).innerHTML, g_edit_id_1);
            } else if (order == 3) {
                clearEditID(3);
                addEditBlueBack("new_edit_" + id, 3);
                closeEditText(3);
                closeEditText(4);
                showEditText(4);
                pushEdit(3, $("#new_edit_" + id).innerHTML, g_edit_id_2);
            } else if (order == 4) {
                clearEditID(4);
                addEditBlueBack("new_edit_" + id, 4);
                closeEditText(4);
                pushEdit(4, $("#new_edit_" + id).innerHTML, g_edit_id_3);
            }
        }
    }
}
function closeElementsWhenEdit() {
    $("#edit_exam").html("<strong>完成编辑</strong>");
    $(".new_exam_li").show();
    $("#right_div_title").hide();
    $("#right_div_edit_exam").show();
    $("#questions-content").hide();
    $("#question_table").hide();
    $("#question_table_bottom").hide();
}
function editExam(section, id) {
    g_current_work = "edit_exam";
    g_submit_type = 2;
    videoSelectUE.setContent("");
    $("#video_select_div").hide();
    $("#submit_exam").attr("onclick", "submitModify(" + section + "," + id + ")");
    closeElementsWhenEdit();
    $div1.show();
    $.ajax({
            type: "POST",
            url: "./action/exam_all_get.class.php",
            data: {iid: iid},
            dataType: "json",
            success: function (msg) {
                $div1.hide();
                console.log("editExam: ", JSON.stringify(msg));
                var obj = eval(msg);
                if (obj.Code == "1") {
                    g_exams = obj.exam;
                    $(".exams").remove();
                    var before_i = 0;
                    console.log("editExam 1 num: ", g_exams.length);
                    for (var i = 0; i < g_exams.length; i++) {
                        var newItem = document.createElement("a");
                        newItem.setAttribute("id", "exam_first_" + g_exams[i].m_id);
                        newItem.setAttribute("onclick", "clickEditExam(1," + g_exams[i].m_id + ",1)");
                        var tmp = containExam(g_exams[i]);
                        if (tmp != 3) {
                            newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                            before_i = i;
                        } else {
                            newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
                        }
                        newItem.innerHTML = g_exams[i].m_name;
                        var list = document.getElementById("block_item");
                        list.insertBefore(newItem, list.lastElementChild);
                    }
                    console.log("editExam: ", JSON.stringify(g_exams[before_i]));
                    var before_ii = 0;
                    for (var i = 0; before_i < g_exams.length && i < g_exams[before_i].m_exams.length; i++) {
                        var newItem = document.createElement("a");
                        newItem.setAttribute("id", "exam_second_" + g_exams[before_i].m_exams[i].m_id);
                        newItem.setAttribute("onclick", "clickEditExam(2," + g_exams[before_i].m_exams[i].m_id + ",1)");
                        var tmp = containExam(g_exams[before_i].m_exams[i]);
                        if (tmp != 3) {
                            newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                            before_ii = i;
                        } else {
                            newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
                        }
                        newItem.innerHTML = g_exams[before_i].m_exams[i].m_name;
                        var list = document.getElementById("exam_big");
                        list.insertBefore(newItem, list.lastElementChild);
                    }
                    // console.log("editExam: ", JSON.stringify(g_exams[before_i].m_exams[0]));
                    // console.log("editExam 3 num: ", g_exams[before_i].m_exams[before_ii].m_exams.length);
                    for (var i = 0; before_i < g_exams.length && before_ii < g_exams[before_i].m_exams.length && i < g_exams[before_i].m_exams[before_ii].m_exams.length; i++) {
                        var newItem = document.createElement("a");
                        newItem.setAttribute("id", "exam_third_" + g_exams[before_i].m_exams[before_ii].m_exams[i].m_id);
                        newItem.setAttribute("onclick", "clickEditExam(3," + g_exams[before_i].m_exams[before_ii].m_exams[i].m_id + ",1)");
                        var tmp = containExam(g_exams[before_i].m_exams[before_ii].m_exams[i]);
                        if (tmp != 3) {
                            newItem.setAttribute("class", "active exams right_div_title_item_content_name cur_hand");
                            g_edit_id_3 = g_exams[before_i].m_exams[before_ii].m_exams[i].m_id;
                        } else {
                            newItem.setAttribute("class", "exams right_div_title_item_content_name cur_hand");
                        }
                        newItem.innerHTML = g_exams[before_i].m_exams[before_ii].m_exams[i].m_name;
                        var list = document.getElementById("exam_small");
                        list.insertBefore(newItem, list.lastElementChild);
                    }

                    var newItem = document.createElement("a");
                    newItem.setAttribute("class", " exams input_exam_name cur_hand");
                    newItem.setAttribute("contenteditable", "true");
                    if (g_exam != "") {
                        newItem.setAttribute("id", "exam_forth_" + g_exam);
                        newItem.innerHTML = getObjectById(g_exam, g_exams).m_name;
                    }
                    var list = document.getElementById("exam_smallsmall");
                    list.insertBefore(newItem, list.lastElementChild);

                    hideOrShowInputDiv(2);
                }
            }
        }
    )
    ;
}
function editExamCheck(section, id) {
    if (g_user.m_lv == "1" || g_user.m_lv == "2") {
        editExam(section, id);
    } else {
        showErrorMsg(1);
    }
}
function submitExamName(type) {
    var eid = "";
    var ename = "";
    var eoldname = "";
    var eobject = "";
    if (type == 1) {
        eid = g_edit_id_1;
        ename = g_edit_newname_1;
        eoldname = g_edit_oldname_1;
        eobject = g_edit_object_1;
    } else if (type == 2) {
        eid = g_edit_id_2;
        ename = g_edit_newname_2;
        eoldname = g_edit_oldname_2;
        eobject = g_edit_object_2;
    } else if (type == 3) {
        eid = g_edit_id_3;
        ename = g_edit_newname_3;
        eoldname = g_edit_oldname_3;
        eobject = g_edit_object_3;
    } else if (type == 4) {
        eid = g_edit_id_4;
        ename = g_edit_newname_4;
        eoldname = g_edit_oldname_4;
        eobject = g_edit_object_4;
    }
    if (!eobject.hasClass("add_new_exam")) {
        $div1.show();
        $.ajax({
            type: "POST",
            url: "./action/exam_name_modify.class.php",
            data: {eid: eid, ename: ename},
            dataType: "json",
            success: function (msg) {
                $div1.hide();
                var obj = eval(msg);
                if (obj.Code == "-1") {
                    alert(obj.Msg);
                    eobject.html(eoldname);
                } else {

                }
            }
        });
    }
}
function clearEditItems(type) {
    if (type == 1) {
        $("#block_item .exams").remove();
    } else if (type == 2) {
        $("#exam_big .exams").remove();
    } else if (type == 3) {
        $("#exam_small .exams").remove();
    } else if (type == 4) {
        $("#exam_smallsmall .exams").remove();
    }
}
function closeEditText(type) {
    if (type == 1) {
        $("#block_add_btn").html("<strong>+</strong>");
        $("#block_add_input").hide();
        $("#block_add_input").val("");
    } else if (type == 2) {
        $("#exam_big_add_btn").html("<strong>+</strong>");
        $("#exam_big_add_input").hide();
        $("#exam_big_add_input").val("");
    } else if (type == 3) {
        $("#exam_small_add_btn").html("<strong>+</strong>");
        $("#exam_small_add_input").hide();
        $("#exam_small_add_input").val("");
    } else if (type == 4) {
        $("#exam_small_small_add_btn").html("<strong>+</strong>");
        $("#exam_small_small_add_input").hide();
        $("#exam_small_small_add_input").val("");
    }
}
function clearEditID(type) {
    if (type == 1) {
        g_edit_id_1 = "";
        g_edit_id_2 = "";
        g_edit_id_3 = "";
        g_edit_id_4 = "";
    } else if (type == 2) {
        g_edit_id_2 = "";
        g_edit_id_3 = "";
        g_edit_id_4 = "";
    } else if (type == 3) {
        g_edit_id_3 = "";
        g_edit_id_4 = "";
    } else if (type == 4) {
        g_edit_id_4 = "";
    }
}
function showEditText(type) {
    if (type == 1) {
        $("#block_add_btn").html("<strong>√</strong>");
        $("#block_add_input").show();
        clearEditItems(1);
    } else if (type == 2) {
        $("#exam_big_add_btn").html("<strong>√</strong>");
        $("#exam_big_add_input").show();
        clearEditItems(2);
    } else if (type == 3) {
        $("#exam_small_add_btn").html("<strong>√</strong>");
        $("#exam_small_add_input").show();
        clearEditItems(3);
    } else if (type == 4) {
        $("#exam_small_small_add_btn").html("<strong>√</strong>");
        $("#exam_small_small_add_input").show();
        clearEditItems(4);
    }
}
function addEditBlueBack(id, type) {
    if (type == 1) {
        $("#block_item .exams").removeClass("active");
    } else if (type == 2) {
        $("#exam_big .exams").removeClass("active");
    } else if (type == 3) {
        $("#exam_small .exams").removeClass("active");
    } else if (type == 4) {
        $("#exam_smallsmall .exams").removeClass("active");
    }
    $("#" + id).addClass("active");
    // alert(id + "," + type);
}
function newEdit() {
    g_edits = new Object();
    g_edits.edit_section = g_section;
    g_edits.edit_parent = "";
    g_edits.edit_block = "";
    g_edits.edit_big = "";
    g_edits.edit_small = "";
    g_edits.edit_small_small = "";
}
function newEditu() {
    g_editu = new Object();
    g_editu.edit_exam = g_exam;
    g_editu.edit_parent = "";
    g_editu.edit_block = "";
    g_editu.edit_big = "";
    g_editu.edit_small = "";
    g_editu.edit_small_small = "";
}
function pushEditu(type, value, parent) {
    if (g_editu == null) {
        newEditu();
    }
    if (type == 1) {
        g_editu.edit_parent = "-1";
        g_editu.edit_big = "";
        g_editu.edit_small = "";
        g_editu.edit_small_small = "";
        g_editu.edit_block = value;
    } else if (type == 2) {
        if (parent != "") {
            g_editu.edit_parent = parent;
            g_editu.edit_block = "";
        }
        g_editu.edit_small = "";
        g_editu.edit_small_small = "";
        g_editu.edit_big = value;
    } else if (type == 3) {
        if (parent != "") {
            g_editu.edit_parent = parent;
            g_editu.edit_block = "";
            g_editu.edit_big = "";
        }
        g_editu.edit_small_small = "";
        g_editu.edit_small = value;
    } else if (type == 4) {
        if (parent != "") {
            g_editu.edit_parent = parent;
            g_editu.edit_block = "";
            g_editu.edit_big = "";
            g_editu.edit_small = "";
        }
        g_editu.edit_small_small = value;
    }
    // alert(parent + "," + JSON.stringify(g_editu));
}
function pushEdit(type, value, parent) {
    if (g_edits == null) {
        newEdit();
    }
    if (type == 1) {
        g_edits.edit_parent = "-1";
        g_edits.edit_big = "";
        g_edits.edit_small = "";
        g_edits.edit_small_small = "";
        g_edits.edit_block = value;
    } else if (type == 2) {
        if (parent != "") {
            g_edits.edit_parent = parent;
            g_edits.edit_block = "";
        }
        g_edits.edit_small = "";
        g_edits.edit_small_small = "";
        g_edits.edit_big = value;
    } else if (type == 3) {
        if (parent != "") {
            g_edits.edit_parent = parent;
            g_edits.edit_block = "";
            g_edits.edit_big = "";
        }
        g_edits.edit_small_small = "";
        g_edits.edit_small = value;
    } else if (type == 4) {
        if (parent != "") {
            g_edits.edit_parent = parent;
            g_edits.edit_block = "";
            g_edits.edit_big = "";
            g_edits.edit_small = "";
        }
        g_edits.edit_small_small = value;
    }
    // alert(parent + "," + JSON.stringify(g_edits));
}
function modifyEdit(type, value) {
    if (type == 1) {
        g_edits.edit_block = value;
    } else if (type == 2) {
        g_edits.edit_big = value;
    } else if (type == 3) {
        g_edits.edit_small = value;
    } else if (type == 4) {
        g_edits.edit_small_small = value;
    }
}

/*
 * When click some elemenets
 * */
$("#type_1").click(function () {
    resetType("type_1");
    g_exam = "";
    g_question_position = 0;
    g_page = 0;
    $("#questions-content").show();
    $("#questions-content").html("");
    $("#question_table").hide();
    $("#question_table_bottom").hide();
    getChapter(iid);
});
$("#type_2").click(function () {
    resetType("type_2");
    g_exam = "";
    g_page = 0;
    g_question_position = 0;
    $("#questions-content").show();
    $("#questions-content").html("");
    $("#question_table").hide();
    $("#question_table_bottom").hide();
    getExams();
});
$("#question_type_1").click(function () {
    resetQuestionType("question_type_1", "1");
    g_page = 0;
    g_question_position = 0;
    if (g_current_work == "upload") {
        $("#selsection_tr").show();
        $("#choice_tr").show();
        $("#fillin_answer_tr").hide();
    } else {
        $("#questions-content").html("");
        getQuestion();
    }
});
$("#question_type_2").click(function () {
    resetQuestionType("question_type_2", "2");
    g_page = 0;
    g_question_position = 0;
    if (g_current_work == "upload") {
        $("#selsection_tr").hide();
        $("#choice_tr").hide();
        $("#fillin_answer_tr").show();
    } else {
        $("#questions-content").html("");
        getQuestion();
    }
});
$("#question_type_3").click(function () {
    resetQuestionType("question_type_3", "3");
    g_page = 0;
    g_question_position = 0;
    if (g_current_work == "upload") {
        $("#selsection_tr").hide();
        $("#choice_tr").hide();
        $("#fillin_answer_tr").show();
    } else {
        $("#questions-content").html("");
        getQuestion();
    }
});
$("#browser").treeview({
    collapsed: true,
    animated: "medium",
    control: "#sidetreecontrol",
    persist: "location"
});
$("#logo").click(function () {
    window.location.href = "./index.html";
});
$("#search_btn").click(function () {
    window.location.href = "./questions.html";
});
$("#left_near").mouseover(function () {
    $("#left_near_right").css("visibility", "hidden");
    $("#select_subject_div").show();
});
$("#left_near").mouseout(function () {
    if (g_state == false) {
        $("#left_near_right").css("visibility", "visible");
        $("#select_subject_div").hide();
    }
});
$("#select_subject_div").mouseover(function () {
    var s = event.fromElement || event.relatedTarget;
    if (!this.contains(s)) {
        g_state = true;
        $("#select_subject_div").show();
    }
});
$("#select_subject_div").mouseout(function () {
    var s = event.toElement || event.relatedTarget;
    if (!this.contains(s)) {
        g_state = false;
        $("#select_subject_div").hide();
    }
});
$("#my_classes").mouseover(function () {
    $("#my_class_list").show();
});
$("#my_classes").mouseout(function () {
    if (g_state == false) {
        $("#my_class_list").hide();
    }
});
$("#my_class_list").mouseover(function () {
    var s = event.fromElement || event.relatedTarget;
    if (!this.contains(s)) {
        g_state = true;
        $("#my_class_list").show();
    }
});
$("#my_class_list").mouseout(function () {
    var s = event.toElement || event.relatedTarget;
    if (!this.contains(s)) {
        g_state = false;
        $("#my_class_list").hide();
    }
});
$("#to_top").mouseover(function () {
    $("#to_top").attr("src", "./image/to_top_deep.png");
});
$("#to_top").mouseout(function () {
    $("#to_top").attr("src", "./image/to_top.png");
});
$("#to_top").click(function () {
    $('html, body').animate({scrollTop: 0}, 'fast');
});
$("#upload_new_question").click(function () {
    uploadNewQuestionCheck();
});
$("#question_bottom_submit").click(function () {

    var question = questionUE.getContent();
    var selecta = selectaUE.getContent();
    var selecrb = selectbUE.getContent();
    var selectc = selectcUE.getContent();
    var selectd = selectdUE.getContent();
    var answer = "";
    if (g_type == "1") {
        if ($("#select_a_check").is(':checked')) {
            answer += "A";
        }
        if ($("#select_b_check").is(':checked')) {
            answer += "B";
        }
        if ($("#select_c_check").is(':checked')) {
            answer += "C";
        }
        if ($("#select_d_check").is(':checked')) {
            answer += "D";
        }
    } else {
        answer = answerUE.getContent();
    }
    var analyse = analyseUE.getContent();
    var solution = solutionUE.getContent();
    var video = "";
    //
    if (question == "" || (g_type == "1" && (selecta == "" || selecrb == "" || selectc == "" || selectd == "")) || answer == "" || analyse == "" || solution == "") {
        alert("请检查输入内容是否为空");
        return false;
    }

    // alert(g_type + "," + question + "," + selecta + "," + selecrb + "," + selectc + "," + selectd + "," + answer + "," + analyse + "," + solution + "," + g_exam);

    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/upload.class.php",
        data: {
            type: g_type,
            question: question,
            select_a: selecta,
            select_b: selecrb,
            select_c: selectc,
            select_d: selectd,
            answer: answer,
            analyse: analyse,
            solution: solution,
            file_video: video,
            exam: g_exam
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
                $("#select_a_check").attr('checked', false);
                $("#select_b_check").attr('checked', false);
                $("#select_c_check").attr('checked', false);
                $("#select_d_check").attr('checked', false);
                alert(obj.Msg);
            }
            return false;
        }
    });
});
$("#question_bottom_back").click(function () {
    $("#question_table").hide();
    $("#questions-content").show();
    $("#question_table_bottom").hide();
    $("#question_add_item").show();
    backQuestion();
});
$("#clear_quiz").click(function () {
    if (g_user == null) {
        alert("您还未登录,请先登录");
        return false;
    }
    g_quiz.quiz_content.splice(0, g_quiz.quiz_content.length);
    updateQuizNumber();
    $("#questions-content").html("");
    g_question_position = 0;
    g_page = 0;
    g_current_work = "show";
    getQuestion();
});
$("#quiz_backet").click(function () {
    if (g_user == "") {
        alert("您还未登录，请先登录");
        return false;
    }
    showQuiz();
});
$("#exit_login").click(function () {
    exitLogin();
});
$("#my_quizs").click(function () {
    viewQuizsCheck();
});
$("#edit_exam").click(function () {
    if (g_current_work != "edit_exam") {
        $("#search_type").hide();
        editExamCheck();
    } else {
        g_current_work = "show";
        g_exams = null;
        videoSelectUE.setContent("");
        $("#video_select_div").hide();
        $("#search_type").show();
        $("#edit_exam").html("<strong>编辑题型</strong>");
        $(".new_exam_li").hide();
        $("#right_div_title").show();
        $("#right_div_edit_exam").hide();
        $("#questions-content").html("");
        $("#questions-content").show();
        $("#question_table").hide();
        $("#question_table_bottom").hide();
        getQuestion();
    }
});
$("#block_add_btn").click(function () {
    if ($("#block_add_input").is(":hidden")) {
        $("#block_add_input").show();
        $("#block_add_btn").html("<strong>√</strong>");
    } else {
        if ($("#block_add_input").val().length == 0) {
            alert("请输入内容");
            return false;
        }
        var newItem = document.createElement("a");
        newItem.setAttribute("class", "add_new_exam exams right_div_title_item_content_name cur_hand");
        g_edit_id++;
        newItem.setAttribute("id", "new_edit_" + g_edit_id);
        newItem.innerHTML = $("#block_add_input").val();
        var list = document.getElementById("block_item");
        list.insertBefore(newItem, list.lastElementChild);
        g_edit_object_1 = $("#new_edit_" + g_edit_id);
        addEditBlueBack("new_edit_" + g_edit_id, 1);
        g_submit_edit_type = 2;
        closeEditText(1);
        showEditText(2);
        showEditText(3);
        clearEditID(1);
        console.log("g_submit_type", g_submit_type);
        if (g_submit_type == 1) {
            showEditText(4);
            hideOrShowInputDiv(1);
            pushEdit(1, newItem.innerHTML, "");
        } else if (g_submit_type == "") {
            closeEditText(4);
        } else if (g_submit_type == 2) {
            pushEditu(1, newItem.innerHTML, "");
        }
    }
});
$("#exam_big_add_btn").click(function () {
    if ($("#exam_big_add_input").is(":hidden")) {
        $("#exam_big_add_input").show();
        $("#exam_big_add_btn").html("<strong>√</strong>");
    } else {
        if ($("#exam_big_add_input").val().length == 0) {
            alert("请输入内容");
            return false;
        }
        var newItem = document.createElement("a");
        newItem.setAttribute("class", "add_new_exam exams right_div_title_item_content_name cur_hand");
        g_edit_id++;
        newItem.setAttribute("id", "new_edit_" + g_edit_id);
        newItem.innerHTML = $("#exam_big_add_input").val();
        var list = document.getElementById("exam_big");
        list.insertBefore(newItem, list.lastElementChild);
        g_edit_object_2 = $("#new_edit_" + g_edit_id);
        addEditBlueBack("new_edit_" + g_edit_id, 2);
        g_submit_edit_type = 2;
        closeEditText(2);
        showEditText(3);
        clearEditID(2);
        if (g_submit_type == 1) {
            showEditText(4);
            hideOrShowInputDiv(1);
            pushEdit(2, newItem.innerHTML, g_edit_id_1);
        } else if (g_submit_type == "") {
            closeEditText(4);
        } else if (g_submit_type == 2) {
            pushEditu(2, newItem.innerHTML, g_edit_id_1);
        }

    }
});
$("#exam_small_add_btn").click(function () {
    if ($("#exam_small_add_input").is(":hidden")) {
        $("#exam_small_add_input").show();
        $("#exam_small_add_btn").html("<strong>√</strong>");
    } else {
        if ($("#exam_small_add_input").val().length == 0) {
            alert("请输入内容");
            return false;
        }
        var newItem = document.createElement("a");
        newItem.setAttribute("class", "add_new_exam exams right_div_title_item_content_name cur_hand");
        g_edit_id++;
        newItem.setAttribute("id", "new_edit_" + g_edit_id);
        newItem.innerHTML = $("#exam_small_add_input").val();
        var list = document.getElementById("exam_small");
        list.insertBefore(newItem, list.lastElementChild);
        g_edit_object_3 = $("#new_edit_" + g_edit_id);
        addEditBlueBack("new_edit_" + g_edit_id, 3);
        g_submit_edit_type = 2;
        closeEditText(3);
        clearEditID(3);
        if (g_submit_type == 1) {
            showEditText(4);
            hideOrShowInputDiv(1);
            pushEdit(3, newItem.innerHTML, g_edit_id_2);
        } else if (g_submit_type == "") {
            closeEditText(4);
        } else if (g_submit_type == 2) {
            pushEditu(3, newItem.innerHTML, g_edit_id_2);
        }

    }
});
$("#exam_small_small_add_btn").click(function () {
    if ($("#exam_small_small_add_input").is(":hidden")) {
        $("#exam_small_small_add_input").show();
        $("#exam_small_small_add_btn").html("<strong>√</strong>");
    } else {
        if ($("#exam_small_small_add_input").val().length == 0) {
            alert("请输入内容");
            return false;
        }
        var newItem = document.createElement("a");
        newItem.setAttribute("class", "add_new_exam exams right_div_title_item_content_name cur_hand");
        g_edit_id++;
        newItem.setAttribute("id", "new_edit_" + g_edit_id);
        newItem.innerHTML = $("#exam_small_small_add_input").val();
        var list = document.getElementById("exam_smallsmall");
        list.insertBefore(newItem, list.lastElementChild);
        g_edit_object_4 = $("#new_edit_" + g_edit_id);
        addEditBlueBack("new_edit_" + g_edit_id, 4);
        g_submit_edit_type = 2;
        clearEditID(4);
        if (g_submit_type == 1) {
            closeEditText(4);
            hideOrShowInputDiv(1);
            pushEdit(4, newItem.innerHTML, g_edit_id_3);
        } else if (g_submit_type == "") {
            closeEditText(4);
        }
    }
});
$("#block_edit_btn").click(function () {
    if ($("#block_item .active").attr("contenteditable") == "true") {
        $("#block_item .active").attr("contenteditable", "false");
        $("#block_edit_btn").html("<strong>E</strong>");
        g_edit_newname_1 = $("#block_item .active").html();
        if ($("#block_item .active").hasClass("add_new_exam")) {
            modifyEdit(1, $("#block_item .active").html());
        }
        submitExamName(1);
    } else {
        $("#block_item .active").attr("contenteditable", "true");
        $("#block_edit_btn").html("<strong>√</strong>");
    }
});
$("#exam_big_edit_btn").click(function () {
    if ($("#exam_big .active").attr("contenteditable") == "true") {
        $("#exam_big .active").attr("contenteditable", "false");
        $("#exam_big_edit_btn").html("<strong>E</strong>");
        g_edit_newname_2 = $("#exam_big .active").html();
        if ($("#exam_big .active").hasClass("add_new_exam")) {
            modifyEdit(2, $("#exam_big .active").html());
        }
        submitExamName(2);
    } else {
        $("#exam_big .active").attr("contenteditable", "true");
        $("#exam_big_edit_btn").html("<strong>√</strong>");
    }
});
$("#exam_small_edit_btn").click(function () {
    if ($("#exam_small .active").attr("contenteditable") == "true") {
        $("#exam_small .active").attr("contenteditable", "false");
        $("#exam_small_edit_btn").html("<strong>E</strong>");
        g_edit_newname_3 = $("#exam_small .active").html();
        if ($("#exam_small .active").hasClass("add_new_exam")) {
            modifyEdit(3, $("#exam_small .active").html());
        }
        submitExamName(3);
    } else {
        $("#exam_small .active").attr("contenteditable", "true");
        $("#exam_small_edit_btn").html("<strong>√</strong>");
    }
});
$("#exam_small_small_edit_btn").click(function () {
    if ($("#exam_smallsmall .active").attr("contenteditable") == "true") {
        $("#exam_smallsmall .active").attr("contenteditable", "false");
        $("#exam_small_small_edit_btn").html("<strong>E</strong>");
        g_edit_newname_4 = $("#exam_smallsmall .active").html();
        if ($("#exam_smallsmall .active").hasClass("add_new_exam")) {
            modifyEdit(4, $("#exam_smallsmall .active").html());
        }
        submitExamName(4);
    } else {
        $("#exam_smallsmall .active").attr("contenteditable", "true");
        $("#exam_small_small_edit_btn").html("<strong>√</strong>");
    }
});
$("#setting_video").click(function () {
    $("#video_select_div").show();
});

var questionUE = UE.getEditor('question_input', {
    enterTag: 'br',
    wordCount: false,
    toolbars: [[
        'bold', 'removeformat', 'forecolor',
        'simpleupload', 'spechars', 'kityformula'
    ]]
});
questionUE.ready(function () {
    questionUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var selectaUE = UE.getEditor('select_a_input', {
    enterTag: 'br',
    wordCount: false,
    toolbars: [[
        'bold', 'removeformat', 'forecolor',
        'simpleupload', 'spechars', 'kityformula'
    ]]
});
selectaUE.ready(function () {
    selectaUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var selectbUE = UE.getEditor('select_b_input', {
    enterTag: 'br',
    wordCount: false,
    toolbars: [[
        'bold', 'removeformat', 'forecolor',
        'simpleupload', 'spechars', 'kityformula'
    ]]
});
selectbUE.ready(function () {
    selectbUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var selectcUE = UE.getEditor('select_c_input', {
    enterTag: 'br',
    wordCount: false,
    toolbars: [[
        'bold', 'removeformat', 'forecolor',
        'simpleupload', 'spechars', 'kityformula'
    ]]
});
selectcUE.ready(function () {
    selectcUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var selectdUE = UE.getEditor('select_d_input', {
    enterTag: 'br',
    wordCount: false,
    toolbars: [[
        'bold', 'removeformat', 'forecolor',
        'simpleupload', 'spechars', 'kityformula'
    ]]
});
selectdUE.ready(function () {
    selectdUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var answerUE = UE.getEditor('answer_input', {
    enterTag: 'br',
    wordCount: false,
    toolbars: [[
        'bold', 'removeformat', 'forecolor',
        'simpleupload', 'spechars', 'kityformula'
    ]]
});
answerUE.ready(function () {
    answerUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var analyseUE = UE.getEditor('analyse_input', {
    enterTag: 'br',
    wordCount: false,
    toolbars: [[
        'bold', 'removeformat', 'forecolor',
        'simpleupload', 'spechars', 'kityformula'
    ]]
});
analyseUE.ready(function () {
    analyseUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var solutionUE = UE.getEditor('solution_input', {
    enterTag: 'br',
    wordCount: false,
    toolbars: [[
        'bold', 'removeformat', 'forecolor',
        'simpleupload', 'spechars', 'kityformula'
    ]]
});
solutionUE.ready(function () {
    solutionUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
var videoSelectUE = UE.getEditor('video_select', {
    toolbars: [[
        'insertvideo'
    ]]
});
videoSelectUE.ready(function () {
    videoSelectUE.on('showmessage', function (type, opt) {
        if (opt.content == '本地保存成功') {
            return true;
        }
    });
});
/*
 * When the page was initial
 * */
window.onload =
    function () {
        closeDIV1();
        $("#right_div_edit_exam").hide();
        $("#block_add_input").hide();
        $("#exam_big_add_input").hide();
        $("#exam_small_add_input").hide();
        $("#exam_small_small_add_input").hide();

        checkLogin();
        var oDiv = document.getElementById("header_div");
        var H = 0;
        var Y = oDiv;
        while (Y) {
            H += Y.offsetTop;
            Y = Y.offsetParent;
        }
        window.onscroll = function () {
            var s = document.body.scrollTop || document.documentElement.scrollTop;
            // console.log('变量：', s + "," + H);
            if (s > H) {
                $("#header_div").addClass("fix_20");
                $("#to_top").show();
            } else {
                $("#header_div").removeClass("fix_20");
                $("#to_top").hide();
            }
            if (g_current_work == "show") {
                if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
                    g_page++;
                    getQuestion();
                }
            }
        };
        resetType("type_1");
        resetQuestionType("question_type_1", "1");
        getSubjectName();
        getSubjects();
    };
