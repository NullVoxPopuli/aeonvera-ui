import Ember from 'ember';

export default Ember.Component.extend({
  hostId: null,
  hostType: null,

  content: [],
  value: null,

  actions: {
    searchLineItems(query, deferred) {
      let hostId = this.get('hostId');
      let hostType = this.get('hostType');

      return this.store.query('line-item', {
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
