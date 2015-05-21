app.controller('HeaderController', function($scope, authentication, headerService) {
    $scope.userData = {};

    $scope.userData.username = localStorage['username'];
    $scope.userData.profilePicture = localStorage['profilePicture'] || 'images/no-avatar.png';

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