'use strict';

angular.module('gtrApp')
    .factory('Team', function(Item) {
        var toArray = function(list) {
            var items = [];
            if (typeof list === 'object') {
                angular.forEach(list, function(item) {
                    items.push(new Item({
                        value: item
                    }));
                });
            }

            return items;
        };

        return function (data) {
            if (typeof data === 'object') {
                if (typeof data.members === 'object') {
                    data.members = toArray(data.members);
                }
                if (typeof data.projects === 'object') {
                    data.projects = toArray(data.projects);
                }
                if (typeof data.orgs === 'object') {
                    data.orgs = toArray(data.orgs);
                }
            }

            angular.extend(this, {
                name: null,
                members: [],
                projects: [],
                orgs: [],
                descendingOrder: true,
                labels: false,
                milestones: false
            }, data);
    };
});