const path = require('path')
const os = require('os')
const { symlink } = require('../utils')

const HOMEDIR = os.homedir()

module.exports = () =>
  _symlinkConfig()
    .then(() => _symlinkKeymap())
    .then(() => _symlinkSnippets())
    .then(() => _symlinkGithub())

function _symlinkConfig() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'atom', 'config.cson'),
    `${HOMEDIR}/.atom/config.cson`,
  )
}

function _symlinkKeymap() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'atom', 'keymap.cson'),
    `${HOMEDIR}/.atom/keymap.cson`,
  )
}

function _symlinkSnippets() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'atom', 'snippets.cson'),
    `${HOMEDIR}/.atom/snippets.cson`,
  )
}

function _symlinkGithub() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'atom', 'github.cson'),
    `${HOMEDIR}/.atom/github.cson`,
  )
}
