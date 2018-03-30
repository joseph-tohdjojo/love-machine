const inquirer = require('inquirer')
const { colors } = require('./utils')

module.exports = {
  getConfig() {
    const config = {
      homebrew: false,
      git: false,
      bash: false,
      vim: false,
    }

    return inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'start',
          message: `${
            colors.RED
          }You are about to configure your entire computer. Some config files will be deleted or overwritten. Are you sure you want to do this?`,
          default: false,
        },
      ])
      .then(
        ({ start }) =>
          !start ? process.exit() : new Promise(resolve => resolve(config)),
      )
      .then(config =>
        configureItem({
          ...config,
          key: 'homebrew',
          customQuestion: `Would you like to setup HOMEBREW? This will install/update HOMEBREW. Make sure you save custom configurations before agreeing to this.`,
        }),
      )
      .then(config =>
        configureItem({
          ...config,
          key: 'bash',
        }),
      )
      .then(config =>
        configureItem({
          ...config,
          key: 'git',
        }),
      )
      .then(config =>
        configureItem({
          ...config,
          key: 'vim',
        }),
      )
      .then(config => config)
  },
}

///////////////////////
// Utility Functions //
///////////////////////

function configureItem({ key, customQuestion, ...config }) {
  return inquirer
    .prompt([
      {
        type: 'confirm',
        name: `${key}_check`,
        message: customQuestion
          ? customQuestion
          : `Would you like to setup ${key.toUpperCase()}?`,
        default: false,
      },
    ])
    .then(
      checkAnswer =>
        !checkAnswer[`${key}_check`]
          ? new Promise(resolve => resolve(config))
          : inquirer
              .prompt([
                {
                  type: 'confirm',
                  name: `${key}`,
                  message: `Are you absolutely sure???`,
                  default: false,
                },
              ])
              .then(answer => {
                if (answer[key]) {
                  config[key] = true
                }
                return new Promise(resolve => resolve(config))
              }),
    )
}
