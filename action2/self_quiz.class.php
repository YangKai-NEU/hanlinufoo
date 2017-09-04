<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Load the config file
 * */
require 'config.class.php';

/*
 * Get the homework according the grade and ID of student(and page was set to get according data)
 * */
if (isset($_POST["grade"]) && $_POST["grade"] != null && isset($_POST["sid"]) && $_POST["sid"] != null && isset($_POST["page"]) && $_POST["page"] != null) {
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
    $sql = "SELECT homework.m_id as id,m_homework_name as name,m_time as time,m_img as img  FROM homework,subject,homework_item WHERE homework.m_id=homework_item.m_hid AND m_state='N' AND homework_item.m_sid ='" . $_POST["sid"] . "' AND m_publish='Y' AND homework.m_sid=subject.m_id AND subject.m_grade='" . $_POST["grade"] . "' ORDER BY m_time DESC LIMIT " . (PAGE_SIZE * intval($_POST["page"])) . "," . PAGE_SIZE;
    $tmparray = $conne->getRowsArray($sql);
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
    /*
     * Format the data
     * */
    $finalresult = array();
    for ($i = 0; $i < count($tmparray); $i++) {
        $finalresult[$i] = array("id" => $tmparray[$i]["id"], "name" => $tmparray[$i]["name"], "time" => $tmparray[$i]["time"], "img" => __ROOT_PATH__ . "/image/" . $tmparray[$i]["img"]);
    }
    /*
     * Get data successful
     * */
    $result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $finalresult);
    echo json_encode($result);
    exit(0);
} else {
    /*
     * The parameters was unset
     * */
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
?>