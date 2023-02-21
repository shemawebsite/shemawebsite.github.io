<?php
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$email_form = 'info@shemacharmant.com';

$email_subject = 'Hi thank you for visiting my website its my pleasure to meet you'

$email_body = "User Name: $name.\n".
              "User Email: $visitor_email.\n".
              "Subject: $subject.\n".
              "User Message: $message.\n";


$to = 'charmantshema112@gmail.com';

$headers = "From: $email_form \r\n";

$headers = "Reply-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers);

header("location: contact.html");
?>







