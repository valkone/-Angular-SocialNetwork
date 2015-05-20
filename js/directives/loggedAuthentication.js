app.directive('logged', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.logged = function(modelValue, viewValue) {
                return true;
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