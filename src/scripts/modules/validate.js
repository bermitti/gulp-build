'use strict'

module.exports = function () {
    const form = document.querySelector('form');
    if(form) {
        console.log('000');
        document.addEventListener('submit', (e) =>{
        e.preventDefault();
        console.log('111');
        validate();
        console.log('222');
        });
    };

    //-проверяем все инпуты формы
    const checkInput = (input) => {
        if (input.value.trim() === ''){
            // input.classList.add('form__input_empty');
            let test1 = document.querySelector('.form__field');
            test1.style.border = '2px solid red';
            console.log('11');
        }else{
            // input.classList.remove('form__input_empty');
            input.style.border = none;
        }
    };
    //-проверяем чекбоксы
    const checkBox = (input, wrongRadio) => {
        const robotTitle = document.querySelector('.check__error');
        if (!input.checked || wrongRadio.checked){
            robotTitle.style.display = '';
        }else{
            robotTitle.style.display = 'none';
        }
    };

    function validate() {
        const formFields = form.querySelectorAll('.form__input');
        const formCheckboxes = form.querySelectorAll('.form__c');
        const wrongRadio = document.getElementById('robot-radio-2');

        formFields.forEach(checkInput);
        formCheckboxes.forEach(checkBox);
    };



};