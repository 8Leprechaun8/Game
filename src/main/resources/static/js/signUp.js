function signUp() {
    deleteCookie("JSESSIONID");

    const firstNameInput = document.getElementById('firstName');
    const secondNameInput = document.getElementById('secondName');
    const lastNameInput = document.getElementById('lastName');
    const userNameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth/sign-up-game');
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = {
        firstName: firstNameInput.value,
        secondName: secondNameInput.value,
        lastName: lastNameInput.value,
        username: userNameInput.value,
        password: passwordInput.value,
        email: emailInput.value
    };
    let jsonData = JSON.stringify(data);
    xhr.send(jsonData);

    xhr.onload = function() {
      if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
      } else { // если всё прошло гладко, выводим результат
        const serverData = JSON.parse(xhr.response);
        document.cookie = "jwtToken=" + serverData.token + "; max-age=3600; path=/;";
        document.getElementById("jwtToken").innerHTML = getCookie("jwtToken");
      }
    };
}

function deleteCookie(name, path = '/', domain = '') {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + (domain ? "; domain=" + domain : "");
}

function getCookie(myName) {
    const cookies = document.cookie.split('; ');
    const cookieMap = {};
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieMap[name] = value;
    });
    const cookieVal = cookieMap[myName];
    return cookieVal;
}