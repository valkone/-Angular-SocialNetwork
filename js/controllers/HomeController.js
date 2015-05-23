app.controller('HomeController', function($location) {
    if(localStorage['accessToken'] != undefined) {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "#f6f6f6";
    } else {
        document.body.style.backgroundColor = "";
        document.body.style.backgroundImage = "url('images/home-background.jpg')";
    }
});