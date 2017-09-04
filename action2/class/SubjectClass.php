<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/8 0008
 * Time: 下午 9:41
 */
class SubjectClass
{
    private $s_id = '';
    private $s_name = '';
    private $s_grade = '';
    private $s_choicetablename = '';
    private $s_fillintablename = '';
    private $s_answertablename = '';
    private $s_examination_point = '';
    private $s_examination_name = '';

    /**
     * SubjectClass constructor.
     * @param string $s_id
     * @param string $s_name
     * @param string $s_grade
     * @param string $s_choicetablename
     * @param string $s_fillintablename
     * @param string $s_answertablename
     * @param string $s_examination_point
     * @param string $s_examination_name
     */
    public function __construct($s_id, $s_name, $s_grade, $s_choicetablename, $s_fillintablename, $s_answertablename, $s_examination_point, $s_examination_name)
    {
        $this->s_id = $s_id;
        $this->s_name = $s_name;
        $this->s_grade = $s_grade;
        $this->s_choicetablename = $s_choicetablename;
        $this->s_fillintablename = $s_fillintablename;
        $this->s_answertablename = $s_answertablename;
        $this->s_examination_point = $s_examination_point;
        $this->s_examination_name = $s_examination_name;
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
    public function getSName()
    {
        return $this->s_name;
    }

    /**
     * @param string $s_name
     */
    public function setSName($s_name)
    {
        $this->s_name = $s_name;
    }

    /**
     * @return string
     */
    public function getSGrade()
    {
        return $this->s_grade;
    }

    /**
     * @param string $s_grade
     */
    public function setSGrade($s_grade)
    {
        $this->s_grade = $s_grade;
    }

    /**
     * @return string
     */
    public function getSChoicetablename()
    {
        return $this->s_choicetablename;
    }

    /**
     * @param string $s_choicetablename
     */
    public function setSChoicetablename($s_choicetablename)
    {
        $this->s_choicetablename = $s_choicetablename;
    }

    /**
     * @return string
     */
    public function getSFillintablename()
    {
        return $this->s_fillintablename;
    }

    /**
     * @param string $s_fillintablename
     */
    public function setSFillintablename($s_fillintablename)
    {
        $this->s_fillintablename = $s_fillintablename;
    }

    /**
     * @return string
     */
    public function getSAnswertablename()
    {
        return $this->s_answertablename;
    }

    /**
     * @param string $s_answertablename
     */
    public function setSAnswertablename($s_answertablename)
    {
        $this->s_answertablename = $s_answertablename;
    }

    /**
     * @return string
     */
    public function getSExaminationPoint()
    {
        return $this->s_examination_point;
    }

    /**
     * @param string $s_examination_point
     */
    public function setSExaminationPoint($s_examination_point)
    {
        $this->s_examination_point = $s_examination_point;
    }

    /**
     * @return string
     */
    public function getSExaminationName()
    {
        return $this->s_examination_name;
    }

    /**
     * @param string $s_examination_name
     */
    public function setSExaminationName($s_examination_name)
    {
        $this->s_examination_name = $s_examination_name;
    }


}