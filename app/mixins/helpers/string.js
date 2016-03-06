import Ember from 'ember';

export default Ember.Mixin.create({
  randomString(prefix = '') {
    let random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 64);
    return prefix + random;
  }
});
