var requiredir = require('requiredir')
  , _          = require('underscore');

var path = {
  BUNDLES: [
    { entryPoint: 'src/js/index.js', out: 'index' }
  ],
  DIST:                   'dist',
  DIST_BUILD_CSS:         'dist/build/css',
  DIST_BUILD_JS:          'dist/build/js',
  DIST_FONTS:             'dist/fonts',
  DIST_SRC_CSS:           'dist/src/css',
  DIST_SRC_JS:            'dist/src/js',
  SRC_JS:                 'src/js/**/*.js',
  SRC_LESS:               'src/css/**/[^_]*.less',
  SRC_LESS_IMPORT_PATHS:  [
    'src/css/pages',
    'src/css/helpers'
  ],
  SRC_LESS_WITH_PARTIALS: 'src/css/**/*.less',
  VERSION_FILE:           'version_file'
};

function getConfig(env) {
  return _.chain(requiredir('./config'))

    // the object returned from requiredir contains length and toArray properties which we don't
    // want passing through the mapObject function in this chain.  aside from these properties,
    // requiredir returns an object where keys are script names relative to the directory passed
    // to requiredir (minus .js ext) and values are what those files export
    .omit('length', 'toArray')

    // applies node environment to the config functions exported by config files, thereby mapping
    // the config functions to config objects
    .mapObject(function(configFn) {
      return configFn(env, path);
    })

    // collect results
    .value();
}

var nodeEnv = process.env.NODE_ENV || 'local';
var config  = getConfig(nodeEnv);

// add paths to config in case any other module needs them
config.path = path;

// add node environment so no one else has to own the "fallback to local" logic
config.nodeEnv = nodeEnv;

module.exports = config;
