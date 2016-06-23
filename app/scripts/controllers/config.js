'use strict';

angular.module('gtrApp')

    .controller('ConfigCtrl', function ($scope, $http, Config, Team, OAuthApp, Item, config) {
        $scope.config = new Config(config);
        $scope.addListItem = function(list, item) {
            item = typeof item === 'object' ? item : new Item(item);
            if (list.indexOf(item) === -1) {
                list.push(item);
            }
        };
        $scope.removeListItem = function(list, item) {
            list.splice(list.indexOf(item), 1);
        };
        $scope.addTeam = function() {
            $scope.addListItem($scope.config.teams, new Team());
        };
        $scope.removeTeam = function(team) {
            $scope.removeListItem($scope.config.teams, team);
        };
        $scope.addGithubOAuthApp = function() {
            $scope.addListItem($scope.config.githubOAuth.apps, new OAuthApp());
        };
        $scope.removeGithubOAuthApp = function(app) {
            $scope.removeListItem($scope.config.githubOAuth.apps, app);
        };
        $scope.save = function() {
            $http({
                method: 'POST',
                url: 'http://localhost:9001',
                headers : {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $scope.config
            });
        };
    });
