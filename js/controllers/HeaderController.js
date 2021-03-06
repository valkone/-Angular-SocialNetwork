app.controller('HeaderController', function($scope, authentication, headerService, notifyService, $location, $route) {
    if(localStorage['username'] == undefined) {
        $location.path('/');
    }

    var route = $route.current.loadedTemplateUrl;

    if(route == 'templates/partial/user.html') {
        document.title = $route.current.params.username + ' Profile - Social Network';
    } else if(route == 'templates/partial/feed.html') {
        document.title = localStorage['username'] + ' Feed - Social Network';
    } else if(route == 'templates/partial/profile.html') {
        document.title = 'Profile - Social Network';
    } else if(route == 'templates/partial/change-password.html') {
        document.title = 'Change password - Social Network';
    } else {
        document.title = 'Friend List - Social Network';
    }

    $scope.userData = {};

    headerService.getPreviewDataAboutMe(authentication.GetHeaders(),
    function(data) {
        $scope.userData.profilePicture = data.profileImageData;
        $scope.userData.username = data.username;
    });

    headerService.getPendingRequests(
        authentication.GetHeaders(),
        function(data) {
            $scope.userData.pendingRequests = data;
            $scope.userData.pendingRequestsCount = data.length;
        }
    );

    $scope.show = function() {
        if(document.getElementById('friendRequestPopup')) {
            document.getElementById('friendRequestPopup').style.display = "block";
        }
    };

    $scope.hide = function() {
        if(document.getElementById('friendRequestPopup')) {
            document.getElementById('friendRequestPopup').style.display = "none";
        }
    };

    $scope.requestApprove = function(id) {
        var _this = this;
        headerService.requestApprove(id, authentication.GetHeaders(),
        function(data) {
            notifyService.showInfo('The request is approved');
            $scope.userData.pendingRequestsCount--;
            var tempArray = [];
            for(var request in _this.userData.pendingRequests) {
                if(_this.userData.pendingRequests[request].id != id) {
                    tempArray.push(_this.userData.pendingRequests[request]);
                }
            }
            $scope.userData.pendingRequests = tempArray;
        })
    };

    $scope.requestReject = function(id) {
        var _this = this;
        headerService.requestReject(id, authentication.GetHeaders(),
            function(data) {
                $scope.userData.pendingRequestsCount--;
                notifyService.showInfo('The request is rejected');
                var tempArray = [];
                for(var request in _this.userData.pendingRequests) {
                    if(_this.userData.pendingRequests[request].id != id) {
                        tempArray.push(_this.userData.pendingRequests[request]);
                    }
                }
                $scope.userData.pendingRequests = tempArray;
            })
    };

    $scope.searchFriends = function() {
        var query = $scope.searchQuery;
        if(query != null && query != '') {
            headerService.searchFriends(query,
                authentication.GetHeaders(),
                function(data) {
                    $scope.foundedPeope = data;
                })
        }
    }
});