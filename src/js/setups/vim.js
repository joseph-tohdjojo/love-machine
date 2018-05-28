const path = require('path')
const os = require('os')
const { symlink } = require('../utils')

module.exports = () => symlink(
  path.resolve(__dirname, '..', '..', 'dotfiles', 'vim', 'vimrc'),
  `${os.homedir()}/.vimrc`
)
