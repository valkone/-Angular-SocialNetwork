app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            var location = $window.location.hash;

            if(location == '#/home') {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    scope.test(element);
                }
            }
        });
    };
});


app.directive("scroll2", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            var location = $window.location.hash;

            if((location.toString().match(/\#\/users\//g) && !location.toString().match(/\#\/users\/.*\/.*/g))) {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    scope.test2(element);
                }
            }
        });
    };
});
