import Ember from 'ember';

export default Ember.Component.extend({
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

      this.get('ajax').PUT(url, data).then(data => {
        this.get('store').pushPayload(data);
        this.get('flashMessages').success(`${name} has been checked in.`);
      }, error => {
        const json = JSON.parse(error.responseText);
        const errors = json.errors;

        this.get('flashMessages').alert(errors);
      });
    }

  }
});
