"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Core Settings
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set autoindent
set autoread
set autowrite
set autowriteall
set background=dark
set backspace=indent,eol,start
set clipboard=unnamed
set colorcolumn=+1
set encoding=utf-8
set expandtab
set fileencoding=utf-8
set fileformat=unix
set fileformats=unix,dos
set guifont=FuraCode_Nerd_Font:h11
set incsearch
set laststatus=2
set list
set listchars=tab:▸▸,eol:·,extends:▶,precedes:◀ " ,space:·
set mouse=a
set nobackup
set nowritebackup
set nocompatible
set nojoinspaces
set noswapfile
set nowrap
set numberwidth=4
set number relativenumber
set ruler
set shiftround
set shiftwidth=2
set showcmd
set smartindent
set softtabstop=2
set splitbelow
set splitright
set tabstop=2
set textwidth=80
set updatetime=1000
runtime macros/matchit.vim
au CursorHold,CursorHoldI * checktime
au BufLeave * :wa " save when switching splits
hi MatchParen cterm=bold ctermbg=white ctermfg=black

" Switch syntax highlighting on, when the terminal has colors
" Also switch on highlighting the last used search pattern.
if (&t_Co > 2 || has("gui_running")) && !exists("syntax_on")
  syntax on
endif

" Change the cursor from a box to a line when switching to insert mode
let &t_SI = "\<Esc>]50;CursorShape=1\x7"
let &t_SR = "\<Esc>]50;CursorShape=2\x7"
let &t_EI = "\<Esc>]50;CursorShape=0\x7"

" Get rid of trailing white spaces on save
fun! <SID>StripTrailingWhiteSpaces()
  let l = line(".")
  let c = col(".")
  %s/\s\+$//e
  call cursor(l, c)
endfun
autocmd BufWritePre * :call <SID>StripTrailingWhiteSpaces()

" On file types...
"   .md files are markdown files
autocmd BufNewFile,BufRead *.md setlocal ft=markdown
"   .twig files use html syntax
autocmd BufNewFile,BufRead *.twig setlocal ft=html
"   .less files use less syntax
autocmd BufNewFile,BufRead *.less setlocal ft=less
"   .jade files use jade syntax
autocmd BufNewFile,BufRead *.jade setlocal ft=jade

" Treat <li> and <p> tags like the block tags they are
let g:html_indent_tags = 'li\|p'





"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Abbreviations / Key Mappings
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Leader
let mapleader = " "

" Edit my vimrc file
nnoremap <leader>ev :vsplit $MYVIMRC<CR>
" Source my vimrc file
nnoremap <leader>sv :source $MYVIMRC<CR>
" Do all the things to reset vim
nnoremap <leader>vim :w<CR>:source $MYVIMRC<CR>:PlugInstall<CR>

" Save current file
nnoremap <leader>ss :w<CR>

" Switch left and right between buffers
nnoremap <leader>q :bp<CR>
nnoremap <leader>w :bn<CR>

" Quicker window movement
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-h> <C-w>h
nnoremap <C-l> <C-w>l

" Switch between the last two files
nnoremap <Leader><Leader> <C-^>

" Get off my lawn
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>

" Close current tab(split)
nnoremap <Leader>ct <C-w>q
" Close current tab(split) and buffer
autocmd VimEnter * nnoremap <leader>cb :bd<CR>
" Create new tab(split) with current buffer
nnoremap <Leader>nt :vs<CR>:bp<CR><C-w>l

" Select all
nnoremap <Leader>a ggVG

" Allow Tab and Shift+Tab to tab selection in visual mode
vnoremap <Tab> >gv
vnoremap <S-Tab> <gv

" change spacing for language specific
autocmd Filetype javascript setlocal ts=2 sts=2 sw=2





"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Plugins
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
filetype plugin indent on

call plug#begin('~/.vim/plugged')
" Call :PlugInstall to install plugins

Plug 'ctrlpvim/ctrlp.vim'
Plug 'jiangmiao/auto-pairs'
Plug 'mhinz/vim-signify'
Plug 'prettier/vim-prettier', { 'do': 'npm install' }
Plug 'scrooloose/nerdtree'
Plug 'scrooloose/nerdcommenter'
Plug 'sheerun/vim-polyglot'
Plug 'tpope/vim-surround'
Plug 'Valloric/YouCompleteMe', { 'do': './install.py --tern-completer' }
Plug 'vim-airline/vim-airline'
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'Yggdroot/indentLine'

call plug#end()





"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Plugin Settings
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" ctrlpvim/ctrlp.vim
let g:ctrlp_user_command = ['.git', 'cd %s && git ls-files -co --exclude-standard']
let g:ctrlp_working_path_mode = 'ra'

" mhinz/vim-signify
let g:signify_vcs_list = [ 'git' ]

" scrooloose/nerdtree
let NERDTreeShowHidden = 1
nnoremap <Leader>\ :NERDTreeToggle<CR>

" scrooloose/nerdcommenter
let g:NERDSpaceDelims = 1

" Valloric/YouCompleteMe
" Start autocompletion after 4 chars
let g:ycm_min_num_of_chars_for_completion = 4
let g:ycm_min_num_identifier_candidate_chars = 3
let g:ycm_enable_diagnostic_highlighting = 0
" Don't show YCM's preview window [ I find it really annoying ]
set completeopt-=preview
let g:ycm_add_preview_to_completeopt = 0

" vim-airline/vim-airline
let g:airline_powerline_fonts = 1
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#formatter = 'unique_tail_improved'

" Xuyuanp/nerdtree-git-plugin
" NERDTress File highlighting
function! NERDTreeHighlightFile(extension, fg, bg, guifg, guibg)
 exec 'autocmd filetype nerdtree highlight ' . a:extension .' ctermbg='. a:bg .' ctermfg='. a:fg .' guibg='. a:guibg .' guifg='. a:guifg
 exec 'autocmd filetype nerdtree syn match ' . a:extension .' #^\s\+.*'. a:extension .'$#'
endfunction

call NERDTreeHighlightFile('jade', 'green', 'none', 'green', '#151515')
call NERDTreeHighlightFile('ini', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('md', 'blue', 'none', '#3366FF', '#151515')
call NERDTreeHighlightFile('yml', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('config', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('conf', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('json', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('html', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('styl', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('css', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('coffee', 'Red', 'none', 'red', '#151515')
call NERDTreeHighlightFile('js', 'Red', 'none', '#ffa500', '#151515')
call NERDTreeHighlightFile('php', 'Magenta', 'none', '#ff00ff', '#151515')

" Yggdroot/indentLine
let g:indentLine_enabled = 1
let g:indentLine_char = '|'
