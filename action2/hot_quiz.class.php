<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Load the config file
 * */
require 'config.class.php';
/*
 * Load the database config file
 * */
require '../db/conn.class.php';

/*
 * Get hot quizs according the page and grade
 * */
if (isset($_POST["page"]) && $_POST["page"] != null && $_POST["page"] != "" && isset($_POST["grade"]) && $_POST["grade"] != null && $_POST["grade"] != "") {
    /*
     * Init the database connection
     * */
    $conne->init_conn();
    /*
     * Get data from database
     * */
    $sql = "SELECT homework.*,subject.m_name FROM homework, subject WHERE m_publish='Y' AND m_sid=subject.m_id AND m_grade='" . $_POST["grade"] . "' ORDER BY m_hot DESC LIMIT " . (PAGE_SIZE * intval($_POST["page"])) . "," . PAGE_SIZE;
    $tmparray = $conne->getRowsArray($sql);
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
    /*
     * Format the result
     * */
    $finalresult = array();
    for ($i = 0; $i < count($tmparray); $i++) {
        $finalresult[$i] = array("id" => $tmparray[$i]["m_id"], "name" => $tmparray[$i]["m_homework_name"], "subject" => $tmparray[$i]["m_name"]);
    }
    /*
     * Get data successful
     * */
    $result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $finalresult);
    echo json_encode($result);
    exit(0);
} else {
    /*
     * Parameter is unset
     * */
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
?>