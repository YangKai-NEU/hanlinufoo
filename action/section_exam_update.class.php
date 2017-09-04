<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/SubjectClass.php";

function get_latex_from_html($str)
{
    if (preg_match_all('/(.+?)src="(.+?)"(.+?)/', $str, $matches)) {
        print_r($matches);
        if (count($matches) != 0) {
            return $matches[2][0];
        }
    }
    return "";
}

/*
 * Upload the file to BCE and delete the temporal file
 * */
function getKeyImg($client, $str)
{
    if ($str != "") {
        $key = $client->uploadFile(".." . $str);
        $url = $client->getUrl($key);
        unlink("../" . $str);
        return $url;
    } else {
        return "";
    }
}

$tablename_exam = "";
$data = "";
$video = "";
session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && isset($_POST["data"]) && $_POST["data"] != null) {
    $tablename_exam = $_SESSION[SUBJECT]->m_examtablename;
    $data = $_POST["data"];
    if (isset($_POST["video"]) && $_POST["video"] != null) {
        $video = getKeyImg($client, get_latex_from_html($_POST["video"]));
    }
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

$edit = json_decode($data);
$arrayResult = array();

require '../db/conn.class.php';
$conne->init_conn();
$first_charactor_exam = substr($tablename_exam, 0, 1);

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
        $result = array("Code" => "-1", "Msg" => "添加失败" . $sql);
        echo json_encode($result);
        $conne->close_conn();
        exit(0);
    }
}
$sql = "UPDATE " . $tablename_exam . " SET " . $first_charactor_exam . "_name='" . $edit->edit_small_small . "'," . $first_charactor_exam . "_parent='" . $parent . "'," . $first_charactor_exam . "_video='" . $video . "' WHERE " . $first_charactor_exam . "_id='" . $edit->edit_exam . "'";
$affected = $conne->uidRst($sql);
if ($affected == 1) {
    $result = array("Code" => "1", "Msg" => "添加成功");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
} else {
    $result = array("Code" => "-1", "Msg" => "添加失败");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
}