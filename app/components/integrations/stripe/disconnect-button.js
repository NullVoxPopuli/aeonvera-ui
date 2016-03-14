import Ember from 'ember';
import env from 'aeonvera/config/environment';

// TODO: this could actually be async
export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['href'],
  classNames: 'button warning',

  href: Ember.computed(function() {
    let host = env.APP.host;
    let model = this.get('model');
    let id = model.get('id');
    let type = model.get('payableType');

    return `${host}/oauth/stripe?payable_id=${id}&payable_type=${type}`;
  })
});
