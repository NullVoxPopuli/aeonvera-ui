import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Service.extend({
  store: service(),

  current: function(){
    let domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    let domainParts = domain.split('.');
    domainParts.pop(); // remove TLD
    domainParts.pop(); // remove domain
    let subdomain = domainParts.join('.');
    let downcaseSubdomain = subdomain.toLowerCase();

    if (downcaseSubdomain === 'www'){
      return '';
    }

    return subdomain;
  }.property(),

  currentSubdomain: function(){
    return this.get('current');
  }.property('current'),

  present: function(){
    return Ember.isPresent(this.get('currentSubdomain'));
  }.property('current'),

  model: function(){
    let onSubDomain = this.get('present');

    if (onSubDomain){
      let currentSubdomain = this.get('currentSubdomain');

      return this.get('store').find('host', {subdomain: currentSubdomain});
    }
  }.property('current'),

  subdomainType: function(){
    return this.get('model.constructor.modelName');
  }.property('current')

});
