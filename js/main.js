let cooky = $.cookie("login");

let portfolio = $(".profile-nav");
let login = $(".register-nav");
let portfolio__mobile = $(".mobile__profile-nav");
let login__mobile = $(".mobile__register-nav");

if (cooky) {
    portfolio.show();
    if (window.screen.width <= 992) {
        portfolio__mobile.show();
    }
} else {
    login.show();
    if (window.screen.width <= 992) {
        login__mobile.show();
    }
}

let navbar = $(".navbar-list");
let burger = $(".navbar-burger");

burger.click(function () {
    navbar.toggleClass("navbar-list--active");
    burger.toggleClass("navbar-burger--active");
});
