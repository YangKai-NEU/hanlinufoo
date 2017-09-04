<?php
header("Content-type: text/html; charset=utf-8");

class Config
{

    public $mContent = "";
    public $mObj = "";

    function __construct()
    {
        $this->mContent = "";
        $this->mObj = "";
    }

    public function initConfig($filename)
    {
        if ($this->mContent == "") {
            $this->mContent = file_get_contents($filename);
        }
        if ($this->mObj == "") {
            $this->mObj = json_decode($this->mContent);
        }
    }

    public function display()
    {
        echo $this->mContent;
    }

    public function getItem($nameI)
    {
        return $this->mObj->$nameI;
    }

    public function writeToFile($filename)
    {
        $myfile = fopen($filename, "w");
        fwrite($myfile, json_encode($this->mObj));
        fclose($myfile);
    }

    public function addNewItem($nameI, $contentI)
    {
        $this->mObj->$nameI = $contentI;
    }

    public function closeConfig()
    {
        $this->writeToFile();
    }

}

$confige = new Config();

?>