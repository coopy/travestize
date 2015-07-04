var _ = require('lodash');

var config = {
  httpPort: 5000,
  mongoDbPort: 27017
};

var prodConfig = {
  httpPort: 16925,
  mongoDbPort: 14850
};

if (process.env === 'production') {
  _.merge(config, prodConfig);
}

module.exports = config;
