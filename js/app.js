var app = angular.module('SocialNetworkApp', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net');

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/partial/home.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/login', {
        templateUrl: 'templates/partial/login.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/register', {
        templateUrl: 'templates/partial/register.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/home', {
        templateUrl: 'templates/partial/feed.html',
        controller: 'FeedController'
    });
    $routeProvider.when('/settings/password', {
        templateUrl: 'templates/partial/change-password.html',
        controller: 'HomeController'
    });

});