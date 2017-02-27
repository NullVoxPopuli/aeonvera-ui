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
    const columns = this.get('columns');
    const firstProperty = columns.firstObject.property;

    this.set('sortProps', [firstProperty + ':asc']);
  },

  _evaluateColumnProperties() {
    const columns = this.get('columns');
    const evaluatedColumns = [];

    columns.forEach(column => {
      /*
        compute showOn, which decide whether or not the
        column is rendered
      */
      if (Ember.isPresent(column.showOn)) {
        if (typeof (column.showOn) !== 'boolean') {
          const showOn = this.get(column.showOn);

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
    const currentSort = this.get('sortProps')[0];
    const sort = currentSort.split(':');
    const sortProperty = sort[0];
    const sortDirection = sort[1];

    if (sortProperty === field) {
      return (sortDirection === 'desc') ? '▼' : '▲';
    }

    return '';
  },

  _updateIndicatorForProperty(property) {
    const columns = this.get('evaluatedColumns');
    const sortIndicator = this._sortIndicator(property);

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
      const currentSort = this.get('sortProps')[0];
      const sort = currentSort.split(':');
      const sortProperty = sort[0];
      let sortDirection = sort[1];

      if (property === sortProperty) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        this.set('sortProps', [property + ':' + sortDirection]);
      } else {
        this.set('sortProps', [property + ':asc']);
      }

      this._updateIndicatorForProperty(property);
    }
  }
});
