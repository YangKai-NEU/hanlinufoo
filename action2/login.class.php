<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Login according the username and password of student
 * */
if (isset($_POST["username"]) && $_POST["username"] != null && $_POST["username"] != "" && isset($_POST["password"]) && $_POST["password"] != null && $_POST["password"] != "") {
	/*
	 * Load the database config file
	 * */
    require '../db/conn.class.php';
    /*
     * Init the database connection
     * */
	$conne->init_conn();
	/*
	 * Get data from databse
	 * */
	$sql = "SELECT * FROM user WHERE m_username='" . $_POST["username"] . "' AND m_password='" . $_POST["password"] . "'";
	$tmparray = $conne->getRowsArray($sql);
	/*
	 * Close the database connection
	 * */
	$conne->close_rst();
	$conne->close_conn();
	/*
	 * Check whether the user was logined successful according the query result
	 * */
	$count = count($tmparray);
	if ($count == 1) {
	    /*
	     * Format the result
	     * */
		$accountmsg = array(
			's_id' => $tmparray[0]['m_id'],
			's_username' => $tmparray[0]['m_username'],
			's_password' => $tmparray[0]['m_password'],
			's_truename' => $tmparray[0]['m_truename'],
			's_phone' => $tmparray[0]['m_phone'],
			's_qq' => $tmparray[0]['m_qq'],
			's_familyphone' => $tmparray[0]['m_familyphone'],
			's_img' => $tmparray[0]['m_img'],
			's_school' => $tmparray[0]['m_school'],
			's_class' => $tmparray[0]['m_class']);
		/*
		 * Login successful
		 * */
		$result = array("Code" => "1", "Msg" => "登录成功", 'Data' => $accountmsg);
		echo json_encode($result);
		exit(0);
	} else {
	    /*
	     * Login error
	     * */
		$result = array("Code" => "-1", "Msg" => "登录失败");
		echo json_encode($result);
		exit(0);
	}
} else {
    /*
     * Parameter is unset
     * */
	$result = array("Code" => "-1", "Msg" => "参数错误");
	echo json_encode($result);
	exit(0);
}
?>