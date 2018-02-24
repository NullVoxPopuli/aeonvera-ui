import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default class EventSettings extends DS.Model.extend({
  requireCityState: attr('boolean'),

  event: belongsTo('event')
}) {
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data' {
  interface ModelRegistry {
    'event-settings': EventSettings;
  }
}
