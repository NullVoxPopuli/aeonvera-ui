import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  // set by caller, and passed to form/file-upload
  property: '',
  model: null,

  imageMissing: computed('model', 'property', function() {
    const property = this.get('property');

    return this.get('model.' + property + 'IsMissing');
  }),

  thumbUrl: computed('model', 'property', function() {
    const property = this.get('property');

    return this.get('model.' + property + 'UrlThumb');
  })
});
