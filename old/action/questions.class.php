<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';
require 'class/CacheClass.php';

$sid = "";
$questiontype = "";
$eid = "";

if (isset($_POST["sid"]) && $_POST["sid"] != null && isset($_POST["type"]) && $_POST["type"] && isset($_POST["eid"]) && $_POST["eid"]) {
    $sid = $_POST["sid"];
    $questiontype = $_POST["type"];
    $eid = $_POST["eid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {

    $cachedir = './cache/';
    $cache = new Cache($cachedir, $sid . $questiontype . $pagestart . $pagelength . $direction, 30);
    if ($cache->load() == true)
        exit(0);
    $tablename = "";
    $first_charactor = "";
    switch ($questiontype) {
        case "1":
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_choice_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_choice_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            break;
        case "2":
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_fillin_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_fillin_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            break;
        case "3":
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_answer_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_answer_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            break;
        default:
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
            exit(0);
            break;
    }
    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_exam='" . $eid . "'";
    $tmpresult = $conne->getRowsArray($sql);
    $result = array();
    switch ($questiontype) {
        case "1":
            for ($i = 0; $i < count($tmpresult); $i++) {
                $result[$i] = array('id' => $tmpresult[$i][$first_charactor . "_id"],
                    "question" => $tmpresult[$i][$first_charactor . "_question"],
                    "select_a" => $tmpresult[$i][$first_charactor . "_select_a"],
                    "select_b" => $tmpresult[$i][$first_charactor . "_select_b"],
                    "select_c" => $tmpresult[$i][$first_charactor . "_select_c"],
                    "select_d" => $tmpresult[$i][$first_charactor . "_select_d"],
                    "exam" => $tmpresult[$i][$first_charactor . "_select_a"],
                    "solution" => $tmpresult[$i][$first_charactor . "_solution"],
                    "answer" => $tmpresult[$i][$first_charactor . "_answer"],
                    "analyse" => $tmpresult[$i][$first_charactor . "_analyse"],
                    "img_url_1" => $tmpresult[$i][$first_charactor . "_img_url_1"],
                    "img_url_2" => $tmpresult[$i][$first_charactor . "_img_url_2"],
                    "video_url" => $tmpresult[$i][$first_charactor . "_video_url"]);
            }
            break;
        case "2":
            for ($i = 0; $i < count($tmpresult); $i++) {
                $result[$i] = array('id' => $tmpresult[$i][$first_charactor . "_id"],
                    "question" => $tmpresult[$i][$first_charactor . "_question"],
                    "exam" => $tmpresult[$i][$first_charactor . "_select_a"],
                    "solution" => $tmpresult[$i][$first_charactor . "_solution"],
                    "answer" => $tmpresult[$i][$first_charactor . "_answer"],
                    "analyse" => $tmpresult[$i][$first_charactor . "_analyse"],
                    "img_url_1" => $tmpresult[$i][$first_charactor . "_img_url_1"],
                    "img_url_2" => $tmpresult[$i][$first_charactor . "_img_url_2"],
                    "video_url" => $tmpresult[$i][$first_charactor . "_video_url"]);
            }
            break;
        case "3":
            for ($i = 0; $i < count($tmpresult); $i++) {
                $result[$i] = array('id' => $tmpresult[$i][$first_charactor . "_id"],
                    "question" => $tmpresult[$i][$first_charactor . "_question"],
                    "exam" => $tmpresult[$i][$first_charactor . "_select_a"],
                    "solution" => $tmpresult[$i][$first_charactor . "_solution"],
                    "answer" => $tmpresult[$i][$first_charactor . "_answer"],
                    "analyse" => $tmpresult[$i][$first_charactor . "_analyse"],
                    "img_url_1" => $tmpresult[$i][$first_charactor . "_img_url_1"],
                    "img_url_2" => $tmpresult[$i][$first_charactor . "_img_url_2"],
                    "video_url" => $tmpresult[$i][$first_charactor . "_video_url"]);
            }
            break;
    }

    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "question" => $result, "type" => $questiontype));
    $conne->close_rst();
    $conne->close_conn();
    $cache->write(3, json_encode(array("Code" => "1", "Msg" => "获取数据成功", "question" => $tmpresult, "type" => $questiontype)));
    ob_end_flush();
} else {
    $tablename = "";
    $first_charactor = "";

    switch ($questiontype) {
        case "1":
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_choice_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_choice_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            break;
        case "2":
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_fillin_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_fillin_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            break;
        case "3":
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_answer_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_answer_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            break;
        default:
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
            exit(0);
            break;
    }
    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_exam='" . $eid . "'";
    $tmpresult = $conne->getRowsArray($sql);
    $result = array();
    switch ($questiontype) {
        case "1":
            for ($i = 0; $i < count($tmpresult); $i++) {
                $result[$i] = array('id' => $tmpresult[$i][$first_charactor . "_id"],
                    "question" => $tmpresult[$i][$first_charactor . "_question"],
                    "select_a" => $tmpresult[$i][$first_charactor . "_select_a"],
                    "select_b" => $tmpresult[$i][$first_charactor . "_select_b"],
                    "select_c" => $tmpresult[$i][$first_charactor . "_select_c"],
                    "select_d" => $tmpresult[$i][$first_charactor . "_select_d"],
                    "exam" => $tmpresult[$i][$first_charactor . "_select_a"],
                    "solution" => $tmpresult[$i][$first_charactor . "_solution"],
                    "answer" => $tmpresult[$i][$first_charactor . "_answer"],
                    "analyse" => $tmpresult[$i][$first_charactor . "_analyse"],
                    "img_url_1" => $tmpresult[$i][$first_charactor . "_img_url_1"],
                    "img_url_2" => $tmpresult[$i][$first_charactor . "_img_url_2"],
                    "video_url" => $tmpresult[$i][$first_charactor . "_video_url"]);
            }
            break;
        case "2":
            for ($i = 0; $i < count($tmpresult); $i++) {
                $result[$i] = array('id' => $tmpresult[$i][$first_charactor . "_id"],
                    "question" => $tmpresult[$i][$first_charactor . "_question"],
                    "exam" => $tmpresult[$i][$first_charactor . "_select_a"],
                    "solution" => $tmpresult[$i][$first_charactor . "_solution"],
                    "answer" => $tmpresult[$i][$first_charactor . "_answer"],
                    "analyse" => $tmpresult[$i][$first_charactor . "_analyse"],
                    "img_url_1" => $tmpresult[$i][$first_charactor . "_img_url_1"],
                    "img_url_2" => $tmpresult[$i][$first_charactor . "_img_url_2"],
                    "video_url" => $tmpresult[$i][$first_charactor . "_video_url"]);
            }
            break;
        case "3":
            for ($i = 0; $i < count($tmpresult); $i++) {
                $result[$i] = array('id' => $tmpresult[$i][$first_charactor . "_id"],
                    "question" => $tmpresult[$i][$first_charactor . "_question"],
                    "exam" => $tmpresult[$i][$first_charactor . "_select_a"],
                    "solution" => $tmpresult[$i][$first_charactor . "_solution"],
                    "answer" => $tmpresult[$i][$first_charactor . "_answer"],
                    "analyse" => $tmpresult[$i][$first_charactor . "_analyse"],
                    "img_url_1" => $tmpresult[$i][$first_charactor . "_img_url_1"],
                    "img_url_2" => $tmpresult[$i][$first_charactor . "_img_url_2"],
                    "video_url" => $tmpresult[$i][$first_charactor . "_video_url"]);
            }
            break;
    }
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "question" => $result, "type" => $questiontype));
    $conne->close_rst();
    $conne->close_conn();
}