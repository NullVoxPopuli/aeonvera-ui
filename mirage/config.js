import Ember from 'ember';
import Mirage from 'ember-cli-mirage';

// can't import from test helpers during development...
// import 'aeonvera/tests/helpers/parse-query-params';
// copy function here:
function parseQueryParams(queryString) {
  let params = {};

  params = queryString.replace(/(^\?)/, '').split('&').map(function(n) {
    return n = n.split('='), this[n[0]] = n[1], this;
  }.bind({}))[0];

  return params;
}

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.urlPrefix = '';

  // make this `api`, for example, if your API is namespaced
  // don't namespace, because the sign in route isn't on the api
  // this.namespace = 'api';

  // delay for each request, automatically set to 0 during testing
  // this.timing = 400;

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */
  this.delete('api/users/sign_out', function(db, request) {
    return {};
  });

  this.post('/api/users/sign_in', function(message, request) {
    let params = request.params;
    let bodyParams = request.requestBody;
    let email = '';

    let paramsAreBlank = (!Ember.isPresent(params) || Object.keys(params).length === 0);
    let bodyParamsAreBlank = (!Ember.isPresent(bodyParams) || Object.keys(bodyParams).length === 0);
    if (paramsAreBlank && bodyParamsAreBlank) {
      return new Response(401, {});
    }

    let queryParams = request.requestBody;
    params = JSON.parse(queryParams);
    email = params.email;
    let user = message.db.users.where({ email: email })[0];
    return {
      email: user.email,
      id: user.id,
      token: user.token
    };
  });

  this.post('/api/users/password', function(db, request) {
    let bodyParams = request.requestBody;
    let params = parseQueryParams(bodyParams);
    let token = params['user%5Breset_password_token%5D'];

    if (Ember.isPresent(token)) {
      return new Mirage.Response(201, {});
    } else {
      return new Mirage.Response(
        422,
        { errors: { reset_password_token: 'missing reset token' } },
        { errors: { reset_password_token: 'missing reset token' } }
      );
    }
  });

  this.post('/api/users', function(db, request) {
    return {};
  });

  this.get('/api/users/:current_user', (schema, request) => {
    let id = request.params.current_user;
    return schema.users.find(id);
  });

  this.get('api/hosts/:host', (schema, request) => {
    let hostId = request.params.host;

    // stupid hack for testing
    if (hostId.includes('org')) {
      return schema.organizations.find(hostId);
    }

    return schema.events.find(hostId);
  });

  // this.passthrough('/write-blanket-coverage', ['post']);
  this.passthrough();
  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
