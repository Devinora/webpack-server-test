// Источник: https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Объект с путями.
const paths = require('./modules/paths');
// Объект со списком HTML файлов для HtmlWebpackPlugin.
const filenames = require('./modules/filenames');
// Временная переменная, которая определяет режим сборки.
const { NODE_ENV } = process.env;

console.log(process.env.NODE_ENV);

module.exports = (env, argv) => {
  const config = {
    // target: 'web',
    // Базовый каталог, абсолютный путь, для разрешения точек входа и загрузчиков из конфигурации.
    context: paths.context,
    entry: () => {
      // Объект в котором будут сгенерированы точки входа.
      const entryPoints = {};
      // Цикл для автоматической генерации точек входа.
      filenames.js.names.forEach((element) => {
        // Расширение файла
        const { expansion } = filenames.js;
        // Присваивание имени файла
        entryPoints[element] = `${paths.entry}${element}${expansion}`;
      });
      return entryPoints;
    },
    output: {
      // Старая версия
      path: paths.output,
      // publicPath: '/assest/',
      // eslint-disable-next-line no-unused-vars
      filename: (pathData) => {
        if (NODE_ENV === 'production') {
          return `${paths.outputJs}[name]~[chunkhash:8].js`;
        }
        return `${paths.outputJs}[name].js`;
      },
      // Старая Версия
      // libraryTarget: 'umd',
      // library: '[name]',
    },
    plugins: [
      // Динамическое создание файлов HTML
      ...filenames.html.names.map((page) => {
        // Расширение файла
        const { expansion } = filenames.html;
        return new HtmlWebpackPlugin({
          filename: `./${page}${expansion}`,
          template: `${paths.context}/${page}${expansion}`,
          // Отвечает за подключение JS файлов
          chunks: [page],
        });
      }),
    ],
  };

  console.log(config.plugins[0].userOptions.chunks);

  return config;
};
