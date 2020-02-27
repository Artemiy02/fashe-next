const withImages = require('next-images');
const withSass = require('@zeit/next-sass');

module.exports = withSass(
  withImages({
    webpack(config, options) {
      config.resolve.modules.push(__dirname);
      config.module.rules.push({
        test: /\.css$/,
        loader: ['css-loader', 'sass-loader']
      });

      return config;
    }
  })
);
