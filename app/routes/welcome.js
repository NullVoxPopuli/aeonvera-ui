import Ember from 'ember';

export default Ember.Route.extend({

  activate: function() {
    this.set('title', this.t('appname'));
    this._super();
  }
});
