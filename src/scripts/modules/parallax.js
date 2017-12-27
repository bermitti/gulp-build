'use strict'

module.exports = function () {
    //-отслеживаемый блок элементов
    const parallaxContainer = document.querySelector('.parallaxLs');
    //-коллекция блоков с картинками
    // const layers = parallaxContainer.children;
    // console.log(layers);

    const moveLayers = function (e) {
        // //-отсчёт от левого верхнего угла pageX  pageY
        // let initialX = -e.pageX;
        // let initialY = -e.pageY;
        // console.log(initialX, initialY);
        // //-возвращает ширину элемента innerWidth innerHeight
        // console.log(window.innerWidth);

        //-вычисляем смещение мыши относительно центра окна
        const initialX = (window.innerWidth / 2) - e.pageX;
        const initialY = (window.innerHeight / 2) - e.pageY;
        // console.log(initialX, initialY)
        const layers = parallaxContainer.children;
        // //-тест двигаем слой мышкой
        // layers[9].style.transform = `translate(${initialX}px, ${initialY}px)`;

        [].slice.call(layers).forEach(function (layer, index) {
            const
                //-divider коэффициент замедления перемещения слоя
                divider = index / 100,
                //-смещение слоя относительно центра с привязкой к мышке
                positionX = initialX * divider,
                positionY = initialY * divider,
                //-значение относительно нижнего края
                bottomPosition = (window.innerHeight / 2) * divider,
                //-
                transformString = 'translate(' + positionX + 'px,' + positionY + 'px)',
                //-находим картинку в блоке
                image = layer.firstElementChild;
    
            layer.style.transform = transformString;
            image.style.bottom = `-${bottomPosition}px`;
        });
    
    };


    //-если отслеживаемый элемент есть, по событию 'mousemove' запустим функцию moveLayers
    if (parallaxContainer) {
        parallaxContainer.addEventListener('mousemove', moveLayers);  
    }

}



