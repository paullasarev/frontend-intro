var Module = angular.module('hw1', ['ngRoute']);

Module.config(['$routeProvider',
	function($routeProvider) {

		$routeProvider
			.when('/students', {
				templateUrl: 'views/students.html',
				controller: 'StudentsListController'
			})
			.when('/students/create', {
				templateUrl: 'views/student.html',
				controller: 'StudentController',
				resolve: {
					mode: function() {
						return 'create';
					}
				}
			})
			.when('/students/:id', {
				templateUrl: 'views/student.html',
				controller: 'StudentController',
				resolve: {
					mode: function() {
						return 'edit';
					}
				}
			});

		$routeProvider.otherwise({ redirectTo: '/students' });
	}
])
.constant('apiKey', 'TxKcsfsjklmqjWHNUYxx2p8sGZUixaL0')
.constant('database', 'hw1')
.constant('mongolabApi', 'https://api.mongolab.com/api/1/databases/');