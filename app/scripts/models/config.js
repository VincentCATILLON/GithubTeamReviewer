'use strict';

angular.module('gtrApp')
    .factory('Config', function(Team, OAuth) {
        return function (data) {
            if (typeof data === 'object') {
                if (typeof data.githubOAuth === 'object') {
                    data.githubOAuth = new OAuth(data.githubOAuth);
                }
                if (typeof data.teams === 'object') {
                    var teams = [];
                    angular.forEach(data.teams, function (team, name) {
                        team.name = name;
                        teams.push(new Team(team));
                    });
                    data.teams = teams;
                }
            }
            angular.extend(this, {
                refreshInterval: null,
                teams: [],
                githubOAuth: new OAuth()
            }, data);
        };
    });