<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/8 0008
 * Time: 下午 9:46
 */
class StudentClass
{
    private $s_id = '';
    private $s_username = '';
    private $s_password = '';
    private $s_truename = '';
    private $s_phone = '';
    private $s_qq = '';
    private $s_familyphone = '';
    private $s_img = '';
    private $s_school = '';
    private $s_class = '';

    /**
     * AccountClass constructor.
     * @param string $s_id
     * @param string $s_username
     * @param string $s_password
     * @param string $s_truename
     * @param string $s_phone
     * @param string $s_qq
     * @param string $s_familyphone
     * @param string $s_img
     * @param string $s_school
     * @param string $s_class
     */
    public function __construct($s_id, $s_username, $s_password, $s_truename, $s_phone, $s_qq, $s_familyphone, $s_img, $s_school, $s_class)
    {
        $this->s_id = $s_id;
        $this->s_username = $s_username;
        $this->s_password = $s_password;
        $this->s_truename = $s_truename;
        $this->s_phone = $s_phone;
        $this->s_qq = $s_qq;
        $this->s_familyphone = $s_familyphone;
        $this->s_img = $s_img;
        $this->s_school = $s_school;
        $this->s_class = $s_class;
    }

    /**
     * @return string
     */
    public function getSId()
    {
        return $this->s_id;
    }

    /**
     * @param string $s_id
     */
    public function setSId($s_id)
    {
        $this->s_id = $s_id;
    }

    /**
     * @return string
     */
    public function getSUsername()
    {
        return $this->s_username;
    }

    /**
     * @param string $s_username
     */
    public function setSUsername($s_username)
    {
        $this->s_username = $s_username;
    }

    /**
     * @return string
     */
    public function getSPassword()
    {
        return $this->s_password;
    }

    /**
     * @param string $s_password
     */
    public function setSPassword($s_password)
    {
        $this->s_password = $s_password;
    }

    /**
     * @return string
     */
    public function getSTruename()
    {
        return $this->s_truename;
    }

    /**
     * @param string $s_truename
     */
    public function setSTruename($s_truename)
    {
        $this->s_truename = $s_truename;
    }

    /**
     * @return string
     */
    public function getSPhone()
    {
        return $this->s_phone;
    }

    /**
     * @param string $s_phone
     */
    public function setSPhone($s_phone)
    {
        $this->s_phone = $s_phone;
    }

    /**
     * @return string
     */
    public function getSQq()
    {
        return $this->s_qq;
    }

    /**
     * @param string $s_qq
     */
    public function setSQq($s_qq)
    {
        $this->s_qq = $s_qq;
    }

    /**
     * @return string
     */
    public function getSFamilyphone()
    {
        return $this->s_familyphone;
    }

    /**
     * @param string $s_familyphone
     */
    public function setSFamilyphone($s_familyphone)
    {
        $this->s_familyphone = $s_familyphone;
    }

    /**
     * @return string
     */
    public function getSImg()
    {
        return $this->s_img;
    }

    /**
     * @param string $s_img
     */
    public function setSImg($s_img)
    {
        $this->s_img = $s_img;
    }

    /**
     * @return string
     */
    public function getSSchool()
    {
        return $this->s_school;
    }

    /**
     * @param string $s_school
     */
    public function setSSchool($s_school)
    {
        $this->s_school = $s_school;
    }

    /**
     * @return string
     */
    public function getSClass()
    {
        return $this->s_class;
    }

    /**
     * @param string $s_class
     */
    public function setSClass($s_class)
    {
        $this->s_class = $s_class;
    }
}