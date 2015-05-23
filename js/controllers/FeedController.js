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
                postContent: this.postContent,
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

        if(postNote.style.getPropertyValue('display') == 'block') {
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
    };

    $scope.deletePost = function(id) {
        var _this = this;
        feedService.deletePost(id,
        authentication.GetHeaders(),
        function(data){
            for(var feed in _this.feeds) {
                if(_this.feeds[feed].id == id) {
                    delete _this.feeds[feed].postContent;


                    var parent = document.getElementById("news-feed");
                    var child = document.getElementById("feed" + id);
                    parent.removeChild(child);
                }
            }
        })
    };

    $scope.toggleEditComment = function(id) {
        var commentContentNote = document.getElementById('commentContent' + id),
            editCommentNote = document.getElementById('editComment' + id);

        if(commentContentNote.style.getPropertyValue('display') == 'block') {
            commentContentNote.style.display = 'none';
            editCommentNote.style.display = 'block';
        } else {
            commentContentNote.style.display = 'block';
            editCommentNote.style.display = 'none';
        }
    };

    $scope.editComment = function(commentId, feedId) {
        var editedComment = document.getElementById('editedComment' + commentId).value;
        var _this = this;
        feedService.editComment(commentId, feedId,
            {
                commentContent: editedComment
            },
            authentication.GetHeaders(),
            function(data) {
                for(var feed in _this.feeds) {
                    if(_this.feeds[feed].id == feedId) {
                        for(var comment in _this.feeds[feed].comments) {
                            _this.feeds[feed].comments[comment].commentContent = data.commentContent;
                            document.getElementById('commentContent' + commentId).style.display = 'block';
                            document.getElementById('editComment' + commentId).style.display = 'none';
                        }
                    }
                }
            }
        )
    }
});