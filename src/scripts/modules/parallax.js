'use strict'

module.exports = function () {
    const parallaxContainer = document.querySelector('.parallaxLs');

    // const layers = parallaxContainer.children;
    // console.log(layers);

    const moveLayers = function (e) {
        const initialX = (window.innerWidth / 2) - e.pageX;
        const initialY = (window.innerHeight / 2) - e.pageY;
        const layers = parallaxContainer.children;

        [].slice.call(layers).forEach(function (layer, index) {
            const
                divider = index / 100,
                positionX = initialX * divider,
                positionY = initialY * divider,

                bottomPosition = (window.innerHeight / 2) * divider,
                transformString = 'translate(' + positionX + 'px,' + positionY + 'px)',
                image = layer.firstElementChild;
    
            layer.style.transform = transformString;
            image.style.bottom = `-${bottomPosition}px`;
        });
    
    };

    if (parallaxContainer) {
        parallaxContainer.addEventListener('mousemove', moveLayers);  
    }

}



