Module.factory('StudentsService', ['$http', 'UrlFactory', 'apiKey',

	function($http, UrlFactory, apiKey) {
		var studentsApi = UrlFactory.getApiString('students');
		return {  

			getStudents: function() {
				return $http.get(studentsApi + UrlFactory.collectionPostfix, {params: {apiKey: apiKey}});
			},

			getStudent: function(id) {
				return $http.get(studentsApi + '/' + id  + UrlFactory.itemPostfix, {params: {apiKey: apiKey}});
			},

			createStudent: function(data) {
				return $http.post(studentsApi, data, {params: {apiKey: apiKey}});
			},

			updateStudent: function(id, data) {
				return $http.put(studentsApi + '/' + id, data, {params: {apiKey: apiKey}});
			},

			deleteStudent: function(id) {
				return $http.delete(studentsApi + '/' + id, {params: {apiKey: apiKey}});
			}
		}

	}
]);