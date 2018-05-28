const path = require('path')
const os = require('os')
const { execPromise, symlink } = require('../utils')

const HOMEDIR = os.homedir()

module.exports = () => {
  return execPromise('brew install vim --with-override-system-vi', 'Install latest Vim', false)
    .then(({err}) => {
      if(err) {
        return execPromise('brew upgrade vim', 'Upgrade Vim')
      } else {
        Promise.resolve()
      }
    })
    .then(() => execPromise(`rm -rf ${HOMEDIR}/.vim`, 'Empty .vim folder'))
    .then(() => execPromise('curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim', 'Install Vim-Plug'))
    .then(() =>
      symlink(
        path.resolve(__dirname, '..', '..', 'dotfiles', 'vim', 'vimrc'),
        `${HOMEDIR}/.vimrc`
      )
    )
    .then(() => execPromise(`cd ${HOMEDIR}/.vim/plugged/YouCompleteMe; vim -c "PlugInstall" -c "qa!"`, 'Install Vim plugins'))
}
