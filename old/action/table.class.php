<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';

function create_question_table($conn, $tablename = '', $table_type = CHOICE_TABLE)
{
    switch ($table_type) {
        case CHOICE_TABLE:
            $first_charactor = substr($tablename, 0, 1);
            $sql = "CREATE TABLE `" . $tablename . "` (
  `" . $first_charactor . "_id` int(11) NOT NULL AUTO_INCREMENT,
  `" . $first_charactor . "_question` text NOT NULL,
  `" . $first_charactor . "_select_a` text NOT NULL,
  `" . $first_charactor . "_select_b` text NOT NULL,
  `" . $first_charactor . "_select_c` text NOT NULL,
  `" . $first_charactor . "_select_d` text NOT NULL,
  `" . $first_charactor . "_exam` int(11) NOT NULL,
  `" . $first_charactor . "_solution` text NOT NULL,
  `" . $first_charactor . "_answer` text NOT NULL,
  `" . $first_charactor . "_analyse` text NOT NULL,
  `" . $first_charactor . "_video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`" . $first_charactor . "_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
";
            $conn->uidRst($sql);
            $conn->close_rst();
            break;
        case FILLIN_TABLE:
            $first_charactor = substr($tablename, 0, 1);
            $sql = "CREATE TABLE `" . $tablename . "` (
  `" . $first_charactor . "_id` int(11) NOT NULL AUTO_INCREMENT,
  `" . $first_charactor . "_question` text NOT NULL,
  `" . $first_charactor . "_exam` int(11) NOT NULL,
  `" . $first_charactor . "_solution` text NOT NULL,
  `" . $first_charactor . "_answer` text NOT NULL,
  `" . $first_charactor . "_analyse` text NOT NULL,
  `" . $first_charactor . "_video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`" . $first_charactor . "_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
";
            $conn->uidRst($sql);
            $conn->close_rst();
            break;
        case ANSWER_TABLE:
            $first_charactor = substr($tablename, 0, 1);
            $sql = "CREATE TABLE `" . $tablename . "` (
  `" . $first_charactor . "_id` int(11) NOT NULL AUTO_INCREMENT,
  `" . $first_charactor . "_question` text NOT NULL,
  `" . $first_charactor . "_exam` int(11) NOT NULL,
  `" . $first_charactor . "_solution` text NOT NULL,
  `" . $first_charactor . "_answer` text NOT NULL,
  `" . $first_charactor . "_analyse` text NOT NULL,
  `" . $first_charactor . "_video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`" . $first_charactor . "_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
";
            $conn->uidRst($sql);
            $conn->close_rst();
            break;
        default:
            break;
    }
}

function create_utility_table($conn, $tablename = '', $table_type = EXAM_TABLE)
{
    switch ($table_type) {
        case EXAM_TABLE:
            $first_charactor = substr($tablename, 0, 1);
            $sql = "CREATE TABLE `" . $tablename . "` (
 `" . $first_charactor . "_id` int(11) NOT NULL AUTO_INCREMENT,
  `" . $first_charactor . "_name` varchar(50) NOT NULL,
  `" . $first_charactor . "_parent` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`" . $first_charactor . "_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
";
            $conn->uidRst($sql);
            $conn->close_rst();
            break;
        case SECTION_TABLE:
            $first_charactor = substr($tablename, 0, 1);
            $sql = "CREATE TABLE `" . $tablename . "` (
 `" . $first_charactor . "_id` int(11) NOT NULL AUTO_INCREMENT,
  `" . $first_charactor . "_name` varchar(50) NOT NULL,
  `" . $first_charactor . "_chapter` int(11) NOT NULL,
  `" . $first_charactor . "_parent` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`" . $first_charactor . "_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
";
            $conn->uidRst($sql);
            $conn->close_rst();
            break;
        case CHAPTER_TABLE:
            $first_charactor = substr($tablename, 0, 1);
            $sql = "CREATE TABLE `" . $tablename . "` (
 `" . $first_charactor . "_id` int(11) NOT NULL AUTO_INCREMENT,
  `" . $first_charactor . "_name` varchar(50) NOT NULL,
  `" . $first_charactor . "_iid` int(11) NOT NULL,
  UNIQUE KEY `" . $first_charactor . "_name` (`" . $first_charactor . "_name`),
  PRIMARY KEY (`" . $first_charactor . "_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
";
            $conn->uidRst($sql);
            $conn->close_rst();
            break;
        case SECTION_EXAM_TABLE:
            $first_charactor = substr($tablename, 0, 1);
            $sql = "CREATE TABLE `" . $tablename . "` (
 `" . $first_charactor . "_id` int(11) NOT NULL AUTO_INCREMENT,
  `" . $first_charactor . "_sid` int(11) NOT NULL,
  `" . $first_charactor . "_eid` int(11) NOT NULL,
  UNIQUE KEY `" . $first_charactor . "_sid` (`" . $first_charactor . "_sid`,`" . $first_charactor . "_eid`),
  PRIMARY KEY (`" . $first_charactor . "_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
";
            $conn->uidRst($sql);
            $conn->close_rst();
            break;
        default:
            break;
    }
}

function delete_table($conn, $tablename)
{
    $sql = "DROP TABLE " . $tablename;
    $conn->uidRst($sql);
    $conn->close_rst();
}