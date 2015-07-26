var _ = require('lodash');

var config = {
  server: {
    port: 5000
  },
  mongo: {
    db: 'travestize',
    port: 27017,
    user: 'travestize',
    pwd: 'abc123',
  }
};

var prodConfig = {
  server: {
    port: 16925
  },
  mongo: {
    port: 14850,
    user: process.env.MONGO_TRAVESTIZE_USER,
    pwd: process.env.MONGO_TRAVESTIZE_PWD,
  }
};

if (process.env.NODE_ENV === 'production') {
  _.merge(config, prodConfig);
}

module.exports = config;
