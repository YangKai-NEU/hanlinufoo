<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/SubjectClass.php";
require './class/ExamClass.php';
require "./class/CacheClass.php";
require './class/ChapterClass.php';
require './class/SectionClass.php';

function getExam($conn, $examtablename, $sectionexamtablename, $section)
{
    $first_charactor_exam = substr($examtablename, 0, 1);
    $first_charactor_sectionexam = substr($sectionexamtablename, 0, 1);
    $sql = "SELECT " . $examtablename . ".* FROM " . $examtablename . "," . $sectionexamtablename . " WHERE " . $examtablename . "." . $first_charactor_exam . "_id=" . $sectionexamtablename . "." . $first_charactor_sectionexam . "_eid AND " . $sectionexamtablename . "." . $first_charactor_sectionexam . "_sid='" . $section->m_id . "'";
    $tmp = $conn->getRowsArray($sql);
    $conn->close_rst();
    for ($i = 0; $i < count($tmp); $i++) {
        $section->m_exams[$i] = new ExamClass($tmp[$i][$first_charactor_exam . "_id"], $tmp[$i][$first_charactor_exam . "_name"], array());
    }
}

function getSection($conn, $sectiontablename, $examtablename, $sectionexamtablename, $section)
{
    $first_charactor = substr($sectiontablename, 0, 1);
    $sql = "SELECT * FROM " . $sectiontablename . " WHERE " . $first_charactor . "_parent='" . $section->m_id . "'";
    $tmp = $conn->getRowsArray($sql);
    $conn->close_rst();
    if (count($tmp) == 0) {
        getExam($conn, $examtablename, $sectionexamtablename, $section);
    } else {
        for ($i = 0; $i < count($tmp); $i++) {
            $section->m_sections[$i] = new SectionClass($tmp[$i][$first_charactor . "_id"], $tmp[$i][$first_charactor . "_name"], array(), array());
            getSection($conn, $sectiontablename, $examtablename, $sectionexamtablename, $section->m_sections[$i]);
        }
    }
}

$sectiontablename = "";
$examtablename = "";
$sectionexamtablename = "";
$cid = "";
session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && $_SESSION[SUBJECT] != "" && isset($_POST['cid']) && $_POST['cid'] != null && $_POST['cid'] != "") {
    $sectiontablename = $_SESSION[SUBJECT]->m_sectiontablename;
    $examtablename = $_SESSION[SUBJECT]->m_examtablename;
    $sectionexamtablename = $_SESSION[SUBJECT]->m_sectionexamtablename;
    $cid = $_POST['cid'];
} else {
    /*
     * The parameter is error
     * */
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {

} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $first_charactor = substr($sectiontablename, 0, 1);

    $sql = "SELECT * FROM " . $sectiontablename . " WHERE " . $first_charactor . "_chapter='" . $cid . "'";

    $tmpresult = $conne->getRowsArray($sql);
    $conne->close_rst();

    $result = new ChapterClass($cid, '', array());

    for ($i = 0; $i < count($tmpresult); $i++) {
        $result->m_sections[$i] = new SectionClass($tmpresult[$i][$first_charactor . "_id"], $tmpresult[$i][$first_charactor . "_name"], array(), array());
        getSection($conne, $sectiontablename, $examtablename, $sectionexamtablename, $result->m_sections[$i]);
    }
    /*
         * Close the database connection
         * */
    $conne->close_rst();
    $conne->close_conn();
    echo json_encode(array("Code" => "1", "Msg" => "Getting Section Successful", "section" => $result));
    exit(0);
}
?>


<!--<html>-->
<!--    <form action="section_all_get.class.php" method="post">-->
<!--        <input type="text" name="cid"/>-->
<!--        <input type="submit" value="提交"/>-->
<!--    </form>-->
<!---->
<!--</html>-->
