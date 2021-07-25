const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@sass': 'src/styles/sass'
  })(config)

  return config
}