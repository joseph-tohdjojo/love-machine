const execPromise = require('./execPromise')

module.exports = () => {
  return execPromise({
    command: `which brew`,
    startMessage: `Checking if Homebrew is installed`,
    successMessage: `Successfully checked if Homebrew is installed!!!`,
    failureMessage: `Unable to check if Homebrew is installed`,
    shouldNotHandleError: true,
  })
    .then(({ err, stdout, stderr }) => {
      if (stdout === 'brew not found') {
        return execPromise({
          command: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`,
          startMessage: `Installing Homebrew`,
          successMessage: `Successfully installed Homebrew!!!`,
          failureMessage: `Unable to install Homebrew`,
        })
      } else {
        return execPromise({
          command: `brew update`,
          startMessage: `Updating Homebrew`,
          successMessage: `Successfully updated Homebrew!!!`,
          failureMessage: `Unable to update Homebrew`,
        })
      }
    })
}
