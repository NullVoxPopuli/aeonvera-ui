import Ember from 'ember';

export default Ember.Route.extend({
  i18n: Ember.inject.service(),

  activate: function() {
    this.set('title', this.get('i18n').t('upcomingevents'));

    this._super();
  },

  model: function() {
    return this.store.findAll('upcoming-event');
  }
});
