<?php

/*
 * This aim is to save the subject information to the session
 * */
header("Content-type: text/html; charset=utf-8");
require "./class/SubjectClass.php";
require "./class/GradeClass.php";
require "./config.class.php";

if (isset($_POST["subject"]) && $_POST["subject"] != null && $_POST["subject"] != "") {
    require "../db/conn.class.php";
    $conne->init_conn();
    $sql = "SELECT * FROM subject WHERE m_id='" . $_POST["subject"] . "'";
    $tmparray = $conne->getRowsArray($sql);
    $conne->close_rst();
    if (count($tmparray) == 0) {
        $conne->close_rst();
        $conne->close_conn();
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
    } else {
        $subject = new SubjectClass($tmparray[0]["m_id"], $tmparray[0]["m_name"], $tmparray[0]["m_grade"], $tmparray[0]["m_choice_table_name"], $tmparray[0]["m_fillin_table_name"], $tmparray[0]["m_answer_table_name"], $tmparray[0]["m_exam_table_name"], $tmparray[0]["m_section_table_name"], $tmparray[0]["m_chapter_table_name"], $tmparray[0]["m_section_exam_table_name"], $tmparray[0]["m_icon"], $tmparray[0]["m_img"]);
        $sql = "SELECT * FROM grade WHERE m_id='" . $subject->m_grade . "'";
        $tmpresult = $conne->getRowsArray($sql);
        if (count($tmpresult) != 0) {
            $conne->close_rst();
            $conne->close_conn();
            session_start();
            $_SESSION[SUBJECT] = $subject;
            $result = array("Code" => "1", "Msg" => "设置成功");
            echo json_encode($result);
        } else {
            $conne->close_rst();
            $conne->close_conn();
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
        }
    }
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
}