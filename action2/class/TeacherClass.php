<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/10 0010
 * Time: 上午 9:31
 */
class TeacherClass
{
    private $t_id = '';
    private $t_username = '';
    private $t_password = '';
    private $t_truename = '';
    private $t_phone = '';
    private $t_qq = '';

    /**
     * TeacherClass constructor.
     * @param string $t_id
     * @param string $t_username
     * @param string $t_password
     * @param string $t_truename
     * @param string $t_phone
     * @param string $t_qq
     */
    public function __construct($t_id, $t_username, $t_password, $t_truename, $t_phone, $t_qq)
    {
        $this->t_id = $t_id;
        $this->t_username = $t_username;
        $this->t_password = $t_password;
        $this->t_truename = $t_truename;
        $this->t_phone = $t_phone;
        $this->t_qq = $t_qq;
    }

    /**
     * @return string
     */
    public function getTId()
    {
        return $this->t_id;
    }

    /**
     * @param string $t_id
     */
    public function setTId($t_id)
    {
        $this->t_id = $t_id;
    }

    /**
     * @return string
     */
    public function getTUsername()
    {
        return $this->t_username;
    }

    /**
     * @param string $t_username
     */
    public function setTUsername($t_username)
    {
        $this->t_username = $t_username;
    }

    /**
     * @return string
     */
    public function getTPassword()
    {
        return $this->t_password;
    }

    /**
     * @param string $t_password
     */
    public function setTPassword($t_password)
    {
        $this->t_password = $t_password;
    }

    /**
     * @return string
     */
    public function getTTruename()
    {
        return $this->t_truename;
    }

    /**
     * @param string $t_truename
     */
    public function setTTruename($t_truename)
    {
        $this->t_truename = $t_truename;
    }

    /**
     * @return string
     */
    public function getTPhone()
    {
        return $this->t_phone;
    }

    /**
     * @param string $t_phone
     */
    public function setTPhone($t_phone)
    {
        $this->t_phone = $t_phone;
    }

    /**
     * @return string
     */
    public function getTQq()
    {
        return $this->t_qq;
    }

    /**
     * @param string $t_qq
     */
    public function setTQq($t_qq)
    {
        $this->t_qq = $t_qq;
    }


}