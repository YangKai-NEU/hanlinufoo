<?php

header("Content-type: text/html; charset=utf-8");

/*
 * The definition of types of question
 * */
define('CHOICE_TABLE', 1);
define('FILLIN_TABLE', 2);
define('ANSWER_TABLE', 3);

/*
 * The definition of types of tables
 * */
define('EXAM_TABLE', 4);
define('SECTION_TABLE', 5);
define('CHAPTER_TABLE', 6);
define('SECTION_EXAM_TABLE', 7);

/*
 * Whether the cache is opened
 * */
define('CACHEENABLE', false);

/*
 * The definition of types of user
 * */
define("STUDENT_TYPE", 1);
define("TEACHER_TYPE", 2);
define("ADMIN_TYPE", 3);

/*
 * The init page size
 * */
define("PAGE_SIZE", 10);

/*
 * The root path of current website
 * */
define("__ROOT_PATH__", "http://hanlinufoo.duapp.com");