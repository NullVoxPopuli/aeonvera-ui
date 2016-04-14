import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    serialize(snapshot, options){
      let json = this._super(...arguments);
      return json;
    }
});
