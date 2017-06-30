import Ember from 'ember';
import RSVP from 'rsvp';
import moment from 'moment';

export default Ember.Route.extend({

  model: function() {
    const hostId = this.modelFor('my-communities.manage').get('id');
    const hostType = 'Organization';
    // const organization = this.store.findRecord('organization', hostId);
    const initialOrders = this.store.query('order', {
      q: {
        host_id: hostId,
        host_type: hostType,
        created_at_gteq: moment(new Date()).subtract(35, 'days').format()
      },
      include: 'order_line_items.line_item'
    });

    return RSVP.hash({
      // organization,
      hostId: hostId,
      hostType: hostType,
      initialOrders
    });
  }
});
