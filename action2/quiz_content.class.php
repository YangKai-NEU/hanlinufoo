<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Load the config file
 * */
require 'config.class.php';

/*
 * To make the mark '\' was saved
 * */
function format($tmp)
{
    $result = str_replace("\\", "\\\\", $tmp);
    return $result;
}

/*
 * Format the MathJax to satisfy the need of client
 * */
function get_latex_from_html($str)
{
    if (preg_match_all('/\$(.+?)\$/', $str, $matches)) {
        for ($i = 0; $i < count($matches[1]); $i++) {
            $str = str_replace($matches[0][$i], "\\(" . $matches[1][$i] . "\\)", $str);
        }
    }
    return $str;
}

/*
 * Get the content of quiz according the ID of quiz
 * */
if (isset($_POST["hid"]) && $_POST["hid"] != null && $_POST["hid"] != "") {
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
    $sql = "SELECT * FROM homework WHERE m_id='" . $_POST["hid"] . "'";
    $tmparray = $conne->getRowsArray($sql);
    $conne->close_rst();
    if (count($tmparray) != 0) {
        $name = $tmparray[0]["m_homework_name"];
        /*
         * Get data from database
         * */
        $sql = "SELECT m_exam_table_name FROM subject WHERE m_id='" . $tmparray[0]["m_sid"] . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["m_exam_table_name"];
        $first_charactor = substr($tablename, 0, 1);
        $sql = "SELECT homework_content.*," . $tablename . "." . $first_charactor . "_name as name," . $tablename . "." . $first_charactor . "_video as examvideo FROM homework_content," . $tablename . " WHERE homework_content.m_hid='" . $_POST["hid"] . "' AND m_exam=" . $tablename . "." . $first_charactor . "_id ORDER BY m_exam";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        /*
         * Format the result
         * */
        $finalarray = array();
        for ($i = 0; $i < count($tmparray); $i++) {
            $finalarray[$i] = array("id" => $tmparray[$i]["m_id"], "question" => get_latex_from_html($tmparray[$i]["m_question"]), "selecta" => get_latex_from_html($tmparray[$i]["m_select_a"]), "selectb" => get_latex_from_html($tmparray[$i]["m_select_b"]), "selectc" => get_latex_from_html($tmparray[$i]["m_select_c"]), "selectd" => get_latex_from_html($tmparray[$i]["m_select_d"]), "exam" => $tmparray[$i]["name"], "answer" => get_latex_from_html($tmparray[$i]["m_answer"]), "analyse" => get_latex_from_html($tmparray[$i]["m_analyse"]), "solution" => get_latex_from_html($tmparray[$i]["m_solution"]), "video" => $tmparray[$i]["m_video_url"], "expect" => $tmparray[$i]["m_expect"], "type" => $tmparray[$i]["m_type"], "examvideo" => $tmparray[$i]["examvideo"]);
        }
        /*
         * Data was got from database successful
         * */
        $result = array("Code" => "1", "Msg" => "获取数据成功", "question" => $finalarray, "title" => $name);
        echo json_encode($result);
        /*
         * Close the database connection
         * */
        $conne->close_conn();
        exit(0);
    } else {
        /*
         * There was no such quiz exist
         * */
        $result = array("Code" => "-1", "Msg" => "该试卷不存在");
        echo json_encode($result);
        /*
         * Close the database connection
         * */
        $conne->close_conn();
        exit(0);
    }
} else {
    /*
     * The parameter is unset
     * */
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
?>
