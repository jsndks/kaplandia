#!/usr/bin/env sh

BASE="$HOME"
NODE_DIR="$BASE/.node"

export N_PREFIX=$HOME/.node
export PATH=$N_PREFIX/bin:$PATH

printf '=============================================================\n'
printf 'Installing node...\n'
printf '=============================================================\n'

    mkdir -p $N_PREFIX/bin
    curl -o $N_PREFIX/bin/n https://raw.github.com/visionmedia/n/master/bin/n
    chmod +x $N_PREFIX/bin/n
    n stable

printf '=============================================================\n'
printf 'Installing global dependencies...\n'
printf '=============================================================\n'

    npm install --global bower
    npm install --global grunt-cli
    printf 'OK\n\n'

printf 'DONE\n'