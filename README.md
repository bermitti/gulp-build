данный проект сделан в рамках обучения в Loftschool 8.12.2017

cборка Gulp 

Старт
1. Устанавливаем node.js,  npm i gulp-cli -g   глобально и gulp  локально npm install -D gulp

2. Клонировать репозиторий
      clone this repo

3. Устанавливаем npm-пакеты.
      npm i

4. Начинаем кодить!
      gulp 


  команды для работы со сборкой
gulp templates         шаблонизатор html
gulp styles            шаблонизатор sass + добавляет normalize
gulp images            минификация изображений
gulp svgSpriteBuild    работа с svg и создание спрайта
gulp svgSprite         перенос спрайта svg в build
gulp fonts       перенос шрифтов в build.  для генерации используем отдельно https://www.fontsquirrel.com/
gulp scripts           работа с файлами-js.  Вызывает webpack
gulp clean             очистка дирректории build

 

