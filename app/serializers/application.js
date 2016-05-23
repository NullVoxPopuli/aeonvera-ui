import Ember from 'ember';
import DS from 'ember-data';

//import SerializerMixin from 'ember-data-paperclip/mixins/serializer-mixin';

// var underscore = Ember.String.underscore;

export default DS.JSONAPISerializer.extend({
  // keyForAttribute: function (attr) {
  //   return underscore(attr);
  // },
  //
  // keyForRelationship: function (rawKey) {
  //   return underscore(rawKey);
  // },
});
