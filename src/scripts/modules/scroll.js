
module.exports = function () {

    if (document.querySelector('.blog-nav')) {

      let blogNav = document.querySelector('.blog-nav');
      let blogNavTop = blogNav.getBoundingClientRect().top + window.pageYOffset;

      window.onscroll = function() {

        if (blogNav.classList.contains('fixed') && window.pageYOffset < blogNavTop) {
          blogNav.classList.remove('fixed');
        } else if (window.pageYOffset > blogNavTop) {
          blogNav.classList.add('fixed');
        }
      };


      // elem.scrollIntoView(top) – прокрутить, чтобы элемент elem стал виден.
      // Метод window.scrollTo(pageX,pageY) прокручивает страницу к указанным координатам относительно документа
      // Событие mouseover происходит, когда мышь появляется над элементом
    }
  
}

