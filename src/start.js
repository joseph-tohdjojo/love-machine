const inquire = require('./js/inquire')

inquire()
  .then(r => console.log('\n🎉 🎉 🎉  done', '\n'))
  .catch(e => {
    console.log('\n‼️ ', e, '\n')
  })
