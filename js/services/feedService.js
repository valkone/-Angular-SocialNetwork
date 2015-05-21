app.factory('feedService', function ($http, baseServiceUrl) {

    var data = {};

    data.getNewsFeed = function (headers, success) {
        $http.get(baseServiceUrl + '/api/me/feed?StartPostId=&PageSize=5',
            {
                headers: headers
            })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    data.getFriends = function (headers, success) {
        $http.get(baseServiceUrl + '/api/me/friends/preview',
            {
                headers: headers
            })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    data.getProfileFriends = function(username, headers, success) {
        $http({
            method: 'get',
            url: baseServiceUrl + '/api/users/' + username + '/friends/preview',
            headers: headers
        }).success(function(data){
            success(data);
        });
    };

    data.publishComment = function (postId, data, headers, success, error) {
        $http.post(baseServiceUrl + '/api/posts/' + postId + '/comments', data, {headers: headers})
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    data.getAllComments = function (id, headers, success) {
        $http.get(baseServiceUrl + '/api/posts/' + id + '/comments',
            {
                headers: headers
            })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    data.likePost = function (id, headers, success) {
        $http({
            method: 'post',
            url: baseServiceUrl + '/api/Posts/' + id + '/likes',
            headers: headers

        }).success(function(data){
            success(data);
        });
    };

    data.dislikePost = function (id, headers, success) {
        $http({
            method: 'delete',
            url: baseServiceUrl + '/api/Posts/' + id + '/likes',
            headers: headers

        }).success(function(data){
            success(data);
        });
    };

    data.getProfileFeeds = function (user, headers, success) {
        $http({
            method: 'get',
            url: baseServiceUrl + '/api/users/' + user + '/wall?StartPostId&PageSize=10',
            headers: headers

        }).success(function(data){
            success(data);
        });
    };

    return data;
});