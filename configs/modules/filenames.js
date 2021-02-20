const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// const sourcePath = path.resolve(__dirname, '../../src');
// const filesInfo = {
//   names: [],
//   expansion: fileExtension,
// };

// function fileFilter(fileExtension) {
//   const filesInfo = {
//     names: [],
//     expansion: fileExtension,
//   };
// let files = fs.readdirSync(sourcePath);
// files = files.filter((filename) => filename.endsWith(fileExtension));

// filesInfo.names = files.map((name) => {
//   const index = name.lastIndexOf(fileExtension);
//   return name.slice(0, index);
// });

//   return filesInfo;
// }

function fileFilter(options) {
  if (!Array.isArray(options)) return null;

  const filesOptions = {};

  // for (const elem of options) {
  //   filesOptions[elem.fileExtension.slice(1)] = elem.fileExtension;
  // }
  options.forEach((element) => {
    // Расширение файлов
    const { fileExtension } = element;
    // Имя(расширение файла) для объекта с набором параметров.
    const extensionName = fileExtension.slice(1);
    // Создание объекта для файлов с определенным расширением.
    filesOptions[extensionName] = {};
    filesOptions[extensionName].expansion = fileExtension;

    let files = fs.readdirSync(element.source);
    files = files.filter((filename) => filename.endsWith(fileExtension));

    filesOptions[extensionName].names = files.map((name) => {
      const index = name.lastIndexOf(fileExtension);
      return name.slice(0, index);
    });
    // filesOptions[extensionName].names = filesOptions[extensionName].names.sort();
  });
  return filesOptions;
}

module.exports = fileFilter([
  {
    source: path.join(paths.context, paths.entry),
    fileExtension: '.js',
  },
  {
    source: paths.context,
    fileExtension: '.html',
  },
]);