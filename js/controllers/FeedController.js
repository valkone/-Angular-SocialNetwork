app.controller('FeedController', function($scope, $http, baseServiceUrl, feedService, authentication, $route) {
    $scope.comment = '';

    if($route.current.loadedTemplateUrl == "templates/partial/user.html") {
        feedService.getProfileFriends(
            $route.current.params.username,
            authentication.GetHeaders(),
            function (data) {
                $scope.friends = data;
            });
    } else {
        feedService.getFriends(authentication.GetHeaders(),
            function (data) {
                $scope.friends = data;
            });
    }

    if($route.current.loadedTemplateUrl == "templates/partial/user.html")
    {
        feedService.getProfileFeeds(
            $route.current.params.username,
            authentication.GetHeaders(),
            function(data){
                $scope.feeds = data;
            });
    } else {
        feedService.getNewsFeed(authentication.GetHeaders(),
            function (data) {
                $scope.feeds = data;
            });
    }


    $scope.postComment = function(postId) {
        var _this = this;
        feedService.publishComment(postId,
            {
                commentContent: this.comment
            },
            authentication.GetHeaders(),
            function(data) {
                //if($route.current.loadedTemplateUrl == "templates/partial/user.html") {
                //    for(var feed in _this.profileFeedData) {
                //        if(_this.profileFeedData[feed].id == postId) {
                //            _this.profileFeedData[feed].comments.push(data);
                //        }
                //    }
                //} else {
                    for(feed in _this.feeds) {
                        if(_this.feeds[feed].id == postId) {
                            _this.feeds[feed].comments.push(data);
                        }
                    }
                //}
            })
    };

    $scope.showAllComments = function(id) {
        var _this = this;
        feedService.getAllComments(id, authentication.GetHeaders(),
        function(data){
            for(var feed in _this.feeds) {
                if(_this.feeds[feed].id == id) {
                    _this.feeds[feed].comments = data;
                }
            }
        });
    };

    $scope.likePost = function(id) {
        var _this = this;
        feedService.likePost(id, authentication.GetHeaders(),
        function(data) {
            for(var feed in _this.feeds) {
                if(_this.feeds[feed].id == id) {
                    _this.feeds[feed].likesCount++;
                    _this.feeds[feed].liked = true;
                }
            }
        });
    };

    $scope.dislikePost = function(id) {
        var _this = this;
        feedService.dislikePost(id, authentication.GetHeaders(),
            function(data) {
                for(var feed in _this.feeds) {
                    if(_this.feeds[feed].id == id) {
                        _this.feeds[feed].likesCount--;
                        _this.feeds[feed].liked = false;
                    }
                }
            });
    };

});