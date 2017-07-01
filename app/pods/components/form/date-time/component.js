import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectDate(dates, formatted, flatPickr) {
      const date = dates[0];

      flatPickr.close();

      this.set('value', date);

      this.sendAction('onChange', date);
    }
  }
});
