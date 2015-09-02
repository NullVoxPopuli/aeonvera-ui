import Ember from 'ember';

export default Ember.Route.extend({
  i18n: Ember.inject.service(),

  activate: function() {
    this.set('title', this.get('i18n').t('appname'));
    this._super();
  }
});
