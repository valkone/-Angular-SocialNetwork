app.controller('AuthenticationController', function($scope, $location, $route,
        authentication){

    $scope.register = function () {
        authentication.Register($scope.registerData,
            function(serverData) {
                console.log(serverData);
            },
            function (serverError) {
                console.error(serverError);
            });
    };

    $scope.login = function () {
        authentication.Login($scope.loginData,
            function(serverData) {
                console.log(serverData);
            },
            function (serverError) {
                console.error(serverError);
            });
    };
});