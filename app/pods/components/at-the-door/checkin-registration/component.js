import Ember from 'ember';

export default Ember.Component.extend({
  flash: Ember.inject.service('flash-notification'),
  ajax: Ember.inject.service('authenticated-ajax'),

  // passed in
  model: null,

  // managed by this component
  tagName: 'tr',

  actions: {
    checkin() {
      const id = this.get('model.id');
      const name = this.get('model.attendeeName');
      const eventId = this.get('model.host.id');
      const url = '/api/events/registrations/' + id + '/checkin';
      const data = {
        checked_in_at: new Date(),
        event_id: eventId
      };

      return this.get('ajax').PUT(url, data).then(data => {
        this.get('store').pushPayload(data);
        this.get('flash').success(`${name} has been checked in.`);
      }, error => {
        const json = JSON.parse(error.responseText);
        const errors = json.errors;

        this.get('flash').alert(errors);
      });
    }

  }
});
