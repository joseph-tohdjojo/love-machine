const readline = require('readline')
const colors = require('./colors')

const cl = readline.createInterface(process.stdin, process.stdout)
const question = q => {
  return new Promise((res, rej) => {
    cl.question(q, answer => {
      res(answer)
    })
  })
}

module.exports = {
  promptUserForConfig() {
    const config = {}

    console.log(
      `${
        colors.RED
      }The default answer to all of these questions is yes. To answer 'no', type 'n'${
        colors.NC
      }\n`,
    )

    const handlePromise = (answer, key, name, isLast = false) => {
      if (answer === 'n') {
        config[key.toLowerCase()] = false
      } else {
        config[key.toLowerCase()] = true
      }
      return question(
        `${colors.CYAN}Would you like to setup ${name}?\n${
          colors.ORANGE
        }(Hit 'Enter' to confirm. Hit 'n' to decline)${colors.GREEN} `,
      )
    }

    question(
      `${colors.CYAN}Would you like to setup Homebrew?\n${
        colors.ORANGE
      }(Hit 'Enter' to confirm. Hit 'n' to decline)${colors.GREEN} `,
    )
      .then(a => handlePromise(a, 'homebrew', 'Bash'))
      .then(a => handlePromise(a, 'bash', 'Git'))
      .then(a => handlePromise(a, 'git', 'Vim'))
      .then(a => {
        if (a === 'n') {
          config.vim = false
        } else {
          config.vim = true
        }
        return new Promise(r => r(config))
      })
      .then(c => {
        console.log(`${colors.NC}${JSON.stringify(c, null, 2)}`)
        process.exit()
      })
      .catch(e => console.log('error: ', e))
  },
}
