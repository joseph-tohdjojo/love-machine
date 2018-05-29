const ora = require('ora')
const os = require('os')
const path = require('path')
const { execPromise, symlink } = require('../utils')

const HOMEDIR = os.homedir()

module.exports = () =>
  _setupBashCompletion()
  .then(() => _setupBashGitPrompt())
  .then(() => _symlinkBashProfile())
  .then(() => _symlinkBashrc())
  .then(() => _sourceBashProfile())

function _setupBashCompletion() {
  return execPromise({
    command: `brew ls --versions bash-completion`,
    startMessage: 'Checking if bash-completion is installed',
    successMessage: 'Successfully checked if bash-completion is installed!!!',
    failureMessage: 'Unable to check if bash-completion is installed',
    shouldNotHandleError: true,
  })
    .then(({ err }) => {
      if (!!err) {
        return execPromise({
          command: `brew install bash-completion`,
          startMessage: 'Attempting to install bash-completion',
          successMessage: 'Successfully installed bash-completion!!!',
          failureMessage: 'Unable to install bash-completion',
        })
      } else {
        return execPromise({
          command: `brew upgrade bash-completion && brew cleanup bash-completion`,
          startMessage: 'Attempting to upgrade bash-completion and clean it up',
          successMessage: 'Successfully upgraded bash-completion and cleaned it up!!!',
          failureMessage: 'Unable to upgrade bash-completion and clean it up',
          shouldNotHandleError: true,
        }).then(
          response =>
            response.stderr.includes('already installed')
              ? Promise.resolve({
                  err: null,
                  stdout: response.stderr,
                  stderr: '',
                })
              : Promise.resolve(response),
        )
      }
    })
    .then(({ err }) => {
      if(err) {
        throw err
      }
      return Promise.resolve()
    })
}

function _setupBashGitPrompt() {
  return execPromise({
    command: `brew ls --versions bash-git-prompt`,
    startMessage: 'Checking if bash-git-prompt is installed',
    successMessage: 'Successfully checked if bash-git-prompt is installed!!!',
    failureMessage: 'Unable to check if bash-git-prompt is installed',
    shouldNotHandleError: true,
  })
    .then(({ err }) => {
      if (!!err) {
        return execPromise({
          command: `brew install bash-git-prompt`,
          startMessage: 'Attempting to install bash-git-prompt',
          successMessage: 'Successfully installed bash-git-prompt!!!',
          failureMessage: 'Unable to install bash-git-prompt',
        })
      } else {
        return execPromise({
          command: `brew upgrade bash-git-prompt && brew cleanup bash-git-prompt`,
          startMessage: 'Attempting to upgrade bash-git-prompt and cleaning it up',
          successMessage: 'Successfully upgraded bash-git-prompt!!!',
          failureMessage: 'Unable to upgrade bash-git-prompt',
          shouldNotHandleError: true,
        }).then(
          response =>
            response.stderr.includes('already installed')
              ? Promise.resolve({
                  err: null,
                  stdout: response.stderr,
                  stderr: '',
                })
              : Promise.resolve(response),
        )
      }
    })
    .then(({ err }) => {
      if (err) {
        throw err
      }
      return Promise.resolve()
    })
}

function _symlinkBashProfile() {
  const fileToPointTo = path.resolve(__dirname, '..', '..', 'dotfiles', 'bash', '.bash_profile')
  const target = `${HOMEDIR}/.bash_profile`
  return symlink(fileToPointTo, target)
}

function _symlinkBashrc() {
  const fileToPointTo = path.resolve(__dirname, '..', '..', 'dotfiles', 'bash', '.bashrc')
  const target = `${HOMEDIR}/.bashrc`
  return symlink(fileToPointTo, target)
}

function _sourceBashProfile() {
  return execPromise({
    command: `source ${HOMEDIR}/.bash_profile`,
    startMessage: 'Attempting to source .bash_profile',
    successMessage: 'Successfully sourced .bash_profile',
    failureMessage: 'Unable to source .bash_profile',
  })
}
