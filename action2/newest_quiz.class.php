<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Load the config file
 * */
require 'config.class.php';

/*
 * Get the quizs which are newest(page was used to get according data)
 * */
if (isset($_POST["grade"]) && $_POST["grade"] != null && $_POST["grade"] != "" && isset($_POST["page"]) && $_POST["page"] != null && $_POST["page"] != "") {
    /*
     * Load the database config file
     * */
    require '../db/conn.class.php';
    /*
     * Init the database connection
     * */
    $conne->init_conn();
    /*
     * Get data from database
     * */
    $sql = "SELECT homework.*,subject.m_img FROM homework,subject WHERE m_publish='Y' AND homework.m_sid=subject.m_id AND subject.m_grade='" . $_POST["grade"] . "' ORDER BY m_time DESC LIMIT " . (PAGE_SIZE * intval($_POST["page"])) . "," . PAGE_SIZE;
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
        $finalresult[$i] = array("id" => $tmparray[$i]["m_id"], "name" => $tmparray[$i]["m_homework_name"], "time" => $tmparray[$i]["m_time"], "img" => __ROOT_PATH__ . "/image/" . $tmparray[$i]["m_img"]);
    }
    /*
     * Get data successful
     * */
    $result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $finalresult);
    echo json_encode($result);
    exit(0);
} else {
    /*
     * The parameter is unset
     * */
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
?>
