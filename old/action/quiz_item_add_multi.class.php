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
$num = "";
$type = "";
$eid = "";
if (isset($_POST["sid"]) && $_POST["sid"] != null && $_POST["sid"] != "" && isset($_POST["eid"]) && $_POST["eid"] != null && $_POST["eid"] != "" && isset($_POST["num"]) && $_POST["num"] != null && $_POST["num"] != "" && isset($_POST["type"]) && $_POST["type"] != null && $_POST["type"] != "") {
    $sid = $_POST["sid"];
    $num = $_POST["num"];
    $type = $_POST["type"];
    $eid = $_POST["eid"];
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
    $result = array("Code" => "-1", "Msg" => "未找到任何记录");
    echo json_encode($result);
    exit(0);
}

$state = false;

switch ($type) {
    case CHOICE_TABLE:
        $sql = "SELECT s_choice_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_choice_table_name"];
        $first_charactor = substr($tablename, 0, 1);
        $sql = "SELECT * FROM " . $tablename . " WHERE ".$first_charactor."_exam='".$eid."' LIMIT " . $num;
        $temarray = $conne->getRowsArray($sql);
        if (count($temarray) == 0) {
            $result = array("Code" => "-1", "Msg" => "未知错误");
            echo json_encode($result);
            exit(0);
        }
        for ($i = 0; $i < count($temarray); $i++) {
            $sql = "INSERT INTO " . $table . "(q_question,q_select_a,q_select_b,q_select_c,q_select_d,q_exam,q_solution,q_answer,q_analyse,q_video_url,q_type,q_expect) VALUES(
        '" . format($temarray[$i][$first_charactor . "_question"]) . "','" . format($temarray[$i][$first_charactor . "_select_a"]) . "','" . format($temarray[$i][$first_charactor . "_select_b"]) . "','" . format($temarray[$i][$first_charactor . "_select_c"]) . "','" .
                format($temarray[$i][$first_charactor . "_select_d"]) . "','" . $temarray[$i][$first_charactor . "_exam"] . "','" . format($temarray[$i][$first_charactor . "_solution"]) . "','" . format($temarray[$i][$first_charactor . "_answer"]) . "','" .
                format($temarray[$i][$first_charactor . "_analyse"]) . "','" . $temarray[$i][$first_charactor . "_video_url"] . "','1','1')";
            $affected = $conne->uidRst($sql);
            if ($affected == 1) {
                $state = true;
            }
        }

        break;
    case FILLIN_TABLE:
        $sql = "SELECT s_fillin_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_fillin_table_name"];
        $first_charactor = substr($tablename, 0, 1);

        $sql = "SELECT * FROM " . $tablename . " WHERE ".$first_charactor."_exam='".$eid."' LIMIT " . $num;
        $temarray = $conne->getRowsArray($sql);
        if (count($temarray) == 0) {
            $result = array("Code" => "-1", "Msg" => "未知错误");
            echo json_encode($result);
            exit(0);
        }
        for ($i = 0; $i < count($temarray); $i++) {
            $sql = "INSERT INTO " . $table . "(q_question,q_exam,q_solution,q_answer,q_analyse,q_video_url,q_type,q_expect) VALUES(
            '" . format($temarray[$i][$first_charactor . "_question"]) . "','" . $temarray[$i][$first_charactor . "_exam"] . "','" . format($temarray[$i][$first_charactor . "_solution"]) . "','" . format($temarray[$i][$first_charactor . "_answer"]) . "','" .
                format($temarray[$i][$first_charactor . "_analyse"]) . "','" . $temarray[$i][$first_charactor . "_video_url"] . "','2','1')";
            $affected = $conne->uidRst($sql);
            if ($affected == 1) {
                $state = true;
            }
        }
        break;
    case ANSWER_TABLE:
        $sql = "SELECT s_answer_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_answer_table_name"];
        $first_charactor = substr($tablename, 0, 1);

        $sql = "SELECT * FROM " . $tablename . " WHERE ".$first_charactor."_exam='".$eid."' LIMIT " . $num;
        $temarray = $conne->getRowsArray($sql);
        if (count($temarray) == 0) {
            $result = array("Code" => "-1", "Msg" => "未知错误");
            echo json_encode($result);
            exit(0);
        }
        for ($i = 0; $i < count($temarray); $i++) {
            $sql = "INSERT INTO " . $table . "(q_question,q_exam,q_solution,q_answer,q_analyse,q_video_url,q_type,q_expect) VALUES(
            '" . format($temarray[$i][$first_charactor . "_question"]) . "','" . $temarray[$i][$first_charactor . "_exam"] . "','" . format($temarray[$i][$first_charactor . "_solution"]) . "','" . format($temarray[$i][$first_charactor . "_answer"]) . "','" .
                format($temarray[$i][$first_charactor . "_analyse"]) . "','" . $temarray[$i][$first_charactor . "_video_url"] . "','3','1')";
            $affected = $conne->uidRst($sql);
            if ($affected == 1) {
                $state = true;
            }
        }
        break;
    default:
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
        exit(0);
}
if ($state == false) {
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
