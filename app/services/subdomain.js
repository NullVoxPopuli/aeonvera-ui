import Ember from 'ember';
import DS from 'ember-data';

const {
  service,
} = Ember.inject;

export default Ember.Service.extend({
  store: service(),

  domain: function () {
    let domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    return domain;
  }.property(),

  domainParts: function () {
    let domain = this.get('domain');
    let domainParts = domain.split('.');
    return domainParts;
  }.property('domain'),

  withoutSubdomain: function () {
    let domainParts = this.get('domainParts');

    // pop from the front
    domainParts.shift();
    let domain = domainParts.join('.');

    return domain;
  }.property('domain'),

  current: function () {
    let domainParts = this.get('domainParts');
    domainParts.pop(); // remove TLD
    domainParts.pop(); // remove domain

    if (!Ember.isPresent(domainParts)) {
      return '';
    }

    let subdomain = domainParts.join('.');
    let downcaseSubdomain = subdomain.toLowerCase();

    if (downcaseSubdomain === 'www') {
      return '';
    }

    return subdomain;
  }.property(),

  currentSubdomain: function () {
    return this.get('current');
  }.property('current'),

  present: function () {
    return Ember.isPresent(this.get('currentSubdomain'));
  }.property('current'),

  model: function () {
    let onSubDomain = this.get('present');

    if (onSubDomain) {
      let currentSubdomain = this.get('currentSubdomain');
      return this.get('store').findRecord('host', currentSubdomain, {
        adapterOptions: {
          query: {
            subdomain: currentSubdomain,
          },
        },
      });
    }
  }.property('current'),

  subdomainType: function () {
    let model = this.get('model');
    if (model !== undefined) {
      return model.then(m => m.get('constructor.modelName'));
    }
  }.property('current'),

  routeForSubdomain: function () {
    let subdomainType = this.get('subdomainType');

    if (subdomainType !== undefined) {
      return this.get('subdomainType').then(type => {
        if (type === 'event') {
          return 'dance-event';
        } else if (type === 'community') {
          return 'dance-community';
        }
      });
    }
  }.property('current'),

  route: function () {
    return this.get('routeForSubdomain');
  }.property('current'),

});
