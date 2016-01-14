<?php 
	$name = $_POST['name'];
    $email = $_POST['email'];
    $recipient = $_POST['receiver'] .', takuma@metronome3.com';
    $message = $_POST['message'];
              $formcontent="From: $name \n Message: $message";        
              $subject = "PLEY Proposal : contact form";
              $mailheader = "From: $email \r\n";
              mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
              echo $recipient;
              ?>