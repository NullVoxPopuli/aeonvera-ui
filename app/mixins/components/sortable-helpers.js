import Ember from 'ember';

export default Ember.Mixin.create({

  _sortIndicator: function (field) {
    let currentSort = this.get('sortProps')[0];
    let sort = currentSort.split(':');
    let sortProperty = sort[0];
    let sortDirection = sort[1];

    if (sortProperty === field) {
      return (sortDirection === 'desc') ? '▼' : '▲';
    }

    return '';
  },

  actions: {
    toggleSort: function (property) {
      let currentSort = this.get('sortProps')[0];
      let sort = currentSort.split(':');
      let sortProperty = sort[0];
      let sortDirection = sort[1];

      if (property === sortProperty) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        this.set('sortProps', [property + ':' + sortDirection]);
      } else {
        this.set('sortProps', [property + ':asc']);
      }
    },
  },
});
