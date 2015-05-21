app.factory('headerService', function ($http, baseServiceUrl) {

    var userData = {};

    userData.getPendingRequests = function (headers, success) {
        $http({
            method: 'get',
            url: baseServiceUrl + '/api/me/requests',
            headers: headers
        }).success(function(data){
            success(data);
        });
    };

    userData.requestApprove = function (id, headers, success) {
        $http({
            method: 'put',
            url: baseServiceUrl + '/api/me/requests/' + id + '?status=approved',
            headers: headers
        }).success(function(data){
            success(data);
        });
    };

    userData.requestReject = function (id, headers, success) {
        $http({
            method: 'put',
            url: baseServiceUrl + '/api/me/requests/' + id + '?status=rejected',
            headers: headers
        }).success(function(data){
            success(data);
        });
    };

    return userData;
});