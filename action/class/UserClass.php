<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/8 0008
 * Time: 下午 9:46
 */
class UserClass
{
    public $m_id = "";
    public $m_username = "";
    public $m_password = "";
    public $m_truename = "";
    public $m_phone = "";
    public $m_qq = "";
    public $m_familyphone = "";
    public $m_img = "";
    public $m_school = "";
    public $m_class = "";
    public $m_lv = "";

    /**
     * UserClass constructor.
     * @param string $m_id
     * @param string $m_username
     * @param string $m_password
     * @param string $m_truename
     * @param string $m_phone
     * @param string $m_qq
     * @param string $m_familyphone
     * @param string $m_img
     * @param string $m_school
     * @param string $m_class
     * @param string $m_lv
     */
    public function __construct($m_id, $m_username, $m_password, $m_truename, $m_phone, $m_qq, $m_familyphone, $m_img, $m_school, $m_class, $m_lv)
    {
        $this->m_id = $m_id;
        $this->m_username = $m_username;
        $this->m_password = $m_password;
        $this->m_truename = $m_truename;
        $this->m_phone = $m_phone;
        $this->m_qq = $m_qq;
        $this->m_familyphone = $m_familyphone;
        $this->m_img = $m_img;
        $this->m_school = $m_school;
        $this->m_class = $m_class;
        $this->m_lv = $m_lv;
    }

}