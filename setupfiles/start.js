const inquire = require('./inquire')

inquire()
  .then(r => console.log('\n🎉 🎉 🎉  done', '\n'))
  .catch(e => {
    console.log('\n‼️ ', e, '\n')
  })
