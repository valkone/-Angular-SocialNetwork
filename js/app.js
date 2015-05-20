var app = angular.module('SocialNetworkApp', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/partial/home.html'
    });
    $routeProvider.when('/login', {
        templateUrl: 'templates/partial/login.html'
    });
    $routeProvider.when('/register', {
        templateUrl: 'templates/partial/register.html'
    });
    $routeProvider.when('/home', {
        templateUrl: 'templates/partial/feed.html'
    });
    $routeProvider.when('/settings/password', {
        templateUrl: 'templates/partial/change-password.html'
    });

});