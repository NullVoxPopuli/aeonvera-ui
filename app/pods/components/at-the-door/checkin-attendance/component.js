import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service('authenticated-ajax'),

  // passed in
  model: null,

  // managed by this component
  tagName: '',

  actions: {
    checkin() {
      const id = this.get('model.id');
      const name = this.get('model.attendeeName');
      const url = '/api/event_attendances/' + id + '/checkin';
      const data = {
        checked_in_at: new Date()
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