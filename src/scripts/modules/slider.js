'use strict'

module.exports = function () {

    if(document.querySelector('.slider')) {
    
        const slider = document.querySelector('.slider'); //не document чтобы не было путаницы
        const projectList = slider.querySelectorAll('.project__item'); //страницы описания пректов
        const sliderLength = projectList.length; //количество страницы описания пректов
        const imageList = slider.querySelectorAll('.image-slide__item'); //картинки для проектов
        const controls = document.querySelectorAll('.controls'); //коллекция блоков контроллов
        const controlPrev = slider.querySelector('.controls__prev'); //блок контролов назад
        const controlPrevList = controlPrev.querySelectorAll('.controls__bg-item'); //коллекция картинок в блоке controlPrev
        const controlNext = slider.querySelector('.controls__next'); //блок контролов вперёд 
        const controlNextList = controlNext.querySelectorAll('.controls__bg-item'); //коллекция картинок в блоке controlNext
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

        const moveItems = function (index) {
            let direction = defineDirection(index);
            removeActive(projectList);
            removeActive(imageList);
            makeActive(projectList, index);
            makeActive(imageList, index);

            removeActive(controlPrevList);
            makeActive(controlPrevList, direction.prev);
            removeActive(controlNextList);
            makeActive(controlNextList, direction.next);
            
            // controlPrev.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.prev)+'%)';
            // controlNext.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.next)+'%)';
        };

        //-по событию window.onload вызваем function 
        [].forEach.call(controls, function(item) {
            window.onload = function () {
                moveItems(currentIndex);
            };
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const button = e.currentTarget;
                console.log('e.currentTarget ' + button.tagName);
                let currentActive;
                projectList.forEach((item, index) => {
                    if(item.classList.contains('active')) {currentActive = index;}
                });
                let direction = defineDirection(currentActive);
                 if(button.classList.contains('controls__prev')){
                    moveItems(direction.prev);
                } else {
                    moveItems(direction.next);
                }
            });
        });

    };
};


// var directions = {
//     next: function () {
//       // закольцовывание слайдера
//       if (_that.counter < itemsLength - 1) {
//         _that.counter++;
//       } else {
//         _that.counter = 0;
//       }
//     },

//     prev: function () {
//       if (_that.counter > 0) {
//         _that.counter--;
//       } else {
//         _that.counter = itemsLength - 1;
//       }
//     }
//   };