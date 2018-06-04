const fs = require('fs')
const ora = require('ora')
const path = require('path')

const internals = {}
let spinner

internals.deleteSymlink = (target) => {
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

internals.createSymlink = (fileToPointTo, target) => {
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

module.exports = (fileToPointTo, target) => {
  spinner = ora(`Attempting to symlink '${target}' to '${fileToPointTo}'...`)
  spinner.start()
  return internals.deleteSymlink(target).then(response =>
    internals.createSymlink(fileToPointTo, target),
  )
}

module.exports.__internals__ = internals
