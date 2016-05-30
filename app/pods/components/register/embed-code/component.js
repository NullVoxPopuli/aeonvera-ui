import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  code: Ember.computed('model', function() {
    let domain = this.get('model.domain');
    let host = ENV.host;

    let code = `
      <iframe src='${host}/embed/${domain}' width='500px' height='600px'></iframe>`;

    return code;
  })
});
