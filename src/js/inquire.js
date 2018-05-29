const clear = require('clear')
const inquirer = require('inquirer')
const { bashSetup, gitSetup, vimSetup } = require('./setups')
const { execPromise } = require('./utils')

clear()

module.exports = () => inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'start',
      message: `You are about to configure your entire computer. Some config files will be deleted or overwritten. Are you sure you want to do this?`,
    },
  ])
  .then(
    ({start}) =>
      !start
        ? Promise.reject('Maybe next time.')
        : inquirer.prompt([{
          type: 'list',
          name: 'choose_setup',
          message: `What would you like to setup?`,
          choices: [
            'Bash',
            'Git',
            'Vim',
          ],
        }])
  )
  .then(({choose_setup}) => {
    switch(choose_setup) {
      case 'Bash':
        return bashSetup()
      case 'Git':
        return gitSetup()
      case 'Vim':
        return vimSetup()
      default:
        console.log('Something went wrong. No choice was selected.')
    }
  })
