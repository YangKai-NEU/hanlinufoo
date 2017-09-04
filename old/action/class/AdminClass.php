<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/10 0010
 * Time: 上午 9:26
 */
class AdminClass
{
    public $m_id = '';
    public $m_username = '';
    public $m_password = '';
    public $m_phone = '';
    public $m_qq = '';

    /**
     * AdminClass constructor.
     * @param string $m_id
     * @param string $m_username
     * @param string $m_password
     * @param string $m_phone
     * @param string $m_qq
     */
    public function __construct($m_id, $m_username, $m_password, $m_phone, $m_qq)
    {
        $this->m_id = $m_id;
        $this->m_username = $m_username;
        $this->m_password = $m_password;
        $this->m_phone = $m_phone;
        $this->m_qq = $m_qq;
    }

    /**
     * @return string
     */
    public function getAId()
    {
        return $this->m_id;
    }

    /**
     * @param string $m_id
     */
    public function setAId($m_id)
    {
        $this->m_id = $m_id;
    }

    /**
     * @return string
     */
    public function getAUsername()
    {
        return $this->m_username;
    }

    /**
     * @param string $m_username
     */
    public function setAUsername($m_username)
    {
        $this->m_username = $m_username;
    }

    /**
     * @return string
     */
    public function getAPassword()
    {
        return $this->m_password;
    }

    /**
     * @param string $m_password
     */
    public function setAPassword($m_password)
    {
        $this->m_password = $m_password;
    }

    /**
     * @return string
     */
    public function getAPhone()
    {
        return $this->m_phone;
    }

    /**
     * @param string $m_phone
     */
    public function setAPhone($m_phone)
    {
        $this->m_phone = $m_phone;
    }

    /**
     * @return string
     */
    public function getAQq()
    {
        return $this->m_qq;
    }

    /**
     * @param string $m_qq
     */
    public function setAQq($m_qq)
    {
        $this->m_qq = $m_qq;
    }


}