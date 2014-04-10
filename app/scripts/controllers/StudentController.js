Module.controller('StudentController', ['$scope', 'StudentsService', '$routeParams', '$location', 'mode',
	function ($scope, StudentsService, $routeParams, $location, mode) {

		var createStudent = function() {
			StudentsService.createStudent($scope.student).then(function() {
				$location.path('/students');
			},function() {
				$location.path('/students');
			});
		};

		var updateStudent = function() {
			StudentsService.updateStudent($routeParams.id, $scope.student).then(function() {
				$location.path('/students');
			},function() {
				$location.path('/students');
			});
		}

		$scope.student = {};

		var isCreating = (mode == 'create');
		if (!isCreating) {
			StudentsService.getStudent($routeParams.id).then(function(response) {
				$scope.student = response.data;
				delete $scope.student._id;
			});
			$scope.action = updateStudent;
		} else {
			$scope.action = createStudent;
		}
	}
]);