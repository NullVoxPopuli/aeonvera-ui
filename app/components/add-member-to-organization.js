import Ember from 'ember';
import computed, { alias } from 'ember-computed-decorators';
import { PropTypes } from 'ember-prop-types';

const { isPresent } = Ember;

export default Ember.Component.extend({
  propTypes: {
    model: PropTypes.EmberObject.isRequired,
    memberList: PropTypes.any.isRequired,
    searchUsers: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    membershipOptions: PropTypes.any.isRequired
  },

  @alias('model.membershipOption') selectedOption,
  @alias('model.member') selectedMember,
  @alias('model.startdate') startDate,

  @computed('selectedMember')
  isMemberSelected(member) {
    return isPresent(member.content);
  },

  @computed('selectedOption', 'isMemberSelected', 'startDate')
  specifiedAllValues(option, isMemberSelected, date) {
    return isMemberSelected && [option, date].every(i => isPresent(i));
  },


  actions: {
    selectOption(option) {
      const model = this.get('model');

      model.set('membershipOption', option);
    },

    selectMember(member) {
      const model = this.get('model');

      model.set('member', member);
    },

    updateDate(dates, formatted, flatPickr) {
      const date = dates[0];
      const model = this.get('model');

      flatPickr.close();
      model.set('startDate', date);
      this.set('startDate', date);
    },

    save() {
      this.sendAction('onSave');
    }
  }
});
