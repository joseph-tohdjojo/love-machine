const ora = require('ora')
const { exec } = require('child_process')

module.exports = ({
  command,
  startMessage,
  successMessage,
  failureMessage,
  shouldNotHandleError,
}) => {
  const spinner = ora(startMessage || 'Attempting to execute a command')
  spinner.start()
  return new Promise((resolve, reject) =>
    exec(command, (err, stdout, stderr) => {
      if (!shouldNotHandleError && err) {
        spinner.fail(failureMessage || `Unable to execute this command`)
        reject(err)
      } else if(!shouldNotHandleError && stderr) {
        reject(stderr)
      } else {
        spinner.succeed(successMessage || `Successfully executed command!!!`)
        resolve({ err, stdout, stderr })
      }
    }),
  )
}
