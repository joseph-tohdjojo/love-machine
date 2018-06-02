const path = require('path')
const os = require('os')
const { execPromise, symlink, updateOrInstallHomebrew } = require('../utils')

const HOMEDIR = os.homedir()
const arr = [1,2,3]

module.exports = () =>
  updateOrInstallHomebrew()
    .then(() => _installVim())
    .then(() => _deleteVimFolder())
    .then(() => _deleteVimFiles())
    .then(() => _installVimPlug())
    .then(() => _symlinkVimrc())
    .then(() => _symlinkVimrcBundles())
    .then(() => _symlinkVimrcBundlesLocal())
    .then(() => _installVimPlugins())
    .then(() => _symlinkVimrcLocal())
    .then(() => _sourceVimrc())

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
    command: `rm -rf ${HOMEDIR}/.vim/`,
    startMessage: 'Attempting to delete .vim folder',
    successMessage: 'Successfully deleted .vim folder!!!',
    failureMessage: 'Unable to delete .vim folder',
  })
}

function _deleteVimFiles() {
  return execPromise({
    command: `rm -f ${HOMEDIR}/.vimrc ${HOMEDIR}/.vimrc.local`,
    startMessage: 'Attempting to delete vim files',
    successMessage: 'Successfully deleted vim files!!!',
    failureMessage: 'Unable to delete vim files',
  })
}

function _installVimPlug() {
  return execPromise({
    command:
      'curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim',
    startMessage: 'Attempting to install Vim-Plug',
    successMessage: 'Successfully installed Vim-Plug!!!',
    failureMessage: 'Unable to install Vim-Plug',
  })
}

function _symlinkVimrc() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'vim', 'vimrc'),
    `${HOMEDIR}/.vimrc`,
  )
}

function _symlinkVimrcBundles() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'vim', 'vimrc.bundles'),
    `${HOMEDIR}/.vimrc.bundles`,
  )
}

function _symlinkVimrcBundlesLocal() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'vim', 'vimrc.bundles.local'),
    `${HOMEDIR}/.vimrc.bundles.local`,
  )
}

function _installVimPlugins() {
  return execPromise({
    command: `vim -c "source $MYVIMRC" -c "PlugInstall" -c "qa!"`,
    startMessage: 'Attempting to install Vim plugins',
    successMessage: 'Successfully installed Vim plugins!!!',
    failureMessage: 'Unable to install Vim plugins',
  })
}

function _symlinkVimrcLocal() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'vim', 'vimrc.local'),
    `${HOMEDIR}/.vimrc.local`,
  )
}

function _sourceVimrc() {
  return execPromise({
    command: `vim -c "source $MYVIMRC" -c "qa!"`,
    startMessage: 'Attempting to source .vimrc',
    successMessage: 'Successfully sourced .vimrc!!!',
    failureMessage: 'Unable to source .vimrc',
  })
}
