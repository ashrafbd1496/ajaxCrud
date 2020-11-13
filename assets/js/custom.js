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

		let show_id = $(this).attr('student_id');
			
		$.ajax({
			url : 'inc/ajax/single_student_detail.php',
			data : {id : show_id },
			method : "POST",
			success : function(data){

				let single_data = JSON.parse(data);

				$('img#single_student_img').attr('src', 'media/img/students/' + single_data.photo);
				$('h2#single_name').text(single_data.name);
				$('td#single_name').text(single_data.name);
				$('td#single_email').text(single_data.email);
				$('td#single_cell').text(single_data.cell);
			}
		});

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


		//single student data search 

		function resetUpdateForm(student_id){

			$.ajax({

			url : 'inc/ajax/edit_student.php',
			data : {id : student_id },
			method : "POST",
			success : function(data){

				let edit_data = JSON.parse(data);

				$('#student_update_modal input[name="name"]').val(edit_data.name);
				$('#student_update_modal input[name="student_id"]').val(edit_data.id);
				$('#student_update_modal input[name="email"]').val(edit_data.email);
				$('#student_update_modal input[name="cell"]').val(edit_data.cell);
				$('#student_update_modal input[name="old_photo"]').val(edit_data.photo);
				$('#student_update_modal img').attr('src','media/img/students/' + edit_data.photo);
			}
		});

		}



		//EDIT student Data

		$(document).on('click','a#edit_student', function(e){
			e.preventDefault();

			let edit_id = $(this).attr('student_id');

			resetUpdateForm(edit_id);


			$('#student_update_modal').modal('show');
			

		});

		//Update student data-

		$(document).on('submit','form#updateStudentForm',function(e){
			e.preventDefault();

			$.ajax({
				url : 'inc/ajax/update_student.php',
				data: new FormData(this),
				contentType: false,
				processData: false,
				method : "POST",
				success : function(data){

				
					// $('#student_update_modal').modal('hide');

					$('.mess').html('<p class ="alert alert-success ">Student Data updated successful ! <button class = "close" data-dismiss = "alert">&times;</button></p>');

				allStudentData();

				resetUpdateForm(data);
				
				}
			});


		});

		


		






	});
})(jQuery)