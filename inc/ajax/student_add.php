

<?php 

	
	/**
	 * DB connection
	 */

	require_once "../../app/db.php";
	require_once "../../app/functions.php";

	/**
	 * Get value
	 */

	$name = $_POST['name'];
	$email = $_POST['email'];
	$cell = $_POST['cell'];



	$data = fileUpload($_FILES['photo'], '../../media/img/students/');
	$photo_name = $data['file_name'];

	$sql = "INSERT INTO students (name, email, cell, photo) VALUES ('$name','$email','$cell','$photo_name')";
	$connection ->query($sql);

	echo '<p class ="alert alert-success ">Student added Successful ! <button class = "close" data-dismiss = "alert">&times;</button></p>';

 ?>