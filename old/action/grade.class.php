<?php

header("Content-type: text/html; charset=utf-8");
require "config.class.php";
require "class/CacheClass.php";

if (CACHEENABLE) {
    /*
     * The diretor of the cache file
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
    /*
     * Get the data from database
     * */
    $sql = "SELECT * FROM grade WHERE m_parent='-1'";
    $tmpresult = $conne->getRowsArray($sql);
    echo json_encode(array("Code" => "1", "Msg" => "200", "grade"=>$tmpresult));
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
    /*
     * Write the result to the cache file
     * */
    $cache->write(3, json_encode(array("Code" => "1", "Msg" => "200", "grade"=>$result)));
    ob_end_flush();
} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT * FROM grade WHERE m_parent='-1'";
    $tmpresult = $conne->getRowsArray($sql);
    echo json_encode(array("Code" => "1", "Msg" => "200", "grade"=>$tmpresult));
    /*
     * Close the database connection file
     * */
    $conne->close_rst();
    $conne->close_conn();
}