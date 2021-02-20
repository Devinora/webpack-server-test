module.exports = (env, argv) => {
  const config = {
    mode: 'development',
    // devtool: 'eval-source-map',
    optimization: {
      minimize: false,
    },
    devServer: {
      open: true,
      port: '3000',
      hot: true,
    },
  };

  // console.log(config);
  return config;
};
