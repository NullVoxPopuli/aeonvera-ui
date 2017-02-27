import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  code: Ember.computed('model', function() {
    const domain = this.get('model.domain');
    const host = ENV.host;

    const code = `
      <iframe src='${host}/embed/${domain}' width='500px' height='600px'></iframe>`;

    return code;
  })
});
