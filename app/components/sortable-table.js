import Ember from 'ember';

export default Ember.Component.extend({
  columns: [],
  data: [],

  didInsertElement(){
    this._super(...arguments);
    this._evaluateColumnProperties();
  },

  _evaluateColumnProperties(){
    let columns = this.get('columns');
    let evaluatedColumns = [];

    columns.forEach(column => {
      if (Ember.isPresent(column.showOn)){
        let showOn = this.get('model').get(column.showOn);
        column.showOn = showOn;
      } else {
        column.showOn = true;
      }

      evaluatedColumns.push(column);
    });

    this.set('columns', evaluatedColumns);
  }
});
