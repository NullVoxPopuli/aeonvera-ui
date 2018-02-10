import Component from '@ember/component';

export default Component.extend({
  actions: {
    selectDate(dates, formatted, flatPickr) {
      const date = dates[0];

      flatPickr.close();

      this.set('value', date);

      this.sendAction('onChange', date);
    }
  }
});
