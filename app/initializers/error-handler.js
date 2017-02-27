import Ember from 'ember';
import ENV from '../config/environment';

let alreadyRun = false;

/*
  Adapter Error:
    errorData:
      - message
      - name
      - errors[]
        - detail (response from server)
        - status
        - title
*/
const displayError = function(errorData) {
  // debugger;

  let specific = '';

  if (errorData.errors) {
    specific = '(' + errorData.errors[0].status + ') ' + errorData.errors[0].title;
  }

  let message = '';

  if (errorData.message) {
    message = errorData.message;
  }

  let name = 'Error';

  if (errorData.name) {
    name = errorData.name + ': ';
  }

  let stack = '';

  if (errorData.stack) {
    stack = errorData.stack;
  }

  const errorBody = '' +
    '<span class="title"' +
    '<strong>' + name + '</strong>' + message +
    '</span>' +

    // '<a ' +
    '<hr>' +
    specific + '<br>' + stack;

  const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 64);
  const error = Ember.$('<div/>', {
    id: 'error-' + id,
    class: 'ember-error-notification',
    html: errorBody
  });
  const jError = Ember.$(error);

  jError.appendTo('body');
  jError.slideDown(200);

  jError.click(function() {
    jError.remove();
  });

  setTimeout(function() {
    Ember.$(error).remove();
  }, 15000);
};

export default {
  name: 'error-handler',

  initialize: function() {
    if (alreadyRun) {
      return;
    }
    alreadyRun = true;


    // Ember.onerror = function (error) {
    //   Ember.Logger.error(error);
    //
    //   // displayError(error);
    // };
  }
};
