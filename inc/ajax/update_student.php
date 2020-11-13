<?php 

	/**
	 * DB connection
	 */

	require_once "../../app/db.php";
	require_once "../../app/functions.php";

	// print_r($_POST);

	 $id = $_POST['student_id'];
	 $name= $_POST['name'];
	 $email = $_POST['email'];
	 $cell = $_POST['cell'];


	if (!empty($_FILES['new_photo']['name'])) {

			$data = fileUpload($_FILES['new_photo'], '../../media/img/students/');
			$photo_name = $data['file_name'];

			unlink('../../media/img/students/' . $_POST['old_photo']);
	
	}else{
		$photo_name = $_POST['old_photo'];
	}


	$sql = "UPDATE students SET name ='$name', email ='$email', cell ='$cell', photo ='$photo_name' WHERE id = '$id' ";
	$data = $connection ->query($sql);

	








 


 ?>