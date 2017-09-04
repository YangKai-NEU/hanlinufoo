<?php

/*
 * The homepage displays it
 * Both the student, teacher, admin can view it
 * There is no problem
 * */

header("Content-type: text/html; charset=utf-8");
require '../db/conn.class.php';

/*
 * Init the database connection
 * */
$conne->init_conn();
$sql = "SELECT grade.m_name as grade_name,subject.m_id as subject_id,subject.m_name as subject_name,subject.m_grade as subject_gid FROM grade,subject WHERE grade.m_id=subject.m_grade ORDER BY subject.m_grade";
$tmpresult = $conne->getRowsArray($sql);

/*
 * Close the database connection file
 * */
$conne->close_rst();
$conne->close_conn();

/*
 * Return the result
 * */
echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "Data" => $tmpresult));