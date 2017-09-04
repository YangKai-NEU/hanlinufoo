<?php

header("Content-type: text/html; charset=utf-8");
require './config.class.php';
require './class/SubjectClass.php';
require "./class/CacheClass.php";

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
$eid = "";
$name = "";
$parent = "";
$video = "";

/*
 * Init the BCE client to upload some file(images and videos)
 * */
require '../bce-php-sdk-0.8.20/MyBosClient.php';
$client = new MyBosClient();
$client->initClient("hanlin-video");

session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && isset($_POST["eid"]) && $_POST["eid"] != null && isset($_POST["name"]) && $_POST["name"] != null && isset($_POST["parent"]) && $_POST["parent"] != null) {
    $tablename = $_SESSION[SUBJECT]->m_examtablename;
    $eid = $_POST["eid"];
    $name = $_POST["name"];
    $parent = $_POST["parent"];
    if (isset($_POST["video"]) && $_POST["video"] != null) {
        $video = getKeyImg($client, get_latex_from_html($_POST["video"]));
    }
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
if (CACHEENABLE) {

} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $first_charactor = substr($tablename, 0, 1);

    $sql = "UPDATE " . $tablename . " SET " . $first_charactor . "_name='" . $name . "'," . $first_charactor . "_parent='" . $parent . "'," . $first_charactor . "_video='" . $video . "' WHERE " . $first_charactor . "_id='" . $eid . "'";
    $affected = $conne->uidRst($sql);
    $conne->close_rst();
    /*
         * Close the database connection
         * */
    $conne->close_conn();
    if ($affected == 1) {
        echo json_encode(array("Code" => "1", "Msg" => "更新数据成功"));
        exit(0);
    } else {
        echo json_encode(array("Code" => "-1", "Msg" => "更新数据失败"));
        exit(0);
    }

}
?>
