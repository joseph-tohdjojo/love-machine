const ora = require('ora')
const { execPromise } = require('../utils')

module.exports = updateOrInstallHomebrew

function updateOrInstallHomebrew(config) {
  if (!config.homebrew) {
    return new Promise(resolve => resolve(config))
  } else {
    const spinner = ora('Attempting to install/update Homebrew...').start()

    return execPromise(`which brew`)
      .then(({ err, stdout, stderr }) => {
        if (stdout === 'brew not found') {
          spinner.text = 'Homebrew not installed, attempting to install...'
          return execPromise(
            `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`,
          )
        } else {
          spinner.text = 'Homebrew is installed, attempting to update...'
          return execPromise(`brew update`)
        }
      })
      .then(({ err }) => {
        if (err) {
          spinner.fail('Homebrew failed to install/update!!')
          throw err
        }
        spinner.succeed('Successfully installed/updated Homebrew!!')
        return new Promise(resolve => resolve(config))
      })
  }
}
