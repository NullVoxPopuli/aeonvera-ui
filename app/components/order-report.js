import Ember from 'ember';

export default Ember.Component.extend({

  afterDate: null,
  beforeDate: null,
  pastDays: 35,
  firstOrLastNameContains: null,
  // 0 - all, 1 - paid, 2 - unpaid
  showPaid: 0,

  orders: function() {
    let host = this.get('model');
    let pastDays = this.get('pastDays');
    let nameContains = this.get('firstOrLastNameContains');
    let showPaid = this.get('showPaid');


    let query = {
      host_id_eq: host.hostId,
      host_type_eq: host.hostType
    };

    if (Ember.isPresent(pastDays)) {
      let m = moment(new Date());
      m.subtract(pastDays, 'days');
      query['created_at_gteq'] = m.format();
    }

    if (Ember.isPresent(nameContains)) {
      //query['user_first_name_or_user_last_name_cont'] = nameContains;
      query['attendance_attendee_name_cont'] = nameContains;
    }

    if (showPaid != 0) {
      if (showPaid == 1) {
        query['paid_true'] = 1
      } else {
        query['paid_false'] = 1
      }

    }

    let promise = this.store.query('order', {
      q: query,
      include: 'order_line_items.line_item'
    });

    promise = promise.sortBy('createdAt');

    return promise;
  }.property('model', 'pastDays', 'showPaid')
});
