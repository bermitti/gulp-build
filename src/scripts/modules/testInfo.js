//==========модульность и инкапсуляция========//
let blur = (function name(params) {
    //инкапсуляция
    let name = 'blur';
    let setFunction = function () {
                let newName = name + ' hello!';
                
                console.log('name');
                console.log('newName');
            };

    return {
        get: name,
        set: setFunction
    }
})();

///console///
//console.log(blur.get);  => получим name blur
//console.log(blur);      => выведет объект

//==========модульность и инкапсуляция========//
let scrollMenu = (function() {
    //..code в самовызывающейся функции

    return {
        init: addListener
    };
})();

console.log(scrollMenu);
scrollMenu.init();


//==========скролл========//


