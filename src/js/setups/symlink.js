const fs = require('fs')
const ora = require('ora')
const os = require('os')
const path = require('path')
const { execPromise } = require('../utils')

const HOMEDIR = os.homedir()
const spinner = ora('Attempting to symlink gitconfig...')

module.exports = {
  symlinkBashProfile,
  symlinkBashrc,
  symlinkGitConfig,
  symlinkGitCompletionBash,
  symlinkGitExcludes,
}

// GIT
function symlinkGitConfig(config) {
  const fileToPointTo = path.resolve(__dirname, '../../dotfiles/git/.gitconfig')
  const target = `${HOMEDIR}/.gitconfig`
  return symlink({ ...config, fileToPointTo, key: 'git', target })
}

function symlinkGitCompletionBash(config) {
  const fileToPointTo = path.resolve(
    __dirname,
    '../../dotfiles/git/.git-completion.bash',
  )
  const target = `${HOMEDIR}/.git-completion.bash`
  return symlink({ ...config, fileToPointTo, key: 'git', target })
}

function symlinkGitExcludes(config) {
  const fileToPointTo = path.resolve(
    __dirname,
    `../../dotfiles/git/.gitexcludes`,
  )
  const target = `${HOMEDIR}/.gitexcludes`
  return symlink({ ...config, fileToPointTo, key: 'git', target })
}

// BASH
function symlinkBashProfile(config) {
  const fileToPointTo = path.resolve(
    __dirname,
    `../../dotfiles/bash/.bash_profile`,
  )
  const target = `${HOMEDIR}/.bash_profile`
  return symlink({ ...config, fileToPointTo, key: 'bash', target })
}

function symlinkBashrc(config) {
  const fileToPointTo = path.resolve(__dirname, `../../dotfiles/bash/.bashrc`)
  const target = `${HOMEDIR}/.bashrc`
  return symlink({ ...config, fileToPointTo, key: 'bash', target })
}

///////////////////////
// Utility Functions //
///////////////////////

function symlink({ fileToPointTo, target, key, ...config }) {
  if (!config[key]) {
    return new Promise(resolve => resolve(config))
  } else {
    spinner.start()
    return _deleteFileOrSymlink({ ...config, target }).then(response =>
      _createSymlink({
        ...config,
        fileToPointTo,
        target,
      }),
    )
  }
}

function _deleteFileOrSymlink({ target, ...config }) {
  return new Promise((resolve, reject) => {
    fs.lstat(target, (err, stats) => {
      if (!stats && !fs.existsSync(target)) {
        spinner.text = `File or symlink doesn't exist`
        resolve(config)
      } else {
        spinner.text = `File or symlink exists`
        fs.unlink(target, err => {
          if (err) {
            spinner.fail(
              `Cannot fs.unlink a file that does not exist, ${target}`,
            )
            reject(err)
          } else {
            spinner.text = `File or symlink deleted`
            resolve(config)
          }
        })
      }
    })
  })
}

function _createSymlink({ fileToPointTo, target, ...config }) {
  return new Promise((resolve, reject) => {
    fs.symlink(fileToPointTo, target, err => {
      if (err) {
        spinner.fail(`something bad happened when creating the symlink`)
        reject(err)
      } else {
        spinner.succeed(
          `Successfully symlinked '${target}' to '${fileToPointTo}'!!!`,
        )
        resolve(config)
      }
    })
  })
}
