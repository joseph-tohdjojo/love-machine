const { getConfig } = require('./js/usrConfig')
const { setup } = require('./js/setup')

getConfig()
  .then(config => {
    console.log('')
    return setup(config)
  })
  .then(r => console.log('done', r))
  .catch(e => {
    console.log('\n‼️ ', e, '\n')
  })
