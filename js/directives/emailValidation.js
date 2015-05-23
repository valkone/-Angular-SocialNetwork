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
