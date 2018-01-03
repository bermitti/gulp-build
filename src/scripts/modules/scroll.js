

    var avatarElem = document.getElementById('avatar');

    var avatarSourceBottom = avatarElem.getBoundingClientRect().bottom + window.pageYOffset;

    window.onscroll = function() {
      if (avatarElem.classList.contains('fixed') && window.pageYOffset < avatarSourceBottom) {
        avatarElem.classList.remove('fixed');
      } else if (window.pageYOffset > avatarSourceBottom) {
        avatarElem.classList.add('fixed');
      }
    };

    .fixed {
        position: fixed;
        top: 0;
        left: 0;
      }
      http://plnkr.co/edit/E6NWXzlKk0TEGK5VFKfy?p=preview
    //Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно окна.

    https://learn.javascript.ru/coordinates
    http://shpargalkablog.ru/2013/09/scroll-block.html


