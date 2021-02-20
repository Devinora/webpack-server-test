/* Модуль path предоставляет утилиты для работы с путями к файлам и каталогам.
Источник: https://nodejs.org/api/path.html */
const path = require('path');

const projectRootPath = path.resolve(__dirname, '../..');

const paths = {
  context: path.join(projectRootPath, 'src'),
  entry: './js/pages/',
  output: path.join(projectRootPath, 'dist'),
  outputJs: './js/',
};

module.exports = paths;
