import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  // set by caller, and passed to form/file-upload
  property: '',
  model: null,

  imageMissing: computed('model', 'property', function() {
    let property = this.get('property');
    return this.get('model.' + property + 'IsMissing');
  }),

  thumbUrl: computed('model', 'property', function() {
    let property = this.get('property');
    return this.get('model.' + property + 'UrlThumb');
  }),
});
