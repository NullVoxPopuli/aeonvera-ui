import { dasherize } from '@ember/string';
import { computed } from '@ember/object';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  tagName: 'label',
  layout: hbs`{{label}}`,

  // Turns attribute/relationship notation to human-readable title
  //
  // e.g.:
  //   registration.attendeeName => Attendee Name
  //   housingCapacity => Housing Capacity
  label: computed('name', {
    get() {
      const name = this.get('name');
      const split = name.split('.');
      const lastPhrase = split[split.length - 1];

      const phrase = dasherize(lastPhrase).replace(/[-]/g, ' ');

      // TODO: capitalize each word
      // TODO: what about articles? English makes this lame.
      return phrase;
    }
  })
});
