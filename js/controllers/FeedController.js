app.controller('FeedController', function($scope, $http, baseServiceUrl, feedService, authentication) {
    $scope.comment = '';

    feedService.getNewsFeed(authentication.GetHeaders(),
        function (data) {
            $scope.feeds = data;
        });

    feedService.getFriends(authentication.GetHeaders(),
        function (data) {
            $scope.friends = data;
        });

    $scope.postComment = function(postId) {
        var _this = this;
        feedService.publishComment(postId,
            {
                commentContent: this.comment
            },
            authentication.GetHeaders(),
            function(data) {
                for(feed in _this.feeds) {
                    if(_this.feeds[feed].id == postId) {
                        _this.feeds[feed].comments.push(data);
                    }
                }
            })
    };

    $scope.showAllComments = function(id) {
        var _this = this;
        feedService.getAllComments(id, authentication.GetHeaders(),
        function(data){
            for(feed in _this.feeds) {
                if(_this.feeds[feed].id == id) {
                    _this.feeds[feed].comments = data;
                }
            }
        });
    };

    $scope.likePost = function(id) {
        feedService.likePost(id, authentication.GetHeaders(),
        function(data) {
            console.log(data);
        });
    };

});