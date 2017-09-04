<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/10 0010
 * Time: 上午 9:26
 */
class AdminClass
{
    private $a_id = '';
    private $a_username = '';
    private $a_password = '';
    private $a_phone = '';
    private $a_qq = '';

    /**
     * AdminClass constructor.
     * @param string $a_id
     * @param string $a_username
     * @param string $a_password
     * @param string $a_phone
     * @param string $a_qq
     */
    public function __construct($a_id, $a_username, $a_password, $a_phone, $a_qq)
    {
        $this->a_id = $a_id;
        $this->a_username = $a_username;
        $this->a_password = $a_password;
        $this->a_phone = $a_phone;
        $this->a_qq = $a_qq;
    }

    /**
     * @return string
     */
    public function getAId()
    {
        return $this->a_id;
    }

    /**
     * @param string $a_id
     */
    public function setAId($a_id)
    {
        $this->a_id = $a_id;
    }

    /**
     * @return string
     */
    public function getAUsername()
    {
        return $this->a_username;
    }

    /**
     * @param string $a_username
     */
    public function setAUsername($a_username)
    {
        $this->a_username = $a_username;
    }

    /**
     * @return string
     */
    public function getAPassword()
    {
        return $this->a_password;
    }

    /**
     * @param string $a_password
     */
    public function setAPassword($a_password)
    {
        $this->a_password = $a_password;
    }

    /**
     * @return string
     */
    public function getAPhone()
    {
        return $this->a_phone;
    }

    /**
     * @param string $a_phone
     */
    public function setAPhone($a_phone)
    {
        $this->a_phone = $a_phone;
    }

    /**
     * @return string
     */
    public function getAQq()
    {
        return $this->a_qq;
    }

    /**
     * @param string $a_qq
     */
    public function setAQq($a_qq)
    {
        $this->a_qq = $a_qq;
    }


}