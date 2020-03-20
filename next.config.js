const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withSass(
  withCSS({
    env: {
      GOOGLE_CLIENT_ID: '835627805452-tjq6u0ed9mk5aigjmvff5o620tkm9nhs.apps.googleusercontent.com',
      FACEBOOK_CLIENT_ID: 1263976573763379,
      API_PRODUCTION: 'https://fashe-next-backend.herokuapp.com',
      API_DEVELOPMENT: 'https://fashe-next-backend.herokuapp.com'
    },
    webpack(config, options) {
      config.resolve.modules.push(__dirname);
      config.module.rules.push({
        test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader'
      });

      return config;
    }
  })
);
