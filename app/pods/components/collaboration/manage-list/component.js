import Ember from 'ember';

export default Ember.Component.extend({
  flash: Ember.inject.service('flash-notification'),
  collaborations: [], // set by renderer
  errors: [], // set by renderer
  newCollaboratorEmail: '', // set by input field

  actions: {
    addCollaborator() {
      const email = this.get('newCollaboratorEmail');

      this.sendAction('sendInviteAction', email);
      this.set('newCollaboratorEmail', '');
    },

    removeCollaborator(collaboration) {
      collaboration.destroyRecord().then(success => {}, error => {
        this.get('flash').alert(error);
      });
    }
  }
});
