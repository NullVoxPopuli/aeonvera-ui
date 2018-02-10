import Component from '@ember/component';
export default Component.extend({
  columns: null,
  sortableColumns: null,

  columnData: function() {
    let columns = this.get('columns');
    const columnData = columns.split(',');

    columns = [];

    // find labels, if specified
    columnData.forEach(function(columnEntry) {
      const parts = columnEntry.split(':');
      const property = parts[0];
      const label = parts.length > 1 ? parts[1] : parts[0];

      columns.push({
        property: property,
        label: label
      });
    });

    return columns;
  }.property('columns'),

  labelForColumn: function(column) {
    return column.label;
  },

  propertyForColumn: function(column) {
    return column.property;
  },

  /* for now just pass through, later this will sort / filter */
  filteredData: function() {
    return this.get('model');
  }.property('model')
});
