<?php
header("Content-type: text/html; charset=utf-8");
error_reporting(E_ALL || ~E_NOTICE);

/**
 * Class opmysql
 */
class opmysql
{
    /*
     * The server location
     * */
//    private $host = 'sqld.duapp.com:4050';
//
//    /*
//     * The user's account of database
//     * */
//    private $name = '85ad965a59da400e81a3dedf2e0aa1eb';
//    /*
//     * The user'spassword of database
//     * */
//    private $pwd = '1c3c086da0c04ff7b2806de0dad35ad5';
//
//    /*
//     * The name of the database
//     * */
//    private $dBase = 'qXbcoZRkRLhESiDAUUmS';
    private $host = 'sqld.duapp.com:4050';

    /*
     * The user's account of database
     * */
    private $name = '2e51ce93c1ca48448d392bd3db345c05';
    /*
     * The user'spassword of database
     * */
    private $pwd = 'fab8e040d0624c2d8809642487cf6290';

    /*
     * The name of the database
     * */
    private $dBase = 'iquSZLyblQGqLhnahkfG';

    /*
     * The connection of the database
     * */
    private $conn = '';

    /*
     * The result of the quering
     * */
    private $result = '';

    /*
     * The error message
     * */
    private $msg = '';

    /*
     * The fields
     * */
    private $fields;

    /*
     * The number of the fields
     * */
    private $fieldsNum = 0;

    /*
     * The number of the querying records
     * */
    private $rowsNum = 0;

    /*
     * The single quering record
     * */
    private $rowsRst = '';

    /*
     * The fielda of result
     * */
    private $filesArray = array();

    /*
     * The quering results
     * */
    private $rowsArray = array();

    /*
     * Constructor of the class
     * */
    function __construct($host = '', $name = '', $pwd = '', $dBase = '')
    {
        if ($host != '')
            $this->host = $host;
        if ($name != '')
            $this->name = $name;
        if ($pwd != '')
            $this->pwd = $pwd;
        if ($dBase != '')
            $this->dBase = $dBase;
        $this->init_conn();
    }

    /*
     * Make the connection to the database
     * */
    function init_conn()
    {
        $this->conn = mysqli_connect($this->host, $this->name, $this->pwd, $this->dBase);
        if(mysqli_connect_errno()){
            return -1;
        }
        //mysqli_query("set names 'utf-8'");
    }

    /*
     * The quering result
     * */
    function mysql_query_rst($sql)
    {
        if ($this->conn == '') {
            $this->init_conn();
        }
        $this->result = mysqli_query($this->conn, $sql);
    }

    /*
     * Get the number of the fields
     * */
    function getFieldsNum($sql)
    {
        $this->mysql_query_rst($sql);
        $this->fieldsNum = mysqli_num_fields($this->result);
    }

    /*
     * Get the number of the quering results
     * */
    function getRowsNum($sql)
    {
        $this->mysql_query_rst($sql);
        if (mysqli_error() == 0) {
            return @mysqli_num_rows($this->result);
        } else {
            return -1;
        }
    }

    /*
     * Get single record
     * */
    function getRowsRst($sql)
    {
        $this->mysql_query_rst($sql);
        if (mysqli_error() == 0) {
            $this->rowsRst = mysqli_fetch_array($this->result, MYSQLI_ASSOC);
            return $this->rowsRst;
        } else {
            return '';
        }
    }

    /*
     * Get multiple records
     * */
    function getRowsArray($sql)
    {
        $this->rowsArray = array();
        $i = 0;
        $this->mysql_query_rst($sql);
        if (mysqli_error() == 0) {
            while ($row = mysqli_fetch_array($this->result, MYSQLI_ASSOC)) {
                $this->rowsArray[$i++] = $row;
            }
            return $this->rowsArray;
        } else {
            return '';
        }
    }

    /*
     * Updating, deleting, adding records to the databse
     * */
    function uidRst($sql)
    {
        if ($this->conn == '') {
            $this->init_conn();
        }
        $this->mysql_query_rst($sql);
        $this->rowsNum = mysqli_affected_rows($this->conn);
        if (mysqli_error() == 0) {
            return $this->rowsNum;
        } else {
            /*
             * This is an exception error
             * */
            return -1;
        }
    }

    /*
     * The value of the according field
     * */
    function getFields($sql, $fields)
    {
        $this->mysql_query_rst($sql);
        if (mysqli_error() == 0) {
            if (mysql_num_rows($this->result) > 0) {
                $tmpfld = mysqli_fetch_array($this->result);
                $this->fields = $tmpfld[$fields];

            }
            return $this->fields;
        } else {
            return '';
        }
    }

    /*
     * The error message
     * */
    function msg_error()
    {
        if (mysqli_error() != 0) {
            $this->msg = mysqli_error();
        }
        return $this->msg;
    }

    /*
     * Release the result of quering
     * */
    function close_rst()
    {
        mysqli_free_result($this->result);
        $this->msg = '';
        $this->fieldsNum = 0;
        $this->rowsNum = 0;
        $this->filesArray = '';
        $this->rowsArray = '';
    }

    /*
     * Close the connection of the database
     * */
    function close_conn()
    {
        $this->close_rst();
        mysqli_close($this->conn);
        $this->conn = '';
    }
}

/*
 * The global object of the database
 * */
$conne = new opmysql();

?>