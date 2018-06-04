const os = require('os')
const path = require('path')
const { execPromise, symlink, updateOrInstallHomebrew } = require('../utils')

const HOMEDIR = os.homedir()

module.exports = () => Promise.resolve()
    .then(() => updateOrInstallHomebrew())
    .then(() => _installTmux())
    .then(() => _deleteTmuxFolder())
    .then(() => _installOhMyTmux())
    .then(() => _symlinkTmuxConfig())
    .then(() => _symlinkTmuxLocalConfig())
    .then(() => _symlinkTmuxDevLayout())

function _installTmux() {
  return execPromise({
    command: 'brew install tmux',
    startMessage: 'Attempting to install Tmux',
    successMessage: 'Successfully installed Tmux!!!',
    failureMessage: 'Unable to  install Tmux',
    shouldNotHandleError: true,
  }).then(({ err }) => {
    if (err) {
      return execPromise({
        command: 'brew upgrade tmux',
        startMessage: 'Attempting to upgrade Tmux',
        successMessage: 'Successfully upgraded Tmux!!!',
        failureMessage: 'Unable to upgrade Tmux',
      })
    } else {
      Promise.resolve()
    }
  })
}

function _deleteTmuxFolder() {
  return execPromise({
    command: `rm -rf ${HOMEDIR}/.tmux`,
    startMessage: 'Attempting to delete .tmux folder',
    successMessage: 'Successfully deleted .tmux folder!!!',
    failureMessage: 'Unable to delete .tmux folder',
  })
}

function _installOhMyTmux() {
  return execPromise({
    command: `git clone https://github.com/gpakosz/.tmux.git ~/.tmux`,
    startMessage: 'Attempting to install Oh My Tmux',
    successMessage: 'Successfully installed Oh My Tmux!!!',
    failureMessage: 'Unable to install Oh My Tmux',
  })
}

function _symlinkTmuxConfig() {
  return symlink(
    path.resolve(HOMEDIR, '.tmux', '.tmux.conf'),
    `${HOMEDIR}/.tmux.conf`,
  )
}

function _symlinkTmuxLocalConfig() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'tmux', 'tmux.conf.local'),
    `${HOMEDIR}/.tmux.conf.local`,
  )
}

function _symlinkTmuxDevLayout() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'tmux', 'tmux.layout.dev'),
    `${HOMEDIR}/.tmux/tmux.layout.dev`,
  )
}
