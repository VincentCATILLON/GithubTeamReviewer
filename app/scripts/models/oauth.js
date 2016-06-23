'use strict';

angular.module('gtrApp')
    .factory('OAuth', function(OAuthApp) {
        return function (data) {
            if (typeof data === 'object' && typeof data.apps === 'object') {
                var apps = [];
                angular.forEach(data.apps, function(app) {
                    apps.push(new OAuthApp(app));
                });
                data.apps = apps;
            }

            angular.extend(this, {
                apps: []
            }, data);
        };
    });