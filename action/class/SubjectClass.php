<?php

header("Content-type: text/html; charset=utf-8");
class SubjectClass
{
    public $m_id = '';
    public $m_name = '';
    public $m_grade = '';
    public $m_choicetablename = '';
    public $m_fillintablename = '';
    public $m_answertablename = '';
    public $m_examtablename = '';
    public $m_sectiontablename = '';
    public $m_chaptertablename = '';
    public $m_sectionexamtablename = '';
    public $m_icon = '';
    public $m_img = '';

    /**
     * SubjectClass constructor.
     * @param string $m_id
     * @param string $m_name
     * @param string $m_grade
     * @param string $m_choicetablename
     * @param string $m_fillintablename
     * @param string $m_answertablename
     * @param string $m_examtablename
     * @param string $m_sectiontablename
     * @param string $m_chaptertablename
     * @param string $m_sectionexamtablename
     * @param string $m_icon
     * @param string $m_img
     */
    public function __construct($m_id, $m_name, $m_grade, $m_choicetablename, $m_fillintablename, $m_answertablename, $m_examtablename, $m_sectiontablename, $m_chaptertablename, $m_sectionexamtablename, $m_icon, $m_img)
    {
        $this->m_id = $m_id;
        $this->m_name = $m_name;
        $this->m_grade = $m_grade;
        $this->m_choicetablename = $m_choicetablename;
        $this->m_fillintablename = $m_fillintablename;
        $this->m_answertablename = $m_answertablename;
        $this->m_examtablename = $m_examtablename;
        $this->m_sectiontablename = $m_sectiontablename;
        $this->m_chaptertablename = $m_chaptertablename;
        $this->m_sectionexamtablename = $m_sectionexamtablename;
        $this->m_icon = $m_icon;
        $this->m_img = $m_img;
    }


}