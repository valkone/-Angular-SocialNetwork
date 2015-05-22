app.factory('userService', function ($http, baseServiceUrl) {

    var userData = {};

    userData.getDataAboutMe = function (headers, success) {
        $http.get(baseServiceUrl + '/api/me',
            {
                headers: headers
            })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    userData.updateProfile = function (data, headers, success) {
        $http({
            method: 'put',
            url: baseServiceUrl + '/api/me',
            headers: headers,
            data: data

        }).success(function(data){
            success(data);
        });
    };

    userData.changePassword = function (data, headers, success) {
        $http({
            method: 'put',
            url: baseServiceUrl + '/api/me/changepassword',
            headers: headers,
            data: data
        }).success(function(data){
            success(data);
        });
    };

    userData.profileData = function (profileName, headers, success) {
        $http({
            method: 'get',
            url: baseServiceUrl + '/api/users/' + profileName,
            headers: headers
        }).success(function(data){
            success(data);
        });
    };

    userData.getMyFriends = function(headers, success) {
        $http({
            method: 'get',
            url: baseServiceUrl + '/api/me/friends',
            headers: headers
        }).success(function(data){
            success(data);
        });
    };

    userData.getFriendFriends = function(profileName, headers, success) {
        $http({
            method: 'get',
            url: baseServiceUrl + '/api/users/' + profileName + '/friends',
            headers: headers
        }).success(function(data){
            success(data);
        });
    };

    userData.addToFriendList = function(username, headers, success) {
        $http({
            method: 'post',
            url: baseServiceUrl + '/api/me/requests/' + username,
            headers: headers
        }).success(function(data){
            success(data);
        });
    };


    return userData;
});