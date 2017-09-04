<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/8 0008
 * Time: 下午 10:14
 */
class AnswerClass
{
    private $m_id = '';
    private $m_question = '';
    private $m_answer = '';
    private $m_analyse = '';
    private $m_exam = '';
    private $m_solution = '';
    private $m_imgurl = '';
    private $m_videourl = '';

    /**
     * ChoiceClass constructor.
     * @param string $m_id
     * @param string $m_question
     * @param string $m_answer
     * @param string $m_analyse
     * @param string $m_exam
     * @param string $m_solution
     * @param string $m_imgurl
     * @param string $m_videourl
     */
    public function __construct($m_id, $m_question, $m_answer, $m_analyse, $m_exam, $m_solution, $m_imgurl, $m_videourl)
    {
        $this->m_id = $m_id;
        $this->m_question = $m_question;
        $this->m_answer = $m_answer;
        $this->m_analyse = $m_analyse;
        $this->m_exam = $m_exam;
        $this->m_solution = $m_solution;
        $this->m_imgurl = $m_imgurl;
        $this->m_videourl = $m_videourl;
    }


    /**
     * @return string
     */
    public function getMId()
    {
        return $this->m_id;
    }

    /**
     * @param string $m_id
     */
    public function setMId($m_id)
    {
        $this->m_id = $m_id;
    }

    /**
     * @return string
     */
    public function getMAnswer()
    {
        return $this->m_answer;
    }

    /**
     * @param string $m_answer
     */
    public function setMAnswer($m_answer)
    {
        $this->m_answer = $m_answer;
    }

    /**
     * @return string
     */
    public function getMAnalyse()
    {
        return $this->m_analyse;
    }

    /**
     * @param string $m_analyse
     */
    public function setMAnalyse($m_analyse)
    {
        $this->m_analyse = $m_analyse;
    }

    /**
     * @return string
     */
    public function getMImgurl()
    {
        return $this->m_imgurl;
    }

    /**
     * @param string $m_imgurl
     */
    public function setMImgurl($m_imgurl)
    {
        $this->m_imgurl = $m_imgurl;
    }

    /**
     * @return string
     */
    public function getMVideourl()
    {
        return $this->m_videourl;
    }

    /**
     * @param string $m_videourl
     */
    public function setMVideourl($m_videourl)
    {
        $this->m_videourl = $m_videourl;
    }

    /**
     * @return string
     */
    public function getMQuestion()
    {
        return $this->m_question;
    }

    /**
     * @param string $m_question
     */
    public function setMQuestion($m_question)
    {
        $this->m_question = $m_question;
    }

    /**
     * @return string
     */
    public function getMExam()
    {
        return $this->m_exam;
    }

    /**
     * @param string $m_exam
     */
    public function setMExam($m_exam)
    {
        $this->m_exam = $m_exam;
    }

    /**
     * @return string
     */
    public function getMExamName()
    {
        return $this->m_solution;
    }

    /**
     * @param string $m_solution
     */
    public function setMExamName($m_solution)
    {
        $this->m_solution = $m_solution;
    }


}