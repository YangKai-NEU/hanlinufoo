<?php

header("Content-type: text/html; charset=utf-8");
require "config.class.php";
require "class/CacheClass.php";

$gid="";

if(isset($_POST["gid"])&&$_POST["gid"]!=null){
    $gid=$_POST["gid"];
}else{
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {
    /*
     * The director of the cache file
     * */
    $cachedir = './cache/';
    $cache = new Cache($cachedir, "", 30);
    if ($cache->load() == true)
        exit(0);
    /*
     * Load the database config file
     * */
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT * FROM grade WHERE g_parent='".$gid."'";
    $tmpresult = $conne->getRowsArray($sql);
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "grade"=>$tmpresult));
    /*
     * Close the database onnection
     * */
    $conne->close_rst();
    $conne->close_conn();
    /*
     * Write the result to the cache file
     * */
    $cache->write(3, json_encode(array("Code" => "1", "Msg" => "获取数据成功", "grade"=>$result)));
    ob_end_flush();
} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT * FROM grade WHERE g_parent='".$gid."'";
    $tmpresult = $conne->getRowsArray($sql);
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "grade"=>$tmpresult));
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
}