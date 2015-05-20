app.directive('required', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.required = function(modelValue, viewValue) {
                if(viewValue) {
                    return true;
                }

                return false;
            };
        }
    };
});