


function getCsrfToken() {
    var csrfCookieName = 'csrftoken';
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.indexOf(csrfCookieName + '=') === 0) {
            return cookie.substring(csrfCookieName.length + 1, cookie.length);
        }
    }

    // Якщо токен не знайдено в куках, використовуйте значення, передане з Django-темплейту
    let parser = new DOMParser();
    let doc = parser.parseFromString('{% csrf_token %}', 'text/html');
    let csrfInput = doc.querySelector('input[name="csrfmiddlewaretoken"]');
    return csrfInput ? csrfInput.value : null;
}