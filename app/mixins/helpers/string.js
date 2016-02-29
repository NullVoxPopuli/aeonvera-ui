import Ember from 'ember';

export default Ember.Mixin.create({
  randomString: function () {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 64);
  },
});
