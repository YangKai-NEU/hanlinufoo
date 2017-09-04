<?php

header("Content-type: text/html; charset=utf-8");
require "account.class.php";

function format($tmp)
{
    $result = str_replace("\\", "\\\\", $tmp);
    return $result;
}

session_start();
$tid = "";
if (isset($_SESSION["type"]) && $_SESSION["type"] == TEACHER_TYPE && isset($_SESSION["account"]) && $_SESSION["account"] != null && $_SESSION["account"] != "" && is_login($_SESSION["account"], $_SESSION["type"])) {
    $tid = $_SESSION["account"]->getTId();
} else {
    $result = array("Code" => "-1", "Msg" => "权限错误");
    echo json_encode($result);
    exit(0);
}

$sid = "";
$qid = "";
$type = "";
if (isset($_POST["sid"]) && $_POST["sid"] != null && $_POST["sid"] != "" && isset($_POST["qid"]) && $_POST["qid"] != null && $_POST["qid"] != "" && isset($_POST["type"]) && $_POST["type"] != null && $_POST["type"] != "") {
    $sid = $_POST["sid"];
    $qid = $_POST["qid"];
    $type = $_POST["type"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";
$conne->init_conn();

$sql = "";
$table = "";
if (isset($_SESSION["quiz"]) && $_SESSION["quiz"] != null && $_SESSION["quiz"] != "") {
    $table = $_SESSION["quiz"];
} else {
    $result = array("Code" => "-1", "Msg" => "当前不存在任何试卷");
    echo json_encode($result);
    exit(0);
}

switch ($type) {
    case CHOICE_TABLE:
        $sql = "SELECT s_choice_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_choice_table_name"];
        $first_charactor = substr($tablename, 0, 1);
        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_id='" . $qid . "'";
        $temarray = $conne->getRowsArray($sql);
        if (count($temarray) != 1) {
            $result = array("Code" => "-1", "Msg" => "未知错误");
            echo json_encode($result);
            exit(0);
        }
        $sql = "INSERT INTO " . $table . "(q_question,q_select_a,q_select_b,q_select_c,q_select_d,q_exam,q_solution,q_answer,q_analyse,q_video_url,q_type,q_expect) VALUES(
        '" . format($temarray[0][$first_charactor . "_question"]) . "','" . format($temarray[0][$first_charactor . "_select_a"]) . "','" . format($temarray[0][$first_charactor . "_select_b"]) . "','" . format($temarray[0][$first_charactor . "_select_c"]) . "','" .
            format($temarray[0][$first_charactor . "_select_d"]) . "','" . $temarray[0][$first_charactor . "_exam"] . "','" . format($temarray[0][$first_charactor . "_solution"]) . "','" . format($temarray[0][$first_charactor . "_answer"]) . "','" .
            format($temarray[0][$first_charactor . "_analyse"]) . "','" . $temarray[0][$first_charactor . "_video_url"] . "','1','1')";
        break;
    case FILLIN_TABLE:
        $sql = "SELECT s_fillin_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_fillin_table_name"];
        $first_charactor = substr($tablename, 0, 1);

        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_id='" . $qid . "'";
        $temarray = $conne->getRowsArray($sql);
        if (count($temarray) != 1) {
            $result = array("Code" => "-1", "Msg" => "未知错误");
            echo json_encode($result);
            exit(0);
        }
        $sql = "INSERT INTO " . $table . "(q_question,q_select_a,q_select_b,q_select_c,q_select_d,q_exam,q_solution,q_answer,q_analyse,q_video_url,q_type,q_expect) VALUES(
        '" . format($temarray[0][$first_charactor . "_question"]) . "','" . $temarray[0][$first_charactor . "_exam"] . "','" . format($temarray[0][$first_charactor . "_solution"]) . "','" . format($temarray[0][$first_charactor . "_answer"]) . "','" .
            format($temarray[0][$first_charactor . "_analyse"]) . "','" . $temarray[0][$first_charactor . "_video_url"] . "','2','1')";
        break;
    case ANSWER_TABLE:
        $sql = "SELECT s_answer_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_answer_table_name"];
        $first_charactor = substr($tablename, 0, 1);

        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_id='" . $qid . "'";
        $temarray = $conne->getRowsArray($sql);
        if (count($temarray) != 1) {
            $result = array("Code" => "-1", "Msg" => "未知错误");
            echo json_encode($result);
            exit(0);
        }
        $sql = "INSERT INTO " . $table . "(q_question,q_select_a,q_select_b,q_select_c,q_select_d,q_exam,q_solution,q_answer,q_analyse,q_video_url,q_type,q_expect) VALUES(
        '" . format($temarray[0][$first_charactor . "_question"]) . "','" . $temarray[0][$first_charactor . "_exam"] . "','" . format($temarray[0][$first_charactor . "_solution"]) . "','" . format($temarray[0][$first_charactor . "_answer"]) . "','" .
            format($temarray[0][$first_charactor . "_analyse"]) . "','" . $temarray[0][$first_charactor . "_video_url"] . "','3','1')";
        break;
    default:
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
        exit(0);
}
$affected = $conne->uidRst($sql);
if ($affected != 1) {
    $result = array("Code" => "-1", "Msg" => "添加失败");
    echo json_encode($result);
    $conne->close_rst();
    $conne->close_conn();
    exit(0);
}
$conne->close_rst();
$conne->close_conn();
$result = array("Code" => "1", "Msg" => "添加成功");
echo json_encode($result);
