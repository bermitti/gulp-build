'use strict'

module.exports = function () {
    let button = document.querySelector('.hero__humburger');
    let textList = document.querySelector('.modal-window');

    function modalToogle(e) {
        e.preventDefault();
        textList.classList.toggle('modal-window_active')
    }

    if (button && textList) {
        button.addEventListener('click', function (e) {
            modalToogle(e); 
         });
    }
}