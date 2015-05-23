app.controller('UserController', function($scope, $http, baseServiceUrl, userService, authentication, $route) {
    $scope.userData = '';
    $scope.profileData = '';
    $scope.profileOwner = $route.current.params.username;
    $scope.me = localStorage['username'];


    userService.getDataAboutMe(authentication.GetHeaders(),
    function(data) {
        $scope.userData = data;
    });

    userService.profileData($route.current.params.username,
    authentication.GetHeaders(),
    function(data){
        $scope.profileData = data;
        if(!data.isFriend && data.username != localStorage['username']) {
            $scope.wrapperStyle = "test";
        }
    });


    if($route.current.loadedTemplateUrl == "templates/partial/friends.html") {
        if($route.current.params.username != localStorage['username']) {
            userService.getFriendFriends($route.current.params.username,
                authentication.GetHeaders(),
                function(data){
                    $scope.friendFriends = data;
                });
        } else {
            userService.getMyFriends(authentication.GetHeaders(),
            function(data){
                $scope.friendFriends = data;
            })
        }
    }

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
    };

    $scope.addToFriendList = function(username) {
        userService.addToFriendList(username,
        authentication.GetHeaders(),
        function(data) {
            console.log(data);
        });
    };
});