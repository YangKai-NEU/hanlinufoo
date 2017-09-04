<?php

include 'BaiduBce.phar';
require 'SampleConf.php';

use BaiduBce\BceClientConfigOptions;
use BaiduBce\Util\MimeTypes;
use BaiduBce\Http\HttpHeaders;
use BaiduBce\Services\Bos\BosClient;
use BaiduBce\Services\Bos\StorageClass;
use BaiduBce\Services\Bos\BosOptions;
use BaiduBce\Auth\SignOptions;

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/29 0029
 * Time: 下午 6:23
 */
class MyBosClient
{
    public $client = "";
    public $bucketName = "";

    public function __construct()
    {
    }

    function get_extension($file)
    {
        return substr(strrchr($file, '.'), 1);
    }

    public function initClient($t)
    {
        global $BOS_TEST_CONFIG;
        $this->client = new BosClient($BOS_TEST_CONFIG);
        $this->bucketName = $t;
    }

    public function uploadFile($filepath)
    {
        $key = date('YmdHisu') . "_" . rand(0, 9) . "." . $this->get_extension($filepath);
        $this->client->putObjectFromFile($this->bucketName, $key, $filepath);
        return $key;
    }

    public function getUrl($key)
    {
        $signOptions = array(
            SignOptions::TIMESTAMP => new \DateTime(),
            SignOptions::EXPIRATION_IN_SECONDS => 300,
        );
        $url = $this->client->generatePreSignedUrl($this->bucketName,
            $key,
            array(BosOptions::SIGN_OPTIONS => $signOptions)
        );
        return $url;
    }

}

$myBosClient = new MyBosClient();
?>