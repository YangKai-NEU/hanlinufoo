<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Delete the according cache file
 * */
if (isset($_POST["isall"]) && $_POST["isall"] != null && $_POST["isall"] != "" && isset($_POST["cachefile"]) && $_POST["cachefile"] != null && $_POST["cachefile"] != "") {
    if ($_POST["isall"] == "Y") {
        $array = array();
        $pos = 0;
        $file = scandir("./cache");
        for ($i = 0; $i < count($file); $i++) {
            if($file[$i]!="."&&$file[$i]!=".."){
                $array[$pos] = "./cache/" . $file[$i];
                $pos++;
            }
        }
        for ($i = 0; $i < count($array); $i++) {
            unlink($array[$i]);
        }
        /*
         * Delete the all cache file
         * */
        $result = array("Code" => "1", "Msg" => "删除成功");
        echo json_encode($result);
        exit(0);
    } else {
        /*
         * Delete the single cache file
         * */
        unlink("./cache/" . $_POST["cachefile"]);
        $result = array("Code" => "1", "Msg" => "删除成功");
        echo json_encode($result);
        exit(0);
    }
} else {
    /*
     * The parameter is error
     * */
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
?>