const os = require('os')
const path = require('path')
const { execPromise, symlink } = require('../utils')

const HOMEDIR = os.homedir()

module.exports = () =>
  _symlinkGitCompletion()
    .then(() => _symlinkGitConfig())
    .then(() => _symlinkGitExcludes())
    .then(() => _symlinkGitIgnore())
    .then(() => _sourceBashProfile())

function _symlinkGitCompletion() {
  const fileToPointTo = path.resolve(
    __dirname,
    '..',
    '..',
    'dotfiles',
    'git',
    'git-completion.bash',
  )
  const target = `${HOMEDIR}/.git-completion.bash`
  return symlink(fileToPointTo, target)
}

function _symlinkGitConfig() {
  const fileToPointTo = path.resolve(
    __dirname,
    '..',
    '..',
    'dotfiles',
    'git',
    'gitconfig',
  )
  const target = `${HOMEDIR}/.gitconfig`
  return symlink(fileToPointTo, target)
}

function _symlinkGitExcludes() {
  const fileToPointTo = path.resolve(
    __dirname,
    '..',
    '..',
    'dotfiles',
    'git',
    'gitexcludes',
  )
  const target = `${HOMEDIR}/.gitexcludes`
  return symlink(fileToPointTo, target)
}

function _symlinkGitIgnore() {
  const fileToPointTo = path.resolve(
    __dirname,
    '..',
    '..',
    'dotfiles',
    'git',
    'gitignore',
  )
  const target = `${HOMEDIR}/.gitignore`
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
