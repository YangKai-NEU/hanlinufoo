<?php

header("Content-type: text/html; charset=utf-8");

function changeHttps($var)
{
    $result = str_replace("https", "http", $var);
    return $result;
}

/*
 * Load the config file
 * */
require 'config.class.php';
/*
 * Set the temporal uploaded file path
 * */
$target_path = "../upload/";
$target_path = $target_path . basename($_FILES['pic']['name']);

$sid = "";
$key = "";
if (isset($_POST["sid"]) && $_POST["sid"] != null) {
    $sid = $_POST["sid"];
}

/*
 * Move the uploaded file to the according path and upload the image file to the BCE
 * */
if (move_uploaded_file($_FILES['pic']['tmp_name'], $target_path)) {
    require '../bce-php-sdk-0.8.20/MyBosClient.php';
    $client = new MyBosClient();
    $client->initClient("hanlin-img-user");
    $key = $client->uploadFile($target_path);
    $url = $client->getUrl($key);
    /*
     * Delete the file in the temporal path
     * */
    unlink($target_path);

    if ($sid != "") {
        /*
         * Load the database config file
         * */
        require '../db/conn.class.php';
        /*
         * Init the database connection
         * */
        $conne->init_conn();
        /*
         * Set the head image of student account
         * */
        $sql = "UPDATE user SET m_img='" . changeHttps($url) . "' WHERE m_id='" . $sid . "'";
        $conne->uidRst($sql);
        /*
         * Close the database connection
         * */
        $conne->close_conn();
    }
    /*
     * The image was uploaded successful
     * */
    $result = array("Code" => "1", "Msg" => "上传成功", "Data" => changeHttps($url));
    echo json_encode($result);
    exit(0);
} else {
    /*
     * The parameter was unset
     * */
    $result = array("Code" => "-1", "Msg" => "上传失败", "Type" => "2");
    echo json_encode($result);
    exit(0);
}
?>