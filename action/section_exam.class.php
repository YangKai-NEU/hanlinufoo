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

$tablename = "";
$tablename_exam = "";
$secid = "";
$eid = "";
$video = "";

/*
 * Init the BCE client to upload some file(images and videos)
 * */
require '../bce-php-sdk-0.8.20/MyBosClient.php';
$client = new MyBosClient();
$client->initClient("hanlin-video");
session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && isset($_POST["secid"]) && $_POST["secid"] != null && isset($_POST["eid"]) && $_POST["eid"] != null) {
    $tablename = $_SESSION[SUBJECT]->m_sectionexamtablename;
    $tablename_exam = $_SESSION[SUBJECT]->m_examtablename;
    $secid = $_POST["secid"];
    $eid = $_POST["eid"];
    if (isset($_POST["video"]) && $_POST["video"] != null) {
        $video = getKeyImg($client, get_latex_from_html($_POST["video"]));
    }
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require '../db/conn.class.php';
$conne->init_conn();
$first_charactor = substr($tablename, 0, 1);
$first_charactor_exam = substr($tablename_exam, 0, 1);
$sql = "UPDATE " . $tablename_exam . " SET " . $first_charactor_exam . "_video='" . $video . "' WHERE " . $first_charactor_exam . "_id='" . $eid . "'";
$conne->uidRst($sql);
$sql = "INSERT INTO " . $tablename . "(" . $first_charactor . "_sid," . $first_charactor . "_eid) VALUES('" . $secid . "','" . $eid . "')";
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