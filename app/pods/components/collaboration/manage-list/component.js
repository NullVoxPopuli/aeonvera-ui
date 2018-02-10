import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  flash: service('flash-notification'),
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
