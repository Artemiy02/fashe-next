const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const path = require('path');

module.exports = withSass(
  withCSS(
    withImages({
      env: {
        GOOGLE_CLIENT_ID:
          '835627805452-tjq6u0ed9mk5aigjmvff5o620tkm9nhs.apps.googleusercontent.com',
        FACEBOOK_CLIENT_ID: 1263976573763379,
        API_PRODUCTION: 'https://fashe-backend.herokuapp.com',
        API_DEVELOPMENT: 'http://localhost:3333'
      },
      webpack(config, options) {
        config.resolve.modules.push(__dirname);
        config.resolve.alias['components'] = path.join(__dirname, 'components');
        config.resolve.alias['styles'] = path.join(__dirname, 'styles');
        config.resolve.alias['services'] = path.join(__dirname, 'services');
        config.resolve.alias['utils'] = path.join(__dirname, 'utils');
        config.resolve.alias['actions'] = path.join(__dirname, 'actions');
        config.resolve.alias['reducers'] = path.join(__dirname, 'reducers');
        config.resolve.alias['selectors'] = path.join(__dirname, 'selectors');
        config.resolve.alias['types'] = path.join(__dirname, 'types');
        return config;
      }
    })
  )
);
