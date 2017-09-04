<?php

header("Content-type: text/html; charset=utf-8");
require "account.class.php";

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
$quizname = "";
if (isset($_POST["sid"]) && $_POST["sid"] != null && $_POST["sid"] != "" && isset($_POST["name"]) && $_POST["name"] != null && $_POST["name"] != "") {
    $sid = $_POST["sid"];
    $quizname = $_POST["name"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

$tablename = "quiz_" . date('YmdHis') . rand(100, 999);

require "../db/conn.class.php";
$conne->init_conn();

$sql = "CREATE TABLE `" . $tablename . "` (
  `q_id` int(11) NOT NULL AUTO_INCREMENT,
  `q_question` text DEFAULT NULL,
  `q_select_a` text DEFAULT NULL,
  `q_select_b` text DEFAULT NULL,
  `q_select_c` text DEFAULT NULL,
  `q_select_d` text DEFAULT NULL,
  `q_exam` int(11) DEFAULT NULL,
  `q_solution` text DEFAULT NULL,
  `q_answer` text DEFAULT NULL,
  `q_analyse` text DEFAULT NULL,
  `q_video_url` varchar(255) DEFAULT NULL,
  `q_type` varchar(1) DEFAULT NULL,
  `q_expect` int(11) DEFAULT NULL,
  PRIMARY KEY (`q_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
";
$conne->uidRst($sql);
$conne->close_rst();


$sql = "INSERT INTO homework(h_tid,h_sid,h_table_name,h_homework_name,h_time) VALUES('" . $tid . "','" . $sid . "','" . $tablename . "','" . $quizname . "','" . date('Y-m-d h:i:s', time()) . "')";
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
$_SESSION["quiz"] = $tablename;
$result = array("Code" => "1", "Msg" => "添加成功");
echo json_encode($result);
