<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/UserClass.php";
require "./class/SubjectClass.php";
/*
 * To save the mark '\'
 * */
function format($tmp)
{
    $result = str_replace("\\", "\\\\", $tmp);
    $result = str_replace("https", "http", $result);
    return $result;
}

session_start();
$tid = "";
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null) {
    $tid = $_SESSION[ACCOUNT]->m_id;
} else {
    $result = array("Code" => "-1", "Msg" => "权限错误");
    echo json_encode($result);
    exit(0);
}

$quiz = "";
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && $_SESSION[SUBJECT] != "" && isset($_POST["quiz"]) && $_POST["quiz"] != null && $_POST["quiz"] != "") {
    $quiz = json_decode($_POST["quiz"]);
    $quiz_name = $quiz->quiz_name;
    $quiz_content = $quiz->quiz_content;
    require "../db/conn.class.php";
    $conne->init_conn();

    $time = date('Y-m-d h:i:s', time());
    $sql = "INSERT INTO homework(m_tid,m_sid,m_homework_name,m_time,m_submit) VALUES('" . $tid . "','" . $_SESSION[SUBJECT]->m_id . "','" . $quiz_name . "','" . $time . "','Y')";
    $affected = $conne->uidRst($sql);
    $sql = "SELECT m_id FROM homework WHERE m_tid='" . $tid . "' AND m_time='" . $time . "'";
    $tmp = $conne->getRowsArray($sql);
    $conne->close_rst();
    $hid = $tmp[0]["m_id"];

//    $conso="";

    for ($i = 0; $i < count($quiz_content); $i++) {
        $sql = "INSERT INTO homework_content(m_hid,m_question,m_select_a,m_select_b,m_select_c,m_select_d,m_answer,m_analyse,m_solution,m_video_url,m_type,m_exam,m_expect) VALUES(
        '" . $hid . "','" . format($quiz_content[$i]->quiz_question) . "','" . format($quiz_content[$i]->quiz_select_a) . "','" . format($quiz_content[$i]->quiz_select_b) . "','" . format($quiz_content[$i]->quiz_select_c) . "','" . format($quiz_content[$i]->quiz_select_d) . "','" . format($quiz_content[$i]->quiz_answer) . "','" . format($quiz_content[$i]->quiz_analyse) . "','" . format($quiz_content[$i]->quiz_solution) . "','" . $quiz_content[$i]->quiz_video . "','" . $quiz_content[$i]->quiz_type . "','" . $quiz_content[$i]->quiz_exam . "','1')";
        $conne->uidRst($sql);
//        $conso.= format($quiz_content[$i]->quiz_question).",";
    }

    $conne->close_rst();
    $conne->close_conn();
    $result = array("Code" => "1", "Msg" => "添加成功");
    echo json_encode($result);
    exit(0);
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
?>