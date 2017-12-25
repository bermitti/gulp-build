// 'use strict'

// // let welcome = require ('./menu');  //подключаем модуль menu

// // menu('index');

//-флиппер на странице авторизации
const flipper = require('./modules/flipperRotate'); //подключаем модуль flipperRotate
const humburgerButton = require('./modules/humburgerButton');  //подключаем модуль flipperRotate
const modalWindow = require('./modules/modalWindow');
const paralax = require('./modules/parallax');

//-вызов функций
flipper();
humburgerButton();
modalWindow();
//test     //parallax();