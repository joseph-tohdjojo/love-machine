const ora = require('ora')
const { execPromise } = require('../utils')

module.exports = {
  setupBashCompletion,
  setupBashGitPrompt,
}

function setupBashCompletion(config) {
  if (!config.bash) {
    return new Promise(resolve => resolve(config))
  } else {
    const spinner = ora(
      'Attempting to install/upgrade bash-completion...',
    ).start()

    return execPromise(`brew ls --versions bash-completion`)
      .then(({ err }) => {
        if (!!err) {
          return execPromise(`brew install bash-completion`)
        } else {
          return execPromise(
            `brew upgrade bash-completion && brew cleanup bash-completion`,
          ).then(
            response =>
              response.stderr.includes('already installed')
                ? new Promise(resolve =>
                    resolve({
                      err: null,
                      stdout: response.stderr,
                      stderr: '',
                    }),
                  )
                : new Promise(resolve => resolve(response)),
          )
        }
      })
      .then(({ err }) => {
        if (err) {
          spinner.fail(`bash-completion failed to install/upgrade!!`)
          throw err
        }
        spinner.succeed('Successfully installed/upgraded bash-completion!!')
        return new Promise(resolve => resolve(config))
      })
  }
}

function setupBashGitPrompt(config) {
  if (!config.bash) {
    return new Promise(resolve => resolve(config))
  } else {
    const spinner = ora(
      'Attempting to install/upgrade bash-git-prompt...',
    ).start()

    return execPromise(`brew ls --versions bash-git-prompt`)
      .then(({ err }) => {
        if (!!err) {
          return execPromise(`brew install bash-git-prompt`)
        } else {
          return execPromise(
            `brew upgrade bash-git-prompt && brew cleanup bash-git-prompt`,
          ).then(
            response =>
              response.stderr.includes('already installed')
                ? new Promise(resolve =>
                    resolve({
                      err: null,
                      stdout: response.stderr,
                      stderr: '',
                    }),
                  )
                : new Promise(resolve => resolve(response)),
          )
        }
      })
      .then(({ err }) => {
        if (err) {
          spinner.fail(`bash-git-prompt failed to install/upgrade!!`)
          throw err
        }
        spinner.succeed('Successfully installed/upgraded bash-git-prompt!!')
        return new Promise(resolve => resolve(config))
      })
  }
}
