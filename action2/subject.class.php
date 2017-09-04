<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Load the config from file
 * */
require 'config.class.php';

/*
 * Get the subjects according the grade
 * */
if(isset($_POST["grade"])&&$_POST["grade"]!=null){
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
    $sql="SELECT * FROM subject WHERE m_grade='".$_POST["grade"]."' AND m_id IN (SELECT m_sid FROM homework)";
    $tmparray=$conne->getRowsArray($sql);
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
    /*
     * Format the result
     * */
    $finalarray=array();
    for($i=0;$i<count($tmparray);$i++){
        $finalarray[$i]=array("id"=>$tmparray[$i]["m_id"],"name"=>$tmparray[$i]["m_name"],"img"=>__ROOT_PATH__."/image/".$tmparray[$i]["m_icon"]);
    }
    /*
     * The result was got successful
     * */
    $result=array("Code"=>"1","Msg"=>"获取数据成功","Data"=>$finalarray);
    echo json_encode($result);
    exit(0);
}else {
    /*
     * The parameter is unset
     * */
    $result=array("Code"=>"-1","Msg"=>"参数错误");
    echo json_encode($result);
    exit(0);
}
?>
