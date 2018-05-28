const fs = require('fs')
const ora = require('ora')
const path = require('path')

const spinner = ora('Attempting to symlink gitconfig...')

module.exports = (fileToPointTo, target) => {
  spinner.start()
  return _deleteSymlink(target).then(response => _createSymlink(fileToPointTo, target))
}

function _deleteSymlink(target) {
  return new Promise((resolve, reject) => {
    fs.lstat(target, (err, stats) => {
      if (!stats && !fs.existsSync(target)) {
        spinner.text = `File or symlink doesn't exist`
        resolve()
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
            resolve()
          }
        })
      }
    })
  })
}

function _createSymlink(fileToPointTo, target) {
  return new Promise((resolve, reject) => {
    fs.symlink(fileToPointTo, target, err => {
      if (err) {
        spinner.fail(`something bad happened when creating the symlink`)
        reject(err)
      } else {
        spinner.succeed(
          `Successfully symlinked '${target}' to '${fileToPointTo}'!!!`,
        )
        resolve()
      }
    })
  })
}
