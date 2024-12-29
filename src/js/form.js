const openBtns = document.querySelectorAll('.fly-button'),
      contactForm = document.querySelector('.tg-form');
      tgWrap = document.querySelector('.form-wrap');

openBtns.forEach(openBtn => {
    openBtn.addEventListener('click', function() {        
            contactForm.classList.add('form-show');
        }
    )});

let nameInput = document.getElementById('name');
let phoneInput = document.getElementById('phone');


function send() {
    const TOKEN = "7509935907:AAFjuV-2tN_XJuhlxg1aoJu3q_TKSjkOa0Y",
        CHAT_ID = "-1002334039001",
        URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    let message = `<b>Заявка с сайта</b>\n`;

    quizData.forEach((questionData, index) => {
        message += `<b>Вопрос${index + 1}:</b> ${userAnswers[index]} \n`;
    });

    message += `<b>Имя:</b> ${nameInput.value} \n`;
    message += `<b>Телефон:</b> ${phoneInput.value} \n`;

    axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
    
    .then(function(res) {
        currentForm.name.value = '';
        currentForm.phone.value = '';
        window.location.href = 'https://front-eugene.github.io/thank_you.html';
    })
    
    .catch(function(error) {
        console.error('Ошибка отправки сообщения в Telegram:', error);
        // Обработать ошибку здесь, если необходимо
    });
}

// МАСКА ТЕЛЕФОНА
[].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+375 (__) ___ - __ - __",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = new_value;
        }
        if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
        }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);

});