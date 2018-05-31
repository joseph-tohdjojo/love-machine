#!/bin/bash

#################################################################################
# Colors
#################################################################################

# https://upload.wikimedia.org/wikipedia/commons/1/15/Xterm_256color_chart.svg

txtblk='\[\e[0;30m\]' # Black - Regular
txtred='\[\e[0;31m\]' # Red
txtgrn='\[\e[0;32m\]' # Green
txtylw='\[\e[0;33m\]' # Yellow
txtblu='\[\e[0;34m\]' # Blue
txtpur='\[\e[0;35m\]' # Purple
txtcyn='\[\e[0;36m\]' # Cyan
txtwht='\[\e[0;37m\]' # White

bldblk='\[\e[1;30m\]' # Black - Bold
bldred='\[\e[1;31m\]' # Red
bldgrn='\[\e[1;32m\]' # Green
bldylw='\[\e[1;33m\]' # Yellow
bldblu='\[\e[1;34m\]' # Blue
bldpur='\[\e[1;35m\]' # Purple
bldcyn='\[\e[1;36m\]' # Cyan
bldwht='\[\e[1;37m\]' # White

unkblk='\[\e[4;30m\]' # Black - Underline
undred='\[\e[4;31m\]' # Red
undgrn='\[\e[4;32m\]' # Green
undylw='\[\e[4;33m\]' # Yellow
undblu='\[\e[4;34m\]' # Blue
undpur='\[\e[4;35m\]' # Purple
undcyn='\[\e[4;36m\]' # Cyan
undwht='\[\e[4;37m\]' # White

bakblk='\[\e[40m\]'   # Black - Background
bakred='\[\e[41m\]'   # Red
badgrn='\[\e[42m\]'   # Green
bakylw='\[\e[43m\]'   # Yellow
bakblu='\[\e[44m\]'   # Blue
bakpur='\[\e[45m\]'   # Purple
bakcyn='\[\e[46m\]'   # Cyan
bakwht='\[\e[47m\]'   # White

txtrst='\[\e[0m\]'    # Text Reset

#################################################################################
# Prettify Bash Prompt
#################################################################################

if [ -f $(brew --prefix)/etc/bash_completion ]; then
  . $(brew --prefix)/etc/bash_completion
fi
[[ -f "$(brew --prefix)/opt/bash-git-prompt/share/gitprompt.sh" ]] && source "$(brew --prefix)/opt/bash-git-prompt/share/gitprompt.sh"
source ~/.git-completion.bash
GIT_PS1_SHOWDIRTYSTATE=true

#################################################################################
# Functional Shortcuts
#################################################################################

# Open file in Google Chrome ex: 'chrome index.html'
chrome () {
  open -a "Google Chrome" "$1"
}

# Git add single file and commit
gacm () {
  git add "$1"
  git commit -m "$2"
}

# Create a directory and enter it immediately
mkcd () {
  mkdir $1
  cd $1
}

#################################################################################
# Aliases
#################################################################################

alias ll="ls -lah"
alias la="ls -a"

# Change directories
alias dev="cd ~/Documents/Dev/"
alias ..="cd .."

# Git
alias gs="git status -s"
alias grv="git remote -v"
alias gp="git push"

# Reload .bash_profile
alias prof="source ~/.bash_profile"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
