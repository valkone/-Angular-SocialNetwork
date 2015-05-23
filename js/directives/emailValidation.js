var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
app.directive('emailfield', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.emailfield = function(modelValue, viewValue) {
                if(regex.test(viewValue)) {
                    return true;
                }

                return false;
            };
        }
    };
});

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
