<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';
require './class/SubjectClass.php';
require 'class/CacheClass.php';

$tablename = "";
$questiontype = "";
$eid = "";
$page = "";

session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && $_SESSION[SUBJECT] != "" && isset($_POST["type"]) && $_POST["type"] != null && isset($_POST["page"]) && $_POST["page"] != null && isset($_POST["eid"]) && $_POST["eid"] != null) {
    $questiontype = $_POST["type"];
    $eid = $_POST["eid"];
    $page = $_POST["page"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {

} else {
    $tablename = "";
    $first_charactor = "";
    require '../db/conn.class.php';
    $conne->init_conn();
    switch ($questiontype) {
        case "1":
            $tablename = $_SESSION[SUBJECT]->m_choicetablename;
            $first_charactor = substr($tablename, 0, 1);
            break;
        case "2":
            $tablename = $_SESSION[SUBJECT]->m_fillintablename;
            $first_charactor = substr($tablename, 0, 1);
            break;
        case "3":

            $tablename = $_SESSION[SUBJECT]->m_answertablename;
            $first_charactor = substr($tablename, 0, 1);
            break;
        default:
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
            exit(0);
            break;
    }
    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_exam='" . $eid . "' LIMIT " . (PAGESIZE * intval($page)) . "," . PAGESIZE;
    $tmpresult = $conne->getRowsArray($sql);
    $conne->close_rst();
    $conne->close_conn();
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
                    "video_url" => $tmpresult[$i][$first_charactor . "_video_url"]);
            }
            break;
    }
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "question" => $result, "type" => $questiontype));
    exit(0);
}
?>

<!--<html>-->
<!--    <form action="questions.class.php" method="post">-->
<!--        <input type="text" name="type"/>-->
<!--        <input type="text" name="eid"/>-->
<!--        <input type="submit" value="提交"/>-->
<!--    </form>-->
<!---->
<!--</html>-->
