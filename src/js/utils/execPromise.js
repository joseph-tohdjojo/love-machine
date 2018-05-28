const ora = require('ora')
const { exec } = require('child_process')


module.exports = (command, commandName = `the command`, shouldhandleError = true) => {
  const spinner = ora(`Attempting to execute '${commandName}'...`)
  spinner.start()
  return new Promise((resolve, reject) =>
    exec(command, (err, stdout, stderr) => {
      if(shouldhandleError && err) {
        spinner.fail(`something bad happened when trying to execute '${commandName}'`)
        reject(err)
      } else {
        spinner.succeed(`Successfully executed '${commandName}'!!!`)
        resolve({err, stdout, stderr})
      }
    })
  )
}
