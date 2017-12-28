'use strict'

module.exports = function() {
    let humburger = document.querySelector('.humburger');

    function toggle() {
        humburger.classList.toggle('is-active');
    }

    if (humburger) {
        humburger.addEventListener('click', function () {
            toggle(); 
        });    
    }
}

