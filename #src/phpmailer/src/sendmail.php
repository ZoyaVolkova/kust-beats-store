<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('en', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFom('zoearkhipova@gmail.com', 'Kust Beat Store');
$mail->addAddress('zoearkhipova@gmail.com');
$mail->Subject = 'Message from Kust Beat Store';


if(trim(!empty($_POST['name']))) {
  $body.='<p><strong>Name:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))) {
  $body.='<p><strong>E-mail:</strong>'.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['subject']))) {
  $body.='<p><strong>Subject:</strong>'.$_POST['subject'].'</p>';
}
if(trim(!empty($_POST['message']))) {
  $body.='<p><strong>Message:</strong>'.$_POST['message'].'</p>';
}

$mail->Body = $body;

if(!$mail->send()) {
  $message = 'Error';
} else {
  $message = 'Data sent';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>