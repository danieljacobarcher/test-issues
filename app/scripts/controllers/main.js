'use strict';

angular.module('angularIssuesApp')
  .controller('MainCtrl', function ($scope, $http, $resource) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ':' + $scope.password);

    // Setup
    var Issue = $resource('https://api.github.com/repos/danieljacobarcher/test-issues/issues/:number', {number: '@number'});


    $scope.loadIssues = function() {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ':' + $scope.password);
      $scope.issues = Issue.query();
    };

    $scope.addIssue = function() {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ':' + $scope.password);

      var data = {
        title: $scope.title,
        body: $scope.body
      };

      $http.post('https://api.github.com/repos/danieljacobarcher/test-issues/issues', data).success(function(response) {
        $scope.issues.unshift(data);
      });
    };

    $scope.closeIssue = function(issue) {
      issue.$save();
    };


  });
