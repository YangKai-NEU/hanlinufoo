<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Update the MathJax to satisfy the needs of client
 * */
function get_latex_from_html($str)
{
    if (preg_match_all('/\<img class="kfformula"(.+?)data-latex="(.+?)"\/>/', $str, $matches)) {
        for ($i = 0; $i < count($matches[2]); $i++) {
            $str = str_replace($matches[0][$i], "$ " . $matches[2][$i] . " $", $str);
        }
    }
    $str = str_replace("<p>", "", $str);
    $str = str_replace("</p>", "", $str);
    return $str;
}

/*
 * Upload the file to BCE and delete the temporal file
 * */
function getKeyImg($client, $str)
{
    if (preg_match_all('/<img(.+?)src="(.+?)" title(.+?)>/', $str, $matches)) {
        for ($i = 0; $i < count($matches[2]); $i++) {
            $key = $client->uploadFile("../" . $matches[2][$i]);
            $url = $client->getUrl($key);
            unlink("../" . $matches[2][$i]);
            $str = str_replace($matches[0][$i], "<img src=\"" . $url . "\" style=\"vertical-align: middle\"/>", $str);
        }
    }
    return $str;
}

/*
 * To save the mark '\'
 * */
function format($tmp)
{
    $result = str_replace("\\", "\\\\", $tmp);
    return $result;
}

$sid = "";
$questiontype = "";

/*
 * Init the BCE client to upload some file(images and videos)
 * */
require '../bce-php-sdk-0.8.20/MyBosClient.php';
$client = new MyBosClient();
$client->initClient("hanlin-img");

