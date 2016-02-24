import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  numberOfPurchasedTickets: DS.attr('number'),
  winner: DS.attr('string'),
  winnerHasBeenChosen: DS.attr('boolean'),
  /* client side property only that tells the server to
     randomly choose a new winner */
  chooseNewWinner: DS.attr('boolean'),

  event: DS.belongsTo('event'),
  raffleTickets: DS.hasMany('raffle-tickets'),
  ticketPurchasers: DS.hasMany('raffle-ticket-purchaser', {
    async: false,
  }),

});
