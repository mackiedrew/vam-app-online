/* eslint-env node */


// Imports
const gulp = require('gulp')
const del = require('del')
const electron = require('gulp-electron')
const packageJson = require('./package.json')


// Constants
const version = packageJson.version
const electronVersion = packageJson.dependencies.electron

// Cleans Required Directory
gulp.task('clean', () => {



})

// Builds Electron
gulp.task('electron', undefined, () => {

  gulp.src('')

    .pipe(electron({
      src: './src',
      packageJson: packageJson,
      release: './release',
      cache: './cache',
      version: `v${electronVersion}`,
      packaging: true,
      token: undefined,
      
      platforms: [
        'win32-ia32',
        'win32-x64',
      ],

      platformResources: {

        win: {
          'version-string': version,
          'file-version': version,
          'product-version': version,
          'icon': 'images/vam.ico',
        },

      },
      
    }))
    .pipe(gulp.dest(''))

})

// Default Deployment series
gulp.task('default', gulp.series('clean', 'electron'))