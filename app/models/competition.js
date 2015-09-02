import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  initialPrice: DS.attr('number'),
  atTheDoorPrice: DS.attr('number'),
  currentPrice: DS.attr('number'),
  kind: DS.attr('number'),

  requiresOrientation: DS.attr('boolean'),
  requiresPartner: DS.attr('boolean'),

  event: DS.belongsTo('event'),
  competitionResponses: DS.hasMany('competitionResponse', { async: true}),

  /**
    TODO: find out if there is a better way to represent this...
  */
  kindName: function(){
    var kind = this.get('kind');

    if (kind === 0){
      return "Solo Jazz"
    } else if (kind === 1){
      return "Jack & Jill"
    } else if (kind === 2){
      return "Strictly"
    } else if (kind === 3){
      return "Team"
    } else if (kind === 4){
      return "Crossover Jack & Jill"
    }
  }.property('kind')
});
