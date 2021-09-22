function sendAjaxForm(php_form, result_html, ajax_form) {
    $.ajax({
        url: php_form,
        type: "POST",
        dataType: "html",
        data: $(ajax_form).serialize(),
        success: function (response) {
            json_result = $.parseJSON(response);
            if (json_result.status == "registered") {
                $(result_html).html("Данный пользователь уже зарегистрирован!");
            } else {
                $("#result_form").html("Вы успешно зарегистрированы!<br>Перенаправление будет через 3 секунд...<br>");
                $.cookie("login", `${json_result.login}`, { expires: 30, path: "/" });
                $.cookie("password", `${json_result.password}`, { expires: 30, path: "/" });
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 3000);
            }
        },
        error: function (response) {
            $(result_html).html("Ошибка! Данные не отправлены.");
        },
    });
}

$(document).ready(function () {
    let login = "";
    let password = "";

    $("#auth-form__login").on("keyup", function () {
        login = $("#auth-form__login")
            .val()
            .replace(/[^A-Z0-9]/gi, "");
    });

    $("#auth-form__password").on("keyup", function () {
        password = $("#auth-form__password")
            .val()
            .replace(/[^A-Z0-9]/gi, "");
    });

    $("#auth-form__btn").click(function () {
        if (login.length >= 4) {
            if (password.length >= 6) {
                sendAjaxForm("./core/auth/auth.php", "#result_form", "#auth-form");
            } else if (password.length === 0) {
                $("#result_form").html("Введите корректный пароль!");
            } else {
                $("#result_form").html("Вы ввели неккоректный пароль!");
            }
        } else if (login.length === 0) {
            $("#result_form").html("Введите корректный логин!");
        } else {
            $("#result_form").html("Вы ввели неккоректный логин!");
        }
    });
});
