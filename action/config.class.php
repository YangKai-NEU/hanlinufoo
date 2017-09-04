<?php

header("Content-type: text/html; charset=utf-8");

define('CHOICE_TABLE', 1);
define('FILLIN_TABLE', 2);
define('ANSWER_TABLE', 3);

define('EXAM_TABLE', 4);
define('SECTION_TABLE', 5);
define('CHAPTER_TABLE', 6);
define('SECTION_EXAM_TABLE', 7);

define('CACHEENABLE', false);

define("STUDENT_TYPE", 1);
define("TEACHER_TYPE", 2);
define("ADMIN_TYPE", 3);

define("ACCOUNT", "session_account");
define("GRADE", "session_grade");
define("TERM", "session_term");
define("SUBJECT", "session_subject");
define("CHAPTER", "session_chapter");
define("SECTION", "session_section");
define("EXAM", "session_exam");
define("QUIZ", "session_quiz");

define("PAGESIZE",10);