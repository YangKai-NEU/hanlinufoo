<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/8 0008
 * Time: 下午 9:44
 */
class GradeClass
{
    private $g_id;
    private $g_name;

    /**
     * GradeClass constructor.
     * @param $g_id
     * @param $g_name
     */
    public function __construct($g_id, $g_name)
    {
        $this->g_id = $g_id;
        $this->g_name = $g_name;
    }

    /**
     * @return mixed
     */
    public function getGId()
    {
        return $this->g_id;
    }

    /**
     * @param mixed $g_id
     */
    public function setGId($g_id)
    {
        $this->g_id = $g_id;
    }

    /**
     * @return mixed
     */
    public function getGName()
    {
        return $this->g_name;
    }

    /**
     * @param mixed $g_name
     */
    public function setGName($g_name)
    {
        $this->g_name = $g_name;
    }


}