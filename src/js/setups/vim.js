const path = require('path')
const os = require('os')
const { execPromise, symlink } = require('../utils')

const HOMEDIR = os.homedir()

module.exports = () =>
  _installVim()
    .then(() => _deleteVimFolder())
    .then(() => _installVimPlug())
    .then(() => _symlinkVimrc())
    .then(() => _installVimPlugins())

function _installVim() {
  return execPromise({
    command: 'brew install vim --with-override-system-vi',
    startMessage: 'Attempting to install Vim',
    successMessage: 'Successfully installed Vim!!!',
    failureMessage: 'Unable to  install Vim',
    shouldNotHandleError: true,
  }).then(({ err }) => {
    if (err) {
      return execPromise({
        command: 'brew upgrade vim',
        startMessage: 'Attempting to upgrade Vim',
        successMessage: 'Successfully upgraded Vim!!!',
        failureMessage: 'Unable to upgrade Vim',
      })
    } else {
      Promise.resolve()
    }
  })
}

function _deleteVimFolder() {
  return execPromise({
    command: `rm -rf ${HOMEDIR}/.vim`,
    startMessage: 'Attempting to delete .vim folder',
    successMessage: 'Successfully deleted .vim folder!!!',
    failureMessage: 'Unable to delete .vim folder',
  })
}

function _installVimPlug() {
  return execPromise({
    command:
      'curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim',
    startMessage: 'Attempting to install Vim-Plug',
    successMessage: 'Successfully installed Vim-Plug!!!',
    failureMessage: 'Unable to install Vim-Plug',
  })
}

function _symlinkVimrc() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'vim', '.vimrc'),
    `${HOMEDIR}/.vimrc`,
  )
}

function _installVimPlugins() {
  return execPromise({
    command: `cd ${HOMEDIR}/.vim/plugged/YouCompleteMe; vim -c "PlugInstall" -c "qa!"`,
    startMessage: 'Attempting to install Vim plugins',
    successMessage: 'Successfully installed Vim plugins!!!',
    failureMessage: 'Unable to install Vim plugins',
  })
}
