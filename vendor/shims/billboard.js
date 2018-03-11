(function() {
  function vendorModule() {
    'use strict';

    return {
      ...self['billboard.js']
    };
  }

  define('billboard.js', [], vendorModule);
})();
