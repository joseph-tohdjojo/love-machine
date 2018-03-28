const inquirer = require('inquirer')
const colors = require('./colors')

module.exports = {
  getConfig() {
    return inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'homebrew',
          message: `${colors.CYAN}Would you like to setup ${
            colors.RED
          }HOMEBREW${colors.CYAN}?`,
          default: true,
        },
        {
          type: 'confirm',
          name: 'bash',
          message: `${colors.CYAN}Would you like to setup ${colors.RED}BASH${
            colors.CYAN
          }?`,
          default: true,
        },
        {
          type: 'confirm',
          name: 'git',
          message: `${colors.CYAN}Would you like to setup ${colors.RED}GIT${
            colors.CYAN
          }?`,
          default: true,
        },
        {
          type: 'confirm',
          name: 'vim',
          message: `${colors.CYAN}Would you like to setup ${colors.RED}VIM${
            colors.CYAN
          }?`,
          default: true,
        },
      ])
      .then(answers => {
        return answers
      })
  },
}
