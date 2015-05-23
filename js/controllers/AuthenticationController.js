app.controller('AuthenticationController', function($scope, $location, $route, authentication, notifyService) {
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
                notifyService.showInfo('Registration Successful.');
                authentication.SetCredentials(serverData);
                ClearData();
                $location.path('/home');
            },
            function (error) {
                notifyService.showError(error.message, error);
            });
    };

    $scope.login = function () {
        authentication.Login($scope.loginData,
            function(serverData) {
                notifyService.showInfo('You have logged in successfully.');
                authentication.SetCredentials(serverData);
                ClearData();
                $location.path('/home');
            },
            function (error) {
                notifyService.showError(error.error_description);
            });
    };

    $scope.logout = function () {
        notifyService.showInfo('You Have Successfully Logged Out.');
        ClearData();
        authentication.ClearCredentials();
        $location.path('/');
    };
});