<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/1/5 0005
 * Time: 上午 9:03
 */
class ChapterClass
{
    public $m_id = '';
    public $m_name = '';
    public $m_sections = '';

    /**
     * ChapterClass constructor.
     * @param string $m_id
     * @param $m_name
     * @param $m_sections
     */
    public function __construct($m_id, $m_name, $m_sections)
    {
        $this->m_id = $m_id;
        $this->m_name = $m_name;
        $this->m_sections = $m_sections;
    }
}