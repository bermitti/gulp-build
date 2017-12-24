'use strict'

module.exports = function() {
    let btn = document.querySelector('.btn-login');
    let rotate = document.querySelector('.flipper');
    let back = document.querySelector('.nav__link_welcome-back');

    function flipperRotate() {
        btn.classList.add('btn-login_hidden');
        rotate.classList.add('flipper_rotateY');
    }

    function welcomeBack(e) {
        e.preventDefault();
        btn.classList.remove('btn-login_hidden');
        rotate.classList.remove('flipper_rotateY');
    }
    if(btn) {
        btn.addEventListener('click', function() {
            flipperRotate();
        });
    }
    
    if (back) {
        back.addEventListener('click', function(e) {
            welcomeBack(e);
        });
    }
    
}

