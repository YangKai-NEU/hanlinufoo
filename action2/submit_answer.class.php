<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Submit the answer of a quiz to server
 * */
if(isset($_POST["sid"])&&$_POST["sid"]!=null&&$_POST["sid"]!=""&&isset($_POST["hid"])&&$_POST["hid"]!=null&&$_POST["hid"]!=""&&isset($_POST["answer"])&&$_POST["answer"]!=null&&$_POST["answer"]!=""){
	/*
	 * Load the database config file
	 * */
    require '../db/conn.class.php';
    /*
     * Init the database config file
     * */
	$conne->init_conn();
	/*
	 * Add the answer to database
	 * */
	$sql="INSERT INTO answer(m_hid,m_sid,m_answer,m_time) VALUES('".$_POST["hid"]."','".$_POST["sid"]."','".$_POST["answer"]."','".date('Y-m-d h:i:s', time())."')";
	$affected=$conne->uidRst($sql);
	/*
	 * Check whether the answer was added successful
	 * */
	if($affected!=0){
	    $sql="UPDATE homework_item SET m_state='Y' WHERE m_hid='".$_POST["hid"]."' AND m_sid='".$_POST["sid"]."'";
	    $conne->uidRst($sql);
	    /*
	     * Close the database connection
	     * */
	    $conne->close_rst();
	    $conne->close_conn();
	    /*
	     * The answer was added successful
	     * */
		$result = array("Code" => "1", "Msg" => "数据提交成功");
		echo json_encode($result);
		exit(0);
	}else{
	    /*
	     * The answer was failed to added to the server
	     * */
		$result = array("Code" => "-1", "Msg" => "数据提交失败");
		echo json_encode($result);
		exit(0);
	}
}else{
    /*
     * The parameter was unset
     * */
	$result = array("Code" => "-1", "Msg" => "参数错误");
	echo json_encode($result);
	exit(0);
}
?>