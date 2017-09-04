<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';

require 'class/StudentClass.php';
require 'class/TeacherClass.php';
require 'class/AdminClass.php';

/*
 * Check whether the user has logined, the user can be student, teacher, or admin
 * */
function is_login($account, $type)
{
    if (($type == STUDENT_TYPE && $account->getSId() == '') || ($type == TEACHER_TYPE && $account->getTId() == '') || ($type == ADMIN_TYPE && $account->getAId() == '')) {
        return false;
    } else {
        return true;
    }
}
