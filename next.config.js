const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withSass(
  withCSS(
    withImages({
      env: {
        GOOGLE_CLIENT_ID:
          '835627805452-tjq6u0ed9mk5aigjmvff5o620tkm9nhs.apps.googleusercontent.com',
        FACEBOOK_CLIENT_ID: 1263976573763379,
        API_PRODUCTION: 'https://fashe-backend.herokuapp.com',
        API_DEVELOPMENT: 'http://localhost:3333,'
      },
      webpack(config, options) {
        config.resolve.modules.push(__dirname);
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        });

        return config;
      }
    })
  )
);
