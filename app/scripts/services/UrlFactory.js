Module.factory('UrlFactory', ['isMockApi', 'database', 'mongolabApi',
	function(isMockApi, database, mongolabApi) {
		var collectionPostfix = isMockApi? '/items.json': '';
		var itemPostfix = isMockApi? '.json': '';
		return {
			getApiString: function(collection) {
				if (isMockApi) {
					return 'json/api/' + collection;
				} else {
					return mongolabApi + database + '/collections/' + collection + ''
				}
			},
			collectionPostfix: collectionPostfix,
			itemPostfix: itemPostfix
		}
	}
]);