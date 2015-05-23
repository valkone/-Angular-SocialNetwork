app.controller('UserController', function($scope, $http, baseServiceUrl, userService, authentication, $route, notifyService) {
    $scope.userData = '';
    $scope.profileData = '';
    $scope.profileOwner = $route.current.params.username;
    $scope.me = localStorage['username'];

    $scope.openFileUploaderForAvatar = function() {
        document.getElementById('fileUploaderForAvatar').click();
    };

    $scope.openFileUploaderForCover = function() {
        document.getElementById('fileUploaderForCover').click();
    };

    $scope.uploadAvatar = function(element) {
        $scope.$apply(function(scope) {
            var photofile = element.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                if(e.total <= 1280) {
                    document.getElementById("avatarPic").src = e.target.result;
                } else {
                    notifyService.showError('File too big');
                }
            };
            reader.readAsDataURL(photofile);
        });
    };

    $scope.uploadCover = function(element) {
        $scope.$apply(function(scope) {
            var photofile = element.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                if(e.total <= 1280) {
                    document.getElementById("coverPic").src = e.target.result;
                } else {
                    notifyService.showError('File too big');
                }
            };
            reader.readAsDataURL(photofile);
        });
    };

    userService.getDataAboutMe(authentication.GetHeaders(),
    function(data) {
        $scope.userData = data;
    });

    if($route.current.loadedTemplateUrl != 'templates/partial/profile.html') {
        userService.profileData($route.current.params.username,
        authentication.GetHeaders(),
        function(data){
            $scope.profileData = data;
            if(!data.isFriend && data.username != localStorage['username']) {
                $scope.wrapperStyle = "test";
            }
        });
    }

    if($route.current.loadedTemplateUrl == "templates/partial/friends.html") {
        if($route.current.params.username != localStorage['username']) {
            userService.getFriendFriends($route.current.params.username,
                authentication.GetHeaders(),
                function(data){
                    $scope.friendFriends = data;
                    $scope.friendsCount = data.length;
                });
        } else {
            userService.getMyFriends(authentication.GetHeaders(),
            function(data){
                $scope.friendFriends = data;
                $scope.friendsCount = data.length;
            })
        }
    }

    $scope.saveChanges = function() {
        var profilePic = document.getElementById('avatarPic').src,
            coverPic = document.getElementById('coverPic').src;

        userService.updateProfile({
                name: this.userData.name,
                email: this.userData.email,
                profileImageData: profilePic,
                coverImageData: coverPic,
                gender: this.userData.gender
            }, authentication.GetHeaders(),
        function(data) {
            localStorage['profilePicture'] = profilePic;
            notifyService.showInfo('You successfully updated your profile');
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
                notifyService.showInfo(data.message);
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