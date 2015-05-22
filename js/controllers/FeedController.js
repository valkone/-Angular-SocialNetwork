app.controller('FeedController', function($scope, $sce, $http, baseServiceUrl, feedService, authentication, $route) {
    $scope.comment = '';
    $scope.postContent = '';
    $scope.feedOwner = localStorage['username'];


    if($route.current.loadedTemplateUrl == "templates/partial/user.html") {
        if($route.current.params.username != localStorage['username']){
            feedService.getProfileFriends(
                $route.current.params.username,
                authentication.GetHeaders(),
                function (data) {
                    $scope.friends = data;
                });
        }
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
                for(feed in _this.feeds) {
                    if(_this.feeds[feed].id == postId) {
                        _this.feeds[feed].comments.push(data);
                    }
                }
            })
    };

    $scope.addPost = function(user) {
        var _this = this;
        feedService.addPost(
            {
                postContent: $scope.postContent,
                username: user
            },
            authentication.GetHeaders(),
            function(data) {
                _this.feeds.unshift(data);
            }
        )
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

    $scope.showDesc = function(a) {
        var div = 'userDesc' + a;
        document.getElementById(div).style.display = 'block';
    };

    $scope.hideDesc = function(a) {
        var div = 'userDesc' + a;
        document.getElementById(div).style.display = 'none';
    };

    $scope.showEditField = function(id) {
        var postId = 'post' + id,
            textareaId = 'editPost' + id,
            postNote = document.getElementById(postId),
            textareaNote = document.getElementById(textareaId);

        if(postNote.style.display == 'block') {
            postNote.style.display = 'none';
            textareaNote.style.display = 'block';
        } else {
            postNote.style.display = 'block';
            textareaNote.style.display = 'none';
        }
    };

    $scope.editPost = function(id) {
        var editedPost = document.getElementById('textarea' + id).value,
            _this = this,
            postId = 'post' + id,
            textareaId = 'editPost' + id;

        feedService.editPost(id, {
            'postContent': editedPost
        },
        authentication.GetHeaders(),
        function(data){
            for(var feed in _this.feeds) {
                if(_this.feeds[feed].id == id) {
                    _this.feeds[feed].postContent = data.content;
                    document.getElementById(postId).style.display = 'block';
                    document.getElementById(textareaId).style.display = 'none';
                }
            }
        })
    }
});