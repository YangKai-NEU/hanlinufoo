<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/8 0008
 * Time: 下午 9:44
 */
class GradeClass
{
    public $m_id;
    public $m_name;
    public $m_parent;

    /**
     * GradeClass constructor.
     * @param $m_id
     * @param $m_name
     * @param $m_parent
     */
    public function __construct($m_id, $m_name, $m_parent)
    {
        $this->m_id = $m_id;
        $this->m_name = $m_name;
        $this->m_parent = $m_parent;
    }


}