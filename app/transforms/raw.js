// http://discuss.emberjs.com/t/dealing-with-arbitrary-json-attributes-in-a-model/7428
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized;
  },

  serialize: function(deserialized) {
    return deserialized;
  }
});
