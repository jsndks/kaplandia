#!/bin/sh

PLATFORM=$(uname | tr '[A-Z]' '[a-z]')
ARCH=$(getconf LONG_BIT)
BASE="$(cd "$(dirname "$_")"; pwd)"
NODE_DIR="$BASE/tools/node/$PLATFORM-x$ARCH"

printf '=============================================================\n'
printf 'Validating node installation...\n'
printf '=============================================================\n'

    if [ -e "$NODE_DIR" ]; then
        # If a standalone node installation exists, use that
        NODE="$NODE_DIR/bin/node"
        NPM="$NODE_DIR/bin/npm"  
        BOWER="$NODE $NODE_DIR/bin/bower"
        GRUNT="$NODE $NODE_DIR/bin/grunt"
        chmod 770 "$NODE"
        printf 'Standalone node installation found!\n'
        printf 'Location: %s\n' $NODE
    else
        # Otherwise, assume global install is available
        NODE="node"
        NPM="npm"  
        BOWER="bower"
        GRUNT="grunt"    
        printf 'Global node installation found!\n'
    fi
    
    printf 'OK\n\n'

printf '=============================================================\n'
printf 'Installing dependencies...\n'
printf '=============================================================\n'
    printf "$NPM install\n"
    $NPM install

    printf "$BOWER install\n"
    $BOWER install   
    printf 'OK\n\n'

printf '=============================================================\n'
printf 'Performing Grunt build...\n'
printf '=============================================================\n'
    printf "$GRUNT $@\n"

    $GRUNT $@
    printf 'OK\n\n'

printf 'DONE'