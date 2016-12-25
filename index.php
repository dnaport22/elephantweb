<?php
/**
 * @file
 * Redirect to the main app view.
 */

$url = 'http://' . $_SERVER['HTTP_HOST'] . '/www/';
header("HTTP/1.1 301 Moved Permanently");
header("Location: $url");