<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/1/5 0005
 * Time: 下午 1:25
 */
class ExamClass
{
    public $m_id = '';
    public $m_name = '';
    public $m_exams = '';

    /**
     * ExamClass constructor.
     * @param $m_id
     * @param $m_name
     * @param $m_exams
     */
    public function __construct($m_id, $m_name, $m_exams)
    {
        $this->m_id = $m_id;
        $this->m_name = $m_name;
        $this->m_exams = $m_exams;
    }
}