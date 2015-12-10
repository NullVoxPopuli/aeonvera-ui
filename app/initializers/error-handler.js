import Ember from 'ember';
import ENV from '../config/environment';


var alreadyRun = false;

var reportError = function(errorData) {
  Ember.$.ajax({
    url: 'https://aeonvera.com/api/front_end_error',
    method: 'POST',
    dataType: 'json',
    data: {
      error: errorData
    },
    success: function( /*data, textStatus, jqXHR*/ ) {
      // notify the user what happened, give link
      // similar to atom.io's editor

    },
    error: function( /*jqXHR, textStatus, errorThrown*/ ) {
      // not sure what to do if this fails... we can't report it
    }
  });

};

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
var displayError = function(errorData) {
  // debugger;

  var specific = '';
  if (errorData.errors) {
    specific = '(' + errorData.errors[0].status + ') ' + errorData.errors[0].title;
  }

  var message = '';
  if (errorData.message) {
    message = errorData.message;
  }

  var name = 'Error';
  if (errorData.name) {
    name = errorData.name + ': ';
  }

  var stack = '';
  if (errorData.stack) {
    stack = errorData.stack;
  }

  let errorBody = '' +
    '<span class="title"' +
    '<strong>' + name + '</strong>' + message +
    '</span>' +
    // '<a ' +
    '<hr>' +
    specific + '<br>' + stack;

  let id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 64);
  var error = Ember.$('<div/>', {
    id: 'error-' + id,
    class: 'ember-error-notification',
    html: errorBody
  });
  let jError = Ember.$(error);
  jError.appendTo('body');
  jError.slideDown(200);


  setTimeout(function() {
    Ember.$(error).remove();
  }, 15000);
};

export default {
  name: 'error-handler',

  initialize: function() {
    if (alreadyRun) {
      return;
    } else {
      alreadyRun = true;
    }

    Ember.onerror = function(error) {
      displayError(error);
    };

    // Ember.RSVP.on('error', function(error) {
    //   displayError(error);
    // });

    // Ember.Logger.error = function(message, cause, stack) {
    //   // console.error(message);
    //   // console.error(stack);
    //
    //   var errorData = {
    //     message: message,
    //     stack: stack,
    //     cause: cause
    //   };
    //
    //   // displayError(errorData);
    //
    //   if (ENV.environment === 'production') {
    //     reportError(errorData);
    //   }
    // };
  }
};
