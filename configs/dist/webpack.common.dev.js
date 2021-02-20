"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Источник: https://github.com/jantimon/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin'); // Объект с путями.


var paths = require('./modules/paths'); // Объект со списком HTML файлов для HtmlWebpackPlugin.


var filenames = require('./modules/filenames'); // Временная переменная, которая определяет режим сборки.


var NODE_ENV = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);

module.exports = function (env, argv) {
  var config = {
    // target: 'web',
    // Базовый каталог, абсолютный путь, для разрешения точек входа и загрузчиков из конфигурации.
    context: paths.context,
    entry: function entry() {
      // Объект в котором будут сгенерированы точки входа.
      var entryPoints = {}; // Цикл для автоматической генерации точек входа.

      filenames.js.names.forEach(function (element) {
        // Расширение файла
        var expansion = filenames.js.expansion; // Присваивание имени файла

        entryPoints[element] = "".concat(paths.entry).concat(element).concat(expansion);
      });
      return entryPoints;
    },
    output: {
      // Старая версия
      path: paths.output,
      // publicPath: '/assest/',
      // eslint-disable-next-line no-unused-vars
      filename: function filename(pathData) {
        if (NODE_ENV === 'production') {
          return "".concat(paths.outputJs, "[name]~[chunkhash:8].js");
        }

        return "".concat(paths.outputJs, "[name].js");
      } // Старая Версия
      // libraryTarget: 'umd',
      // library: '[name]',

    },
    plugins: _toConsumableArray(filenames.html.names.map(function (page) {
      // Расширение файла
      var expansion = filenames.html.expansion;
      return new HtmlWebpackPlugin({
        filename: "./".concat(page).concat(expansion),
        template: "".concat(paths.context, "/").concat(page).concat(expansion),
        // Отвечает за подключение JS файлов
        chunks: [page]
      });
    }))
  };
  console.log(config.plugins[0].userOptions.chunks);
  return config;
};