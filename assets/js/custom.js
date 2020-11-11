(function($){
	$(document).ready(function(){

		// Show student_add_modal 
		$('a#student_show').click(function(){
			$('#student_add_modal').modal('show');

			return false;
		});

		// Show single student details modal
		$(document).on('click','a#single_show', function(){
			$('#single_student_modal').modal('show');

			return false;
		});
		

		//Add new Student
		$('form#addStudentForm').submit(function(e){
			e.preventDefault();
			
			let name = $('input[name = "name"]').val();
			let email = $('input[name = "email"]').val();
			let cell = $('input[name = "cell"]').val();

			if (name == '' || email == '' || cell == '') 
			{
				$('.mess').html('<p class ="alert alert-danger ">All fields are required ! <button class = "close" data-dismiss = "alert">&times;</button></p>');
			}else{

				$.ajax({

					url : 'inc/ajax/student_add.php',
					data: new FormData(this),
					contentType: false, 
					processData: false,
					method: "POST",
					success : function(data){

						$('form#addStudentForm')[0].reset();
						$('#student_add_modal').modal('hide');
						$('.mess-all').html(data);
						allStudentData();

						
					}
				});
			}


		});


		//Show all Student

		function allStudentData(){
			$.ajax({
			url : 'inc/ajax/all_student.php',

			success : function(data){
				$('tbody#all_student_data').html(data);
			}
		});


		}

		allStudentData();

		//Delete student
		$(document).on('click','a#delete_student', function(){
			let delete_id = $(this).attr('student_id');

			let conf = confirm('Are you sure ?');
			if (conf == true) {

				$.ajax({
			url : 'inc/ajax/delete_student.php',
			data : {id : delete_id },
			method : "POST",
			success : function(data){

				$('.mess-all').html('<p class ="alert alert-success ">Student Data Deleted ! <button class = "close" data-dismiss = "alert">&times;</button></p>');

				allStudentData();
			}
		});

			}else{
				return false;
			}


		

			return false;
		});
		






	});
})(jQuery)