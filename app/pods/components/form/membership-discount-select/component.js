import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  hostId: null,
  hostType: null,
  content: null,

  modelName: 'membership-discount',
  layoutName: 'components/form/line-item-select',
  labelPath: 'label',

  membershipDiscounts: computed('hostId', 'hostType', 'modelName', {
    get() {
      let hostId = this.get('hostId');
      let hostType = this.get('hostType');
      let modelName = this.get('modelName');

      return this.store.query(modelName, {
        host_id: hostId,
        host_type: hostType,
        q: {
          // name_cont: query.term,
          host_id_eq: hostId,
          host_type_eq: hostType
        }
      });
    }
  }),

  actions: {
    changed(value) {
      this.set('value', value);
      this.sendAction();
    }
  //   search(query, deferred) {
  //     let hostId = this.get('hostId');
  //     let hostType = this.get('hostType');
  //     let modelName = this.get('modelName');
  //
  //     return this.store.query(modelName, {
  //       host_id: hostId,
  //       host_type: hostType,
  //       q: {
  //         name_cont: query.term,
  //         host_id_eq: hostId,
  //         host_type_eq: hostType
  //       }
  //     }).then(deferred.resolve, deferred.reject);
  //   }
  }
});
