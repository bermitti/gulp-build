'use strict'

module.exports = function() {
    
    let btn = document.querySelector('btn-login');

    console.log(btn);

    function flipperRotate(e) {
        alert('hello!');
    }

    btn.addEventListener('click', function(e) {
        flipperRotate(e);
    });


}

