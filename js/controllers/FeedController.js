app.controller('FeedController', function($scope, $sce, $http, baseServiceUrl, feedService, userService, authentication, $route) {
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
                $scope.lastFeedId = data[data.length - 1].id;
                $scope.feedNumber = data.length;
            });
    } else {
        feedService.getNewsFeed(authentication.GetHeaders(),
            function (data) {
                $scope.feeds = data;
                $scope.lastFeedId = data[data.length - 1].id;
                $scope.feedNumber = data.length;
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
                            if(_this.feeds[feed].comments[comment].id == commentId) {
                                _this.feeds[feed].comments[comment].commentContent = data.commentContent;
                                document.getElementById('commentContent' + commentId).style.display = 'block';
                                document.getElementById('editComment' + commentId).style.display = 'none';
                            }
                        }
                    }
                }
            }
        )
    };

    $scope.deleteComment = function(commentId, postId) {
        var _this = this;

        feedService.deleteComment(commentId, postId,
        authentication.GetHeaders(),
        function(data) {
            for(var feed in _this.feeds) {
                if(_this.feeds[feed].id == postId) {
                    for(var comment in _this.feeds[feed].comments) {
                        if(_this.feeds[feed].comments[comment].id == commentId) {
                            delete _this.feeds[feed].comments[comment].commentContent;

                            var parent = document.getElementById("comments");
                            var child = document.getElementById("comment" + postId + '' + commentId);
                            parent.removeChild(child);
                        }
                    }
                }
            }
        })
    };

    $scope.showCommentUserInfo = function(feedId, commentId, commentOwner) {
        if(document.getElementById('popupFriendStatus' + feedId + '' + commentId).innerText == '') {
            feedService.getUserPreviewData(commentOwner, authentication.GetHeaders(),
            function(data) {
                if(data.isFriend) {
                    document.getElementById('popupFriendStatus' + feedId + '' + commentId).innerText = 'friend';
                } else if(data.hasPendingRequest) {
                    document.getElementById('popupFriendStatus' + feedId + '' + commentId).innerText = 'pending';
                } else {
                    document.getElementById('popupFriendStatus' + feedId + '' + commentId).innerHTML =
                        '<a href="javascript: void(0);" username="' + commentOwner + '" id="test" onclick="angular.element(this).scope().addToFriendList(this)">add to friend list</a>';
                }

                document.getElementById('popupComment' + feedId + '' + commentId).style.display = 'block';
            });
        } else {
            document.getElementById('popupComment' + feedId + '' + commentId).style.display = 'block';
        }
    };

    $scope.hideCommentUserInfo = function(feedId, commentId) {
        document.getElementById('popupComment' + feedId + '' + commentId).style.display = 'none';
    };

    $scope.addToFriendList = function(note) {
        var username = note.getAttribute('username');
        userService.addToFriendList(username,
        authentication.GetHeaders(),
        function(data){
            console.log(data);
        })
    };

    $scope.likeComment = function(commentId, postId) {
        var _this = this;
        feedService.likeComment(commentId, postId,
        authentication.GetHeaders(),
        function(data){
            for(var feed in _this.feeds) {
                if(_this.feeds[feed].id == postId) {
                    for(var comment in _this.feeds[feed].comments) {
                        if(_this.feeds[feed].comments[comment].id == commentId) {
                            _this.feeds[feed].comments[comment].likesCount++;
                            _this.feeds[feed].comments[comment].liked = true;
                        }
                    }
                }
            }
        });
    };

    $scope.dislikeComment = function(commentId, postId) {
        var _this = this;
        feedService.dislikeComment(commentId, postId,
            authentication.GetHeaders(),
            function(data){
                for(var feed in _this.feeds) {
                    if(_this.feeds[feed].id == postId) {
                        for(var comment in _this.feeds[feed].comments) {
                            if(_this.feeds[feed].comments[comment].id == commentId) {
                                _this.feeds[feed].comments[comment].likesCount--;
                                _this.feeds[feed].comments[comment].liked = false;
                            }
                        }
                    }
                }
            });
    };

    $scope.test = function(a) {
        if(a != null && a != '') {
            var lastFeedId = a[0].attributes['last-feedid'].nodeValue;
            feedService.getNextFeeds(lastFeedId, authentication.GetHeaders(),
            function(data) {
                if(data.length > 0) {
                    var newFeeds = $scope.feeds.concat(data);
                    var lastFeedId = data[data.length - 1].id;
                    $scope.feeds = newFeeds;
                    document.getElementById('news-feed').setAttribute('last-feedId', lastFeedId);
                } else {
                    document.getElementById('loader').style.display = 'none';
                }
            })
        }

    };

    $scope.test2 = function(a) {

        if(a != null && a != '') {
            var lastWallFeedId = a[0].attributes['last-wallFeedId'].nodeValue;
            var wallOwner = $route.current.params.username;

            feedService.getNextWallFeeds(lastWallFeedId, wallOwner, authentication.GetHeaders(),
                function (data) {
                    if(data.length > 0) {
                        var newFeeds = $scope.feeds.concat(data);
                        var lastFeedId = data[data.length - 1].id;
                        $scope.feeds = newFeeds;
                        document.getElementById('news-feed').setAttribute('last-wallFeedId', lastFeedId);
                    } else {
                        document.getElementById('loader').style.display = 'none';
                    }
                })
        }

    };
});