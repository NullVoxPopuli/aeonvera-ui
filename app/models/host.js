import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  domain: DS.attr('string'),

  type: function () {
    return this.constructor.modelName;
  }.property(),
});
