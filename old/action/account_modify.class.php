<?php

header("Content-type: text/html; charset=utf-8");
require 'account.class.php';

session_start();
if (!isset($_SESSION["account"]) || $_SESSION["account"] == null || $_SESSION["account"] == "" || !isset($_SESSION["type"]) || $_SESSION["type"] == null || $_SESSION["type"] == "" || !is_login($_SESSION['account'], $_SESSION['type'])) {
    $result = array("Code" => "-1", "Msg" => "您还未登录");
    echo json_encode($result);
    exit(0);
} else {
    switch ($_SESSION['type']) {
        case TEACHER_TYPE:
            $sqlstring = array();
            $i = 0;
            if (isset($_POST["password"]) && $_POST["password"] != null) {
                $sqlstring[$i++] = "t_password='" . $_POST["password"] . "'";
            }
            if (isset($_POST["phone"]) && $_POST["phone"] != null) {
                $sqlstring[$i++] = "t_phone='" . $_POST["phone"] . "'";
            }
            if (isset($_POST["qq"]) && $_POST["qq"] != null) {
                $sqlstring[$i++] = "t_qq='" . $_POST["qq"] . "'";
            }
            if ($i == 0) {
                $result = array("Code" => "-1", "Msg" => "密码未改变");
                echo json_encode($result);
                exit(0);
            }

            require '../db/conn.class.php';
            $conne->init_conn();
            if ($i == 1) {
                $sql = "UPDATE teacher SET " . $sqlstring[0] . " WHERE t_id='" . $_SESSION['account']->getTId() . "'";
            } else {
                $sql = "UPDATE teacher SET ";
                for ($j = 0; $j < $i - 1; $j++) {
                    $sql .= $sqlstring[$j];
                    $sql .= ",";
                }
                $sql .= $sqlstring[$i - 1];
                $sql .= " WHERE t_id='" . $_SESSION['account']->getTId() . "'";
            }
            $affectednum = $conne->uidRst($sql);
            if ($affectednum == 1) {
                $result = array("Code" => "1", "Msg" => "更新成功");
                echo json_encode($result);
                if (isset($_POST["password"]) && $_POST["password"] != null) {
                    $_SESSION['account']->setTPassword($_POST["password"]);
                }
                if (isset($_POST["phone"]) && $_POST["phone"] != null) {
                    $_SESSION['account']->setTPhone($_POST["phone"]);
                }
                if (isset($_POST["qq"]) && $_POST["qq"] != null) {
                    $_SESSION['account']->setTQq($_POST["qq"]);
                }
                exit(0);
            } else {
                $result = array("Code" => "-1", "Msg" => "密码未改变");
                echo json_encode($result);
                exit(0);
            }
            break;
        case ADMIN_TYPE:
            $sqlstring = array();
            $i = 0;
            if (isset($_POST["password"]) && $_POST["password"] != null) {
                $sqlstring[$i++] = "m_password='" . $_POST["password"] . "'";
            }
            if (isset($_POST["phone"]) && $_POST["phone"] != null) {
                $sqlstring[$i++] = "m_phone='" . $_POST["phone"] . "'";
            }
            if (isset($_POST["qq"]) && $_POST["qq"] != null) {
                $sqlstring[$i++] = "m_qq='" . $_POST["qq"] . "'";
            }
            if ($i == 0) {
                $result = array("Code" => "-1", "Msg" => "密码未改变");
                echo json_encode($result);
                exit(0);
            }

            require '../db/conn.class.php';
            $conne->init_conn();
            if ($i == 1) {
                $sql = "UPDATE admin SET " . $sqlstring[0] . " WHERE m_id='" . $_SESSION['account']->getAId() . "'";
            } else {
                $sql = "UPDATE admin SET ";
                for ($j = 0; $j < $i - 1; $j++) {
                    $sql .= $sqlstring[$j];
                    $sql .= ",";
                }
                $sql .= $sqlstring[$i - 1];
                $sql .= " WHERE m_id='" . $_SESSION['account']->getAId() . "'";
            }
            $affectednum = $conne->uidRst($sql);
            if ($affectednum == 1) {
                $result = array("Code" => "1", "Msg" => "更新成功");
                echo json_encode($result);
                if (isset($_POST["password"]) && $_POST["password"] != null) {
                    $_SESSION['account']->setAPassword($_POST["password"]);
                }
                if (isset($_POST["phone"]) && $_POST["phone"] != null) {
                    $_SESSION['account']->setAPhone($_POST["phone"]);
                }
                if (isset($_POST["qq"]) && $_POST["qq"] != null) {
                    $_SESSION['account']->setAQq($_POST["qq"]);
                }
                exit(0);
            } else {
                $result = array("Code" => "-1", "Msg" => "密码未改变");
                echo json_encode($result);
                exit(0);
            }
            break;
        default:
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
            exit(0);
            break;
    }
}