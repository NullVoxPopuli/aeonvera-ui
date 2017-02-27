import Ember from 'ember';

export default Ember.Component.extend({
  hostId: null,
  hostType: null,

  content: [],
  value: null,

  modelName: 'line-item',
  labelPath: 'name',

  actions: {
    search(query, deferred) {
      const hostId = this.get('hostId');
      const hostType = this.get('hostType');
      const modelName = this.get('modelName');

      return this.store.query(modelName, {
        host_id: hostId,
        host_type: hostType,
        q: {
          name_cont: query.term,
          host_id_eq: hostId,
          host_type_eq: hostType
        }
      }).then(deferred.resolve, deferred.reject);
    }
  }
});
