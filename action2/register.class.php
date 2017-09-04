<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Register a student account according its information
 * */
if (isset($_POST["username"]) && $_POST["username"] != null && $_POST["username"] != "" && isset($_POST["password"]) && $_POST["password"] != null && $_POST["password"] != "" &&
	isset($_POST["truename"]) && $_POST["truename"] != null && $_POST["truename"] != "" && isset($_POST["phone"]) && $_POST["phone"] != null && $_POST["phone"] != "" &&
	isset($_POST["familyphone"]) && $_POST["familyphone"] != null && $_POST["familyphone"] != ""
) {
	$qq = "";
	$img = "";
	$school = "";
	$class = "";
	if (isset($_POST["qq"]) && $_POST["qq"] != null) {
		$qq = $_POST["qq"];
	}
	if (isset($_POST["img"]) && $_POST["img"] != null) {
		$img = $_POST["img"];
	}
	if (isset($_POST["school"]) && $_POST["school"] != null) {
		$school = $_POST["school"];
	}
	if (isset($_POST["class"]) && $_POST["class"] != null) {
		$class = $_POST["class"];
	}
	/*
	 * Load the database config file
	 * */
	require '../db/conn.class.php';
	/*
	 * Init the database connection
	 * */
	$conne->init_conn();
	/*
	 * Get data from database
	 * */
	$sql = "SELECT * FROM user WHERE m_username='" . $_POST["username"] . "'";
	$tmparray = $conne->getRowsArray($sql);
	$conne->close_rst();
	/*
	 * Check whether the student is existed
	 * */
	if (count($tmparray) == 0) {
	    /*
	     * Add the account to the database
	     * */
		$sql = "INSERT INTO user(m_username,m_password,m_truename,m_phone,m_qq,m_familyphone,m_img,m_school,m_class,m_lv) VALUES('" .
			$_POST["username"] . "','" . $_POST["password"] . "','".$_POST["truename"]."','".$_POST["phone"]."','".$qq."','".$_POST["familyphone"]."','".$img."','".$school."','".$class."','5')";
		$affected=$conne->uidRst($sql);
		/*
		 * Close the database connection
		 * */
		$conne->close_conn();
		if($affected==1){
		    /*
		     * The account was added successful
		     * */
			$result = array("Code" => "1", "Msg" => "注册成功");
			echo json_encode($result);
			exit(0);
		}else{
            /*
             * The account was failed to add to database
             * */
			$result = array("Code" => "-1", "Msg" => "注册失败");
			echo json_encode($result);
			exit(0);
		}
	} else {
	    /*
	     * The user was existed, so there was an error
	     * */
        $conne->close_conn();
		$result = array("Code" => "-1", "Msg" => "该用户名已被使用");
		echo json_encode($result);
		exit(0);
	}
} else {
    /*
     * The parameter was unset
     * */
	$result = array("Code" => "-1", "Msg" => "参数错误");
	echo json_encode($result);
	exit(0);
}
?>