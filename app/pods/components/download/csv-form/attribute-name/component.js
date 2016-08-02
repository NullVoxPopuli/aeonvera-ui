import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  tagName: 'label',
  layout: hbs`{{label}}`,

  // Turns attribute/relationship notation to human-readable title
  //
  // e.g.:
  //   attendance.attendeeName => Attendee Name
  //   housingCapacity => Housing Capacity
  label: Ember.computed('name', {
    get() {
      let name = this.get('name');
      let split = name.split('.');
      let lastPhrase = split[split.length - 1];

      let phrase = Ember.String.dasherize(lastPhrase).replace(/[-]/g, ' ');

      // TODO: capitalize each word
      // TODO: what about articles? English makes this lame.
      return phrase;
    }
  })
});
