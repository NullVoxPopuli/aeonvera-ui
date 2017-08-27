import Ember from 'ember';

// https://github.com/Exelord/ember-custom-actions/blob/master/addon/serializers/json-api.js
import { JSONAPISerializer } from 'ember-custom-actions';
// import SerializerMixin from 'ember-data-paperclip/mixins/serializer-mixin';

const { underscore } = Ember.String;

export default JSONAPISerializer.extend({
  // TODO: re-enable when bf4 finishes his belongs_to PR (I have so many relationships that key transform isn't an issue)
  keyForAttribute: function(attr) {
    return underscore(attr);
  },

  keyForRelationship: function(rawKey) {
    return underscore(rawKey);
  }
});
