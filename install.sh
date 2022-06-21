#!/usr/bin/env bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.configuration"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion.sh" ] && \. "$NVM_DIR/bash_completion"
$NVM_DIR/nvm.sh bash_completion
$NVM_DIR/nvm.sh install 8
$NVM_DIR/nvm.sh use 8
cd ~/car
npm i
