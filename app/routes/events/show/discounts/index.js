import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    let event = this.modelFor('events.show');
    let adapter = this.store.adapterFor('orders');
    let rootNamespace = adapter.namespace;
    let eventNamespace = rootNamespace + '/events/' + event.get('id');

    adapter.set('namespace', eventNamespace);

    let promise = this.store.findAll('discount');

    /*
      set it back the way it was
      this might introduce race condition problems
    */
    adapter.set('namespace', rootNamespace);

    return promise;
  }
});
