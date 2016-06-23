'use strict';

angular.module('gtrApp')
    .factory('Item', function() {
        return function (data) {
            angular.extend(this, {
                value: ''
            }, data);
        };
    });