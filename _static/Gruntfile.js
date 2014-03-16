/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {

    // -- Plugins --------------------------------------------------------------

    // Intelligently autoloads `grunt-*` plugins from the package dependencies.
    require('load-grunt-tasks')(grunt);

    // Reports the time it takes for tasks to run so optimizations can be made.
    require('time-grunt')(grunt);

    // Adds better support for defining options.
    require('nopt-grunt')(grunt);

    // -- Options --------------------------------------------------------------

    grunt.initOptions({
        prod: {
            info: 'Whether this is a production build.',
            type: Boolean
        },
        stage: {
            info: 'Whether this is a staging build.',
            type: Boolean
        },
        maps: {
            info: 'Whether to generate source maps for compressed files.',
            type: Boolean
        }
    });

    // All builds are considered to be development builds, unless they're not.
    grunt.option('dev', !grunt.option('prod') && !grunt.option('stage'));

    // -- Configuration --------------------------------------------------------

    grunt.initConfig({

        // -- Metadata ---------------------------------------------------------

        // This will load the `package.json` file so we can have access to the
        // project metadata such as name and version number.
        pkg: require('./package.json'),

        // This will load the `env.js` file so we can have access to the
        // project environment configuration and constants.
        env: require('./env'),

        // A comment block that will be prefixed to all our minified code files.
        // Gets the name and version from the above loaded `package.json` file.
        // How to use: '<%= banner %>'
        banner: [
            '/*!',
            ' * <%= pkg.name %> v<%= pkg.version %>' + (grunt.option('dev') ? ' (dev)' : ''),
            ' * <%= pkg.description %>',
            ' *',
            ' * Copyright(c): <%= grunt.template.today("yyyy") %>',
            ' * Build Date: <%= grunt.template.today("yyyy-mm-dd") %>',
            ' */\n'
        ].join('\n'),

        // -- Utility Tasks ----------------------------------------------------

        // Automatically removes generated files and directories. Useful for
        // rebuilding the project with fresh copies of everything.
        clean: {
            options: {
                // Uncomment the next line to allow deletion of folders outside
                // the current working dir (CWD). Use with caution.
                // force: true
            },
            dest: ['<%= env.DIR_DEST %>'],
            docs: ['<%= env.DIR_DOCS %>'],
            tmp: ['<%= env.DIR_TMP %>'],
            installed: [
                'tools/node-*',
                '<%= env.DIR_BOWER %>',
                '<%= env.DIR_NPM %>'
            ]
        },

        // Copies any files that should be moved to the destination directory
        // that are not already handled by another task.
        copy: {
            media: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    src: ['assets/media/**'],
                    dest: '<%= env.DIR_DEST %>'
                }]
            },
            markup: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['**/*.html', '!assets/vendor/**']
                }]
            },
            scripts: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    /*jshint -W014 */
                    src: (grunt.option('maps') || grunt.option('no-dev'))
                       ? ['assets/scripts/config.js', 'assets/vendor/requirejs/require.js']
                       : ['assets/scripts/**/*.js', 'assets/vendor/**/*.js']
                    /*jshint +W014 */
                }]
            }
        },

        // YUIDoc plugin that will generate our JavaScript documentation.
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: '<%= env.DIR_SRC %>',
                    outdir: '<%= env.DIR_DOCS %>',
                    themedir: './node_modules/nerdery-yuidoc-theme'
                }
            }
        },

        // -- Lint Tasks -------------------------------------------------------

        // Compiles Sass files into the destination folder.
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    src: ['assets/styles/modern.scss', 'assets/styles/legacy.scss'],
                    dest: '<%= env.DIR_SRC %>',
                    ext: '.css'
                }]
            }
        },

        // Verifies that style files conform to our standards.
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: [
                    '<%= env.DIR_SRC %>/**/*.css',
                    '!**/node_modules/**',
                    '!**/vendor/**'
                ]
            }
        },

        // Verifies that script files conform to our standards.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= env.DIR_SRC %>/**/*.js',
                    '!**/node_modules/**',
                    '!**/vendor/**'
                ]
            }
        },

        // Instead of running a server preprocessor, files and directories may
        // be watched for changes and have associated tasks run automatically
        // when you save your changes. This is compatible with the LiveReload
        // api, so you may use their free browser extensions to reload pages
        // after watch tasks complete. No purchase neccessary:
        // http://go.livereload.com/extensions
        watch: {
            options: {
                event: 'all',
                livereload: true
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['build']
            },
            media: {
                files: ['<%= env.DIR_SRC %>/assets/media/**'],
                tasks: ['media']
            },
            markup: {
                files: ['<%= env.DIR_SRC %>/**/*.html'],
                tasks: ['markup']
            },
            styles: {
                files: [
                    '<%= env.DIR_SRC %>/assets/styles/**/*.scss',
                    '<%= env.DIR_SRC %>/assets/styles/*.scss'
                ],
                tasks: ['sass', 'styles']
            },
            scripts: {
                files: ['<%= env.DIR_SRC %>/**/*.js'],
                tasks: ['scripts']
            }
        },

        // It is assumed that all lint tasks may be run concurrently, meaning
        // markup, styles, and scripts may be safely linted at the same time.
        // Likewise for build tasks and documentation tasks. Order-dependent
        // tasks should be registered at the bottom of this file.
        concurrent: {
            lint: ['csslint', 'jshint'],
            build: ['media', 'markup', 'styles', 'scripts'],
            docs: ['yuidoc']
        },

        // -- Style Tasks ------------------------------------------------------

        cssmin: {
            options: {
                keepBreaks: grunt.option('dev'),
                removeEmpty: true
            },
            all: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['assets/styles/*.css']
                }]
            }
        },

        // -- Script Tasks -----------------------------------------------------

        // Bower plugin to automatically wire up bower modules into the
        // RequireJS config file.
        bower: {
            main: {
                // Path of shared configuration file
                rjsConfig: '<%= env.DIR_SRC %>/assets/scripts/config.js'
            }
        },

        // RequireJS plugin that will use uglify2 to build and minify our
        // JavaScript, templates and any other data we include in the require
        // files.
        requirejs: {
            options: {
                // Path of source scripts, relative to this build file
                baseUrl: '<%= env.DIR_SRC %>/assets/scripts',

                // Whether to generate source maps for easier debugging of
                // concatenated and minified code in the browser.
                generateSourceMaps: grunt.option('maps'),

                // Whether to preserve comments with a license. Not needed
                // when, and incompatible with, generating a source map.
                preserveLicenseComments: grunt.option('no-maps'),

                // Allow `'use strict';` be included in the RequireJS files.
                useStrict: true,

                // Comments that start with //>> are build pragmas. Exmaple:
                //>>includeStart("grunt.option('dev')", pragmas.grunt.option('dev'));
                // debugging code here
                //>>includeEnd("grunt.option('dev')");
                pragmas: {
                    isProd: grunt.option('prod'),
                    isStage: grunt.option('stage'),
                    isDev: grunt.option('dev')
                },

                // 'none' if you do not want to uglify
                optimize: (grunt.option('maps') || grunt.option('no-dev')) ? 'uglify2' : 'none',

                // Minification options
                uglify2: {
                    banner: '<%= banner %>',
                    output: {
                        beautify: false,
                        comments: false
                    },
                    compress: {
                        sequences: false,
                        global_defs: { // jshint ignore:line
                            DEBUG: false
                        }
                    },
                    warnings: false,
                    mangle: true
                }
            },
            main: {
                options: {
                    // Path of shared configuration file
                    mainConfigFile: '<%= env.DIR_SRC %>/assets/scripts/config.js',

                    // Name of input script (.js extension inferred)
                    name: 'main',

                    // Path of final build script output
                    out: '<%= env.DIR_DEST %>/assets/scripts/main.js'
                }
            }
        }

    });

    // -- Tasks ----------------------------------------------------------------

    var originalForce = grunt.option('force') || false;

    grunt.registerTask('force', function(set) {
        switch (set) {
            case 'on':
                grunt.option('force', true);
                break;

            case 'off':
                grunt.option('force', originalForce);
                break;
        }
    });

    // Default task. Run with `grunt`.
    grunt.registerTask('default', ['sass', 'lint', 'build', 'watch']);

    // Install task. Handles tasks that should happen right after npm and bower
    // modules are installed or updated. Run with `grunt install`.
    grunt.registerTask('install', ['bower']);

    // Concurrent tasks. Run with `grunt [task-name]`.
    grunt.registerTask('lint', ['force:on', 'concurrent:lint', 'force:off']);
    grunt.registerTask('build', ['clean:dest', 'concurrent:build', 'clean:tmp']);
    grunt.registerTask('docs', ['clean:docs', 'concurrent:docs', 'clean:tmp']);

    // Custom tasks. Typically used by the `concurrent` and `watch` tasks, but
    // may be run manually with `grunt [task-name]`.
    grunt.registerTask('media', ['copy:media']);
    grunt.registerTask('markup', ['copy:markup']);
    grunt.registerTask('styles', ['cssmin']);
    grunt.registerTask('scripts', (grunt.option('maps') || grunt.option('no-dev'))
        ? ['requirejs', 'copy:scripts']
        : ['copy:scripts']
    );
};
