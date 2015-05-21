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

app.directive('confirmnewpassword', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.confirmnewpassword = function(modelValue, viewValue) {
                if(viewValue == scope.userData.newPassword) {
                    return true;
                }

                return false;
            };
        }
    };
});