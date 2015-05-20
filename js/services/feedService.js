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
        $http.post(baseServiceUrl + '/api/Posts/' + id + '/likes',
            {
                headers: headers
            })
            .success(function (data, status, headers, config) {
                success(data);
            });
    };

    return data;
});