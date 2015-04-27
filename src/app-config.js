'use strict';

var routeConfig = ['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        var setUpStates = function(viewStates) {
            angular.forEach(viewStates, function(vs) {
                $stateProvider.state(vs);
            });
        };

        var viewStates = [
            {
                name : 'inbox',
                url: '/',
                views : {
                    'contentView@' : {
                        controller: 'InboxCtrl',
                        controllerAs : 'inbox',
                        template : require('html!./inbox-view.html')
                    }
                }
            },
            {
                name: 'readerview',
                url : '/mail/:mailId',
                views : {
                    'contentView@' : {
                        controller: 'ReaderViewCtrl',
                        controllerAs: 'reader',
                        template : require("html!./readerview/reader-view.html")
                    }
                },
                resolve : {
                    jsBundle : [ '$q', '$timeout', function($q, $timeout) {
                        var deferred = $q.defer();
                        require.ensure([], function() {
                            require('./readerview/readerview.js');
                            $timeout(function() {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    } ]
                }
            }
        ];
        console.log('adding default router ');
        $urlRouterProvider.otherwise('/');

        setUpStates(viewStates);
    }];

module.exports = function(app) {
    console.log('adding config ');
    app.config(routeConfig);
};