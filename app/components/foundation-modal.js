  import Ember from 'ember';

export default Ember.Component.extend({
    title: '',

    // name: '',
    elementId: '',
    role: 'dialog',
    hidden: true,
    reveal: true,
    buttonClasses: '',
    buttonText: '',

    didInsertElement() {
      this._super(...arguments);
      this.set('elementId', this.$().attr('id'));
    },

    modalName: function() {
      let dashedName = (this.get('name') || '').dasherize();
      let dashedTitle = this.get('title').dasherize();
      return Ember.isPresent(dashedName) ? dashedName : dashedTitle;
    }.property('title', 'name'),

    modalId: Ember.computed('elementId', function() {
      return this.get('elementId') + '-modal';
    }),

    titleId: function() {
      return this.get('elementId') + '-title';
    }.property('elementId'),

  });
