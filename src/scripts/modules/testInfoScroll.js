
const scrollMenu = (function () {
    const navList = document.querySelector('.blog-nav__list');  //$('.menu'); Ul оглавления навигации
    const navItem = document.querySelector('.blog-nav__item');  //$('.menu__item'); Li оглавления навигации
    const article = document.querySelectorAll('.article');  //$('.news'); li cтатей или querySelectorAll
    //const blogNav = document.querySelector('.blog-nav');  //const $wrapMenu = $('.wrap-menu'); блок навигации слева для fixed
    let positionArticle = [];
    let offsetHeight = 0; // смещение реагирования на сменю меню

    const addListener = function () {
        navList.addEventListener('click', _clickMenu);    
        document.addEventListener('onscroll', _scrollPage); 
        // document.addEventListener('onscroll', _scrollPageFixMenu);

        _setPositionArticle(article);
        // $(window).on('onload', function(e) {
        //     _setPositionArticle(article);
        // });
      
        // $(window).on('resize', function(e) {
        //     _setPositionArticle(article);
        // });
    }


    const _setPositionArticle = function(element) {
        const len = element.length;
        element.each(function(item) {
            positionArticle[item] = {};
            positionArticle[item].top = this.getBoundingClientRect().top - offsetHeight;
            positionArticle[item].bottom = this.getBoundingClientRect().bottom - offsetHeight;
        });
        // console.log(positionArticle);
    };

    _scrollPage = function(e) {
        let scroll = window.pageYOffset; //property returns the number of pixels the document is currently scrolled
        positionArticle.forEach( (element, index) => {
            if (
                scroll >= element.top &&
                scroll <= element.bottom
            ) {
                navItem[index].addClass('blog-nav__item_active')
                navItem[index].siblings().removeClass('blog-nav__item_active');
            }
        });
    };


    // _scrollPageFixMenu = function(e) {
    //     let scroll = window.pageYOffset;
    //     if (scroll < $news.offset().top) {
    //       $wrapMenu.removeClass('fixed');
    //     } else {
    //       $wrapMenu.addClass('fixed');
    //     }
    //   };

    return {
        init: addListener
    }
})();

console.log(scrollMenu);
scrollMenu.init();



//===анимация появляющихся букв===//
$.fn.animate_Text = function() {
    var string = this.text();
    return this.each(function(){
        var $this = $(this);
        $this.html(string.replace(/./g, '<span class="new">$&</span>'));
        $this.find('span.new').each(function(i, el){
            setTimeout(function(){ $(el).addClass('div_opacity'); }, 20 * i);
        });
    });
};

$('#example').show();         //элемент с текстом
$('#example').animate_Text(); //элемент с текстом