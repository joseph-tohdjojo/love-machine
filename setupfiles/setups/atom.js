const path = require('path')
const os = require('os')
const ora = require('ora')
const { exec } = require('child_process')
const { execPromise, symlink, updateOrInstallHomebrew } = require('../utils')
const packages = require('../../dotfiles/atom/install_packages')

const HOMEDIR = os.homedir()

module.exports = () => updateOrInstallHomebrew()
  .then(_installCask)
  .then(_uninstallAtom)
  .then(_installAtom)
  .then(_makeAtomFolder)
  .then(_symlinkConfig)
  .then(_symlinkInit)
  .then(_symlinkKeymap)
  .then(_symlinkSnippets)
  .then(_symlinkGithub)
  .then(_symlinkStylesheet)
  .then(_installAtomPackages)

function _installCask() {
  return execPromise({
    command: `brew tap caskroom/cask`,
    startMessage: 'Attempting to install cask',
    successMessage: 'Successfully installed cask!!!',
    failureMessage: 'Unable to install cask',
  })
}

function _uninstallAtom() {
  const cmd = `rm -rf ~/.atom && rm -rf /usr/local/bin/atom && rm -rf /usr/local/bin/apm && rm -rf /Applications/Atom.app && rm -rf ~/Library/Preferences/com.github.atom.p && rm -rf ~/"Library/Application Support/com.gith && rm -rf ~/"Library/Application Support/Atom" && rm -rf ~/"Library/Saved Application State/com. && rm -rf ~/Library/Caches/com.github.atom && rm -rf ~/Library/Caches/com.github.atom.Shipit && rm -rf ~/Library/Caches/Atom`
  return execPromise({
    command: cmd,
    startMessage: 'Attempting to uninstall Atom',
    successMessage: 'Successfully uninstalled Atom!!!',
    failureMessage: 'Unable to uninstall Atom',
  })
}

function _installAtom() {
  return execPromise({
    command: `brew cask install atom`,
    startMessage: 'Attempting to install Atom',
    successMessage: 'Successfully installed Atom!!!',
    failureMessage: 'Unable to install Atom',
    shouldNotHandleError: true,
  })
    .then(response => {
      const {err, stdout, stderr} = response
      if(err) {
        return Promise.reject(err)
      } else if(stderr) {
        return execPromise({
          command: `brew cask reinstall atom`,
          startMessage: 'Attempting to reinstall Atom',
          successMessage: 'Successfully reinstalled Atom!!!',
          failureMessage: 'Unable to reinstall Atom',
        })
      }
      return response
    })
}

function _makeAtomFolder() {
  return execPromise({
    command: `mkdir ~/.atom`,
    startMessage: 'Attempting to make ~/.atom',
    successMessage: 'Successfully made ~/.atom!!!',
    failureMessage: 'Unable to make ~/.atom',
    shouldNotHandleError: true,
  })
}

function _symlinkConfig() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'atom', 'config.cson'),
    `${HOMEDIR}/.atom/config.cson`,
  )
}

function _symlinkInit() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'atom', 'init.coffee'),
    `${HOMEDIR}/.atom/init.coffee`,
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

function _symlinkStylesheet() {
  return symlink(
    path.resolve(__dirname, '..', '..', 'dotfiles', 'atom', 'styles.less'),
    `${HOMEDIR}/.atom/styles.less`,
  )
}

function _installAtomPackages() {
  return Promise.all(packages.map((pkg) => {
    const spinner = ora(`Attempting to install ${pkg}`)
    spinner.start()
    return new Promise((resolve, reject) => {
      exec(`apm install ${pkg}`, (err, stdout, stderr) => {
        if(err) {
          spinner.fail(`Unable to install ${pkg}`)
          return reject(err)
        }
        spinner.succeed(`Successfully installed ${pkg}!!!`)
        return resolve()
      })
    })
  }))
}
