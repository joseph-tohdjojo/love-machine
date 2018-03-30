const updateOrInstallHomebrew = require('./homebrew')
const { setupBashCompletion, setupBashGitPrompt } = require('./bash')
const {
  symlinkBashProfile,
  symlinkBashrc,
  symlinkGitConfig,
  symlinkGitCompletionBash,
  symlinkGitExcludes,
} = require('./symlink')

module.exports = {
  setupBashCompletion,
  setupBashGitPrompt,
  symlinkBashProfile,
  symlinkBashrc,
  symlinkGitConfig,
  symlinkGitCompletionBash,
  symlinkGitExcludes,
  updateOrInstallHomebrew,
}
