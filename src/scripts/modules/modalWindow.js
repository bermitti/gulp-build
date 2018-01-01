'use strict'

module.exports = function () {
    let button = document.querySelector('.hero__humburger');
    let textList = document.querySelector('.modal-window');

    function modalToogle(e) {
        e.preventDefault();
        textList.classList.toggle('modal-window_active')

        //запретить прокрутку страницы
        let modalWindowActive = document.querySelector('.modal-window_active');
        if (modalWindowActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    if (button && textList) {
        button.addEventListener('click', function (e) {
            modalToogle(e); 
         });
    }
}

