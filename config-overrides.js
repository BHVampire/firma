const { alias } = require('react-app-rewire-alias')
const { useBabelRc, override } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  alias({ '@sass': 'src/styles/sass' })
)