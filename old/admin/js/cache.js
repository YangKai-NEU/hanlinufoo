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

function addItem(filename, filesize, filetime) {
    var cachetr = document.createElement("tr");
    cachetr.setAttribute("class", "cache_list_tr");
    cachetr.setAttribute("valign", "top");
    var cachetd1 = document.createElement("td");
    cachetd1.setAttribute("class", "cache_list_td");
    cachetd1.innerHTML = filename;
    var cachetd2 = document.createElement("td");
    cachetd2.setAttribute("class", "cache_list_td");
    cachetd2.innerHTML = filesize;
    var cachetd3 = document.createElement("td");
    cachetd3.setAttribute("class", "cache_list_td");
    cachetd3.innerHTML = filetime;
    var cachetd4 = document.createElement("td");
    cachetd4.setAttribute("class", "cache_list_td cur-hand mouse-on-red-off-black");
    cachetd4.setAttribute("onclick", "submitOrder('" + filename + "')");
    cachetd4.innerHTML = "删除";
    cachetr.append(cachetd1);
    cachetr.append(cachetd2);
    cachetr.append(cachetd3);
    cachetr.append(cachetd4);
    $("#cache_table").append(cachetr);
}

function addTitle() {
    var cachetr = document.createElement("tr");
    cachetr.setAttribute("class", "cache_list_tr_title");
    cachetr.setAttribute("valign", "top");
    var cachetd1 = document.createElement("td");
    cachetd1.setAttribute("class", "cache_list_td");
    cachetd1.innerHTML = filename;
    var cachetd2 = document.createElement("td");
    cachetd2.setAttribute("class", "cache_list_td");
    cachetd2.innerHTML = filesize;
    var cachetd3 = document.createElement("td");
    cachetd3.setAttribute("class", "cache_list_td");
    cachetd3.innerHTML = filetime;
    var cachetd4 = document.createElement("td");
    cachetd4.setAttribute("class", "cache_list_td cur-hand mouse-on-red-off-black");
    cachetd4.setAttribute("onclick", "submitOrder('" + filename + "')");
    cachetd4.innerHTML = "删除";
    cachetr.append(cachetd1);
    cachetr.append(cachetd2);
    cachetr.append(cachetd3);
    cachetr.append(cachetd4);
    $("#cache_table").append(cachetr);
}

function addNoContent() {
    var nothing_img_div = document.createElement('div');
    var nothing_text_div = document.createElement('div');
    nothing_img_div.setAttribute("class", "nothing-img-div");
    var block1_1_img = document.createElement('img');
    block1_1_img.setAttribute("class", "nothing-img");
    block1_1_img.setAttribute("src", "./image/notthing.png");
    nothing_img_div.append(block1_1_img);
    nothing_text_div.setAttribute("class", "empty-questin");
    nothing_text_div.innerHTML = "该模块下暂无数据，看看其他模块吧";
    $("#cache_table").append(nothing_img_div);
    $("#cache_table").append(nothing_text_div);
}

function getCacheFile() {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/cache.class.php",
        data: {},
        dataType: "json",
        success: function (data) {
            $div1.hide();
            var obj = eval(data);
            if (obj.Code == "1") {
                $("#cache_table").html("");
                if (obj.Data.length != 0) {
                    addTitle();
                    for (var i = 0; i < obj.Data.length; i++) {
                        addItem(obj.Data[i].filename, obj.Data[i].filesize, obj.Data[i].filetime);
                    }
                } else {
                    addNoContent();
                }
            } else {
                alert(obj.Msg);
            }
        }
    });
}
getCacheFile();

function submitOrder(name) {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/cache_delete.class.php",
        data: {isall: 'N', cachefile: name},
        dataType: "json",
        success: function (data) {
            $div1.hide();
            var obj = eval(data);
            if (obj.Code == "1") {
                $("#cache_table").html("");
                getCacheFile();
            } else {
                alert(obj.Msg);
            }
        }
    });
}

$("#delete-all-cache").click(function () {
    $div1.show();
    $.ajax({
        type: "POST",
        url: "../action/cache_delete.class.php",
        data: {isall: "Y", cachefile: "null"},
        dataType: "json",
        success: function (data) {
            $div1.hide();
            var obj = eval(data);
            if (obj.Code == "1") {
                $("#cache_table").html("");
                getCacheFile();
            } else {
                alert(obj.Msg);
            }
        }
    });
});