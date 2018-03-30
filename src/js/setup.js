const {
  setupBashCompletion,
  setupBashGitPrompt,
  symlinkBashProfile,
  symlinkBashrc,
  symlinkGitConfig,
  symlinkGitCompletionBash,
  symlinkGitExcludes,
  updateOrInstallHomebrew,
} = require('./setups')

module.exports = {
  setup(config) {
    return updateOrInstallHomebrew(config)
      .then(config => setupBashCompletion(config))
      .then(config => setupBashGitPrompt(config))
      .then(config => symlinkBashrc(config))
      .then(config => symlinkBashProfile(config))
      .then(config => symlinkGitConfig(config))
      .then(config => symlinkGitCompletionBash(config))
      .then(config => symlinkGitExcludes(config))
  },
}
