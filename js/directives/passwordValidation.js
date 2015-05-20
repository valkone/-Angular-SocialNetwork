app.directive('password', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.password = function(modelValue, viewValue) {
                if(viewValue) {
                    if(viewValue.length >= 6) {
                        return true;
                    }
                }

                return false;
            };
        }
    };
});

app.directive('confirmpassword', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.confirmpassword = function(modelValue, viewValue) {
                if(viewValue == scope.registerData.password) {
                    return true;
                }

                return false;
            };
        }
    };
});