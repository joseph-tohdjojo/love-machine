const { exec } = require('child_process')
const fs = require('fs')
const ora = require('ora')
const os = require('os')

const HOMEDIR = os.homedir()

const execPromise = command =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => resolve({ err, stdout, stderr }))
  })

module.exports = {
  setup(config) {
    return symlinkGitConfig(config)
    // return updateOrInstallHomebrew(config)
    //   .then(config => setupBashCompletion(config))
    //   .then(config => setupBashGitPrompt(config))
    //   .then(config => symlinkGitConfig(config))
  },
}

const updateOrInstallHomebrew = config => {
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

const setupBashCompletion = config => {
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

const setupBashGitPrompt = config => {
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

const symlinkGitConfig = config => {
  if (!config.git) {
    return new Promise(resolve => resolve(config))
  } else {
    // const spinner = ora('Attempting to symlink gitconfig...').start()
    return new Promise((resolve, reject) => {
      fs.readlink(`${HOMEDIR}/.gitconfig`, (err, targetPath) => {
        if (targetPath) {
          console.log('file exists')
        } else {
          console.log('file doesnt exist')
        }
      })
    })
  }
}
