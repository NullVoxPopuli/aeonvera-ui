import Ember from 'ember';

export default Ember.Route.extend({

  didTransition: function(){
    this._super();
    Ember.$(document).foundation('reflow');
    return true;
  },

  model: function(){
    let event = this.modelFor('events.show');
    // let adapter = this.store.adapterFor('package');
    // let rootNamespace = adapter.namespace;

    // let eventNamespace = '/events/' + event.get('id');
    // adapter.set('namespace', eventNamespace);

    let promise = this.store.query('package', { event_id: event.get('id') });

    /*
      set it back the way it was
      this might introduce race condition problems
    */
    // adapter.set('namespace', rootNamespace);

    return promise;
  }
});
