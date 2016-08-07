import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service('authenticated-ajax'),

  // passed in
  model: null,

  // managed by this component
  tagName: '',

  actions: {
    checkin() {
      let id = this.get('model.id');
      let name = this.get('model.attendeeName');
      let url = '/api/event_attendances/' + id + '/checkin';
      let data = {
        checked_in_at: new Date()
      };

      this.get('ajax').PUT(url, data).then(data => {
        this.get('store').pushPayload(data);
        this.get('flashMessages').success(`${name} has been checked in.`);
      }, error => {
        let json = JSON.parse(error.responseText);
        let errors = json.errors;
        this.get('flashMessages').alert(errors);
      });
    },

  },
});
