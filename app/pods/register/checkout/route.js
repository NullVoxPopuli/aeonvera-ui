import Ember from 'ember';
import ResetScroll from 'aeonvera/mixins/routes/reset-scroll';

/*jshint multistr: true */
const includeString = '\
attendance,\
attendance.custom_field_responses,attendance.housing_request,\
attendance.housing_provision,host,\
order_line_items.line_item.restraints,host.integrations';

export default Ember.Route.extend(ResetScroll, {

  model: function (params) {
    return this.get('store').findRecord('order', params.orderId, {
      adapterOptions: {
        query: {
          include: includeString
        }
      }
    });
  },

});
