<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/10 0010
 * Time: 上午 10:57
 */

require 'config.class.php';

require 'class/StudentClass.php';
require 'class/TeacherClass.php';
require 'class/AdminClass.php';

/*
 * This has been put into the login action
 * */
//SESSION_START();

/*
 * This should be deleted
 * */
//$_SESSION['account']=null;
//$_SESSION["type"]=null;

/*
 * Check whether the user has logined, the user can be student, teacher, or admin
 * */
function is_login()
{
    if(isset($_SESSION["account"])&&$_SESSION["account"]!=null&&$_SESSION["account"]!=""&&isset($_SESSION["type"])&&$_SESSION["type"]!=null&&$_SESSION["type"]!=""){
        if(($_SESSION["type"]==STUDENT_TYPE&&$_SESSION["account"]->getSId()!='')||($_SESSION["type"]==TEACHER_TYPE&&$_SESSION["account"]->getTId()!='')||($_SESSION["type"]==ADMIN_TYPE&&$_SESSION["account"]->getAId()!='')){
            return true;
        }
    }
    return false;
}
