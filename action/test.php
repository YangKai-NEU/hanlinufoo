<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/SubjectClass.php";

function get_latex_from_html($str)
{
    if (preg_match_all('/(.+?)src="(.+?)"(.+?)/', $str, $matches)) {
        if (count($matches) != 0) {
            return $matches[2][0];
        }
    }
    return "";
}

$tablename_exam = "";
$tablename_section_exam = "";
$data = "{\"edit_section\":17,\"edit_parent\":5,\"edit_block\":\"\",\"edit_big\":\"\",\"edit_small\":\"新的\",\"edit_small_small\":\"围墙二\"}";
$video = "<p><video class=\"edui-upload-video  vjs-default-skin video-js\" controls=\"\" preload=\"none\" width=\"420\" height=\"280\" src=\"/upload/201701111484135990101055.flv\" data-setup=\"{}\"></video></p>";

/*
 * Init the BCE client to upload some file(images and videos)
 * */
//require '../bce-php-sdk-0.8.20/MyBosClient.php';
//$client = new MyBosClient();
//$client->initClient("hanlin-video");

session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null) {
    $tablename_section_exam = $_SESSION[SUBJECT]->m_sectionexamtablename;
    $tablename_exam = $_SESSION[SUBJECT]->m_examtablename;
    $path = get_latex_from_html($video);
    echo $path;
//    $video=getKeyImg($client, $path);
    require '../bce-php-sdk-0.8.20/MyBosClient.php';
    $client = new MyBosClient();
    $client->initClient("hanlin-video");
    $key = $client->uploadFile("..".$path);
    $video = $client->getUrl($key);
    echo $video;
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

echo $video;

$edit = json_decode($data);

print_r($edit);
$arrayResult = array();

require '../db/conn.class.php';
$conne->init_conn();
$first_charactor_exam = substr($tablename_exam, 0, 1);
$first_charactor_section_exam = substr($tablename_section_exam, 0, 1);

$parent = $edit->edit_parent;
if ($edit->edit_block != "") {
    $sql = "INSERT INTO " . $tablename_exam . "(" . $first_charactor_exam . "_name," . $first_charactor_exam . "_parent) VALUES('" . $edit->edit_block . "','" . $parent . "')";
    $affected = $conne->uidRst($sql);
    if ($affected == 1) {
        $sql = "SELECT * FROM " . $tablename_exam . " WHERE " . $first_charactor_exam . "_name='" . $edit->edit_block . "' AND " . $first_charactor_exam . "_parent='-1'";
        $tmp = $conne->getRowsArray($sql);
        $parent = $tmp[0][$first_charactor_exam . "_id"];
        $arrayResult[0] = $parent;
    } else {
        $result = array("Code" => "-1", "Msg" => "添加失败");
        echo json_encode($result);
        $conne->close_conn();
        exit(0);
    }
}
if ($edit->edit_big != "") {
    $sql = "INSERT INTO " . $tablename_exam . "(" . $first_charactor_exam . "_name," . $first_charactor_exam . "_parent) VALUES('" . $edit->edit_big . "','" . $parent . "')";
    $affected = $conne->uidRst($sql);
    if ($affected == 1) {
        $sql = "SELECT * FROM " . $tablename_exam . " WHERE " . $first_charactor_exam . "_name='" . $edit->edit_big . "' AND " . $first_charactor_exam . "_parent='" . $parent . "'";
        $tmp = $conne->getRowsArray($sql);
        $parent = $tmp[0][$first_charactor_exam . "_id"];
        $arrayResult[1] = $parent;
    } else {
        $result = array("Code" => "-1", "Msg" => "添加失败");
        echo json_encode($result);
        $conne->close_conn();
        exit(0);
    }
}
if ($edit->edit_small != "") {
    $sql = "INSERT INTO " . $tablename_exam . "(" . $first_charactor_exam . "_name," . $first_charactor_exam . "_parent) VALUES('" . $edit->edit_small . "','" . $parent . "')";
    $affected = $conne->uidRst($sql);
    if ($affected == 1) {
        $sql = "SELECT * FROM " . $tablename_exam . " WHERE " . $first_charactor_exam . "_name='" . $edit->edit_small . "' AND " . $first_charactor_exam . "_parent='" . $parent . "'";
        $tmp = $conne->getRowsArray($sql);
        $parent = $tmp[0][$first_charactor_exam . "_id"];
        $arrayResult[2] = $parent;
    } else {
        $result = array("Code" => "-1", "Msg" => "添加失败");
        echo json_encode($result);
        $conne->close_conn();
        exit(0);
    }
}
if ($edit->edit_small_small != "") {
    $sql = "INSERT INTO " . $tablename_exam . "(" . $first_charactor_exam . "_name," . $first_charactor_exam . "_parent," . $first_charactor_exam . "_video) VALUES('" . $edit->edit_small_small . "','" . $parent . "','" . $video . "')";
    $affected = $conne->uidRst($sql);
    if ($affected == 1) {
        $sql = "SELECT * FROM " . $tablename_exam . " WHERE " . $first_charactor_exam . "_name='" . $edit->edit_small_small . "' AND " . $first_charactor_exam . "_parent='" . $parent . "'";
        $tmp = $conne->getRowsArray($sql);
        $parent = $tmp[0][$first_charactor_exam . "_id"];
        $arrayResult[3] = $parent;
    } else {
        $result = array("Code" => "-1", "Msg" => "添加失败");
        echo json_encode($result);
        $conne->close_conn();
        exit(0);
    }
}
$sql = "INSERT INTO " . $tablename_section_exam . "(" . $first_charactor_section_exam . "_sid," . $first_charactor_section_exam . "_eid) VALUES('" . $edit->edit_section . "','" . $parent . "')";
$affected = $conne->uidRst($sql);
if ($affected == 1) {
    $result = array("Code" => "1", "Msg" => "添加成功", "Id" => $arrayResult);
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
} else {
    $result = array("Code" => "-1", "Msg" => "添加失败");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
}