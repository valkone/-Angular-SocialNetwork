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


    return userData;
});