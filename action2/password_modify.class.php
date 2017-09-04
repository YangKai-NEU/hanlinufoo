<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Modify password according the username, password and new password
 * */
if(isset($_POST["username"])&&$_POST["username"]!=null&&isset($_POST["password"])&&$_POST["password"]!=null&&isset($_POST["newpassword"])&&$_POST["newpassword"]!=null){
    /*
     * Load the database config file
     * */
    require '../db/conn.class.php';
    /*
     * Init the database connection
     * */
    $conne->init_conn();
    /*
     * Update the password of user in the database
     * */
    $sql="UPDATE user SET m_password='".$_POST["newpassword"]."' WHERE m_username='".$_POST["username"]."' AND m_password='".$_POST["password"]."'";
    $affected=$conne->uidRst($sql);
    $conne->close_conn();
    /*
     * Check whether the password was updated successful
     * */
    if($affected==1){
        /*
         * The password was updated successful
         * */
        $result=array("Code"=>"1","Msg"=>"密码修改成功");
        echo json_encode($result);
        exit(0);
    }else{
        /*
         * The password update was failed
         * */
        $result=array("Code"=>"-1","Msg"=>"密码修改错误");
        echo json_encode($result);
        exit(0);
    }
}else{
    /*
     * The parameter is unset
     * */
    $result=array("Code"=>"-1","Msg"=>"参数错误");
    echo json_encode($result);
    exit(0);
}
?>