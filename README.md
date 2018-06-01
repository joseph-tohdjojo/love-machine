# love-machine

A node app to get my machine configured just the way I like it

### How do I get set up?

* You will need Node installed. I recommend [NVM](https://github.com/creationix/nvm#install-script).
* You will need [Homebrew](https://brew.sh/) installed.
* Run `npm install`
* Run `npm start`
* Answer the prompt questions

### What's going on?
#### Atom
* Symlinks a few atom files `config.cson`, `keymap.cson`, `snippets.cson`, and `github.cson`
* TODO: Automate installation of plugins

#### Bash
* Updates/Installs Homebrew
* Upgrades/Installs `bash-completion` and `bash-git-prompt`
* Symlinks `.bash_profile` and `.bashrc`
* This process also attempts to source the `~/.git-completion.bash`
    * If this file doesn't exist, it will throw an error.
    * To fix this, run the Git process
* At the end, it will ask the terminal to source `~/.bash_profile`

#### Git
* Symlinks `.git-completion.bash`, `.gitconfig`, `.gitexcludes`, `.gitignore`
* At the end, it will ask the terminal to source `~/.bash_profile`

#### Tmux
* Updates/Installs Homebrew
* Upgrades/Installs Tmux
* Cleans up the `~/.tmux` folder
* Installs the TPM(Tmux Package Manager)
* Symlinks `tmux.conf`
* Installs TPM Plugins

#### Vim
* Updates/Installs Homebrew
* Upgrades/Installs Vim
* Cleans up the `~/.vim` folder
* Install Vim Plug
* Symlinks `.vimrc`, `.vimrc.bundles`, and `.vimrc.bundles.local`
* Installs Vim Plugins
* Symlinks `.vimrc.local`. This needs to happen after installing plugins because it references a colorscheme that needs to be installed before it can be used.
* Tells Vim to source the `~/.vimrc`

### Got any questions? Contact...

* Joe 🍔
