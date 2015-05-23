app.controller('GuestUsersController', function($location) {
    if(localStorage['username']) {
        $location.path('/home');
    }
});