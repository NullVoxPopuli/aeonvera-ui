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

  present: function(){
    return Ember.isPresent(this.get('currentSubdomain'));
  }.property('current'),

  model: function(){
    let onSubDomain = this.get('present');

    if (onSubDomain){
      // let currentSubdomain = this.get('currentSubdomain');
      //
      // Ember.$.ajax({
      //   url: '/api/host_for?subdomain=' + currentSubdomain
      // });
    }
  }.property('current'),

  subdomainType: function(){
    return this.get('model.type');
  }.property('current')

});
