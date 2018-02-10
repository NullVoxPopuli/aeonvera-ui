import LinkComponent from '@ember/routing/link-component';

let alreadyRun = false;

export default {
  name: 'link-to-with-action',
  initialize: function() {
    if (alreadyRun) {
      return;
    }
    alreadyRun = true;


    // http://stackoverflow.com/questions/16124381/combine-linkto-and-action-helpers-in-ember-js

    LinkComponent.reopen({
      action: null,
      _invoke: function(event) {
        const action = this.get('action');

        if (action) {
          // There was an action specified (in handlebars) so take custom action
          event.preventDefault(); // prevent the browser from following the link as normal
          if (this.bubbles === false) {
            event.stopPropagation();
          }

          // trigger the action on the controller
          this.get('controller').send(action, this.get('actionParam'));
          return false;
        }

        // handle the link-to normally
        return this._super(event);
      }
    });
  }
};
