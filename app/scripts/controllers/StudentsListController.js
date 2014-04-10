Module.controller('StudentsListController', ['$scope', 'StudentsService',
	function ($scope, StudentsService) {

		StudentsService.getStudents().then(function(response) {
			$scope.students = response.data;
		});

		$scope.removeStudent = function(id, $index) {
			StudentsService.deleteStudent(id);
			$scope.students.splice($index, 1);
		};
	}
]);