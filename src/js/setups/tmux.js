const os = require('os')
const path = require('path')
const { execPromise, symlink, updateOrInstallHomebrew } = require('../utils')

const HOMEDIR = os.homedir()

module.exports = () =>
  updateOrInstallHomebrew()
    .then(() => _installTmux())
    .then(() => _deleteTmuxFolder())
    .then(() => _installTPM())
    .then(() => _symlinkTmuxConfig())
    .then(() => _installTPMPlugins())

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

function _installTPM() {
  return execPromise({
    command: `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`,
    startMessage: 'Attempting to install TPM',
    successMessage: 'Successfully installed TPM!!!',
    failureMessage: 'Unable to install TPM',
  })
}

function _symlinkTmuxConfig() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'tmux', '.tmux.conf'),
    `${HOMEDIR}/.tmux.conf`
  )
}

function _installTPMPlugins() {
  return execPromise({
    command: `${HOMEDIR}/.tmux/plugins/tpm/bin/install_plugins`,
    startMessage: 'Attempting to install Tmux plugins',
    successMessage: 'Successfully installed Tmux plugins',
    failureMessage: 'Unable to install Tmux plugins',
  })
}
