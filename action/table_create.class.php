<?php

header("Content-type: text/html; charset=utf-8");
require 'table.class.php';

/*
 * Clear all the tables int the database hanlin
 * */
require '../db/conn.class.php';
$conne->init_conn();
$sql = "select * from subject";
$result = $conne->getRowsArray($sql);
$conne->close_rst();
for ($i = 0; $i < count($result); $i++) {
    $choice_name = $result[$i]['m_choice_table'];
    $fillin_name = $result[$i]['m_fillin_table'];
    $answer_name = $result[$i]['m_answer_table_name'];
    delete_table($conne,$choice_name);
    delete_table($conne,$fillin_name);
    delete_table($conne,$answer_name);

    $solution = $result[$i]['m_exam_table_name'];
    $section_name = $result[$i]['m_section_table_name'];
    $chapter_name = $result[$i]['m_chapter_table_name'];
    $questiontype_name=$result[$i]['m_chapter_table_name'];
    $section_questiontype_name = $result[$i]['m_section_questiontype_table_name'];


    delete_table($conne,$choice_name);
    delete_table($conne,$fillin_name);
    delete_table($conne,$answer_name);
}

//$conne->close_conn();

/*
 * Create all the tables int the database hanlin
 * */
//require_once '../db/conn.class.php';
//$conne->init_conn();
//$sql = "select * from subject";
//$result = $conne->getRowsArray($sql);
$conne->close_rst();
for ($i = 0; $i < count($result); $i++) {
    $choice_name = $result[$i]['m_choice_table_name'];
    $fillin_name = $result[$i]['m_fillin_table_name'];
    $answer_name = $result[$i]['m_answer_table_name'];
    echo $choice_name."\t".$fillin_name."\t".$answer_name."\t";

    create_question_table($conne, $choice_name, CHOICE_TABLE);
    create_question_table($conne, $fillin_name, FILLIN_TABLE);
    create_question_table($conne, $answer_name, ANSWER_TABLE);

    $solution = $result[$i]['m_exam_table_name'];
    $section_name = $result[$i]['m_section_table_name'];
    $chapter_name = $result[$i]['m_chapter_table_name'];
    $section_eaxm_name = $result[$i]['m_section_exam_table_name'];
//    echo $solution . "\t" . $section_name . "\t" . $chapter_name . "\t" . $section_eaxm_name . "</br>";
//    create_utility_table($conne, $solution, EXAM_TABLE);
//    create_utility_table($conne, $section_name, SECTION_TABLE);
//    create_utility_table($conne, $chapter_name, CHAPTER_TABLE);
//    create_utility_table($conne, $section_eaxm_name, SECTION_EXAM_TABLE);
}
$conne->close_rst();
$conne->close_conn();