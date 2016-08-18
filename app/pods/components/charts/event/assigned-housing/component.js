import Ember from 'ember';

export default Ember.Component.extend({
  data: {
    columns: [],
    type: 'gauge'
  },
  color: {
    pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
    threshold: {
      unit: 'value', // percentage is default
      values: [30, 60, 90, 100]
    }
  },
  size: {
    height: 180
  },
  guage: {},

  init() {
    this._super(...arguments);
    setTimeout(() => {
      let requests = this.get('model.requests');
      let assigned = this.get('model.assigned');
      let percent = assigned / requests * 100;
      this.set('data.columns', [['assigned', percent]]);
      this.notifyPropertyChange('data');
    }, 1000);
  }
});
