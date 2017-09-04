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

$("#class_new_text").click(function () {
    document.getElementById("class_new_text").style.display = "none";
    document.getElementById("class_submit_text").style.display = "";
    document.getElementById("class_input_div").style.display = "";
});

$("#delete_class").click(function () {
    $div1.show();
    var cid = $("#classes").val();
    $.ajax({
        type: "POST",
        url: "../action/classes_delete.class.php",
        data: {cid: cid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("删除成功");
            }
            get_classes();
            return false;
        }
    });
});

$("#add_student").click(function () {
    $div1.show();
    var cid = $("#classes").val();
    var sid = $("#student").val();
    $.ajax({
        type: "POST",
        url: "../action/class_item_add.class.php",
        data: {cid: cid, sid: sid},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("添加成功");
            }
            get_student();
            return false;
        }
    });
});

$("#class_submit_text").click(function () {
    $div1.show();
    var name = $("#class_name_text").val();
    $.ajax({
        type: "POST",
        url: "../action/classes_add.class.php",
        data: {name: name},
        dataType: "json",
        success: function (msg) {
            document.getElementById("class_new_text").style.display = "";
            document.getElementById("class_submit_text").style.display = "none";
            document.getElementById("class_input_div").style.display = "none";
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "-1") {
                alert(obj.Msg);
            } else {
                alert("添加成功");
                get_classes();
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
            get_student();
            return false;
        }
    });
}

function get_classe_item() {
    $div1.show();
    var cid = $("#classes").val();
    $.ajax({
        type: "POST",
        url: "../action/class_item.class.php",
        data: {cid: cid, type: 1},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            $("#exam_content").html("");
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.studentdata.length; i++) {
                    show_exam(obj.studentdata[i].c_id, obj.studentdata[i].s_username, obj.studentdata[i].s_phone);
                }
            }
            return false;
        }
    });
}
function get_student() {
    $div1.show();
    var cid = $("#classes").val();
    $.ajax({
        type: "POST",
        url: "../action/class_item.class.php",
        data: {cid: cid, type: 2},
        dataType: "json",
        success: function (msg) {
            var department = document.getElementById('student');
            department.options.length = 0;
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                for (var i = 0; i < obj.studentdata.length; i++) {
                    var op = document.createElement("option");
                    department.appendChild(op);
                    op.value = obj.studentdata[i].s_id;
                    op.text = obj.studentdata[i].s_username;
                }
            }
            get_classe_item();
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

function delete_student(id) {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/class_item_delete.class.php",
        data: {cid: id},
        dataType: "json",
        success: function (msg) {
            $div1.hide();
            var obj = eval(msg);
            if (obj.Code == "1") {
                alert("删除成功");
            } else {
                alert(obj.Msg);
            }
            get_classe_item();
            return false;
        }
    });
}

function show_exam(id, name, time) {
    var exam_item = document.createElement('div');
    exam_item.setAttribute("class", "exam_item");

    var a1 = document.createElement("a");
    a1.setAttribute("class", "cur-hand blue_on_deep exam_item_left");
    a1.innerHTML = name;
    var a2 = document.createElement("a");
    a2.setAttribute("class", "exam_item_right");
    a2.innerHTML = time;
    var a3 = document.createElement("a");
    a3.setAttribute("class", "delete cur-hand");
    a3.setAttribute("onClick", "delete_student(" + id + ")");
    a3.innerHTML = "删除";
    exam_item.append(a1);
    exam_item.append(a3);
    exam_item.append(a2);

    $("#exam_content").append(exam_item);
}

get_classes();