'use strict'

module.exports = function () {
    //-анонимная функция сразу с выполнением ()
    var parallax = (function () {
        //-определяем переменные с которыми будем работать
        var user = document.querySelector('.hero__bg');
        var user = document.querySelector('.hero__user-block');
        var sectionText = document.querySelector('.hero__section-img');

        //-возвращаем объект с публичными методами
        return {
            move: function (block, windowScroll, strafeAmount) { //-блок с которым работаем, значение скролла, коэфициент
                var strafe = windowScroll / -strafeAmount +'%'; //-отрицательное значение т.к. блок движется в другую сторону. '%' - для св-в css
                var transformString = 'translate3d(0,' + strafe + ',0)'; //-создали св-во для переноса вычислений на видеокарту
    
                var style = block.style;
                //-style.top = strafe; //-блок-элемент.стиль.top = значение%;
                style.transform = transformString;
                
            },
            init: function (wScroll) {
                this.move(bg, wScroll, 45);
                this.move(sectionText, wScroll, 20);
                this.move(user, wScroll, 3);
            }
        }

    }());
        

    window.onscroll = function () {
        var wScroll = window.pageYOffset; //-на сколько проскролили
        parallax.init(wScroll); //-по скроллу вызовим parallax.init(wScroll)
        console.log(wScroll);
    }

}

//-как подсветить свойства transform , top , style ?