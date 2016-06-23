'use strict';

angular.module('gtrApp')
    .factory('OAuthApp', function() {
        return function (data) {
            angular.extend(this, {
            }, data);
        };
    });