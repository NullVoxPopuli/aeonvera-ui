import Ember from 'ember';

export default Ember.TextField.extend({
  value: Ember.computed.alias('date'),

  didInsertElement: function(){
    this._super();

    this.$().pickadate({
      klass: {
        holder: undefined
      }
    });
  }
});
