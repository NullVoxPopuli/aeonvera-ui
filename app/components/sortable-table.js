import Ember from 'ember';

export default Ember.Component.extend({
  columns: [],
  evaluatedColumns: [],
  data: [],

  /*
    Currently, only works on one column.
    Can only sort one column at a time.
  */
  sortProps: [],
  sortedData: Ember.computed.sort('data', 'sortProps'),

  didReceiveAttrs() {
    this._super(...arguments);

    this._setDefaultSortProps();
    this._evaluateColumnProperties();
  },

  _setDefaultSortProps() {
    let columns = this.get('columns');
    let firstProperty = columns.firstObject.property;

    this.set('sortProps', [firstProperty + ':asc']);
  },

  _evaluateColumnProperties() {
    let columns = this.get('columns');
    let evaluatedColumns = [];

    columns.forEach(column => {
      /*
        compute showOn, which decide whether or not the
        column is rendered
      */
      if (Ember.isPresent(column.showOn)) {
        if (typeof (column.showOn) !== 'boolean') {
          let showOn = this.get(column.showOn);
          column.showOn = showOn;
        }
      } else {
        column.showOn = true;
      }

      /*
        computer the sort indicator for each column
      */
      column.sortIndicator = this._sortIndicator(column.property);

      evaluatedColumns.push(column);
    });

    this.set('evaluatedColumns', evaluatedColumns);
  },

  _sortIndicator(field) {
    let currentSort = this.get('sortProps')[0];
    let sort = currentSort.split(':');
    let sortProperty = sort[0];
    let sortDirection = sort[1];

    if (sortProperty === field) {
      return (sortDirection === 'desc') ? '▼' : '▲';
    }

    return '';
  },

  _updateIndicatorForProperty(property) {
    let columns = this.get('evaluatedColumns');
    let sortIndicator = this._sortIndicator(property);

    columns.forEach(item => {
      if (item.property === property) {
        Ember.set(item, 'sortIndicator', sortIndicator);
      } else {
        Ember.set(item, 'sortIndicator', '');
      }
    });

  },

  actions: {
    toggleSort(property) {
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

      this._updateIndicatorForProperty(property);
    },
  },
});
