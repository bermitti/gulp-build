'use strict'

module.exports = function () {
    
    const slider = document.querySelector('.slider'); //не document чтобы не было путаницы
    const projectList = slider.querySelectorAll('.project__item'); //страницы описания пректов
    const sliderLength = projectList.length; //количество страницы описания пректов
    const imageList = slider.querySelectorAll('.image-slide__item'); //картинки для проектов
    const controls = document.querySelectorAll('.controls'); //коллекция блоков контроллов
    const controlPrev = slider.querySelector('.controls__prev'); //контрол вперёд
    const controlNext = slider.querySelector('.controls__next'); //контрол назад
    let currentIndex = 0; //начало цикла
    const last = sliderLength - 1;  //конец цикла

    //-удаляем класс .active
    const removeActive = function (params) {
        [].forEach.call(params, (item) => {
            item.classList.remove('active');
        });
    };
    // //-начальному элементу определяем класс .active
    const makeActive = function (array, index) {
        array[index].classList.add('active');
    };

    //-const defineDirection = function(index) {
    const defineDirection = (index) => {
        let next = index + 1;
        let prev = index - 1;
        if (next > last) next = 0;
        if (prev === -1) prev = last;
        return{
            next: next,
            prev: prev,
        };
    };

    //? какая разница объявить функцию или определить как константу
    const moveItems = function (index) {
        let direction = defineDirection(index);
        removeActive(projectList);
        removeActive(imageList);
        makeActive(projectList, index);
        makeActive(imageList, index);
        controlPrev.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.prev)+'%)';
        controlNext.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.next)+'%)';
    };

    //-? есть ли разница window.onload или document.onload
    //-? событию window.onload вызвать function 
    [].forEach.call(controls, function(item) {
        window.onload = function () {
            moveItems(currentIndex);
        };
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const button = e.currentTarget;
            //-? как в консоли увидеть какой именно элемент? currentTarget / target
            //-learn.javascript.ru/event-bubbling#%D1%86%D0%B5%D0%BB%D0%B5%D0%B2%D0%BE%D0%B9-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82-event-target
            console.log('e.currentTarget ' + button);
            let currentActive;
            projectList.forEach((item, index) => {
                if(item.classList.contains('active')) {currentActive = index;}
            });
            let direction = defineDirection(currentActive);
            //-как снять выделение с картинки контроллов?
            if(button.classList.contains('controls__prev')){
                moveItems(direction.prev);
            } else {
                moveItems(direction.next);
            }
        });
    });




    




//     let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

// function showSlides(n) {
//     let i;
//     let slides = document.querySelectors('класс картинок'); //коллекция слайдов
//     let controls = document.querySelectors('класс блока конролов'); //коллекция контролов

//     if (n > slides.length) {
//         slideIndex = 1;
//     } 
//     if (n < 1) {
//         slideIndex = slides.length;
//     }
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = 'none';
//     }
//     for (let i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace('active', '');
//     }
//     slides[slideIndex-1].style.display = 'block';
//     dots[slideIndex-1].className+= 'active';
// }
    //-можно удалять
    //-нужна ли проверка? тут надо проверять наличие всех используемых классов
    const sliderInit = () => {
        if(document.querySelector('.slider'))
            slider();
    };

}