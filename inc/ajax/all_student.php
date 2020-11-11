<?php 

	/**
	 * DB connection
	 */

	require_once "../../app/db.php";
	require_once "../../app/functions.php";


	$sql = "SELECT * FROM students ORDER BY id DESC ";
	$data = $connection ->query($sql);


 ?>


<?php 
	$i;
	 while($all = $data ->fetch_assoc()):

 ?>

	<tr>
		<td><?$i =1; $i++; ?></td>
		<td><?php echo $all['name']; ?></td>
		<td><?php echo $all['email']; ?></td>
		<td><?php echo $all['cell']; ?></td>
		<td><img src="media/img/students/<?php echo $all['photo']; ?>"></td>
		<td>
			<a id="single_show" class="btn btn-sm btn-info" href="#">View</a>
			<a class="btn btn-sm btn-warning" href="#">Edit</a>
			<a id="delete_student" student_id = "<?php echo $all['id']; ?>" class="btn btn-sm btn-danger" href="#">Delete</a>
		</td>
	</tr>

	<?php endwhile; ?>