if (isset($_POST["subject"]) && $_POST["subject"] != null && isset($_POST["type"]) && $_POST["type"] != null) {
    $sid = $_POST['subject'];
    $questiontype = $_POST["type"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

switch ($questiontype) {
    case "1":
        $question = "";
        $select_a = "";
        $select_b = "";
        $select_c = "";
        $select_d = "";
        $answer = "";
        $analyse = "";
        $video = "";
        $exam = "";
        $solution = "";
        if (isset($_POST["question"]) && $_POST["question"] != null && isset($_POST["select_a"]) && $_POST["select_a"] != null && isset($_POST["select_b"]) && $_POST["select_b"] != null
            && isset($_POST["select_c"]) && $_POST["select_c"] != null && isset($_POST["select_d"]) && $_POST["select_d"] != null && isset($_POST["solution"]) && $_POST["solution"] != null
            && isset($_POST["answer"]) && $_POST["answer"] != null && isset($_POST["analyse"]) && $_POST["analyse"] != null && isset($_POST["exam"]) && $_POST["exam"] != null
        ) {
            $question = getKeyImg($client, format(get_latex_from_html($_POST["question"])));
            $select_a = getKeyImg($client, format(get_latex_from_html($_POST["select_a"])));
            $select_b = getKeyImg($client, format(get_latex_from_html($_POST["select_b"])));
            $select_c = getKeyImg($client, format(get_latex_from_html($_POST["select_c"])));
            $select_d = getKeyImg($client, format(get_latex_from_html($_POST["select_d"])));
            $solution = getKeyImg($client, format(get_latex_from_html($_POST["solution"])));
            $answer = getKeyImg($client, format(get_latex_from_html($_POST["answer"])));
            $analyse = getKeyImg($client, format(get_latex_from_html($_POST["analyse"])));
            $exam = $_POST["exam"];
            /*
             * Load database config file
             * */
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_choice_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_choice_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            $sql = "INSERT INTO " . $tablename . "(" . $first_charactor . "_question," . $first_charactor . "_select_a," . $first_charactor . "_select_b," . $first_charactor . "_select_c," . $first_charactor . "_select_d," . $first_charactor . "_exam," . $first_charactor . "_solution," . $first_charactor . "_answer," . $first_charactor . "_analyse," . $first_charactor . "_video_url) VALUES(
                '" . $question . "','" . $select_a . "','" . $select_b . "','" . $select_c . "','" . $select_d . "','" . $exam . "','" . $solution . "','" . $answer . "','" . $analyse . "','" . $video . "')";
            $conne->uidRst($sql);
            $url = "../teacher/question.html";
            $result = array("Code" => "1", "Msg" => "上传成功".$sql);
            echo json_encode($result);
            exit(0);
        } else {
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
            exit(0);
        }
        break;
    case "2":
        $question = "";
        $answer = "";
        $analyse = "";
        $video = "";
        $exam = "";
        $solution = "";
        if (isset($_POST["question"]) && $_POST["question"] != null && isset($_POST["solution"]) && $_POST["solution"] != null
            && isset($_POST["answer"]) && $_POST["answer"] != null && isset($_POST["analyse"]) && $_POST["analyse"] != null && isset($_POST["exam"]) && $_POST["exam"] != null
        ) {
            $question = getKeyImg($client, format(get_latex_from_html($_POST["question"])));
            $solution = getKeyImg($client, format(get_latex_from_html($_POST["solution"])));
            $answer = getKeyImg($client, format(get_latex_from_html($_POST["answer"])));
            $analyse = getKeyImg($client, format(get_latex_from_html($_POST["analyse"])));
            $exam = $_POST["exam"];
            /*
             * Load database config file
             * */
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_fillin_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_fillin_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            $sql = "INSERT INTO " . $tablename . "(" . $first_charactor . "_question," . $first_charactor . "_exam," . $first_charactor . "_solution," . $first_charactor . "_answer," . $first_charactor . "_analyse," . $first_charactor . "_video_url) VALUES(
                '" . $question . "','" . $exam . "','" . $solution . "','" . $answer . "','" . $analyse . "','" . $video . "')";
            $conne->uidRst($sql);
            $url = "../teacher/question.html";
            $result = array("Code" => "1", "Msg" => "上传成功".$sql);
            echo json_encode($result);
            exit(0);
        } else {
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
            exit(0);
        }
        break;
    case "3":
        $question = "";
        $answer = "";
        $analyse = "";
        $video = "";
        $exam = "";
        $solution = "";
        if (isset($_POST["question"]) && $_POST["question"] != null && isset($_POST["solution"]) && $_POST["solution"] != null
            && isset($_POST["answer"]) && $_POST["answer"] != null && isset($_POST["analyse"]) && $_POST["analyse"] != null && isset($_POST["exam"]) && $_POST["exam"] != null
        ) {
            $question = getKeyImg($client, format(get_latex_from_html($_POST["question"])));
            $solution = getKeyImg($client, format(get_latex_from_html($_POST["solution"])));
            $answer = getKeyImg($client, format(get_latex_from_html($_POST["answer"])));
            $analyse = getKeyImg($client, format(get_latex_from_html($_POST["analyse"])));
            $exam = $_POST["exam"];
            /*
             * Load database config file
             * */
            require '../db/conn.class.php';
            $conne->init_conn();
            $sql = "SELECT s_answer_table_name FROM subject WHERE s_id='" . $sid . "'";
            $tmparray = $conne->getRowsArray($sql);
            $conne->close_rst();
            $tablename = $tmparray[0]["s_answer_table_name"];
            $first_charactor = substr($tablename, 0, 1);
            $sql = "INSERT INTO " . $tablename . "(" . $first_charactor . "_question," . $first_charactor . "_exam," . $first_charactor . "_solution," . $first_charactor . "_answer," . $first_charactor . "_analyse," . $first_charactor . "_video_url) VALUES(
                '" . $question . "','" . $exam . "','" . $solution . "','" . $answer . "','" . $analyse . "','" . $video . "')";
            $conne->uidRst($sql);
            $url = "../teacher/question.html";
            $result = array("Code" => "1", "Msg" => "上传成功".$sql);
            echo json_encode($result);
            exit(0);
        } else {
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
            exit(0);
        }
        break;
    default:
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
        exit(0);
        break;
}
?>