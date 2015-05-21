app.controller('AuthenticationController', function($scope, $location, $route, authentication) {
    $scope.username = localStorage['username'];

    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.register = function () {
        authentication.Register($scope.registerData,
            function(serverData) {
                authentication.SetCredentials(serverData);
                ClearData();
                $location.path('/home');
            },
            function (serverError) {
                console.error(serverError);
            });
    };

    $scope.login = function () {
        authentication.Login($scope.loginData,
            function(serverData) {
                authentication.SetCredentials(serverData);
                ClearData();
                $location.path('/home');
            },
            function (serverError) {
                console.error(serverError);
            });
    };

    $scope.logout = function () {
        ClearData();
        authentication.ClearCredentials();
        $location.path('/');
    };
});