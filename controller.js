(function(){

	var app = angular.module("githubViewer", []);

	var MainController = function($scope, $http){
		var onUserComplete = function(response){
			$scope.user = response.data;
			$http.get($scope.user.repos_url)
				.then(onRepos, onError);
		};

		var onRepos = function(response){
			$scope.repos = response.data;
		};

		var onError = function(reason){
			$scope.error = "Whoops! I'm throwing an error";
		};

/*		$http.get("https://api.github.com/users/existenzial")
			.then(onUserComplete, onError);*/
		//above .get request useful if you want to grab the data immediately

		$scope.search = function(username){
			$http.get("https://api.github.com/users/" + username)
				.then(onUserComplete, onError);
		}

		// $scope.username = "angular";
		$scope.header = "Git Status All-Stars";
		$scope.repoSortOrder = "-stargazers_count";
	};

	app.controller("MainController", ["$scope", "$http", MainController]); 
	//2nd param is function to use when "MainController" is looked for

	//2nd param can also be an array, which is more common, b/c of minification and function would be the last item in that array and the previous items in the array would be the dependencies e.g.: $scope, $http etc. since the minifier will change them to different single character variable names ["$scope", "$http", MainController]

}());

/*
-$scope provides the model & that model doesn't touch HTML
-Data Binding Directives e.g.: {{message}} , moves model data to view
-Directives allow for indirect model view interaction
*/