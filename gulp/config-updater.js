'use strict';

var fs = require('fs');
var configPublisher = require('./config');

var convertListItems = function(data) {
    var items = [];
    data.forEach(function(item) {
        if (typeof item === 'object' && typeof item.value === 'string' && items.indexOf(item.value) === -1) {
            items.push(item.value);
        }
    });

    return items;
};

var convert = function(data) {
    var teams = {};
    if (typeof data === 'object') {
        if (typeof data.teams === 'object') {
            data.teams.forEach(function(team) {
                var name = team.name;
                delete team.name;
                if (typeof team.members === 'object') {
                    team.members = convertListItems(team.members);
                    if (!team.members.length) {
                        delete team.members;
                    }
                }
                if (typeof team.projects === 'object') {
                    team.projects = convertListItems(team.projects);
                    if (!team.projects.length) {
                        delete team.projects;
                    }
                }
                if (typeof team.orgs === 'object') {
                    team.orgs = convertListItems(team.orgs);
                    if (!team.orgs.length) {
                        delete team.orgs;
                    }
                }
                teams[name] = team;
            });
        }
    }
    data.teams = teams;

    return data;
};

var configUpdater = function(data, response, callback) {
    var config = {
        'config': convert(data)
    };
    // Generates the file into the "config" folder
    fs.writeFile("config/config.json", JSON.stringify(config), 'utf8', function(err) {
        var data = {
            message: 'Unable to write config file'
        };
        if (!err) {
            data.code = 200;
            data.message = 'Config file generated';
            // Publish the file into the "dist" folder
            configPublisher();
        }
        callback(response, data);
    });
};

module.exports = configUpdater;
