@echo off

set BASE=%~dp0
set NODE_DIR=%BASE%tools\node\windows\
set BIT_64=
set BIT_32=32
If Defined ProgramFiles(x86) (
    set BIT=%BIT_64%
) Else (
    set BIT=%BIT_32%
)

echo =============================================================
echo Validating node installation...
echo =============================================================

    if exist "%NODE_DIR%node.exe" (
        REM If a standalone node installation exists, use that
        set NODE=%NODE_DIR%node%BIT%.exe
        set NPM=%NODE_DIR%npm
        set BOWER=%NODE% %NODE_DIR%node_modules\bower\bin\bower
        set GRUNT=%NODE% %NODE_DIR%node_modules\grunt-cli\bin\grunt
        echo Standalone node installation found!
        echo Location: %NODE%
    ) else (
        REM Otherwise, assume global install is available
        set NODE=node
        set NPM=npm
        set BOWER=bower
        set GRUNT=grunt
        echo Global node installation found!
    )
    echo OK

echo =============================================================
echo Installing dependencies...
echo =============================================================
    echo %NPM% install
    CALL %NPM% install
    
    echo %BOWER% install
    CALL %BOWER% install
    echo OK

echo =============================================================
echo Performing Grunt build...
echo =============================================================
    echo %GRUNT% %*
    CALL %GRUNT% %*
    echo OK

echo DONE
