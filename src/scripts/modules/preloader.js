'use strict'
//-    Логика
//- 1 создали коллекцию загружаемых картинок
//- 2 цикл проверки загруженны ли каждая картинка из коллекции
//- 3 увеличение длинны окружности каждого спинера
//- 4 увеличение изменение текста - числа в процентах
//- 5 возврат к пункту 2


module.exports = function () {

    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.loaded');
    const images = document.images;      //коллекция картинок
    const imagesCount = images.length;   //длинна коллекции картинок
    let imagesLoaded = 0; 

     const procentCount = function () {
        let percent;

        imagesLoaded++;
        percent = Math.round((100 / imagesCount) * imagesLoaded);
        preloaderText.innerHTML = percent + '%';
        console.log('in procentCount()' + percent + '%'); //служебная функция

        if (percent == 100) {
            preloader.style.display = 'none';
            }
        };
    
    //forEach под капотом использует this, для обращения к массиву в контексте которого он вызван. Через call мы подменяем массив на коллекцию и forEach обращается к ней
    //вторым элементом в call передаем функцию которую должен вызвать forEach
    [].forEach.call(images, function (item) {
        item.addEventListener("onload", procentCount());
    });


    // const circleAnimate = function () {
    //     //анимировать рост линий кругов
    // }

}


