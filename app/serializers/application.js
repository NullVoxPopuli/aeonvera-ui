import Ember from 'ember';
import DS from 'ember-data';
import { JSONAPISerializer } from 'ember-custom-actions';

// import SerializerMixin from 'ember-data-paperclip/mixins/serializer-mixin';

const { underscore } = Ember.String;

export default JSONAPISerializer.extend({
  // TODO: re-enable when bf4 finishes his belongs_to PR (I have so many relationships that key transform isn't an issue)
  // keyForAttribute: function (attr) {
  //   return underscore(attr);
  // },
  //
  // keyForRelationship: function (rawKey) {
  //   return underscore(rawKey);
  // },
});
