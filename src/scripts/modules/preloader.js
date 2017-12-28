'use strict'
//-    Логика
//- 1 создали коллекцию загружаемых картинок
//- 2 цикл проверки загруженны ли каждая картинка из коллекции
//- 3 увеличение длинны окружности каждого спинера
//- 4 увеличение изменение текста - числа в процентах
//- 5 возврат к пункту 2


module.exports = function () {
    // const ready = function () {
    //     const preloader = document.querySelector('.preloader');
    //     preloader.style.display = 'none';
    // }
    // const circleAnimate = function () {
    //     //анимировать рост линий кругов
    // }
    // const procentCount = function () {
    //     //изменение числа процентов
    // }
    // document.addEventListener("onload", ready());

    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.loaded');
    const images = document.images;      //коллекция картинок
    const imagesCount = images.length;   //длинна коллекции картинок
    let imagesLoaded = 0; 

    let percent = Math.round((100 / imagesCount) * imagesLoaded);
    preloaderText.innerHTML = percent + '%';

    const procentCount = function () {
        percent = Math.round((100 / imagesCount) * imagesLoaded);
        preloaderText.innerHTML = percent + '%';
        }
    
    images.forEach(function(item, i, arr) {
        item.addEventListener("onload", procentCount());
    });

}


