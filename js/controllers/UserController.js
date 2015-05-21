app.controller('UserController', function($scope, $http, baseServiceUrl, userService, authentication) {
    $scope.userData = '';

    userService.getDataAboutMe(authentication.GetHeaders(),
    function(data) {
        $scope.userData = data;
    });

    $scope.saveChanges = function() {
        userService.updateProfile(this.userData, authentication.GetHeaders(),
        function(data) {
            console.log('success');
        });
    };

    $scope.changePasswordButtonClicked = function() {
        userService.changePassword(
            {
                oldPassword: this.userData.oldPassword,
                newPassword: this.userData.newPassword,
                confirmPassword: this.userData.confirmNewPassword
            },
            authentication.GetHeaders(),
            function(data) {
                console.log(data);
            }
        )
    }
});